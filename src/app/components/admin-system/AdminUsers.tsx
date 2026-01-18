import { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopBar } from './AdminTopBar';
import { Eye, Ban, UserX, UserCheck, CheckCircle, ChevronDown, Filter, Search } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  status: 'Active' | 'Banned' | 'Suspended';
  trips: number;
}

interface AdminUsersProps {
  onNavigate: (page: 'dashboard' | 'users' | 'drivers' | 'trips' | 'delivery' | 'payments' | 'complaints' | 'violations' | 'reports' | 'notifications' | 'settings') => void;
}

export function AdminUsers({ onNavigate }: AdminUsersProps) {
  const [users, setUsers] = useState<User[]>([
    { id: 'U001', name: 'Sara Ahmed', email: 'sara@example.com', phone: '+973 3333 1111', city: 'Manama', status: 'Active', trips: 45 },
    { id: 'U002', name: 'Mohammed Ali', email: 'mohammed@example.com', phone: '+973 3333 2222', city: 'Muharraq', status: 'Active', trips: 32 },
    { id: 'U003', name: 'Noora Saleh', email: 'noora@example.com', phone: '+973 3333 3333', city: 'Riffa', status: 'Banned', trips: 12 },
    { id: 'U004', name: 'Khalid Ahmed', email: 'khalid@example.com', phone: '+973 3333 4444', city: 'Manama', status: 'Suspended', trips: 28 },
    { id: 'U005', name: 'Fatima Hassan', email: 'fatima@example.com', phone: '+973 3333 5555', city: 'Isa Town', status: 'Active', trips: 67 },
  ]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showBanModal, setShowBanModal] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Banned' | 'Suspended'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleBanToggle = (user: User) => {
    setSelectedUser(user);
    setShowBanModal(true);
  };

  const confirmBanToggle = () => {
    if (selectedUser) {
      const newStatus = selectedUser.status === 'Banned' ? 'Active' : 'Banned';
      setUsers(users.map(u => 
        u.id === selectedUser.id ? { ...u, status: newStatus } : u
      ));
      setShowBanModal(false);
      setSuccessMessage(`User ${newStatus === 'Banned' ? 'banned' : 'unbanned'} successfully`);
      setShowSuccessNotification(true);
      setTimeout(() => setShowSuccessNotification(false), 3000);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700';
      case 'Banned':
        return 'bg-red-100 text-red-700';
      case 'Suspended':
        return 'bg-orange-100 text-orange-700';
    }
  };

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'Active').length;
  const bannedUsers = users.filter(u => u.status === 'Banned').length;

  return (
    <div className="size-full flex bg-gradient-to-br from-gray-50 to-blue-50/30">
      <AdminSidebar activePage="users" onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminTopBar />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Users Management</h1>
            <p className="text-gray-500 text-lg">Manage and monitor all platform users</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                  <span className="text-2xl font-bold text-white">{totalUsers}</span>
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-semibold">Total Users</p>
                  <p className="text-2xl font-bold text-gray-800">{totalUsers}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md">
                  <span className="text-2xl font-bold text-white">{activeUsers}</span>
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-semibold">Active Users</p>
                  <p className="text-2xl font-bold text-gray-800">{activeUsers}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-md">
                  <span className="text-2xl font-bold text-white">{bannedUsers}</span>
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-semibold">Banned Users</p>
                  <p className="text-2xl font-bold text-gray-800">{bannedUsers}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
            <div className="flex items-center gap-4 flex-wrap">
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
                {(['All', 'Active', 'Banned', 'Suspended'] as const).map((status) => (
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
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200 sticky top-0">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      User ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      City
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
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-bold text-gray-800">{user.id}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="font-semibold text-gray-800">{user.name}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-gray-600">{user.email}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-gray-600">{user.phone}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-gray-600">{user.city}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                          {user.trips} trips
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="px-3 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            View
                          </button>
                          <button 
                            onClick={() => handleBanToggle(user)}
                            className={`px-3 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 ${
                              user.status === 'Banned'
                                ? 'text-green-600 hover:bg-green-50'
                                : 'text-red-600 hover:bg-red-50'
                            }`}
                          >
                            {user.status === 'Banned' ? (
                              <>
                                <UserCheck className="w-3 h-3" />
                                Unban
                              </>
                            ) : (
                              <>
                                <Ban className="w-3 h-3" />
                                Ban
                              </>
                            )}
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

      {/* Ban/Unban Modal */}
      {showBanModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-scaleIn">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${
                selectedUser.status === 'Banned' ? 'bg-gradient-to-br from-green-400 to-green-600' : 'bg-gradient-to-br from-red-400 to-red-600'
              }`}>
                {selectedUser.status === 'Banned' ? (
                  <UserCheck className="w-7 h-7 text-white" />
                ) : (
                  <Ban className="w-7 h-7 text-white" />
                )}
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                {selectedUser.status === 'Banned' ? 'Unban User' : 'Ban User'}
              </h3>
            </div>
            <p className="text-gray-600 mb-6 text-lg">
              {selectedUser.status === 'Banned' ? 'Unban' : 'Ban'} user <span className="font-bold">{selectedUser.name}</span>?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowBanModal(false)}
                className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmBanToggle}
                className={`flex-1 px-6 py-3 rounded-xl font-bold text-white hover:shadow-xl transition-all ${
                  selectedUser.status === 'Banned'
                    ? 'bg-gradient-to-r from-green-500 to-green-600'
                    : 'bg-gradient-to-r from-red-500 to-red-600'
                }`}
              >
                {selectedUser.status === 'Banned' ? 'Unban' : 'Ban'}
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
