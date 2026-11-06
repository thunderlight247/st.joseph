import Image from 'next/image';
import { ChevronDown, MapPin, Phone, Trophy } from 'lucide-react';
import BlurText from '@/components/BlurText';
import CopyGps from '@/components/CopyGps';
import ScrollReveal from '@/components/ScrollReveal';
import ServicesDirectory from '@/components/ServicesDirectory';
import SupportMission from '@/components/SupportMission';
import { AWARD, BLUR_DATA_URL, CAMPUS, CONTACTS, HOSPITAL, IMAGES, NHIS_REGISTRATION_FEE_GHS, SPECIALIST_CLINIC } from '@/lib/data';

// Server Component: ships zero JS of its own. Only the interactive islands
// (directory, donation card, GPS copy) hydrate, which keeps 3G load times low.
export default function HomePage() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${HOSPITAL.name} ${HOSPITAL.town}`)}`;

  return (
    <>
      {/* HERO: first paint is plain HTML + CSS. The image is the LCP element, so it gets `priority`. */}
      <section aria-labelledby="hero-title" className="bg-mist">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:pt-16">
          <div className="pb-4 lg:pb-16">
            <BlurText
              id="hero-title"
              text="Care you can trust, close to home in Nkwanta"
              className="font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl"
            />
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-700">
              A {HOSPITAL.beds}-bed faith-based hospital serving Nkwanta and the Oti Region, run with the National Catholic Health
              Service and the Diocese of Jasikan.
            </p>

            <div className="mt-8 max-w-md rounded-2xl bg-ink p-5 text-white shadow-lg">
              <p className="flex items-center gap-2 text-sm text-cyan-100">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call the hospital
              </p>
              <ul className="mt-3 space-y-1">
                {CONTACTS.main.map((c) => (
                  <li key={c.href}>
                    <a href={c.href} className="block py-1 text-2xl font-semibold tracking-tight underline-offset-4 hover:underline">
                      {c.display}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <a href="#services" className="mt-6 inline-flex items-center gap-2 font-semibold text-tide hover:text-ink">
              See what NHIS covers
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[3rem] bg-slate-200 lg:rounded-tl-[6rem] lg:rounded-tr-2xl">
            <Image
              src={IMAGES.hero.src}
              alt={IMAGES.hero.alt}
              fill
              priority // preloads the LCP image
              sizes="(min-width: 1024px) 45vw, 100vw" // phones download ~400-800px, not the full file
              quality={70} // visually clean for photos, much lighter on 3G
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* SERVICES & NHIS DIRECTORY */}
      <section id="services" aria-labelledby="services-title" className="scroll-mt-20 bg-white py-16">
        <ScrollReveal className="mx-auto max-w-6xl px-4">
          <div data-reveal className="max-w-2xl">
            <h2 id="services-title" className="font-display text-3xl font-semibold text-ink">
              Know what NHIS covers before you travel
            </h2>
            <p className="mt-3 text-slate-700">
              Some patients travel a long way, then find out a service is not available to them. Check here first, or call us.
            </p>
          </div>
          <div data-reveal className="mt-8">
            <ServicesDirectory />
          </div>

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
              <h3 className="font-display text-2xl font-semibold text-ink">{SPECIALIST_CLINIC.title}</h3>
              <p className="mt-2 text-slate-700">
                Our specialist clinic was announced for {SPECIALIST_CLINIC.period}. Call to ask when the next one runs.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {SPECIALIST_CLINIC.services.map((name) => (
                  <li key={name} className="rounded-full bg-white px-3 py-1.5 text-sm text-ink">{name}</li>
                ))}
              </ul>
              <a href={CONTACTS.main[0].href} className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-tide px-5 py-2.5 text-sm font-semibold text-white hover:bg-ink">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call {CONTACTS.main[0].display}
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* SUPPORT OUR MISSION */}
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
                loading="lazy" // below the fold: never competes with the hero for bandwidth
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

      {/* ACCOLADES / NEWS */}
      <section id="news" aria-labelledby="news-title" className="scroll-mt-20 bg-white py-16">
        <ScrollReveal className="mx-auto max-w-6xl px-4">
          <h2 id="news-title" className="font-display text-3xl font-semibold text-ink" data-reveal>
            Celebrating our staff
          </h2>
          <article data-reveal className="mt-8 grid overflow-hidden rounded-2xl border border-slate-200 bg-mist md:grid-cols-[0.8fr_1.2fr]">
            {/* Swap for a portrait of Ms. Sewor once the hospital supplies one with her consent */}
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

      {/* OUR HOSPITAL: real photos, lazy-loaded so they never compete with the hero on 3G */}
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
                <span className="absolute inset-x-0 bottom-0 bg-ink/80 px-3 py-1.5 text-sm font-medium text-white">{photo.caption}</span>
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
            {/* PERF: a link instead of an embedded map iframe, which would add ~1 MB on first load. */}
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex rounded-full bg-tide px-5 py-2.5 text-sm font-semibold text-white hover:bg-ink">
              Open in Google Maps
            </a>
          </div>

          <div className="rounded-2xl bg-white p-6">
            <h3 className="font-display text-xl font-semibold text-ink">Phone numbers</h3>
            <ul className="mt-4 divide-y divide-slate-200">
              {CONTACTS.main.map((c) => (
                <li key={c.href} className="py-3">
                  <a href={c.href} className="flex items-center justify-between gap-3">
                    <span className="text-sm text-slate-600">{c.label}</span>
                    <span className="inline-flex items-center gap-2 text-lg font-semibold text-ink">
                      <Phone className="h-4 w-4 text-tide" aria-hidden="true" />
                      {c.display}
                    </span>
                  </a>
                </li>
              ))}
              <li className="py-3">
                <a href={CONTACTS.administrator.href} className="block">
                  <span className="block text-sm text-slate-600">
                    {CONTACTS.administrator.label}, {CONTACTS.administrator.person}
                  </span>
                  <span className="mt-1 inline-flex items-center gap-2 text-lg font-semibold text-ink">
                    <Phone className="h-4 w-4 text-tide" aria-hidden="true" />
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
