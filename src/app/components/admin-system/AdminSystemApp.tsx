import { useState } from 'react';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';
import { AdminUsers } from './AdminUsers';
import { AdminDrivers } from './AdminDrivers';
import { AdminTrips } from './AdminTrips';
import { AdminDelivery } from './AdminDelivery';
import { AdminPayments } from './AdminPayments';
import { AdminComplaints } from './AdminComplaints';
import { AdminViolations } from './AdminViolations';
import { AdminReports } from './AdminReports';
import { AdminNotifications } from './AdminNotifications';
import { AdminSettings } from './AdminSettings';

export function AdminSystemApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'users' | 'drivers' | 'trips' | 'delivery' | 'payments' | 'complaints' | 'violations' | 'reports' | 'notifications' | 'settings'>('dashboard');

  // Login
  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  // Navigate based on current page
  const handleNavigation = (page: 'dashboard' | 'users' | 'drivers' | 'trips' | 'delivery' | 'payments' | 'complaints' | 'violations' | 'reports' | 'notifications' | 'settings') => {
    setCurrentPage(page);
  };

  // Dashboard
  if (currentPage === 'dashboard') {
    return <AdminDashboard onNavigate={handleNavigation} />;
  }

  // Users
  if (currentPage === 'users') {
    return <AdminUsers onNavigate={handleNavigation} />;
  }

  // Drivers
  if (currentPage === 'drivers') {
    return <AdminDrivers onNavigate={handleNavigation} />;
  }

  // Trips
  if (currentPage === 'trips') {
    return <AdminTrips onNavigate={handleNavigation} />;
  }

  // Delivery
  if (currentPage === 'delivery') {
    return <AdminDelivery onNavigate={handleNavigation} />;
  }

  // Payments
  if (currentPage === 'payments') {
    return <AdminPayments onNavigate={handleNavigation} />;
  }

  // Complaints
  if (currentPage === 'complaints') {
    return <AdminComplaints onNavigate={handleNavigation} />;
  }

  // Violations
  if (currentPage === 'violations') {
    return <AdminViolations onNavigate={handleNavigation} />;
  }

  // Reports
  if (currentPage === 'reports') {
    return <AdminReports onNavigate={handleNavigation} />;
  }

  // Notifications
  if (currentPage === 'notifications') {
    return <AdminNotifications onNavigate={handleNavigation} />;
  }

  // Settings
  if (currentPage === 'settings') {
    return <AdminSettings onNavigate={handleNavigation} />;
  }

  return <AdminDashboard onNavigate={handleNavigation} />;
}