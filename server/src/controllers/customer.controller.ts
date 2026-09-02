import { NextFunction, Request, Response } from "express";
import Customer from "../models/Customer";

export const getCustomers = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const customers = await Customer.find()
      .select("name email phone createdAt")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: customers,
    });
  } catch (error) {
    next(error);
  }
};

export const getCustomerById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const customer = await Customer.findById(req.params.id).select(
      "name email phone createdAt"
    );

    if (!customer) {
      res.status(404).json({
        success: false,
        message: "Customer not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    next(error);
  }
};
