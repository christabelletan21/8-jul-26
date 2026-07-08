import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact — DevAcademy",
  description: "Get in touch with the DevAcademy team.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <h1 className="text-3xl font-bold text-slate-900">Get in touch</h1>
      <p className="mt-2 text-slate-600">
        Have a question about a course or training? Send us a message and we&apos;ll get back to you.
      </p>
      <div className="mt-8">
        <ContactForm />
      </div>
    </div>
  );
}
