import { ArrowLeft, Calendar, MapPin, DollarSign, Star, RotateCcw, Download, MessageCircle, ChevronRight, Search, Filter, Clock, CheckCircle, XCircle, Home, Bell, User as UserIcon, TrendingUp, Award, History } from 'lucide-react';
import { useState } from 'react';

interface RideHistoryScreenProps {
  onBack: () => void;
  userName?: string;
  onNavigateHome?: () => void;
  onNavigateSearch?: () => void;
  onNavigateActivity?: () => void;
  onNavigateProfile?: () => void;
  onNavigateLogin?: () => void;
  onNavigateRegister?: () => void;
  onRebook?: (pickup: string, dropoff: string, serviceType: string) => void;
}

interface Ride {
  id: string;
  date: string;
  time: string;
  pickup: string;
  dropoff: string;
  serviceType: string;
  vehicleType: string;
  driverName: string;
  driverPhoto: string;
  price: number;
  status: 'completed' | 'cancelled';
  rating?: number;
  distance: number;
  duration: number;
  paymentMethod: string;
  cancelReason?: string;
}

export function RideHistoryScreen({ onBack, userName, onNavigateHome, onNavigateSearch, onNavigateActivity, onNavigateProfile, onNavigateLogin, onNavigateRegister, onRebook }: RideHistoryScreenProps) {
  const [activeTab, setActiveTab] = useState<'completed' | 'cancelled'>('completed');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Check if user is a guest (not logged in)
  const isGuest = !userName || userName === '';

  // Mock ride data
  const rides: Ride[] = [
    {
      id: '1',
      date: 'Today',
      time: '2:30 PM',
      pickup: 'Seef District, Manama',
      dropoff: 'City Centre Bahrain',
      serviceType: 'Standard Ride',
      vehicleType: 'Sedan',
      driverName: 'Ahmed Al-Khalifa',
      driverPhoto: '👨‍💼',
      price: 4.50,
      status: 'completed',
      rating: 5,
      distance: 5.2,
      duration: 18,
      paymentMethod: 'Credit Card'
    },
    {
      id: '2',
      date: 'Today',
      time: '10:15 AM',
      pickup: 'Diplomatic Area, Manama',
      dropoff: 'Bahrain International Airport',
      serviceType: 'Airport Transfer',
      vehicleType: 'SUV',
      driverName: 'Mohammed Hassan',
      driverPhoto: '👨',
      price: 12.00,
      status: 'completed',
      rating: 5,
      distance: 8.5,
      duration: 25,
      paymentMethod: 'Mobile Wallet'
    },
    {
      id: '3',
      date: 'Yesterday',
      time: '6:45 PM',
      pickup: 'Adliya, Manama',
      dropoff: 'Riffa',
      serviceType: 'Standard Ride',
      vehicleType: 'Sedan',
      driverName: 'Ali Yousif',
      driverPhoto: '👨‍🦱',
      price: 8.50,
      status: 'completed',
      rating: 4,
      distance: 12.3,
      duration: 32,
      paymentMethod: 'Cash'
    },
    {
      id: '4',
      date: 'Yesterday',
      time: '3:20 PM',
      pickup: 'Juffair, Manama',
      dropoff: 'Seef Mall',
      serviceType: 'Standard Ride',
      vehicleType: 'Sedan',
      driverName: 'Hassan Ahmed',
      driverPhoto: '👨‍🦰',
      price: 3.75,
      status: 'cancelled',
      distance: 4.1,
      duration: 12,
      paymentMethod: 'Credit Card',
      cancelReason: 'Driver unavailable'
    },
    {
      id: '5',
      date: '2 days ago',
      time: '9:00 AM',
      pickup: 'Muharraq',
      dropoff: 'Manama Souq',
      serviceType: 'Standard Ride',
      vehicleType: 'Sedan',
      driverName: 'Omar Khalil',
      driverPhoto: '👨‍💼',
      price: 6.25,
      status: 'completed',
      rating: 5,
      distance: 7.8,
      duration: 22,
      paymentMethod: 'Mobile Wallet'
    },
    {
      id: '6',
      date: '3 days ago',
      time: '7:30 PM',
      pickup: 'Budaiya',
      dropoff: 'Amwaj Islands',
      serviceType: 'Premium Ride',
      vehicleType: 'Luxury Sedan',
      driverName: 'Khalid Mahmood',
      driverPhoto: '👨‍✈️',
      price: 15.00,
      status: 'completed',
      rating: 5,
      distance: 15.2,
      duration: 38,
      paymentMethod: 'Credit Card'
    },
    {
      id: '7',
      date: '4 days ago',
      time: '11:45 AM',
      pickup: 'Salmabad',
      dropoff: 'Riffa Views',
      serviceType: 'Standard Ride',
      vehicleType: 'Sedan',
      driverName: 'Youssef Ali',
      driverPhoto: '👨',
      price: 5.50,
      status: 'cancelled',
      distance: 6.5,
      duration: 18,
      paymentMethod: 'Cash',
      cancelReason: 'Changed plans'
    }
  ];

  const filteredRides = rides
    .filter(ride => ride.status === activeTab)
    .filter(ride => 
      searchQuery === '' ||
      ride.pickup.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ride.dropoff.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ride.driverName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Calculate statistics
  const completedRides = rides.filter(r => r.status === 'completed');
  const totalSpent = completedRides.reduce((sum, ride) => sum + ride.price, 0);
  const totalDistance = completedRides.reduce((sum, ride) => sum + ride.distance, 0);
  const avgRating = completedRides.reduce((sum, ride) => sum + (ride.rating || 0), 0) / completedRides.length;

  // Group rides by date
  const groupedRides = filteredRides.reduce((groups, ride) => {
    const date = ride.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(ride);
    return groups;
  }, {} as Record<string, Ride[]>);

  return (
    <div className="size-full bg-gray-50 flex flex-col">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 px-6 pt-6 pb-6 shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={onBack}
            className="flex items-center text-white hover:bg-white/10 rounded-full p-2 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <div className="flex-1">
            <h1 className="text-white text-2xl font-bold">Ride History</h1>
            {!isGuest && <p className="text-white/90 text-sm">{rides.length} total trips</p>}
          </div>

          {!isGuest && (
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center text-white hover:bg-white/10 rounded-full p-2 transition-colors"
            >
              <Filter className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Statistics Summary - Only show for logged-in users */}
        {!isGuest && (
          <>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                <TrendingUp className="w-5 h-5 text-white mx-auto mb-1" />
                <p className="text-white/80 text-xs mb-1">Total Spent</p>
                <p className="text-white text-lg font-bold">BD {totalSpent.toFixed(2)}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                <MapPin className="w-5 h-5 text-white mx-auto mb-1" />
                <p className="text-white/80 text-xs mb-1">Distance</p>
                <p className="text-white text-lg font-bold">{totalDistance.toFixed(1)} km</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                <Award className="w-5 h-5 text-white mx-auto mb-1" />
                <p className="text-white/80 text-xs mb-1">Avg Rating</p>
                <p className="text-white text-lg font-bold">{avgRating.toFixed(1)} ⭐</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by location or driver..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
              />
            </div>
          </>
        )}
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 sticky top-0 z-10 shadow-sm">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('completed')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
              activeTab === 'completed'
                ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <CheckCircle className="w-5 h-5" />
            <span>Completed</span>
            {!isGuest && (
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                activeTab === 'completed' ? 'bg-white/20' : 'bg-gray-300'
              }`}>
                {rides.filter(r => r.status === 'completed').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('cancelled')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
              activeTab === 'cancelled'
                ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <XCircle className="w-5 h-5" />
            <span>Cancelled</span>
            {!isGuest && (
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                activeTab === 'cancelled' ? 'bg-white/20' : 'bg-gray-300'
              }`}>
                {rides.filter(r => r.status === 'cancelled').length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Rides List */}
      <div className="flex-1 overflow-y-auto px-6 py-4 pb-32">
        {isGuest ? (
          // Guest User Empty State
          <div className="flex flex-col items-center justify-center py-16 px-6">
            <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center mb-6">
              <Clock className="w-12 h-12 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">No Booking History</h3>
            <p className="text-gray-600 text-center mb-6 max-w-sm">
              Sign in to view your ride history and access all your previous bookings
            </p>
            <div className="space-y-3 w-full max-w-sm">
              <button
                onClick={onNavigateLogin}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl active:scale-[0.98] transition-all"
              >
                Sign In
              </button>
              <button
                onClick={onNavigateRegister}
                className="w-full py-3 bg-white border-2 border-purple-600 text-purple-600 rounded-full font-semibold hover:bg-purple-50 transition-all"
              >
                Create Account
              </button>
            </div>
          </div>
        ) : filteredRides.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-6xl mb-4">🚗</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No rides found</h3>
            <p className="text-gray-600 text-center">
              {searchQuery 
                ? 'Try adjusting your search terms'
                : `You don't have any ${activeTab} rides yet`}
            </p>
          </div>
        ) : (
          Object.entries(groupedRides).map(([date, dateRides]) => (
            <div key={date} className="mb-6">
              {/* Date Header */}
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-purple-600" />
                <h3 className="text-sm font-bold text-gray-700 uppercase">{date}</h3>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {/* Ride Cards */}
              <div className="space-y-3">
                {dateRides.map((ride) => (
                  <div
                    key={ride.id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all overflow-hidden"
                  >
                    {/* Card Header */}
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center text-2xl">
                            {ride.driverPhoto}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{ride.driverName}</h4>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">{ride.time}</span>
                              {ride.status === 'completed' && ride.rating && (
                                <>
                                  <span className="text-xs text-gray-300">•</span>
                                  <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                    <span className="text-xs font-semibold text-gray-700">{ride.rating}</span>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-xl font-bold text-purple-600">BD {ride.price.toFixed(2)}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            ride.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {ride.status === 'completed' ? 'Completed' : 'Cancelled'}
                          </span>
                        </div>
                      </div>

                      {/* Route Information */}
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <div className="flex flex-col items-center">
                            <div className="w-2.5 h-2.5 bg-purple-600 rounded-full"></div>
                            <div className="w-0.5 h-6 bg-gray-300"></div>
                            <div className="w-2.5 h-2.5 bg-red-600 rounded-full"></div>
                          </div>
                          <div className="flex-1 space-y-2">
                            <div>
                              <p className="text-xs text-gray-500">Pickup</p>
                              <p className="text-sm font-medium text-gray-800">{ride.pickup}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Drop-off</p>
                              <p className="text-sm font-medium text-gray-800">{ride.dropoff}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Ride Details */}
                    <div className="px-4 py-3 bg-gray-50 grid grid-cols-3 gap-2 text-center border-b border-gray-100">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Service</p>
                        <p className="text-xs font-semibold text-gray-800">{ride.vehicleType}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Distance</p>
                        <p className="text-xs font-semibold text-gray-800">{ride.distance} km</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Duration</p>
                        <p className="text-xs font-semibold text-gray-800">{ride.duration} min</p>
                      </div>
                    </div>

                    {/* Cancel Reason (if cancelled) */}
                    {ride.status === 'cancelled' && ride.cancelReason && (
                      <div className="px-4 py-3 bg-red-50 border-b border-gray-100">
                        <p className="text-xs text-gray-600">
                          <span className="font-semibold">Reason:</span> {ride.cancelReason}
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="p-4 flex gap-2">
                      <button
                        onClick={() => onRebook?.(ride.pickup, ride.dropoff, ride.serviceType)}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl font-medium hover:shadow-md transition-all"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Rebook</span>
                      </button>

                      {ride.status === 'completed' && (
                        <>
                          <button className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                            <Download className="w-4 h-4 text-gray-700" />
                          </button>
                          <button className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                            <MessageCircle className="w-4 h-4 text-gray-700" />
                          </button>
                        </>
                      )}

                      <button className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                        <ChevronRight className="w-4 h-4 text-gray-700" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-md mx-auto flex justify-around items-center">
          <button 
            onClick={onNavigateHome}
            className="flex flex-col items-center text-gray-400 hover:text-purple-600 transition-colors"
          >
            <Home className="w-6 h-6 mb-1" />
            <span className="text-xs">Home</span>
          </button>

          <button 
            onClick={onNavigateSearch}
            className="flex flex-col items-center text-gray-400 hover:text-purple-600 transition-colors"
          >
            <Search className="w-6 h-6 mb-1" />
            <span className="text-xs">Search</span>
          </button>

          <button className="flex flex-col items-center text-purple-600 transition-colors">
            <History className="w-6 h-6 mb-1" />
            <span className="text-xs">History</span>
          </button>

          <button 
            onClick={onNavigateActivity}
            className="flex flex-col items-center text-gray-400 hover:text-purple-600 transition-colors"
          >
            <Bell className="w-6 h-6 mb-1" />
            <span className="text-xs">Activity</span>
          </button>

          <button 
            onClick={onNavigateProfile}
            className="flex flex-col items-center text-gray-400 hover:text-purple-600 transition-colors"
          >
            <UserIcon className="w-6 h-6 mb-1" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}