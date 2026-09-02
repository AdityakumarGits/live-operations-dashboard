import { useEffect, useState } from "react";
import KpiCard from "../components/dashboard/KpiCard";
import api from "../services/api";
import type { DashboardData } from "../types";
import AnalyticsCharts from "../components/dashboard/AnalyticsCharts";
import BookingTable from "../components/dashboard/BookingTable";
import type { Booking } from "../types";

const Dashboard = () => {
  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);

useEffect(() => {
  const fetchDashboard = async () => {
    try {
      const [dashboardResponse, bookingResponse] =
        await Promise.all([
          api.get("/dashboard"),
          api.get("/bookings", {
            params: {
              page: 1,
              limit: 8,
              sortBy: "scheduledAt",
              sortOrder: "desc",
            },
          }),
        ]);

      setDashboard(dashboardResponse.data.data);
     setBookings(bookingResponse.data.data);
    } catch (error) {
      console.error(error);
      setError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  fetchDashboard();
}, []);

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
        value={`₹${dashboard.totalRevenue.toLocaleString("en-IN")}`}
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
    <BookingTable bookings={bookings} />
  </div>
);
};

export default Dashboard;