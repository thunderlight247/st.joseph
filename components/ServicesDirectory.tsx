'use client';

import { useMemo, useState } from 'react';
import { Activity, Baby, BadgeCheck, FlaskConical, HeartPulse, PhoneCall, Ribbon, Search, Siren, Sprout, Stethoscope, Waves } from 'lucide-react';
import { CONTACTS, NHIS_NOTE, SERVICES, type ServiceIcon } from '@/lib/data';

function Venus(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="8" r="5" />
      <path d="M12 13v8" />
      <path d="M9 18h6" />
    </svg>
  );
}

const ICONS: Record<ServiceIcon, React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>> = {
  maternity: Baby,
  medicine: Stethoscope,
  ultrasound: Waves,
  ecg: HeartPulse,
  lab: FlaskConical,
  emergency: Siren,
  gynae: Venus,
  screening: Ribbon,
  menopause: Sprout,
};

type Filter = 'all' | 'covered';

// A real <table> for screen readers and desktop; on phones each row becomes a stacked card
// using display:block (no duplicated markup, so the DOM stays small).
export default function ServicesDirectory() {
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SERVICES.filter(
      (s) =>
        (filter === 'all' || s.status === 'covered') &&
        (!q || s.name.toLowerCase().includes(q) || s.summary.toLowerCase().includes(q)),
    );
  }, [filter, query]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div role="group" aria-label="Filter services" className="flex gap-2">
          {(
            [
              ['all', 'All services'],
              ['covered', 'Covered by NHIS'],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                filter === value ? 'border-ink bg-ink text-white' : 'border-slate-300 bg-white text-slate-700 hover:border-tide'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <label className="relative block sm:w-72">
          <span className="sr-only">Search services</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services"
            className="w-full rounded-full border border-slate-300 bg-white py-2 pl-9 pr-4 text-sm"
          />
        </label>
      </div>

      <table className="mt-5 w-full border-collapse text-left">
        <caption className="sr-only">St. Joseph Catholic Hospital services and NHIS coverage</caption>
        <thead className="sr-only md:not-sr-only md:table-header-group">
          <tr className="border-b border-slate-300 text-sm text-slate-600">
            <th scope="col" className="py-3 pr-4 font-semibold">Service</th>
            <th scope="col" className="py-3 pr-4 font-semibold">What it includes</th>
            <th scope="col" className="py-3 font-semibold">NHIS</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((s) => {
            const Icon = ICONS[s.icon];
            const covered = s.status === 'covered';
            return (
              <tr key={s.id} className="mb-3 block rounded-xl border border-slate-200 bg-white p-4 md:mb-0 md:table-row md:rounded-none md:border-0 md:border-b md:bg-transparent md:p-0">
                <th scope="row" className="block text-base font-semibold text-ink md:table-cell md:py-4 md:pr-4 md:align-top">
                  <span className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-mist text-tide">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>
                      {s.name}
                      {s.specialist ? (
                        <span className="ml-2 rounded bg-candle/30 px-1.5 py-0.5 text-xs font-medium text-ink">Specialist clinic</span>
                      ) : null}
                    </span>
                  </span>
                </th>
                <td className="mt-2 block text-sm text-slate-700 md:mt-0 md:table-cell md:max-w-md md:py-4 md:pr-4 md:align-top">{s.summary}</td>
                <td className="mt-3 block md:mt-0 md:table-cell md:py-4 md:align-top">
                  {covered ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-tide/10 px-3 py-1 text-sm font-medium text-tide">
                      <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                      Covered by NHIS
                    </span>
                  ) : (
                    <a href={CONTACTS.main[0].href} className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-900">
                      <PhoneCall className="h-4 w-4" aria-hidden="true" />
                      Call to confirm
                    </a>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {rows.length === 0 && (
        <p className="mt-4 rounded-xl bg-mist p-4 text-sm text-slate-700" role="status">
          No service matches your search. Call{' '}
          <a href={CONTACTS.main[0].href} className="font-semibold text-ink underline">{CONTACTS.main[0].display}</a>{' '}
          and we will point you to the right department.
        </p>
      )}
      <p className="mt-4 text-sm text-slate-600">{NHIS_NOTE}</p>
    </div>
  );
}
