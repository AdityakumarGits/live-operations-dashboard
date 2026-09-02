import Booking from "../models/Booking";
import "../models/Customer";
import "../models/Vehicle";
import "../models/Service";
import "../models/Mechanic";

const ALLOWED_STATUS = [
  "PENDING",
  "ASSIGNED",
  "ON_THE_WAY",
  "COMPLETED",
  "CANCELLED",
] as const;

type BookingStatus = (typeof ALLOWED_STATUS)[number];

const defaultSortBy = "scheduledAt";
const defaultSortOrder = "desc";

export const getBookingsList = async (query: Record<string, unknown>) => {
  const page = Number(query.page ?? 1);
  const limit = Number(query.limit ?? 10);
  const search = typeof query.search === "string" ? query.search.trim() : "";
  const status = typeof query.status === "string" ? query.status : "";
  const sortBy =
    typeof query.sortBy === "string" && (query.sortBy === "amount" || query.sortBy === "scheduledAt")
      ? query.sortBy
      : defaultSortBy;
  const sortOrder =
    typeof query.sortOrder === "string" && (query.sortOrder === "asc" || query.sortOrder === "desc")
      ? query.sortOrder
      : defaultSortOrder;

  const safePage = Number.isFinite(page) && page > 0 ? page : 1;
  const safeLimit = Number.isFinite(limit) && limit > 0 ? limit : 10;

  const filters: Record<string, unknown> = {};

  if (search) {
    filters.bookingNumber = { $regex: search, $options: "i" };
  }

  if (status && ALLOWED_STATUS.includes(status as BookingStatus)) {
    filters.status = status;
  }

  const sortObject: Record<string, 1 | -1> = {
    [sortBy]: sortOrder === "asc" ? 1 : -1,
  };

  const [bookings, total] = await Promise.all([
    Booking.find(filters)
      .populate({ path: "customerId", select: "name email phone" })
      .populate({ path: "vehicleId", select: "registrationNumber brand model year" })
      .populate({ path: "serviceId", select: "name category basePrice" })
      .populate({ path: "mechanicId", select: "name phone status" })
      .sort(sortObject)
      .skip((safePage - 1) * safeLimit)
      .limit(safeLimit)
      .lean(),
    Booking.countDocuments(filters),
  ]);

  return {
    page: safePage,
    limit: safeLimit,
    total,
    totalPages: Math.ceil(total / safeLimit) || 1,
    bookings,
  };
};

export const getBookingById = async (id: string) => {
  const booking = await Booking.findById(id)
    .populate({ path: "customerId", select: "name email phone" })
    .populate({ path: "vehicleId", select: "registrationNumber brand model year" })
    .populate({ path: "serviceId", select: "name category basePrice" })
    .populate({ path: "mechanicId", select: "name phone status" });

  return booking;
};

export const updateBookingStatus = async (id: string, status: BookingStatus) => {
  const booking = await Booking.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  )
    .populate({ path: "customerId", select: "name email phone" })
    .populate({ path: "vehicleId", select: "registrationNumber brand model year" })
    .populate({ path: "serviceId", select: "name category basePrice" })
    .populate({ path: "mechanicId", select: "name phone status" });

  return booking;
};
