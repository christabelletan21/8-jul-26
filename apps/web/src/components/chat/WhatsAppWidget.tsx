"use client";

import { useState } from "react";

const WHATSAPP_NUMBER = "6583835680";

const SUGGESTED_QUERIES = [
  "I'd like to know more about your courses",
  "What are the upcoming trainings?",
  "Can you tell me about pricing plans?",
  "I need help with my account",
];

function buildWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.004 2.667c-7.363 0-13.337 5.974-13.337 13.337 0 2.353.615 4.647 1.784 6.666L2.667 29.333l6.826-1.75a13.27 13.27 0 0 0 6.51 1.658h.001c7.363 0 13.336-5.973 13.336-13.336 0-3.563-1.387-6.913-3.906-9.432a13.246 13.246 0 0 0-9.43-3.906Zm0 24.4h-.001a11.08 11.08 0 0 1-5.65-1.548l-.405-.24-4.05 1.04 1.082-3.949-.264-.406a11.06 11.06 0 0 1-1.696-5.96c0-6.114 4.975-11.088 11.09-11.088a11.02 11.02 0 0 1 7.842 3.25 11.02 11.02 0 0 1 3.246 7.844c0 6.114-4.975 11.058-11.094 11.058Zm6.077-8.287c-.333-.167-1.97-.972-2.275-1.083-.305-.111-.527-.167-.75.167-.222.333-.86 1.083-1.055 1.306-.194.222-.389.25-.722.083-.333-.167-1.406-.518-2.678-1.652-.99-.883-1.658-1.974-1.853-2.307-.194-.333-.02-.513.147-.68.15-.15.333-.389.5-.583.167-.194.222-.333.333-.556.111-.222.056-.417-.028-.583-.083-.167-.75-1.807-1.028-2.474-.27-.65-.545-.562-.75-.573-.194-.01-.417-.012-.639-.012-.222 0-.583.083-.889.417-.305.333-1.166 1.14-1.166 2.78 0 1.64 1.194 3.224 1.361 3.446.167.222 2.351 3.591 5.696 5.036.796.344 1.417.55 1.901.703.799.254 1.526.218 2.101.132.641-.096 1.97-.805 2.248-1.583.278-.778.278-1.444.194-1.583-.083-.14-.305-.222-.639-.389Z" />
    </svg>
  );
}

export function WhatsAppWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-80 max-w-[calc(100vw-2.5rem)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center gap-3 bg-[#25D366] px-4 py-3 text-white">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
              <WhatsAppIcon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">DevAcademy Support</p>
              <p className="text-xs text-white/85">Typically replies within minutes</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-full p-1 text-white/85 transition hover:bg-white/15 hover:text-white"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                <path d="M10 8.586 4.707 3.293 3.293 4.707 8.586 10l-5.293 5.293 1.414 1.414L10 11.414l5.293 5.293 1.414-1.414L11.414 10l5.293-5.293-1.414-1.414L10 8.586Z" />
              </svg>
            </button>
          </div>

          <div className="bg-[#e5ded8] px-4 py-4">
            <div className="mb-3 rounded-lg rounded-tl-none bg-white px-3 py-2 text-sm text-slate-700 shadow-sm">
              Hi there! 👋 How can we help? Pick a question below or send us your own on WhatsApp.
            </div>

            <div className="flex flex-col gap-2">
              {SUGGESTED_QUERIES.map((query) => (
                <a
                  key={query}
                  href={buildWhatsAppLink(query)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[#25D366] bg-white px-3 py-2 text-left text-sm text-slate-700 shadow-sm transition hover:bg-[#25D366] hover:text-white"
                >
                  {query}
                </a>
              ))}
            </div>

            <a
              href={buildWhatsAppLink("Hi, I have a question about DevAcademy.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#1ebe57]"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Start chat on WhatsApp
            </a>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close WhatsApp chat" : "Open WhatsApp chat"}
        aria-expanded={open}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:bg-[#1ebe57] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
      >
        {!open && (
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-75" />
        )}
        <span className="relative">
          {open ? (
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6">
              <path d="M10 8.586 4.707 3.293 3.293 4.707 8.586 10l-5.293 5.293 1.414 1.414L10 11.414l5.293 5.293 1.414-1.414L11.414 10l5.293-5.293-1.414-1.414L10 8.586Z" />
            </svg>
          ) : (
            <WhatsAppIcon className="h-7 w-7" />
          )}
        </span>
      </button>
    </div>
  );
}
