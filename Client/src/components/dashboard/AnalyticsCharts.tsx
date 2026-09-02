import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import type { DashboardData } from "../../types";

interface AnalyticsChartsProps {
  dashboard: DashboardData;
}

const AnalyticsCharts = ({
  dashboard,
}: AnalyticsChartsProps) => {
  return (
    <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
      {/* Bookings Over Time */}
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          Bookings Over Time
        </h2>

        <p className="mb-5 text-sm text-gray-500">
          Number of bookings created each day
        </p>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dashboard.bookingsOverTime}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
              />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="count"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Booking Status */}
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          Booking Status
        </h2>

        <p className="mb-5 text-sm text-gray-500">
          Distribution of booking statuses
        </p>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dashboard.bookingStatus}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {dashboard.bookingStatus.map((entry, index) => (
                  <Cell
                    key={`cell-${entry.status}`}
                    fill={[
                      "#2563eb",
                      "#dc2626",
                      "#16a34a",
                      "#f59e0b",
                      "#7c3aed",
                    ][index % 5]}
                  />
                ))}
              </Pie>

              <Tooltip />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue Over Time */}
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          Revenue Over Time
        </h2>

        <p className="mb-5 text-sm text-gray-500">
          Daily service revenue
        </p>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dashboard.revenueOverTime}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
              />

              <YAxis />

              <Tooltip
                formatter={(value) =>
                  `₹${Number(value).toLocaleString("en-IN")}`
                }
              />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#16a34a"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Service Breakdown */}
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          Service Categories
        </h2>

        <p className="mb-5 text-sm text-gray-500">
          Bookings by service category
        </p>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dashboard.serviceBreakdown}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="category"
                tick={{ fontSize: 12 }}
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="count"
                fill="#7c3aed"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;