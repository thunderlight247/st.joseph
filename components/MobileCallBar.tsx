import { Phone } from 'lucide-react';
import { CONTACTS } from '@/lib/data';

// Thumb-reach click-to-call, pinned to the bottom on phones. Plain links: works without JS.
export default function MobileCallBar() {
  return (
    <nav
      aria-label="Quick call emergency bar"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-slate-200/90 bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(0,0,0,0.08)] md:hidden"
    >
      <a
        href={CONTACTS.main[0].href}
        className="flex min-h-[50px] items-center justify-center gap-2 bg-ink px-3 py-3 text-center text-xs sm:text-sm font-semibold text-white active:bg-tide transition-colors"
      >
        <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>Line 1 ({CONTACTS.main[0].display.split(' ').slice(1).join(' ')})</span>
      </a>
      <a
        href={CONTACTS.main[1].href}
        className="flex min-h-[50px] items-center justify-center gap-2 bg-slate-50 px-3 py-3 text-center text-xs sm:text-sm font-semibold text-ink active:bg-slate-200 transition-colors border-l border-slate-200"
      >
        <Phone className="h-4 w-4 shrink-0 text-tide" aria-hidden="true" />
        <span>Line 2 ({CONTACTS.main[1].display.split(' ').slice(1).join(' ')})</span>
      </a>
    </nav>
  );
}
