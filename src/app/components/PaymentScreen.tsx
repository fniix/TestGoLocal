import { ArrowLeft, CreditCard, Wallet, DollarSign, Tag, Gift, Star, MapPin, Clock, Users, Shield, CheckCircle, Info, Home, Search, Bell, User as UserIcon, Download, Share2 } from 'lucide-react';
import { useState } from 'react';

interface PaymentScreenProps {
  onBack: () => void;
  pickupLocation: string;
  dropoffLocation: string;
  driverName: string;
  distance: number;
  duration: number;
  onPaymentComplete?: () => void;
}

export function PaymentScreen({ onBack, pickupLocation, dropoffLocation, driverName, distance, duration, onPaymentComplete }: PaymentScreenProps) {
  const [selectedPayment, setSelectedPayment] = useState<'card' | 'wallet' | 'cash'>('card');
  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [tipAmount, setTipAmount] = useState(0);
  const [showPromoInput, setShowPromoInput] = useState(false);

  // Fare calculation
  const baseFare = 2.50;
  const distanceFare = distance * 0.80; // BD 0.80 per km
  const timeFare = duration * 0.15; // BD 0.15 per minute
  const subtotal = baseFare + distanceFare + timeFare;
  const discount = isPromoApplied ? 1.50 : 0;
  const total = subtotal - discount + tipAmount;

  const paymentMethods = [
    {
      id: 'card' as const,
      name: 'Credit/Debit Card',
      icon: <CreditCard className="w-6 h-6" />,
      description: '**** **** **** 4532',
      badge: 'Most Used',
      color: 'purple'
    },
    {
      id: 'wallet' as const,
      name: 'Mobile Wallet',
      icon: <Wallet className="w-6 h-6" />,
      description: 'Balance: BD 25.50',
      badge: 'Instant',
      color: 'blue'
    },
    {
      id: 'cash' as const,
      name: 'Cash',
      icon: <DollarSign className="w-6 h-6" />,
      description: 'Pay to driver',
      badge: null,
      color: 'green'
    }
  ];

  const tipOptions = [0, 0.50, 1.00, 2.00];

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'GOLOCAL10' || promoCode.toUpperCase() === 'FIRST20') {
      setIsPromoApplied(true);
      setShowPromoInput(false);
    }
  };

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
            <h1 className="text-white text-2xl font-bold">Payment</h1>
            <p className="text-white/90 text-sm">Complete your transaction</p>
          </div>

          <div className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-full">
            <Shield className="w-4 h-4 text-white" />
            <span className="text-white text-xs font-medium">Secure</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-44">
        {/* Trip Completed Badge */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-green-800">Trip Completed!</h3>
            <p className="text-sm text-green-600">Thank you for riding with {driverName}</p>
          </div>
        </div>

        {/* Trip Summary Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Trip Summary</h2>
            <button className="text-purple-600 text-sm font-medium hover:underline">
              View Details
            </button>
          </div>

          {/* Route Information */}
          <div className="space-y-3 mb-4">
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                <div className="w-0.5 h-12 bg-gray-300"></div>
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
          </div>

          {/* Trip Stats */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200">
            <div className="text-center">
              <div className="flex justify-center mb-1">
                <MapPin className="w-4 h-4 text-purple-600" />
              </div>
              <p className="text-xs text-gray-500">Distance</p>
              <p className="font-bold text-gray-800">{distance.toFixed(1)} km</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-1">
                <Clock className="w-4 h-4 text-purple-600" />
              </div>
              <p className="text-xs text-gray-500">Duration</p>
              <p className="font-bold text-gray-800">{duration} min</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              </div>
              <p className="text-xs text-gray-500">Rating</p>
              <p className="font-bold text-gray-800">4.9</p>
            </div>
          </div>
        </div>

        {/* Fare Breakdown */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Fare Breakdown</h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-gray-700">Base Fare</span>
              </div>
              <span className="font-semibold text-gray-800">BD {baseFare.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <span className="text-gray-700">Distance</span>
                  <p className="text-xs text-gray-500">{distance.toFixed(1)} km × BD 0.80</p>
                </div>
              </div>
              <span className="font-semibold text-gray-800">BD {distanceFare.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <span className="text-gray-700">Time</span>
                  <p className="text-xs text-gray-500">{duration} min × BD 0.15</p>
                </div>
              </div>
              <span className="font-semibold text-gray-800">BD {timeFare.toFixed(2)}</span>
            </div>

            {isPromoApplied && (
              <div className="flex justify-between items-center bg-green-50 rounded-xl p-3 -mx-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <Tag className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="text-green-700 font-medium">Promo Discount</span>
                    <p className="text-xs text-green-600">{promoCode.toUpperCase()}</p>
                  </div>
                </div>
                <span className="font-semibold text-green-600">-BD {discount.toFixed(2)}</span>
              </div>
            )}

            {tipAmount > 0 && (
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-yellow-50 rounded-lg flex items-center justify-center">
                    <Gift className="w-4 h-4 text-yellow-600" />
                  </div>
                  <span className="text-gray-700">Tip for driver</span>
                </div>
                <span className="font-semibold text-gray-800">BD {tipAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="border-t border-gray-200 pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-800">Total Amount</span>
                <span className="text-2xl font-bold text-purple-600">BD {total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Promo Code Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">Promo Code</h2>
            {!isPromoApplied && !showPromoInput && (
              <button 
                onClick={() => setShowPromoInput(true)}
                className="text-purple-600 text-sm font-medium hover:underline"
              >
                + Add Code
              </button>
            )}
          </div>

          {showPromoInput && !isPromoApplied && (
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm font-medium"
              />
              <button
                onClick={applyPromoCode}
                disabled={!promoCode}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  promoCode
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Apply
              </button>
            </div>
          )}

          {isPromoApplied && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">{promoCode}</p>
                  <p className="text-xs text-green-600">Promo applied successfully!</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsPromoApplied(false);
                  setPromoCode('');
                }}
                className="text-red-600 text-sm font-medium hover:underline"
              >
                Remove
              </button>
            </div>
          )}

          {!isPromoApplied && !showPromoInput && (
            <div className="flex gap-2 flex-wrap">
              <button 
                onClick={() => {
                  setPromoCode('GOLOCAL10');
                  setShowPromoInput(true);
                }}
                className="px-3 py-2 bg-purple-50 text-purple-600 rounded-lg text-xs font-medium hover:bg-purple-100 transition-colors"
              >
                GOLOCAL10
              </button>
              <button 
                onClick={() => {
                  setPromoCode('FIRST20');
                  setShowPromoInput(true);
                }}
                className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors"
              >
                FIRST20
              </button>
            </div>
          )}
        </div>

        {/* Tip Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Gift className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-bold text-gray-800">Add a Tip</h2>
            <span className="text-xs text-gray-500">(Optional)</span>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {tipOptions.map((amount) => (
              <button
                key={amount}
                onClick={() => setTipAmount(amount)}
                className={`py-3 rounded-xl font-medium transition-all ${
                  tipAmount === amount
                    ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {amount === 0 ? 'No Tip' : `BD ${amount.toFixed(2)}`}
              </button>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Payment Method</h2>
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-xs text-green-600 font-medium">Secured</span>
            </div>
          </div>

          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedPayment(method.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                  selectedPayment === method.id
                    ? 'border-purple-600 bg-purple-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  selectedPayment === method.id
                    ? `bg-${method.color}-600 text-white`
                    : `bg-${method.color}-50 text-${method.color}-600`
                }`}>
                  {method.icon}
                </div>

                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-800">{method.name}</p>
                    {method.badge && (
                      <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">
                        {method.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>

                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedPayment === method.id
                    ? 'border-purple-600'
                    : 'border-gray-300'
                }`}>
                  {selectedPayment === method.id && (
                    <div className="w-3.5 h-3.5 rounded-full bg-purple-600"></div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {selectedPayment !== 'cash' && (
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-3 flex gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800">
                Your payment information is encrypted and secure. We never store your card details.
              </p>
            </div>
          )}
        </div>

        {/* Receipt Options */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Receipt Options</h2>
          
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 p-3 border-2 border-gray-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all">
              <Download className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-gray-700">Download</span>
            </button>
            
            <button className="flex-1 flex items-center justify-center gap-2 p-3 border-2 border-gray-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all">
              <Share2 className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-gray-700">Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Fixed Payment Button */}
      <div className="fixed bottom-20 left-0 right-0 px-6 py-4 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-gray-600">Total Amount</p>
            <p className="text-2xl font-bold text-gray-800">BD {total.toFixed(2)}</p>
          </div>
          <button
            onClick={() => onPaymentComplete?.()}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all active:scale-[0.98] flex items-center gap-2"
          >
            {selectedPayment === 'cash' ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Complete Trip
              </>
            ) : (
              <>
                <Shield className="w-5 h-5" />
                Pay Now
              </>
            )}
          </button>
        </div>
        
        <p className="text-xs text-center text-gray-500">
          {selectedPayment === 'cash' 
            ? 'Please pay the driver in cash' 
            : '🔒 Secure payment powered by GoLocal Payment Gateway'}
        </p>
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