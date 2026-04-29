"use client";

import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
import { Search, Filter, Download, Eye } from "lucide-react";

const orders = [
  { id: "ORD-001", date: "2025-04-10", total: 49, status: "Completed", items: 1, download: true },
  { id: "ORD-002", date: "2025-04-05", total: 29, status: "Processing", items: 1, download: false },
  { id: "ORD-003", date: "2025-03-28", total: 59, status: "Completed", items: 2, download: true },
  { id: "ORD-004", date: "2025-03-15", total: 49, status: "Completed", items: 1, download: true },
  { id: "ORD-005", date: "2025-03-01", total: 29, status: "Refunded", items: 1, download: false },
];

const statusColors = {
  Completed: "bg-green-100 text-green-700",
  Processing: "bg-yellow-100 text-yellow-700",
  Refunded: "bg-red-100 text-red-700",
  Cancelled: "bg-gray-100 text-gray-700",
};

export default function OrdersPage() {
  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Orders</h1>
            <p className="text-gray-500">View and manage your order history</p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search orders..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button className="p-2 border rounded-lg hover:bg-gray-50">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4">Order ID</th>
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Items</th>
                  <th className="text-left p-4">Total</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="p-4 font-mono text-sm">{order.id}</td>
                    <td className="p-4 text-gray-600">{order.date}</td>
                    <td className="p-4">{order.items}</td>
                    <td className="p-4 font-semibold">€{order.total}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status as keyof typeof statusColors]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button className="p-1 text-gray-400 hover:text-indigo-600">
                          <Eye size={18} />
                        </button>
                        {order.download && (
                          <button className="p-1 text-gray-400 hover:text-indigo-600">
                            <Download size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    
  );
}