export const site = {
  name: "Dada Daniels",
  titles: ["WordPress Developer", "Full Stack Developer", "No-Code Developer"],
  location: "Lagos, Nigeria",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/the.dadadaniels/" },
    { label: "X", href: "https://x.com/thedadadaniels" },
    { label: "Facebook", href: "https://web.facebook.com/the.dadadaniels" },
  ],
} as const;

export const mainNav = [
  { label: "Work", href: "/work" },
  { label: "WordPress", href: "/wordpress" },
  { label: "Event Tech", href: "/event-tech" },
  { label: "About", href: "/about" },
] as const;

/**
 * Projects shown in the hero carousel. Lane labels follow the confirmed roles:
 * SmartPatrol = accessibility work, PPTM = event tech only, SMG and Hilaritas = full builds.
 */
export const heroProjects = [
  { title: "SmartPatrol", lane: "Accessibility", image: "/work/smart-patrol.jpg" },
  { title: "TicketMonsterz", lane: "Event Tech", image: "/work/ticketmonsterz.jpg" },
  { title: "Richard Saad", lane: "WordPress", image: "/work/richard-saad.jpg" },
  { title: "PPTM", lane: "Event Tech", image: "/work/pptm.jpg" },
  { title: "SMG Relief", lane: "WordPress", image: "/work/smg-wrn.jpg" },
  { title: "CPHnights", lane: "Event Tech", image: "/work/cphnights.jpg" },
  { title: "Hilaritas", lane: "WordPress", image: "/work/hilaritas-suites.jpg" },
  { title: "Balanced Book", lane: "Other", image: "/work/balanced-book.jpg" },
] as const;
