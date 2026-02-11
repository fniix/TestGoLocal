import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export interface UserData {
  uid: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  role: string;
  createdAt?: any;
}

export interface DriverData extends UserData {
  vehicleType: string;
  vehiclePlate: string;
  licenseNumber: string;
  rating: number;
  totalTrips: number;
}

export interface RideRequest {
  id: string;
  userId: string;
  driverId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  pickupLocation: string;
  dropoffLocation: string;
  createdAt: any;
}

// Get all drivers from Firestore
export async function getAllDrivers(): Promise<DriverData[]> {
  try {
    const driversRef = collection(db, "users");
    const q = query(driversRef, where("role", "==", "driver"));
    const querySnapshot = await getDocs(q);
    
    const drivers: DriverData[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      drivers.push({
        uid: doc.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        city: data.city,
        role: data.role,
        vehicleType: data.vehicleType,
        vehiclePlate: data.vehiclePlate,
        licenseNumber: data.licenseNumber,
        rating: data.rating || 5.0,
        totalTrips: data.totalTrips || 0,
        createdAt: data.createdAt
      });
    });
    
    return drivers;
  } catch (error) {
    console.error("Error fetching drivers:", error);
    return [];
  }
}

// Get a specific user by UID
export async function getUserById(uid: string): Promise<UserData | null> {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const data = userSnap.data();
      return {
        uid: userSnap.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        city: data.city,
        role: data.role,
        createdAt: data.createdAt
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

// Get all users (admin only)
export async function getAllUsers(): Promise<UserData[]> {
  try {
    const usersRef = collection(db, "users");
    const querySnapshot = await getDocs(usersRef);
    
    const users: UserData[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      users.push({
        uid: doc.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        city: data.city,
        role: data.role,
        createdAt: data.createdAt
      });
    });
    
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

// Get drivers by city
export async function getDriversByCity(city: string): Promise<DriverData[]> {
  try {
    const driversRef = collection(db, "users");
    const q = query(
      driversRef, 
      where("role", "==", "driver"),
      where("city", "==", city)
    );
    const querySnapshot = await getDocs(q);
    
    const drivers: DriverData[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      drivers.push({
        uid: doc.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        city: data.city,
        role: data.role,
        vehicleType: data.vehicleType,
        vehiclePlate: data.vehiclePlate,
        licenseNumber: data.licenseNumber,
        rating: data.rating || 5.0,
        totalTrips: data.totalTrips || 0,
        createdAt: data.createdAt
      });
    });
    
    return drivers;
  } catch (error) {
    console.error("Error fetching drivers by city:", error);
    return [];
  }
}
