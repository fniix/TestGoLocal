import { ArrowLeft, FileText, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface TermsPoliciesScreenProps {
  onBack: () => void;
}

export function TermsPoliciesScreen({ onBack }: TermsPoliciesScreenProps) {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

  const documents = [
    { id: 'terms', title: 'Terms of Service', lastUpdated: 'January 1, 2025' },
    { id: 'privacy', title: 'Privacy Policy', lastUpdated: 'January 1, 2025' },
    { id: 'community', title: 'Community Guidelines', lastUpdated: 'December 15, 2024' },
    { id: 'cookies', title: 'Cookie Policy', lastUpdated: 'November 20, 2024' }
  ];

  const getDocumentContent = (id: string) => {
    switch (id) {
      case 'terms':
        return {
          title: 'Terms of Service',
          sections: [
            {
              heading: '1. Acceptance of Terms',
              content: 'By accessing and using GoLocal services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.'
            },
            {
              heading: '2. Service Description',
              content: 'GoLocal provides on-demand transportation services in Bahrain, connecting riders with drivers through our mobile application. Services include private driver, private bus, delivery (Mandoob), and ride-sharing (OnTheWay).'
            },
            {
              heading: '3. User Accounts',
              content: 'You must create an account to use our services. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.'
            },
            {
              heading: '4. Payment Terms',
              content: 'Fares are calculated based on distance, time, service type, and demand. Payment can be made via credit/debit card, Benefit Pay, or cash. All transactions are subject to our payment processing terms.'
            },
            {
              heading: '5. Cancellation Policy',
              content: 'Rides can be cancelled before driver arrival. Cancellation fees may apply if cancelled after the driver has been dispatched or has arrived at the pickup location.'
            },
            {
              heading: '6. Liability',
              content: 'GoLocal acts as a technology platform connecting riders and drivers. We are not responsible for the actions of drivers or riders, though all drivers undergo background checks and vehicle inspections.'
            }
          ]
        };
      case 'privacy':
        return {
          title: 'Privacy Policy',
          sections: [
            {
              heading: '1. Information We Collect',
              content: 'We collect information you provide directly (name, phone, email), usage data (ride history, locations), and device information (IP address, device type).'
            },
            {
              heading: '2. How We Use Your Information',
              content: 'Your information is used to provide services, process payments, improve user experience, send notifications, and ensure safety and security.'
            },
            {
              heading: '3. Data Sharing',
              content: 'We share necessary information with drivers to complete rides, payment processors for transactions, and law enforcement when legally required. We never sell your personal data.'
            },
            {
              heading: '4. Data Security',
              content: 'We implement industry-standard security measures to protect your data, including encryption, secure servers, and regular security audits.'
            },
            {
              heading: '5. Your Rights',
              content: 'You have the right to access, correct, delete, or export your personal data. You can manage these settings in your account or contact our support team.'
            },
            {
              heading: '6. Data Retention',
              content: 'We retain your data as long as your account is active and for a reasonable period thereafter as required by law or legitimate business purposes.'
            }
          ]
        };
      case 'community':
        return {
          title: 'Community Guidelines',
          sections: [
            {
              heading: '1. Respectful Behavior',
              content: 'Treat all users with respect. Harassment, discrimination, or abusive behavior will not be tolerated and may result in account suspension.'
            },
            {
              heading: '2. Safety First',
              content: 'Always wear seatbelts, follow traffic laws, and report any safety concerns immediately through the app.'
            },
            {
              heading: '3. Vehicle Standards',
              content: 'Drivers must maintain clean, safe vehicles in good working condition. Riders should respect vehicle cleanliness.'
            },
            {
              heading: '4. Communication',
              content: 'Use the in-app messaging for ride coordination. Share contact information only when necessary for ride completion.'
            },
            {
              heading: '5. Rating System',
              content: 'Provide honest, constructive feedback through ratings and reviews. Ratings help maintain service quality for everyone.'
            }
          ]
        };
      case 'cookies':
        return {
          title: 'Cookie Policy',
          sections: [
            {
              heading: '1. What Are Cookies',
              content: 'Cookies are small text files stored on your device that help us provide and improve our services.'
            },
            {
              heading: '2. How We Use Cookies',
              content: 'We use cookies for authentication, preferences, analytics, and security. This helps us remember your settings and improve your experience.'
            },
            {
              heading: '3. Third-Party Cookies',
              content: 'We use third-party services like analytics providers that may set their own cookies. These are subject to their respective privacy policies.'
            },
            {
              heading: '4. Managing Cookies',
              content: 'You can control cookies through your device settings, though some features may not work properly if cookies are disabled.'
            }
          ]
        };
      default:
        return null;
    }
  };

  if (selectedDoc) {
    const content = getDocumentContent(selectedDoc);
    if (!content) return null;

    return (
      <div className="size-full bg-gray-50 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 px-6 pt-6 pb-8 shadow-lg">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSelectedDoc(null)}
              className="flex items-center text-white hover:bg-white/10 rounded-full p-2 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white">{content.title}</h1>
              <p className="text-white/80 text-sm mt-1">
                Last updated: {documents.find(d => d.id === selectedDoc)?.lastUpdated}
              </p>
            </div>
          </div>
        </div>

        {/* Document Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            {content.sections.map((section, index) => (
              <div key={index} className={index > 0 ? 'mt-6' : ''}>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{section.heading}</h3>
                <p className="text-gray-600 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="size-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 px-6 pt-6 pb-8 shadow-lg">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="flex items-center text-white hover:bg-white/10 rounded-full p-2 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">Terms & Policies</h1>
            <p className="text-white/80 text-sm mt-1">Legal information and policies</p>
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {documents.map((doc, index) => (
            <div key={doc.id}>
              {index > 0 && <div className="border-t border-gray-100" />}
              <button
                onClick={() => setSelectedDoc(doc.id)}
                className="w-full p-5 hover:bg-gray-50 transition-colors flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-bold text-gray-800">{doc.title}</p>
                  <p className="text-sm text-gray-500 mt-1">Last updated: {doc.lastUpdated}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
