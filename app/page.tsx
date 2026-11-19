"use client";

import Image from "next/image";
import { useState } from "react";

type EventCategory =
  | "all"
  | "career"
  | "entrepreneurship"
  | "wellness"
  | "celebration";

interface FestivalEvent {
  id: string;
  title: string;
  categoryKey: Exclude<EventCategory, "all">;
  categoryBadge: string;
  date: string;
  dayOfWeek: string;
  time: string;
  format: string;
  location: string;
  speaker: string;
  speakerRole?: string;
  flierHeadline: string;
  description: string;
  legacyPointsText: string;
  flierSrc: string;
  flierAlt: string;
  registrationUrl: string;
  ctaLabel: string;
  accentColor: "blue" | "gold" | "green" | "navy";
}

const FESTIVAL_EVENTS: FestivalEvent[] = [
  {
    id: "pitch-deck",
    title: "How to Create a Winning Pitch Deck",
    categoryKey: "career",
    categoryBadge: "CAREER ACCELERATION • NIGERIA",
    dayOfWeek: "THU",
    date: "19 NOV",
    time: "4:00 PM WAT",
    format: "ONLINE",
    location: "Zoom",
    speaker: "ALX Career & Entrepreneurship Series",
    speakerRole: "Interactive Venture & Storytelling Workshop",
    flierHeadline:
      "Build a pitch deck that sells your idea to investors and partners, step by step.",
    description:
      "Kick off the festival momentum by mastering the art of persuasive storytelling. Learn how to frame the problem, showcase traction, structure each slide, and pitch your venture or career project with clarity.",
    legacyPointsText: "Eligible Festival Series Activity • T&C’s Apply",
    flierSrc: "/images/pitch-deck.png",
    flierAlt: "How to Create a Winning Pitch Deck event flier",
    registrationUrl: "https://alx.ng/winning-pitch",
    ctaLabel: "Register for Pitch Deck",
    accentColor: "blue",
  },
  {
    id: "career-readiness",
    title: "Creating a Winning Resume",
    categoryKey: "career",
    categoryBadge: "CAREER READINESS WEBINAR SERIES",
    dayOfWeek: "FRI",
    date: "20 NOV",
    time: "1:00 PM WAT Prompt",
    format: "VIRTUAL",
    location: "Zoom",
    speaker: "Emmanuel Gana",
    speakerRole: "Head of IT and Human Resources, Bloombreed Schools",
    flierHeadline:
      "Your CV is often your first introduction to an employer. Learn how to present your skills, highlight your experience and create a compelling CV that positions you for the opportunities you want.",
    description:
      "Join HR & IT leader Emmanuel Gana for an actionable breakdown of what hiring managers look for, how to quantify your impact, and how to tailor your resume for top global and local roles.",
    legacyPointsText: "Eligible Festival Series Activity • T&C’s Apply",
    flierSrc: "/images/career-readiness.jpeg",
    flierAlt:
      "Career Readiness Webinar Series: Creating a Winning Resume with Emmanuel Gana flier",
    registrationUrl: "https://alx.ng/cv-tips",
    ctaLabel: "Register for Career Readiness",
    accentColor: "gold",
  },
  {
    id: "healthfest",
    title: "AriCares x ALX Healthfest",
    categoryKey: "wellness",
    categoryBadge: "COMMUNITY & WELLNESS • NIGERIA",
    dayOfWeek: "SAT",
    date: "21 NOV",
    time: "10:00 AM WAT",
    format: "HYBRID",
    location: "ALX Hub",
    speaker: "AriCares x ALX Wellness Specialists",
    speakerRole: "Preventive Care, Burnout Recovery & Health Screenings",
    flierHeadline:
      "Talks on preventive care, a fireside chat on burnout, free health checks and networking.",
    description:
      "Peak performance starts with wellbeing. Join us at the ALX Hub or tune in virtually for practical talks on preventive healthcare, an honest fireside chat on overcoming burnout, complimentary on-site health checks, and community networking.",
    legacyPointsText: "Double Legacy Points Eligible • T&C’s Apply",
    flierSrc: "/images/healthfest.png",
    flierAlt: "AriCares x ALX Healthfest event flier",
    registrationUrl: "https://alx.ng/healthfest",
    ctaLabel: "Register for Healthfest",
    accentColor: "green",
  },
  {
    id: "tea-talk",
    title: "Tea Talk: Tech and the Creative Industry",
    categoryKey: "entrepreneurship",
    categoryBadge: "ENTREPRENEURSHIP • NIGERIA",
    dayOfWeek: "SAT",
    date: "28 NOV",
    time: "12:00 PM WAT",
    format: "HYBRID",
    location: "ALX Hub & Zoom",
    speaker: "Chuks Oteke",
    speakerRole: "Founder, Film Anatomie",
    flierHeadline:
      "Chuks Oteke (Film Anatomie) on how tech is changing filmmaking and creative income.",
    description:
      "Grab a cup and dive into the intersection of technology, cinema, and the creator economy. Discover emerging tools, distribution models, and new ways African creatives are monetizing their craft.",
    legacyPointsText:
      "Earn 50 Legacy Points for attending (In person or on Zoom 30+ mins) • T&Cs Apply",
    flierSrc: "/images/tea-talk.png",
    flierAlt:
      "Tea Talk: Tech and the Creative Industry with Chuks Oteke event flier",
    registrationUrl: "https://alx.ng/tea-talk",
    ctaLabel: "Register for Tea Talk",
    accentColor: "gold",
  },
  {
    id: "end-of-year",
    title: "End-of-Year Christmas Party",
    categoryKey: "celebration",
    categoryBadge: "CULTURE & IMPACT • NIGERIA",
    dayOfWeek: "SAT",
    date: "12 DEC",
    time: "12:00 PM WAT",
    format: "IN PERSON",
    location: "Different Locations",
    speaker: "ALX Nigeria Community Chapters",
    speakerRole: "Regional Meetups & Festive Celebration",
    flierHeadline:
      "Have fun, network, look back on the year and plan the next with the community.",
    description:
      "Close out the year in unforgettable style! Connect face-to-face with learners, alumni and friends across different regional locations for music, games, reflections on 2026 milestones, and bold plans for the new year.",
    legacyPointsText:
      "Earn 50 Legacy Points for attending in person • T&Cs Apply",
    flierSrc: "/images/end-of-year.png",
    flierAlt: "End-of-Year Christmas Party event flier",
    registrationUrl: "https://alx.ng/end-of-year",
    ctaLabel: "Register for End of Year Party",
    accentColor: "green",
  },
];

const EXPERIENCE_PILLARS = [
  {
    tag: "01 / CAREER CONVERSATIONS",
    title: "Accelerate Your Career & Pitch",
    description:
      "Sharpen your CV with HR leaders and build investor-ready pitch decks that open doors to funding, partnerships, and high-impact roles.",
    badgeColor: "bg-[#0452F0] text-[#F8F8F8]",
    borderColor: "border-[#0452F0]",
  },
  {
    tag: "02 / CREATIVE & TECH TALKS",
    title: "Explore Tech & Creative Income",
    description:
      "Pull up a chair for candid Tea Talks with industry pioneers unpacking how technology is transforming filmmaking and creative entrepreneurship.",
    badgeColor: "bg-[#EAB308] text-[#03134F]",
    borderColor: "border-[#EAB308]",
  },
  {
    tag: "03 / WELLNESS & BURNOUT CARE",
    title: "Recharge Body & Mind at Healthfest",
    description:
      "Experience preventive care sessions, fireside conversations on navigating burnout, free health checks at the ALX Hub, and mindful networking.",
    badgeColor: "bg-[#02B75E] text-[#03134F]",
    borderColor: "border-[#02B75E]",
  },
  {
    tag: "04 / REGIONAL MEETUPS",
    title: "Celebrate Across Locations",
    description:
      "Come together in person for regional meetups and the End-of-Year Christmas Party to celebrate wins, build lifelong friendships, and earn Double Legacy Points.",
    badgeColor: "bg-[#03134F] text-[#C5E5FF]",
    borderColor: "border-[#03134F]",
  },
];

const COMMUNITY_MOMENTS = [
  {
    src: "/images/alumni.png",
    alt: "ALX community members smiling and connecting at a hub event",
    tag: "HUB CONNECTIONS",
    title: "Thriving Together at ALX Hubs",
    caption:
      "Peers, mentors, and innovators sharing ideas during interactive hybrid sessions.",
  },
  {
    src: "/images/enugu-alumni.png",
    alt: "ALX Enugu alumni chapter group photo at a regional meetup",
    tag: "REGIONAL MEETUPS",
    title: "Unstoppable Regional Energy",
    caption:
      "From Enugu to hubs nationwide, our regional chapters bring the One Community spirit to life.",
  },
  {
    src: "/images/christmas.png",
    alt: "ALX community celebrating together at the End-of-Year Christmas party",
    tag: "YEAR-END CELEBRATION",
    title: "Festive Joy & Shared Milestones",
    caption:
      "Looking back on a transformative year and toasting to new beginnings together.",
  },
];

const CATEGORY_FILTERS: { key: EventCategory; label: string; count: number }[] =
  [
    { key: "all", label: "All Festival Events", count: 5 },
    { key: "career", label: "Career & Pitching", count: 2 },
    { key: "entrepreneurship", label: "Entrepreneurship", count: 1 },
    { key: "wellness", label: "Health & Wellness", count: 1 },
    { key: "celebration", label: "End-of-Year Party", count: 1 },
  ];

export default function OneCommunityFestivalPage() {
  const [activeCategory, setActiveCategory] = useState<EventCategory>("all");
  const [selectedFlierEvent, setSelectedFlierEvent] =
    useState<FestivalEvent | null>(null);

  const filteredEvents =
    activeCategory === "all"
      ? FESTIVAL_EVENTS
      : FESTIVAL_EVENTS.filter((ev) => ev.categoryKey === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F8] text-[#03134F]">
      {/* 1. STICKY HEADER NAVIGATION */}
      <header className="sticky top-0 z-40 bg-[#03134F] border-b-2 border-[#0452F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <a
            href="#top"
            className="flex items-center gap-3 sm:gap-4 group focus:outline-none"
            aria-label="ALX One Community Festival Home"
          >
            <Image
              src="/images/alx-white-logo.png"
              alt="ALX Logo"
              width={72}
              height={32}
              className="h-7 sm:h-8 w-auto object-contain"
              preload
            />
            <span className="h-6 w-[2px] bg-[#0452F0]" aria-hidden="true" />
            <div className="bg-[#F8F8F8] px-2.5 py-1 rounded-md border border-[#C5E5FF]">
              <Image
                src="/images/OCF_logo.png"
                alt="One Community Festival Logo"
                width={110}
                height={40}
                className="h-6 sm:h-7 w-auto object-contain"
              />
            </div>
          </a>

          <div className="flex items-center gap-3">
            <a
              href="#events"
              className="inline-flex items-center gap-2 bg-[#02B75E] text-[#03134F] font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-full border-2 border-[#F8F8F8] shadow-[3px_3px_0px_#0452F0] hover:bg-[#EAB308] transition-colors"
            >
              <span>Explore Events</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* 2. HERO SECTION */}
        <section className="relative bg-ocf-navy text-ocf-offwhite overflow-hidden border-b-4 border-ocf-blue">
          {/* Decorative Festival Geometric Patterns */}
          <div
            className="pointer-events-none select-none absolute top-6 right-6 opacity-25 hidden lg:block"
            aria-hidden="true"
          >
            <Image
              src="/images/pattern.png"
              alt=""
              width={96}
              height={192}
              className="w-20 h-auto"
            />
          </div>
          <div
            className="pointer-events-none select-none absolute bottom-8 left-4 opacity-25 hidden xl:block"
            aria-hidden="true"
          >
            <Image
              src="/images/pattern3.png"
              alt=""
              width={88}
              height={176}
              className="w-16 h-auto"
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
              {/* Left Column: Official Copy & CTAs */}
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                {/* Date & Festival Tag */}
                <div className="inline-flex flex-wrap items-center gap-2 bg-[#EAB308] text-[#03134F] font-extrabold text-xs sm:text-sm uppercase tracking-wider px-4 py-1.5 rounded-full border-2 border-[#F8F8F8] shadow-[4px_4px_0px_#0452F0] mb-6">
                  <span>23 NOVEMBER – 13 DECEMBER</span>
                </div>

                {/* Official OCF Logo Lockup Card */}
                <div className="bg-[#F8F8F8] p-4 sm:p-5 rounded-2xl border-2 border-[#C5E5FF] shadow-[6px_6px_0px_#02B75E] mb-7 inline-block">
                  <Image
                    src="/images/OCF_logo.png"
                    alt="One Community Festival Official Logo"
                    width={260}
                    height={98}
                    className="h-16 sm:h-20 w-auto object-contain"
                  />
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-[3.35rem] font-black tracking-tight leading-[1.1] text-[#F8F8F8] mb-6">
                  Weeks of Fun, Meetups,{" "}
                  <span className="text-[#02B75E]">Virtual Events</span> &{" "}
                  <span className="underline decoration-[#EAB308] decoration-4 underline-offset-8">
                    Career Conversations!
                  </span>
                </h1>

                {/* Primary Sample Copy */}
                <p className="text-base sm:text-xl text-[#C5E5FF] leading-relaxed font-medium mb-6 max-w-2xl">
                  The{" "}
                  <strong className="text-[#F8F8F8] font-extrabold">
                    ONE COMMUNITY FESTIVAL 🌍
                  </strong>{" "}
                  is happening from{" "}
                  <strong className="text-[#EAB308] font-extrabold">
                    23 November to 13 December
                  </strong>
                  , and we&apos;re bringing the ALX community together for weeks
                  of fun, meetups, virtual events, career conversations
                  and more!
                </p>

                {/* Double Legacy Points Callout Box */}
                <div className="w-full max-w-2xl bg-[#0452F0] border-2 border-[#C5E5FF] rounded-2xl p-4 sm:p-5 shadow-[6px_6px_0px_#EAB308] mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="bg-[#F8F8F8] p-2 rounded-full border-2 border-[#03134F] shrink-0">
                    <Image
                      src="/images/legacy-point-logo.png"
                      alt="ALX Legacy Points Emblem"
                      width={48}
                      height={48}
                      className="w-11 h-11 object-contain"
                    />
                  </div>
                  <div>
                    <div className="inline-block bg-[#EAB308] text-[#03134F] text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded mb-1">
                      BONUS FESTIVAL REWARD
                    </div>
                    <p className="text-sm sm:text-base text-[#F8F8F8] font-bold leading-snug">
                      But that&apos;s not all! You&apos;ll also earn{" "}
                      <span className="text-[#EAB308] underline decoration-2 underline-offset-2">
                        DOUBLE LEGACY POINTS
                      </span>{" "}
                      on eligible festival activities!{" "}
                      <span className="text-[#C5E5FF] text-xs font-semibold">
                        T&amp;C’s Apply
                      </span>
                    </p>
                  </div>
                </div>

                {/* Hero Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                  <a
                    href="#events"
                    className="w-full sm:w-auto text-center bg-[#02B75E] text-[#03134F] font-black text-base px-7 py-4 rounded-full border-2 border-[#F8F8F8] shadow-[5px_5px_0px_#0452F0] hover:bg-[#EAB308] transition-colors"
                  >
                    View Events & Register Now ↓
                  </a>
                </div>
              </div>

              {/* Right Column: Visual Showcase Collage */}
              <div className="lg:col-span-5">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  {/* Pattern Accent Tile Top-Left */}
                  <div className="absolute -top-5 -left-5 z-20 bg-[#EAB308] p-2 rounded-xl border-2 border-[#03134F] shadow-[4px_4px_0px_#0452F0]">
                    <Image
                      src="/images/pattern2.png"
                      alt=""
                      width={48}
                      height={96}
                      className="w-10 h-14 object-cover rounded"
                    />
                  </div>

                  {/* Primary Community Frame */}
                  <div className="bg-[#F8F8F8] p-3 rounded-3xl border-4 border-[#C5E5FF] shadow-[10px_10px_0px_#0452F0]">
                    <div className="relative aspect-1/1 w-full overflow-hidden rounded-2xl border-2 border-[#03134F]">
                      <Image
                        src="/images/alumni.png"
                        alt="ALX Community members networking and smiling"
                        fill
                        sizes="(max-width: 1024px) 100vw, 42vw"
                        className="object-fit"
                        preload
                      />
                      <div className="absolute bottom-3 left-3 right-3 bg-[#03134F] text-[#F8F8F8] px-3.5 py-2 rounded-xl border border-[#0452F0] flex items-center justify-between">
                        <span className="text-xs font-bold tracking-wide text-[#C5E5FF]">
                          ALX COMMUNITY IN ACTION
                        </span>
                        <span className="bg-[#02B75E] text-[#03134F] text-[11px] font-black px-2 py-0.5 rounded">
                          5 SIGNATURE EVENTS
                        </span>
                      </div>
                    </div>

                    {/* Secondary Dual Image Strip */}
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-xl border-2 border-[#03134F]">
                        <Image
                          src="/images/enugu-alumni.png"
                          alt="ALX Regional Meetup"
                          fill
                          sizes="(max-width: 1024px) 50vw, 20vw"
                          className="object-cover"
                        />
                        <span className="absolute bottom-1.5 left-1.5 bg-[#03134F] text-[#EAB308] text-[10px] font-extrabold px-2 py-0.5 rounded">
                          Meetups
                        </span>
                      </div>
                      <div className="relative aspect-[16/10] overflow-hidden rounded-xl border-2 border-[#03134F]">
                        <Image
                          src="/images/christmas.png"
                          alt="ALX End of Year Party"
                          fill
                          sizes="(max-width: 1024px) 50vw, 20vw"
                          className="object-cover"
                        />
                        <span className="absolute bottom-1.5 left-1.5 bg-[#03134F] text-[#02B75E] text-[10px] font-extrabold px-2 py-0.5 rounded">
                          Year-End Fun
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="mt-14 pt-8 border-t-2 border-[#0452F0] grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#0452F0] p-4 rounded-2xl border-2 border-[#C5E5FF]">
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#C5E5FF]">
                  FESTIVAL WINDOW
                </p>
                <p className="text-xl sm:text-2xl font-black text-[#F8F8F8] mt-1">
                  23 Nov – 13 Dec
                </p>
                <p className="text-xs text-[#C5E5FF] mt-0.5">
                  + Pre-festival kickoff 19 Nov
                </p>
              </div>
              <div className="bg-[#0452F0] p-4 rounded-2xl border-2 border-[#C5E5FF]">
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#C5E5FF]">
                  CURATED LINEUP
                </p>
                <p className="text-xl sm:text-2xl font-black text-[#EAB308] mt-1">
                  5 Major Events
                </p>
                <p className="text-xs text-[#C5E5FF] mt-0.5">
                  Virtual, Hybrid & In-Person
                </p>
              </div>
              <div className="bg-[#0452F0] p-4 rounded-2xl border-2 border-[#C5E5FF]">
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#C5E5FF]">
                  COMMUNITY REWARDS
                </p>
                <p className="text-xl sm:text-2xl font-black text-[#02B75E] mt-1">
                  2X Legacy Points
                </p>
                <p className="text-xs text-[#C5E5FF] mt-0.5">
                  On eligible activities (T&amp;Cs Apply)
                </p>
              </div>
              <div className="bg-[#0452F0] p-4 rounded-2xl border-2 border-[#C5E5FF]">
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#C5E5FF]">
                  OPEN TO ALL
                </p>
                <p className="text-xl sm:text-2xl font-black text-[#F8F8F8] mt-1">
                  ALX Community
                </p>
                <p className="text-xs text-[#C5E5FF] mt-0.5">
                  Learners, Alumni & Friends
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. FEATURED EVENTS LINEUP & FLIER SHOWCASE (#events) */}
        <section
          id="events"
          className="py-16 sm:py-24 bg-[#F8F8F8] border-b-4 border-[#03134F]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Quick All-in-One Registration Links Directory */}
            <div className="mb-14 bg-[#C5E5FF] rounded-3xl p-6 sm:p-8 border-4 border-[#03134F] shadow-[8px_8px_0px_#03134F]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <span className="bg-[#03134F] text-[#EAB308] text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full">
                    QUICK REGISTRATION DIRECTORY
                  </span>
                  <h3 className="text-2xl font-black text-[#03134F] mt-2">
                    Direct Festival Registration Links
                  </h3>
                </div>
                <p className="text-sm font-bold text-[#03134F]">
                  Bookmark or share these official shortlinks with your ALX
                  peers:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                {FESTIVAL_EVENTS.map((ev) => (
                  <a
                    key={ev.id}
                    href={ev.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#F8F8F8] hover:bg-[#03134F] text-[#03134F] hover:text-[#F8F8F8] p-4 rounded-2xl border-2 border-[#03134F] shadow-[4px_4px_0px_#0452F0] transition-colors flex flex-col justify-between group"
                  >
                    <div>
                      <span className="text-[11px] font-black uppercase tracking-wider text-[#0452F0] group-hover:text-[#EAB308]">
                        {ev.date} • {ev.format}
                      </span>
                      <p className="font-black text-sm mt-1 leading-snug">
                        {ev.title}
                      </p>
                    </div>
                    <span className="mt-3 pt-2 border-t border-[#C5E5FF] text-xs font-mono font-extrabold text-[#02B75E] flex items-center justify-between">
                      <span>{ev.registrationUrl.replace("https://", "")}</span>
                      <span aria-hidden="true">↗</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
            {/* Section Header */}
            <div className="bg-[#03134F] text-[#F8F8F8] rounded-3xl p-6 sm:p-10 border-4 border-[#0452F0] shadow-[8px_8px_0px_#02B75E] mb-10">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 bg-[#EAB308] text-[#03134F] font-black text-xs uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">
                    <span>OFFICIAL EVENT LINEUP &amp; REGISTRATION</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#F8F8F8]">
                    Explore the Festival Events &amp; Register
                  </h2>
                  <p className="text-base sm:text-lg text-[#C5E5FF] mt-2 max-w-2xl">
                    Review the event details below, and secure your seat
                  </p>
                </div>

                {/* Decorative Pattern */}
                <div className="hidden lg:flex items-center gap-3 shrink-0">
                  <Image
                    src="/images/pattern.png"
                    alt=""
                    width={56}
                    height={112}
                    className="w-12 h-20 object-cover rounded-lg border-2 border-[#C5E5FF]"
                  />
                  <Image
                    src="/images/pattern2.png"
                    alt=""
                    width={56}
                    height={112}
                    className="w-12 h-20 object-cover rounded-lg border-2 border-[#C5E5FF]"
                  />
                </div>
              </div>

              {/* Category Filter Pills */}
              <div
                className="mt-8 pt-6 border-t border-[#0452F0] flex flex-wrap items-center gap-2.5"
                role="tablist"
                aria-label="Filter festival events by category"
              >
                {CATEGORY_FILTERS.map((filter) => {
                  const isActive = activeCategory === filter.key;
                  return (
                    <button
                      key={filter.key}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveCategory(filter.key)}
                      className={`px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-colors cursor-pointer border-2 ${
                        isActive
                          ? "bg-[#02B75E] text-[#03134F] border-[#F8F8F8] shadow-[3px_3px_0px_#EAB308]"
                          : "bg-[#0452F0] text-[#F8F8F8] border-[#C5E5FF] hover:bg-[#C5E5FF] hover:text-[#03134F]"
                      }`}
                    >
                      {filter.label}{" "}
                      <span className="ml-1 px-1.5 py-0.5 rounded-full text-[11px] bg-[#03134F] text-[#F8F8F8]">
                        {filter.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Event Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
              {filteredEvents.map((event, idx) => {
                const isFeaturedWide =
                  filteredEvents.length % 2 === 1 &&
                  idx === filteredEvents.length - 1;

                return (
                  <article
                    key={event.id}
                    className={`bg-[#F8F8F8] rounded-3xl border-4 border-[#03134F] shadow-[10px_10px_0px_#0452F0] overflow-hidden flex flex-col ${
                      isFeaturedWide
                        ? "lg:col-span-2 lg:grid lg:grid-cols-12"
                        : ""
                    }`}
                  >
                    {/* Flier Visual Header / Left Column */}
                    <div
                      className={`bg-[#03134F] p-4 sm:p-6 flex flex-col items-center justify-center relative border-b-4 lg:border-b-0 border-[#03134F] ${
                        isFeaturedWide
                          ? "lg:col-span-5 lg:border-r-4"
                          : "border-b-4"
                      }`}
                    >
                      <div className="w-full flex items-center justify-between mb-3">
                        <span className="bg-[#EAB308] text-[#03134F] text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                          {event.categoryBadge}
                        </span>
                        <button
                          type="button"
                          onClick={() => setSelectedFlierEvent(event)}
                          className="bg-[#0452F0] text-[#F8F8F8] hover:bg-[#02B75E] hover:text-[#03134F] text-xs font-bold px-3 py-1 rounded-full border border-[#C5E5FF] transition-colors cursor-pointer"
                        >
                          🔍 Expand Flier
                        </button>
                      </div>

                      {/* Full Uncropped Event Flier */}
                      <button
                        type="button"
                        onClick={() => setSelectedFlierEvent(event)}
                        className="relative w-full max-w-[360px] aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#C5E5FF] bg-[#03134F] group cursor-pointer focus:outline-none"
                        aria-label={`View full-size flier for ${event.title}`}
                      >
                        <Image
                          src={event.flierSrc}
                          alt={event.flierAlt}
                          fill
                          sizes="(max-width: 768px) 90vw, 360px"
                          className="object-contain p-1 group-hover:scale-[1.02] transition-transform"
                        />
                      </button>
                    </div>

                    {/* Event Copy, Schedule & Registration CTA */}
                    <div
                      className={`p-6 sm:p-8 flex flex-col justify-between bg-[#F8F8F8] ${
                        isFeaturedWide ? "lg:col-span-7" : "flex-1"
                      }`}
                    >
                      <div>
                        {/* Schedule Metadata Bar (Mirrors the Official ALX Flier Design) */}
                        <div className="bg-[#C5E5FF] border-2 border-[#03134F] shadow-[4px_4px_0px_#03134F] rounded-xl p-3.5 mb-6 grid grid-cols-3 divide-x-2 divide-[#03134F] text-[#03134F]">
                          <div className="pr-2">
                            <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#0452F0]">
                              {event.dayOfWeek}
                            </p>
                            <p className="text-sm sm:text-base font-black">
                              {event.date}
                            </p>
                          </div>
                          <div className="px-3">
                            <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#0452F0]">
                              TIME
                            </p>
                            <p className="text-sm sm:text-base font-black">
                              {event.time}
                            </p>
                          </div>
                          <div className="pl-3">
                            <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#0452F0]">
                              {event.format}
                            </p>
                            <p className="text-sm sm:text-base font-black">
                              {event.location}
                            </p>
                          </div>
                        </div>

                        {/* Title & Speaker */}
                        <h3 className="text-2xl sm:text-3xl font-black text-[#03134F] tracking-tight leading-snug mb-2">
                          {event.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-extrabold text-[#0452F0] mb-4">
                          Featuring: {event.speaker}
                          {event.speakerRole ? ` • ${event.speakerRole}` : ""}
                        </p>

                        {/* Highlighted Flier Copy */}
                        <blockquote className="bg-[#C5E5FF] border-l-4 border-[#0452F0] px-4 py-3 rounded-r-xl text-sm sm:text-base font-bold text-[#03134F] mb-4">
                          &ldquo;{event.flierHeadline}&rdquo;
                        </blockquote>

                        {/* Supporting Description */}
                        <p className="text-sm sm:text-base text-[#03134F] font-medium leading-relaxed mb-6">
                          {event.description}
                        </p>
                      </div>

                      <div>
                        {/* Legacy Points Pill */}
                        <div className="bg-[#03134F] text-[#F8F8F8] rounded-xl p-3 mb-5 flex items-center gap-3 border-2 border-[#02B75E]">
                          <Image
                            src="/images/legacy-point-logo.png"
                            alt="Legacy Points icon"
                            width={32}
                            height={32}
                            className="w-8 h-8 object-contain shrink-0"
                          />
                          <p className="text-xs sm:text-sm font-bold text-[#C5E5FF]">
                            {event.legacyPointsText}
                          </p>
                        </div>

                        {/* Registration Button + Direct URL Display */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t-2 border-[#C5E5FF]">
                          <a
                            href={event.registrationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-[#0452F0] hover:bg-[#02B75E] text-[#F8F8F8] hover:text-[#03134F] font-black text-sm sm:text-base px-6 py-3.5 rounded-full border-2 border-[#03134F] shadow-[4px_4px_0px_#03134F] transition-colors"
                          >
                            <span>{event.ctaLabel}</span>
                            <span aria-hidden="true">→</span>
                          </a>

                          <a
                            href={event.registrationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-mono font-bold text-[#0452F0] hover:underline break-all"
                          >
                            {event.registrationUrl.replace("https://", "")} ↗
                          </a>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* 7. FESTIVAL FOOTER */}
      <footer className="bg-[#03134F] text-[#C5E5FF] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b-2 border-[#0452F0]">
            {/* Brand Column */}
            <div className="md:col-span-5">
              <div className="flex items-center gap-4 mb-5">
                <Image
                  src="/images/alx-white-logo.png"
                  alt="ALX Logo"
                  width={84}
                  height={36}
                  className="h-8 w-auto object-contain"
                />
                <div className="bg-[#F8F8F8] px-3 py-1.5 rounded-lg border border-[#C5E5FF]">
                  <Image
                    src="/images/OCF_logo.png"
                    alt="One Community Festival Logo"
                    width={120}
                    height={44}
                    className="h-7 w-auto object-contain"
                  />
                </div>
              </div>
              <p className="text-sm text-[#C5E5FF] leading-relaxed max-w-md mb-5">
                The{" "}
                <strong className="text-[#F8F8F8]">
                  ONE COMMUNITY FESTIVAL
                </strong>{" "}
                (23 November – 13 December) brings the ALX community together
                for weeks of fun, regional meetups, virtual events, career
                conversations, and{" "}
                <strong className="text-[#EAB308]">
                  DOUBLE LEGACY POINTS
                </strong>{" "}
                on eligible activities.
              </p>
              <div className="inline-flex items-center gap-2.5 bg-[#0452F0] text-[#F8F8F8] px-4 py-2 rounded-full text-xs font-bold border border-[#C5E5FF]">
                <Image
                  src="/images/legacy-point-logo.png"
                  alt="Legacy Point Logo"
                  width={22}
                  height={22}
                  className="w-5 h-5 object-contain"
                />
                <span>Earn 2X Legacy Points • T&amp;C’s Apply</span>
              </div>
            </div>

            {/* Event Registration Links Column */}
            <div className="md:col-span-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-[#EAB308] mb-4">
                Event Registration Links
              </h3>
              <ul className="space-y-2.5 text-sm font-bold">
                <li>
                  <a
                    href="https://alx.ng/tea-talk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F8F8F8] hover:text-[#02B75E] transition-colors flex items-center justify-between max-w-xs"
                  >
                    <span>Tea Talk: Tech &amp; Creative Industry</span>
                    <span className="font-mono text-xs text-[#C5E5FF]">
                      alx.ng/tea-talk ↗
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://alx.ng/winning-pitch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F8F8F8] hover:text-[#02B75E] transition-colors flex items-center justify-between max-w-xs"
                  >
                    <span>How to Create a Winning Pitch Deck</span>
                    <span className="font-mono text-xs text-[#C5E5FF]">
                      alx.ng/winning-pitch ↗
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://alx.ng/healthfest"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F8F8F8] hover:text-[#02B75E] transition-colors flex items-center justify-between max-w-xs"
                  >
                    <span>AriCares x ALX Healthfest</span>
                    <span className="font-mono text-xs text-[#C5E5FF]">
                      alx.ng/healthfest ↗
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://alx.ng/end-of-year"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F8F8F8] hover:text-[#02B75E] transition-colors flex items-center justify-between max-w-xs"
                  >
                    <span>End-of-Year Christmas Party</span>
                    <span className="font-mono text-xs text-[#C5E5FF]">
                      alx.ng/end-of-year ↗
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://alx.ng/cv-tips"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F8F8F8] hover:text-[#02B75E] transition-colors flex items-center justify-between max-w-xs"
                  >
                    <span>Career Readiness: Winning Resume</span>
                    <span className="font-mono text-xs text-[#C5E5FF]">
                      alx.ng/cv-tips ↗
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Community Info Column */}
            <div className="md:col-span-3">
              <h3 className="text-sm font-black uppercase tracking-wider text-[#02B75E] mb-4">
                Festival Schedule &amp; Info
              </h3>
              <p className="text-xs leading-relaxed text-[#C5E5FF] mb-4">
                <strong>Festival Dates:</strong> 23 November – 13 December
                (Pre-festival career sessions begin 19 November).
              </p>
              <p className="text-xs leading-relaxed text-[#C5E5FF] mb-4">
                <strong>Terms &amp; Conditions:</strong> Double Legacy Points
                apply to eligible festival activities. Minimum attendance
                duration (30+ minutes on Zoom or verified in-person check-in)
                required. T&amp;C’s Apply.
              </p>
              <p className="text-xs font-extrabold text-[#F8F8F8]">
                @alxnigeria • alxafrica.com
              </p>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-[#C5E5FF]">
            <p>
              © 2026 ALX Nigeria • One Community Festival 🌍. All rights
              reserved.
            </p>
            <a
              href="#top"
              className="bg-[#0452F0] text-[#F8F8F8] hover:bg-[#02B75E] hover:text-[#03134F] font-bold px-4 py-2 rounded-full transition-colors"
            >
              Back to Top ↑
            </a>
          </div>
        </div>
      </footer>

      {/* FULL-SCREEN FLIER LIGHTBOX MODAL */}
      {selectedFlierEvent && (
        <div
          className="fixed inset-0 z-50 bg-[#03134F]/95 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-flier-title"
          onClick={() => setSelectedFlierEvent(null)}
        >
          <div
            className="bg-[#F8F8F8] text-[#03134F] rounded-3xl border-4 border-[#0452F0] shadow-[10px_10px_0px_#EAB308] max-w-2xl w-full p-5 sm:p-6 overflow-y-auto max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 pb-4 mb-4 border-b-2 border-[#C5E5FF]">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider bg-[#0452F0] text-[#F8F8F8] px-2.5 py-0.5 rounded">
                  {selectedFlierEvent.categoryBadge}
                </span>
                <h3
                  id="modal-flier-title"
                  className="text-xl font-black text-[#03134F] mt-1"
                >
                  {selectedFlierEvent.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedFlierEvent(null)}
                className="bg-[#03134F] text-[#F8F8F8] hover:bg-[#EAB308] hover:text-[#03134F] font-black text-sm px-3.5 py-1.5 rounded-full cursor-pointer transition-colors"
              >
                ✕ Close
              </button>
            </div>

            <div className="relative w-full aspect-[4/5] max-h-[62vh] bg-[#03134F] rounded-2xl overflow-hidden border-2 border-[#03134F] mb-5">
              <Image
                src={selectedFlierEvent.flierSrc}
                alt={selectedFlierEvent.flierAlt}
                fill
                sizes="(max-width: 768px) 95vw, 600px"
                className="object-contain p-2"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-bold text-[#03134F]">
                <p>
                  {selectedFlierEvent.dayOfWeek}, {selectedFlierEvent.date} •{" "}
                  {selectedFlierEvent.time} ({selectedFlierEvent.format} -{" "}
                  {selectedFlierEvent.location})
                </p>
                <p className="text-[#0452F0] mt-0.5">
                  {selectedFlierEvent.legacyPointsText}
                </p>
              </div>
              <a
                href={selectedFlierEvent.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center bg-[#02B75E] hover:bg-[#EAB308] text-[#03134F] font-black text-sm px-6 py-3 rounded-full border-2 border-[#03134F] shadow-[4px_4px_0px_#03134F] transition-colors shrink-0"
              >
                {selectedFlierEvent.ctaLabel} →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
