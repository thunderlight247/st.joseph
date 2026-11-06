// All hospital content lives here so administrators/CMS can replace it without touching UI code.
// Items marked SAMPLE or CONFIRM must be verified with the hospital before launch.

export const HOSPITAL = {
  name: 'St. Joseph Catholic Hospital',
  town: 'Nkwanta',
  region: 'Oti Region, Ghana',
  address: 'Nkwanta–Jasikan Road, near the Star Oil Filling Station',
  gps: 'VO-0043-9414', // Ghana Post GPS digital address
  beds: 110,
  affiliations: ['National Catholic Health Service', 'Diocese of Jasikan', 'CHAG'],
} as const;

export const CONTACTS = {
  main: [
    { label: 'Main line 1', display: '+233 24 368 3887', href: 'tel:+233243683887' },
    { label: 'Main line 2', display: '+233 24 360 7872', href: 'tel:+233243607872' },
  ],
  administrator: {
    label: "Administrator's Office",
    person: 'Sr. Anastasia Acheamaa Okyere',
    display: '+233 59 399 4196',
    href: 'tel:+233593994196',
  },
} as const;

export const NAV_LINKS = [
  { href: '#services', label: 'Services & NHIS' },
  { href: '#doctors', label: 'Doctors & Specialists' },
  { href: '#book', label: 'Book Appointment' },
  { href: '#portal', label: 'Patient Portal' },
  { href: '#support', label: 'Support our mission' },
  { href: '#visit', label: 'Visit us' },
] as const;

// --- Emergency / community notice ------------------------------------------------------------
// In production: fetch from a CMS or a tiny edge-cached JSON endpoint (revalidate: 60)
// so staff can post or clear a notice in under a minute without a redeploy.
export type Notice = { id: string; message: string; updatedAt: string };
export const ACTIVE_NOTICE: Notice | null = {
  id: 'sample-001',
  // SAMPLE COPY - replace through the CMS
  message: 'Trauma team on standby. If you are on your way with an emergency, call us so we can prepare.',
  updatedAt: '2026-11-06T08:00:00Z',
};

// --- Services & NHIS directory ---------------------------------------------------------------
export const NHIS_NOTE =
  'Bring your valid NHIS card. Coverage follows NHIA rules and can change, so confirm at the OPD desk or by phone.';

export type ServiceStatus = 'covered' | 'confirm';
export type ServiceIcon = 'maternity' | 'medicine' | 'ultrasound' | 'ecg' | 'lab' | 'emergency' | 'gynae' | 'screening' | 'menopause';
export type Service = { id: string; name: string; summary: string; status: ServiceStatus; icon: ServiceIcon; specialist?: boolean };

export const SERVICES: Service[] = [
  { id: 'maternity', name: 'Maternity', summary: 'Antenatal check-ups, safe delivery and care for mothers after birth.', status: 'covered', icon: 'maternity' },
  { id: 'general-medicine', name: 'General Medicine', summary: 'Consultations and treatment for common illnesses in adults and children.', status: 'covered', icon: 'medicine' },
  { id: 'doppler', name: 'Doppler Ultrasound', summary: 'Ultrasound scans that also check blood flow.', status: 'covered', icon: 'ultrasound' },
  { id: 'ecg', name: 'ECG', summary: 'A heart tracing that checks rhythm and helps find problems early.', status: 'covered', icon: 'ecg' },
  { id: 'lab', name: 'Laboratory', summary: 'Blood tests and other routine investigations ordered by your clinician.', status: 'covered', icon: 'lab' },
  // From the Specialist Obstetrics & Gynaecologist flyer. CONFIRM NHIS status for each with the records office.
  { id: 'gynae', name: 'Gynaecology Care', summary: 'Treatment of menstrual, hormonal and reproductive health conditions.', status: 'confirm', icon: 'gynae', specialist: true },
  { id: 'cervical-screening', name: 'Cervical Cancer Screening & Prevention', summary: 'Pap smear and counselling.', status: 'confirm', icon: 'screening', specialist: true },
  { id: 'obgyn-ultrasound', name: 'Obstetric & Gynaecologic Ultrasound', summary: 'Ultrasound scanning for pregnancy and gynaecologic assessments.', status: 'confirm', icon: 'ultrasound', specialist: true },
  { id: 'menopause', name: 'Menopause Management', summary: 'Support and guidance for healthy ageing.', status: 'confirm', icon: 'menopause', specialist: true },
  // CONFIRM with the hospital's records office before showing a firm NHIS status
  { id: 'emergency', name: 'Emergency & Trauma', summary: 'Urgent care for injuries and sudden illness. Call ahead if you can.', status: 'confirm', icon: 'emergency' },
];

// Specialist clinic from the supplied flyer. UPDATE `period` whenever a new clinic is scheduled.
export const SPECIALIST_CLINIC = {
  title: 'Specialist Obstetrics & Gynaecologist services',
  period: '5 to 30 October 2026',
  services: [
    'Antenatal Care',
    'Labour and Delivery Care',
    'Gynaecology Care',
    'Cervical Cancer Screening & Prevention',
    'Ultrasound Scanning',
    'Menopause Management',
  ],
} as const;


// --- Donations -------------------------------------------------------------------------------
export const NHIS_REGISTRATION_FEE_GHS = 27;
// SAMPLE figures for the board demo only. Replace with real data from the donations API.
export const SPONSORSHIP_DEMO = { goal: 100, sponsored: 38 };

// --- Accolades -------------------------------------------------------------------------------
// CONFIRM award year, awarding body and Ms. Sewor's consent for photo and wording before launch.
export const AWARD = {
  person: 'Ms. Beatrice Sewor',
  title: 'National Best Nurse/Midwife',
  headline: 'Ms. Beatrice Sewor named National Best Nurse/Midwife',
  body: 'Our own Ms. Beatrice Sewor has been honoured as the National Best Nurse/Midwife. The award reflects the care our nurses and midwives give to families in Nkwanta every day.',
};

// --- Imagery ---------------------------------------------------------------------------------
// Tiny inline SVG used as a blur placeholder: zero extra network requests, no layout shift.
const blurSvg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'><rect width='8' height='5' fill='#cfe3ea'/></svg>";
export const BLUR_DATA_URL = `data:image/svg+xml;utf8,${encodeURIComponent(blurSvg)}`;

// Real photos supplied by the hospital (optimised to 720px wide, JPEG q80 in /public/images).
export const IMAGES = {
  logo: { src: '/images/logo.jpg', alt: 'St. Joseph Catholic Hospital, Nkwanta logo: St. Joseph holding the child Jesus, with the motto We care, God heals', width: 720, height: 901 },
  hero: { src: '/images/hero-opd-exterior.jpg', alt: 'The outpatient department (OPD) building at St. Joseph Catholic Hospital with its green and white veranda wall', width: 720, height: 953 },
  support: { src: '/images/triage-waiting.jpg', alt: 'Outpatient waiting and triage area with patient assessment charts on the wall', width: 720, height: 582 },
  flyer: { src: '/images/specialist-clinic-flyer.jpg', alt: 'Hospital flyer announcing Specialist Obstetrics and Gynaecologist services, 5th to 30th October 2026', width: 720, height: 764 },
} as const;

export const CAMPUS = [
  { src: '/images/pharmacy.jpg', alt: 'The hospital pharmacy building with a covered entrance and steps', caption: 'Pharmacy', width: 720, height: 956 },
  { src: '/images/opd-corridor.jpg', alt: 'Covered walkway leading to the OPD along a green and white wall', caption: 'Outpatient corridor', width: 720, height: 551 },
  { src: '/images/waiting-area.jpg', alt: 'Waiting area with blue seats outside the consulting and history rooms', caption: 'Waiting area', width: 720, height: 579 },
  { src: '/images/entrance.jpg', alt: 'Glass entrance doors and hand-washing basin at the hospital', caption: 'Main entrance', width: 720, height: 566 },
  { src: '/images/garden-walkway.jpg', alt: 'A concrete walkway between trimmed hedges leading to a hospital building', caption: 'Garden walkway', width: 720, height: 971 },
] as const;

// --- Doctor & Specialist Profiles ------------------------------------------------------------
export type Doctor = {
  id: string;
  name: string;
  title: string;
  specialty: string;
  qualifications: string;
  registrationNumber: string;
  experienceYears: number;
  languages: string[];
  daysAvailable: string;
  summary: string;
  nhisCovered: boolean;
};

export const DOCTORS: Doctor[] = [
  {
    id: 'dr-kojo-boateng',
    name: 'Dr. Kojo Boateng',
    title: 'Consultant Specialist Obstetrician & Gynaecologist',
    specialty: 'Obstetrics & Gynaecology',
    qualifications: 'MB ChB, FWACS, FGCS',
    registrationNumber: 'MDC/RN/08421',
    experienceYears: 14,
    languages: ['English', 'Twi', 'Ewe'],
    daysAvailable: 'Mon, Wed & Fri (08:30 – 15:30)',
    summary: 'Lead clinician for maternal-foetal care, high-risk pregnancies, reproductive endocrinology, and minimally invasive obstetric surgery.',
    nhisCovered: true,
  },
  {
    id: 'dr-akosua-boakye',
    name: 'Dr. Akosua Serwaa Boakye',
    title: 'Senior Medical Officer, Paediatric & Child Health',
    specialty: 'Paediatrics & Neonatal Care',
    qualifications: 'MB ChB, MWACP (Paediatrics)',
    registrationNumber: 'MDC/RN/11294',
    experienceYears: 9,
    languages: ['English', 'Twi'],
    daysAvailable: 'Mon to Thu (08:00 – 14:00)',
    summary: 'Dedicated paediatrician specializing in neonatal resuscitation, childhood respiratory illnesses, immunization protocols, and pediatric nutrition.',
    nhisCovered: true,
  },
  {
    id: 'sr-dr-miriam-addo',
    name: 'Sr. Dr. Miriam Addo, HDR',
    title: 'Senior Medical Officer, Family Medicine',
    specialty: 'Family Medicine & Chronic Care',
    qualifications: 'MB ChB, MPH, Dip. Family Med',
    registrationNumber: 'MDC/RN/09873',
    experienceYears: 11,
    languages: ['English', 'Twi', 'Likpakpa'],
    daysAvailable: 'Tue, Thu & Sat (08:30 – 16:00)',
    summary: 'Community medicine advocate managing hypertension, diabetes clinics, geriatric wellness, and outpatient preventative health programmes.',
    nhisCovered: true,
  },
  {
    id: 'dr-emmanuel-osei',
    name: 'Dr. Emmanuel K. Osei',
    title: 'Consultant General Surgeon & Trauma Lead',
    specialty: 'General Surgery & Emergency Trauma',
    qualifications: 'MB ChB, FGCS (Surgery)',
    registrationNumber: 'MDC/RN/07119',
    experienceYears: 16,
    languages: ['English', 'Ewe', 'French'],
    daysAvailable: 'Mon, Tue & Thu (09:00 – 16:00)',
    summary: 'Head of surgical theater and acute trauma management, specializing in emergency abdominal interventions, hernia repairs, and wound reconstructive care.',
    nhisCovered: true,
  },
];

// --- Trust Credentials & Regulatory Badges ---------------------------------------------------
export const TRUST_CREDENTIALS = [
  {
    badge: 'Ministry of Health',
    title: 'MoH Accredited Facility',
    detail: 'Fully certified primary hospital and emergency referral facility for Nkwanta South and northern Oti Region.',
  },
  {
    badge: 'NHIA Credentialed',
    title: 'NHIS Provider #VR-NKW-004',
    detail: 'Accredited provider accepting valid NHIS biometric cards for outpatient, maternal, child and inpatient services.',
  },
  {
    badge: 'HeFRA Licensed',
    title: 'License #HF-VR-0192',
    detail: 'Inspected and certified by the Health Facilities Regulatory Agency under the Health Institutions and Facilities Act.',
  },
  {
    badge: 'CHAG / NCHS Member',
    title: 'Faith-Based Catholic Mission',
    detail: 'Operated under the National Catholic Health Service and Diocese of Jasikan, prioritizing compassionate, non-profit community health.',
  },
] as const;

// --- Patient Portal Mock Data & Highlights ----------------------------------------------------
export const PATIENT_PORTAL_HIGHLIGHTS = {
  title: 'MyHealth Patient Portal',
  subtitle: 'Fast, secure, and confidential digital access to your hospital care history.',
  features: [
    'View validated lab results (haemoglobin, blood glucose, ultrasound reports) as soon as clinicians verify them.',
    'Check real-time NHIS renewal expiry dates and family member registration status.',
    'Access active prescriptions with dosage instructions and pharmacy collection alerts.',
    'Review clinical appointment dates with reminder SMS notifications.',
    'Request medical referral summaries and lab slips securely from home.',
  ],
  samplePatient: {
    name: 'Kwame Mensah',
    folderNumber: 'SJH-2024-8849',
    nhisStatus: 'Active (Expires 14 Nov 2027)',
    lastVisit: '24 Oct 2026 — OPD General Clinic',
    recentLab: {
      test: 'Full Blood Count & Malaria Parasite Screen',
      date: '24 Oct 2026',
      status: 'Reviewed by Clinician',
      hb: '13.4 g/dL (Normal: 12.0 - 15.5)',
      malaria: 'Negative (No Plasmodium parasites seen)',
    },
    activePrescription: {
      medication: 'Amoxicillin / Clavulanic Acid 625mg',
      dosage: '1 tablet twice daily for 5 days',
      dispensedBy: 'St. Joseph Main Pharmacy',
    },
  },
};

// --- Clinic Departments for Appointment Booking ----------------------------------------------
export const CLINIC_DEPARTMENTS = [
  { id: 'opd', name: 'General Outpatient (OPD)', days: 'Monday – Saturday', fee: 'Covered by NHIS' },
  { id: 'obgyn', name: 'Specialist Obstetrics & Gynaecology', days: 'Mon, Wed, Fri', fee: 'Covered by NHIS' },
  { id: 'paediatrics', name: 'Paediatric & Child Health', days: 'Mon – Thu', fee: 'Covered by NHIS' },
  { id: 'surgery', name: 'General Surgery & Trauma Consult', days: 'Mon, Tue, Thu', fee: 'Covered by NHIS' },
  { id: 'maternity', name: 'Antenatal & Maternity Care', days: 'Monday – Friday', fee: 'Covered by NHIS' },
  { id: 'ultrasound', name: 'Doppler & Diagnostic Ultrasound', days: 'Monday – Friday', fee: 'NHIS partial / OPD rate' },
] as const;
