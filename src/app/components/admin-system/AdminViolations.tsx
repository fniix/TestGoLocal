import { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopBar } from './AdminTopBar';
import { AlertTriangle, UserX, UserCheck, Send, ChevronDown, CheckCircle } from 'lucide-react';

interface Violation {
  id: string;
  user: string;
  userType: 'User' | 'Driver';
  type: string;
  description: string;
  status: 'Open' | 'Resolved';
  date: string;
  suspended: boolean;
}

interface AdminViolationsProps {
  onNavigate: (page: 'dashboard' | 'users' | 'drivers' | 'trips' | 'delivery' | 'payments' | 'complaints' | 'violations' | 'reports' | 'notifications' | 'settings') => void;
}

export function AdminViolations({ onNavigate }: AdminViolationsProps) {
  const [violations, setViolations] = useState<Violation[]>([
    { id: 'V001', user: 'Ahmed Al-Khalifa', userType: 'Driver', type: 'Speeding', description: 'Exceeded speed limit by 40 km/h', status: 'Open', date: '2024-01-15', suspended: false },
    { id: 'V002', user: 'Sara Ahmed', userType: 'User', type: 'Payment Fraud', description: 'Multiple failed payment attempts', status: 'Open', date: '2024-01-14', suspended: true },
    { id: 'V003', user: 'Mohammed Saleh', userType: 'Driver', type: 'Route Violation', description: 'Did not follow designated route', status: 'Resolved', date: '2024-01-13', suspended: false },
    { id: 'V004', user: 'Noora Ali', userType: 'Driver', type: 'Customer Complaint', description: 'Rude behavior with customer', status: 'Open', date: '2024-01-15', suspended: false },
  ]);

  const [selectedViolation, setSelectedViolation] = useState<Violation | null>(null);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [newStatus, setNewStatus] = useState<'Open' | 'Resolved'>('Open');
  const [warningMessage, setWarningMessage] = useState('');
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSuspendToggle = (violation: Violation) => {
    setSelectedViolation(violation);
    setShowSuspendModal(true);
  };

  const confirmSuspendToggle = () => {
    if (selectedViolation) {
      setViolations(violations.map(v => 
        v.id === selectedViolation.id 
          ? { ...v, suspended: !v.suspended }
          : v
      ));
      setShowSuspendModal(false);
      setSuccessMessage(`${selectedViolation.userType} ${selectedViolation.suspended ? 'unsuspended' : 'suspended'} successfully`);
      setShowSuccessNotification(true);
      setTimeout(() => setShowSuccessNotification(false), 3000);
      setSelectedViolation(null);
    }
  };

  const handleChangeStatus = (violation: Violation) => {
    setSelectedViolation(violation);
    setNewStatus(violation.status);
    setShowStatusModal(true);
  };

  const confirmStatusChange = () => {
    if (selectedViolation) {
      setViolations(violations.map(v => 
        v.id === selectedViolation.id ? { ...v, status: newStatus } : v
      ));
      setShowStatusModal(false);
      setSuccessMessage('Violation status updated successfully');
      setShowSuccessNotification(true);
      setTimeout(() => setShowSuccessNotification(false), 3000);
      setSelectedViolation(null);
    }
  };

  const handleSendWarning = (violation: Violation) => {
    setSelectedViolation(violation);
    setWarningMessage('');
    setShowWarningModal(true);
  };

  const confirmSendWarning = () => {
    if (selectedViolation && warningMessage.trim()) {
      setShowWarningModal(false);
      setSuccessMessage(`Warning sent to ${selectedViolation.user} successfully`);
      setShowSuccessNotification(true);
      setTimeout(() => setShowSuccessNotification(false), 3000);
      setWarningMessage('');
      setSelectedViolation(null);
    }
  };

  return (
    <div className="size-full flex bg-[#EEF3FF]">
      <AdminSidebar activePage="violations" onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminTopBar />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Violations Management</h1>
            <p className="text-gray-500 mt-1">Monitor and manage platform violations</p>
          </div>

          {/* Violations Table */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Violation ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      User Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Account
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {violations.map((violation) => (
                    <tr key={violation.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-semibold text-gray-800">{violation.id}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-gray-700">{violation.user}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          violation.userType === 'Driver' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          {violation.userType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                          {violation.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-700 max-w-xs truncate">{violation.description}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          violation.status === 'Open'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {violation.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          violation.suspended
                            ? 'bg-red-100 text-red-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {violation.suspended ? 'Suspended' : 'Active'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleSuspendToggle(violation)}
                            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
                              violation.suspended
                                ? 'text-green-600 hover:bg-green-50'
                                : 'text-red-600 hover:bg-red-50'
                            }`}
                          >
                            {violation.suspended ? (
                              <>
                                <UserCheck className="w-3 h-3" />
                                Unsuspend
                              </>
                            ) : (
                              <>
                                <UserX className="w-3 h-3" />
                                Suspend
                              </>
                            )}
                          </button>
                          <button 
                            onClick={() => handleChangeStatus(violation)}
                            className="px-3 py-2 text-xs font-semibold text-purple-600 hover:bg-purple-50 rounded-lg transition-colors flex items-center gap-1"
                          >
                            <ChevronDown className="w-3 h-3" />
                            Change Status
                          </button>
                          <button 
                            onClick={() => handleSendWarning(violation)}
                            className="px-3 py-2 text-xs font-semibold text-orange-600 hover:bg-orange-50 rounded-lg transition-colors flex items-center gap-1"
                          >
                            <Send className="w-3 h-3" />
                            Send Warning
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

      {/* Suspend Modal */}
      {showSuspendModal && selectedViolation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                selectedViolation.suspended ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {selectedViolation.suspended ? (
                  <UserCheck className="w-6 h-6 text-green-600" />
                ) : (
                  <UserX className="w-6 h-6 text-red-600" />
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                {selectedViolation.suspended ? 'Unsuspend' : 'Suspend'} {selectedViolation.userType}
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              {selectedViolation.suspended ? 'Unsuspend' : 'Suspend'} <span className="font-semibold">{selectedViolation.user}</span> due to violation <span className="font-semibold">{selectedViolation.id}</span>?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSuspendModal(false)}
                className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmSuspendToggle}
                className={`flex-1 px-4 py-3 rounded-xl font-semibold hover:shadow-lg transition-all ${
                  selectedViolation.suspended
                    ? 'bg-gradient-to-r from-green-600 to-green-500 text-white'
                    : 'bg-gradient-to-r from-red-600 to-red-500 text-white'
                }`}
              >
                {selectedViolation.suspended ? 'Unsuspend' : 'Suspend'}
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
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <ChevronDown className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Change Violation Status</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Update status for violation <span className="font-semibold">{selectedViolation?.id}</span>
            </p>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Status
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as 'Open' | 'Resolved')}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-gray-700 font-semibold"
              >
                <option value="Open">Open</option>
                <option value="Resolved">Resolved</option>
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
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-[#6C5CE7] to-[#A29BFE] text-white font-semibold hover:shadow-lg transition-all"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Send Warning Modal */}
      {showWarningModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Send Warning</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Send warning notification to <span className="font-semibold">{selectedViolation?.user}</span> regarding violation <span className="font-semibold">{selectedViolation?.id}</span>
            </p>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Warning Message
              </label>
              <textarea
                value={warningMessage}
                onChange={(e) => setWarningMessage(e.target.value)}
                className="w-full h-32 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none resize-none"
                placeholder="Enter warning message..."
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowWarningModal(false)}
                className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmSendWarning}
                disabled={!warningMessage.trim()}
                className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${
                  warningMessage.trim()
                    ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Send Warning
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
