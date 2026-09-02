export interface DashboardData {
  totalBookings: number;
  todayBookings: number;
  completedBookings: number;
  pendingBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
  activeMechanics: number;
  newCustomers: number;

  bookingsOverTime: {
    date: string;
    count: number;
  }[];

  revenueOverTime: {
    date: string;
    revenue: number;
  }[];

  bookingStatus: {
    status: string;
    count: number;
  }[];

  serviceBreakdown: {
    category: string;
    count: number;
  }[];
}

export interface Booking {
  _id: string;
  bookingNumber: string;

  customerId?: {
    name: string;
    email?: string;
    phone?: string;
  };

  vehicleId?: {
    registrationNumber: string;
    brand: string;
    model: string;
    year?: number;
  };

  serviceId?: {
    name: string;
    category: string;
    basePrice?: number;
  };

  mechanicId?: {
    name: string;
    phone?: string;
    status?: string;
  };

  status:
    | "PENDING"
    | "ASSIGNED"
    | "ON_THE_WAY"
    | "COMPLETED"
    | "CANCELLED";

  amount: number;
  scheduledAt: string;
}