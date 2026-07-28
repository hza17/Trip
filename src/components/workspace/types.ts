import { ElementType } from 'react';

export type ModuleType = 'Dashboard' | 'Rooms' | 'Reservations' | 'Restaurant' | 'Spa' | 'Menu' | 'Tables' | 'RestaurantOrders' | 'Finance' | 'Reports' | 'Settings' | 'Team' | 'Orders' | 'Customers' | 'CheckInOut' | 'Flights' | 'Trains' | 'CarRental' | 'Villas';
export type BusinessType = 'Hotel' | 'Flight' | 'Train' | 'CarRental' | 'Villa' | 'Entertainment' | 'Tour' | 'Restaurant' | 'Other';

export interface Business {
  id: string;
  name: string;
  type: BusinessType;
  status: 'Active' | 'Pending' | 'Suspended';
  modules: ModuleType[];
  parentId?: string; // e.g. parent Hotel ID if it is a sub-service
  isSubService?: boolean; // True if it is a sub-service of a hotel
  subServiceType?: 'Restaurant' | 'Gaming' | 'Pool' | 'Massage' | 'Other';
  createdAt: string;
  revenue?: number;
  activeBookings?: number;
  address?: string;
  facilityCount?: number;
  mobile?: string;
  ownerName?: string;
  completionPercentage?: number;
}

export interface TeamMember {
  id: string;
  name: string;
  email?: string;
  role: string;
  modules?: ModuleType[];
  businessId?: string; // If undefined, applies to all or uses a complex permission object
  mobile?: string;
  businessName?: string;
  status?: 'Active' | 'Pending' | 'Suspended';
  lastActive?: string;
  avatarUrl?: string;
}
