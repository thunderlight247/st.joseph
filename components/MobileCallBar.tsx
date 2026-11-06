import { Phone } from 'lucide-react';
import { CONTACTS } from '@/lib/data';

// Thumb-reach click-to-call, pinned to the bottom on phones. Plain links: works without JS.
export default function MobileCallBar() {
  return (
    <nav
      aria-label="Quick call"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <a href={CONTACTS.main[0].href} className="flex items-center justify-center gap-2 bg-ink py-3.5 text-sm font-semibold text-white">
        <Phone className="h-4 w-4" aria-hidden="true" />
        Call main line
      </a>
      <a href={CONTACTS.main[1].href} className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-ink">
        <Phone className="h-4 w-4" aria-hidden="true" />
        Call second line
      </a>
    </nav>
  );
}
