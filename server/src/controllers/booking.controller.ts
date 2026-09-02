import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import {
  getBookingById as getBookingByIdFromService,
  getBookingsList,
  updateBookingStatus,
} from "../services/booking.service";

const bookingStatusSchema = z.object({
  status: z.enum(["PENDING", "ASSIGNED", "ON_THE_WAY", "COMPLETED", "CANCELLED"]),
});

export const getBookings = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await getBookingsList(req.query);

    res.status(200).json({
      success: true,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
      },
      data: result.bookings,
    });
  } catch (error) {
    next(error);
  }
};

export const getBookingById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const bookingId = typeof req.params.id === "string" ? req.params.id : "";
    const booking = await getBookingByIdFromService(bookingId);

    if (!booking) {
      res.status(404).json({
        success: false,
        message: "Booking not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

export const patchBookingStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = bookingStatusSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: "Invalid booking status",
      });
      return;
    }

    const bookingId = typeof req.params.id === "string" ? req.params.id : "";
    const booking = await updateBookingStatus(bookingId, result.data.status);

    if (!booking) {
      res.status(404).json({
        success: false,
        message: "Booking not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};