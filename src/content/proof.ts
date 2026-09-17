/** Proof numbers. Values and sources come from context/offer.md; never add one without a source. */
export const proof = [
  {
    count: 10000,
    prefix: "",
    suffix: "+",
    label: "attendees checked in by QR, 15 scanners at the door",
    source: "Event check-in build (WordPress + Tickera)",
  },
  {
    count: 10450,
    prefix: "$",
    suffix: "",
    label: "booked through one school workshop system",
    source: "Booking system, 26 bookings",
  },
  {
    count: 95,
    prefix: "40→",
    suffix: "%",
    label: "event app adoption after the Bubble rebuild",
    source: "Bubble event app, adoption about 40% before",
  },
  {
    count: 100,
    prefix: "",
    suffix: "",
    label: "accessibility score on SmartPatrol after fixes",
    source: "PageSpeed Insights",
  },
] as const;
