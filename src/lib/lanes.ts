// Lane constants live apart from the zod schema so client components can import them
// without pulling the validation library into the browser bundle.
export const LANES = ["wordpress", "full-stack", "no-code", "event-tech", "other"] as const;
export type Lane = (typeof LANES)[number];

export const laneLabels: Record<Lane, string> = {
  wordpress: "WordPress",
  "full-stack": "Full Stack",
  "no-code": "No-Code",
  "event-tech": "Event Tech",
  other: "Other work",
};
