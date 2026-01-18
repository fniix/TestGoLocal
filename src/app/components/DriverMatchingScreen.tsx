import { ArrowLeft, Phone, MessageCircle, X, Star, Navigation, Share2, Shield, Clock, Home, Search, Bell, User as UserIcon, Car } from 'lucide-react';
import { useState, useEffect } from 'react';

interface DriverMatchingScreenProps {
  onBack: () => void;
  pickupLocation: string;
  dropoffLocation: string;
  onDriverMatched?: () => void;
}

export function DriverMatchingScreen({ onBack, pickupLocation, dropoffLocation, onDriverMatched }: DriverMatchingScreenProps) {
  const [isSearching, setIsSearching] = useState(true);
  const [searchProgress, setSearchProgress] = useState(0);

  // Mock driver data
  const driverInfo = {
    name: 'Ahmed Al-Khalifa',
    photo: '👨‍💼',
    rating: 4.9,
    totalTrips: 1247,
    vehicleMake: 'Toyota Camry',
    vehicleColor: 'Silver',
    plateNumber: '45678',
    estimatedArrival: '3',
    phone: '+973 3456 7890'
  };

  useEffect(() => {
    // Simulate searching for driver
    const searchTimer = setInterval(() => {
      setSearchProgress(prev => {
        if (prev >= 100) {
          clearInterval(searchTimer);
          setTimeout(() => setIsSearching(false), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    return () => clearInterval(searchTimer);
  }, []);

  return (
    <div className="size-full bg-gray-50 flex flex-col">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 px-6 pt-6 pb-6 shadow-lg">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="flex items-center text-white hover:bg-white/10 rounded-full p-2 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <div className="flex-1">
            <h1 className="text-white text-2xl font-bold">
              {isSearching ? 'Finding Your Ride' : 'Driver Matched!'}
            </h1>
            <p className="text-white/90 text-sm">
              {isSearching ? 'Please wait a moment...' : 'Your driver is on the way'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
        {isSearching ? (
          /* Searching State */
          <div className="flex flex-col items-center justify-center min-h-[500px]">
            {/* Animated Loading Indicator */}
            <div className="relative mb-8">
              {/* Outer rotating ring */}
              <div className="w-32 h-32 rounded-full border-4 border-purple-200 animate-spin">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-purple-600 rounded-full"></div>
              </div>
              
              {/* Inner pulsing circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full flex items-center justify-center animate-pulse">
                <Car className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Progress Text */}
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Searching for a driver...</h2>
            <p className="text-gray-600 text-center mb-6">
              We're finding the best driver for you
            </p>

            {/* Progress Bar */}
            <div className="w-full max-w-xs mb-8">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-300 ease-out"
                  style={{ width: `${searchProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2 text-center">{searchProgress}%</p>
            </div>

            {/* Searching Steps */}
            <div className="w-full max-w-md space-y-3">
              <div className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                searchProgress >= 30 ? 'bg-green-50 border border-green-200' : 'bg-gray-100'
              }`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  searchProgress >= 30 ? 'bg-green-500' : 'bg-gray-300'
                }`}>
                  {searchProgress >= 30 && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className={`text-sm ${searchProgress >= 30 ? 'text-green-700 font-medium' : 'text-gray-600'}`}>
                  Analyzing nearby drivers
                </span>
              </div>

              <div className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                searchProgress >= 60 ? 'bg-green-50 border border-green-200' : 'bg-gray-100'
              }`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  searchProgress >= 60 ? 'bg-green-500' : 'bg-gray-300'
                }`}>
                  {searchProgress >= 60 && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className={`text-sm ${searchProgress >= 60 ? 'text-green-700 font-medium' : 'text-gray-600'}`}>
                  Matching optimal route
                </span>
              </div>

              <div className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                searchProgress >= 100 ? 'bg-green-50 border border-green-200' : 'bg-gray-100'
              }`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  searchProgress >= 100 ? 'bg-green-500' : 'bg-gray-300'
                }`}>
                  {searchProgress >= 100 && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className={`text-sm ${searchProgress >= 100 ? 'text-green-700 font-medium' : 'text-gray-600'}`}>
                  Confirming driver
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Driver Matched State */
          <div className="space-y-4">
            {/* Success Badge */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-green-800">Driver Found!</h3>
                <p className="text-sm text-green-600">Arriving in {driverInfo.estimatedArrival} minutes</p>
              </div>
            </div>

            {/* Driver Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-4 mb-6">
                {/* Driver Photo */}
                <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center text-4xl shadow-md">
                  {driverInfo.photo}
                </div>

                {/* Driver Details */}
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800">{driverInfo.name}</h2>
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold text-gray-700">{driverInfo.rating}</span>
                    <span className="text-sm text-gray-500">({driverInfo.totalTrips} trips)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-600 font-medium">Online</span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-col gap-2">
                  <button className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-md transition-colors">
                    <Phone className="w-5 h-5 text-white" />
                  </button>
                  <button className="w-12 h-12 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-md transition-colors">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Vehicle Info */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <Car className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-gray-800">Vehicle Details</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Make & Model</p>
                    <p className="font-medium text-gray-800">{driverInfo.vehicleMake}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Color</p>
                    <p className="font-medium text-gray-800">{driverInfo.vehicleColor}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500 mb-1">Plate Number</p>
                    <p className="text-2xl font-bold text-purple-600 tracking-wider">{driverInfo.plateNumber}</p>
                  </div>
                </div>
              </div>

              {/* Arrival Estimate */}
              <div className="flex items-center justify-between bg-purple-50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Estimated Arrival</p>
                    <p className="text-xl font-bold text-purple-600">{driverInfo.estimatedArrival} min</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors text-sm">
                  Track Live
                </button>
              </div>
            </div>

            {/* Trip Summary */}
            <div className="bg-white rounded-2xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4">Trip Summary</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                    <div className="w-0.5 h-8 bg-gray-300"></div>
                    <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Pickup</p>
                      <p className="font-medium text-gray-800">{pickupLocation || 'Current Location'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Drop-off</p>
                      <p className="font-medium text-gray-800">{dropoffLocation || 'Destination'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Safety Features */}
            <div className="bg-white rounded-2xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" />
                Safety & Sharing
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors">
                  <Share2 className="w-5 h-5 text-blue-600" />
                  <div className="text-left flex-1">
                    <p className="font-medium text-gray-800">Share Trip Details</p>
                    <p className="text-xs text-gray-600">Send trip info to family or friends</p>
                  </div>
                </button>

                <button className="w-full flex items-center gap-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors">
                  <Shield className="w-5 h-5 text-purple-600" />
                  <div className="text-left flex-1">
                    <p className="font-medium text-gray-800">Safety Center</p>
                    <p className="text-xs text-gray-600">Emergency contacts & support</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button 
                onClick={() => onDriverMatched?.()}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                View on Map
              </button>

              <button className="w-full flex items-center justify-center gap-2 bg-white border-2 border-red-500 text-red-600 py-4 rounded-full text-lg font-semibold hover:bg-red-50 transition-all">
                <X className="w-5 h-5" />
                Cancel Ride
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-md mx-auto flex justify-around items-center">
          <button className="flex flex-col items-center text-purple-600 transition-colors">
            <Home className="w-6 h-6 mb-1" />
            <span className="text-xs">Home</span>
          </button>

          <button className="flex flex-col items-center text-gray-400 hover:text-purple-600 transition-colors">
            <Search className="w-6 h-6 mb-1" />
            <span className="text-xs">Search</span>
          </button>

          <button className="flex flex-col items-center text-gray-400 hover:text-purple-600 transition-colors">
            <Bell className="w-6 h-6 mb-1" />
            <span className="text-xs">Activity</span>
          </button>

          <button className="flex flex-col items-center text-gray-400 hover:text-purple-600 transition-colors">
            <UserIcon className="w-6 h-6 mb-1" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}