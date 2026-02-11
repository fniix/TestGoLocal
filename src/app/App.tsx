import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { getUserById } from '../services/firebaseService';
import { LoginScreen } from './components/LoginScreen';
import { RegisterScreenWithRoles } from './components/RegisterScreenWithRoles';
import { HomeScreen } from './components/HomeScreen';
import { ServiceSelectionScreen } from './components/ServiceSelectionScreen';
import { BookingDetailsScreen } from './components/BookingDetailsScreen';
import { DriverMatchingScreen } from './components/DriverMatchingScreen';
import { LiveTrackingScreen } from './components/LiveTrackingScreen';
import { PaymentScreen } from './components/PaymentScreen';
import { RatingScreen } from './components/RatingScreen';
import { RideHistoryScreen } from './components/RideHistoryScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { SearchScreen } from './components/SearchScreen';
import { ActivityScreen } from './components/ActivityScreen';
import { DriverDashboard } from './components/DriverDashboard';
import { DriverProfile } from './components/DriverProfile';
import { DriverSystemApp } from './components/driver-system/DriverSystemApp';
import { AdminSystemApp } from './components/admin-system/AdminSystemApp';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'splash' | 'login' | 'register' | 'home' | 'search' | 'activity' | 'service-selection' | 'booking-details' | 'driver-matching' | 'live-tracking' | 'payment' | 'rating' | 'ride-history' | 'profile' | 'driver-dashboard' | 'driver-profile' | 'driver-system' | 'admin-system'>('splash');
  const [userName, setUserName] = useState<string>('');
  const [userCity, setUserCity] = useState<string>('manama'); // Default to Manama
  const [userPhone, setUserPhone] = useState<string>('+973 3456 7890');
  const [userEmail, setUserEmail] = useState<string>('user@golocal.bh');
  const [userRole, setUserRole] = useState<string>('');
  const [selectedServiceType, setSelectedServiceType] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');
  const [bookingDetails, setBookingDetails] = useState({ pickup: '', dropoff: '' });
  const [selectedDestination, setSelectedDestination] = useState<{ location: string; area?: string } | null>(null);
  
  // Driver-specific state
  const [isDriver, setIsDriver] = useState<boolean>(false);
  const [vehicleType, setVehicleType] = useState<string>('');
  const [vehiclePlate, setVehiclePlate] = useState<string>('');

  // Check if user is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is logged in
        const userData = await getUserById(user.uid);
        if (userData) {
          setUserName(userData.name);
          setUserEmail(userData.email);
          setUserPhone(userData.phone);
          setUserCity(userData.city);
          setUserRole(userData.role);
          
          if (userData.role === 'driver') {
            setIsDriver(true);
            setCurrentScreen('driver-system');
          } else if (userData.role === 'admin') {
            setCurrentScreen('admin-system');
          } else {
            setCurrentScreen('home');
          }
        }
      }
    });

    return unsubscribe;
  }, []);

  const handleLogout = () => {
    // Clear all user data
    setUserName('');
    setUserCity('manama'); // Reset to default city
    setUserPhone('');
    setUserEmail('');
    setSelectedServiceType('');
    setSelectedService('');
    setBookingDetails({ pickup: '', dropoff: '' });
    setSelectedDestination(null);
    setIsDriver(false);
    setVehicleType('');
    setVehiclePlate('');
    // Navigate to splash screen
    setCurrentScreen('splash');
  };

  const handleUpdateProfile = (name: string, phone: string, email: string) => {
    setUserName(name);
    setUserPhone(phone);
    setUserEmail(email);
  };

  if (currentScreen === 'login') {
    return (
      <LoginScreen 
        onBack={() => {
          setUserName(''); // Reset to Guest mode
          setCurrentScreen('splash');
        }}
        onCreateAccount={() => setCurrentScreen('register')}
        onLogin={(userData) => {
          setUserName(userData.name || 'Guest User');
          setUserEmail(userData.email);
          setUserPhone(userData.phone);
          setUserCity(userData.city);
          setCurrentScreen('home');
        }}
        onLoginAsAdmin={(userData) => {
          setUserName(userData.name);
          setUserEmail(userData.email);
          setCurrentScreen('admin-system');
        }}
        onLoginAsDriver={(userData) => {
          setUserName(userData.name);
          setUserEmail(userData.email);
          setUserPhone(userData.phone);
          setUserCity(userData.city);
          setVehicleType(userData.vehicleType);
          setVehiclePlate(userData.vehiclePlate);
          setIsDriver(true);
          setCurrentScreen('driver-system');
        }}
        onNavigateHomeAsGuest={() => {
          setUserName(''); // Ensure guest mode
          setCurrentScreen('home');
        }}
        onNavigateProfileAsGuest={() => {
          setUserName(''); // Ensure guest mode
          setCurrentScreen('profile');
        }}
      />
    );
  }

  if (currentScreen === 'register') {
    return (
      <RegisterScreenWithRoles 
        onBack={() => {
          setUserName(''); // Reset to Guest mode
          setCurrentScreen('splash');
        }}
        onLogin={() => setCurrentScreen('login')}
        onRegisterPassenger={(name: string, city: string) => {
          setUserName(name);
          setUserCity(city);
          setIsDriver(false);
          setCurrentScreen('home');
        }}
        onRegisterDriver={(name: string, city: string, vehicleTypeValue: string, vehiclePlateValue: string, driverLicenseNumber: string, permitNumber: string) => {
          setUserName(name);
          setUserCity(city);
          setVehicleType(vehicleTypeValue);
          setVehiclePlate(vehiclePlateValue);
          setIsDriver(true);
          // Driver needs to wait for approval - show them a pending screen or redirect to login
          setCurrentScreen('login');
        }}
        onNavigateHome={() => {
          setUserName(''); // Ensure guest mode
          setCurrentScreen('home');
        }}
        onNavigateSettings={() => {
          setUserName(''); // Ensure guest mode
          setCurrentScreen('profile');
        }}
      />
    );
  }

  if (currentScreen === 'profile') {
    return (
      <ProfileScreen 
        onBack={() => setCurrentScreen('home')}
        userName={userName || 'Guest User'}
        userPhone={userPhone}
        userEmail={userEmail}
        onNavigateHome={() => setCurrentScreen('home')}
        onNavigateSearch={() => setCurrentScreen('search')}
        onNavigateHistory={() => setCurrentScreen('ride-history')}
        onNavigateActivity={() => setCurrentScreen('activity')}
        onNavigateLogin={() => setCurrentScreen('login')}
        onNavigateRegister={() => setCurrentScreen('register')}
        onLogout={handleLogout}
        onUpdateProfile={handleUpdateProfile}
      />
    );
  }

  if (currentScreen === 'ride-history') {
    return (
      <RideHistoryScreen 
        onBack={() => setCurrentScreen('home')}
        userName={userName}
        onNavigateHome={() => setCurrentScreen('home')}
        onNavigateSearch={() => setCurrentScreen('search')}
        onNavigateActivity={() => setCurrentScreen('activity')}
        onNavigateProfile={() => setCurrentScreen('profile')}
        onNavigateLogin={() => setCurrentScreen('login')}
        onNavigateRegister={() => setCurrentScreen('register')}
        onRebook={(pickup: string, dropoff: string, serviceType: string) => {
          setBookingDetails({ pickup, dropoff });
          setSelectedServiceType(serviceType);
          setCurrentScreen('booking-details');
        }}
      />
    );
  }

  if (currentScreen === 'rating') {
    return (
      <RatingScreen 
        onBack={() => setCurrentScreen('payment')}
        driverName="Ahmed Al-Khalifa"
        driverPhoto="👨‍💼"
        driverRating={4.9}
        pickupLocation={bookingDetails.pickup}
        dropoffLocation={bookingDetails.dropoff}
        fareAmount={7.36}
        onSubmit={() => setCurrentScreen('ride-history')}
      />
    );
  }

  if (currentScreen === 'payment') {
    return (
      <PaymentScreen 
        onBack={() => setCurrentScreen('live-tracking')}
        pickupLocation={bookingDetails.pickup}
        dropoffLocation={bookingDetails.dropoff}
        driverName="Ahmed Al-Khalifa"
        distance={5.2}
        duration={18}
        onPaymentComplete={() => setCurrentScreen('rating')}
      />
    );
  }

  if (currentScreen === 'live-tracking') {
    return (
      <LiveTrackingScreen 
        onBack={() => setCurrentScreen('driver-matching')}
        driverName="Ahmed Al-Khalifa"
        pickupLocation={bookingDetails.pickup}
        dropoffLocation={bookingDetails.dropoff}
        onTripComplete={() => setCurrentScreen('payment')}
      />
    );
  }

  if (currentScreen === 'driver-matching') {
    return (
      <DriverMatchingScreen 
        onBack={() => setCurrentScreen('booking-details')}
        pickupLocation={bookingDetails.pickup}
        dropoffLocation={bookingDetails.dropoff}
        onDriverMatched={() => setCurrentScreen('live-tracking')}
        userCity={userCity}
      />
    );
  }

  if (currentScreen === 'booking-details') {
    return (
      <BookingDetailsScreen 
        onBack={() => setCurrentScreen('service-selection')}
        serviceType={selectedServiceType}
        selectedService={selectedService}
        userName={userName}
        onNavigateLogin={() => setCurrentScreen('login')}
        onNavigateRegister={() => setCurrentScreen('register')}
        initialPickup={bookingDetails.pickup}
        initialDropoff={bookingDetails.dropoff}
        onConfirm={(pickup, dropoff) => {
          setBookingDetails({ pickup, dropoff });
          setCurrentScreen('driver-matching');
        }}
      />
    );
  }

  if (currentScreen === 'service-selection') {
    return (
      <ServiceSelectionScreen 
        onBack={() => setCurrentScreen('home')}
        serviceType={selectedServiceType}
        onContinue={(service) => {
          setSelectedService(service);
          setCurrentScreen('booking-details');
        }}
        onNavigateHome={() => setCurrentScreen('home')}
        onNavigateProfile={() => setCurrentScreen('profile')}
      />
    );
  }

  if (currentScreen === 'home') {
    return (
      <HomeScreen 
        onBack={() => setCurrentScreen('splash')}
        userName={userName}
        userCity={userCity}
        onSelectService={(serviceType) => {
          setSelectedServiceType(serviceType);
          setCurrentScreen('service-selection');
        }}
        onViewHistory={() => setCurrentScreen('ride-history')}
        onViewProfile={() => setCurrentScreen('profile')}
        onViewSearch={() => setCurrentScreen('search')}
        onViewActivity={() => setCurrentScreen('activity')}
        selectedDestination={selectedDestination}
      />
    );
  }

  if (currentScreen === 'search') {
    return (
      <SearchScreen 
        onBack={() => setCurrentScreen('home')}
        onNavigateHome={() => setCurrentScreen('home')}
        onNavigateHistory={() => setCurrentScreen('ride-history')}
        onNavigateProfile={() => setCurrentScreen('profile')}
        onNavigateActivity={() => setCurrentScreen('activity')}
        userName={userName}
        onNavigateLogin={() => setCurrentScreen('login')}
        onNavigateRegister={() => setCurrentScreen('register')}
        onLocationSelect={(location, area) => {
          // Set the selected location as dropoff and navigate to home
          // In a real app, this would update the map or booking form
          console.log('Selected location:', location, area);
          setSelectedDestination({ location, area });
        }}
      />
    );
  }

  if (currentScreen === 'activity') {
    return (
      <ActivityScreen 
        onBack={() => setCurrentScreen('home')}
        userName={userName}
        onNavigateHome={() => setCurrentScreen('home')}
        onNavigateSearch={() => setCurrentScreen('search')}
        onNavigateHistory={() => setCurrentScreen('ride-history')}
        onNavigateProfile={() => setCurrentScreen('profile')}
        onNavigateLogin={() => setCurrentScreen('login')}
        onNavigateRegister={() => setCurrentScreen('register')}
        onRebook={(pickup, dropoff, serviceType) => {
          setSelectedServiceType(serviceType);
          setBookingDetails({ pickup, dropoff });
          setCurrentScreen('booking-details');
        }}
      />
    );
  }

  if (currentScreen === 'driver-dashboard') {
    return (
      <DriverDashboard 
        driverName={userName}
        vehicleType={vehicleType}
        vehiclePlate={vehiclePlate}
        onLogout={handleLogout}
        onViewProfile={() => setCurrentScreen('driver-profile')}
      />
    );
  }

  if (currentScreen === 'driver-profile') {
    return (
      <DriverProfile 
        driverName={userName}
        email={userEmail}
        phone={userPhone}
        city={userCity}
        vehicleType={vehicleType}
        vehiclePlate={vehiclePlate}
        onBack={() => setCurrentScreen('driver-dashboard')}
        onLogout={handleLogout}
      />
    );
  }

  if (currentScreen === 'driver-system') {
    return <DriverSystemApp />;
  }

  if (currentScreen === 'admin-system') {
    return <AdminSystemApp />;
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-b from-purple-600 to-blue-500">
      <div className="flex flex-col items-center justify-between h-full w-full max-w-md px-6 py-12">
        {/* Logo and Tagline Section */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="mb-8">
            {/* Logo Circle */}
            <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-2xl">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                  Go
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent -mt-2">
                  Local
                </div>
              </div>
            </div>
          </div>
          
          {/* Tagline */}
          <p className="text-white text-2xl text-center mt-4 tracking-wide">
            Your Local Ride, Anytime
          </p>
        </div>

        {/* Buttons Section */}
        <div className="w-full space-y-4">
          <button 
            onClick={() => setCurrentScreen('login')}
            className="w-full bg-white text-purple-600 py-4 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
          >
            Login
          </button>
          
          <button 
            onClick={() => setCurrentScreen('register')}
            className="w-full bg-transparent border-2 border-white text-white py-4 rounded-full text-xl font-semibold hover:bg-white hover:text-purple-600 transition-all"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}