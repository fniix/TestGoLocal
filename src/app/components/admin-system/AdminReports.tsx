import { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopBar } from './AdminTopBar';
import { Download, Calendar, Filter, FileText, CheckCircle } from 'lucide-react';

interface Report {
  id: string;
  title: string;
  type: 'Trips' | 'Delivery' | 'Payments' | 'Users' | 'Drivers';
  date: string;
  description: string;
}

interface AdminReportsProps {
  onNavigate: (page: 'dashboard' | 'users' | 'drivers' | 'trips' | 'delivery' | 'payments' | 'complaints' | 'violations' | 'reports' | 'notifications' | 'settings') => void;
}

export function AdminReports({ onNavigate }: AdminReportsProps) {
  const [reports] = useState<Report[]>([
    { id: 'R001', title: 'Monthly Trip Report', type: 'Trips', date: '2024-01-15', description: 'Complete analysis of all trips in January 2024' },
    { id: 'R002', title: 'Delivery Performance', type: 'Delivery', date: '2024-01-14', description: 'Delivery metrics and performance indicators' },
    { id: 'R003', title: 'Payment Transactions', type: 'Payments', date: '2024-01-13', description: 'All payment transactions and revenue report' },
    { id: 'R004', title: 'User Growth Report', type: 'Users', date: '2024-01-12', description: 'New user registrations and activity analysis' },
    { id: 'R005', title: 'Driver Performance', type: 'Drivers', date: '2024-01-11', description: 'Driver ratings and completion statistics' },
  ]);

  const [dateFilter, setDateFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState<'All' | 'Trips' | 'Delivery' | 'Payments' | 'Users' | 'Drivers'>('All');
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const filteredReports = reports.filter(report => {
    const matchesType = typeFilter === 'All' || report.type === typeFilter;
    const matchesDate = !dateFilter || report.date === dateFilter;
    return matchesType && matchesDate;
  });

  const handleDownload = (report: Report) => {
    setSelectedReport(report);
    setShowDownloadModal(true);
  };

  const confirmDownload = () => {
    if (selectedReport) {
      setShowDownloadModal(false);
      setShowSuccessNotification(true);
      setTimeout(() => setShowSuccessNotification(false), 3000);
      
      // Simulate file download
      console.log(`Downloading ${selectedReport.title}.pdf`);
    }
  };

  const getTypeColor = (type: Report['type']) => {
    switch (type) {
      case 'Trips':
        return 'bg-blue-100 text-blue-700';
      case 'Delivery':
        return 'bg-green-100 text-green-700';
      case 'Payments':
        return 'bg-purple-100 text-purple-700';
      case 'Users':
        return 'bg-orange-100 text-orange-700';
      case 'Drivers':
        return 'bg-cyan-100 text-cyan-700';
    }
  };

  return (
    <div className="size-full flex bg-[#EEF3FF]">
      <AdminSidebar activePage="reports" onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminTopBar />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Reports</h1>
            <p className="text-gray-500 mt-1">Generate and download system reports</p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-600" />
                <span className="font-semibold text-gray-700">Filters:</span>
              </div>
              
              {/* Date Filter */}
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-600 mb-2">Date</label>
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-sm"
                />
              </div>

              {/* Type Filter */}
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-600 mb-2">Type</label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value as any)}
                  className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-sm font-semibold text-gray-700"
                >
                  <option value="All">All Types</option>
                  <option value="Trips">Trips</option>
                  <option value="Delivery">Delivery</option>
                  <option value="Payments">Payments</option>
                  <option value="Users">Users</option>
                  <option value="Drivers">Drivers</option>
                </select>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setDateFilter('');
                  setTypeFilter('All');
                }}
                className="mt-6 px-4 py-2 rounded-xl border-2 border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-all"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Reports List */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Report ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredReports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-semibold text-gray-800">{report.id}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gray-600" />
                          <p className="font-semibold text-gray-800">{report.title}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(report.type)}`}>
                          {report.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-700 max-w-xs truncate">{report.description}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-gray-700">{report.date}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button 
                          onClick={() => handleDownload(report)}
                          className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#6C5CE7] to-[#A29BFE] hover:shadow-lg rounded-lg transition-all flex items-center gap-2 ml-auto"
                        >
                          <Download className="w-4 h-4" />
                          Download PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Download Confirmation Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Download className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Download Report</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Download <span className="font-semibold">{selectedReport?.title}</span> as PDF?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDownloadModal(false)}
                className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmDownload}
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-[#6C5CE7] to-[#A29BFE] text-white font-semibold hover:shadow-lg transition-all"
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
          <p className="font-semibold">Report downloaded successfully!</p>
        </div>
      )}
    </div>
  );
}
