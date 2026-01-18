import { ArrowLeft, Bell, Check, Clock, MapPin, Package, Car, Home, Search, User, History, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { ActivityDetailScreen } from './ActivityDetailScreen';

interface ActivityScreenProps {
  onBack: () => void;
  userName?: string;
  onNavigateHome?: () => void;
  onNavigateSearch?: () => void;
  onNavigateHistory?: () => void;
  onNavigateProfile?: () => void;
  onNavigateLogin?: () => void;
  onNavigateRegister?: () => void;
  onRebook?: (pickup: string, dropoff: string, serviceType: string) => void;
}

export function ActivityScreen({ onBack, userName, onNavigateHome, onNavigateSearch, onNavigateHistory, onNavigateProfile, onNavigateLogin, onNavigateRegister, onRebook }: ActivityScreenProps) {
  // Check if user is a guest (not logged in)
  const isGuest = !userName || userName === '' || userName === 'Guest User';
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);

  const activities = [
    {
      id: 1,
      type: 'ride_completed',
      title: 'Ride Completed',
      description: 'Your ride to Seef Mall has been completed',
      time: '5 minutes ago',
      icon: Check,
      color: 'bg-green-100 text-green-600',
      unread: true,
      rebookable: true,
      pickup: 'Seef District, Manama',
      dropoff: 'Seef Mall',
      serviceType: 'Private Driver'
    },
    {
      id: 2,
      type: 'payment_success',
      title: 'Payment Successful',
      description: 'Payment of BD 7.36 processed successfully',
      time: '10 minutes ago',
      icon: Check,
      color: 'bg-blue-100 text-blue-600',
      unread: true,
      rebookable: false
    },
    {
      id: 3,
      type: 'driver_assigned',
      title: 'Driver Assigned',
      description: 'Ahmed Al-Khalifa is on the way to pick you up',
      time: '2 hours ago',
      icon: Car,
      color: 'bg-purple-100 text-purple-600',
      unread: false,
      rebookable: false
    },
    {
      id: 4,
      type: 'booking_confirmed',
      title: 'Booking Confirmed',
      description: 'Your ride to Bahrain City Centre has been confirmed',
      time: '1 day ago',
      icon: Check,
      color: 'bg-green-100 text-green-600',
      unread: false,
      rebookable: true,
      pickup: 'Diplomatic Area, Manama',
      dropoff: 'Bahrain City Centre',
      serviceType: 'Private Driver'
    },
    {
      id: 5,
      type: 'delivery_pickup',
      title: 'Package Picked Up',
      description: 'Your package from Manama has been picked up',
      time: '2 days ago',
      icon: Package,
      color: 'bg-orange-100 text-orange-600',
      unread: false,
      rebookable: true,
      pickup: 'Manama Souq',
      dropoff: 'Riffa',
      serviceType: 'Mandoob'
    },
    {
      id: 6,
      type: 'delivery_complete',
      title: 'Delivery Completed',
      description: 'Package delivered to Riffa successfully',
      time: '3 days ago',
      icon: Check,
      color: 'bg-green-100 text-green-600',
      unread: false,
      rebookable: true,
      pickup: 'Adliya, Manama',
      dropoff: 'Riffa',
      serviceType: 'Mandoob'
    },
    {
      id: 7,
      type: 'promotion',
      title: 'Special Offer!',
      description: 'Get 20% off on your next 3 rides this week',
      time: '3 days ago',
      icon: Bell,
      color: 'bg-pink-100 text-pink-600',
      unread: false,
      rebookable: false
    },
    {
      id: 8,
      type: 'ride_scheduled',
      title: 'Ride Scheduled',
      description: 'Your ride tomorrow at 9:00 AM is confirmed',
      time: '4 days ago',
      icon: Clock,
      color: 'bg-blue-100 text-blue-600',
      unread: false,
      rebookable: true,
      pickup: 'Budaiya',
      dropoff: 'Amwaj Islands',
      serviceType: 'Private Driver'
    }
  ];

  const unreadCount = activities.filter(a => a.unread).length;

  // Handle rebook action
  const handleRebook = (pickup: string, dropoff: string, serviceType: string) => {
    if (isGuest) {
      setShowAuthModal(true);
      return;
    }
    
    if (onRebook) {
      onRebook(pickup, dropoff, serviceType);
    }
  };

  // Handle activity click
  const handleActivityClick = (activity: any) => {
    if (!isGuest) {
      setSelectedActivity(activity);
    }
  };

  // If activity is selected, show detail screen
  if (selectedActivity) {
    return (
      <ActivityDetailScreen 
        activity={selectedActivity}
        onBack={() => setSelectedActivity(null)}
      />
    );
  }

  return (
    <div className="size-full bg-gray-50 flex flex-col">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 px-6 pt-6 pb-6 shadow-lg">
        <div className="flex items-center gap-4 mb-2">
          <button 
            onClick={onBack}
            className="flex items-center text-white hover:bg-white/10 rounded-full p-2 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white text-2xl font-bold">Activity</h1>
        </div>
        
        {!isGuest && unreadCount > 0 && (
          <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2">
            <Bell className="w-5 h-5 text-white" />
            <p className="text-white text-sm">
              You have <span className="font-bold">{unreadCount}</span> unread notification{unreadCount > 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>

      {/* Activity Feed */}
      <div className="flex-1 overflow-y-auto pb-24 px-6 pt-6">
        {isGuest ? (
          // Guest User Empty State
          <div className="flex flex-col items-center justify-center py-16 px-6">
            <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center mb-6">
              <Bell className="w-12 h-12 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">No Activity Available</h3>
            <p className="text-gray-600 text-center mb-6 max-w-sm">
              Sign in to view your notifications and stay updated with all your bookings and activities
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
        ) : (
          <>
            <div className="space-y-3">
              {activities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={activity.id}
                    className={`bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer ${
                      activity.unread ? 'border-l-4 border-purple-600' : ''
                    }`}
                    onClick={() => handleActivityClick(activity)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${activity.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className={`font-semibold text-gray-800 ${activity.unread ? 'font-bold' : ''}`}>
                            {activity.title}
                          </h3>
                          {activity.unread && (
                            <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0 mt-1"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                        <div className="flex items-center gap-1 mt-2">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <p className="text-xs text-gray-400">{activity.time}</p>
                        </div>
                        {activity.rebookable && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRebook(activity.pickup, activity.dropoff, activity.serviceType);
                            }}
                            className="mt-3 px-4 py-1.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-sm rounded-full font-semibold hover:shadow-md active:scale-[0.98] transition-all flex items-center gap-1.5"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            Rebook
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Empty State (if no activities) */}
            {activities.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Bell className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No activity yet</h3>
                <p className="text-sm text-gray-500 text-center px-8">
                  Your notifications and activity will appear here
                </p>
              </div>
            )}
          </>
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

          <button 
            onClick={onNavigateHistory}
            className="flex flex-col items-center text-gray-400 hover:text-purple-600 transition-colors"
          >
            <History className="w-6 h-6 mb-1" />
            <span className="text-xs">History</span>
          </button>

          <button className="flex flex-col items-center text-purple-600 transition-colors relative">
            <Bell className="w-6 h-6 mb-1" />
            <span className="text-xs">Activity</span>
            {!isGuest && unreadCount > 0 && (
              <div className="absolute -top-1 right-3 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">{unreadCount}</span>
              </div>
            )}
          </button>

          <button 
            onClick={onNavigateProfile}
            className="flex flex-col items-center text-gray-400 hover:text-purple-600 transition-colors"
          >
            <User className="w-6 h-6 mb-1" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>

      {/* Sign In Required Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-6 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <RotateCcw className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Sign In Required</h3>
              <p className="text-gray-600">You need to sign in to rebook a ride.</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowAuthModal(false)}
                className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onNavigateLogin}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white rounded-xl font-semibold transition-colors"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}