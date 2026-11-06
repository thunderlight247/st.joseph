'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export default function CopyGps({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the code is still visible on screen */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? 'Digital address copied to clipboard' : 'Copy Ghana Post GPS digital address'}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors duration-150 ${
        copied
          ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
          : 'border-slate-300 text-ink hover:border-tide hover:bg-mist/50'
      }`}
    >
      {copied ? <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
      <span aria-live="polite">{copied ? 'Copied' : 'Copy code'}</span>
    </button>
  );
}
