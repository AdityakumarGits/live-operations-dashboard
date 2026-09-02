import { NextFunction, Request, Response } from "express";
import {
  getDashboardData,
  getBookingsOverTime,
  getRevenueOverTime,
  getBookingStatusBreakdown,
  getServiceBreakdown,
} from "../services/dashboard.service";

export const getDashboard = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const stats = await getDashboardData();
    const bookingsOverTime = await getBookingsOverTime();
    const revenueOverTime = await getRevenueOverTime();
    const bookingStatus = await getBookingStatusBreakdown();
    const serviceBreakdown = await getServiceBreakdown();

    res.status(200).json({
      success: true,
      data: {
        ...stats,
        bookingsOverTime,
        revenueOverTime,
        bookingStatus,
        serviceBreakdown,
      },
    });
  } catch (error) {
    next(error);
  }
};
