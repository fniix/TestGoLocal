import { ArrowLeft, User, Phone, Mail, MapPin, Car, FileText, Star, Shield, LogOut } from 'lucide-react';

interface DriverProfileProps {
  driverName: string;
  email: string;
  phone: string;
  city: string;
  vehicleType: string;
  vehiclePlate: string;
  onBack: () => void;
  onLogout: () => void;
}

export function DriverProfile({ 
  driverName, 
  email, 
  phone, 
  city,
  vehicleType, 
  vehiclePlate,
  onBack,
  onLogout
}: DriverProfileProps) {
  const rating = 4.8;
  const totalRides = 342;
  const memberSince = 'January 2024';

  return (
    <div className="size-full bg-gray-50 flex flex-col">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 px-6 pt-6 pb-20 rounded-b-3xl shadow-lg">
        <button 
          onClick={onBack}
          className="flex items-center text-white hover:bg-white/10 rounded-full p-2 transition-colors mb-6"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        {/* Profile Header */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-xl mb-4">
            <span className="text-purple-600 font-bold text-4xl">
              {driverName[0].toUpperCase()}
            </span>
          </div>
          <h2 className="text-white text-2xl font-bold mb-1">{driverName}</h2>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
              <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              <span className="text-white font-semibold">{rating}</span>
            </div>
            <span className="text-white/90 text-sm">• {totalRides} rides</span>
          </div>
          <p className="text-white/80 text-sm">Driver since {memberSince}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-6 -mt-10 pb-24">
        {/* Personal Information Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-purple-600" />
            Personal Information
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Full Name</p>
                <p className="text-sm font-semibold text-gray-800">{driverName}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Phone Number</p>
                <p className="text-sm font-semibold text-gray-800">{phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Email Address</p>
                <p className="text-sm font-semibold text-gray-800">{email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">City</p>
                <p className="text-sm font-semibold text-gray-800 capitalize">{city.replace('-', ' ')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle Information Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Car className="w-5 h-5 text-purple-600" />
            Vehicle Information
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Car className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Vehicle Type</p>
                <p className="text-sm font-semibold text-gray-800 capitalize">{vehicleType}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Plate Number</p>
                <p className="text-sm font-semibold text-gray-800">{vehiclePlate}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Verification Status</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-green-600">Verified</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Summary Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-purple-600" />
            Performance Summary
          </h3>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <p className="text-2xl font-bold text-purple-600 mb-1">{rating}</p>
              <p className="text-xs text-gray-600">Rating</p>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <p className="text-2xl font-bold text-blue-600 mb-1">{totalRides}</p>
              <p className="text-xs text-gray-600">Total Rides</p>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <p className="text-2xl font-bold text-green-600 mb-1">94%</p>
              <p className="text-xs text-gray-600">Accept Rate</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <button className="w-full bg-white rounded-2xl p-4 shadow-md flex items-center justify-between hover:shadow-lg transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-purple-600" />
              </div>
              <span className="font-semibold text-gray-800">Edit Profile</span>
            </div>
            <ArrowLeft className="w-5 h-5 text-gray-400 rotate-180" />
          </button>

          <button className="w-full bg-white rounded-2xl p-4 shadow-md flex items-center justify-between hover:shadow-lg transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <span className="font-semibold text-gray-800">Documents</span>
            </div>
            <ArrowLeft className="w-5 h-5 text-gray-400 rotate-180" />
          </button>

          <button className="w-full bg-white rounded-2xl p-4 shadow-md flex items-center justify-between hover:shadow-lg transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-orange-600" />
              </div>
              <span className="font-semibold text-gray-800">Safety & Security</span>
            </div>
            <ArrowLeft className="w-5 h-5 text-gray-400 rotate-180" />
          </button>

          <button 
            onClick={onLogout}
            className="w-full bg-red-50 border-2 border-red-200 rounded-2xl p-4 shadow-md flex items-center justify-center gap-3 hover:bg-red-100 transition-all"
          >
            <LogOut className="w-5 h-5 text-red-600" />
            <span className="font-semibold text-red-600">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
