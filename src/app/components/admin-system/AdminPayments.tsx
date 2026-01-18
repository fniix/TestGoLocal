import { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopBar } from './AdminTopBar';
import { Eye, RefreshCw, ChevronDown, CheckCircle, XCircle, DollarSign, Clock } from 'lucide-react';

interface Payment {
  id: string;
  user: string;
  amount: number;
  status: 'Successful' | 'Failed' | 'Refunded' | 'Under Review';
  date: string;
  type: string;
}

interface AdminPaymentsProps {
  onNavigate: (page: 'dashboard' | 'users' | 'drivers' | 'trips' | 'delivery' | 'payments' | 'complaints' | 'violations' | 'reports' | 'notifications' | 'settings') => void;
}

export function AdminPayments({ onNavigate }: AdminPaymentsProps) {
  const [payments, setPayments] = useState<Payment[]>([
    { id: 'PAY001', user: 'Sara Ahmed', amount: 7.5, status: 'Successful', date: '2024-01-15', type: 'Trip' },
    { id: 'PAY002', user: 'Mohammed Ali', amount: 12.3, status: 'Failed', date: '2024-01-15', type: 'Delivery' },
    { id: 'PAY003', user: 'Noora Saleh', amount: 8.0, status: 'Refunded', date: '2024-01-14', type: 'Trip' },
    { id: 'PAY004', user: 'Khalid Ahmed', amount: 15.5, status: 'Under Review', date: '2024-01-14', type: 'Delivery' },
    { id: 'PAY005', user: 'Fatima Hassan', amount: 5.2, status: 'Successful', date: '2024-01-13', type: 'Trip' },
    { id: 'PAY006', user: 'Ali Mohammed', amount: 10.0, status: 'Refunded', date: '2024-01-13', type: 'Delivery' },
  ]);

  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState<Payment['status']>('Successful');
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleRefund = (payment: Payment) => {
    setSelectedPayment(payment);
    setShowRefundModal(true);
  };

  const confirmRefund = () => {
    if (selectedPayment) {
      setPayments(payments.map(p => 
        p.id === selectedPayment.id ? { ...p, status: 'Refunded' } : p
      ));
      setShowRefundModal(false);
      setSuccessMessage('Payment refunded successfully');
      setShowSuccessNotification(true);
      setTimeout(() => setShowSuccessNotification(false), 3000);
    }
  };

  const handleChangeStatus = (payment: Payment) => {
    setSelectedPayment(payment);
    setNewStatus(payment.status);
    setShowStatusModal(true);
  };

  const confirmStatusChange = () => {
    if (selectedPayment) {
      setPayments(payments.map(p => 
        p.id === selectedPayment.id ? { ...p, status: newStatus } : p
      ));
      setShowStatusModal(false);
      setSuccessMessage('Payment status updated successfully');
      setShowSuccessNotification(true);
      setTimeout(() => setShowSuccessNotification(false), 3000);
    }
  };

  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'Successful':
        return 'bg-green-100 text-green-700';
      case 'Failed':
        return 'bg-red-100 text-red-700';
      case 'Refunded':
        return 'bg-purple-100 text-purple-700';
      case 'Under Review':
        return 'bg-orange-100 text-orange-700';
    }
  };

  const totalPaid = payments.filter(p => p.status === 'Successful').reduce((acc, p) => acc + p.amount, 0);
  const totalPending = payments.filter(p => p.status === 'Under Review').reduce((acc, p) => acc + p.amount, 0);
  const totalRefunded = payments.filter(p => p.status === 'Refunded').reduce((acc, p) => acc + p.amount, 0);

  return (
    <div className="size-full flex bg-gradient-to-br from-gray-50 to-blue-50/30">
      <AdminSidebar activePage="payments" onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminTopBar />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Payments</h1>
            <p className="text-gray-500 text-lg">Manage transactions and refunds</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md">
                  <DollarSign className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-semibold">Total Paid</p>
                  <p className="text-2xl font-bold text-gray-800">{totalPaid.toFixed(2)} BD</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-semibold">Pending</p>
                  <p className="text-2xl font-bold text-gray-800">{totalPending.toFixed(2)} BD</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#5B4FE5] to-[#7C6FFF] flex items-center justify-center shadow-md">
                  <RefreshCw className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-semibold">Refunded</p>
                  <p className="text-2xl font-bold text-gray-800">{totalRefunded.toFixed(2)} BD</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payments Table */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Payment ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {payments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-semibold text-gray-800">{payment.id}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-gray-700">{payment.user}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-gray-700">{payment.type}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          <span className="font-semibold text-gray-800">BD {payment.amount.toFixed(2)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-gray-700">{payment.date}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleRefund(payment)}
                            disabled={payment.status === 'Refunded'}
                            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
                              payment.status === 'Refunded'
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-purple-600 hover:bg-purple-50'
                            }`}
                          >
                            <RefreshCw className="w-3 h-3" />
                            Refund
                          </button>
                          <button 
                            onClick={() => handleChangeStatus(payment)}
                            className="px-3 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1"
                          >
                            <ChevronDown className="w-3 h-3" />
                            Change Status
                          </button>
                          <button className="px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            View Details
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

      {/* Refund Modal */}
      {showRefundModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Refund Payment</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Process refund for payment <span className="font-semibold">{selectedPayment?.id}</span> of <span className="font-semibold">BD {selectedPayment?.amount.toFixed(2)}</span> to <span className="font-semibold">{selectedPayment?.user}</span>?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowRefundModal(false)}
                className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmRefund}
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-[#6C5CE7] to-[#A29BFE] text-white font-semibold hover:shadow-lg transition-all"
              >
                Process Refund
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Status Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <ChevronDown className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Change Payment Status</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Update status for payment <span className="font-semibold">{selectedPayment?.id}</span>
            </p>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Status
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as Payment['status'])}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-gray-700 font-semibold"
              >
                <option value="Successful">Successful</option>
                <option value="Failed">Failed</option>
                <option value="Refunded">Refunded</option>
                <option value="Under Review">Under Review</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowStatusModal(false)}
                className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmStatusChange}
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:shadow-lg transition-all"
              >
                Update Status
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