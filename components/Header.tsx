'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import Image from 'next/image';
import { Menu, Phone, X } from 'lucide-react';
import { CONTACTS, HOSPITAL, IMAGES, NAV_LINKS } from '@/lib/data';

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    if (open) {
      window.addEventListener('keydown', onKeyDown);
      return () => window.removeEventListener('keydown', onKeyDown);
    }
  }, [open]);

  return (
    // PERF: solid background instead of backdrop-blur. Blur filters are expensive on low-end phones.
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <a href="#top" className="flex items-center gap-2.5 sm:gap-3 min-w-0" aria-label={`${HOSPITAL.name}, home`}>
          {/* Decorative here: the link already has an aria-label with the hospital name */}
          <Image src={IMAGES.logo.src} alt="" width={IMAGES.logo.width} height={IMAGES.logo.height} sizes="44px" className="h-10 w-auto sm:h-12 shrink-0" />
          <span className="leading-tight min-w-0">
            <span className="block font-display text-base sm:text-lg font-semibold text-ink truncate">{HOSPITAL.name}</span>
            <span className="block text-xs text-slate-600 truncate">
              {HOSPITAL.town}, {HOSPITAL.region}
            </span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-slate-700 transition-colors hover:text-tide">
              {l.label}
            </a>
          ))}
          <a
            href={CONTACTS.main[0].href}
            className="inline-flex items-center gap-2 rounded-full bg-tide px-4 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-ink"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call the hospital
          </a>
        </nav>

        <button
          type="button"
          className="-mr-2 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg p-2 text-ink hover:bg-slate-100 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <m.nav
            id="mobile-menu"
            aria-label="Mobile"
            className="max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-slate-200 bg-white md:hidden"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="divide-y divide-slate-100 px-4 py-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-base font-medium text-slate-800 transition-colors hover:text-tide"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-3 pb-2">
                <a
                  href={CONTACTS.main[0].href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-tide py-3 text-sm font-semibold text-white transition-colors hover:bg-ink"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Call the hospital ({CONTACTS.main[0].display})
                </a>
              </li>
            </ul>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
