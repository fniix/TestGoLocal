import { ArrowLeft, Phone, MessageCircle, Shield, Share2, Star, MapPin, Navigation, Clock, DollarSign, Home, Search, Bell, User as UserIcon, ChevronUp, ChevronDown, AlertCircle, Zap, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

interface LiveTrackingScreenProps {
  onBack: () => void;
  driverName: string;
  pickupLocation: string;
  dropoffLocation: string;
  onTripComplete?: () => void;
}

export function LiveTrackingScreen({ onBack, driverName, pickupLocation, dropoffLocation, onTripComplete }: LiveTrackingScreenProps) {
  const [rideStatus, setRideStatus] = useState<'arriving' | 'picked-up' | 'en-route'>('arriving');
  const [estimatedTime, setEstimatedTime] = useState(3);
  const [isBottomSheetExpanded, setIsBottomSheetExpanded] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(45);
  const [distanceRemaining, setDistanceRemaining] = useState(5.2);
  const [showEmergencyMenu, setShowEmergencyMenu] = useState(false);

  // Mock driver data
  const driverInfo = {
    name: 'Ahmed Al-Khalifa',
    photo: '👨‍💼',
    rating: 4.9,
    vehicleMake: 'Toyota Camry',
    vehicleColor: 'Silver',
    plateNumber: '45678',
    phone: '+973 3456 7890'
  };

  // Simulate ride progress
  useEffect(() => {
    const progressTimer = setInterval(() => {
      if (rideStatus === 'arriving' && estimatedTime > 0) {
        setEstimatedTime(prev => Math.max(0, prev - 1));
        if (estimatedTime === 1) {
          setTimeout(() => setRideStatus('picked-up'), 1000);
        }
      } else if (rideStatus === 'picked-up') {
        setTimeout(() => setRideStatus('en-route'), 2000);
      }
    }, 5000);

    return () => clearInterval(progressTimer);
  }, [rideStatus, estimatedTime]);

  const getRideStatusInfo = () => {
    switch (rideStatus) {
      case 'arriving':
        return {
          title: 'Driver is arriving',
          subtitle: `${estimatedTime} min away`,
          color: 'bg-blue-500',
          icon: <Navigation className="w-5 h-5" />
        };
      case 'picked-up':
        return {
          title: 'Driver has arrived',
          subtitle: 'Please board the vehicle',
          color: 'bg-green-500',
          icon: <MapPin className="w-5 h-5" />
        };
      case 'en-route':
        return {
          title: 'On the way',
          subtitle: `${distanceRemaining} km remaining`,
          color: 'bg-purple-500',
          icon: <TrendingUp className="w-5 h-5" />
        };
    }
  };

  const statusInfo = getRideStatusInfo();

  return (
    <div className="size-full bg-gray-900 flex flex-col relative overflow-hidden">
      {/* Map Section */}
      <div className="flex-1 relative bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900">
        {/* Mock Map Background */}
        <div className="absolute inset-0">
          {/* Grid pattern to simulate map */}
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
          
          {/* Route Line */}
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            {/* Main route path */}
            <path
              d="M 100 450 Q 200 350, 300 300 T 500 200 T 700 150"
              stroke="url(#routeGradient)"
              strokeWidth="6"
              fill="none"
              strokeDasharray="10 5"
              className="animate-pulse"
            />
          </svg>

          {/* Pickup Location Marker */}
          <div className="absolute bottom-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white animate-pulse">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-purple-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                Pickup
              </div>
            </div>
          </div>

          {/* Dropoff Location Marker */}
          <div className="absolute top-1/4 right-1/4 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-red-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                Destination
              </div>
            </div>
          </div>

          {/* Vehicle Marker (Driver) */}
          <div className="absolute bottom-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2">
            <div className="relative animate-bounce">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
                <span className="text-2xl">🚗</span>
              </div>
              {/* Direction indicator */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <Navigation className="w-3 h-3 text-white" style={{ transform: 'rotate(45deg)' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Top Controls */}
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent">
          <div className="flex items-center justify-between">
            <button 
              onClick={onBack}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-800" />
            </button>

            <div className="flex gap-2">
              {/* Share Trip */}
              <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors">
                <Share2 className="w-5 h-5 text-gray-800" />
              </button>

              {/* Center Map */}
              <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors">
                <Navigation className="w-5 h-5 text-purple-600" />
              </button>
            </div>
          </div>

          {/* Live Status Banner */}
          <div className="mt-4 bg-white rounded-2xl shadow-lg p-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 ${statusInfo.color} rounded-full flex items-center justify-center text-white`}>
                {statusInfo.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800">{statusInfo.title}</h3>
                <p className="text-sm text-gray-600">{statusInfo.subtitle}</p>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500">Live</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Emergency Button */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <button 
            onClick={() => setShowEmergencyMenu(!showEmergencyMenu)}
            className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-2xl hover:bg-red-700 transition-all animate-pulse"
          >
            <Shield className="w-7 h-7 text-white" />
          </button>

          {/* Emergency Menu */}
          {showEmergencyMenu && (
            <div className="absolute right-full mr-3 top-0 bg-white rounded-2xl shadow-2xl p-3 w-48 space-y-2">
              <button className="w-full flex items-center gap-3 p-3 hover:bg-red-50 rounded-xl transition-colors">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-sm font-medium text-gray-800">Call 999</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 hover:bg-orange-50 rounded-xl transition-colors">
                <Shield className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-medium text-gray-800">Safety Alert</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 hover:bg-blue-50 rounded-xl transition-colors">
                <Share2 className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-800">Share Location</span>
              </button>
            </div>
          )}
        </div>

        {/* Speed & Distance Indicators */}
        <div className="absolute left-4 bottom-32 space-y-2">
          <div className="bg-white rounded-xl shadow-lg p-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-600" />
              <div>
                <p className="text-xs text-gray-500">Speed</p>
                <p className="text-lg font-bold text-gray-800">{currentSpeed} <span className="text-xs">km/h</span></p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-purple-600" />
              <div>
                <p className="text-xs text-gray-500">Distance</p>
                <p className="text-lg font-bold text-gray-800">{distanceRemaining} <span className="text-xs">km</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sheet */}
      <div 
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl transition-all duration-300 ${
          isBottomSheetExpanded ? 'h-[70%]' : 'h-auto'
        }`}
        style={{ paddingBottom: '80px' }}
      >
        {/* Handle */}
        <button 
          onClick={() => setIsBottomSheetExpanded(!isBottomSheetExpanded)}
          className="w-full flex justify-center pt-3 pb-2"
        >
          <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </button>

        {/* Driver Info Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            {/* Driver Photo */}
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center text-3xl shadow-md">
              {driverInfo.photo}
            </div>

            {/* Driver Details */}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800">{driverInfo.name}</h3>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-semibold text-gray-700">{driverInfo.rating}</span>
                <span className="text-sm text-gray-500">• {driverInfo.vehicleMake}</span>
              </div>
              <p className="text-sm text-gray-600 font-medium">{driverInfo.plateNumber}</p>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <button className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-md transition-colors">
                <Phone className="w-5 h-5 text-white" />
              </button>
              <button className="w-12 h-12 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-md transition-colors">
                <MessageCircle className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Content */}
        <div className={`overflow-y-auto ${isBottomSheetExpanded ? 'h-full' : 'max-h-0 overflow-hidden'}`}>
          <div className="px-6 py-4 space-y-4">
            {/* Trip Progress */}
            <div className="bg-gray-50 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-gray-800">Trip Progress</h4>
                <span className="text-sm text-purple-600 font-medium">
                  {rideStatus === 'arriving' ? '25%' : rideStatus === 'picked-up' ? '50%' : '75%'}
                </span>
              </div>
              
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
                <div 
                  className="h-full bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-500"
                  style={{ 
                    width: rideStatus === 'arriving' ? '25%' : rideStatus === 'picked-up' ? '50%' : '75%' 
                  }}
                ></div>
              </div>

              {/* Route Details */}
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
                      <p className="font-medium text-gray-800 text-sm">{pickupLocation}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Drop-off</p>
                      <p className="font-medium text-gray-800 text-sm">{dropoffLocation}</p>
                    </div>
                  </div>
                </div>

                {/* Complete Trip Button */}
                {rideStatus === 'en-route' && (
                  <button
                    onClick={() => onTripComplete?.()}
                    className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Arrive at Destination
                  </button>
                )}
              </div>
            </div>

            {/* Ride Details */}
            <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
              <h4 className="font-bold text-gray-800 mb-3">Ride Details</h4>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Estimated Time</span>
                </div>
                <span className="font-semibold text-gray-800">{estimatedTime} min</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Distance</span>
                </div>
                <span className="font-semibold text-gray-800">{distanceRemaining} km</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-600">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm">Fare Estimate</span>
                </div>
                <span className="font-semibold text-purple-600">BD 4.50</span>
              </div>
            </div>

            {/* Safety Options */}
            <div className="bg-gray-50 rounded-2xl p-4">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" />
                Safety Options
              </h4>
              
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 p-3 bg-white hover:bg-gray-100 rounded-xl transition-colors">
                  <Share2 className="w-5 h-5 text-blue-600" />
                  <div className="text-left flex-1">
                    <p className="font-medium text-gray-800 text-sm">Share Trip Status</p>
                    <p className="text-xs text-gray-600">Real-time location sharing</p>
                  </div>
                </button>

                <button className="w-full flex items-center gap-3 p-3 bg-white hover:bg-gray-100 rounded-xl transition-colors">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <div className="text-left flex-1">
                    <p className="font-medium text-gray-800 text-sm">Report Issue</p>
                    <p className="text-xs text-gray-600">Get immediate support</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Collapse/Expand Indicator */}
        {!isBottomSheetExpanded && (
          <div className="px-6 pb-4">
            <button 
              onClick={() => setIsBottomSheetExpanded(true)}
              className="w-full flex items-center justify-center gap-2 py-3 text-purple-600 font-medium hover:bg-purple-50 rounded-xl transition-colors"
            >
              <span>View Details</span>
              <ChevronUp className="w-5 h-5" />
            </button>
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