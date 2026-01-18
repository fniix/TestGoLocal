import { ArrowLeft, Car, Users, Clock, Zap, Star, Home, Search, Bell, User as UserIcon } from 'lucide-react';
import { useState } from 'react';

interface ServiceOption {
  id: string;
  name: string;
  description: string;
  icon: 'car' | 'users' | 'premium';
  price: number;
  estimatedTime: string;
  capacity: string;
  rating: number;
  available: boolean;
  popular?: boolean;
  // OnTheWay specific fields
  discountPercent?: number;
  originalPrice?: number;
  expectedRiders?: number;
  maxDelay?: string;
  // Mandoob specific fields
  deliveryTime?: string;
  maxWeight?: string;
  tracking?: boolean;
  insurance?: boolean;
}

interface ServiceSelectionScreenProps {
  onBack: () => void;
  serviceType: string;
  onContinue?: (service: string) => void;
  onNavigateHome?: () => void;
  onNavigateProfile?: () => void;
}

export function ServiceSelectionScreen({ onBack, serviceType, onContinue, onNavigateHome, onNavigateProfile }: ServiceSelectionScreenProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  // Mock service options based on service type
  const getServiceOptions = (): ServiceOption[] => {
    switch (serviceType) {
      case 'private-driver':
        return [
          {
            id: 'economy',
            name: 'Economy',
            description: 'Affordable everyday rides',
            icon: 'car',
            price: 3.50,
            estimatedTime: '3 min',
            capacity: '4 seats',
            rating: 4.8,
            available: true,
            popular: true
          },
          {
            id: 'comfort',
            name: 'Comfort',
            description: 'Newer cars with extra legroom',
            icon: 'car',
            price: 5.00,
            estimatedTime: '5 min',
            capacity: '4 seats',
            rating: 4.9,
            available: true
          },
          {
            id: 'premium',
            name: 'Premium',
            description: 'High-end cars and top drivers',
            icon: 'premium',
            price: 8.00,
            estimatedTime: '8 min',
            capacity: '4 seats',
            rating: 5.0,
            available: true
          },
          {
            id: 'xl',
            name: 'XL',
            description: 'Extra space for groups',
            icon: 'users',
            price: 6.50,
            estimatedTime: '6 min',
            capacity: '6 seats',
            rating: 4.7,
            available: false
          }
        ];
      case 'private-bus':
        return [
          {
            id: 'minibus',
            name: 'Mini Bus',
            description: 'Perfect for small groups',
            icon: 'users',
            price: 12.00,
            estimatedTime: '10 min',
            capacity: '12 seats',
            rating: 4.6,
            available: true
          },
          {
            id: 'standard-bus',
            name: 'Standard Bus',
            description: 'Comfortable group transport',
            icon: 'users',
            price: 20.00,
            estimatedTime: '15 min',
            capacity: '25 seats',
            rating: 4.7,
            available: true,
            popular: true
          },
          {
            id: 'luxury-bus',
            name: 'Luxury Bus',
            description: 'Premium amenities included',
            icon: 'premium',
            price: 35.00,
            estimatedTime: '20 min',
            capacity: '30 seats',
            rating: 4.9,
            available: true
          }
        ];
      case 'ontheway':
        return [
          {
            id: 'fastest-shared',
            name: 'Fastest Route',
            description: 'Minimal stops, get there quick',
            icon: 'car',
            price: 2.50,
            originalPrice: 3.50,
            discountPercent: 29,
            estimatedTime: '8 min',
            capacity: '3 riders',
            rating: 4.8,
            available: true,
            expectedRiders: 2,
            maxDelay: '5 min',
            popular: true
          },
          {
            id: 'cheapest-shared',
            name: 'Best Value',
            description: 'Save more with shared ride',
            icon: 'users',
            price: 1.80,
            originalPrice: 3.50,
            discountPercent: 49,
            estimatedTime: '15 min',
            capacity: '4 riders',
            rating: 4.7,
            available: true,
            expectedRiders: 3,
            maxDelay: '10 min'
          },
          {
            id: 'comfort-shared',
            name: 'Comfort Share',
            description: 'Extra space with fewer riders',
            icon: 'premium',
            price: 3.00,
            originalPrice: 5.00,
            discountPercent: 40,
            estimatedTime: '10 min',
            capacity: '2 riders',
            rating: 4.9,
            available: true,
            expectedRiders: 1,
            maxDelay: '7 min'
          }
        ];
      case 'mandoob':
        return [
          {
            id: 'standard-delivery',
            name: 'Standard Delivery',
            description: 'Reliable and fast delivery service',
            icon: 'car',
            price: 5.00,
            estimatedTime: '30 min',
            capacity: '1 package',
            rating: 4.8,
            available: true,
            deliveryTime: '30 min',
            maxWeight: '10 kg',
            tracking: true,
            insurance: false
          },
          {
            id: 'express-delivery',
            name: 'Express Delivery',
            description: 'Priority delivery with insurance',
            icon: 'premium',
            price: 10.00,
            estimatedTime: '15 min',
            capacity: '1 package',
            rating: 4.9,
            available: true,
            deliveryTime: '15 min',
            maxWeight: '5 kg',
            tracking: true,
            insurance: true
          }
        ];
      default:
        return [];
    }
  };

  const services = getServiceOptions();
  const getServiceTitle = () => {
    switch (serviceType) {
      case 'private-driver': return 'Private Driver';
      case 'private-bus': return 'Private Bus';
      case 'ontheway': return 'OnTheWay';
      case 'mandoob': return 'Mandoob Delivery';
      default: return 'Select Service';
    }
  };

  const renderIcon = (iconType: string, isSelected: boolean) => {
    const className = `w-8 h-8 ${isSelected ? 'text-white' : 'text-purple-600'}`;
    
    switch (iconType) {
      case 'car':
        return <Car className={className} />;
      case 'users':
        return <Users className={className} />;
      case 'premium':
        return <Zap className={className} />;
      default:
        return <Car className={className} />;
    }
  };

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
          
          <div className="flex-1">
            <h1 className="text-white text-2xl font-bold">{getServiceTitle()}</h1>
            <p className="text-white/90 text-sm">Choose your preferred option</p>
          </div>
        </div>
      </div>

      {/* Trip Info Bar */}
      <div className="bg-white px-6 py-4 shadow-sm border-b border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
            <span className="text-gray-600">Pickup: Current Location</span>
          </div>
          <span className="text-purple-600 font-medium">Change</span>
        </div>
      </div>

      {/* Service Options */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
        <div className="space-y-4">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => service.available && setSelectedService(service.id)}
              disabled={!service.available}
              className={`w-full bg-white rounded-2xl p-5 shadow-md transition-all ${
                selectedService === service.id
                  ? 'ring-2 ring-purple-600 bg-gradient-to-r from-purple-600 to-blue-500 transform scale-[1.02]'
                  : service.available
                  ? 'hover:shadow-xl active:scale-[0.98]'
                  : 'opacity-50'
              } ${!service.available ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                  selectedService === service.id
                    ? 'bg-white/20'
                    : 'bg-gradient-to-br from-purple-100 to-blue-100'
                }`}>
                  {renderIcon(service.icon, selectedService === service.id)}
                </div>

                {/* Service Info */}
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-bold text-lg ${
                      selectedService === service.id ? 'text-white' : 'text-gray-800'
                    }`}>
                      {service.name}
                    </h3>
                    {service.popular && (
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        selectedService === service.id
                          ? 'bg-yellow-400 text-yellow-900'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        Popular
                      </span>
                    )}
                    {service.discountPercent && (
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        selectedService === service.id
                          ? 'bg-green-400 text-green-900'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        Save {service.discountPercent}%
                      </span>
                    )}
                  </div>
                  
                  <p className={`text-sm mb-2 ${
                    selectedService === service.id ? 'text-white/90' : 'text-gray-600'
                  }`}>
                    {service.description}
                  </p>

                  <div className="flex items-center gap-4">
                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      <Star className={`w-4 h-4 ${
                        selectedService === service.id ? 'text-yellow-300 fill-yellow-300' : 'text-yellow-500 fill-yellow-500'
                      }`} />
                      <span className={`text-sm font-medium ${
                        selectedService === service.id ? 'text-white' : 'text-gray-700'
                      }`}>
                        {service.rating}
                      </span>
                    </div>

                    {/* Capacity */}
                    <span className={`text-sm ${
                      selectedService === service.id ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      {service.capacity}
                    </span>

                    {/* Availability Status */}
                    {!service.available && (
                      <span className="text-sm text-red-600 font-medium">Unavailable</span>
                    )}
                  </div>
                </div>

                {/* Price & Time */}
                <div className="text-right">
                  {service.originalPrice && (
                    <div className={`text-sm line-through mb-0.5 ${
                      selectedService === service.id ? 'text-white/60' : 'text-gray-400'
                    }`}>
                      BD {service.originalPrice.toFixed(2)}
                    </div>
                  )}
                  <div className={`text-2xl font-bold mb-1 ${
                    selectedService === service.id ? 'text-white' : 'text-gray-800'
                  }`}>
                    BD {service.price.toFixed(2)}
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    selectedService === service.id ? 'text-white/90' : 'text-gray-600'
                  }`}>
                    <Clock className="w-4 h-4" />
                    <span>{service.estimatedTime}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* OnTheWay Specific Info - Only shown when ontheway is selected */}
        {serviceType === 'ontheway' && selectedService && (() => {
          const selected = services.find(s => s.id === selectedService);
          return selected && (
            <div className="mt-6 space-y-4">
              {/* Shared Ride Information Card */}
              <div className="bg-white rounded-2xl p-5 shadow-md">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  Shared Ride Information
                </h3>
                
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-purple-50 rounded-xl p-3 text-center">
                    <Users className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">Expected Riders</p>
                    <p className="text-lg font-bold text-purple-600">{selected.expectedRiders}</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-3 text-center">
                    <Clock className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">Max Delay</p>
                    <p className="text-lg font-bold text-blue-600">{selected.maxDelay}</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-3 text-center">
                    <Zap className="w-5 h-5 text-green-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">You Save</p>
                    <p className="text-lg font-bold text-green-600">{selected.discountPercent}%</p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold">Pickup Order:</span> You'll be picked up based on route optimization. We'll notify you of your pickup position once matched.
                  </p>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-white rounded-2xl p-5 shadow-md">
                <h3 className="font-bold text-gray-800 mb-4">Price Breakdown</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Base Fare (Solo)</span>
                    <span className="text-gray-800 font-medium">BD {selected.originalPrice?.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-green-600 font-medium">Sharing Discount ({selected.discountPercent}%)</span>
                    <span className="text-green-600 font-semibold">-BD {((selected.originalPrice || 0) - selected.price).toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">Total</span>
                    <span className="text-2xl font-bold text-purple-600">BD {selected.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Ride Preferences */}
              <div className="bg-white rounded-2xl p-5 shadow-md">
                <h3 className="font-bold text-gray-800 mb-4">Ride Preferences</h3>
                
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">🤫</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Quiet Ride</p>
                        <p className="text-xs text-gray-500">Prefer minimal conversation</p>
                      </div>
                    </div>
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                  </label>

                  <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">🚭</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">No Smoking</p>
                        <p className="text-xs text-gray-500">Smoke-free vehicle only</p>
                      </div>
                    </div>
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500" defaultChecked />
                  </label>

                  <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">❄️</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">AC Preferred</p>
                        <p className="text-xs text-gray-500">Cool temperature</p>
                      </div>
                    </div>
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500" defaultChecked />
                  </label>
                </div>
              </div>

              {/* Estimated Trip Details */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-2xl p-5">
                <h3 className="font-bold text-gray-800 mb-3">Estimated Trip Details</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-xs text-gray-600 mb-1">Arrival Time</p>
                    <p className="text-lg font-bold text-purple-600">{selected.estimatedTime}</p>
                  </div>
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-xs text-gray-600 mb-1">Trip Duration</p>
                    <p className="text-lg font-bold text-blue-600">~{parseInt(selected.estimatedTime) + 5} min</p>
                  </div>
                </div>

                <div className="mt-3 bg-white rounded-xl p-3">
                  <p className="text-xs text-gray-600 mb-1">You're saving</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold text-green-600">BD {((selected.originalPrice || 0) - selected.price).toFixed(2)}</p>
                    <p className="text-sm text-gray-500">compared to solo ride</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Mandoob Specific Info - Only shown when mandoob is selected */}
        {serviceType === 'mandoob' && selectedService && (() => {
          const selected = services.find(s => s.id === selectedService);
          return selected && (
            <div className="mt-6 space-y-4">
              {/* Delivery Locations */}
              <div className="bg-white rounded-2xl p-5 shadow-md">
                <h3 className="font-bold text-gray-800 mb-4">Delivery Locations</h3>
                
                <div className="space-y-4">
                  {/* Pickup Location */}
                  <div>
                    <label className="text-sm text-gray-600 font-medium mb-2 block">Pickup Location (Sender)</label>
                    <input 
                      type="text" 
                      placeholder="123 Main St, Manama, Bahrain" 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  {/* Drop-off Location */}
                  <div>
                    <label className="text-sm text-gray-600 font-medium mb-2 block">Drop-off Location (Receiver)</label>
                    <input 
                      type="text" 
                      placeholder="456 Market Ave, Muharraq, Bahrain" 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Package Details */}
              <div className="bg-white rounded-2xl p-5 shadow-md">
                <h3 className="font-bold text-gray-800 mb-4">Package Details</h3>
                
                <div className="space-y-4">
                  {/* Package Type */}
                  <div>
                    <label className="text-sm text-gray-600 font-medium mb-2 block">Package Type</label>
                    <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option>📦 General Package</option>
                      <option>🍕 Food & Beverages</option>
                      <option>📄 Documents</option>
                      <option>🎁 Fragile Items</option>
                      <option>💼 Business Materials</option>
                    </select>
                  </div>

                  {/* Package Size & Weight */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm text-gray-600 font-medium mb-2 block">Size</label>
                      <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                        <option>Small</option>
                        <option>Medium</option>
                        <option>Large</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 font-medium mb-2 block">Weight</label>
                      <input 
                        type="text" 
                        placeholder="e.g., 2 kg" 
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Receiver Information */}
              <div className="bg-white rounded-2xl p-5 shadow-md">
                <h3 className="font-bold text-gray-800 mb-4">Receiver Contact Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600 font-medium mb-2 block">Receiver Name</label>
                    <input 
                      type="text" 
                      placeholder="Full name" 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-600 font-medium mb-2 block">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+973 XXXX XXXX" 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Special Instructions */}
              <div className="bg-white rounded-2xl p-5 shadow-md">
                <h3 className="font-bold text-gray-800 mb-4">Special Instructions</h3>
                <textarea 
                  placeholder="Add any special instructions for the delivery agent (e.g., ring doorbell twice, leave at reception, call upon arrival)"
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                ></textarea>
              </div>

              {/* Delivery Information Card */}
              <div className="bg-white rounded-2xl p-5 shadow-md">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Car className="w-5 h-5 text-purple-600" />
                  Delivery Service Features
                </h3>
                
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-purple-50 rounded-xl p-3 text-center">
                    <Clock className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">Delivery Time</p>
                    <p className="text-lg font-bold text-purple-600">{selected.deliveryTime}</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-3 text-center">
                    <Zap className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">Max Weight</p>
                    <p className="text-lg font-bold text-blue-600">{selected.maxWeight}</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-3 text-center">
                    <Star className="w-5 h-5 text-green-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">Live Tracking</p>
                    <p className="text-sm font-bold text-green-600">{selected.tracking ? 'Yes' : 'No'}</p>
                  </div>
                </div>

                {selected.insurance && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center gap-2">
                    <Star className="w-5 h-5 text-green-600" />
                    <p className="text-sm text-green-800">
                      <span className="font-semibold">Insurance Included:</span> Your package is insured up to BD 50 for this delivery.
                    </p>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="bg-white rounded-2xl p-5 shadow-md">
                <h3 className="font-bold text-gray-800 mb-4">Price Breakdown</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Base Delivery Fee</span>
                    <span className="text-gray-800 font-medium">BD {(selected.price - (selected.insurance ? 2.00 : 0)).toFixed(2)}</span>
                  </div>
                  
                  {selected.insurance && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Insurance Fee</span>
                      <span className="text-gray-800 font-medium">BD 2.00</span>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">Total</span>
                    <span className="text-2xl font-bold text-purple-600">BD {selected.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Estimated Delivery Time */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-2xl p-5">
                <h3 className="font-bold text-gray-800 mb-3">Estimated Delivery Time</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-xs text-gray-600 mb-1">Pickup ETA</p>
                    <p className="text-lg font-bold text-purple-600">5 min</p>
                  </div>
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-xs text-gray-600 mb-1">Delivery ETA</p>
                    <p className="text-lg font-bold text-blue-600">{selected.deliveryTime}</p>
                  </div>
                </div>

                <div className="mt-3 bg-white rounded-xl p-3">
                  <p className="text-xs text-gray-600 mb-1">Delivery Type</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold text-green-600">{selected.id === 'express-delivery' ? 'Express' : 'Standard'}</p>
                    <p className="text-sm text-gray-500">{selected.id === 'express-delivery' ? 'Priority handling' : 'Regular service'}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Info Section */}
        <div className="mt-6 bg-blue-50 rounded-2xl p-4 border border-blue-100">
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Price Estimate</h4>
              <p className="text-sm text-gray-600">
                {serviceType === 'ontheway' 
                  ? 'Shared ride prices are locked. You save by sharing with other riders going your way.'
                  : 'Final price may vary based on traffic, route, and time of day.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Continue Button */}
      <div className="fixed bottom-20 left-0 right-0 px-6 py-4 bg-white border-t border-gray-200 shadow-lg">
        <button
          disabled={!selectedService}
          onClick={() => selectedService && onContinue?.(selectedService)}
          className={`w-full py-4 rounded-full text-lg font-semibold shadow-lg transition-all ${
            selectedService
              ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:shadow-xl active:scale-[0.98]'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {selectedService ? 'Continue' : 'Select a Service'}
        </button>
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

          <button className="flex flex-col items-center text-gray-400 hover:text-purple-600 transition-colors">
            <Search className="w-6 h-6 mb-1" />
            <span className="text-xs">Search</span>
          </button>

          <button className="flex flex-col items-center text-gray-400 hover:text-purple-600 transition-colors">
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