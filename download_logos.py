#!/usr/bin/env python3
"""Download logos from Clearbit and save to public/logos/"""

import os
import urllib.request
import urllib.error

# Target directory
logos_dir = os.path.join(os.path.dirname(__file__), "public", "logos")
os.makedirs(logos_dir, exist_ok=True)

domains = [
    "granola.ai",
    "notebooklm.google.com",
    "notion.so",
    "raycast.com",
    "tldraw.com",
    "excalidraw.com",
    "mermaidchart.com",
    "mobbin.com",
    "refero.design",
    "banani.co",
    "superdesign.dev",
    "paper.design",
    "replit.com",
    "usegalileo.ai",
    "cursor.com",
    "claude.ai",
    "openai.com",
    "github.com",
    "vercel.com",
    "n8n.io",
    "zapier.com",
    "make.com",
    "airtable.com",
    "playwright.dev",
    "agentation.com",
    "dialkit.com",
    "scribehow.com",
    "krea.ai",
    "midjourney.com",
    "runwayml.com",
    "elevenlabs.io",
    "rive.app",
    "lottiefiles.com",
    "jitter.video",
    "gamma.app",
    "tome.app",
    "pitch.com",
    "canva.com",
]

success = []
failed = []

for domain in domains:
    filename = domain.replace(".", "-") + ".png"
    filepath = os.path.join(logos_dir, filename)
    url = f"https://logo.clearbit.com/{domain}?size=128"

    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=15) as response:
            content_type = response.headers.get("Content-Type", "")
            data = response.read()
            if "image" in content_type and len(data) > 100:
                with open(filepath, "wb") as f:
                    f.write(data)
                success.append(domain)
                print(f"OK:   {domain} -> {filename}")
            else:
                failed.append((domain, f"unexpected content-type: {content_type}"))
                print(f"FAIL: {domain} (content-type: {content_type})")
    except urllib.error.HTTPError as e:
        failed.append((domain, f"HTTP {e.code}"))
        print(f"FAIL: {domain} (HTTP {e.code})")
    except Exception as e:
        failed.append((domain, str(e)))
        print(f"FAIL: {domain} ({e})")

print(f"\n=== DONE: {len(success)} succeeded, {len(failed)} failed ===")
if failed:
    print("\nFailed:")
    for domain, reason in failed:
        print(f"  - {domain}: {reason}")
