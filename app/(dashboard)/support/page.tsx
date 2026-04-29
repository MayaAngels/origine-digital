"use client";

import { MessageCircle, HelpCircle, BookOpen, Mail, Clock, CheckCircle } from "lucide-react";

export const dynamic = 'force-dynamic';

const faqs = [
  { q: "How do I download my purchased products?", a: "Go to the Downloads page and click the download button next to your purchased product." },
  { q: "How does the success fee work?", a: "You only pay a percentage on revenue generated above your baseline target. Details in the Subscription page." },
  { q: "Can I cancel my subscription anytime?", a: "Yes, you can cancel anytime from the Subscription page. No long-term contracts." },
];

const tickets = [
  { id: "TKT-001", subject: "Download link not working", status: "resolved", date: "2025-04-05" },
  { id: "TKT-002", subject: "Question about billing", status: "in-progress", date: "2025-04-08" },
];

export default function SupportPage() {
  return (
    <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Support</h1>
          <p className="text-gray-500">Get help and find answers</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4">
          <a href="/contact" className="border rounded-lg p-4 text-center hover:shadow-md transition">
            <MessageCircle className="mx-auto text-indigo-600 mb-2" size={24} />
            <h3 className="font-semibold">Contact Support</h3>
            <p className="text-sm text-gray-500">Response within 24 hours</p>
          </a>
          <a href="/faq" className="border rounded-lg p-4 text-center hover:shadow-md transition">
            <HelpCircle className="mx-auto text-indigo-600 mb-2" size={24} />
            <h3 className="font-semibold">FAQ</h3>
            <p className="text-sm text-gray-500">Find quick answers</p>
          </a>
          <a href="/docs" className="border rounded-lg p-4 text-center hover:shadow-md transition">
            <BookOpen className="mx-auto text-indigo-600 mb-2" size={24} />
            <h3 className="font-semibold">Documentation</h3>
            <p className="text-sm text-gray-500">Guides and tutorials</p>
          </a>
        </div>

        {/* Recent Tickets */}
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <h3 className="font-semibold">Recent Support Tickets</h3>
          </div>
          <div className="divide-y">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="p-4 flex justify-between items-center">
                <div>
                  <div className="font-medium">{ticket.subject}</div>
                  <div className="text-sm text-gray-500">Ticket #{ticket.id} • {ticket.date}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    ticket.status === "resolved" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {ticket.status === "resolved" ? "Resolved" : "In Progress"}
                  </span>
                  <button className="text-indigo-600 text-sm">View</button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 px-4 py-2 text-center border-t">
            <a href="/support/history" className="text-indigo-600 text-sm hover:underline">View all tickets →</a>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <h3 className="font-semibold">Frequently Asked Questions</h3>
          </div>
          <div className="divide-y">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-4">
                <div className="font-medium">{faq.q}</div>
                <div className="text-sm text-gray-500 mt-1">{faq.a}</div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 px-4 py-2 text-center border-t">
            <a href="/faq" className="text-indigo-600 text-sm hover:underline">View all FAQs →</a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="border rounded-lg p-6">
          <h3 className="font-semibold mb-4">Can't find what you're looking for?</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Subject</label>
              <input type="text" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea rows={4} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"></textarea>
            </div>
            <button type="submit" className="btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    
  );
}