"use client";

import { useActionState, useEffect, useRef } from "react";
import { sendEnquiry, type ContactState } from "@/actions/contact";
import { budgets, services } from "@/content/contact";

const initial: ContactState = { ok: false };

const field =
  "mt-2 w-full rounded-2xl border border-glass-line bg-white/4 px-4 py-3 text-base text-text placeholder:text-subtle focus:border-mint/60";

export function ContactForm() {
  const [state, action, pending] = useActionState(sendEnquiry, initial);
  const startedAt = useRef<HTMLInputElement>(null);

  // Set after mount so the value stays out of the server-rendered HTML.
  useEffect(() => {
    if (startedAt.current) startedAt.current.value = String(Date.now());
  }, []);

  if (state.ok) {
    return (
      <div className="glass rounded-[22px] p-8 text-center">
        <span aria-hidden="true" className="mx-auto grid size-12 place-items-center rounded-full bg-mint text-xl text-on-mint">
          &#10003;
        </span>
        <h2 className="mt-5 text-2xl font-semibold tracking-[-0.02em]">Message sent</h2>
        <p className="mt-2 text-muted">Thanks. I reply within 24 hours on weekdays.</p>
      </div>
    );
  }

  return (
    <form action={action} className="glass rounded-[22px] p-6 sm:p-8">
      <input ref={startedAt} type="hidden" name="startedAt" defaultValue="0" />
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label htmlFor="company_website">Company website</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <p>
          <label htmlFor="name" className="text-sm text-muted">
            Your name
          </label>
          <input id="name" name="name" required maxLength={80} autoComplete="name" className={field} />
          {state.errors?.name && <span className="mt-1.5 block text-sm text-[#ff8f86]">{state.errors.name}</span>}
        </p>
        <p>
          <label htmlFor="email" className="text-sm text-muted">
            Email
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={field} />
          {state.errors?.email && <span className="mt-1.5 block text-sm text-[#ff8f86]">{state.errors.email}</span>}
        </p>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <p>
          <label htmlFor="service" className="text-sm text-muted">
            What do you need?
          </label>
          <select id="service" name="service" required defaultValue={services[0]} className={field}>
            {services.map((s) => (
              <option key={s} value={s} className="bg-surface">
                {s}
              </option>
            ))}
          </select>
        </p>
        <p>
          <label htmlFor="budget" className="text-sm text-muted">
            Budget <span className="text-subtle">(optional)</span>
          </label>
          <select id="budget" name="budget" defaultValue="" className={field}>
            <option value="" className="bg-surface">
              Prefer not to say
            </option>
            {budgets.map((b) => (
              <option key={b} value={b} className="bg-surface">
                {b}
              </option>
            ))}
          </select>
        </p>
      </div>

      <p className="mt-5">
        <label htmlFor="message" className="text-sm text-muted">
          What are you trying to build or fix?
        </label>
        <textarea id="message" name="message" required rows={6} minLength={20} maxLength={3000} className={field} />
        {state.errors?.message && <span className="mt-1.5 block text-sm text-[#ff8f86]">{state.errors.message}</span>}
      </p>

      {state.errors?.form && (
        <p role="alert" className="mt-5 rounded-2xl border border-[#ff8f86]/40 bg-[#ff8f86]/10 px-4 py-3 text-sm text-[#ff8f86]">
          {state.errors.form}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="glow-mint mt-6 w-full rounded-full px-6 py-3.5 font-semibold disabled:opacity-60"
      >
        {pending ? "Sending..." : "Send message"}
      </button>
      <p className="mt-3 text-center text-xs text-subtle">I reply within 24 hours on weekdays.</p>
    </form>
  );
}
