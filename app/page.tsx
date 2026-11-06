import Image from 'next/image';
import { Calendar, ChevronDown, Lock, MapPin, Phone, ShieldCheck, Trophy, Users } from 'lucide-react';
import AppointmentBooking from '@/components/AppointmentBooking';
import BlurText from '@/components/BlurText';
import CopyGps from '@/components/CopyGps';
import DoctorProfiles from '@/components/DoctorProfiles';
import PatientPortalPreview from '@/components/PatientPortalPreview';
import ScrollReveal from '@/components/ScrollReveal';
import ServicesDirectory from '@/components/ServicesDirectory';
import SupportMission from '@/components/SupportMission';
import TrustBanner from '@/components/TrustBanner';
import { AWARD, BLUR_DATA_URL, CAMPUS, CONTACTS, HOSPITAL, IMAGES, NHIS_REGISTRATION_FEE_GHS, SPECIALIST_CLINIC } from '@/lib/data';

// Server Component: ships zero JS of its own. Interactive islands hydrate separately.
export default function HomePage() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${HOSPITAL.name} ${HOSPITAL.town}`)}`;

  return (
    <>
      {/* HERO: first paint is plain HTML + CSS. The image is the LCP element, so it gets `priority`. */}
      <section aria-labelledby="hero-title" className="bg-mist">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:pt-16">
          <div className="pb-4 lg:pb-16">
            <div className="mb-4 inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white px-3 sm:px-3.5 py-1 text-[11px] sm:text-xs font-semibold text-tide shadow-sm border border-slate-200 max-w-full">
              <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="truncate">Accredited Catholic Mission Hospital • Nkwanta, Oti</span>
            </div>

            <BlurText
              id="hero-title"
              text="Care you can trust, close to home in Nkwanta"
              className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl lg:text-5xl"
            />
            <p className="mt-4 sm:mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-slate-700">
              A {HOSPITAL.beds}-bed faith-based hospital serving Nkwanta and the Oti Region, run with the National Catholic Health
              Service and the Diocese of Jasikan. Compassionate, accessible healthcare under NHIS.
            </p>

            <div className="mt-6 sm:mt-8 max-w-md rounded-2xl bg-ink p-4 sm:p-5 text-white shadow-lg">
              <p className="flex items-center gap-2 text-xs sm:text-sm text-cyan-100 font-medium">
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                24/7 Outpatient & Emergency Lines
              </p>
              <ul className="mt-2.5 sm:mt-3 space-y-1">
                {CONTACTS.main.map((c) => (
                  <li key={c.href}>
                    <a href={c.href} className="block py-0.5 sm:py-1 text-xl sm:text-2xl font-semibold tracking-tight underline-offset-4 transition-colors hover:text-cyan-200">
                      {c.display}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <a
                href="#book"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-tide px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-ink focus-visible:ring-2 focus-visible:ring-tide focus-visible:ring-offset-2 w-full sm:w-auto text-center"
              >
                <Calendar className="h-4 w-4" aria-hidden="true" />
                Book an Appointment
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-tide transition-colors duration-150 hover:text-ink py-2 text-center"
              >
                See what NHIS covers
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[3rem] bg-slate-200 lg:rounded-tl-[6rem] lg:rounded-tr-2xl">
            <Image
              src={IMAGES.hero.src}
              alt={IMAGES.hero.alt}
              fill
              priority // preloads the LCP image
              sizes="(min-width: 1024px) 45vw, 100vw"
              quality={70}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* TRUST CREDENTIALS & ACCREDITATION BANNER */}
      <TrustBanner />

      {/* SERVICES & NHIS DIRECTORY */}
      <section id="services" aria-labelledby="services-title" className="scroll-mt-20 bg-white py-16">
        <ScrollReveal className="mx-auto max-w-6xl px-4">
          <div data-reveal className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-tide">Transparent Care</span>
            <h2 id="services-title" className="mt-1 font-display text-3xl font-semibold text-ink sm:text-4xl">
              Know what NHIS covers before you travel
            </h2>
            <p className="mt-3 text-slate-700 leading-relaxed">
              Some patients travel a long way, then find out a service is not available to them. Check our live directory first, or call our OPD desk.
            </p>
          </div>
          <div data-reveal className="mt-8">
            <ServicesDirectory />
          </div>

          {/* Specialist Clinic Announcement Card (Preserves IMAGES.flyer) */}
          <div data-reveal className="mt-12 grid gap-6 overflow-hidden rounded-2xl border border-slate-200 bg-mist md:grid-cols-[0.9fr_1.1fr]">
            <div className="relative aspect-[720/764]">
              <Image
                src={IMAGES.flyer.src}
                alt={IMAGES.flyer.alt}
                fill
                loading="lazy"
                sizes="(min-width: 768px) 40vw, 100vw"
                quality={75}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8">
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-tide">
                Specialist Clinic Update
              </span>
              <h3 className="mt-1 font-display text-2xl font-semibold text-ink">{SPECIALIST_CLINIC.title}</h3>
              <p className="mt-2 text-slate-700 leading-relaxed">
                Our specialist clinic was announced for {SPECIALIST_CLINIC.period}. Call our records desk to confirm upcoming clinic dates or schedule ahead.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {SPECIALIST_CLINIC.services.map((name) => (
                  <li key={name} className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-ink shadow-sm border border-slate-200/60">
                    {name}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#book"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-tide"
                >
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  Book with Specialist
                </a>
                <a
                  href={CONTACTS.main[0].href}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-colors duration-150 hover:border-tide"
                >
                  <Phone className="h-4 w-4 text-tide" aria-hidden="true" />
                  Call {CONTACTS.main[0].display}
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* DOCTORS & SPECIALISTS PROFILES */}
      <section id="doctors" aria-labelledby="doctors-title" className="scroll-mt-20 bg-mist/60 py-16 border-t border-slate-200">
        <ScrollReveal className="mx-auto max-w-6xl px-4">
          <div data-reveal className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-tide">
              Clinical Team & Leadership
            </span>
            <h2 id="doctors-title" className="mt-1 font-display text-3xl font-semibold text-ink sm:text-4xl">
              Experienced doctors dedicated to your family
            </h2>
            <p className="mt-3 text-slate-700 leading-relaxed">
              Our clinicians are licensed by the Medical and Dental Council (MDC) of Ghana, bringing specialized tertiary hospital experience right to Nkwanta.
            </p>
          </div>

          <div data-reveal className="mt-8">
            <DoctorProfiles />
          </div>
        </ScrollReveal>
      </section>

      {/* APPOINTMENT BOOKING */}
      <section id="book" aria-labelledby="book-title" className="scroll-mt-20 bg-white py-16 border-t border-slate-200">
        <ScrollReveal className="mx-auto max-w-4xl px-4">
          <div data-reveal className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-tide">
              Hassle-Free Patient Care
            </span>
            <h2 id="book-title" className="mt-1 font-display text-3xl font-semibold text-ink sm:text-4xl">
              Schedule Your Clinic Consultation
            </h2>
            <p className="mt-3 text-slate-700 leading-relaxed">
              Reserve an outpatient or specialist slot ahead of time. NHIS biometric registration is accepted, and special accessibility needs (such as wheelchair ramps or translation) are provided upon arrival.
            </p>
          </div>

          <div data-reveal>
            <AppointmentBooking />
          </div>
        </ScrollReveal>
      </section>

      {/* PATIENT PORTAL PREVIEW */}
      <section id="portal" aria-labelledby="portal-title" className="scroll-mt-20 bg-mist py-16 border-t border-slate-200">
        <ScrollReveal className="mx-auto max-w-5xl px-4">
          <div data-reveal className="max-w-2xl mx-auto text-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1 text-xs font-semibold text-ink shadow-sm border border-slate-200 mb-2">
              <Lock className="h-3.5 w-3.5 text-tide" aria-hidden="true" />
              Confidential Digital Health Records
            </div>
            <h2 id="portal-title" className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              MyHealth Patient Portal Preview
            </h2>
            <p className="mt-3 text-slate-700 leading-relaxed">
              Explore how patients at St. Joseph Catholic Hospital can privately review verified laboratory tests, check active NHIS expiration dates, and access prescription details under the Ghana Data Protection Act 2012 (Act 843).
            </p>
          </div>

          <div data-reveal>
            <PatientPortalPreview />
          </div>
        </ScrollReveal>
      </section>

      {/* SUPPORT OUR MISSION (Preserves IMAGES.support) */}
      <section id="support" aria-labelledby="support-title" className="scroll-mt-20 bg-ink py-16 text-white">
        <ScrollReveal className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2 lg:items-center">
          <div data-reveal>
            <h2 id="support-title" className="font-display text-3xl font-semibold sm:text-4xl">
              Help a neighbour register for NHIS
            </h2>
            <p className="mt-4 max-w-lg leading-relaxed text-slate-200">
              Like many mission hospitals, St. Joseph depends on internally generated funds (IGF) to run daily care, and those funds
              are under strain.
            </p>
            <p className="mt-3 max-w-lg leading-relaxed text-slate-200">
              Some people in our community cannot afford the GHS {NHIS_REGISTRATION_FEE_GHS} NHIS registration fee, so they wait until
              an illness is serious. A gift of GHS {NHIS_REGISTRATION_FEE_GHS} registers one person.
            </p>
            <div className="relative mt-8 hidden aspect-[4/3] max-w-lg overflow-hidden rounded-2xl border-2 border-candle sm:block">
              <Image
                src={IMAGES.support.src}
                alt={IMAGES.support.alt}
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 40vw, 90vw"
                quality={70}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="object-cover"
              />
            </div>
          </div>
          <div data-reveal>
            <SupportMission />
          </div>
        </ScrollReveal>
      </section>

      {/* ACCOLADES / NEWS (Preserves IMAGES.logo) */}
      <section id="news" aria-labelledby="news-title" className="scroll-mt-20 bg-white py-16">
        <ScrollReveal className="mx-auto max-w-6xl px-4">
          <h2 id="news-title" className="font-display text-3xl font-semibold text-ink" data-reveal>
            Celebrating our staff
          </h2>
          <article data-reveal className="mt-8 grid overflow-hidden rounded-2xl border border-slate-200 bg-mist md:grid-cols-[0.8fr_1.2fr]">
            <div className="grid place-items-center bg-white p-8 md:min-h-[22rem]">
              <Image
                src={IMAGES.logo.src}
                alt={IMAGES.logo.alt}
                width={IMAGES.logo.width}
                height={IMAGES.logo.height}
                loading="lazy"
                sizes="(min-width: 768px) 25vw, 60vw"
                className="h-auto w-48 md:w-56"
              />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-10">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-candle/30 px-3 py-1 text-sm font-semibold text-ink">
                <Trophy className="h-4 w-4" aria-hidden="true" />
                {AWARD.title}
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold text-ink sm:text-3xl">{AWARD.headline}</h3>
              <p className="mt-3 max-w-xl leading-relaxed text-slate-700">{AWARD.body}</p>
            </div>
          </article>
        </ScrollReveal>
      </section>

      {/* OUR HOSPITAL: real photos, preserved completely (CAMPUS array) */}
      <section id="campus" aria-labelledby="campus-title" className="scroll-mt-20 bg-white py-16">
        <ScrollReveal className="mx-auto max-w-6xl px-4">
          <h2 id="campus-title" data-reveal className="font-display text-3xl font-semibold text-ink">
            A look around the hospital
          </h2>
          <p data-reveal className="mt-3 max-w-2xl text-slate-700">Know what to expect when you arrive.</p>
          <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
            {CAMPUS.map((photo) => (
              <li key={photo.src} data-reveal className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-200">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  loading="lazy"
                  sizes="(min-width: 768px) 33vw, 50vw"
                  quality={70}
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover"
                />
                <span className="absolute inset-x-0 bottom-0 bg-ink/80 px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-white truncate">{photo.caption}</span>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </section>

      {/* VISIT US */}
      <section id="visit" aria-labelledby="visit-title" className="scroll-mt-20 bg-mist py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2">
          <div>
            <h2 id="visit-title" className="font-display text-3xl font-semibold text-ink">
              Find us in Nkwanta
            </h2>
            <p className="mt-4 flex items-start gap-2 text-slate-700">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-tide" aria-hidden="true" />
              {HOSPITAL.address}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <p className="text-sm text-slate-700">
                Ghana Post GPS: <strong className="text-ink">{HOSPITAL.gps}</strong>
              </p>
              <CopyGps code={HOSPITAL.gps} />
            </div>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-tide px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-ink w-full sm:w-auto text-center"
            >
              <span>Open in Google Maps</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>

          <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-slate-200/60">
            <h3 className="font-display text-xl font-semibold text-ink">Phone numbers & Inquiries</h3>
            <ul className="mt-4 divide-y divide-slate-200">
              {CONTACTS.main.map((c) => (
                <li key={c.href} className="py-3">
                  <a href={c.href} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-3">
                    <span className="text-xs sm:text-sm text-slate-600">{c.label}</span>
                    <span className="inline-flex items-center gap-2 text-base sm:text-lg font-semibold text-ink">
                      <Phone className="h-4 w-4 text-tide shrink-0" aria-hidden="true" />
                      {c.display}
                    </span>
                  </a>
                </li>
              ))}
              <li className="py-3">
                <a href={CONTACTS.administrator.href} className="block">
                  <span className="block text-xs sm:text-sm text-slate-600">
                    {CONTACTS.administrator.label}, {CONTACTS.administrator.person}
                  </span>
                  <span className="mt-1 inline-flex items-center gap-2 text-base sm:text-lg font-semibold text-ink">
                    <Phone className="h-4 w-4 text-tide shrink-0" aria-hidden="true" />
                    {CONTACTS.administrator.display}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
