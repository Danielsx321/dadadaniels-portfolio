/** True on small screens, low-core devices or when the visitor asked to save data. */
export function isLowPower(): boolean {
  const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
  return (
    window.matchMedia("(max-width: 767px)").matches ||
    (nav.hardwareConcurrency ?? 8) <= 4 ||
    nav.connection?.saveData === true
  );
}
