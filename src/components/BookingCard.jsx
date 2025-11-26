"use client";

import * as React from "react";
import { Mail, FileText, Send, CheckCircle } from "lucide-react";

import config from "@/config/config";

const BookingCard = () => {
  const [email, setEmail] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState(null);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !description) {
      setStatus({
        type: "error",
        message: "Email and description are required.",
      });
      return;
    }

    try {
      setLoading(true);
      setStatus(null);

      const body = {
        email,
        message: description,
      };

      const res = await fetch(config.bookingEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send. Please try again.");
      }

      setSubmitted(true);
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setEmail("");
    setDescription("");
    setSubmitted(false);
    setStatus(null);
  };

  if (submitted) {
    return (
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-white/10 bg-white/90 p-8 text-center text-neutral-900 shadow-[0_40px_80px_-60px_rgba(15,23,42,0.8)]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle className="h-8 w-8 text-emerald-500" />
          </div>
          <h3 className="mt-6 text-2xl font-semibold">Message sent!</h3>
          <p className="mt-2 text-sm text-neutral-600">
            We&apos;ll get back to you at{" "}
            <span className="font-medium text-neutral-900">{email}</span> soon.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="mt-6 w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white text-neutral-900 shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)]">
        <div className="bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 p-6 text-center text-white">
          <h3 className="text-2xl font-bold">Get in touch</h3>
          <p className="mt-1 text-sm text-white/80">
            Tell us about your toy ideas and we&apos;ll reach out.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Email address
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-10 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/70"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              What should we prep?
            </label>
            <div className="relative">
              <FileText className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-neutral-400" />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell us about your uploads and booking date"
                className="w-full resize-none rounded-2xl border border-neutral-200 bg-neutral-50 px-10 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/70"
                rows={3}
              />
            </div>
          </div>

          {status && (
            <p
              className={
                status.type === "error"
                  ? "text-xs text-rose-500"
                  : "text-xs text-emerald-600"
              }
            >
              {status.message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-900/30 border-t-neutral-900" />
                Sending…
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send message
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingCard;
