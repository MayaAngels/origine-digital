"use client"

import { useState } from "react"

type FAQItem = {
  question: string
  answer: string
}

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index

        return (
          <div
            key={item.question}
            className="overflow-hidden rounded-2xl border border-zinc-200 bg-white"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-base font-semibold text-zinc-900">
                {item.question}
              </span>
              <span className="text-2xl leading-none text-zinc-500">
                {isOpen ? "−" : "+"}
              </span>
            </button>

            {isOpen && (
              <div className="border-t border-zinc-200 px-6 py-5">
                <p className="leading-8 text-zinc-600">{item.answer}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
