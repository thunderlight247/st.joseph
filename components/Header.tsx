'use client';

import { useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import Image from 'next/image';
import { Menu, Phone, X } from 'lucide-react';
import { CONTACTS, HOSPITAL, IMAGES, NAV_LINKS } from '@/lib/data';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    // PERF: solid background instead of backdrop-blur. Blur filters are expensive on low-end phones.
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <a href="#top" className="flex items-center gap-3" aria-label={`${HOSPITAL.name}, home`}>
          {/* Decorative here: the link already has an aria-label with the hospital name */}
          <Image src={IMAGES.logo.src} alt="" width={IMAGES.logo.width} height={IMAGES.logo.height} sizes="44px" className="h-12 w-auto" />
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold text-ink">{HOSPITAL.name}</span>
            <span className="block text-xs text-slate-600">
              {HOSPITAL.town}, {HOSPITAL.region}
            </span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-slate-700 hover:text-tide">
              {l.label}
            </a>
          ))}
          <a
            href={CONTACTS.main[0].href}
            className="inline-flex items-center gap-2 rounded-full bg-tide px-4 py-2 text-sm font-semibold text-white hover:bg-ink"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call the hospital
          </a>
        </nav>

        <button
          type="button"
          className="-mr-2 rounded-lg p-2 text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
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
            className="overflow-hidden border-t border-slate-200 bg-white md:hidden"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="px-4 py-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-base font-medium text-slate-800"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
