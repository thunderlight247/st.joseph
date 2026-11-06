'use client';

import { useMemo, useState } from 'react';
import { BadgeCheck, CalendarDays, Clock, Globe, GraduationCap, ShieldCheck, Stethoscope } from 'lucide-react';
import { DOCTORS, type Doctor } from '@/lib/data';

type SpecialtyFilter = 'all' | 'obgyn' | 'paediatrics' | 'family' | 'surgery';

const FILTER_LABELS: Record<SpecialtyFilter, string> = {
  all: 'All Doctors',
  obgyn: 'Obstetrics & Gynaecology',
  paediatrics: 'Paediatrics',
  family: 'Family Medicine',
  surgery: 'General Surgery',
};

export default function DoctorProfiles({
  onSelectDoctor,
}: {
  onSelectDoctor?: (doctorId: string, doctorName: string) => void;
}) {
  const [filter, setFilter] = useState<SpecialtyFilter>('all');

  const filteredDoctors = useMemo(() => {
    if (filter === 'all') return DOCTORS;
    if (filter === 'obgyn') return DOCTORS.filter((d) => d.id === 'dr-kojo-boateng');
    if (filter === 'paediatrics') return DOCTORS.filter((d) => d.id === 'dr-akosua-boakye');
    if (filter === 'family') return DOCTORS.filter((d) => d.id === 'sr-dr-miriam-addo');
    if (filter === 'surgery') return DOCTORS.filter((d) => d.id === 'dr-emmanuel-osei');
    return DOCTORS;
  }, [filter]);

  function handleBook(doctor: Doctor) {
    if (onSelectDoctor) {
      onSelectDoctor(doctor.id, doctor.name);
    }
    const bookSection = document.getElementById('book');
    if (bookSection) {
      bookSection.scrollIntoView({ behavior: 'smooth' });
    }
    // Also dispatch event in case AppointmentBooking is listening
    window.dispatchEvent(
      new CustomEvent('select-doctor-booking', {
        detail: { doctorId: doctor.id, doctorName: doctor.name },
      })
    );
  }

  return (
    <div>
      {/* Specialty Filter Pills */}
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter doctors by clinical specialty">
        {(Object.keys(FILTER_LABELS) as SpecialtyFilter[]).map((key) => {
          const isActive = filter === key;
          return (
            <button
              key={key}
              type="button"
              aria-pressed={isActive}
              onClick={() => setFilter(key)}
              className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                isActive
                  ? 'border-ink bg-ink text-white shadow-sm'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-tide hover:text-ink'
              }`}
            >
              {FILTER_LABELS[key]}
            </button>
          );
        })}
      </div>

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Showing {filteredDoctors.length} {filteredDoctors.length === 1 ? 'doctor' : 'doctors'}
      </div>

      {/* Doctor Cards Grid */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {filteredDoctors.map((doc) => (
          <article
            key={doc.id}
            aria-labelledby={`doctor-name-${doc.id}`}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-tide/50 hover:shadow-md"
          >
            <div>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  {/* High contrast visual avatar initials */}
                  <div
                    aria-hidden="true"
                    className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-mist font-display text-xl font-bold text-tide border border-slate-200/80"
                  >
                    {doc.name.replace(/^(Dr\.|Sr\. Dr\.)\s*/, '').slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 id={`doctor-name-${doc.id}`} className="font-display text-xl font-bold text-ink">
                      {doc.name}
                    </h3>
                    <p className="text-sm font-medium text-tide">{doc.title}</p>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                      <GraduationCap className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{doc.qualifications}</span>
                    </div>
                  </div>
                </div>

                <span
                  title="Accepted under NHIS coverage"
                  className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200 shrink-0"
                >
                  <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  NHIS
                </span>
              </div>

              {/* Bio summary */}
              <p className="mt-4 text-sm leading-relaxed text-slate-700">{doc.summary}</p>

              {/* Trust & Clinical Details */}
              <dl className="mt-5 space-y-2.5 border-t border-slate-100 pt-4 text-xs">
                <div className="flex items-center justify-between text-slate-700">
                  <dt className="flex items-center gap-1.5 font-medium text-slate-600">
                    <ShieldCheck className="h-3.5 w-3.5 text-tide shrink-0" aria-hidden="true" />
                    <span>MDC Ghana Reg:</span>
                  </dt>
                  <dd className="font-mono font-semibold text-ink">{doc.registrationNumber}</dd>
                </div>

                <div className="flex items-center justify-between text-slate-700">
                  <dt className="flex items-center gap-1.5 font-medium text-slate-600">
                    <Clock className="h-3.5 w-3.5 text-tide shrink-0" aria-hidden="true" />
                    <span>Experience:</span>
                  </dt>
                  <dd className="font-semibold text-ink">{doc.experienceYears}+ years clinical practice</dd>
                </div>

                <div className="flex items-center justify-between text-slate-700">
                  <dt className="flex items-center gap-1.5 font-medium text-slate-600">
                    <CalendarDays className="h-3.5 w-3.5 text-tide shrink-0" aria-hidden="true" />
                    <span>Clinic Days:</span>
                  </dt>
                  <dd className="font-medium text-ink">{doc.daysAvailable}</dd>
                </div>

                <div className="flex items-center justify-between text-slate-700">
                  <dt className="flex items-center gap-1.5 font-medium text-slate-600">
                    <Globe className="h-3.5 w-3.5 text-tide shrink-0" aria-hidden="true" />
                    <span>Languages:</span>
                  </dt>
                  <dd className="font-medium text-ink">{doc.languages.join(', ')}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Stethoscope className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                In-person consultation
              </span>
              <button
                type="button"
                onClick={() => handleBook(doc)}
                className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-tide focus-visible:ring-2 focus-visible:ring-tide focus-visible:ring-offset-2"
              >
                Book with {doc.name.split(' ')[1] || doc.name}
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
