import express from "express";
import {
  getBookingById,
  getBookings,
  patchBookingStatus,
} from "../controllers/booking.controller";

const router = express.Router();

router.get("/", getBookings);
router.get("/:id", getBookingById);
router.patch("/:id/status", patchBookingStatus);

export default router;