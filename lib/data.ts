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
  { href: '#support', label: 'Support our mission' },
  { href: '#news', label: 'News' },
  { href: '#campus', label: 'Our hospital' },
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
