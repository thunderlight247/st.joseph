import { CONTACTS, HOSPITAL } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-ink text-slate-200">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-xl font-semibold text-white">{HOSPITAL.name}</p>
          <p className="mt-2 text-sm">
            {HOSPITAL.address}, {HOSPITAL.town}. Ghana Post GPS: {HOSPITAL.gps}
          </p>
        </div>
        <div>
          <p className="font-semibold text-white">Call us</p>
          <ul className="mt-2 space-y-1 text-sm">
            {CONTACTS.main.map((c) => (
              <li key={c.href}>
                <a href={c.href} className="underline-offset-2 hover:underline">{c.display}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white">Part of</p>
          <ul className="mt-2 space-y-1 text-sm">
            {HOSPITAL.affiliations.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className="border-t border-white/10 px-4 py-4 text-center text-xs text-slate-300">
        © {new Date().getFullYear()} {HOSPITAL.name}. Prototype for board review.
      </p>
    </footer>
  );
}
