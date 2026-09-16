export const site = {
  name: "Dada Daniels",
  shortName: "Daniels",
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
  { label: "Full Stack", href: "/full-stack" },
  { label: "No-Code", href: "/no-code" },
  { label: "Event Tech", href: "/event-tech" },
  { label: "About", href: "/about" },
] as const;
