import { useEffect, useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import api from "../services/api";
import type { Booking } from "../types";
import BookingTable from "../components/dashboard/BookingTable";

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const limit = 10;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/bookings", {
          params: {
            page,
            limit,
            search: search || undefined,
            status: status || undefined,
            sortBy: "scheduledAt",
            sortOrder: "desc",
          },
        });

        setBookings(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
      } catch (error) {
        console.error(error);
        setError("Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [page, search, status]);

  // Search handler
  const handleSearch = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearch(event.target.value);
    setPage(1);
  };

  // Status filter handler
  const handleStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setStatus(event.target.value);
    setPage(1);
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Bookings
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage and monitor vehicle service bookings.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 rounded-xl border bg-white p-4 shadow-sm md:flex-row">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search booking ID..."
            className="w-full rounded-lg border py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
          />
        </div>

        {/* Status Filter */}
        <select
          value={status}
          onChange={handleStatusChange}
          className="rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-blue-500"
        >
          <option value="">All Statuses</option>

          <option value="PENDING">
            Pending
          </option>

          <option value="ASSIGNED">
            Assigned
          </option>

          <option value="ON_THE_WAY">
            On The Way
          </option>

          <option value="COMPLETED">
            Completed
          </option>

          <option value="CANCELLED">
            Cancelled
          </option>
        </select>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="rounded-xl border bg-white p-10 text-center text-gray-500">
          Loading bookings...
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="rounded-xl border bg-white p-10 text-center text-red-500">
          {error}
        </div>
      )}

      {/* Data */}
      {!loading && !error && (
        <>
          {/* Booking Table */}
          {bookings.length > 0 ? (
            <BookingTable
              bookings={bookings}
              title="All Bookings"
            />
          ) : (
            <div className="rounded-xl border bg-white p-10 text-center text-gray-500">
              No bookings found.
            </div>
          )}

          {/* Pagination */}
          {bookings.length > 0 && (
            <div className="mt-5 flex items-center justify-between rounded-xl border bg-white p-4 shadow-sm">
              {/* Page Information */}
              <p className="text-sm text-gray-500">
                Page {page} of {totalPages}
              </p>

              {/* Pagination Buttons */}
              <div className="flex items-center gap-2">
                {/* Previous */}
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className="rounded-lg border p-2 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={18} />
                </button>

                {/* Current Page */}
                <span className="px-3 text-sm font-medium">
                  {page}
                </span>

                {/* Next */}
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                  className="rounded-lg border p-2 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Bookings;