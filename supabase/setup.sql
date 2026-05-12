-- Enums
CREATE TYPE term_category AS ENUM (
  'ai_basics', 'tools', 'coding', 'prompting', 'workflow'
);

CREATE TYPE term_status AS ENUM ('draft', 'published');

-- Main glossary table
CREATE TABLE glossary_terms (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  term                TEXT NOT NULL,
  normalized_term     TEXT NOT NULL UNIQUE,
  full_form           TEXT,
  short_definition    TEXT,
  detailed_explanation TEXT,
  category            term_category NOT NULL,
  aliases             TEXT[] NOT NULL DEFAULT '{}',
  tool_tags           TEXT[] NOT NULL DEFAULT '{}',
  example_usage       TEXT,
  session_relevance   TEXT,
  status              term_status NOT NULL DEFAULT 'draft',
  updated_by          UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_glossary_terms_normalized ON glossary_terms (normalized_term);
CREATE INDEX idx_glossary_terms_category   ON glossary_terms (category);
CREATE INDEX idx_glossary_terms_status     ON glossary_terms (status);
CREATE INDEX idx_glossary_terms_aliases    ON glossary_terms USING GIN (aliases);
CREATE INDEX idx_glossary_terms_tool_tags  ON glossary_terms USING GIN (tool_tags);

-- Audit table
CREATE TABLE glossary_edits (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  term_id       UUID NOT NULL REFERENCES glossary_terms(id) ON DELETE CASCADE,
  editor_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action        TEXT NOT NULL CHECK (action IN ('created', 'updated', 'published', 'deleted')),
  previous_data JSONB,
  new_data      JSONB,
  edited_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_glossary_edits_term_id ON glossary_edits (term_id);
CREATE INDEX idx_glossary_edits_editor  ON glossary_edits (editor_id);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_glossary_terms_updated_at
  BEFORE UPDATE ON glossary_terms
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Row Level Security
ALTER TABLE glossary_terms ENABLE ROW LEVEL SECURITY;
ALTER TABLE glossary_edits ENABLE ROW LEVEL SECURITY;

-- Public: read published terms only
CREATE POLICY "public_read_published"
  ON glossary_terms FOR SELECT
  USING (status = 'published');

-- Authenticated (admin): full access
CREATE POLICY "admin_all_terms"
  ON glossary_terms FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "admin_all_edits"
  ON glossary_edits FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
-- 20 seed terms across all 5 categories (published, visible to public)

INSERT INTO glossary_terms
  (term, normalized_term, full_form, short_definition, detailed_explanation,
   category, aliases, tool_tags, example_usage, status)
VALUES

-- AI BASICS (7 terms)
(
  'LLM', 'llm', 'Large Language Model',
  'An AI model trained on vast text data to understand and generate human language.',
  'LLMs like GPT-4 and Claude are trained on billions of words. They predict the next token given context, enabling them to write, summarise, translate, and reason. The "large" refers to billions of parameters — numerical weights the model learns during training.',
  'ai_basics',
  ARRAY['large language model', 'language model'],
  ARRAY['ChatGPT', 'Claude', 'Gemini', 'Llama'],
  '"ChatGPT is an LLM-powered chatbot." — Every time you type a message, an LLM generates the reply.',
  'published'
),
(
  'GPT', 'gpt', 'Generative Pre-trained Transformer',
  'A family of LLMs developed by OpenAI using transformer architecture.',
  'GPT models are trained in two stages: pre-training on internet text, then fine-tuning with human feedback (RLHF). GPT-4 powers ChatGPT. "Generative" means it produces text; "pre-trained" means it learned from a massive corpus before your conversation.',
  'ai_basics',
  ARRAY['generative pre-trained transformer'],
  ARRAY['ChatGPT', 'OpenAI'],
  '"GPT-4 can write code, analyse images, and hold long conversations."',
  'published'
),
(
  'Transformer', 'transformer', NULL,
  'The neural network architecture that underlies nearly all modern LLMs.',
  'Introduced in the 2017 "Attention Is All You Need" paper. Transformers use self-attention to weigh the importance of every word relative to every other word in a sequence — unlike older models that processed text left-to-right sequentially. BERT, GPT, and Claude are all transformer-based.',
  'ai_basics',
  ARRAY['transformer architecture', 'attention model'],
  ARRAY[],
  '"BERT, GPT, and Claude are all transformer-based models." The architecture processes all words in parallel, making it fast and accurate.',
  'published'
),
(
  'Embedding', 'embedding', NULL,
  'A numerical vector that represents text, capturing its semantic meaning.',
  'Words or sentences with similar meanings end up close together in vector space. For example, "king" and "queen" have similar embeddings. Embeddings power semantic search, recommendation systems, and RAG pipelines. You can compare embeddings with cosine similarity to find related content.',
  'ai_basics',
  ARRAY['vector embedding', 'text embedding', 'vector'],
  ARRAY['OpenAI', 'Pinecone', 'Supabase', 'Weaviate'],
  '"We embed customer queries and match them to the nearest FAQ answer using cosine similarity."',
  'published'
),
(
  'Fine-tuning', 'fine tuning', NULL,
  'Further training a pre-trained model on a specific dataset to specialise its behaviour.',
  'Instead of training from scratch (hugely expensive), fine-tuning adapts a base model using a smaller, task-specific dataset. Result: a model that sounds like your brand, knows your domain, or follows specific formatting rules. Common for domain-specific chatbots and code assistants.',
  'ai_basics',
  ARRAY['finetuning', 'fine-tuning', 'model fine-tuning'],
  ARRAY['OpenAI', 'Hugging Face', 'Together AI'],
  '"We fine-tuned GPT-3.5 on 10,000 support tickets — now it answers product questions perfectly."',
  'published'
),
(
  'RAG', 'rag', 'Retrieval-Augmented Generation',
  'A technique that gives an LLM access to external documents before generating a response.',
  'RAG avoids the hallucination problem by grounding the model in real retrieved data. A query is embedded, matched to a vector store, and the top results are injected into the prompt as context. The model then generates an answer based on those retrieved facts rather than its training data alone.',
  'ai_basics',
  ARRAY['retrieval augmented generation', 'retrieval-augmented generation'],
  ARRAY['Perplexity', 'LangChain', 'Supabase', 'Pinecone', 'LlamaIndex'],
  '"Our chatbot uses RAG to answer questions about our product docs — it cites the exact page it pulled from."',
  'published'
),
(
  'Inference', 'inference', NULL,
  'The process of running a trained AI model to generate an output from a given input.',
  'Training teaches the model; inference is using it. Every time you send a message to an AI, you trigger one inference call. Inference costs (compute per query) are the main operational expense for deployed LLM products — this is why pricing is per token.',
  'ai_basics',
  ARRAY['model inference', 'prediction'],
  ARRAY['Replicate', 'AWS Bedrock', 'Groq'],
  '"Each time you send a message to Claude, you trigger one inference call — the model runs and produces your reply."',
  'published'
),

-- TOOLS (5 terms)
(
  'Claude', 'claude', NULL,
  'Anthropic''s AI assistant family, known for long context, safety, and nuanced reasoning.',
  'Claude (Haiku, Sonnet, Opus) is designed with Constitutional AI principles. It supports up to 200K token contexts — fitting an entire novel. Claude excels at analysis, writing, coding, and handling complex multi-step instructions. The model behind this very session.',
  'tools',
  ARRAY['claude ai', 'anthropic claude', 'claude sonnet', 'claude opus'],
  ARRAY['Anthropic'],
  '"Use Claude Sonnet for fast, cost-effective drafts; Opus for complex reasoning tasks that need maximum accuracy."',
  'published'
),
(
  'Cursor', 'cursor', NULL,
  'An AI-powered code editor built on VS Code that writes, edits, and explains code.',
  'Cursor embeds an LLM directly in your editor. You can highlight code and ask it to refactor, generate tests, or explain what a function does — all without leaving the IDE. It uses your codebase as context, so suggestions are aware of your project structure.',
  'tools',
  ARRAY['cursor editor', 'cursor ide', 'cursor ai'],
  ARRAY['Claude', 'GPT-4'],
  '"I opened Cursor, selected a buggy function, pressed Cmd+K, and asked it to fix the null check. Done in 3 seconds."',
  'published'
),
(
  'GitHub Copilot', 'github copilot', NULL,
  'An AI pair programmer that suggests code completions and whole functions inside your IDE.',
  'Copilot is trained on public GitHub code. It predicts the next line or block as you type, dramatically speeding up boilerplate and repetitive coding patterns. It integrates directly into VS Code, JetBrains, and Neovim as an extension.',
  'tools',
  ARRAY['copilot', 'gh copilot', 'github co-pilot'],
  ARRAY['GitHub', 'OpenAI', 'VS Code'],
  '"Copilot completed the entire sorting function after I typed the function name and first comment line."',
  'published'
),
(
  'Perplexity', 'perplexity', NULL,
  'An AI-powered search engine that answers questions with cited, real-time web sources.',
  'Perplexity combines web search with LLM synthesis. Unlike ChatGPT, it cites sources and pulls live data — making it better for research, fact-checking, and anything that happened after the model''s training cutoff. Think of it as Google + summarisation.',
  'tools',
  ARRAY['perplexity ai'],
  ARRAY[],
  '"I used Perplexity to research competitor pricing — it cited five sources and gave me a summary in 10 seconds."',
  'published'
),
(
  'Midjourney', 'midjourney', NULL,
  'An AI image generation tool that creates high-quality, artistic images from text prompts.',
  'Midjourney takes text prompts and produces stunning, artistic images. Accessible via Discord and the web, it is widely used for marketing assets, concept art, and ideation. It is particularly strong at photorealistic and painterly styles.',
  'tools',
  ARRAY['mj', 'mid journey'],
  ARRAY[],
  '"/imagine a futuristic city at sunset, cinematic lighting, 8K — Midjourney generates it in 30 seconds."',
  'published'
),

-- CODING TERMS (3 terms)
(
  'API', 'api', 'Application Programming Interface',
  'A set of rules that lets software communicate with other software.',
  'When you send a message to an AI product, your app calls the provider''s API: it sends a JSON payload and receives a structured response. The API is the contract between your code and the service. REST APIs are the most common type — they work over HTTP just like websites.',
  'coding',
  ARRAY['application programming interface', 'rest api', 'http api'],
  ARRAY[],
  '"Our app calls the Claude API to summarise customer reviews automatically — no UI, just code."',
  'published'
),
(
  'Token', 'token', NULL,
  'The basic unit of text that an LLM processes — roughly ¾ of a word on average.',
  '"Hello world" is about 2–3 tokens. LLMs have a token limit per request (the context window). Tokens determine both speed and cost: most AI APIs charge per 1,000 tokens. A token can be a word, part of a word, or even a single character in some languages.',
  'coding',
  ARRAY['tokens', 'llm token', 'tokenisation'],
  ARRAY['OpenAI', 'Anthropic', 'Tiktoken'],
  '"GPT-4o supports 128K tokens — that is roughly 90,000 words. You could paste a whole novel as context."',
  'published'
),
(
  'Context Window', 'context window', NULL,
  'The maximum amount of text an LLM can "see" and reason over in a single request.',
  'Everything inside the context window — system prompt, conversation history, uploaded documents — is what the model uses to generate its response. Content outside it is forgotten. Larger context windows (Claude''s 200K) allow longer documents, longer conversations, and more complex tasks.',
  'coding',
  ARRAY['context length', 'context limit', 'context size'],
  ARRAY['Claude', 'ChatGPT', 'Gemini'],
  '"Claude 3.5 has a 200K token context window — you can paste a 150-page report and ask questions about it."',
  'published'
),

-- PROMPTING TERMS (3 terms)
(
  'System Prompt', 'system prompt', NULL,
  'Instructions given to an LLM before the conversation starts, shaping its persona and rules.',
  'The system prompt is invisible to end-users but sets the rules: tone, format, persona, and boundaries. Products like customer-service bots rely heavily on system prompts. You can think of it as the employee handbook given to the AI before it starts work.',
  'prompting',
  ARRAY['system instruction', 'system message', 'instructions'],
  ARRAY['ChatGPT', 'Claude', 'OpenAI'],
  '"System prompt: You are a friendly Headout travel assistant. Never discuss competitors. Always respond in under 100 words."',
  'published'
),
(
  'Chain-of-Thought', 'chain of thought', NULL,
  'A prompting technique asking the model to reason step-by-step before giving a final answer.',
  'Adding "think step by step" dramatically improves accuracy on maths, logic, and multi-step tasks. The model externalises its reasoning, reducing errors from jumping to conclusions. CoT was first described in a 2022 Google paper and is now standard practice for complex prompting.',
  'prompting',
  ARRAY['cot', 'chain of thought prompting', 'step by step', 'step-by-step reasoning'],
  ARRAY[],
  '"Prompt: What is 25% of 348? Think step by step. — The model breaks it into: 10% = 34.8, 25% = 87."',
  'published'
),
(
  'Few-shot Prompting', 'few shot prompting', NULL,
  'Including 2–5 examples in your prompt to teach the model the exact pattern you want.',
  'Unlike zero-shot (no examples), few-shot shows the model exactly what output format and tone you want. Essential for consistent formatting, tone-matching, and domain-specific outputs. The examples act as a template the model follows.',
  'prompting',
  ARRAY['few-shot', 'few shot', 'fewshot', 'in-context learning', 'example prompting'],
  ARRAY[],
  '"I gave Claude three example summaries in my brand voice, then asked it to summarise a new article — it nailed the tone."',
  'published'
),

-- WORKFLOW TERMS (2 terms)
(
  'Agent', 'agent', NULL,
  'An AI system that can plan, use tools, and complete multi-step tasks with minimal human input.',
  'An agent wraps an LLM with the ability to call tools (web search, code execution, file I/O, APIs), evaluate results, and iterate until a goal is reached. Unlike a single prompt-response, agents loop: plan → act → observe → repeat. They can handle tasks that would take a human hours.',
  'workflow',
  ARRAY['ai agent', 'autonomous agent', 'llm agent', 'agentic ai'],
  ARRAY['LangChain', 'AutoGPT', 'Claude', 'n8n', 'Zapier'],
  '"Our refund agent reads the ticket, checks the booking system, verifies eligibility, and issues the refund — no human needed."',
  'published'
),
(
  'MCP', 'mcp', 'Model Context Protocol',
  'An open standard that connects AI models to external tools and data sources in a consistent way.',
  'MCP (by Anthropic) lets any app expose tools to any LLM through a consistent interface. Instead of custom integrations per model, one MCP server works with all MCP-compatible clients (Claude, Cursor, etc.). Think of it as USB-C for AI — one standard plug for everything.',
  'workflow',
  ARRAY['model context protocol'],
  ARRAY['Claude', 'Cursor', 'Anthropic'],
  '"We built one MCP server for our CRM; now both Claude and Cursor can query customer data without any extra integration code."',
  'published'
);
