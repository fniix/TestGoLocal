/**
 * Firebase Sample Data Seeder
 * هذا الملف يحتوي على بيانات تجريبية واقعية لملء Firebase للاختبار
 * يمكن تشغيله مرة واحدة لإضافة البيانات
 */

export const sampleUsers = [
  {
    uid: 'user_001',
    name: 'Mohammed Al-Mansouri',
    email: 'mohammed.mansouri@gmail.com',
    phone: '+973 3366 1234',
    city: 'manama',
    role: 'user',
    createdAt: new Date('2024-01-15')
  },
  {
    uid: 'user_002',
    name: 'Fatima Al-Khalifa',
    email: 'fatima.khalifa@gmail.com',
    phone: '+973 3377 5678',
    city: 'muharraq',
    role: 'user',
    createdAt: new Date('2024-02-10')
  },
  {
    uid: 'user_003',
    name: 'Ahmed Saleh',
    email: 'ahmed.saleh@gmail.com',
    phone: '+973 3388 9012',
    city: 'riffa',
    role: 'user',
    createdAt: new Date('2024-01-20')
  },
  {
    uid: 'user_004',
    name: 'Nour Ibrahim',
    email: 'nour.ibrahim@gmail.com',
    phone: '+973 3399 3456',
    city: 'hamad-town',
    role: 'user',
    createdAt: new Date('2024-02-05')
  }
];

export const sampleDrivers = [
  {
    uid: 'driver_001',
    name: 'Ahmed Al-Khalifa',
    email: 'ahmed.alkhalifa@golocal.bh',
    phone: '+973 3355 6789',
    city: 'manama',
    role: 'driver',
    vehicleType: 'Toyota Camry',
    vehiclePlate: 'B-45678',
    licenseNumber: 'DL-2023-00123',
    rating: 4.9,
    totalTrips: 1247,
    createdAt: new Date('2023-06-01')
  },
  {
    uid: 'driver_002',
    name: 'Mohammed Al-Dosari',
    email: 'mohammed.dosari@golocal.bh',
    phone: '+973 3311 2345',
    city: 'muharraq',
    role: 'driver',
    vehicleType: 'Hyundai Elantra',
    vehiclePlate: 'M-12345',
    licenseNumber: 'DL-2023-00124',
    rating: 4.7,
    totalTrips: 856,
    createdAt: new Date('2023-08-15')
  },
  {
    uid: 'driver_003',
    name: 'Salim Al-Hajri',
    email: 'salim.hajri@golocal.bh',
    phone: '+973 3322 4567',
    city: 'riffa',
    role: 'driver',
    vehicleType: 'Nissan Altima',
    vehiclePlate: 'R-98765',
    licenseNumber: 'DL-2023-00125',
    rating: 4.8,
    totalTrips: 934,
    createdAt: new Date('2023-07-20')
  },
  {
    uid: 'driver_004',
    name: 'Khalid Al-Mahmoud',
    email: 'khalid.mahmoud@golocal.bh',
    phone: '+973 3344 5678',
    city: 'manama',
    role: 'driver',
    vehicleType: 'Kia Forte',
    vehiclePlate: 'K-54321',
    licenseNumber: 'DL-2023-00126',
    rating: 4.6,
    totalTrips: 723,
    createdAt: new Date('2023-09-10')
  },
  {
    uid: 'driver_005',
    name: 'Hassan Al-Buainain',
    email: 'hassan.buainain@golocal.bh',
    phone: '+973 3366 7890',
    city: 'hamad-town',
    role: 'driver',
    vehicleType: 'Chevrolet Cruze',
    vehiclePlate: 'H-77777',
    licenseNumber: 'DL-2023-00127',
    rating: 4.85,
    totalTrips: 1102,
    createdAt: new Date('2023-05-25')
  }
];

export const sampleAdmins = [
  {
    uid: 'admin_001',
    name: 'Admin Dashboard',
    email: 'admin@golocal.bh',
    role: 'admin',
    createdAt: new Date('2023-01-01')
  }
];

/**
 * Sample Requests/Orders for testing
 */
export const sampleRequests = [
  {
    id: 'req_001',
    userId: 'user_001',
    driverId: 'driver_001',
    status: 'completed' as const,
    pickupLocation: 'Manama City Center',
    dropoffLocation: 'Bahrain Fort',
    pickupTime: new Date('2024-02-20 14:00'),
    fare: 7.5,
    distance: 5.2,
    rating: 5,
    createdAt: new Date('2024-02-20 14:00')
  },
  {
    id: 'req_002',
    userId: 'user_002',
    driverId: 'driver_002',
    status: 'completed' as const,
    pickupLocation: 'Muharraq Airport',
    dropoffLocation: 'Juffair',
    pickupTime: new Date('2024-02-21 09:30'),
    fare: 12.5,
    distance: 8.7,
    rating: 4,
    createdAt: new Date('2024-02-21 09:30')
  },
  {
    id: 'req_003',
    userId: 'user_003',
    driverId: 'driver_003',
    status: 'completed' as const,
    pickupLocation: 'Riffa Mall',
    dropoffLocation: 'Al Areen Village',
    pickupTime: new Date('2024-02-22 16:00'),
    fare: 9.75,
    distance: 6.3,
    rating: 5,
    createdAt: new Date('2024-02-22 16:00')
  }
];

export default {
  sampleUsers,
  sampleDrivers,
  sampleAdmins,
  sampleRequests
};
