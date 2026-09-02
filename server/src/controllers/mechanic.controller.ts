import { NextFunction, Request, Response } from "express";
import Mechanic from "../models/Mechanic";

export const getMechanics = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const mechanics = await Mechanic.find()
      .select("name phone status jobsCompleted currentBookingId")
      .populate("currentBookingId")
      .sort({ name: 1 });

    res.status(200).json({
      success: true,
      data: mechanics,
    });
  } catch (error) {
    next(error);
  }
};

export const getMechanicById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const mechanic = await Mechanic.findById(req.params.id)
      .select("name phone status jobsCompleted currentBookingId")
      .populate("currentBookingId");

    if (!mechanic) {
      res.status(404).json({
        success: false,
        message: "Mechanic not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: mechanic,
    });
  } catch (error) {
    next(error);
  }
};
