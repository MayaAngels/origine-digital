export const metadata = {
  title: "Origine.Grow | Zero-Risk Business Growth Program",
  description: "Pay only after you grow. Access all products, templates, and courses for free until you hit your targets.",
}

export default function GrowPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-24 text-center">
          <div className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm mb-6">
            🚀 Official Launch Partner Program
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Grow Your Business
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
              With Zero Financial Risk
            </span>
          </h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-8">
            Access professional strategy sessions, complete system redesign,
            full implementation support, and our entire product suite.
            <br />
            <span className="font-semibold">You only start paying AFTER you achieve measurable growth.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/grow/apply" className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition transform hover:scale-105">
              Apply for Partnership →
            </a>
          </div>
          <p className="text-indigo-200 text-sm mt-6">
            🔒 €50 refundable deposit • No long-term commitment • Transparent success fees
          </p>
        </div>
      </div>

      {/* What's Included */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What's Included</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border rounded-xl p-6 bg-white shadow-sm">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-xl font-semibold mb-2">Strategy & Analysis</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>✓ Monthly 1-on-1 strategy sessions</li>
              <li>✓ Comprehensive business audit</li>
              <li>✓ Custom growth roadmap</li>
              <li>✓ KPI dashboard setup</li>
            </ul>
          </div>
          <div className="border rounded-xl p-6 bg-white shadow-sm">
            <div className="text-3xl mb-3">🔄</div>
            <h3 className="text-xl font-semibold mb-2">System Redesign</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>✓ Website optimization</li>
              <li>✓ Booking system setup</li>
              <li>✓ CRM and automation</li>
              <li>✓ Analytics implementation</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Simple, Fair Pricing</h2>
          <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-4 text-center border">
              <div className="text-indigo-600 font-semibold">Seed</div>
              <div className="text-2xl font-bold">€0</div>
              <div className="text-xs text-gray-400">Until target</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border-2 border-indigo-200">
              <div className="text-indigo-600 font-semibold">Growth</div>
              <div className="text-2xl font-bold">€79</div>
              <div className="text-xs text-gray-400">+5% above €5k</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border">
              <div className="text-indigo-600 font-semibold">Scale</div>
              <div className="text-2xl font-bold">€149</div>
              <div className="text-xs text-gray-400">+3% above €10k</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border">
              <div className="text-indigo-600 font-semibold">Enterprise</div>
              <div className="text-2xl font-bold">€299</div>
              <div className="text-xs text-gray-400">+2% above €50k</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Scale Without Risk?</h2>
          <a href="/grow/apply" className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition">
            Apply Now → €50 Refundable Deposit
          </a>
        </div>
      </div>
    </div>
  )
}