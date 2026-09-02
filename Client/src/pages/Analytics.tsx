import { useEffect, useState } from "react";
import api from "../services/api";
import type { DashboardData } from "../types";
import AnalyticsCharts from "../components/dashboard/AnalyticsCharts";

const Analytics = () => {
  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/dashboard");

        setDashboard(response.data.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load analytics.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  // Loading
  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Analytics
        </h1>

        <p className="mt-4 text-gray-500">
          Loading analytics...
        </p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Analytics
        </h1>

        <p className="mt-4 text-red-500">
          {error}
        </p>
      </div>
    );
  }

  // No data
  if (!dashboard) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Analytics
        </h1>

        <p className="mt-4 text-gray-500">
          No analytics data available.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Analytics
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Analyze booking, revenue, status, and service performance.
        </p>
      </div>

      {/* Analytics Charts */}
      <AnalyticsCharts dashboard={dashboard} />
    </div>
  );
};

export default Analytics;