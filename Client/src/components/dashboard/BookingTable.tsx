import { useNavigate } from "react-router-dom";
import type { Booking } from "../../types";

interface BookingTableProps {
  bookings: Booking[];
  title?: string;
}

const BookingTable = ({
  bookings,
  title = "Bookings",
}: BookingTableProps) => {
  const navigate = useNavigate();

  const getStatusClass = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      case "ASSIGNED":
        return "bg-blue-100 text-blue-700";

      case "ON_THE_WAY":
        return "bg-purple-100 text-purple-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="mt-6 rounded-xl border bg-white shadow-sm">
      {/* Table Header */}
      <div className="border-b p-5">
        <h2 className="text-lg font-semibold text-gray-900">
          {title}
        </h2>

        <p className="text-sm text-gray-500">
          Latest vehicle service bookings
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-5 py-3">
                Booking
              </th>

              <th className="px-5 py-3">
                Customer
              </th>

              <th className="px-5 py-3">
                Vehicle
              </th>

              <th className="px-5 py-3">
                Service
              </th>

              <th className="px-5 py-3">
                Mechanic
              </th>

              <th className="px-5 py-3">
                Status
              </th>

              <th className="px-5 py-3">
                Amount
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {bookings.map((booking) => (
              <tr
                key={booking._id}
                onClick={() =>
                  navigate(`/bookings/${booking._id}`)
                }
                className="cursor-pointer hover:bg-gray-50"
              >
                {/* Booking */}
                <td className="px-5 py-4 font-medium">
                  {booking.bookingNumber}
                </td>

                {/* Customer */}
                <td className="px-5 py-4">
                  {booking.customerId?.name || "-"}
                </td>

                {/* Vehicle */}
                <td className="px-5 py-4">
                  {booking.vehicleId?.registrationNumber || "-"}
                </td>

                {/* Service */}
                <td className="px-5 py-4">
                  {booking.serviceId?.name || "-"}
                </td>

                {/* Mechanic */}
                <td className="px-5 py-4">
                  {booking.mechanicId?.name || "Unassigned"}
                </td>

                {/* Status */}
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
                      booking.status
                    )}`}
                  >
                    {booking.status.replace("_", " ")}
                  </span>
                </td>

                {/* Amount */}
                <td className="px-5 py-4 font-medium">
                  ₹{booking.amount.toLocaleString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingTable;