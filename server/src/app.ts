import express from "express";
import cors from "cors";

import "./models/Customer";
import "./models/Vehicle";
import "./models/Mechanic";
import "./models/Service";
import "./models/Booking";

import dashboardRoutes from "./routes/dashboard.routes";
import bookingRoutes from "./routes/booking.routes";
import mechanicRoutes from "./routes/mechanic.routes";
import customerRoutes from "./routes/customer.routes";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware";
import sseRoutes from "./routes/sse.routes";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Live Operations Dashboard API is running",
  });
});

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/mechanics", mechanicRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api", sseRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;