import { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopBar } from './AdminTopBar';
import { Bell, Navigation, Package, CreditCard, MessageSquare, AlertTriangle, Check, ExternalLink } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  category: 'Trips' | 'Delivery' | 'Payments' | 'Complaints' | 'Violations';
  time: string;
  read: boolean;
  sourcePage: 'trips' | 'delivery' | 'payments' | 'complaints' | 'violations';
}

interface AdminNotificationsProps {
  onNavigate: (page: 'dashboard' | 'users' | 'drivers' | 'trips' | 'delivery' | 'payments' | 'complaints' | 'violations' | 'reports' | 'notifications' | 'settings') => void;
}

export function AdminNotifications({ onNavigate }: AdminNotificationsProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', title: 'New Trip Assigned', message: 'Trip T001 assigned to Ahmed Al-Khalifa', category: 'Trips', time: '2 mins ago', read: false, sourcePage: 'trips' },
    { id: '2', title: 'Delivery Completed', message: 'Order D005 delivered successfully to customer', category: 'Delivery', time: '15 mins ago', read: false, sourcePage: 'delivery' },
    { id: '3', title: 'Payment Status Changed', message: 'Payment PAY003 marked as successful', category: 'Payments', time: '1 hour ago', read: true, sourcePage: 'payments' },
    { id: '4', title: 'New Complaint Submitted', message: 'Complaint C006 from Sara Ahmed requires attention', category: 'Complaints', time: '2 hours ago', read: false, sourcePage: 'complaints' },
    { id: '5', title: 'Violation Warning Sent', message: 'Warning sent to driver Ali Hassan for V002', category: 'Violations', time: '3 hours ago', read: true, sourcePage: 'violations' },
    { id: '6', title: 'Trip Cancelled', message: 'Trip T008 cancelled by passenger', category: 'Trips', time: '4 hours ago', read: true, sourcePage: 'trips' },
    { id: '7', title: 'Delivery Delayed', message: 'Order D012 is running 20 minutes late', category: 'Delivery', time: '5 hours ago', read: false, sourcePage: 'delivery' },
    { id: '8', title: 'Payment Refunded', message: 'Payment PAY007 refunded to customer account', category: 'Payments', time: '6 hours ago', read: true, sourcePage: 'payments' },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Trips' | 'Delivery' | 'Payments' | 'Complaints' | 'Violations'>('All');

  const filteredNotifications = notifications.filter(notif => 
    selectedCategory === 'All' || notif.category === selectedCategory
  );

  const unreadCount = notifications.filter(n => !n.read).length;
  const tripsCount = notifications.filter(n => n.category === 'Trips').length;
  const deliveryCount = notifications.filter(n => n.category === 'Delivery').length;
  const paymentsCount = notifications.filter(n => n.category === 'Payments').length;
  const complaintsCount = notifications.filter(n => n.category === 'Complaints').length;
  const violationsCount = notifications.filter(n => n.category === 'Violations').length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const handleGoToSource = (page: Notification['sourcePage']) => {
    onNavigate(page);
  };

  const getCategoryIcon = (category: Notification['category']) => {
    switch (category) {
      case 'Trips':
        return <Navigation className="w-5 h-5" />;
      case 'Delivery':
        return <Package className="w-5 h-5" />;
      case 'Payments':
        return <CreditCard className="w-5 h-5" />;
      case 'Complaints':
        return <MessageSquare className="w-5 h-5" />;
      case 'Violations':
        return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: Notification['category']) => {
    switch (category) {
      case 'Trips':
        return 'bg-blue-100 text-blue-700';
      case 'Delivery':
        return 'bg-green-100 text-green-700';
      case 'Payments':
        return 'bg-purple-100 text-purple-700';
      case 'Complaints':
        return 'bg-orange-100 text-orange-700';
      case 'Violations':
        return 'bg-red-100 text-red-700';
    }
  };

  return (
    <div className="size-full flex bg-[#EEF3FF]">
      <AdminSidebar activePage="notifications" onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminTopBar />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
            <p className="text-gray-500 mt-1">{unreadCount} unread notifications</p>
          </div>

          {/* Category Filters */}
          <div className="flex gap-3 mb-6 flex-wrap">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                selectedCategory === 'All'
                  ? 'bg-gradient-to-r from-[#6C5CE7] to-[#A29BFE] text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setSelectedCategory('Trips')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                selectedCategory === 'Trips'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <Navigation className="w-4 h-4" />
              Trips ({tripsCount})
            </button>
            <button
              onClick={() => setSelectedCategory('Delivery')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                selectedCategory === 'Delivery'
                  ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <Package className="w-4 h-4" />
              Delivery ({deliveryCount})
            </button>
            <button
              onClick={() => setSelectedCategory('Payments')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                selectedCategory === 'Payments'
                  ? 'bg-gradient-to-r from-[#6C5CE7] to-[#A29BFE] text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              Payments ({paymentsCount})
            </button>
            <button
              onClick={() => setSelectedCategory('Complaints')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                selectedCategory === 'Complaints'
                  ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Complaints ({complaintsCount})
            </button>
            <button
              onClick={() => setSelectedCategory('Violations')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                selectedCategory === 'Violations'
                  ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              Violations ({violationsCount})
            </button>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-2xl shadow-md border border-gray-100 p-6 transition-all hover:shadow-lg ${
                  !notification.read ? 'border-l-4 border-l-purple-500' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Category Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getCategoryColor(notification.category)}`}>
                    {getCategoryIcon(notification.category)}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg">{notification.title}</h3>
                        <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(notification.category)}`}>
                          {notification.category}
                        </span>
                      </div>
                      {!notification.read && (
                        <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-3">{notification.message}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">{notification.time}</p>
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="px-4 py-2 text-sm font-semibold text-green-600 hover:bg-green-50 rounded-lg transition-colors flex items-center gap-1"
                          >
                            <Check className="w-4 h-4" />
                            Mark as Read
                          </button>
                        )}
                        <button
                          onClick={() => handleGoToSource(notification.sourcePage)}
                          className="px-4 py-2 text-sm font-semibold text-purple-600 hover:bg-purple-50 rounded-lg transition-colors flex items-center gap-1"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Go to Source Page
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
