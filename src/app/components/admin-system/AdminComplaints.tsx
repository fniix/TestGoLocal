import { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopBar } from './AdminTopBar';
import { Eye, MessageSquare, X, RefreshCw, Edit, CheckCircle } from 'lucide-react';

interface Comment {
  id: string;
  text: string;
  timestamp: string;
}

interface Complaint {
  id: string;
  user: string;
  type: 'Service Quality' | 'Payment Issue' | 'Driver Behavior' | 'App Issue';
  description: string;
  status: 'Pending' | 'In Process' | 'Resolved';
  date: string;
  comments: Comment[];
}

interface AdminComplaintsProps {
  onNavigate: (page: 'dashboard' | 'users' | 'drivers' | 'trips' | 'delivery' | 'payments' | 'complaints' | 'violations' | 'reports' | 'notifications' | 'settings') => void;
}

export function AdminComplaints({ onNavigate }: AdminComplaintsProps) {
  const [complaints, setComplaints] = useState<Complaint[]>([
    { 
      id: 'C001', 
      user: 'Sara Ahmed', 
      type: 'Service Quality', 
      description: 'Driver was late by 20 minutes', 
      status: 'Pending', 
      date: '2024-01-15',
      comments: []
    },
    { 
      id: 'C002', 
      user: 'Mohammed Ali', 
      type: 'Payment Issue', 
      description: 'Was charged twice for same trip', 
      status: 'In Process', 
      date: '2024-01-14',
      comments: [{ id: '1', text: 'Investigating the duplicate charge', timestamp: '10:30 AM' }]
    },
    { 
      id: 'C003', 
      user: 'Noora Saleh', 
      type: 'Driver Behavior', 
      description: 'Driver was rude and unprofessional', 
      status: 'Resolved', 
      date: '2024-01-13',
      comments: [
        { id: '1', text: 'Driver has been warned', timestamp: '9:00 AM' },
        { id: '2', text: 'Issue resolved with customer', timestamp: '11:30 AM' }
      ]
    },
    { 
      id: 'C004', 
      user: 'Khalid Ahmed', 
      type: 'App Issue', 
      description: 'App crashed during booking', 
      status: 'Pending', 
      date: '2024-01-15',
      comments: []
    },
  ]);

  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [newType, setNewType] = useState<Complaint['type']>('Service Quality');
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddComment = () => {
    if (selectedComplaint && newComment.trim()) {
      const now = new Date();
      const timestamp = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
      
      const newCommentObj: Comment = {
        id: Date.now().toString(),
        text: newComment,
        timestamp: timestamp
      };

      setComplaints(complaints.map(c => 
        c.id === selectedComplaint.id 
          ? { ...c, comments: [...c.comments, newCommentObj] }
          : c
      ));

      setNewComment('');
      setSuccessMessage('Comment added successfully');
      setShowSuccessNotification(true);
      setTimeout(() => setShowSuccessNotification(false), 2000);
    }
  };

  const handleCloseComplaint = () => {
    if (selectedComplaint) {
      setComplaints(complaints.map(c => 
        c.id === selectedComplaint.id ? { ...c, status: 'Resolved' } : c
      ));
      setShowViewModal(false);
      setSuccessMessage('Complaint closed successfully');
      setShowSuccessNotification(true);
      setTimeout(() => setShowSuccessNotification(false), 2000);
    }
  };

  const handleReopenComplaint = (complaint: Complaint) => {
    setComplaints(complaints.map(c => 
      c.id === complaint.id ? { ...c, status: 'In Process' } : c
    ));
    setSuccessMessage('Complaint reopened and status changed to In Process');
    setShowSuccessNotification(true);
    setTimeout(() => setShowSuccessNotification(false), 2000);
  };

  const handleChangeType = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setNewType(complaint.type);
    setShowTypeModal(true);
  };

  const confirmTypeChange = () => {
    if (selectedComplaint) {
      setComplaints(complaints.map(c => 
        c.id === selectedComplaint.id ? { ...c, type: newType } : c
      ));
      setShowTypeModal(false);
      setSuccessMessage('Complaint type updated successfully');
      setShowSuccessNotification(true);
      setTimeout(() => setShowSuccessNotification(false), 2000);
    }
  };

  const handleViewComplaint = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setNewComment('');
    setShowViewModal(true);
  };

  const getStatusColor = (status: Complaint['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-orange-100 text-orange-700';
      case 'In Process':
        return 'bg-blue-100 text-blue-700';
      case 'Resolved':
        return 'bg-green-100 text-green-700';
    }
  };

  return (
    <div className="size-full flex bg-[#EEF3FF]">
      <AdminSidebar activePage="complaints" onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminTopBar />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Complaints Management</h1>
            <p className="text-gray-500 mt-1">Handle and resolve customer complaints</p>
          </div>

          {/* Complaints Table */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Complaint ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      User
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
                      Date
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {complaints.map((complaint) => (
                    <tr key={complaint.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-semibold text-gray-800">{complaint.id}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-gray-700">{complaint.user}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                          {complaint.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-700 max-w-xs truncate">{complaint.description}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(complaint.status)}`}>
                          {complaint.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-gray-700">{complaint.date}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleViewComplaint(complaint)}
                            className="px-3 py-2 text-xs font-semibold text-purple-600 hover:bg-purple-50 rounded-lg transition-colors flex items-center gap-1"
                          >
                            <Eye className="w-3 h-3" />
                            View
                          </button>
                          {complaint.status === 'Resolved' && (
                            <button 
                              onClick={() => handleReopenComplaint(complaint)}
                              className="px-3 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1"
                            >
                              <RefreshCw className="w-3 h-3" />
                              Reopen
                            </button>
                          )}
                          <button 
                            onClick={() => handleChangeType(complaint)}
                            className="px-3 py-2 text-xs font-semibold text-orange-600 hover:bg-orange-50 rounded-lg transition-colors flex items-center gap-1"
                          >
                            <Edit className="w-3 h-3" />
                            Change Type
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

      {/* View Complaint Modal */}
      {showViewModal && selectedComplaint && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Complaint Details</h3>
                  <p className="text-sm text-gray-500">{selectedComplaint.id}</p>
                </div>
              </div>
              <button 
                onClick={() => setShowViewModal(false)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-600">User</p>
                  <p className="text-gray-800">{selectedComplaint.user}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Type</p>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                    {selectedComplaint.type}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Status</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedComplaint.status)}`}>
                    {selectedComplaint.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Date</p>
                  <p className="text-gray-800">{selectedComplaint.date}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-2">Description</p>
                <p className="text-gray-800 bg-gray-50 p-4 rounded-xl">{selectedComplaint.description}</p>
              </div>

              {/* Comments Section */}
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-3">Comments ({selectedComplaint.comments.length})</p>
                <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
                  {selectedComplaint.comments.map((comment) => (
                    <div key={comment.id} className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-gray-800 text-sm">{comment.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{comment.timestamp}</p>
                    </div>
                  ))}
                </div>
                
                {/* Add Comment */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                  />
                  <button
                    onClick={handleAddComment}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#6C5CE7] to-[#A29BFE] text-white font-semibold hover:shadow-lg transition-all"
                  >
                    <MessageSquare className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowViewModal(false)}
                className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
              >
                Close
              </button>
              {selectedComplaint.status !== 'Resolved' && (
                <button
                  onClick={handleCloseComplaint}
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold hover:shadow-lg transition-all"
                >
                  Close Complaint
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Change Type Modal */}
      {showTypeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Edit className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Change Complaint Type</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Update type for complaint <span className="font-semibold">{selectedComplaint?.id}</span>
            </p>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Type
              </label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as Complaint['type'])}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none text-gray-700 font-semibold"
              >
                <option value="Service Quality">Service Quality</option>
                <option value="Payment Issue">Payment Issue</option>
                <option value="Driver Behavior">Driver Behavior</option>
                <option value="App Issue">App Issue</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowTypeModal(false)}
                className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmTypeChange}
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold hover:shadow-lg transition-all"
              >
                Update Type
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
