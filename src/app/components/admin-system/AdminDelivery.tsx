import { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopBar } from './AdminTopBar';
import { Bell, UserPlus, Eye, Package, CheckCircle } from 'lucide-react';

interface Delivery {
  id: string;
  customer: string;
  agent: string;
  from: string;
  to: string;
  status: 'Pending' | 'In Transit' | 'Delivered';
  amount: number;
}

interface AdminDeliveryProps {
  onNavigate: (page: 'dashboard' | 'users' | 'drivers' | 'trips' | 'delivery' | 'payments' | 'complaints' | 'violations' | 'reports' | 'notifications' | 'settings') => void;
}

export function AdminDelivery({ onNavigate }: AdminDeliveryProps) {
  const [deliveries, setDeliveries] = useState<Delivery[]>([
    { id: 'D001', customer: 'Sara Ahmed', agent: 'Ahmed Al-Khalifa', from: 'Manama', to: 'Riffa', status: 'In Transit', amount: 12.5 },
    { id: 'D002', customer: 'Mohammed Ali', agent: 'Ali Hassan', from: 'Muharraq', to: 'Sitra', status: 'Pending', amount: 8.0 },
    { id: 'D003', customer: 'Noora Saleh', agent: 'Fatima Ahmed', from: 'Isa Town', to: 'Manama', status: 'Delivered', amount: 15.3 },
    { id: 'D004', customer: 'Khalid Ahmed', agent: 'Mohammed Saleh', from: 'Hamad Town', to: 'Riffa', status: 'In Transit', amount: 10.8 },
  ]);

  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
  const [agentName, setAgentName] = useState('');
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const notifyCustomer = (delivery: Delivery) => {
    setSelectedDelivery(delivery);
    setShowNotifyModal(true);
  };

  const confirmNotify = () => {
    setShowNotifyModal(false);
    setSuccessMessage('Notification sent successfully');
    setShowSuccessNotification(true);
    setTimeout(() => setShowSuccessNotification(false), 3000);
  };

  const assignDriver = (delivery: Delivery) => {
    setSelectedDelivery(delivery);
    setAgentName(delivery.agent);
    setShowAssignModal(true);
  };

  const confirmAssign = () => {
    if (selectedDelivery && agentName.trim()) {
      setDeliveries(deliveries.map(d => 
        d.id === selectedDelivery.id ? { ...d, agent: agentName } : d
      ));
      setShowAssignModal(false);
      setAgentName('');
      setSuccessMessage('Driver assigned successfully');
      setShowSuccessNotification(true);
      setTimeout(() => setShowSuccessNotification(false), 3000);
    }
  };

  return (
    <div className="size-full flex bg-[#EEF3FF]">
      <AdminSidebar activePage="delivery" onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminTopBar />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Delivery Management</h1>
            <p className="text-gray-500 mt-1">Track and manage all deliveries</p>
          </div>

          {/* Deliveries Table */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Agent
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Route
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {deliveries.map((delivery) => (
                    <tr key={delivery.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-semibold text-gray-800">{delivery.id}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-gray-700">{delivery.customer}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-gray-700">{delivery.agent}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-700">{delivery.from}</span>
                          <span className="text-gray-400">→</span>
                          <span className="text-gray-700">{delivery.to}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          delivery.status === 'Delivered'
                            ? 'bg-green-100 text-green-700'
                            : delivery.status === 'In Transit'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {delivery.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-semibold text-gray-800">BD {delivery.amount.toFixed(2)}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => notifyCustomer(delivery)}
                            className="px-3 py-2 text-xs font-semibold text-purple-600 hover:bg-purple-50 rounded-lg transition-colors flex items-center gap-1"
                          >
                            <Bell className="w-3 h-3" />
                            Notify Customer
                          </button>
                          <button 
                            onClick={() => assignDriver(delivery)}
                            className="px-3 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1"
                          >
                            <UserPlus className="w-3 h-3" />
                            Assign Driver
                          </button>
                          <button className="px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Notify Customer Modal */}
      {showNotifyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Bell className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Notify Customer</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Send delivery update notification to <span className="font-semibold">{selectedDelivery?.customer}</span> for order <span className="font-semibold">{selectedDelivery?.id}</span>?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowNotifyModal(false)}
                className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmNotify}
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-[#6C5CE7] to-[#A29BFE] text-white font-semibold hover:shadow-lg transition-all"
              >
                Send Notification
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Driver Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Assign Driver</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Assign a driver/agent to delivery <span className="font-semibold">{selectedDelivery?.id}</span>
            </p>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Agent Name
              </label>
              <input
                type="text"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                placeholder="Enter agent name"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowAssignModal(false)}
                className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmAssign}
                disabled={!agentName.trim()}
                className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${
                  agentName.trim()
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {showSuccessNotification && (
        <div className="fixed top-20 right-4 bg-[#2ECC71] text-white px-6 py-4 rounded-xl shadow-lg z-50 flex items-center gap-3 animate-slide-in">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <CheckCircle className="w-5 h-5" />
          </div>
          <p className="font-semibold">{successMessage}</p>
        </div>
      )}
    </div>
  );
}
