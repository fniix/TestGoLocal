import { ArrowLeft, User, MapPin, Clock, DollarSign, Star, TrendingUp, Bell, Settings, Home as HomeIcon } from 'lucide-react';
import { useState } from 'react';

interface DriverDashboardProps {
  driverName: string;
  vehicleType: string;
  vehiclePlate: string;
  onLogout: () => void;
  onViewProfile: () => void;
}

export function DriverDashboard({ 
  driverName, 
  vehicleType, 
  vehiclePlate,
  onLogout,
  onViewProfile
}: DriverDashboardProps) {
  const [isOnline, setIsOnline] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'earnings' | 'notifications' | 'profile'>('home');

  // Mock data
  const todayEarnings = 45.50;
  const todayRides = 8;
  const rating = 4.8;
  const totalRides = 342;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const displayName = driverName.split(' ')[0];

  return (
    <div className="size-full bg-gray-50 flex flex-col">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 px-6 pt-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-md">
              <span className="text-purple-600 font-bold text-xl">
                {driverName[0].toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-white text-xl font-bold">
                {getGreeting()}, {displayName}
              </h1>
              <p className="text-white/90 text-sm">{vehicleType} • {vehiclePlate}</p>
            </div>
          </div>

          {/* Online/Offline Toggle */}
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`px-4 py-2 rounded-full font-semibold transition-all shadow-md ${
              isOnline
                ? 'bg-green-500 text-white'
                : 'bg-white text-gray-700'
            }`}
          >
            {isOnline ? '🟢 Online' : '⚪ Offline'}
          </button>
        </div>

        {/* Status Message */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <p className="text-white text-sm">
            {isOnline 
              ? '🚗 You\'re online and ready to accept rides!' 
              : '⏸️ You\'re offline. Go online to start earning.'}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-24 px-6 -mt-4">
        {/* Today's Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Earnings Card */}
          <div className="bg-white rounded-2xl p-5 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <p className="text-gray-500 text-xs mb-1">Today's Earnings</p>
            <p className="text-2xl font-bold text-gray-800">BD {todayEarnings.toFixed(2)}</p>
          </div>

          {/* Rides Card */}
          <div className="bg-white rounded-2xl p-5 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-gray-500 text-xs mb-1">Today's Rides</p>
            <p className="text-2xl font-bold text-gray-800">{todayRides}</p>
          </div>
        </div>

        {/* Performance Stats */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Your Performance</h3>
          
          <div className="space-y-4">
            {/* Rating */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Star className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Rating</p>
                  <p className="text-xs text-gray-500">Based on {totalRides} rides</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-gray-800">{rating}</span>
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              </div>
            </div>

            {/* Total Rides */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Total Rides</p>
                  <p className="text-xs text-gray-500">All time</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-gray-800">{totalRides}</span>
            </div>

            {/* Acceptance Rate */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Acceptance Rate</p>
                  <p className="text-xs text-gray-500">Last 30 days</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-gray-800">94%</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <button className="p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
              <Clock className="w-6 h-6 text-purple-600 mb-2" />
              <p className="text-sm font-semibold text-gray-800">Ride History</p>
            </button>
            
            <button className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
              <DollarSign className="w-6 h-6 text-blue-600 mb-2" />
              <p className="text-sm font-semibold text-gray-800">Earnings</p>
            </button>
            
            <button 
              onClick={onViewProfile}
              className="p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
            >
              <User className="w-6 h-6 text-green-600 mb-2" />
              <p className="text-sm font-semibold text-gray-800">Profile</p>
            </button>
            
            <button className="p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors">
              <Settings className="w-6 h-6 text-orange-600 mb-2" />
              <p className="text-sm font-semibold text-gray-800">Settings</p>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
          
          <div className="space-y-4">
            {[
              { time: '2:30 PM', from: 'Manama City Center', to: 'Seef Mall', amount: 'BD 5.50' },
              { time: '1:15 PM', from: 'Adliya', to: 'Diplomatic Area', amount: 'BD 4.20' },
              { time: '11:45 AM', from: 'Juffair', to: 'Bahrain Mall', amount: 'BD 6.80' },
            ].map((ride, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{ride.from}</p>
                    <p className="text-xs text-gray-500 mb-1">to {ride.to}</p>
                    <p className="text-xs text-gray-400">{ride.time}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-green-600">{ride.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-md mx-auto flex justify-around items-center">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center transition-colors ${
              activeTab === 'home' ? 'text-purple-600' : 'text-gray-400 hover:text-purple-600'
            }`}
          >
            <HomeIcon className="w-6 h-6 mb-1" />
            <span className="text-xs">Home</span>
          </button>

          <button 
            onClick={() => setActiveTab('earnings')}
            className={`flex flex-col items-center transition-colors ${
              activeTab === 'earnings' ? 'text-purple-600' : 'text-gray-400 hover:text-purple-600'
            }`}
          >
            <DollarSign className="w-6 h-6 mb-1" />
            <span className="text-xs">Earnings</span>
          </button>

          <button 
            onClick={() => setActiveTab('notifications')}
            className={`flex flex-col items-center transition-colors ${
              activeTab === 'notifications' ? 'text-purple-600' : 'text-gray-400 hover:text-purple-600'
            }`}
          >
            <Bell className="w-6 h-6 mb-1" />
            <span className="text-xs">Alerts</span>
          </button>

          <button 
            onClick={() => {
              setActiveTab('profile');
              onViewProfile();
            }}
            className={`flex flex-col items-center transition-colors ${
              activeTab === 'profile' ? 'text-purple-600' : 'text-gray-400 hover:text-purple-600'
            }`}
          >
            <User className="w-6 h-6 mb-1" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
