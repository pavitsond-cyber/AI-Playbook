"use client";

import { useState, useRef } from "react";
import { useDockedTitle } from "@/components/nav/PageChromeContext";

const CONTRIBUTE_URL = "/api/contribute";

const CATEGORIES = ["Tool", "Workflow", "Prompt", "Case Study"];
const ROLES = ["Product Manager", "Product Designer", "Design System Manager", "Engineer", "Other"];
const TIME_OPTIONS = ["< 30 min", "30 min–1 hr", "1–2 hrs", "2–4 hrs", "4+ hrs"];

const INITIAL = {
  name: "",
  email: "",
  role: "",
  title: "",
  category: "",
  description: "",
  timeSaved: "",
};

export default function ContributeForm() {
  const titleRef = useDockedTitle("Contribute a Play");
  const [form, setForm] = useState(INITIAL);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Handlers ────────────────────────────────────────────────
  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []).slice(0, 3); // max 3 files
    setFiles(selected);
  };

  const removeFile = (i: number) => setFiles((f) => f.filter((_, idx) => idx !== i));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.role) e.role = "Select your role";
    if (!form.title.trim()) e.title = "Give your play a title";
    if (!form.category) e.category = "Pick a category";
    if (!form.description.trim() || form.description.length < 30)
      e.description = "Add more detail (min 30 chars)";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("loading");

    try {
      const encodedFiles = await Promise.all(
        files.map(
          (f) =>
            new Promise<{ name: string; mimeType: string; data: string }>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => {
                const dataUrl = reader.result as string;
                const commaIndex = dataUrl.indexOf(",");
                const base64 = commaIndex >= 0 ? dataUrl.slice(commaIndex + 1) : dataUrl;
                resolve({
                  name: f.name,
                  mimeType: f.type || "application/octet-stream",
                  data: base64,
                });
              };
              reader.onerror = reject;
              reader.readAsDataURL(f);
            })
        )
      );

      console.log(`Submitting with ${encodedFiles.length} file(s):`, encodedFiles.map(f => f.name));

      const payload = { ...form, files: encodedFiles };

      const res = await fetch(CONTRIBUTE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Submission failed");

      setStatus("success");
      setForm(INITIAL);
      setFiles([]);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  // ── Render: success state ────────────────────────────────────
  if (status === "success") {
    return (
      <div style={styles.page}>
        <div style={styles.successCard}>
          <div style={styles.successIcon}>🎉</div>
          <h2 style={styles.successHeading}>Play submitted!</h2>
          <p style={styles.successBody}>
            The team will review your contribution and reach out if they need anything.
            Check your inbox for a confirmation email.
          </p>
          <button style={styles.btn} onClick={() => setStatus("idle")}>
            Submit another play
          </button>
        </div>
      </div>
    );
  }

  // ── Render: form ─────────────────────────────────────────────
  return (
    <div style={styles.page}>
      {/* Header */}
      <div ref={titleRef} data-page-title style={styles.header}>
        <div style={styles.badge}>Community</div>
        <h1 style={styles.heading}>Contribute a Play</h1>
        <p style={styles.subheading}>
          Share a workflow, prompt, tool, or case study that&apos;s saved you real time.
          Reviewed by the team before going live.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} style={styles.form} noValidate>

        {/* Row: Name + Email */}
        <div style={styles.row}>
          <Field label="Your name" error={errors.name} required>
            <input
              style={inputStyle(errors.name)}
              placeholder="Ada Lovelace"
              value={form.name}
              onChange={set("name")}
            />
          </Field>
          <Field label="Work email" error={errors.email} required>
            <input
              style={inputStyle(errors.email)}
              type="email"
              placeholder="ada@headout.com"
              value={form.email}
              onChange={set("email")}
            />
          </Field>
        </div>

        {/* Role */}
        <Field label="Your role" error={errors.role} required>
          <select style={inputStyle(errors.role)} value={form.role} onChange={set("role")}>
            <option value="">Select role</option>
            {ROLES.map((r) => <option key={r}>{r}</option>)}
          </select>
        </Field>

        {/* Title */}
        <Field label="Play title" error={errors.title} required hint="Make it action-oriented, e.g. 'Synthesize 10 interviews in 15 min'">
          <input
            style={inputStyle(errors.title)}
            placeholder="How I use Claude to write PRD first drafts"
            value={form.title}
            onChange={set("title")}
            maxLength={120}
          />
        </Field>

        {/* Row: Category + Time Saved */}
        <div style={styles.row}>
          <Field label="Category" error={errors.category} required>
            <div style={styles.chipGroup}>
              {CATEGORIES.map((c) => (
                <button
                  type="button"
                  key={c}
                  style={chipStyle(form.category === c)}
                  onClick={() => setForm((f) => ({ ...f, category: c }))}
                >
                  {c}
                </button>
              ))}
            </div>
            {errors.category && <span style={styles.error}>{errors.category}</span>}
          </Field>
          <Field label="Estimated time saved" hint="Per use">
            <div style={styles.chipGroup}>
              {TIME_OPTIONS.map((t) => (
                <button
                  type="button"
                  key={t}
                  style={chipStyle(form.timeSaved === t)}
                  onClick={() => setForm((f) => ({ ...f, timeSaved: t }))}
                >
                  {t}
                </button>
              ))}
            </div>
          </Field>
        </div>

        {/* Description */}
        <Field
          label="Describe the play"
          error={errors.description}
          required
          hint="What's the use case? What tool/prompt/workflow? What result does it produce?"
        >
          <textarea
            style={{ ...inputStyle(errors.description), minHeight: 120, resize: "vertical" }}
            placeholder="Walk us through the play step by step. Include the prompt or workflow you use, the output you get, and any tips to make it work well."
            value={form.description}
            onChange={set("description")}
            maxLength={2000}
          />
          <span style={styles.charCount}>{form.description.length}/2000</span>
        </Field>

        {/* File upload */}
        <Field label="Attach files" hint="Screenshots, prompts, templates — max 3 files, 10MB each">
          <div
            style={styles.dropZone}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const dropped = Array.from(e.dataTransfer.files).slice(0, 3);
              setFiles(dropped);
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,.pdf,.txt,.md,.docx"
              style={{ display: "none" }}
              onChange={handleFiles}
            />
            {files.length === 0 ? (
              <>
                <span style={styles.uploadIcon}>📎</span>
                <span style={styles.uploadLabel}>Click to attach or drag files here</span>
                <span style={styles.uploadSub}>Images, PDFs, text files</span>
              </>
            ) : (
              <div style={styles.fileList}>
                {files.map((f, i) => (
                  <div key={i} style={styles.fileChip}>
                    <span style={styles.fileName}>{f.name}</span>
                    <button
                      type="button"
                      style={styles.removeFile}
                      onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
                {files.length < 3 && (
                  <span style={styles.addMore}>+ Add more</span>
                )}
              </div>
            )}
          </div>
        </Field>

        {/* Error banner */}
        {status === "error" && (
          <div style={styles.errorBanner}>
            ⚠️ {errorMsg || "Something went wrong. Try again."}
          </div>
        )}

        {/* Submit */}
        <div style={styles.actions}>
          <button
            type="submit"
            style={{ ...styles.btn, opacity: status === "loading" ? 0.7 : 1 }}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Submitting…" : "Submit Play →"}
          </button>
          <span style={styles.disclaimer}>
            Reviewed by the team before publishing. You&apos;ll get a confirmation email.
          </span>
        </div>
      </form>
    </div>
  );
}

// ── Sub-components ───────────────────────────────────────────
function Field({ label, children, error, hint, required }: {
  label: string;
  children: React.ReactNode;
  error?: string;
  hint?: string;
  required?: boolean;
}) {
  return (
    <div style={styles.field}>
      <label style={styles.label}>
        {label}
        {required && <span style={styles.asterisk}>*</span>}
      </label>
      {hint && <span style={styles.hint}>{hint}</span>}
      {children}
      {error && <span style={styles.error}>{error}</span>}
    </div>
  );
}

// ── Styles ───────────────────────────────────────────────────
const inputStyle = (hasError?: string): React.CSSProperties => ({
  width: "100%",
  padding: "10px 12px",
  fontSize: 14,
  borderRadius: 8,
  border: `1.5px solid ${hasError ? "#ef4444" : "#e2e8f0"}`,
  background: "#fff",
  color: "#0f172a",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
  transition: "border-color 0.15s",
});

const chipStyle = (active: boolean): React.CSSProperties => ({
  padding: "6px 14px",
  fontSize: 13,
  borderRadius: 20,
  border: `1.5px solid ${active ? "#6366f1" : "#e2e8f0"}`,
  background: active ? "#eef2ff" : "#fff",
  color: active ? "#4f46e5" : "#64748b",
  cursor: "pointer",
  fontWeight: active ? 600 : 400,
  transition: "all 0.15s",
});

const styles: Record<string, React.CSSProperties> = {
  page: {
    maxWidth: 680,
    margin: "0 auto",
    padding: "40px 24px 80px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    color: "#0f172a",
  },
  header: { marginBottom: 40 },
  badge: {
    display: "inline-block",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#6366f1",
    background: "#eef2ff",
    padding: "3px 10px",
    borderRadius: 20,
    marginBottom: 12,
  },
  heading: { fontSize: 28, fontWeight: 700, margin: "0 0 8px", lineHeight: 1.2 },
  subheading: { fontSize: 15, color: "#475569", margin: 0, lineHeight: 1.6 },
  form: { display: "flex", flexDirection: "column", gap: 24 },
  row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  field: { display: "flex", flexDirection: "column", gap: 4 },
  label: { fontSize: 13, fontWeight: 600, color: "#334155" },
  asterisk: { color: "#ef4444", marginLeft: 2 },
  hint: { fontSize: 12, color: "#94a3b8", marginBottom: 2 },
  error: { fontSize: 12, color: "#ef4444", marginTop: 2 },
  charCount: { fontSize: 11, color: "#94a3b8", textAlign: "right", marginTop: 2 },
  chipGroup: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 },
  dropZone: {
    border: "1.5px dashed #cbd5e1",
    borderRadius: 8,
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    cursor: "pointer",
    background: "#f8fafc",
    transition: "border-color 0.15s",
    minHeight: 80,
    justifyContent: "center",
  },
  uploadIcon: { fontSize: 20 },
  uploadLabel: { fontSize: 13, color: "#475569", fontWeight: 500 },
  uploadSub: { fontSize: 11, color: "#94a3b8" },
  fileList: { display: "flex", flexWrap: "wrap", gap: 8, width: "100%" },
  fileChip: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "#eef2ff",
    border: "1px solid #c7d2fe",
    borderRadius: 6,
    padding: "4px 10px",
    fontSize: 12,
    color: "#4f46e5",
  },
  fileName: { maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  removeFile: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#6366f1",
    fontSize: 11,
    padding: 0,
    lineHeight: 1,
  },
  addMore: { fontSize: 12, color: "#6366f1", cursor: "pointer", padding: "4px 0" },
  errorBanner: {
    background: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: 8,
    padding: "12px 16px",
    fontSize: 13,
    color: "#dc2626",
  },
  actions: { display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" },
  btn: {
    background: "#6366f1",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "12px 24px",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    transition: "background 0.15s",
  },
  disclaimer: { fontSize: 12, color: "#94a3b8" },
  successCard: {
    textAlign: "center",
    padding: "80px 24px",
    maxWidth: 440,
    margin: "0 auto",
  },
  successIcon: { fontSize: 48, marginBottom: 16 },
  successHeading: { fontSize: 24, fontWeight: 700, margin: "0 0 12px" },
  successBody: { fontSize: 15, color: "#475569", lineHeight: 1.6, margin: "0 0 32px" },
};
