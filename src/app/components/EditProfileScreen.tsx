import { ArrowLeft, User, Phone, Mail, Camera } from 'lucide-react';
import { useState } from 'react';

interface EditProfileScreenProps {
  onBack: () => void;
  userName: string;
  userPhone: string;
  userEmail: string;
  onSave: (name: string, phone: string, email: string) => void;
}

export function EditProfileScreen({ onBack, userName, userPhone, userEmail, onSave }: EditProfileScreenProps) {
  const [name, setName] = useState(userName);
  const [phone, setPhone] = useState(userPhone);
  const [email, setEmail] = useState(userEmail);
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (field: 'name' | 'phone' | 'email', value: string) => {
    if (field === 'name') setName(value);
    if (field === 'phone') setPhone(value);
    if (field === 'email') setEmail(value);
    setHasChanges(true);
  };

  const handleSave = () => {
    onSave(name, phone, email);
    onBack();
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
          <h1 className="text-2xl font-bold text-white">Edit Profile</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center shadow-xl">
              <span className="text-white font-bold text-5xl">
                {name ? name[0].toUpperCase() : 'U'}
              </span>
            </div>
            <button className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-gray-50 hover:bg-gray-50 transition-colors">
              <Camera className="w-5 h-5 text-purple-600" />
            </button>
          </div>
          <p className="text-gray-500 text-sm mt-3">Tap to change profile picture</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <User className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <Phone className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="+973 XXXX XXXX"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <Mail className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="your.email@example.com"
              />
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Note:</span> Changes to your profile information will be reflected across the app immediately.
          </p>
        </div>
      </div>

      {/* Save Button */}
      <div className="px-6 pb-6">
        <button
          onClick={handleSave}
          disabled={!hasChanges}
          className={`w-full py-4 rounded-full text-lg font-semibold shadow-lg transition-all ${
            hasChanges
              ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:shadow-xl active:scale-95'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
