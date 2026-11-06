import { CONTACTS, HOSPITAL, NAV_LINKS } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-ink text-slate-200">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl font-semibold text-white">{HOSPITAL.name}</p>
          <p className="mt-2 text-sm text-slate-300">
            {HOSPITAL.address}, {HOSPITAL.town}. Ghana Post GPS: {HOSPITAL.gps}
          </p>
          <p className="mt-2 text-xs text-cyan-200/80">
            NHIA Provider #VR-NKW-004 • HeFRA License #HF-VR-0192
          </p>
        </div>

        <div>
          <p className="font-semibold text-white">Quick Navigation</p>
          <ul className="mt-2 space-y-1.5 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-slate-300 transition-colors hover:text-white hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white">24/7 Hotlines</p>
          <ul className="mt-2 space-y-1 text-sm">
            {CONTACTS.main.map((c) => (
              <li key={c.href}>
                <a href={c.href} className="text-slate-300 underline-offset-2 hover:text-white hover:underline">
                  {c.display}
                </a>
              </li>
            ))}
            <li className="pt-2 text-xs text-slate-400">
              Admin: {CONTACTS.administrator.display}
            </li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white">Accreditations</p>
          <ul className="mt-2 space-y-1 text-sm text-slate-300">
            {HOSPITAL.affiliations.map((a) => (
              <li key={a}>{a}</li>
            ))}
            <li>Ministry of Health, Ghana</li>
          </ul>
        </div>
      </div>
      <p className="border-t border-white/10 px-4 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {HOSPITAL.name}. Dedicated to faith-based, accessible community healthcare.
      </p>
    </footer>
  );
}
