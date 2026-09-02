import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import api from "../services/api";
import type { Booking } from "../types";

const BookingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState<Booking | null>(null);

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch booking details
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/bookings/${id}`);

        const bookingData = response.data.data;

        setBooking(bookingData);
        setStatus(bookingData.status);
      } catch (error) {
        console.error(error);
        setError("Failed to load booking details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBooking();
    }
  }, [id]);

  // Update booking status
  const handleStatusUpdate = async () => {
    if (!id || !status) {
      return;
    }

    try {
      setUpdating(true);
      setError("");
      setSuccess("");

      const response = await api.patch(
        `/bookings/${id}/status`,
        {
          status,
        }
      );

      setBooking(response.data.data);

      setSuccess("Booking status updated successfully.");

      // Remove success message after 3 seconds
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      console.error(error);
      setError("Failed to update booking status.");
    } finally {
      setUpdating(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center text-gray-500">
        Loading booking details...
      </div>
    );
  }

  // Error state
  if (error && !booking) {
    return (
      <div>
        <button
          onClick={() => navigate("/bookings")}
          className="mb-5 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={18} />
          Back to Bookings
        </button>

        <div className="rounded-xl border bg-white p-10 text-center text-red-500">
          {error}
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center text-gray-500">
        Booking not found.
      </div>
    );
  }

  return (
    <div>
      {/* Back Button */}
      <button
        onClick={() => navigate("/bookings")}
        className="mb-5 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft size={18} />
        Back to Bookings
      </button>

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Booking {booking.bookingNumber}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          View booking details and update service status.
        </p>
      </div>

      {/* Messages */}
      {error && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-5 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-600">
          {success}
        </div>
      )}

      {/* Booking Information */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Customer */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Customer
          </h2>

          <div className="space-y-3 text-sm">
            <div>
              <p className="text-gray-500">Name</p>
              <p className="font-medium text-gray-900">
                {booking.customerId?.name || "-"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-medium text-gray-900">
                {booking.customerId?.email || "-"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Phone</p>
              <p className="font-medium text-gray-900">
                {booking.customerId?.phone || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Vehicle */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Vehicle
          </h2>

          <div className="space-y-3 text-sm">
            <div>
              <p className="text-gray-500">
                Registration Number
              </p>
              <p className="font-medium text-gray-900">
                {booking.vehicleId?.registrationNumber || "-"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Vehicle</p>
              <p className="font-medium text-gray-900">
                {booking.vehicleId?.brand || "-"}{" "}
                {booking.vehicleId?.model || ""}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Year</p>
              <p className="font-medium text-gray-900">
                {booking.vehicleId?.year || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Service */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Service
          </h2>

          <div className="space-y-3 text-sm">
            <div>
              <p className="text-gray-500">Service</p>
              <p className="font-medium text-gray-900">
                {booking.serviceId?.name || "-"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Category</p>
              <p className="font-medium text-gray-900">
                {booking.serviceId?.category || "-"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Amount</p>
              <p className="text-lg font-bold text-gray-900">
                ₹{booking.amount.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>

        {/* Mechanic */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Mechanic
          </h2>

          <div className="space-y-3 text-sm">
            <div>
              <p className="text-gray-500">Name</p>
              <p className="font-medium text-gray-900">
                {booking.mechanicId?.name || "Unassigned"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Phone</p>
              <p className="font-medium text-gray-900">
                {booking.mechanicId?.phone || "-"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Mechanic Status</p>
              <p className="font-medium text-gray-900">
                {booking.mechanicId?.status || "-"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Status Section */}
      <div className="mt-6 rounded-xl border bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Booking Status
        </h2>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-blue-500"
          >
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

          <button
            onClick={handleStatusUpdate}
            disabled={updating || status === booking.status}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {updating ? "Updating..." : "Update Status"}
          </button>
        </div>

        <p className="mt-3 text-xs text-gray-500">
          Current status: {booking.status.replace("_", " ")}
        </p>
      </div>
    </div>
  );
};

export default BookingDetail;