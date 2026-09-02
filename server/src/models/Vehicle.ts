import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },

  registrationNumber: {
    type: String,
    required: true,
    unique: true,
  },

  brand: {
    type: String,
    required: true,
  },

  model: {
    type: String,
    required: true,
  },

  year: {
    type: Number,
    required: true,
  },
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;