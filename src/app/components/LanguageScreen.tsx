import { ArrowLeft, Check, Globe } from 'lucide-react';
import { useState } from 'react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

interface LanguageScreenProps {
  onBack: () => void;
  onLanguageChange?: (language: string) => void;
}

export function LanguageScreen({ onBack, onLanguageChange }: LanguageScreenProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const languages: Language[] = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇧🇭' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
    { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰' },
    { code: 'tl', name: 'Tagalog', nativeName: 'Tagalog', flag: '🇵🇭' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩' }
  ];

  const handleSelectLanguage = (code: string) => {
    setSelectedLanguage(code);
    if (onLanguageChange) {
      onLanguageChange(code);
    }
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
            <h1 className="text-2xl font-bold text-white">Language</h1>
            <p className="text-white/80 text-sm mt-1">Choose your preferred language</p>
          </div>
        </div>
      </div>

      {/* Language List */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="space-y-3">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleSelectLanguage(language.code)}
              className={`w-full bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-all flex items-center gap-4 ${
                selectedLanguage === language.code ? 'ring-2 ring-purple-500' : ''
              }`}
            >
              <div className="text-4xl">{language.flag}</div>
              <div className="flex-1 text-left">
                <p className="font-bold text-gray-800 text-lg">{language.name}</p>
                <p className="text-gray-500 text-sm">{language.nativeName}</p>
              </div>
              {selectedLanguage === language.code && (
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
          <div className="flex gap-3">
            <Globe className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-blue-800">
                <span className="font-semibold">Language settings</span> will be applied across the entire app immediately. Some content may require an app restart to fully update.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
