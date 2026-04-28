"use client";

import { useState } from "react";

const faqs = [
  { q: "How do I access my digital products?", a: "After purchase, you'll receive an email with download links. You can also access them from your dashboard." },
  { q: "What formats are the products in?", a: "PDF, Excel, Word, Notion templates, Google Docs/Sheets." },
  { q: "How long does service delivery take?", a: "2-7 business days depending on the service." },
  { q: "Can I request a custom solution?", a: "Yes! Visit our 'Done For You' page and fill out the form." },
  { q: "What is your refund policy?", a: "30-day money-back guarantee for digital products." },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold text-center mb-4">Frequently Asked Questions</h1>
      <p className="text-center text-muted-foreground mb-12">Everything you need to know</p>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border rounded-lg overflow-hidden">
            <button onClick={() => setOpenIndex(openIndex === idx ? null : idx)} className="w-full text-left p-4 font-semibold flex justify-between items-center hover:bg-muted/30">
              {faq.q}
              <span>{openIndex === idx ? "−" : "+"}</span>
            </button>
            {openIndex === idx && <div className="p-4 pt-0 text-muted-foreground">{faq.a}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}