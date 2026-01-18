import { useState } from 'react';
import { DriverLandingPage } from './DriverLandingPage';
import { DriverSystemDashboard } from './DriverSystemDashboard';
import { CreateDeliveryOffer } from './CreateDeliveryOffer';
import { MyOffers } from './MyOffers';
import { IncomingRequests } from './IncomingRequests';
import { DeliveryCompleted } from './DeliveryCompleted';
import { Earnings } from './Earnings';
import { Reviews } from './Reviews';
import { DriverSystemProfile } from './DriverSystemProfile';

export function DriverSystemApp() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'dashboard' | 'create-offer' | 'my-offers' | 'incoming-requests' | 'active-deliveries' | 'delivery-completed' | 'earnings' | 'reviews' | 'profile'>('landing');
  const [driverStatus, setDriverStatus] = useState<'available' | 'busy' | 'offline'>('available');

  // Landing Page
  if (currentPage === 'landing') {
    return (
      <DriverLandingPage 
        onEnterSystem={() => setCurrentPage('dashboard')}
      />
    );
  }

  // Dashboard
  if (currentPage === 'dashboard') {
    return (
      <DriverSystemDashboard 
        onNavigateToCreateOffer={() => setCurrentPage('create-offer')}
        onNavigateToMyOffers={() => setCurrentPage('my-offers')}
        onNavigateToIncomingRequests={() => setCurrentPage('incoming-requests')}
        onNavigateToActiveDeliveries={() => setCurrentPage('active-deliveries')}
        onNavigateToEarnings={() => setCurrentPage('earnings')}
        onNavigateToReviews={() => setCurrentPage('reviews')}
        onNavigateToProfile={() => setCurrentPage('profile')}
      />
    );
  }

  // Create Delivery Offer
  if (currentPage === 'create-offer') {
    return (
      <CreateDeliveryOffer 
        onBack={() => setCurrentPage('dashboard')}
        onNavigateToDashboard={() => setCurrentPage('dashboard')}
        onNavigateToMyOffers={() => setCurrentPage('my-offers')}
        onNavigateToIncomingRequests={() => setCurrentPage('incoming-requests')}
        onNavigateToActiveDeliveries={() => setCurrentPage('active-deliveries')}
        onNavigateToEarnings={() => setCurrentPage('earnings')}
        onNavigateToReviews={() => setCurrentPage('reviews')}
        onNavigateToProfile={() => setCurrentPage('profile')}
      />
    );
  }

  // My Offers
  if (currentPage === 'my-offers') {
    return (
      <MyOffers 
        onNavigateToDashboard={() => setCurrentPage('dashboard')}
        onNavigateToCreateOffer={() => setCurrentPage('create-offer')}
        onNavigateToIncomingRequests={() => setCurrentPage('incoming-requests')}
        onNavigateToActiveDeliveries={() => setCurrentPage('active-deliveries')}
        onNavigateToEarnings={() => setCurrentPage('earnings')}
        onNavigateToReviews={() => setCurrentPage('reviews')}
        onNavigateToProfile={() => setCurrentPage('profile')}
      />
    );
  }

  // Incoming Requests
  if (currentPage === 'incoming-requests') {
    return (
      <IncomingRequests 
        onNavigateToDashboard={() => setCurrentPage('dashboard')}
        onNavigateToMyOffers={() => setCurrentPage('my-offers')}
        onNavigateToCreateOffer={() => setCurrentPage('create-offer')}
        onNavigateToActiveDeliveries={() => setCurrentPage('active-deliveries')}
        onNavigateToEarnings={() => setCurrentPage('earnings')}
        onNavigateToReviews={() => setCurrentPage('reviews')}
        onNavigateToProfile={() => setCurrentPage('profile')}
        driverStatus={driverStatus}
      />
    );
  }

  // Delivery Completed
  if (currentPage === 'delivery-completed') {
    return (
      <DeliveryCompleted 
        onNavigateToDashboard={() => setCurrentPage('dashboard')}
        onNavigateToMyOffers={() => setCurrentPage('my-offers')}
        onNavigateToIncomingRequests={() => setCurrentPage('incoming-requests')}
        onNavigateToActiveDeliveries={() => setCurrentPage('active-deliveries')}
        onNavigateToEarnings={() => setCurrentPage('earnings')}
        onNavigateToReviews={() => setCurrentPage('reviews')}
        onNavigateToProfile={() => setCurrentPage('profile')}
      />
    );
  }

  // Earnings
  if (currentPage === 'earnings') {
    return (
      <Earnings 
        onNavigateToDashboard={() => setCurrentPage('dashboard')}
        onNavigateToMyOffers={() => setCurrentPage('my-offers')}
        onNavigateToIncomingRequests={() => setCurrentPage('incoming-requests')}
        onNavigateToActiveDeliveries={() => setCurrentPage('active-deliveries')}
        onNavigateToReviews={() => setCurrentPage('reviews')}
        onNavigateToProfile={() => setCurrentPage('profile')}
      />
    );
  }

  // Reviews
  if (currentPage === 'reviews') {
    return (
      <Reviews 
        onNavigateToDashboard={() => setCurrentPage('dashboard')}
        onNavigateToMyOffers={() => setCurrentPage('my-offers')}
        onNavigateToIncomingRequests={() => setCurrentPage('incoming-requests')}
        onNavigateToActiveDeliveries={() => setCurrentPage('active-deliveries')}
        onNavigateToEarnings={() => setCurrentPage('earnings')}
        onNavigateToProfile={() => setCurrentPage('profile')}
      />
    );
  }

  // Profile
  if (currentPage === 'profile') {
    return (
      <DriverSystemProfile 
        onNavigateToDashboard={() => setCurrentPage('dashboard')}
        onNavigateToMyOffers={() => setCurrentPage('my-offers')}
        onNavigateToIncomingRequests={() => setCurrentPage('incoming-requests')}
        onNavigateToActiveDeliveries={() => setCurrentPage('active-deliveries')}
        onNavigateToEarnings={() => setCurrentPage('earnings')}
        onNavigateToReviews={() => setCurrentPage('reviews')}
      />
    );
  }

  // Active Deliveries - placeholder for now  
  if (currentPage === 'active-deliveries') {
    // Simulate a completed delivery scenario
    return (
      <DeliveryCompleted 
        onNavigateToDashboard={() => setCurrentPage('dashboard')}
        onNavigateToMyOffers={() => setCurrentPage('my-offers')}
        onNavigateToIncomingRequests={() => setCurrentPage('incoming-requests')}
        onNavigateToActiveDeliveries={() => setCurrentPage('active-deliveries')}
        onNavigateToEarnings={() => setCurrentPage('earnings')}
        onNavigateToReviews={() => setCurrentPage('reviews')}
        onNavigateToProfile={() => setCurrentPage('profile')}
      />
    );
  }

  return null;
}
