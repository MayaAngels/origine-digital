"use client";

import { User, Bell, Shield, Globe, Mail, Key } from "lucide-react";

export const dynamic = 'force-dynamic';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-gray-500">Manage your account preferences</p>
        </div>

        {/* Profile Settings */}
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <h3 className="font-semibold flex items-center gap-2">
              <User size={18} />
              Profile Information
            </h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input type="text" className="w-full px-3 py-2 border rounded-lg" defaultValue="Maya Almeida" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" className="w-full px-3 py-2 border rounded-lg" defaultValue="maya@origine.digital" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Business Name</label>
              <input type="text" className="w-full px-3 py-2 border rounded-lg" defaultValue="Origine.Digital" />
            </div>
            <button className="btn-primary">Save Changes</button>
          </div>
        </div>

        {/* Notifications */}
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <h3 className="font-semibold flex items-center gap-2">
              <Bell size={18} />
              Notification Preferences
            </h3>
          </div>
          <div className="p-4 space-y-3">
            <label className="flex items-center justify-between cursor-pointer">
              <span>Order confirmations</span>
              <input type="checkbox" defaultChecked className="toggle" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span>Download reminders</span>
              <input type="checkbox" defaultChecked className="toggle" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span>Marketing updates</span>
              <input type="checkbox" className="toggle" />
            </label>
          </div>
        </div>

        {/* Security */}
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <h3 className="font-semibold flex items-center gap-2">
              <Shield size={18} />
              Security
            </h3>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Current Password</label>
              <input type="password" className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">New Password</label>
                <input type="password" className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Confirm Password</label>
                <input type="password" className="w-full px-3 py-2 border rounded-lg" />
              </div>
            </div>
            <button className="btn-primary">Update Password</button>
          </div>
        </div>

        {/* API Keys */}
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <h3 className="font-semibold flex items-center gap-2">
              <Key size={18} />
              API Keys
            </h3>
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-500 mb-4">Generate API keys for programmatic access to your account.</p>
            <button className="btn-outline">Generate New API Key</button>
            <div className="mt-4 text-sm text-gray-400">
              No API keys generated yet.
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="border border-red-200 rounded-lg overflow-hidden">
          <div className="bg-red-50 px-4 py-3 border-b border-red-200">
            <h3 className="font-semibold text-red-700">Danger Zone</h3>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">Delete Account</div>
                <p className="text-sm text-gray-500">Permanently delete your account and all data.</p>
              </div>
              <button className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    
  );
}