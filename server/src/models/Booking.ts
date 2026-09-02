import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    bookingNumber: {
      type: String,
      required: true,
      unique: true,
    },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },

    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },

    mechanicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mechanic",
    },

    status: {
      type: String,
      enum: [
        "PENDING",
        "ASSIGNED",
        "ON_THE_WAY",
        "COMPLETED",
        "CANCELLED",
      ],
      default: "PENDING",
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    scheduledAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;