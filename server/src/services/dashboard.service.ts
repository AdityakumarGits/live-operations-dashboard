import Booking from "../models/Booking";
import Customer from "../models/Customer";
import Mechanic from "../models/Mechanic";

const getStartOfToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

export const getDashboardData = async () => {
  const todayStart = getStartOfToday();

  const [totalBookings, todayBookings, completedBookings, pendingBookings, cancelledBookings, totalRevenue, activeMechanics, newCustomers] =
    await Promise.all([
      Booking.countDocuments(),
      Booking.countDocuments({ scheduledAt: { $gte: todayStart } }),
      Booking.countDocuments({ status: "COMPLETED" }),
      Booking.countDocuments({ status: "PENDING" }),
      Booking.countDocuments({ status: "CANCELLED" }),
      Booking.aggregate([
        { $group: { _id: null, totalRevenue: { $sum: "$amount" } } },
      ]),
      Mechanic.countDocuments({ status: { $in: ["AVAILABLE", "ON_JOB", "ON_THE_WAY"] } }),
      Customer.countDocuments({ createdAt: { $gte: todayStart } }),
    ]);

  const revenueTotal = totalRevenue[0]?.totalRevenue ?? 0;

  return {
    totalBookings,
    todayBookings,
    completedBookings,
    pendingBookings,
    cancelledBookings,
    totalRevenue: revenueTotal,
    activeMechanics,
    newCustomers,
  };
};

export const getBookingsOverTime = async () => {
  const results = await Booking.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$scheduledAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
    {
      $project: {
        _id: 0,
        date: "$_id",
        count: 1,
      },
    },
  ]);

  return results;
};

export const getRevenueOverTime = async () => {
  const results = await Booking.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$scheduledAt" } },
        revenue: { $sum: "$amount" },
      },
    },
    { $sort: { _id: 1 } },
    {
      $project: {
        _id: 0,
        date: "$_id",
        revenue: 1,
      },
    },
  ]);

  return results;
};

export const getBookingStatusBreakdown = async () => {
  const results = await Booking.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
    {
      $project: {
        _id: 0,
        status: "$_id",
        count: 1,
      },
    },
  ]);

  return results;
};

export const getServiceBreakdown = async () => {
  const results = await Booking.aggregate([
    {
      $lookup: {
        from: "services",
        localField: "serviceId",
        foreignField: "_id",
        as: "service",
      },
    },
    { $unwind: "$service" },
    {
      $group: {
        _id: "$service.category",
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
    {
      $project: {
        _id: 0,
        category: "$_id",
        count: 1,
      },
    },
  ]);

  return results;
};
