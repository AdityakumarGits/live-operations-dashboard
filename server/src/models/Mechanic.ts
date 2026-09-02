import mongoose from "mongoose";

const mechanicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["AVAILABLE", "ON_JOB", "ON_THE_WAY", "OFFLINE"],
      default: "AVAILABLE",
    },

    jobsCompleted: {
      type: Number,
      default: 0,
      min: 0,
    },

    currentBookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
  },
  {
    timestamps: true,
  }
);

const Mechanic = mongoose.model("Mechanic", mechanicSchema);

export default Mechanic;