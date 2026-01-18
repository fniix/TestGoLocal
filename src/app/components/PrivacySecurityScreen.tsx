import { ArrowLeft, Lock, Eye, EyeOff, Shield, Trash2, Download, Key } from 'lucide-react';
import { useState } from 'react';

interface PrivacySecurityScreenProps {
  onBack: () => void;
}

export function PrivacySecurityScreen({ onBack }: PrivacySecurityScreenProps) {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [locationTracking, setLocationTracking] = useState(true);
  const [activityTracking, setActivityTracking] = useState(true);

  const handleChangePassword = () => {
    if (currentPassword && newPassword && confirmPassword && newPassword === confirmPassword) {
      // Simulate password change
      alert('Password changed successfully!');
      setShowChangePassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const handleDownloadData = () => {
    alert('Your data will be prepared and emailed to you within 24 hours.');
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      alert('Account deletion request submitted. You will receive a confirmation email.');
    }
  };

  const Toggle = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      className={`relative w-14 h-8 rounded-full transition-colors ${
        enabled ? 'bg-gradient-to-r from-purple-600 to-blue-500' : 'bg-gray-300'
      }`}
    >
      <div
        className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
          enabled ? 'translate-x-7' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="size-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 px-6 pt-6 pb-8 shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={onBack}
            className="flex items-center text-white hover:bg-white/10 rounded-full p-2 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">Privacy & Security</h1>
            <p className="text-white/80 text-sm mt-1">Manage your account security</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Security Settings */}
        <div className="bg-white rounded-2xl p-5 shadow-md mb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Security</h2>
          
          <div className="space-y-4">
            {/* Change Password */}
            <button
              onClick={() => setShowChangePassword(!showChangePassword)}
              className="w-full flex items-center gap-3 hover:bg-gray-50 p-3 rounded-xl transition-colors"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Lock className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-800">Change Password</p>
                <p className="text-sm text-gray-500">Update your account password</p>
              </div>
            </button>

            {/* Two-Factor Authentication */}
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-500">Add extra security layer</p>
                </div>
              </div>
              <Toggle enabled={twoFactorEnabled} onToggle={() => setTwoFactorEnabled(!twoFactorEnabled)} />
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white rounded-2xl p-5 shadow-md mb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Privacy</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Key className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Location Tracking</p>
                  <p className="text-sm text-gray-500">For better ride experience</p>
                </div>
              </div>
              <Toggle enabled={locationTracking} onToggle={() => setLocationTracking(!locationTracking)} />
            </div>

            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Key className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Activity Tracking</p>
                  <p className="text-sm text-gray-500">Personalize your experience</p>
                </div>
              </div>
              <Toggle enabled={activityTracking} onToggle={() => setActivityTracking(!activityTracking)} />
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white rounded-2xl p-5 shadow-md mb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Data Management</h2>
          
          <div className="space-y-3">
            <button
              onClick={handleDownloadData}
              className="w-full flex items-center gap-3 bg-gray-50 hover:bg-gray-100 p-4 rounded-xl transition-colors"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Download className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-800">Download My Data</p>
                <p className="text-sm text-gray-500">Request a copy of your data</p>
              </div>
            </button>

            <button
              onClick={handleDeleteAccount}
              className="w-full flex items-center gap-3 bg-red-50 hover:bg-red-100 p-4 rounded-xl transition-colors"
            >
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-red-600">Delete Account</p>
                <p className="text-sm text-red-500">Permanently remove your account</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showChangePassword && (
        <div className="absolute inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Change Password</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                    placeholder="Enter current password"
                  />
                  <button
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                    placeholder="Enter new password"
                  />
                  <button
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                    placeholder="Confirm new password"
                  />
                  <button
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowChangePassword(false);
                  setCurrentPassword('');
                  setNewPassword('');
                  setConfirmPassword('');
                }}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-full font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleChangePassword}
                disabled={!currentPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword}
                className={`flex-1 py-3 rounded-full font-semibold transition-all ${
                  currentPassword && newPassword && confirmPassword && newPassword === confirmPassword
                    ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:shadow-lg active:scale-95'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
