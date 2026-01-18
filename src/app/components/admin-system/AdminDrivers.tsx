import { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopBar } from './AdminTopBar';
import { Eye, Ban, UserCheck, CheckCircle, Grid3x3, List, Search, Circle, AlertTriangle, Star } from 'lucide-react';

interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  car: string;
  plate: string;
  status: 'Online' | 'Offline' | 'Busy';
  rating: number;
  trips: number;
}

interface AdminDriversProps {
  onNavigate: (page: 'dashboard' | 'users' | 'drivers' | 'trips' | 'delivery' | 'payments' | 'complaints' | 'violations' | 'reports' | 'notifications' | 'settings') => void;
}

export function AdminDrivers({ onNavigate }: AdminDriversProps) {
  const [drivers, setDrivers] = useState<Driver[]>([
    { id: 'D001', name: 'Ahmed Al-Khalifa', email: 'ahmed@example.com', phone: '+973 3333 1111', car: 'Toyota Camry 2022', plate: '12345', status: 'Online', rating: 4.8, trips: 156 },
    { id: 'D002', name: 'Mohammed Saleh', email: 'mohammed@example.com', phone: '+973 3333 2222', car: 'Honda Accord 2021', plate: '67890', status: 'Busy', rating: 4.9, trips: 203 },
    { id: 'D003', name: 'Ali Hassan', email: 'ali@example.com', phone: '+973 3333 3333', car: 'Nissan Altima 2023', plate: '54321', status: 'Online', rating: 4.7, trips: 128 },
    { id: 'D004', name: 'Khalid Ahmed', email: 'khalid@example.com', phone: '+973 3333 4444', car: 'Hyundai Sonata 2022', plate: '98765', status: 'Offline', rating: 4.6, trips: 89 },
    { id: 'D005', name: 'Youssef Ali', email: 'youssef@example.com', phone: '+973 3333 5555', car: 'Kia Optima 2021', plate: '11223', status: 'Online', rating: 4.9, trips: 245 },
  ]);

  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Online' | 'Offline' | 'Busy'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSendWarning = (driver: Driver) => {
    setSelectedDriver(driver);
    setShowWarningModal(true);
  };

  const confirmSendWarning = () => {
    if (selectedDriver && warningMessage.trim()) {
      setShowWarningModal(false);
      setWarningMessage('');
      setSuccessMessage(`Warning sent to ${selectedDriver.name}`);
      setShowSuccessNotification(true);
      setTimeout(() => setShowSuccessNotification(false), 3000);
    }
  };

  const filteredDrivers = drivers.filter(driver => {
    const matchesStatus = statusFilter === 'All' || driver.status === statusFilter;
    const matchesSearch = driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         driver.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         driver.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: Driver['status']) => {
    switch (status) {
      case 'Online':
        return { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' };
      case 'Offline':
        return { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-500' };
      case 'Busy':
        return { bg: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-500' };
    }
  };

  const totalDrivers = drivers.length;
  const onlineDrivers = drivers.filter(d => d.status === 'Online').length;
  const busyDrivers = drivers.filter(d => d.status === 'Busy').length;

  return (
    <div className="size-full flex bg-gradient-to-br from-gray-50 to-blue-50/30">
      <AdminSidebar activePage="drivers" onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminTopBar />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Drivers Management</h1>
            <p className="text-gray-500 text-lg">Monitor and manage all platform drivers</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                  <span className="text-2xl font-bold text-white">{totalDrivers}</span>
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-semibold">Total Drivers</p>
                  <p className="text-2xl font-bold text-gray-800">{totalDrivers}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md">
                  <span className="text-2xl font-bold text-white">{onlineDrivers}</span>
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-semibold">Online Now</p>
                  <p className="text-2xl font-bold text-gray-800">{onlineDrivers}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md">
                  <span className="text-2xl font-bold text-white">{busyDrivers}</span>
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-semibold">Currently Busy</p>
                  <p className="text-2xl font-bold text-gray-800">{busyDrivers}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and View Toggle */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-4 flex-1">
                {/* Search */}
                <div className="flex-1 min-w-[300px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by name, email, or ID..."
                      className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#5B4FE5] focus:outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Status Filters */}
                <div className="flex gap-2">
                  {(['All', 'Online', 'Busy', 'Offline'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                        statusFilter === status
                          ? 'bg-gradient-to-r from-[#5B4FE5] to-[#7C6FFF] text-white shadow-lg'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="inline-flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                    viewMode === 'table'
                      ? 'bg-white text-gray-800 shadow-md'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <List className="w-4 h-4" />
                  <span className="text-sm font-bold">Table</span>
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                    viewMode === 'grid'
                      ? 'bg-white text-gray-800 shadow-md'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Grid3x3 className="w-4 h-4" />
                  <span className="text-sm font-bold">Grid</span>
                </button>
              </div>
            </div>
          </div>

          {/* Drivers Display */}
          {viewMode === 'table' ? (
            /* Table View */
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200 sticky top-0">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Driver ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Vehicle
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Rating
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Trips
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredDrivers.map((driver) => {
                      const statusColors = getStatusColor(driver.status);
                      return (
                        <tr key={driver.id} className="hover:bg-gray-50 transition-colors group">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="font-bold text-gray-800">{driver.id}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <p className="font-semibold text-gray-800">{driver.name}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-gray-600 text-sm">{driver.email}</p>
                            <p className="text-gray-500 text-xs">{driver.phone}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-gray-800 font-semibold text-sm">{driver.car}</p>
                            <p className="text-gray-500 text-xs">Plate: {driver.plate}</p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              <span className="font-bold text-gray-800">{driver.rating}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                              {driver.trips} trips
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <Circle className={`w-2 h-2 ${statusColors.dot} ${driver.status === 'Online' ? 'animate-pulse' : ''}`} />
                              <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${statusColors.bg} ${statusColors.text}`}>
                                {driver.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="px-3 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                View
                              </button>
                              <button 
                                onClick={() => handleSendWarning(driver)}
                                className="px-3 py-2 text-xs font-bold text-orange-600 hover:bg-orange-50 rounded-lg transition-colors flex items-center gap-1"
                              >
                                <AlertTriangle className="w-3 h-3" />
                                Warn
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDrivers.map((driver) => {
                const statusColors = getStatusColor(driver.status);
                return (
                  <div
                    key={driver.id}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all group"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#5B4FE5] to-[#7C6FFF] flex items-center justify-center shadow-md">
                          <span className="text-white font-bold text-lg">{driver.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div>
                          <p className="font-bold text-gray-800">{driver.name}</p>
                          <p className="text-xs text-gray-500">{driver.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Circle className={`w-2 h-2 ${statusColors.dot} ${driver.status === 'Online' ? 'animate-pulse' : ''}`} />
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors.bg} ${statusColors.text}`}>
                          {driver.status}
                        </span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Rating</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-bold text-gray-800">{driver.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Trips</span>
                        <span className="font-bold text-gray-800">{driver.trips}</span>
                      </div>
                      <div className="pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">Vehicle</p>
                        <p className="text-sm font-semibold text-gray-800">{driver.car}</p>
                        <p className="text-xs text-gray-500">Plate: {driver.plate}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="flex-1 px-3 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        View Profile
                      </button>
                      <button 
                        onClick={() => handleSendWarning(driver)}
                        className="flex-1 px-3 py-2 text-xs font-bold text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                      >
                        Send Warning
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* Warning Modal */}
      {showWarningModal && selectedDriver && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-scaleIn">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br from-orange-400 to-orange-600">
                <AlertTriangle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Send Warning</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Send warning to driver <span className="font-bold">{selectedDriver.name}</span>
            </p>
            <textarea
              value={warningMessage}
              onChange={(e) => setWarningMessage(e.target.value)}
              placeholder="Enter warning message..."
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#5B4FE5] focus:outline-none text-sm mb-6 min-h-[120px]"
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowWarningModal(false);
                  setWarningMessage('');
                }}
                className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmSendWarning}
                disabled={!warningMessage.trim()}
                className={`flex-1 px-6 py-3 rounded-xl font-bold text-white transition-all ${
                  warningMessage.trim()
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-xl'
                    : 'bg-gray-300 cursor-not-allowed'
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
        <div className="fixed top-20 right-4 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] text-white px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3 animate-slideIn">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <CheckCircle className="w-5 h-5" />
          </div>
          <p className="font-bold text-lg">{successMessage}</p>
        </div>
      )}

      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
