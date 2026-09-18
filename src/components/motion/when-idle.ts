/**
 * Runs `fn` once the page has loaded and the main thread is idle, so decorative motion
 * never competes with first paint or hydration. Returns a cancel function.
 */
export function whenIdle(fn: () => void, timeout = 2500): () => void {
  let cancelled = false;
  let idleId: number | undefined;
  let timer: number | undefined;

  const schedule = () => {
    if (cancelled) return;
    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(() => !cancelled && fn(), { timeout });
    } else {
      timer = window.setTimeout(() => !cancelled && fn(), 600);
    }
  };

  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });

  return () => {
    cancelled = true;
    window.removeEventListener("load", schedule);
    if (idleId !== undefined && typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idleId);
    if (timer !== undefined) window.clearTimeout(timer);
  };
}
