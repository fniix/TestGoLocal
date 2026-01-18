import { ArrowLeft, Smartphone, Globe, Shield, Heart, Users, Zap } from 'lucide-react';

interface AboutScreenProps {
  onBack: () => void;
}

export function AboutScreen({ onBack }: AboutScreenProps) {
  const appInfo = {
    version: '2.1.0',
    buildNumber: '245',
    platform: 'Web App',
    releaseDate: 'January 2025',
    developer: 'GoLocal Technologies',
    website: 'www.golocal.bh',
    email: 'info@golocal.bh'
  };

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Fast & Reliable',
      description: 'Quick booking and reliable service across Bahrain',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Safe & Secure',
      description: 'Verified drivers and secure payments',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Community Focused',
      description: 'Supporting local drivers and communities',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Customer First',
      description: '24/7 support and best-in-class service',
      color: 'from-pink-500 to-red-500'
    }
  ];

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
            <h1 className="text-2xl font-bold text-white">About GoLocal</h1>
            <p className="text-white/80 text-sm mt-1">Your trusted ride partner</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center shadow-xl mb-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">Go</div>
              <div className="text-2xl font-bold text-white -mt-1">Local</div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">GoLocal</h2>
          <p className="text-gray-500 mt-1">Your Local Ride, Anytime</p>
        </div>

        {/* App Information */}
        <div className="bg-white rounded-2xl p-5 shadow-md mb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Application Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Version</span>
              <span className="font-semibold text-gray-800">{appInfo.version}</span>
            </div>
            <div className="border-t border-gray-100" />
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Build Number</span>
              <span className="font-semibold text-gray-800">{appInfo.buildNumber}</span>
            </div>
            <div className="border-t border-gray-100" />
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Platform</span>
              <span className="font-semibold text-gray-800">{appInfo.platform}</span>
            </div>
            <div className="border-t border-gray-100" />
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Release Date</span>
              <span className="font-semibold text-gray-800">{appInfo.releaseDate}</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl p-5 shadow-md mb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Why Choose GoLocal</h3>
          <div className="grid grid-cols-1 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800">{feature.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Company Information */}
        <div className="bg-white rounded-2xl p-5 shadow-md mb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Contact Information</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Globe className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Website</p>
                <p className="font-semibold text-gray-800">{appInfo.website}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-semibold text-gray-800">{appInfo.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center py-4">
          <p className="text-sm text-gray-500">
            © 2025 GoLocal Technologies. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Made with ❤️ in Bahrain
          </p>
        </div>
      </div>
    </div>
  );
}
