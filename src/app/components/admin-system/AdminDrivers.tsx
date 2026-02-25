import { useEffect, useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopBar } from './AdminTopBar';
import { CheckCircle, Pencil, Search, Trash2 } from 'lucide-react';
import { deleteDriver, listenForAllDrivers, updateDriverByAdmin, updateDriverStatus } from '../../../services/firebaseService';

interface Driver {
  id: string;
  name: string;
  phone: string;
  carType: string;
  status: 'available' | 'busy' | 'offline';
  location: string;
}

interface AdminDriversProps {
  onNavigate: (page: 'dashboard' | 'users' | 'drivers' | 'trips' | 'delivery' | 'payments' | 'complaints' | 'violations' | 'reports' | 'notifications' | 'settings') => void;
}

export function AdminDrivers({ onNavigate }: AdminDriversProps) {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    phone: '',
    carType: '',
    status: 'offline' as 'available' | 'busy' | 'offline',
    lat: '',
    lng: '',
  });

  useEffect(() => {
    const unsubscribe = listenForAllDrivers(
      (items) => {
        const mapped: Driver[] = items.map((item) => ({
          id: item.driverId,
          name: item.name,
          phone: item.phone,
          carType: item.carType,
          status: item.status,
          location: `${item.currentLocation?.lat ?? 'N/A'}, ${item.currentLocation?.lng ?? 'N/A'}`,
        }));
        setDrivers(mapped);
        setLoading(false);
      },
      (error) => {
        console.error('Error loading drivers:', error);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  const filteredDrivers = drivers.filter((driver) => {
    const q = searchQuery.toLowerCase();
    return driver.name.toLowerCase().includes(q) || driver.id.toLowerCase().includes(q);
  });

  const openEditModal = (driver: Driver) => {
    const [lat, lng] = driver.location.split(',').map((v) => v.trim());
    setEditingDriver(driver);
    setEditForm({
      name: driver.name,
      phone: driver.phone,
      carType: driver.carType,
      status: driver.status,
      lat: lat === 'N/A' ? '' : lat,
      lng: lng === 'N/A' ? '' : lng,
    });
  };

  const handleStatusChange = async (driver: Driver) => {
    const nextStatus = driver.status === 'available' ? 'offline' : 'available';
    try {
      await updateDriverStatus(driver.id, nextStatus);
      setSuccessMessage(`Driver status updated to ${nextStatus}`);
      setShowSuccessNotification(true);
      setTimeout(() => setShowSuccessNotification(false), 3000);
    } catch (error) {
      console.error('Failed to update driver status:', error);
      alert('Failed to update driver status');
    }
  };

  const handleUpdateDriver = async () => {
    if (!editingDriver) return;
    try {
      await updateDriverByAdmin(editingDriver.id, {
        name: editForm.name,
        phone: editForm.phone,
        carType: editForm.carType,
        status: editForm.status,
        currentLocation: {
          lat: Number(editForm.lat) || 0,
          lng: Number(editForm.lng) || 0,
        },
      });
      setEditingDriver(null);
      setSuccessMessage('Driver updated successfully');
      setShowSuccessNotification(true);
      setTimeout(() => setShowSuccessNotification(false), 3000);
    } catch (error) {
      console.error('Failed to update driver:', error);
      alert('Failed to update driver');
    }
  };

  const handleDeleteDriver = async (driver: Driver) => {
    if (!confirm(`Delete driver ${driver.name}?`)) return;
    try {
      await deleteDriver(driver.id);
      setSuccessMessage('Driver deleted successfully');
      setShowSuccessNotification(true);
      setTimeout(() => setShowSuccessNotification(false), 3000);
    } catch (error) {
      console.error('Failed to delete driver:', error);
      alert('Failed to delete driver');
    }
  };

  return (
    <div className="size-full flex bg-gradient-to-br from-gray-50 to-blue-50/30">
      <AdminSidebar activePage="drivers" onNavigate={onNavigate} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminTopBar />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Drivers Management</h1>
            <p className="text-gray-500 text-lg">Real-time drivers list from Firestore</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or driver ID..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#5B4FE5] focus:outline-none text-sm"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Phone</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Car Type</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Location</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-500">Loading drivers...</td>
                    </tr>
                  ) : filteredDrivers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No drivers found.</td>
                    </tr>
                  ) : (
                    filteredDrivers.map((driver) => (
                      <tr key={driver.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">{driver.name}</td>
                        <td className="px-6 py-4">{driver.phone}</td>
                        <td className="px-6 py-4">{driver.carType}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                            {driver.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">{driver.location}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEditModal(driver)}
                              className="px-3 py-2 text-xs font-bold text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors flex items-center gap-1"
                            >
                              <Pencil className="w-3 h-3" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleStatusChange(driver)}
                              className="px-3 py-2 text-xs font-bold text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                            >
                              Toggle Status
                            </button>
                            <button
                              onClick={() => handleDeleteDriver(driver)}
                              className="px-3 py-2 text-xs font-bold text-red-700 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1"
                            >
                              <Trash2 className="w-3 h-3" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {editingDriver && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Edit Driver</h3>
            <div className="space-y-3">
              <input value={editForm.name} onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))} className="w-full px-4 py-3 border rounded-xl" placeholder="Name" />
              <input value={editForm.phone} onChange={(e) => setEditForm((prev) => ({ ...prev, phone: e.target.value }))} className="w-full px-4 py-3 border rounded-xl" placeholder="Phone" />
              <input value={editForm.carType} onChange={(e) => setEditForm((prev) => ({ ...prev, carType: e.target.value }))} className="w-full px-4 py-3 border rounded-xl" placeholder="Car type" />
              <select
                value={editForm.status}
                onChange={(e) => setEditForm((prev) => ({ ...prev, status: e.target.value as 'available' | 'busy' | 'offline' }))}
                className="w-full px-4 py-3 border rounded-xl"
              >
                <option value="available">available</option>
                <option value="busy">busy</option>
                <option value="offline">offline</option>
              </select>
              <div className="grid grid-cols-2 gap-3">
                <input value={editForm.lat} onChange={(e) => setEditForm((prev) => ({ ...prev, lat: e.target.value }))} className="w-full px-4 py-3 border rounded-xl" placeholder="Latitude" />
                <input value={editForm.lng} onChange={(e) => setEditForm((prev) => ({ ...prev, lng: e.target.value }))} className="w-full px-4 py-3 border rounded-xl" placeholder="Longitude" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setEditingDriver(null)} className="flex-1 px-4 py-3 border rounded-xl">Cancel</button>
              <button onClick={handleUpdateDriver} className="flex-1 px-4 py-3 rounded-xl bg-indigo-600 text-white">Save</button>
            </div>
          </div>
        </div>
      )}

      {showSuccessNotification && (
        <div className="fixed top-20 right-4 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] text-white px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <CheckCircle className="w-5 h-5" />
          </div>
          <p className="font-bold text-lg">{successMessage}</p>
        </div>
      )}
    </div>
  );
}
