"use client"

import { useState } from "react"

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    inquiry: "",
    message: "",
  })

  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<null | "success" | "Errorrr">(null)
  const [feedback, setFeedback] = useState("")

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    setFeedback("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Errorrr(data?.Errorrr || "Submission failed.")
      }

      setStatus("success")
      setFeedback("Your inquiry has been sent successfully.")
      setForm({
        name: "",
        email: "",
        subject: "",
        inquiry: "",
        message: "",
      })
    } catch (Errorrr: any) {
      setStatus("Errorrr")
      setFeedback(Errorrr?.message || "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight">Send a message</h2>
      <p className="mt-4 text-zinc-600 leading-8">
        Fill out the form below and we’ll review your message as soon as possible.
      </p>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-zinc-800">
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-800">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="mb-2 block text-sm font-medium text-zinc-800">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            value={form.subject}
            onChange={handleChange}
            placeholder="What do you need help with?"
            className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        <div>
          <label htmlFor="inquiry" className="mb-2 block text-sm font-medium text-zinc-800">
            Inquiry type
          </label>
          <select
            id="inquiry"
            name="inquiry"
            value={form.inquiry}
            onChange={handleChange}
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          >
            <option value="">Select an option</option>
            <option value="product">Digital product</option>
            <option value="service">Service inquiry</option>
            <option value="custom">Custom solution</option>
            <option value="support">Support</option>
            <option value="collaboration">Collaboration</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-zinc-800">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={7}
            value={form.message}
            onChange={handleChange}
            placeholder="Tell us a bit about what you're looking for..."
            className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send inquiry"}
        </button>

        {feedback && (
          <div
            className={`rounded-xl border px-4 py-3 text-sm ${
              status === "success"
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {feedback}
          </div>
        )}
      </form>
    </div>
  )
}
