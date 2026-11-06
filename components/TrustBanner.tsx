import { BadgeCheck, HeartPulse, Hospital, ShieldCheck } from 'lucide-react';
import { TRUST_CREDENTIALS } from '@/lib/data';

export default function TrustBanner() {
  const icons = [ShieldCheck, BadgeCheck, Hospital, HeartPulse];

  return (
    <section aria-label="Hospital Accreditations and Trust Credentials" className="border-y border-slate-200 bg-white py-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_CREDENTIALS.map((cred, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={cred.badge}
                className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-mist/40 p-4 transition-colors hover:border-tide/30 hover:bg-mist/70"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-tide/10 text-tide">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="inline-block rounded-full bg-slate-200/60 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-ink">
                    {cred.badge}
                  </span>
                  <h3 className="mt-1 font-display text-sm font-bold text-ink">{cred.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">{cred.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
