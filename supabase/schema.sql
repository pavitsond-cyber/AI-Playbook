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
