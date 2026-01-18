import { ArrowLeft, MapPin, Home, Briefcase, Heart, Plus, Edit2, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface SavedLocation {
  id: string;
  name: string;
  address: string;
  icon: 'home' | 'work' | 'favorite' | 'other';
}

interface SavedLocationsScreenProps {
  onBack: () => void;
  onSelectLocation?: (location: string) => void;
}

export function SavedLocationsScreen({ onBack, onSelectLocation }: SavedLocationsScreenProps) {
  const [locations, setLocations] = useState<SavedLocation[]>([
    { id: '1', name: 'Home', address: 'Building 123, Road 45, Manama 123', icon: 'home' },
    { id: '2', name: 'Work', address: 'Bahrain Financial Harbour, Manama', icon: 'work' },
    { id: '3', name: 'Gym', address: 'Seef District, Manama 456', icon: 'favorite' },
    { id: '4', name: 'Parents House', address: 'Riffa, Block 234', icon: 'other' },
    { id: '5', name: 'Favorite Cafe', address: 'Adliya, Manama', icon: 'favorite' }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingLocation, setEditingLocation] = useState<SavedLocation | null>(null);
  const [newName, setNewName] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newIcon, setNewIcon] = useState<'home' | 'work' | 'favorite' | 'other'>('other');

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'home':
        return <Home className="w-6 h-6" />;
      case 'work':
        return <Briefcase className="w-6 h-6" />;
      case 'favorite':
        return <Heart className="w-6 h-6" />;
      default:
        return <MapPin className="w-6 h-6" />;
    }
  };

  const getIconColor = (iconType: string) => {
    switch (iconType) {
      case 'home':
        return 'bg-blue-500';
      case 'work':
        return 'bg-purple-500';
      case 'favorite':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleAddLocation = () => {
    if (newName && newAddress) {
      const newLocation: SavedLocation = {
        id: Date.now().toString(),
        name: newName,
        address: newAddress,
        icon: newIcon
      };
      setLocations([...locations, newLocation]);
      setShowAddModal(false);
      setNewName('');
      setNewAddress('');
      setNewIcon('other');
    }
  };

  const handleEditLocation = () => {
    if (editingLocation && newName && newAddress) {
      setLocations(locations.map(loc => 
        loc.id === editingLocation.id 
          ? { ...loc, name: newName, address: newAddress, icon: newIcon }
          : loc
      ));
      setEditingLocation(null);
      setNewName('');
      setNewAddress('');
      setNewIcon('other');
    }
  };

  const handleDeleteLocation = (id: string) => {
    setLocations(locations.filter(loc => loc.id !== id));
  };

  const openEditModal = (location: SavedLocation) => {
    setEditingLocation(location);
    setNewName(location.name);
    setNewAddress(location.address);
    setNewIcon(location.icon);
  };

  return (
    <div className="size-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 px-6 pt-6 pb-8 shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={onBack}
            className="flex items-center text-white hover:bg-white/10 rounded-full p-2 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">Saved Locations</h1>
            <p className="text-white/80 text-sm mt-1">{locations.length} places saved</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-white text-purple-600 p-3 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Locations List */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {locations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <MapPin className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Saved Locations</h3>
            <p className="text-gray-500 mb-6">Add your favorite places for quick access</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all active:scale-95"
            >
              Add Location
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {locations.map((location) => (
              <div
                key={location.id}
                className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className={`${getIconColor(location.icon)} text-white p-3 rounded-xl flex-shrink-0`}>
                    {getIcon(location.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-800 text-lg">{location.name}</h3>
                    <p className="text-gray-500 text-sm mt-1">{location.address}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(location)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteLocation(location.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                {onSelectLocation && (
                  <button
                    onClick={() => {
                      onSelectLocation(location.address);
                      onBack();
                    }}
                    className="w-full mt-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2 rounded-xl text-sm font-semibold hover:shadow-md transition-all active:scale-95"
                  >
                    Use This Location
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Location Modal */}
      {(showAddModal || editingLocation) && (
        <div className="absolute inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {editingLocation ? 'Edit Location' : 'Add New Location'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location Name</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                  placeholder="e.g., Home, Work, Gym"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                <textarea
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none resize-none"
                  rows={3}
                  placeholder="Enter full address"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Icon</label>
                <div className="grid grid-cols-4 gap-3">
                  {(['home', 'work', 'favorite', 'other'] as const).map((iconType) => (
                    <button
                      key={iconType}
                      onClick={() => setNewIcon(iconType)}
                      className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                        newIcon === iconType
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`${getIconColor(iconType)} text-white p-2 rounded-lg`}>
                        {getIcon(iconType)}
                      </div>
                      <span className="text-xs font-semibold capitalize">{iconType}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingLocation(null);
                  setNewName('');
                  setNewAddress('');
                  setNewIcon('other');
                }}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-full font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={editingLocation ? handleEditLocation : handleAddLocation}
                disabled={!newName || !newAddress}
                className={`flex-1 py-3 rounded-full font-semibold transition-all ${
                  newName && newAddress
                    ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:shadow-lg active:scale-95'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {editingLocation ? 'Save Changes' : 'Add Location'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
