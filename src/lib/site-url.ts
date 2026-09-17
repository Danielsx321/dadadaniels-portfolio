const FALLBACK = "https://dadadaniels.vercel.app";

/**
 * Canonical site origin. Tolerates NEXT_PUBLIC_SITE_URL being unset, blank or malformed,
 * which is easy to do in the Vercel dashboard and otherwise fails the build.
 */
export function siteUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) {
    try {
      return new URL(raw);
    } catch {
      console.warn(`Ignoring invalid NEXT_PUBLIC_SITE_URL: ${raw}`);
    }
  }
  return new URL(FALLBACK);
}
