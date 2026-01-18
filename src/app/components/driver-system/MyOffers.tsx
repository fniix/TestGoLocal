import { Home, FileText, Inbox, Truck, DollarSign, Star, User, Edit, Pause, Trash2, Play } from 'lucide-react';
import { useState } from 'react';

interface CreateDeliveryOfferProps {
  onNavigateToDashboard: () => void;
  onNavigateToCreateOffer: () => void;
  onNavigateToIncomingRequests: () => void;
  onNavigateToActiveDeliveries: () => void;
  onNavigateToEarnings: () => void;
  onNavigateToReviews: () => void;
  onNavigateToProfile: () => void;
}

interface Offer {
  id: string;
  fromCity: string;
  fromArea: string;
  toCity: string;
  toArea: string;
  serviceType: string;
  priceType: string;
  basePrice: number;
  availableTime: string;
  status: 'active' | 'paused';
  requests: number;
}

export function MyOffers({
  onNavigateToDashboard,
  onNavigateToCreateOffer,
  onNavigateToIncomingRequests,
  onNavigateToActiveDeliveries,
  onNavigateToEarnings,
  onNavigateToReviews,
  onNavigateToProfile,
}: CreateDeliveryOfferProps) {
  const [offers, setOffers] = useState<Offer[]>([
    {
      id: '1',
      fromCity: 'Manama',
      fromArea: 'City Center',
      toCity: 'Riffa',
      toArea: 'East Riffa',
      serviceType: 'Private Driver',
      priceType: 'Fixed',
      basePrice: 8.5,
      availableTime: 'Today, 2:00 PM',
      status: 'active',
      requests: 3,
    },
    {
      id: '2',
      fromCity: 'Muharraq',
      fromArea: 'Airport Area',
      toCity: 'Seef',
      toArea: 'Seef Mall',
      serviceType: 'Mandoob',
      priceType: 'Per KM',
      basePrice: 1.2,
      availableTime: 'Today, 4:30 PM',
      status: 'active',
      requests: 1,
    },
    {
      id: '3',
      fromCity: 'Adliya',
      fromArea: 'Restaurant District',
      toCity: 'Sitra',
      toArea: 'Industrial Area',
      serviceType: 'OnTheWay',
      priceType: 'Negotiable',
      basePrice: 5.0,
      availableTime: 'Tomorrow, 9:00 AM',
      status: 'paused',
      requests: 0,
    },
    {
      id: '4',
      fromCity: 'Hamad Town',
      fromArea: 'Roundabout 5',
      toCity: 'Manama',
      toArea: 'Diplomatic Area',
      serviceType: 'Private Driver',
      priceType: 'Fixed',
      basePrice: 10.0,
      availableTime: 'Today, 6:00 PM',
      status: 'active',
      requests: 2,
    },
  ]);

  const handleTogglePause = (id: string) => {
    setOffers(offers.map(offer =>
      offer.id === id
        ? { ...offer, status: offer.status === 'active' ? 'paused' : 'active' }
        : offer
    ));
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this offer?')) {
      setOffers(offers.filter(offer => offer.id !== id));
    }
  };

  const handleEdit = (id: string) => {
    alert(`Edit offer ${id} - Feature coming soon!`);
  };

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
          <button 
            onClick={onNavigateToDashboard}
            className="w-full px-6 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors text-white/90 hover:text-white"
          >
            <Home className="w-5 h-5" />
            Dashboard
          </button>
          
          <button className="w-full px-6 py-3 flex items-center gap-3 bg-white/10 border-l-4 border-white text-white font-semibold">
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
              <h1 className="text-3xl font-bold text-gray-800">My Offers</h1>
              <p className="text-gray-500 mt-1">Manage your delivery offers</p>
            </div>
            <button
              onClick={onNavigateToCreateOffer}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold hover:shadow-lg transition-all"
            >
              + Create New Offer
            </button>
          </div>
        </header>

        {/* Offers Content */}
        <div className="p-8">
          {/* Stats Summary */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <p className="text-gray-500 text-sm mb-1">Total Offers</p>
              <p className="text-3xl font-bold text-gray-800">{offers.length}</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <p className="text-gray-500 text-sm mb-1">Active Offers</p>
              <p className="text-3xl font-bold text-green-600">
                {offers.filter(o => o.status === 'active').length}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <p className="text-gray-500 text-sm mb-1">Total Requests</p>
              <p className="text-3xl font-bold text-blue-600">
                {offers.reduce((sum, o) => sum + o.requests, 0)}
              </p>
            </div>
          </div>

          {/* Offers List */}
          <div className="space-y-4">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className={`bg-white rounded-2xl shadow-md border-2 transition-all ${
                  offer.status === 'active' ? 'border-green-200' : 'border-gray-200'
                }`}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        offer.status === 'active' ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        <FileText className={`w-6 h-6 ${
                          offer.status === 'active' ? 'text-green-600' : 'text-gray-500'
                        }`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-800">
                            {offer.fromCity} → {offer.toCity}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            offer.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {offer.status === 'active' ? '● Active' : '⏸ Paused'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          From {offer.fromArea} to {offer.toArea}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(offer.id)}
                        className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleTogglePause(offer.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          offer.status === 'active'
                            ? 'bg-orange-50 hover:bg-orange-100 text-orange-600'
                            : 'bg-green-50 hover:bg-green-100 text-green-600'
                        }`}
                        title={offer.status === 'active' ? 'Pause' : 'Resume'}
                      >
                        {offer.status === 'active' ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(offer.id)}
                        className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Service Type</p>
                      <p className="text-sm font-semibold text-gray-800">{offer.serviceType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Price</p>
                      <p className="text-sm font-semibold text-gray-800">
                        BD {offer.basePrice.toFixed(2)}
                        <span className="text-xs text-gray-500 ml-1">({offer.priceType})</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Available Time</p>
                      <p className="text-sm font-semibold text-gray-800">{offer.availableTime}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Requests</p>
                      <p className="text-sm font-semibold text-gray-800">
                        {offer.requests > 0 ? (
                          <span className="text-blue-600">{offer.requests} pending</span>
                        ) : (
                          <span className="text-gray-500">None</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {offers.length === 0 && (
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-12 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No offers yet</h3>
              <p className="text-gray-500 mb-6">Create your first delivery offer to start earning</p>
              <button
                onClick={onNavigateToCreateOffer}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold hover:shadow-lg transition-all"
              >
                Create New Offer
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
