'use client';

import { useEffect, useId, useState } from 'react';
import { BadgeCheck, Calendar, CheckCircle2, Clock, Copy, HeartPulse, HelpCircle, Loader2, Phone, Printer, ShieldCheck, User } from 'lucide-react';
import { CLINIC_DEPARTMENTS, CONTACTS, DOCTORS } from '@/lib/data';

interface BookingFormData {
  department: string;
  doctor: string;
  date: string;
  timeSlot: string;
  fullName: string;
  phone: string;
  nhisNumber: string;
  specialNeeds: string[];
  notes: string;
}

const SPECIAL_NEEDS_OPTIONS = [
  { id: 'wheelchair', label: 'Wheelchair / Mobility ramp assistance' },
  { id: 'translation', label: 'Language / Dialect assistance (Ewe, Likpakpa, Adele)' },
  { id: 'elderly', label: 'Senior citizen / Assisted triage queue' },
  { id: 'first_time', label: 'First visit (need to open a new physical folder)' },
] as const;

export default function AppointmentBooking() {
  const formId = useId();

  // Calculate default tomorrow date in YYYY-MM-DD
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const [form, setForm] = useState<BookingFormData>({
    department: 'opd',
    doctor: 'any',
    date: minDate,
    timeSlot: 'morning',
    fullName: '',
    phone: '',
    nhisNumber: '',
    specialNeeds: [],
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<{
    reference: string;
    details: BookingFormData;
    doctorName: string;
    departmentName: string;
  } | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  // Listen for doctor selection from DoctorProfiles component
  useEffect(() => {
    function onSelectDoctor(e: Event) {
      const customEvent = e as CustomEvent<{ doctorId: string; doctorName: string }>;
      if (customEvent.detail?.doctorId) {
        const docId = customEvent.detail.doctorId;
        const found = DOCTORS.find((d) => d.id === docId);
        let dept = 'opd';
        if (docId === 'dr-kojo-boateng') dept = 'obgyn';
        if (docId === 'dr-akosua-boakye') dept = 'paediatrics';
        if (docId === 'dr-emmanuel-osei') dept = 'surgery';
        if (docId === 'sr-dr-miriam-addo') dept = 'opd';

        setForm((prev) => ({
          ...prev,
          department: dept,
          doctor: docId,
        }));
      }
    }

    window.addEventListener('select-doctor-booking', onSelectDoctor);
    return () => window.removeEventListener('select-doctor-booking', onSelectDoctor);
  }, []);

  function handleCheckboxToggle(needId: string) {
    setForm((prev) => {
      const exists = prev.specialNeeds.includes(needId);
      return {
        ...prev,
        specialNeeds: exists
          ? prev.specialNeeds.filter((id) => id !== needId)
          : [...prev.specialNeeds, needId],
      };
    });
  }

  function validate(): boolean {
    const errs: Record<string, string> = {};

    if (!form.fullName.trim() || form.fullName.trim().length < 2) {
      errs.fullName = 'Please enter patient’s full name as shown on health cards.';
    }

    const cleanPhone = form.phone.replace(/[\s-]/g, '');
    if (!cleanPhone || cleanPhone.length < 9) {
      errs.phone = 'Please provide a valid active phone number for confirmation.';
    }

    if (!form.date) {
      errs.date = 'Please pick a consultation date.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) {
      const firstError = Object.keys(errors)[0];
      const el = document.getElementById(`${formId}-${firstError}`);
      el?.focus();
      return;
    }

    setSubmitting(true);

    // Simulate fast reliable booking API dispatch
    await new Promise((r) => setTimeout(r, 700));

    const selectedDoc = DOCTORS.find((d) => d.id === form.doctor);
    const selectedDept = CLINIC_DEPARTMENTS.find((d) => d.id === form.department);
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const bookingRef = `SJH-${new Date().getFullYear()}-${randomCode}`;

    setConfirmedBooking({
      reference: bookingRef,
      details: { ...form },
      doctorName: selectedDoc ? selectedDoc.name : 'First Available Attending Clinician',
      departmentName: selectedDept ? selectedDept.name : 'General Outpatient',
    });
    setSubmitting(false);
  }

  function copyBookingReference() {
    if (!confirmedBooking) return;
    navigator.clipboard.writeText(confirmedBooking.reference);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  }

  if (confirmedBooking) {
    return (
      <div
        role="region"
        aria-label="Appointment Confirmation"
        className="rounded-3xl border-2 border-emerald-500/30 bg-white p-6 shadow-xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-100 text-emerald-800">
              <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <span className="inline-block rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-semibold text-emerald-800">
                Booking Confirmed
              </span>
              <h3 className="font-display text-2xl font-bold text-ink">
                We look forward to welcoming you
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-tide"
          >
            <Printer className="h-4 w-4" aria-hidden="true" />
            Print slip
          </button>
        </div>

        {/* Reference Highlight */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-mist p-5 border border-slate-200">
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
              Your Booking Reference
            </span>
            <p className="font-mono text-2xl font-bold tracking-tight text-ink">
              {confirmedBooking.reference}
            </p>
            <p className="text-xs text-slate-600">Present this reference code or your phone number at the OPD Records counter.</p>
          </div>
          <button
            type="button"
            onClick={copyBookingReference}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-ink shadow-sm transition-colors hover:border-tide"
          >
            <Copy className="h-4 w-4" aria-hidden="true" />
            <span>{copiedRef ? 'Copied code!' : 'Copy Reference'}</span>
          </button>
        </div>

        {/* Appointment Details */}
        <dl className="mt-6 grid gap-4 sm:grid-cols-2 text-sm border-b border-slate-100 pb-6">
          <div className="rounded-xl border border-slate-200 p-4">
            <dt className="text-xs font-medium text-slate-500">Patient Full Name</dt>
            <dd className="mt-1 font-semibold text-ink">{confirmedBooking.details.fullName}</dd>
          </div>
          <div className="rounded-xl border border-slate-200 p-4">
            <dt className="text-xs font-medium text-slate-500">Department / Clinic</dt>
            <dd className="mt-1 font-semibold text-ink">{confirmedBooking.departmentName}</dd>
          </div>
          <div className="rounded-xl border border-slate-200 p-4">
            <dt className="text-xs font-medium text-slate-500">Assigned Doctor</dt>
            <dd className="mt-1 font-semibold text-ink">{confirmedBooking.doctorName}</dd>
          </div>
          <div className="rounded-xl border border-slate-200 p-4">
            <dt className="text-xs font-medium text-slate-500">Date & Slot</dt>
            <dd className="mt-1 font-semibold text-ink">
              {confirmedBooking.details.date} (
              {confirmedBooking.details.timeSlot === 'morning'
                ? 'Morning 08:30 – 11:30'
                : confirmedBooking.details.timeSlot === 'midday'
                ? 'Midday 12:00 – 14:30'
                : 'Afternoon 15:00 – 17:00'}
              )
            </dd>
          </div>
        </dl>

        {/* What to bring checklist */}
        <div className="mt-6 rounded-2xl bg-amber-50/70 p-5 border border-amber-200 text-xs text-amber-950">
          <p className="font-semibold text-sm text-amber-900 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-amber-800" aria-hidden="true" />
            Checklist for your appointment day:
          </p>
          <ul className="mt-2.5 space-y-1.5 list-disc list-inside">
            <li>Bring your <strong>valid NHIS Biometric Card</strong> or Ghana Card.</li>
            <li>Arrive 15 minutes before your time slot for vital signs triage (blood pressure, temperature, weight).</li>
            <li>If you have existing medical folders, lab results, or imaging scans, bring them along.</li>
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => {
              setConfirmedBooking(null);
              setForm({
                department: 'opd',
                doctor: 'any',
                date: minDate,
                timeSlot: 'morning',
                fullName: '',
                phone: '',
                nhisNumber: '',
                specialNeeds: [],
                notes: '',
              });
            }}
            className="cursor-pointer text-sm font-semibold text-tide underline hover:text-ink"
          >
            Book another appointment
          </button>

          <a
            href={CONTACTS.main[0].href}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-tide"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call OPD Desk ({CONTACTS.main[0].display})
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Patient appointment booking form"
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8"
    >
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-tide">
            Direct OPD & Specialist Scheduling
          </span>
          <h3 className="font-display text-2xl font-bold text-ink">
            Book a Clinic Appointment
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Guaranteed slot allocation with NHIS coverage support and priority accessibility assistance.
          </p>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-1 text-xs font-semibold text-ink border border-slate-200">
          <BadgeCheck className="h-4 w-4 text-tide" aria-hidden="true" />
          NHIS Accepted
        </span>
      </div>

      {/* Error Summary Banner */}
      {Object.keys(errors).length > 0 && (
        <div
          role="alert"
          aria-labelledby={`${formId}-error-title`}
          tabIndex={-1}
          className="mt-6 rounded-2xl bg-red-50 p-4 border border-red-200 text-sm text-red-900"
        >
          <p id={`${formId}-error-title`} className="font-semibold flex items-center gap-2">
            Please correct the following fields before proceeding:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1 text-xs">
            {Object.entries(errors).map(([field, msg]) => (
              <li key={field}>
                <a href={`#${formId}-${field}`} className="underline hover:text-red-950 font-medium">
                  {msg}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 space-y-6">
        {/* Department and Doctor Selection */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={`${formId}-department`} className="block text-sm font-semibold text-ink">
              Clinical Department <span className="text-alert">*</span>
            </label>
            <select
              id={`${formId}-department`}
              value={form.department}
              onChange={(e) => {
                const newDept = e.target.value;
                setForm((prev) => ({
                  ...prev,
                  department: newDept,
                  // If changing dept, reset doctor to any if not matching
                  doctor: 'any',
                }));
              }}
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-ink transition-colors focus:border-tide focus:outline-none focus:ring-2 focus:ring-tide/20"
            >
              {CLINIC_DEPARTMENTS.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name} ({dept.fee})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor={`${formId}-doctor`} className="block text-sm font-semibold text-ink">
              Preferred Doctor / Specialist
            </label>
            <select
              id={`${formId}-doctor`}
              value={form.doctor}
              onChange={(e) => setForm((prev) => ({ ...prev, doctor: e.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-ink transition-colors focus:border-tide focus:outline-none focus:ring-2 focus:ring-tide/20"
            >
              <option value="any">First Available Attending Doctor</option>
              {DOCTORS.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.name} — {doc.specialty}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Date and Time Slot */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={`${formId}-date`} className="block text-sm font-semibold text-ink">
              Preferred Date <span className="text-alert">*</span>
            </label>
            <div className="relative mt-1.5">
              <input
                id={`${formId}-date`}
                type="date"
                min={minDate}
                value={form.date}
                aria-invalid={!!errors.date}
                aria-describedby={errors.date ? `${formId}-date-err` : undefined}
                onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-ink transition-colors focus:border-tide focus:outline-none focus:ring-2 focus:ring-tide/20"
              />
            </div>
            {errors.date && (
              <p id={`${formId}-date-err`} className="mt-1 text-xs text-alert font-medium">
                {errors.date}
              </p>
            )}
          </div>

          <div>
            <label htmlFor={`${formId}-timeSlot`} className="block text-sm font-semibold text-ink">
              Preferred Time Slot <span className="text-alert">*</span>
            </label>
            <select
              id={`${formId}-timeSlot`}
              value={form.timeSlot}
              onChange={(e) => setForm((prev) => ({ ...prev, timeSlot: e.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-ink transition-colors focus:border-tide focus:outline-none focus:ring-2 focus:ring-tide/20"
            >
              <option value="morning">Morning (08:30 – 11:30)</option>
              <option value="midday">Midday (12:00 – 14:30)</option>
              <option value="afternoon">Afternoon (15:00 – 17:00)</option>
            </select>
          </div>
        </div>

        {/* Patient Details */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={`${formId}-fullName`} className="block text-sm font-semibold text-ink">
              Patient Full Name <span className="text-alert">*</span>
            </label>
            <input
              id={`${formId}-fullName`}
              type="text"
              value={form.fullName}
              placeholder="e.g. Ama Serwaa Mensah"
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? `${formId}-fullName-err` : undefined}
              onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-ink transition-colors focus:border-tide focus:outline-none focus:ring-2 focus:ring-tide/20"
            />
            {errors.fullName && (
              <p id={`${formId}-fullName-err`} className="mt-1 text-xs text-alert font-medium">
                {errors.fullName}
              </p>
            )}
          </div>

          <div>
            <label htmlFor={`${formId}-phone`} className="block text-sm font-semibold text-ink">
              Phone Number <span className="text-alert">*</span>
            </label>
            <input
              id={`${formId}-phone`}
              type="tel"
              value={form.phone}
              placeholder="e.g. 024 368 3887"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? `${formId}-phone-err` : `${formId}-phone-hint`}
              onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-ink transition-colors focus:border-tide focus:outline-none focus:ring-2 focus:ring-tide/20"
            />
            {errors.phone ? (
              <p id={`${formId}-phone-err`} className="mt-1 text-xs text-alert font-medium">
                {errors.phone}
              </p>
            ) : (
              <p id={`${formId}-phone-hint`} className="mt-1 text-xs text-slate-500">
                You will receive booking SMS confirmation at this number.
              </p>
            )}
          </div>
        </div>

        {/* NHIS Number */}
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor={`${formId}-nhisNumber`} className="block text-sm font-semibold text-ink">
              NHIS Card Number <span className="text-xs font-normal text-slate-500">(Optional)</span>
            </label>
            <span className="text-xs text-emerald-700 font-medium">Free OPD consultation with valid card</span>
          </div>
          <input
            id={`${formId}-nhisNumber`}
            type="text"
            value={form.nhisNumber}
            placeholder="e.g. 88204918 or Ghana Card ID"
            onChange={(e) => setForm((prev) => ({ ...prev, nhisNumber: e.target.value }))}
            className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-mono text-ink transition-colors focus:border-tide focus:outline-none focus:ring-2 focus:ring-tide/20"
          />
        </div>

        {/* Accessibility & Special Assistance Checklist */}
        <fieldset className="rounded-2xl border border-slate-200 bg-mist/40 p-4 sm:p-5">
          <legend className="px-2 text-sm font-semibold text-ink flex items-center gap-1.5">
            <HelpCircle className="h-4 w-4 text-tide" aria-hidden="true" />
            Accessibility & Clinic Assistance Needs
          </legend>
          <p className="text-xs text-slate-600 mb-3 px-2">
            Let us know ahead of time so our hospital orderlies and triage team can prepare support.
          </p>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {SPECIAL_NEEDS_OPTIONS.map((opt) => {
              const isChecked = form.specialNeeds.includes(opt.id);
              return (
                <label
                  key={opt.id}
                  className={`flex cursor-pointer items-start gap-2.5 rounded-xl border p-3 text-xs transition-colors duration-150 ${
                    isChecked
                      ? 'border-tide bg-white text-ink shadow-sm'
                      : 'border-slate-200 bg-white/80 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleCheckboxToggle(opt.id)}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-tide focus:ring-tide"
                  />
                  <span className="leading-snug font-medium">{opt.label}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* Symptoms / Reason for visit notes */}
        <div>
          <label htmlFor={`${formId}-notes`} className="block text-sm font-semibold text-ink">
            Reason for Visit or Symptoms <span className="text-xs font-normal text-slate-500">(Optional & Confidential)</span>
          </label>
          <textarea
            id={`${formId}-notes`}
            rows={2}
            value={form.notes}
            placeholder="Briefly describe what you are experiencing (e.g. routine maternity check, blood pressure review, child fever)..."
            onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
            className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-ink transition-colors focus:border-tide focus:outline-none focus:ring-2 focus:ring-tide/20"
          />
        </div>
      </div>

      {/* Trust & Submit */}
      <div className="mt-8 border-t border-slate-100 pt-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-1.5 text-xs text-slate-600">
            <ShieldCheck className="h-4 w-4 text-tide shrink-0" aria-hidden="true" />
            Your data is protected under Ghana Data Protection Act 2012 (Act 843).
          </p>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-ink px-6 py-3.5 text-base font-semibold text-white shadow-md transition-colors duration-150 hover:bg-tide active:scale-[0.99] disabled:opacity-70"
          >
            {submitting ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : null}
            {submitting ? 'Confirming Appointment...' : 'Confirm Appointment'}
          </button>
        </div>
      </div>
    </form>
  );
}
