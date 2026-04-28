"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">📧</div>
        <h1 className="text-2xl font-bold mb-2">Message Sent!</h1>
        <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-4xl font-bold text-center mb-4">Contact Us</h1>
      <p className="text-center text-muted-foreground mb-8">Have questions? Get in touch.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div><label className="block text-sm font-medium mb-1">Name *</label><input type="text" required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" /></div>
        <div><label className="block text-sm font-medium mb-1">Email *</label><input type="email" required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" /></div>
        <div><label className="block text-sm font-medium mb-1">Message *</label><textarea rows={5} required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" /></div>
        <button type="submit" className="w-full btn-primary">Send Message</button>
      </form>
    </div>
  );
}