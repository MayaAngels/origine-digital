import { Plus, CreditCard, CheckCircle, AlertCircle } from "lucide-react";

export default function SubscriptionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Subscription</h1>
        <p className="text-gray-500">Manage your subscription and payment methods</p>
      </div>

      {/* Current Plan */}
      <div className="border rounded-lg p-6 bg-white">
        <h2 className="text-xl font-semibold mb-4">Current Plan</h2>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-medium">Growth Plan</p>
            <p className="text-gray-500">€79/month</p>
          </div>
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">Active</span>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="border rounded-lg p-6 bg-white">
        <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 border rounded">
            <div className="flex items-center gap-3">
              <CreditCard size={24} />
              <div>
                <p className="font-medium">•••• 4242</p>
                <p className="text-sm text-gray-500">Expires 12/2025</p>
              </div>
            </div>
            <CheckCircle className="text-green-500" size={20} />
          </div>
          <button className="mt-4 text-indigo-600 text-sm flex items-center gap-1">
            <Plus size={14} />
            Add payment method
          </button>
        </div>
      </div>

      {/* Billing History */}
      <div className="border rounded-lg p-6 bg-white">
        <h2 className="text-xl font-semibold mb-4">Billing History</h2>
        <div className="space-y-2">
          <div className="flex justify-between py-2 border-b">
            <span>April 2025</span>
            <span>€79.00</span>
            <span className="text-green-600">Paid</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span>March 2025</span>
            <span>€79.00</span>
            <span className="text-green-600">Paid</span>
          </div>
        </div>
      </div>
    </div>
  );
}