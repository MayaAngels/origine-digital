
import { 
  ShoppingBag, 
  Download, 
  Wallet, 
  TrendingUp,
  Package,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

// Mock data - will be replaced with real data from API
const stats = [
  { label: "Total Orders", value: "12", icon: ShoppingBag, color: "bg-blue-500" },
  { label: "Downloads", value: "8", icon: Download, color: "bg-green-500" },
  { label: "Wallet Balance", value: "€245", icon: Wallet, color: "bg-purple-500" },
  { label: "Lifetime Value", value: "€1,247", icon: TrendingUp, color: "bg-orange-500" },
];

const recentOrders = [
  { id: "ORD-001", date: "2025-04-10", total: 49, status: "Completed", items: 1 },
  { id: "ORD-002", date: "2025-04-05", total: 29, status: "Processing", items: 1 },
  { id: "ORD-003", date: "2025-03-28", total: 59, status: "Completed", items: 2 },
];

const recentDownloads = [
  { name: "Business Operations Starter Kit", date: "2025-04-10", size: "2.5 MB" },
  { name: "Client Onboarding Pack", date: "2025-04-05", size: "1.8 MB" },
];

export default function AccountPage() {
  return (
    <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Welcome back! Here's what's happening with your account.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="border rounded-lg p-4 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <div className={`${stat.color} p-2 rounded-lg text-white`}>
                    <Icon size={20} />
                  </div>
                  <span className="text-2xl font-bold">{stat.value}</span>
                </div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b">
              <h3 className="font-semibold">Recent Orders</h3>
            </div>
            <div className="divide-y">
              {recentOrders.map((order) => (
                <div key={order.id} className="p-4 flex justify-between items-center">
                  <div>
                    <div className="font-medium">{order.id}</div>
                    <div className="text-sm text-gray-500">{order.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">€{order.total}</div>
                    <div className={`text-xs ${
                      order.status === "Completed" ? "text-green-600" : "text-yellow-600"
                    }`}>
                      {order.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 px-4 py-2 text-center border-t">
              <a href="/orders" className="text-indigo-600 text-sm hover:underline">View all orders →</a>
            </div>
          </div>

          {/* Recent Downloads */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b">
              <h3 className="font-semibold">Recent Downloads</h3>
            </div>
            <div className="divide-y">
              {recentDownloads.map((download, idx) => (
                <div key={idx} className="p-4 flex justify-between items-center">
                  <div>
                    <div className="font-medium">{download.name}</div>
                    <div className="text-sm text-gray-500">{download.date} • {download.size}</div>
                  </div>
                  <button className="text-indigo-600 hover:text-indigo-700 text-sm">
                    Download
                  </button>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 px-4 py-2 text-center border-t">
              <a href="/downloads" className="text-indigo-600 text-sm hover:underline">View all downloads →</a>
            </div>
          </div>
        </div>

        {/* Grow Program Status */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-lg mb-1">Origine.Grow Member</h3>
              <p className="text-indigo-100 text-sm">You're in the Growth tier. Pay only when you grow.</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">€79<span className="text-sm font-normal">/month</span></div>
              <p className="text-indigo-100 text-xs">Next billing: May 10, 2025</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-indigo-500">
            <div className="flex justify-between text-sm">
              <span>Progress to next tier</span>
              <span>€5,247 / €10,000</span>
            </div>
            <div className="w-full bg-indigo-500 rounded-full h-2 mt-2">
              <div className="bg-white rounded-full h-2" style={{ width: "52%" }}></div>
            </div>
          </div>
        </div>
      </div>
    
  );
}