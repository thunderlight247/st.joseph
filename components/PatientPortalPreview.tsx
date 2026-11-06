'use client';

import { useState } from 'react';
import { BadgeCheck, CheckCircle2, ChevronRight, FileCheck, FileText, FlaskConical, Lock, Phone, Pill, ShieldAlert, ShieldCheck, User } from 'lucide-react';
import { CONTACTS, PATIENT_PORTAL_HIGHLIGHTS } from '@/lib/data';

type PortalTab = 'lab' | 'nhis' | 'prescriptions' | 'privacy';

export default function PatientPortalPreview() {
  const [activeTab, setActiveTab] = useState<PortalTab>('lab');
  const [demoLoginOpen, setDemoLoginOpen] = useState(false);
  const [inputFolder, setInputFolder] = useState('SJH-2024-8849');
  const [simulatedLoggedIn, setSimulatedLoggedIn] = useState(false);

  const { samplePatient } = PATIENT_PORTAL_HIGHLIGHTS;

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
      {/* Top Portal Trust Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 bg-ink px-4 sm:px-6 py-3.5 sm:py-4 text-white">
        <div className="flex items-center gap-3 min-w-0">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-tide/20 text-cyan-300">
            <Lock className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="font-display font-semibold text-white truncate text-sm sm:text-base">St. Joseph MyHealth</span>
              <span className="rounded-full bg-cyan-900/60 px-2 py-0.5 text-[11px] sm:text-xs font-medium text-cyan-200 border border-cyan-700/50">
                Interactive Preview
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-cyan-100/80 truncate">Encrypted Records • Act 843 Compliant</p>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs pt-1 sm:pt-0 border-t border-slate-700/50 sm:border-0">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-emerald-300">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            256-bit Security
          </span>
          <button
            type="button"
            onClick={() => setDemoLoginOpen((v) => !v)}
            className="cursor-pointer rounded-full bg-tide px-3.5 py-1.5 text-xs font-semibold text-white transition-colors duration-150 hover:bg-white hover:text-ink focus-visible:ring-2 focus-visible:ring-cyan-300 w-full sm:w-auto text-center"
          >
            {simulatedLoggedIn ? 'Logged in as Kwame M.' : 'Simulate Portal Login'}
          </button>
        </div>
      </div>

      {/* Demo Login Drawer (Accessible Simulation) */}
      {demoLoginOpen && (
        <div
          role="region"
          aria-label="Portal Login Simulation"
          className="border-b border-slate-200 bg-mist p-4 sm:p-5 transition-all"
        >
          <div className="mx-auto max-w-xl">
            <h4 className="font-display text-sm sm:text-base font-semibold text-ink">
              Try the MyHealth Secure Sign-in
            </h4>
            <p className="mt-1 text-xs text-slate-600">
              Patients sign in with their hospital folder number and a one-time SMS code sent to their registered phone.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSimulatedLoggedIn(true);
                setDemoLoginOpen(false);
              }}
              className="mt-3 flex flex-col gap-2.5 sm:flex-row"
            >
              <div className="flex-1">
                <label htmlFor="portal-folder-input" className="sr-only">
                  Hospital Folder Number
                </label>
                <input
                  id="portal-folder-input"
                  type="text"
                  value={inputFolder}
                  onChange={(e) => setInputFolder(e.target.value)}
                  placeholder="e.g. SJH-2024-8849"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-base sm:text-sm text-ink focus:border-tide focus:outline-none focus:ring-2 focus:ring-tide/20"
                />
              </div>
              <button
                type="submit"
                className="cursor-pointer rounded-xl bg-ink px-5 py-2.5 sm:py-2 text-sm font-semibold text-white transition-colors hover:bg-tide"
              >
                Sign in to Demo
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Patient Header Card (Simulated Patient) */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="grid h-10 w-10 sm:h-11 sm:w-11 shrink-0 place-items-center rounded-full bg-tide/10 text-tide font-bold font-display text-base sm:text-lg">
              KM
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-ink text-sm sm:text-base truncate">{samplePatient.name}</span>
                <span className="text-xs text-slate-500 font-mono">({samplePatient.folderNumber})</span>
              </div>
              <p className="text-xs text-slate-600 truncate">Last visit: {samplePatient.lastVisit}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-900 border border-emerald-300">
              <BadgeCheck className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
              {samplePatient.nhisStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Accessible Horizontal-Scrollable Tabs on Mobile */}
      <div className="border-b border-slate-200 px-4 sm:px-6 pt-1 bg-white">
        <div
          role="tablist"
          aria-label="Portal feature preview"
          className="flex overflow-x-auto gap-3 sm:gap-6 no-scrollbar pb-px"
        >
          {(
            [
              ['lab', 'Lab Results', FlaskConical],
              ['nhis', 'NHIS Status', BadgeCheck],
              ['prescriptions', 'Prescriptions', Pill],
              ['privacy', 'Privacy & Security', ShieldCheck],
            ] as const
          ).map(([key, label, Icon]) => {
            const isSelected = activeTab === key;
            return (
              <button
                key={key}
                role="tab"
                id={`tab-${key}`}
                aria-selected={isSelected}
                aria-controls={`panel-${key}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setActiveTab(key)}
                className={`flex shrink-0 cursor-pointer items-center gap-1.5 sm:gap-2 border-b-2 py-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors duration-150 ${
                  isSelected
                    ? 'border-tide text-tide'
                    : 'border-transparent text-slate-600 hover:border-slate-300 hover:text-ink'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Panels */}
      <div className="p-4 sm:p-6">
        {/* Panel 1: Lab Investigations */}
        {activeTab === 'lab' && (
          <div id="panel-lab" role="tabpanel" aria-labelledby="tab-lab" tabIndex={0} className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h4 className="font-display text-lg font-semibold text-ink">Recent Diagnostic Results</h4>
                <p className="text-xs text-slate-600">Certified by St. Joseph Hospital Pathology & Laboratory Unit</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-tide border border-cyan-200">
                <FileCheck className="h-3.5 w-3.5" aria-hidden="true" />
                {samplePatient.recentLab.status}
              </span>
            </div>

            <div className="rounded-xl border border-slate-200 p-4 bg-mist/50">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="font-semibold text-sm text-ink">{samplePatient.recentLab.test}</span>
                <span className="text-xs text-slate-500 font-mono">Date: {samplePatient.recentLab.date}</span>
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-white p-3 border border-slate-200">
                  <span className="text-xs font-medium text-slate-500">Haemoglobin (Hb)</span>
                  <p className="mt-1 font-semibold text-ink">{samplePatient.recentLab.hb}</p>
                  <span className="mt-1 inline-block text-[11px] text-emerald-700 font-medium">✓ Normal Range</span>
                </div>
                <div className="rounded-lg bg-white p-3 border border-slate-200">
                  <span className="text-xs font-medium text-slate-500">Malaria Parasite Film</span>
                  <p className="mt-1 font-semibold text-ink">{samplePatient.recentLab.malaria}</p>
                  <span className="mt-1 inline-block text-[11px] text-emerald-700 font-medium">✓ Clear (Negative)</span>
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-600 italic">
                Clinician note: Parameters are within safe baseline ranges. Continue prescribed hydration and follow-up as scheduled.
              </p>
            </div>
          </div>
        )}

        {/* Panel 2: NHIS Status */}
        {activeTab === 'nhis' && (
          <div id="panel-nhis" role="tabpanel" aria-labelledby="tab-nhis" tabIndex={0} className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h4 className="font-display text-lg font-semibold text-ink">National Health Insurance Status</h4>
                <p className="text-xs text-slate-600">Integrated verification with Ghana NHIA registry</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                Verified Active
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <span className="text-xs font-medium text-slate-500">Biometric Card ID</span>
                <p className="mt-1 font-mono font-semibold text-ink">NHIS-88204918</p>
                <p className="mt-2 text-xs text-slate-600">Registered at Nkwanta District Office</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <span className="text-xs font-medium text-slate-500">Renewal Validity</span>
                <p className="mt-1 font-semibold text-emerald-700">Valid until 14 Nov 2027</p>
                <p className="mt-2 text-xs text-slate-600">368 days remaining</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <span className="text-xs font-medium text-slate-500">Primary Care Facility</span>
                <p className="mt-1 font-semibold text-ink">St. Joseph Catholic Hospital</p>
                <p className="mt-2 text-xs text-slate-600">Provider code: VR-NKW-004</p>
              </div>
            </div>

            <div className="rounded-xl bg-mist p-4 text-xs text-slate-700">
              <p className="font-semibold text-ink">Need to renew an expired NHIS card?</p>
              <p className="mt-1">
                Dial <strong className="font-mono text-ink">*929#</strong> on your phone with Mobile Money, or visit our Records Desk for on-site assistance.
              </p>
            </div>
          </div>
        )}

        {/* Panel 3: Prescriptions */}
        {activeTab === 'prescriptions' && (
          <div id="panel-prescriptions" role="tabpanel" aria-labelledby="tab-prescriptions" tabIndex={0} className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h4 className="font-display text-lg font-semibold text-ink">Pharmacy & Prescription Records</h4>
                <p className="text-xs text-slate-600">Safe dosage tracking from clinician to pharmacy counter</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                1 active medication
              </span>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-50 text-tide">
                    <Pill className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-ink">{samplePatient.activePrescription.medication}</h5>
                    <p className="mt-1 text-sm font-medium text-slate-700">
                      Dosage: {samplePatient.activePrescription.dosage}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Dispensed by: {samplePatient.activePrescription.dispensedBy}
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200">
                  Ready & Dispensed
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600">
              Always complete the full course of antibiotics as prescribed by your medical clinician. If you experience adverse reactions, call our 24/7 hotline immediately.
            </p>
          </div>
        )}

        {/* Panel 4: Privacy & Security */}
        {activeTab === 'privacy' && (
          <div id="panel-privacy" role="tabpanel" aria-labelledby="tab-privacy" tabIndex={0} className="space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-tide" aria-hidden="true" />
              <h4 className="font-display text-lg font-semibold text-ink">Your Medical Privacy Is Protected</h4>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <h5 className="font-semibold text-sm text-ink flex items-center gap-1.5">
                  <Lock className="h-4 w-4 text-tide" aria-hidden="true" />
                  Act 843 Compliance
                </h5>
                <p className="mt-1.5 text-xs text-slate-700 leading-relaxed">
                  St. Joseph Catholic Hospital adheres strictly to the Ghana Data Protection Act 2012 (Act 843). Your health data is never shared with third parties without direct written authorization.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <h5 className="font-semibold text-sm text-ink flex items-center gap-1.5">
                  <User className="h-4 w-4 text-tide" aria-hidden="true" />
                  Clinician-Only Audit Logs
                </h5>
                <p className="mt-1.5 text-xs text-slate-700 leading-relaxed">
                  Only licensed doctors and nurses assigned to your direct care can unlock your diagnosis files. Every digital folder access is timestamped and monitored by our records administrator.
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
              <FileText className="h-4 w-4 text-slate-500 shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                To request physical copies of medical extracts or transfer notes for referrals in Ho, Accra, or Tamale, visit Sr. Administrator’s office or call {CONTACTS.administrator.display}.
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Trust Notice Bottom Bar */}
      <div className="border-t border-slate-200 bg-mist/60 px-6 py-3 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-3">
        <span>St. Joseph Catholic Hospital • Clinical Records & Health Informatics</span>
        <a
          href={CONTACTS.main[0].href}
          className="inline-flex items-center gap-1.5 font-semibold text-ink underline hover:text-tide"
        >
          <Phone className="h-3.5 w-3.5" aria-hidden="true" />
          Need records assistance? Call {CONTACTS.main[0].display}
        </a>
      </div>
    </div>
  );
}
