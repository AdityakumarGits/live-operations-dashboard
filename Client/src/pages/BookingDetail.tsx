import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

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

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await api.get(`/bookings/${id}`);

        const data = response.data.data;

        setBooking(data);
        setStatus(data.status);
      } catch (error) {
        console.error(error);
        setError("Failed to load booking.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  const updateStatus = async () => {
    try {
      setUpdating(true);
      setError("");

      const response = await api.patch(
        `/bookings/${id}/status`,
        {
          status,
        }
      );

      setBooking(response.data.data);
    } catch (error) {
      console.error(error);
      setError("Failed to update booking status.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-gray-500">
        Loading booking...
      </div>
    );
  }

  if (error && !booking) {
    return (
      <div className="p-6 text-red-500">
        {error}
      </div>
    );
  }

  if (!booking) {
    return null;
  }

  return (
    <div>
      {/* Back button */}
      <button
        onClick={() => navigate("/bookings")}
        className="mb-5 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft size={18} />
        Back to bookings
      </button>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {booking.bookingNumber}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Booking details and status management
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Booking Information */}
        <div className="rounded-xl border bg-white p-5 shadow-sm lg:col-span-2">
          <h2 className="mb-5 text-lg font-semibold">
            Booking Information
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500">
                Customer
              </p>
              <p className="mt-1 font-medium">
                {booking.customerId?.name || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Phone
              </p>
              <p className="mt-1 font-medium">
                {booking.customerId?.phone || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Vehicle
              </p>
              <p className="mt-1 font-medium">
                {booking.vehicleId
                  ? `${booking.vehicleId.brand} ${booking.vehicleId.model}`
                  : "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Registration
              </p>
              <p className="mt-1 font-medium">
                {booking.vehicleId?.registrationNumber || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Service
              </p>
              <p className="mt-1 font-medium">
                {booking.serviceId?.name || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Category
              </p>
              <p className="mt-1 font-medium">
                {booking.serviceId?.category || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Mechanic
              </p>
              <p className="mt-1 font-medium">
                {booking.mechanicId?.name || "Unassigned"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Amount
              </p>
              <p className="mt-1 font-medium">
                ₹{booking.amount.toLocaleString("en-IN")}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Scheduled At
              </p>
              <p className="mt-1 font-medium">
                {new Date(
                  booking.scheduledAt
                ).toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold">
            Update Status
          </h2>

          <label className="text-sm text-gray-500">
            Booking Status
          </label>

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value)
            }
            className="mt-2 w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-blue-500"
          >
            <option value="PENDING">Pending</option>
            <option value="ASSIGNED">Assigned</option>
            <option value="ON_THE_WAY">On The Way</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>

          <button
            onClick={updateStatus}
            disabled={updating || status === booking.status}
            className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {updating ? "Updating..." : "Update Status"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;