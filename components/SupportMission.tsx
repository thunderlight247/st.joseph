'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { CheckCircle2, CreditCard, HeartHandshake, Loader2, Smartphone } from 'lucide-react';
import { NHIS_REGISTRATION_FEE_GHS, SPONSORSHIP_DEMO } from '@/lib/data';
import { DONATIONS_LIVE, initializeDonation, type PaymentMethod } from '@/lib/payments';

const OPTIONS = [1, 5, 10, 25] as const;
type Status = 'idle' | 'loading' | 'done' | 'error';

export default function SupportMission() {
  const [count, setCount] = useState<number>(5);
  const [method, setMethod] = useState<PaymentMethod>('momo');
  const [status, setStatus] = useState<Status>('idle');
  const total = count * NHIS_REGISTRATION_FEE_GHS;

  // GSAP ScrollTrigger: the progress bar fills once when it scrolls into view.
  const barRef = useRef<HTMLDivElement>(null);
  const pct = Math.min(100, Math.round((SPONSORSHIP_DEMO.sponsored / SPONSORSHIP_DEMO.goal) * 100));

  useEffect(() => {
    const bar = barRef.current;
    if (!bar || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let cancelled = false;
    let tween: { kill: () => void; scrollTrigger?: { kill: () => void } } | undefined;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      // The SSR width is already `pct`, so it is correct without JS; GSAP replays it from 0.
      tween = gsap.fromTo(
        bar,
        { width: '0%' },
        { width: `${pct}%`, duration: 1.2, ease: 'power2.out', scrollTrigger: { trigger: bar, start: 'top 90%', once: true } },
      );
    })();

    return () => {
      cancelled = true;
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, [pct]);

  async function donate() {
    setStatus('loading');
    try {
      const res = await initializeDonation({ registrations: count, amountGHS: total, method });
      if (res.checkoutUrl) {
        window.location.assign(res.checkoutUrl); // provider-hosted MoMo / card checkout
        return;
      }
      setStatus('done');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="rounded-2xl bg-white p-5 text-slate-800 shadow-xl sm:p-6">
      <div className="flex items-center gap-2 font-display text-xl font-semibold text-ink">
        <HeartHandshake className="h-6 w-6 text-tide" aria-hidden="true" />
        Sponsor NHIS registrations
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-sm">
          <span>{SPONSORSHIP_DEMO.sponsored} of {SPONSORSHIP_DEMO.goal} registrations sponsored</span>
          <span className="text-slate-500">Sample figures</span>
        </div>
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={SPONSORSHIP_DEMO.goal}
          aria-valuenow={SPONSORSHIP_DEMO.sponsored}
          aria-label="Registrations sponsored"
          className="mt-2 h-3 overflow-hidden rounded-full bg-mist"
        >
          <div ref={barRef} className="h-full rounded-full bg-tide" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <fieldset className="mt-5">
        <legend className="text-sm font-semibold">How many people will you register?</legend>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {OPTIONS.map((n) => (
            <label key={n} className="block">
              <input type="radio" name="count" value={n} checked={count === n} onChange={() => setCount(n)} className="peer sr-only" />
              <span className="block cursor-pointer rounded-xl border border-slate-300 py-3 text-center text-lg font-semibold peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-tide peer-focus-visible:ring-offset-2">
                {n}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-5">
        <legend className="text-sm font-semibold">Pay with</legend>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {(
            [
              ['momo', 'Mobile Money', Smartphone],
              ['card', 'Card', CreditCard],
            ] as const
          ).map(([value, label, Icon]) => (
            <label key={value} className="block">
              <input type="radio" name="method" value={value} checked={method === value} onChange={() => setMethod(value)} className="peer sr-only" />
              <span className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-300 py-3 text-sm font-medium peer-checked:border-tide peer-checked:bg-tide/10 peer-checked:text-ink peer-focus-visible:ring-2 peer-focus-visible:ring-tide peer-focus-visible:ring-offset-2">
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="button"
        onClick={donate}
        disabled={status === 'loading'}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-ink py-3.5 text-base font-semibold text-white hover:bg-tide disabled:opacity-70"
      >
        {status === 'loading' ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : null}
        {status === 'loading' ? 'Starting payment' : `Give GHS ${total}`}
      </button>
      <p className="mt-2 text-center text-xs text-slate-600">
        GHS {NHIS_REGISTRATION_FEE_GHS} registers one person. Payments by Paystack or Korapay.
      </p>

      <div aria-live="polite">
        <AnimatePresence>
          {status === 'done' && (
            <m.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 flex items-start gap-2 rounded-xl bg-mist p-3 text-sm text-ink">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-tide" aria-hidden="true" />
              {DONATIONS_LIVE ? 'Thank you for your gift.' : 'Prototype only: no payment was taken. Live checkout opens here once the payment keys are connected.'}
            </m.p>
          )}
          {status === 'error' && (
            <m.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-alert">
              We could not start the payment. Check your connection and try again.
            </m.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
