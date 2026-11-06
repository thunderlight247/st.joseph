'use client';

import { useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { Phone, TriangleAlert, X } from 'lucide-react';
import { ACTIVE_NOTICE, CONTACTS } from '@/lib/data';

// Rendered in the server HTML (no layout shift on load). Dismissal lasts for this visit only:
// emergency notices should come back on the next page load.
export default function EmergencyBanner() {
  const [open, setOpen] = useState(true);
  if (!ACTIVE_NOTICE) return null;

  return (
    <AnimatePresence initial={false}>
      {open && (
        <m.div
          role="alert"
          className="overflow-hidden bg-alert text-white"
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="mx-auto flex max-w-6xl items-start gap-3 px-4 py-2.5 text-sm">
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <p className="flex-1 leading-snug">
              {ACTIVE_NOTICE.message}{' '}
              <a
                href={CONTACTS.main[0].href}
                className="inline-flex items-center gap-1 whitespace-nowrap font-semibold underline underline-offset-2"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                {CONTACTS.main[0].display}
              </a>
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="-m-2 rounded p-2 hover:bg-white/10"
              aria-label="Dismiss notice"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
