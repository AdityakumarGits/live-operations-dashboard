import { NextFunction, Request, Response } from "express";

export const notFoundHandler = (
  _req: Request,
  res: Response
): void => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
};

export const errorHandler = (
  error: Error & { statusCode?: number },
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error("Unhandled API error:", error);

  const statusCode = error.statusCode ?? 500;

  if (statusCode === 500) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
    return;
  }

  res.status(statusCode).json({
    success: false,
    message: error.message || "Something went wrong",
  });
};
