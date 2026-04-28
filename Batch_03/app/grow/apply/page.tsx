export const metadata = {
  title: "Apply to Origine.Grow | Zero-Risk Business Growth",
  description: "Join the Origine.Grow program. Pay only after you grow.",
}

export default function ApplyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Apply to Origine.Grow</h1>
        <p className="text-muted-foreground">Tell us about your business to get started</p>
      </div>

      <form className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Business Name *</label>
            <input type="text" required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email *</label>
            <input type="email" required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Industry *</label>
          <select required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500">
            <option value="">Select...</option>
            <option value="salon">Salon / Beauty</option>
            <option value="ecommerce">E-commerce</option>
            <option value="consulting">Consulting</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Current Monthly Revenue (€) *</label>
          <input type="number" required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
        </div>

        <div className="bg-indigo-50 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Program Summary</h3>
          <ul className="space-y-1 text-sm">
            <li>✅ €50 refundable deposit</li>
            <li>✅ Access to all products and courses</li>
            <li>✅ Pay only after hitting your target</li>
            <li>✅ Cancel anytime</li>
          </ul>
        </div>

        <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
          Submit Application → Pay €50 Deposit
        </button>
      </form>
    </div>
  )
}