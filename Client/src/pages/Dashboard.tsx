import { useEffect, useState } from "react";

import KpiCard from "../components/dashboard/KpiCard";
import AnalyticsCharts from "../components/dashboard/AnalyticsCharts";
import BookingTable from "../components/dashboard/BookingTable";

import api from "../services/api";

import type {
  DashboardData,
  Booking,
} from "../types";

const Dashboard = () => {
  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  const [bookings, setBookings] =
    useState<Booking[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // Fetch dashboard data
  const fetchDashboard = async () => {
    try {
      const response = await api.get("/dashboard");

      setDashboard(response.data.data);
    } catch (error) {
      console.error(error);
      setError("Failed to load dashboard.");
    }
  };

  // Fetch recent bookings
  const fetchBookings = async () => {
    try {
      const response = await api.get("/bookings", {
        params: {
          page: 1,
          limit: 8,
          sortBy: "scheduledAt",
          sortOrder: "desc",
        },
      });

      setBookings(response.data.data);
    } catch (error) {
      console.error(error);
      setError("Failed to load bookings.");
    }
  };

  // Initial data + SSE connection
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        await Promise.all([
          fetchDashboard(),
          fetchBookings(),
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();

    // SSE connection
    const apiUrl =
      import.meta.env.VITE_API_URL ||
      "http://localhost:5000/api";

    const eventSource = new EventSource(
      `${apiUrl}/updates`
    );

    eventSource.onopen = () => {
      console.log("Live updates connected");
    };

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      console.log("Live update:", data);

      if (data.type === "BOOKING_STATUS_UPDATED") {
        fetchDashboard();
        fetchBookings();
      }
    };

    eventSource.onerror = () => {
      console.log("Live updates disconnected");
    };

    return () => {
      eventSource.close();
    };
  }, []);

  // Loading state
  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold">
          Dashboard
        </h1>

        <p className="mt-4 text-gray-500">
          Loading dashboard...
        </p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div>
        <h1 className="text-2xl font-bold">
          Dashboard
        </h1>

        <p className="mt-4 text-red-500">
          {error}
        </p>
      </div>
    );
  }

  if (!dashboard) {
    return null;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Overview of your vehicle service operations.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Bookings"
          value={dashboard.totalBookings}
        />

        <KpiCard
          title="Today's Bookings"
          value={dashboard.todayBookings}
        />

        <KpiCard
          title="Completed"
          value={dashboard.completedBookings}
        />

        <KpiCard
          title="Pending"
          value={dashboard.pendingBookings}
        />

        <KpiCard
          title="Cancelled"
          value={dashboard.cancelledBookings}
        />

        <KpiCard
          title="Total Revenue"
          value={`₹${dashboard.totalRevenue.toLocaleString(
            "en-IN"
          )}`}
        />

        <KpiCard
          title="Active Mechanics"
          value={dashboard.activeMechanics}
        />

        <KpiCard
          title="New Customers"
          value={dashboard.newCustomers}
        />
      </div>

      {/* Analytics */}
      <AnalyticsCharts dashboard={dashboard} />

      {/* Recent Bookings */}
      <BookingTable
        bookings={bookings}
        title="Recent Bookings"
      />
    </div>
  );
};

export default Dashboard;