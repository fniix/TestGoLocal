import { ArrowLeft, CheckCircle } from 'lucide-react';
import { ReactNode } from 'react';

interface SettingsScreenProps {
  onBack: () => void;
  title: string;
  icon: ReactNode;
  iconColor: string;
  children: ReactNode;
}

export function SettingsScreen({ onBack, title, icon, iconColor, children }: SettingsScreenProps) {
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
            <h1 className="text-white text-2xl font-bold">{title}</h1>
          </div>
        </div>

        {/* Icon */}
        <div className="flex justify-center">
          <div className={`w-20 h-20 ${iconColor} rounded-full flex items-center justify-center text-white shadow-lg`}>
            {icon}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {children}
      </div>
    </div>
  );
}

// Generic placeholder content for settings screens
export function SettingsPlaceholder({ title }: { title: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 text-center">
      <CheckCircle className="w-16 h-16 text-purple-600 mx-auto mb-4" />
      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 mb-6">
        This section is under development. More features coming soon!
      </p>
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
        <p className="text-sm text-purple-700">
          You'll be able to customize your {title.toLowerCase()} settings here.
        </p>
      </div>
    </div>
  );
}
