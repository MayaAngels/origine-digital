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

export const dynamic = 'force-dynamic';

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
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="border rounded-lg p-6 bg-white">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <div className="space-y-3">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex justify-between items-center pb-3 border-b">
              <div>
                <p className="font-medium">{order.id}</p>
                <p className="text-sm text-gray-500">{order.date} • {order.items} items</p>
              </div>
              <div className="text-right">
                <p className="font-medium">€{order.total}</p>
                <span className={`text-xs px-2 py-1 rounded ${
                  order.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Downloads */}
      <div className="border rounded-lg p-6 bg-white">
        <h2 className="text-xl font-semibold mb-4">Recent Downloads</h2>
        <div className="space-y-3">
          {recentDownloads.map((download, idx) => (
            <div key={idx} className="flex justify-between items-center pb-3 border-b">
              <div>
                <p className="font-medium">{download.name}</p>
                <p className="text-sm text-gray-500">{download.date} • {download.size}</p>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm">
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}