import type { Lane } from "@/lib/schema";

export type LaneContent = {
  slug: Exclude<Lane, "other">;
  href: string;
  title: string;
  icon: string;
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  intro: string;
  cardText: string;
  chips: string[];
  priceFrom: string;
  services: { name: string; text: string }[];
  seoTitle: string;
  seoDescription: string;
  /** Short Q and A shown above the closing CTA. Answers use approved facts only. */
  faq?: { q: string; a: string }[];
  /** Lane with no confirmed case study yet shows services only. */
  showWork: boolean;
};

export const lanes: LaneContent[] = [
  {
    slug: "wordpress",
    href: "/wordpress",
    title: "WordPress",
    icon: "W",
    eyebrow: "WordPress Developer",
    headline: "WordPress sites that",
    headlineAccent: "actually work",
    intro:
      "Builds, redesigns and rescues for WordPress sites that have to take bookings, donations or payments, not just look good.",
    cardText:
      "Builds, redesigns and rescues for sites that have to work, not just look good. Elementor, custom themes, WooCommerce.",
    chips: ["Elementor Pro", "WooCommerce", "Speed", "Security", "Accessibility", "Migrations"],
    priceFrom: "$250",
    services: [
      { name: "New builds and redesigns", text: "Elementor or custom themes, from a Figma file or from scratch." },
      { name: "WooCommerce and payments", text: "Stores, checkout, donations and payment gateways set up properly." },
      { name: "Fixes and rescues", text: "Half-built or broken sites taken over and finished." },
      { name: "Speed and Core Web Vitals", text: "Slow pages found and fixed, not just cached." },
      { name: "Security and malware cleanup", text: "Hacked sites cleaned, hardened and kept updated." },
      { name: "Accessibility", text: "WCAG fixes so every visitor can use the site, including government-level requirements." },
    ],
    seoTitle: "WordPress Developer for Business Websites and WooCommerce",
    seoDescription:
      "WordPress developer for builds, redesigns, WooCommerce, speed, security and accessibility fixes. Sites that take bookings, donations and payments.",
    faq: [
      {
        q: "How much does a WordPress project cost?",
        a: "Most projects start at $250 for a fix or a small build. Bigger builds are split into fixed milestones, so you know the price of each step before it starts.",
      },
      {
        q: "Can you take over a half-built or broken site?",
        a: "Yes. Taking over and finishing sites someone else started is a big part of my work. I look at what is there first, then tell you what it needs.",
      },
      {
        q: "Will I be able to edit the site myself?",
        a: "Yes. Every build ends with a handover and training, so you can update pages and content without calling a developer.",
      },
      {
        q: "Do you work with Elementor and WooCommerce?",
        a: "Yes. Most of my builds use Elementor or a custom theme, and I set up WooCommerce stores, checkouts and donations.",
      },
      {
        q: "Can I hire you through Upwork?",
        a: "Yes. Send me the job link there and I will reply with a plan.",
      },
    ],
    showWork: true,
  },
  {
    slug: "full-stack",
    href: "/full-stack",
    title: "Full Stack",
    icon: "</>",
    eyebrow: "Full Stack Developer",
    headline: "Web apps built",
    headlineAccent: "to last",
    intro:
      "Next.js and Supabase apps for founders and small teams, and finishing codebases someone else started.",
    cardText: "Next.js and Supabase apps, and finishing codebases someone else started.",
    chips: ["Next.js", "Supabase", "Payments", "Claude API"],
    priceFrom: "$1,000",
    services: [
      { name: "MVPs and web apps", text: "Next.js, TypeScript and Supabase, from first screen to launch." },
      { name: "Inherited codebases", text: "Half-finished Lovable, React or Next.js projects taken over and shipped." },
      { name: "Dashboards and logins", text: "User accounts, roles and admin views that make sense." },
      { name: "Payments", text: "Stripe and PayPal checkouts, subscriptions and payouts." },
      { name: "AI features", text: "Useful features built on the Claude API, not gimmicks." },
    ],
    seoTitle: "Full Stack Developer for Next.js and Supabase Web Apps",
    seoDescription:
      "Full stack developer building Next.js and Supabase web apps, dashboards, payments and AI features, and finishing inherited codebases.",
    faq: [
      {
        q: "What stack do you build with?",
        a: "Next.js, TypeScript and Supabase, with Stripe or PayPal for payments and the Claude API for AI features.",
      },
      {
        q: "Can you finish a project another developer or an AI tool started?",
        a: "Yes. I take over half-finished Lovable, React and Next.js projects, find what is missing and ship it.",
      },
      {
        q: "How is the work priced?",
        a: "Web apps start at $1,000. The work is split into fixed milestones with a clear price for each one.",
      },
      {
        q: "Will I see progress before launch?",
        a: "Yes. You get previews you can click as we go, not a big reveal at the end.",
      },
      {
        q: "Can I hire you through Upwork?",
        a: "Yes. Send me the job link there and I will reply with a plan.",
      },
    ],
    showWork: false,
  },
  {
    slug: "no-code",
    href: "/no-code",
    title: "No-Code",
    icon: "◯",
    eyebrow: "No-Code Developer",
    headline: "No-code apps that",
    headlineAccent: "hold up",
    intro: "Bubble apps and MVPs that go live fast and keep working when real users arrive.",
    cardText: "Bubble apps and MVPs that go live fast and hold up when real users arrive.",
    chips: ["Bubble", "Marketplaces", "n8n", "Zapier"],
    priceFrom: "$1,000",
    services: [
      { name: "Bubble apps and MVPs", text: "Marketplaces, booking apps and internal tools." },
      { name: "Bubble security and speed", text: "Privacy rules and slow workflows fixed before they cost you." },
      { name: "Automations", text: "n8n, Zapier and Make workflows that save real hours." },
    ],
    seoTitle: "No-Code Developer for Bubble Apps and Automations",
    seoDescription:
      "No-code developer building Bubble apps, MVPs and marketplaces, plus n8n, Zapier and Make automations.",
    faq: [
      {
        q: "Why Bubble instead of custom code?",
        a: "Bubble gets a marketplace, booking app or internal tool live fast, and it holds up when real users arrive if the privacy rules and workflows are set up properly.",
      },
      {
        q: "Can you fix a slow or insecure Bubble app?",
        a: "Yes. I fix privacy rules and slow workflows before they cost you users or data.",
      },
      {
        q: "Do you build automations too?",
        a: "Yes. n8n, Zapier and Make workflows that save real hours.",
      },
      {
        q: "How is the work priced?",
        a: "No-code apps start at $1,000, split into fixed milestones with a clear price for each one.",
      },
      {
        q: "Can I hire you through Upwork?",
        a: "Yes. Send me the job link there and I will reply with a plan.",
      },
    ],
    showWork: false,
  },
  {
    slug: "event-tech",
    href: "/event-tech",
    title: "Event Tech",
    icon: "▣",
    eyebrow: "Event Tech",
    headline: "Own your ticketing.",
    headlineAccent: "Stop renting it.",
    intro:
      "Ticketing, registration, QR check-in and vendor systems you own, so you stop paying a platform for every ticket.",
    cardText:
      "Ticketing, registration, QR check-in and vendor systems you own, so you stop paying a platform for every ticket.",
    chips: ["Ticketing", "Registration", "QR check-in", "Exhibitor portals"],
    priceFrom: "$800",
    services: [
      { name: "Ticketing", text: "Sell direct from your own site and keep the platform fees." },
      { name: "Registration", text: "Ticket tiers, forms and confirmations that match your event." },
      { name: "QR check-in", text: "Fast lines at the door and live attendance counts." },
      { name: "Vendors and exhibitors", text: "Portals for vendors, exhibitors and sponsors." },
      { name: "Event websites", text: "Listings, schedules and event pages that sell." },
    ],
    seoTitle: "Event Ticketing, Registration and QR Check-in Systems",
    seoDescription:
      "Own your event tech: ticketing, registration, QR check-in and vendor systems for organizers running 100 to 5,000 attendees.",
    faq: [
      {
        q: "Why own my ticketing instead of using a platform?",
        a: "A platform takes a fee on every ticket. A system on your own site lets you sell direct and keep that money.",
      },
      {
        q: "What event sizes do you build for?",
        a: "Organizers running events from 100 to 5,000 attendees.",
      },
      {
        q: "How does check-in work on the day?",
        a: "Every ticket gets a QR code. Your team scans it at the door for fast lines and a live attendance count.",
      },
      {
        q: "Can vendors and exhibitors register too?",
        a: "Yes. I build portals for vendors, exhibitors and sponsors alongside the attendee side.",
      },
      {
        q: "How much does it cost?",
        a: "Event tech starts at $800 and is scoped per event, in fixed milestones.",
      },
    ],
    showWork: true,
  },
];

export function getLane(slug: LaneContent["slug"]): LaneContent {
  const lane = lanes.find((l) => l.slug === slug);
  if (!lane) throw new Error(`Unknown lane ${slug}`);
  return lane;
}
