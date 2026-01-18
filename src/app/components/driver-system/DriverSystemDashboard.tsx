import { Home, FileText, Inbox, Truck, DollarSign, Star, User, Lock, TrendingUp, CreditCard, BarChart3 } from 'lucide-react';
import { useState } from 'react';

interface DriverSystemDashboardProps {
  onNavigateToCreateOffer: () => void;
  onNavigateToMyOffers: () => void;
  onNavigateToIncomingRequests: () => void;
  onNavigateToActiveDeliveries: () => void;
  onNavigateToEarnings: () => void;
  onNavigateToReviews: () => void;
  onNavigateToProfile: () => void;
}

export function DriverSystemDashboard({
  onNavigateToCreateOffer,
  onNavigateToMyOffers,
  onNavigateToIncomingRequests,
  onNavigateToActiveDeliveries,
  onNavigateToEarnings,
  onNavigateToReviews,
  onNavigateToProfile,
}: DriverSystemDashboardProps) {
  const [driverStatus, setDriverStatus] = useState<'available' | 'busy' | 'offline'>('available');

  return (
    <div className="size-full flex bg-gray-50">
      {/* Fixed Left Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-purple-600 to-blue-600 text-white flex-shrink-0 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg">
              <div className="text-center">
                <div className="text-sm font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                  Go
                </div>
                <div className="text-xs font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent -mt-0.5">
                  Local
                </div>
              </div>
            </div>
            <div>
              <h2 className="font-bold text-lg">Driver System</h2>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-6 overflow-y-auto">
          <button className="w-full px-6 py-3 flex items-center gap-3 bg-white/10 border-l-4 border-white text-white font-semibold">
            <Home className="w-5 h-5" />
            Dashboard
          </button>
          
          <button 
            onClick={onNavigateToMyOffers}
            className="w-full px-6 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors text-white/90 hover:text-white"
          >
            <FileText className="w-5 h-5" />
            My Offers
          </button>
          
          <button 
            onClick={onNavigateToIncomingRequests}
            className="w-full px-6 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors text-white/90 hover:text-white"
          >
            <Inbox className="w-5 h-5" />
            Incoming Requests
            <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">3</span>
          </button>
          
          <button 
            onClick={onNavigateToActiveDeliveries}
            className="w-full px-6 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors text-white/90 hover:text-white"
          >
            <Truck className="w-5 h-5" />
            Active Deliveries
            <span className="ml-auto bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">2</span>
          </button>
          
          <button 
            onClick={onNavigateToEarnings}
            className="w-full px-6 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors text-white/90 hover:text-white"
          >
            <DollarSign className="w-5 h-5" />
            Earnings
          </button>
          
          <button 
            onClick={onNavigateToReviews}
            className="w-full px-6 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors text-white/90 hover:text-white"
          >
            <Star className="w-5 h-5" />
            Reviews
          </button>
          
          <button 
            onClick={onNavigateToProfile}
            className="w-full px-6 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors text-white/90 hover:text-white"
          >
            <User className="w-5 h-5" />
            Profile
          </button>
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-sm">Driver</p>
              <p className="text-xs text-white/70">Ahmed Al-Khalifa</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Welcome, Driver</h1>
              <p className="text-gray-500 mt-1">Manage your deliveries and earnings</p>
            </div>

            {/* Status Toggle */}
            <div className="flex items-center gap-3 bg-gray-100 rounded-full p-1.5">
              <button
                onClick={() => setDriverStatus('available')}
                className={`px-5 py-2.5 rounded-full font-semibold transition-all ${
                  driverStatus === 'available'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                Available
              </button>
              <button
                onClick={() => setDriverStatus('busy')}
                className={`px-5 py-2.5 rounded-full font-semibold transition-all ${
                  driverStatus === 'busy'
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                Busy
              </button>
              <button
                onClick={() => setDriverStatus('offline')}
                className={`px-5 py-2.5 rounded-full font-semibold transition-all ${
                  driverStatus === 'offline'
                    ? 'bg-gray-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                Offline
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-5 gap-6 mb-8">
            {/* Active Offers */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-1">Active Offers</p>
              <p className="text-3xl font-bold text-gray-800">12</p>
            </div>

            {/* Pending Requests */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Inbox className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-1">Pending Requests</p>
              <p className="text-3xl font-bold text-gray-800">3</p>
            </div>

            {/* Today's Earnings */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-1">Today's Earnings</p>
              <p className="text-3xl font-bold text-gray-800">BD 85</p>
            </div>

            {/* Rating */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-1">Rating</p>
              <div className="flex items-center gap-1">
                <p className="text-3xl font-bold text-gray-800">4.9</p>
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              </div>
            </div>

            {/* Completion Rate */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Truck className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-1">Completion Rate</p>
              <p className="text-3xl font-bold text-gray-800">98%</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={onNavigateToCreateOffer}
                className="bg-gradient-to-r from-purple-600 to-blue-500 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-lg">Create New Offer</p>
                    <p className="text-sm text-white/80">Publish delivery offer</p>
                  </div>
                </div>
              </button>

              <button
                onClick={onNavigateToMyOffers}
                className="bg-white border-2 border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all hover:border-purple-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-lg text-gray-800">View My Offers</p>
                    <p className="text-sm text-gray-500">Manage 12 active offers</p>
                  </div>
                </div>
              </button>

              <button
                onClick={onNavigateToIncomingRequests}
                className="bg-white border-2 border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all hover:border-blue-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Inbox className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-lg text-gray-800">Check Requests</p>
                    <p className="text-sm text-gray-500">3 pending requests</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Future Features Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Future Features</h2>
            <div className="grid grid-cols-3 gap-4">
              {/* Live Tracking */}
              <div className="bg-white border-2 border-gray-200 p-6 rounded-2xl shadow-md opacity-60">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">Live Tracking</p>
                    <p className="text-xs text-gray-500">Real-time GPS tracking</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-gray-200 px-3 py-1.5 rounded-full w-fit">
                  <Lock className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-600 font-semibold text-xs">Coming Soon 🔒</span>
                </div>
              </div>

              {/* Payments */}
              <div className="bg-white border-2 border-gray-200 p-6 rounded-2xl shadow-md opacity-60">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">Payments</p>
                    <p className="text-xs text-gray-500">Direct payment processing</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-gray-200 px-3 py-1.5 rounded-full w-fit">
                  <Lock className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-600 font-semibold text-xs">Coming Soon 🔒</span>
                </div>
              </div>

              {/* Analytics */}
              <div className="bg-white border-2 border-gray-200 p-6 rounded-2xl shadow-md opacity-60">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">Analytics</p>
                    <p className="text-xs text-gray-500">Performance insights</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-gray-200 px-3 py-1.5 rounded-full w-fit">
                  <Lock className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-600 font-semibold text-xs">Coming Soon 🔒</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
            <div className="bg-white rounded-2xl shadow-md border border-gray-100">
              <div className="divide-y divide-gray-100">
                {[
                  { action: 'New request received', customer: 'Sara Ahmed', route: 'Manama → Riffa', time: '5 min ago', type: 'request' },
                  { action: 'Delivery completed', customer: 'Mohammed Ali', route: 'Muharraq → Seef', time: '1 hour ago', type: 'completed' },
                  { action: 'Offer published', customer: null, route: 'Manama → Hamad Town', time: '2 hours ago', type: 'offer' },
                  { action: 'Payment received', customer: 'Fatima Hassan', route: 'Adliya → Sitra', time: '3 hours ago', type: 'payment' },
                ].map((activity, index) => (
                  <div key={index} className="p-5 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          activity.type === 'request' ? 'bg-blue-100' :
                          activity.type === 'completed' ? 'bg-green-100' :
                          activity.type === 'offer' ? 'bg-purple-100' :
                          'bg-yellow-100'
                        }`}>
                          {activity.type === 'request' && <Inbox className="w-5 h-5 text-blue-600" />}
                          {activity.type === 'completed' && <Truck className="w-5 h-5 text-green-600" />}
                          {activity.type === 'offer' && <FileText className="w-5 h-5 text-purple-600" />}
                          {activity.type === 'payment' && <DollarSign className="w-5 h-5 text-yellow-600" />}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{activity.action}</p>
                          <p className="text-sm text-gray-500">
                            {activity.customer && `${activity.customer} • `}{activity.route}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
