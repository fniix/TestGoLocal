import { ArrowLeft, CreditCard, Plus, Trash2, Check, Wallet } from 'lucide-react';
import { useState } from 'react';

interface PaymentMethod {
  id: string;
  type: 'card' | 'wallet';
  name: string;
  last4?: string;
  expiryDate?: string;
  isDefault: boolean;
  brand?: string;
}

interface PaymentMethodsScreenProps {
  onBack: () => void;
}

export function PaymentMethodsScreen({ onBack }: PaymentMethodsScreenProps) {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: '1', type: 'card', name: 'Visa', last4: '4242', expiryDate: '12/25', isDefault: true, brand: 'visa' },
    { id: '2', type: 'card', name: 'Mastercard', last4: '8888', expiryDate: '09/26', isDefault: false, brand: 'mastercard' },
    { id: '3', type: 'wallet', name: 'Benefit Pay', isDefault: false }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [addType, setAddType] = useState<'card' | 'wallet'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSetDefault = (id: string) => {
    setPaymentMethods(paymentMethods.map(pm => ({
      ...pm,
      isDefault: pm.id === id
    })));
  };

  const handleDelete = (id: string) => {
    setPaymentMethods(paymentMethods.filter(pm => pm.id !== id));
  };

  const handleAddCard = () => {
    if (cardNumber && cardName && expiryDate && cvv) {
      const newCard: PaymentMethod = {
        id: Date.now().toString(),
        type: 'card',
        name: cardName,
        last4: cardNumber.slice(-4),
        expiryDate: expiryDate,
        isDefault: paymentMethods.length === 0,
        brand: 'visa'
      };
      setPaymentMethods([...paymentMethods, newCard]);
      setShowAddModal(false);
      setCardNumber('');
      setCardName('');
      setExpiryDate('');
      setCvv('');
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
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
            <h1 className="text-2xl font-bold text-white">Payment Methods</h1>
            <p className="text-white/80 text-sm mt-1">{paymentMethods.length} payment methods</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-white text-purple-600 p-3 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Payment Methods List */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {paymentMethods.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <CreditCard className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Payment Methods</h3>
            <p className="text-gray-500 mb-6">Add a card or wallet for easy payments</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all active:scale-95"
            >
              Add Payment Method
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-all ${
                  method.isDefault ? 'ring-2 ring-purple-500' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`${
                    method.type === 'card' ? 'bg-gradient-to-br from-purple-600 to-blue-500' : 'bg-gradient-to-br from-green-600 to-teal-500'
                  } text-white p-4 rounded-xl flex-shrink-0`}>
                    {method.type === 'card' ? (
                      <CreditCard className="w-6 h-6" />
                    ) : (
                      <Wallet className="w-6 h-6" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-800 text-lg">{method.name}</h3>
                      {method.isDefault && (
                        <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-1 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    {method.type === 'card' && (
                      <p className="text-gray-500 text-sm mt-1">
                        •••• {method.last4} • Expires {method.expiryDate}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(method.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                {!method.isDefault && (
                  <button
                    onClick={() => handleSetDefault(method.id)}
                    className="w-full mt-3 bg-gray-100 text-gray-800 py-2 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Set as Default
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Payment Method Modal */}
      {showAddModal && (
        <div className="absolute inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Payment Method</h2>
            
            {/* Type Selection */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => setAddType('card')}
                className={`p-4 rounded-xl border-2 flex items-center justify-center gap-2 transition-all ${
                  addType === 'card'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span className="font-semibold">Card</span>
              </button>
              <button
                onClick={() => setAddType('wallet')}
                className={`p-4 rounded-xl border-2 flex items-center justify-center gap-2 transition-all ${
                  addType === 'wallet'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Wallet className="w-5 h-5" />
                <span className="font-semibold">Wallet</span>
              </button>
            </div>

            {addType === 'card' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    maxLength={19}
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Cardholder Name</label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date</label>
                    <input
                      type="text"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(formatExpiry(e.target.value))}
                      maxLength={5}
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
                    <input
                      type="text"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                      maxLength={3}
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <button className="w-full p-4 bg-white border-2 border-gray-200 rounded-xl flex items-center gap-3 hover:border-purple-500 transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-teal-500 rounded-lg flex items-center justify-center text-white font-bold">
                    BP
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-800">Benefit Pay</p>
                    <p className="text-sm text-gray-500">Link your Benefit account</p>
                  </div>
                </button>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setCardNumber('');
                  setCardName('');
                  setExpiryDate('');
                  setCvv('');
                }}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-full font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCard}
                disabled={addType === 'card' && (!cardNumber || !cardName || !expiryDate || !cvv)}
                className={`flex-1 py-3 rounded-full font-semibold transition-all ${
                  (addType === 'wallet' || (cardNumber && cardName && expiryDate && cvv))
                    ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:shadow-lg active:scale-95'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Add Payment Method
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
