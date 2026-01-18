import { ArrowLeft, Check, MapPin, Clock, DollarSign, User, Phone, Star, Package, Calendar, CreditCard, Gift, Bell } from 'lucide-react';

interface ActivityDetailScreenProps {
  onBack: () => void;
  activity: any;
}

export function ActivityDetailScreen({ onBack, activity }: ActivityDetailScreenProps) {
  const Icon = activity.icon;

  const renderDetailContent = () => {
    switch (activity.type) {
      case 'ride_completed':
      case 'booking_confirmed':
      case 'ride_scheduled':
        return (
          <div className="space-y-4">
            {/* Trip Route */}
            <div className="bg-white rounded-2xl shadow-md p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Trip Details</h3>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                    <div className="w-0.5 h-12 bg-gray-300"></div>
                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Pickup Location</p>
                      <p className="text-sm font-semibold text-gray-800">{activity.pickup}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Dropoff Location</p>
                      <p className="text-sm font-semibold text-gray-800">{activity.dropoff}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Service Type</p>
                  <p className="text-sm font-semibold text-gray-800">{activity.serviceType}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Date & Time</p>
                  <p className="text-sm font-semibold text-gray-800">{activity.time}</p>
                </div>
              </div>
            </div>

            {/* Driver Info (for completed rides) */}
            {activity.type === 'ride_completed' && (
              <div className="bg-white rounded-2xl shadow-md p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Driver Information</h3>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    A
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">Ahmed Al-Khalifa</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm text-gray-600">4.9 (238 trips)</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 py-2 px-4 bg-purple-50 text-purple-600 rounded-xl font-semibold hover:bg-purple-100 transition-colors flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    Call
                  </button>
                  <button className="flex-1 py-2 px-4 bg-purple-50 text-purple-600 rounded-xl font-semibold hover:bg-purple-100 transition-colors">
                    Message
                  </button>
                </div>
              </div>
            )}

            {/* Fare Breakdown */}
            <div className="bg-white rounded-2xl shadow-md p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Fare Breakdown</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base Fare</span>
                  <span className="font-semibold text-gray-800">BD 2.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Distance (5.2 km)</span>
                  <span className="font-semibold text-gray-800">BD 3.12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time (18 min)</span>
                  <span className="font-semibold text-gray-800">BD 1.80</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span className="font-semibold">-BD 0.06</span>
                </div>
                <div className="pt-3 border-t border-gray-200 flex justify-between">
                  <span className="font-bold text-gray-800">Total</span>
                  <span className="font-bold text-purple-600 text-lg">BD 7.36</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'payment_success':
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-md p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Payment Details</h3>
              
              <div className="flex items-center justify-center py-6 mb-4">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-10 h-10 text-green-600" />
                </div>
              </div>

              <div className="text-center mb-6">
                <p className="text-3xl font-bold text-gray-800 mb-2">BD 7.36</p>
                <p className="text-sm text-gray-600">Payment Successful</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-semibold text-gray-800">Credit Card</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Card Number</span>
                  <span className="font-semibold text-gray-800">**** **** **** 4242</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID</span>
                  <span className="font-semibold text-gray-800">#TXN123456</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date & Time</span>
                  <span className="font-semibold text-gray-800">{activity.time}</span>
                </div>
              </div>
            </div>

            <button className="w-full py-3 bg-purple-50 text-purple-600 rounded-xl font-semibold hover:bg-purple-100 transition-colors">
              Download Receipt
            </button>
          </div>
        );

      case 'driver_assigned':
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-md p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Driver Details</h3>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  A
                </div>
                <div className="flex-1">
                  <p className="text-xl font-bold text-gray-800">Ahmed Al-Khalifa</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm text-gray-600">4.9 (238 trips)</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Vehicle</span>
                  <span className="font-semibold text-gray-800">Toyota Camry</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Plate Number</span>
                  <span className="font-semibold text-gray-800">BH-12345</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Color</span>
                  <span className="font-semibold text-gray-800">Silver</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  Call Driver
                </button>
                <button className="flex-1 py-3 px-4 bg-purple-50 text-purple-600 rounded-xl font-semibold hover:bg-purple-100 transition-colors">
                  Message
                </button>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-700">
                Your driver is on the way! Estimated arrival: <span className="font-bold">5 minutes</span>
              </p>
            </div>
          </div>
        );

      case 'delivery_pickup':
      case 'delivery_complete':
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-md p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Delivery Details</h3>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-orange-600"></div>
                    <div className="w-0.5 h-12 bg-gray-300"></div>
                    <div className="w-3 h-3 rounded-full bg-green-600"></div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Pickup Location</p>
                      <p className="text-sm font-semibold text-gray-800">{activity.pickup}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Delivery Location</p>
                      <p className="text-sm font-semibold text-gray-800">{activity.dropoff}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Service</p>
                  <p className="text-sm font-semibold text-gray-800">{activity.serviceType}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Status</p>
                  <p className="text-sm font-semibold text-green-600">
                    {activity.type === 'delivery_complete' ? 'Delivered' : 'In Transit'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Package Information</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Package Type</span>
                  <span className="font-semibold text-gray-800">Documents</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weight</span>
                  <span className="font-semibold text-gray-800">0.5 kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tracking ID</span>
                  <span className="font-semibold text-gray-800">#PKG789012</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-semibold text-purple-600">BD 3.50</span>
                </div>
              </div>
            </div>

            {activity.type === 'delivery_complete' && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-sm text-green-700 text-center">
                  ✓ Package delivered successfully!
                </p>
              </div>
            )}
          </div>
        );

      case 'promotion':
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-md p-5">
              <div className="flex items-center justify-center py-6 mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Gift className="w-10 h-10 text-white" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">Special Offer!</h3>
              <p className="text-gray-600 text-center mb-6">{activity.description}</p>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-4">
                <p className="text-sm font-semibold text-purple-700 text-center">
                  PROMO CODE: <span className="text-lg font-bold">RIDE20</span>
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-purple-600" />
                  </div>
                  <p className="text-sm text-gray-600">Valid for your next 3 rides</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-purple-600" />
                  </div>
                  <p className="text-sm text-gray-600">20% discount on each ride</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-purple-600" />
                  </div>
                  <p className="text-sm text-gray-600">Valid until end of this week</p>
                </div>
              </div>
            </div>

            <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
              Use Promo Code
            </button>
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-2xl shadow-md p-5">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Activity Details</h3>
            <p className="text-gray-600">{activity.description}</p>
          </div>
        );
    }
  };

  return (
    <div className="size-full bg-gray-50 flex flex-col">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 px-6 pt-6 pb-8 shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={onBack}
            className="flex items-center text-white hover:bg-white/10 rounded-full p-2 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <div className="flex-1">
            <h1 className="text-white text-2xl font-bold">{activity.title}</h1>
            <p className="text-white/90 text-sm">{activity.time}</p>
          </div>
        </div>

        {/* Status Icon */}
        <div className="flex justify-center">
          <div className={`w-20 h-20 ${activity.color.replace('text-', 'bg-').split(' ')[0]} rounded-full flex items-center justify-center shadow-lg`}>
            <Icon className="w-10 h-10 text-white" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {renderDetailContent()}
      </div>
    </div>
  );
}
