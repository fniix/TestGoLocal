import { ArrowLeft, Bell, Car, DollarSign, Gift, MessageSquare, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface NotificationSettingsScreenProps {
  onBack: () => void;
}

export function NotificationSettingsScreen({ onBack }: NotificationSettingsScreenProps) {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);

  const [rideUpdates, setRideUpdates] = useState(true);
  const [promotions, setPromotions] = useState(true);
  const [paymentAlerts, setPaymentAlerts] = useState(true);
  const [driverMessages, setDriverMessages] = useState(true);
  const [rideReminders, setRideReminders] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);

  const Toggle = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      className={`relative w-14 h-8 rounded-full transition-colors ${
        enabled ? 'bg-gradient-to-r from-purple-600 to-blue-500' : 'bg-gray-300'
      }`}
    >
      <div
        className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
          enabled ? 'translate-x-7' : 'translate-x-1'
        }`}
      />
    </button>
  );

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
            <h1 className="text-2xl font-bold text-white">Notifications</h1>
            <p className="text-white/80 text-sm mt-1">Manage your alert preferences</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Notification Channels */}
        <div className="bg-white rounded-2xl p-5 shadow-md mb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Notification Channels</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Bell className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Push Notifications</p>
                  <p className="text-sm text-gray-500">Alerts on your device</p>
                </div>
              </div>
              <Toggle enabled={pushEnabled} onToggle={() => setPushEnabled(!pushEnabled)} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Email Notifications</p>
                  <p className="text-sm text-gray-500">Updates via email</p>
                </div>
              </div>
              <Toggle enabled={emailEnabled} onToggle={() => setEmailEnabled(!emailEnabled)} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">SMS Notifications</p>
                  <p className="text-sm text-gray-500">Text message alerts</p>
                </div>
              </div>
              <Toggle enabled={smsEnabled} onToggle={() => setSmsEnabled(!smsEnabled)} />
            </div>
          </div>
        </div>

        {/* Notification Types */}
        <div className="bg-white rounded-2xl p-5 shadow-md">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Notification Types</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Car className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Ride Updates</p>
                  <p className="text-sm text-gray-500">Driver arrival, trip status</p>
                </div>
              </div>
              <Toggle enabled={rideUpdates} onToggle={() => setRideUpdates(!rideUpdates)} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Payment Alerts</p>
                  <p className="text-sm text-gray-500">Receipts and charges</p>
                </div>
              </div>
              <Toggle enabled={paymentAlerts} onToggle={() => setPaymentAlerts(!paymentAlerts)} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Gift className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Promotions & Offers</p>
                  <p className="text-sm text-gray-500">Discounts and deals</p>
                </div>
              </div>
              <Toggle enabled={promotions} onToggle={() => setPromotions(!promotions)} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Driver Messages</p>
                  <p className="text-sm text-gray-500">Chat notifications</p>
                </div>
              </div>
              <Toggle enabled={driverMessages} onToggle={() => setDriverMessages(!driverMessages)} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Bell className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Ride Reminders</p>
                  <p className="text-sm text-gray-500">Scheduled trips</p>
                </div>
              </div>
              <Toggle enabled={rideReminders} onToggle={() => setRideReminders(!rideReminders)} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Security Alerts</p>
                  <p className="text-sm text-gray-500">Account activity</p>
                </div>
              </div>
              <Toggle enabled={securityAlerts} onToggle={() => setSecurityAlerts(!securityAlerts)} />
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-4 bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Note:</span> Your notification preferences are saved automatically and will affect how you receive alerts from GoLocal.
          </p>
        </div>
      </div>
    </div>
  );
}
