import { ArrowLeft, Search, ChevronRight, MessageCircle, Phone, Mail, HelpCircle } from 'lucide-react';
import { useState } from 'react';

interface HelpCenterScreenProps {
  onBack: () => void;
}

export function HelpCenterScreen({ onBack }: HelpCenterScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const faqs = [
    {
      id: '1',
      category: 'Booking',
      question: 'How do I book a ride?',
      answer: 'Select your service type, enter pickup and drop-off locations, choose your preferred vehicle, and confirm your booking. A driver will be assigned to you shortly.'
    },
    {
      id: '2',
      category: 'Booking',
      question: 'Can I schedule a ride in advance?',
      answer: 'Yes! When booking, select "Schedule for Later" and choose your preferred date and time. Your driver will be notified before the scheduled time.'
    },
    {
      id: '3',
      category: 'Payment',
      question: 'What payment methods are accepted?',
      answer: 'We accept credit/debit cards (Visa, Mastercard), Benefit Pay, and cash payments. You can manage your payment methods in the Profile section.'
    },
    {
      id: '4',
      category: 'Payment',
      question: 'How is the fare calculated?',
      answer: 'Fares are calculated based on distance, time, service type, and current demand. You can see the estimated fare before confirming your booking.'
    },
    {
      id: '5',
      category: 'Account',
      question: 'How do I update my profile information?',
      answer: 'Go to Profile > Edit Profile to update your name, phone number, email, and profile picture.'
    },
    {
      id: '6',
      category: 'Account',
      question: 'How do I save my favorite locations?',
      answer: 'Go to Profile > Saved Locations to add, edit, or remove your favorite places like Home, Work, or other frequently visited locations.'
    },
    {
      id: '7',
      category: 'Safety',
      question: 'How do I ensure my safety during rides?',
      answer: 'All drivers are verified and background-checked. You can share your live trip with friends/family, see driver details before the ride, and contact support anytime.'
    },
    {
      id: '8',
      category: 'Safety',
      question: 'What should I do in case of an emergency?',
      answer: 'Use the emergency button in the app to contact local authorities or GoLocal support immediately. Your location will be shared automatically.'
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

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
            <h1 className="text-2xl font-bold text-white">Help Center</h1>
            <p className="text-white/80 text-sm mt-1">Find answers and get support</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for help..."
            className="w-full pl-12 pr-4 py-3 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Contact Support */}
        <div className="bg-white rounded-2xl p-5 shadow-md mb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Contact Support</h2>
          
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white p-4 rounded-xl hover:shadow-lg transition-all active:scale-95">
              <MessageCircle className="w-6 h-6" />
              <div className="flex-1 text-left">
                <p className="font-semibold">Live Chat</p>
                <p className="text-sm text-white/80">Chat with our support team</p>
              </div>
              <ChevronRight className="w-5 h-5" />
            </button>

            <button className="w-full flex items-center gap-3 bg-gray-50 hover:bg-gray-100 p-4 rounded-xl transition-colors">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-800">Call Us</p>
                <p className="text-sm text-gray-500">+973 1234 5678</p>
              </div>
            </button>

            <button className="w-full flex items-center gap-3 bg-gray-50 hover:bg-gray-100 p-4 rounded-xl transition-colors">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-800">Email Support</p>
                <p className="text-sm text-gray-500">support@golocal.bh</p>
              </div>
            </button>
          </div>
        </div>

        {/* FAQs by Category */}
        {categories.map(category => {
          const categoryFaqs = filteredFaqs.filter(faq => faq.category === category);
          if (categoryFaqs.length === 0) return null;

          return (
            <div key={category} className="mb-4">
              <h2 className="text-lg font-bold text-gray-800 mb-3 px-2">{category}</h2>
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                {categoryFaqs.map((faq, index) => (
                  <div key={faq.id}>
                    {index > 0 && <div className="border-t border-gray-100" />}
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                      className="w-full p-5 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <HelpCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${expandedFaq === faq.id ? 'text-purple-600' : 'text-gray-400'}`} />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">{faq.question}</p>
                          {expandedFaq === faq.id && (
                            <p className="text-gray-600 mt-2 text-sm leading-relaxed">{faq.answer}</p>
                          )}
                        </div>
                        <ChevronRight className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${expandedFaq === faq.id ? 'rotate-90' : ''}`} />
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {filteredFaqs.length === 0 && searchQuery && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <HelpCircle className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">No results found</h3>
            <p className="text-gray-500">Try searching with different keywords or contact support</p>
          </div>
        )}
      </div>
    </div>
  );
}
