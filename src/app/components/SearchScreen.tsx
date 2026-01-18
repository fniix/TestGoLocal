import { ArrowLeft, Search, MapPin, Clock, TrendingUp, Home, User, History, Bell, Star, Bookmark } from 'lucide-react';
import { useState } from 'react';

interface SearchScreenProps {
  onBack: () => void;
  onNavigateHome?: () => void;
  onNavigateHistory?: () => void;
  onNavigateProfile?: () => void;
  onNavigateActivity?: () => void;
  onLocationSelect?: (location: string, area?: string) => void;
  userName?: string;
  onNavigateLogin?: () => void;
  onNavigateRegister?: () => void;
}

export function SearchScreen({ onBack, onNavigateHome, onNavigateHistory, onNavigateProfile, onNavigateActivity, onLocationSelect, userName, onNavigateLogin, onNavigateRegister }: SearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [savedLocations, setSavedLocations] = useState<number[]>([]);

  // Check if user is a guest (not logged in)
  const isGuest = !userName || userName === '' || userName === 'Guest User';

  // Handle location selection
  const handleLocationSelect = (location: string, area?: string) => {
    if (onLocationSelect) {
      onLocationSelect(location, area);
    }
    // Navigate back after selection
    onBack();
  };

  // Handle save location
  const handleSaveLocation = (e: React.MouseEvent, locationId: number) => {
    e.stopPropagation(); // Prevent triggering location selection
    
    if (isGuest) {
      setShowAuthModal(true);
      return;
    }

    // Toggle saved state
    if (savedLocations.includes(locationId)) {
      setSavedLocations(savedLocations.filter(id => id !== locationId));
    } else {
      setSavedLocations([...savedLocations, locationId]);
    }
  };

  const recentSearches = [
    { id: 1, location: 'Bahrain City Centre', type: 'Shopping Mall' },
    { id: 2, location: 'Seef Mall', type: 'Shopping Mall' },
    { id: 3, location: 'Bahrain International Airport', type: 'Airport' },
    { id: 4, location: 'Amwaj Islands', type: 'Residential' },
  ];

  const popularDestinations = [
    { id: 1, name: 'Bahrain City Centre', area: 'Manama', distance: '3.2 km' },
    { id: 2, name: 'Seef Mall', area: 'Seef', distance: '4.5 km' },
    { id: 3, name: 'Bahrain Fort', area: 'Karbabad', distance: '6.1 km' },
    { id: 4, name: 'The Avenues', area: 'Riffa', distance: '8.3 km' },
    { id: 5, name: 'Al Fateh Grand Mosque', area: 'Juffair', distance: '2.8 km' },
    { id: 6, name: 'Tree of Life', area: 'Southern Governorate', distance: '15.2 km' },
  ];

  return (
    <div className="size-full bg-gray-50 flex flex-col">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 px-6 pt-6 pb-6 shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={onBack}
            className="flex items-center text-white hover:bg-white/10 rounded-full p-2 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white text-2xl font-bold">Search Locations</h1>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Where do you want to go?"
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-none focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-md"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-24 px-6 pt-6">
        {/* Recent Searches */}
        {searchQuery === '' && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-gray-600" />
              <h2 className="font-bold text-gray-800">Recent Searches</h2>
            </div>
            
            <div className="space-y-3">
              {recentSearches.map((search) => (
                <button
                  key={search.id}
                  onClick={() => handleLocationSelect(search.location, search.type)}
                  className="w-full bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex items-center gap-3 text-left"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{search.location}</h3>
                    <p className="text-xs text-gray-500">{search.type}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Popular Destinations */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-gray-600" />
            <h2 className="font-bold text-gray-800">Popular Destinations</h2>
          </div>
          
          <div className="space-y-3">
            {popularDestinations
              .filter(dest => 
                searchQuery === '' || 
                dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                dest.area.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((destination) => (
                <div
                  key={destination.id}
                  onClick={() => handleLocationSelect(destination.name, destination.area)}
                  className="w-full bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex items-center gap-3 cursor-pointer relative"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{destination.name}</h3>
                    <p className="text-xs text-gray-500">{destination.area} • {destination.distance}</p>
                  </div>
                  <button
                    onClick={(e) => handleSaveLocation(e, destination.id)}
                    className={`p-2 rounded-full transition-all ${
                      savedLocations.includes(destination.id)
                        ? 'bg-purple-100 text-purple-600'
                        : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                    }`}
                  >
                    <Bookmark 
                      className={`w-4 h-4 ${
                        savedLocations.includes(destination.id) ? 'fill-purple-600' : ''
                      }`} 
                    />
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/* No Results */}
        {searchQuery !== '' && 
         popularDestinations.filter(dest => 
           dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           dest.area.toLowerCase().includes(searchQuery.toLowerCase())
         ).length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No locations found</h3>
            <p className="text-sm text-gray-500 text-center">
              Try searching for a different location
            </p>
          </div>
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

          <button className="flex flex-col items-center text-purple-600 transition-colors">
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
            <User className="w-6 h-6 mb-1" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>

      {/* Sign In Required Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bookmark className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Sign In Required</h3>
              <p className="text-gray-600">
                Please sign in to save locations to your favorites
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setShowAuthModal(false);
                  if (onNavigateLogin) onNavigateLogin();
                }}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl active:scale-[0.98] transition-all"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setShowAuthModal(false);
                  if (onNavigateRegister) onNavigateRegister();
                }}
                className="w-full py-3 bg-white border-2 border-purple-600 text-purple-600 rounded-full font-semibold hover:bg-purple-50 transition-all"
              >
                Create Account
              </button>
              <button
                onClick={() => setShowAuthModal(false)}
                className="w-full py-3 text-gray-600 font-medium hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}