import { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopBar } from './AdminTopBar';
import { Eye, UserPlus, CheckCircle, ChevronDown } from 'lucide-react';

interface Trip {
  id: string;
  driver: string;
  passenger: string;
  from: string;
  to: string;
  status: 'Ongoing' | 'Completed' | 'Cancelled';
  amount: number;
}

interface AdminTripsProps {
  onNavigate: (page: 'dashboard' | 'users' | 'drivers' | 'trips' | 'delivery' | 'payments' | 'complaints' | 'violations' | 'reports' | 'notifications' | 'settings') => void;
}

export function AdminTrips({ onNavigate }: AdminTripsProps) {
  const [activeTab, setActiveTab] = useState<'Ongoing' | 'Completed' | 'Cancelled'>('Ongoing');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [newStatus, setNewStatus] = useState<'Ongoing' | 'Completed' | 'Cancelled'>('Ongoing');
  const [driverName, setDriverName] = useState('');
  
  const [trips, setTrips] = useState<Trip[]>([
    { id: 'T001', driver: 'Ahmed Al-Khalifa', passenger: 'Sara Ahmed', from: 'Manama', to: 'Riffa', status: 'Ongoing', amount: 7.5 },
    { id: 'T002', driver: 'Ali Hassan', passenger: 'Mohammed Ali', from: 'Muharraq', to: 'Sitra', status: 'Ongoing', amount: 5.2 },
    { id: 'T003', driver: 'Fatima Ahmed', passenger: 'Noora Saleh', from: 'Isa Town', to: 'Manama', status: 'Completed', amount: 8.3 },
    { id: 'T004', driver: 'Mohammed Saleh', passenger: 'Khalid Ahmed', from: 'Hamad Town', to: 'Riffa', status: 'Completed', amount: 6.8 },
    { id: 'T005', driver: 'Sara Mohammed', passenger: 'Maryam Ali', from: 'Manama', to: 'Muharraq', status: 'Cancelled', amount: 4.5 },
  ]);

  const filteredTrips = trips.filter(trip => trip.status === activeTab);

  const ongoingCount = trips.filter(t => t.status === 'Ongoing').length;
  const completedCount = trips.filter(t => t.status === 'Completed').length;
  const cancelledCount = trips.filter(t => t.status === 'Cancelled').length;

  const handleStatusChange = (trip: Trip) => {
    setSelectedTrip(trip);
    setNewStatus(trip.status);
    setShowStatusModal(true);
  };

  const confirmStatusChange = () => {
    if (selectedTrip) {
      setTrips(trips.map(trip => 
        trip.id === selectedTrip.id ? { ...trip, status: newStatus } : trip
      ));
      setShowStatusModal(false);
      setSelectedTrip(null);
    }
  };

  const handleAssignDriver = (trip: Trip) => {
    setSelectedTrip(trip);
    setDriverName(trip.driver);
    setShowAssignModal(true);
  };

  const confirmAssignDriver = () => {
    if (selectedTrip && driverName.trim()) {
      setTrips(trips.map(trip => 
        trip.id === selectedTrip.id ? { ...trip, driver: driverName } : trip
      ));
      setShowAssignModal(false);
      setSelectedTrip(null);
      setDriverName('');
    }
  };

  return (
    <div className="size-full flex bg-[#EEF3FF]">
      <AdminSidebar activePage="trips" onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminTopBar />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Trip Management</h1>
            <p className="text-gray-500 mt-1">Monitor and manage all trips</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setActiveTab('Ongoing')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'Ongoing'
                  ? 'bg-gradient-to-r from-[#6C5CE7] to-[#A29BFE] text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              Ongoing ({ongoingCount})
            </button>
            <button
              onClick={() => setActiveTab('Completed')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'Completed'
                  ? 'bg-gradient-to-r from-[#6C5CE7] to-[#A29BFE] text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              Completed ({completedCount})
            </button>
            <button
              onClick={() => setActiveTab('Cancelled')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'Cancelled'
                  ? 'bg-gradient-to-r from-[#6C5CE7] to-[#A29BFE] text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              Cancelled ({cancelledCount})
            </button>
          </div>

          {/* Trips Table */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Trip ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Driver
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Passenger
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Route
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
                  {filteredTrips.map((trip) => (
                    <tr key={trip.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-semibold text-gray-800">{trip.id}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-gray-700">{trip.driver}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-gray-700">{trip.passenger}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-700">{trip.from}</span>
                          <span className="text-gray-400">→</span>
                          <span className="text-gray-700">{trip.to}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-semibold text-gray-800">BD {trip.amount.toFixed(2)}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleStatusChange(trip)}
                            className="px-3 py-2 text-xs font-semibold text-purple-600 hover:bg-purple-50 rounded-lg transition-colors flex items-center gap-1"
                          >
                            <ChevronDown className="w-3 h-3" />
                            Change Status
                          </button>
                          <button 
                            onClick={() => handleAssignDriver(trip)}
                            className="px-3 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1"
                          >
                            <UserPlus className="w-3 h-3" />
                            Assign Driver
                          </button>
                          <button className="px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            View Trip
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

      {/* Change Status Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Change Trip Status</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Update status for trip <span className="font-semibold">{selectedTrip?.id}</span>
            </p>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Status
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as any)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-gray-700 font-semibold"
              >
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
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
              Assign a driver to trip <span className="font-semibold">{selectedTrip?.id}</span>
            </p>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Driver Name
              </label>
              <input
                type="text"
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
                placeholder="Enter driver name"
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
                onClick={confirmAssignDriver}
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:shadow-lg transition-all"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
