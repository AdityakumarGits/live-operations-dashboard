import dotenv from "dotenv";

dotenv.config();

import mongoose from "mongoose";

import Customer from "../models/Customer";
import Vehicle from "../models/Vehicle";
import Mechanic from "../models/Mechanic";
import Service from "../models/Service";
import Booking from "../models/Booking";

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI as string);

    console.log("MongoDB connected");

    // Clear old data
    await Customer.deleteMany({});
    await Vehicle.deleteMany({});
    await Mechanic.deleteMany({});
    await Service.deleteMany({});
    await Booking.deleteMany({});

    console.log("Old data deleted");

    // -------------------------
    // 1. Create Services
    // -------------------------

    const services = await Service.insertMany([
      {
        name: "Oil Change",
        category: "Maintenance",
        basePrice: 999,
      },
      {
        name: "General Service",
        category: "Maintenance",
        basePrice: 2499,
      },
      {
        name: "AC Service",
        category: "AC",
        basePrice: 1499,
      },
      {
        name: "Brake Service",
        category: "Brake",
        basePrice: 1999,
      },
      {
        name: "Battery Replacement",
        category: "Electrical",
        basePrice: 4999,
      },
      {
        name: "Tyre Replacement",
        category: "Tyres",
        basePrice: 3999,
      },
      {
        name: "Engine Check",
        category: "Engine",
        basePrice: 2999,
      },
      {
        name: "Car Wash",
        category: "Cleaning",
        basePrice: 599,
      },
    ]);

    console.log(`${services.length} services created`);

    // -------------------------
    // 2. Create Customers
    // -------------------------

    const customers = [];

    for (let i = 1; i <= 50; i++) {
      let createdAt: Date;

      // First 8 customers are new customers
      // created within the last 7 days.
      if (i <= 8) {
        createdAt = new Date(
          Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
        );
      } else {
        // Older customers
        createdAt = new Date(
          Date.now() - Math.floor(8 + Math.random() * 90) * 24 * 60 * 60 * 1000,
        );
      }

      customers.push({
        name: `Customer ${i}`,
        email: `customer${i}@example.com`,
        phone: `98765000${String(i).padStart(2, "0")}`,
        createdAt,
        updatedAt: createdAt,
      });
    }

    const createdCustomers = await Customer.insertMany(customers);

    console.log(`${createdCustomers.length} customers created`);

    // -------------------------
    // 3. Create Vehicles
    // -------------------------

    const brands = ["Honda", "Hyundai", "Tata", "Maruti", "Toyota"];

    const vehicles = [];

    for (let i = 1; i <= 100; i++) {
      const customer =
        createdCustomers[Math.floor(Math.random() * createdCustomers.length)];

      const brand = brands[Math.floor(Math.random() * brands.length)];

      vehicles.push({
        customerId: customer._id,

        registrationNumber: `DL${String(i).padStart(2, "0")}AB${String(
          1000 + i,
        )}`,

        brand,

        model: "City",

        year: 2018 + Math.floor(Math.random() * 8),
      });
    }

    const createdVehicles = await Vehicle.insertMany(vehicles);

    console.log(`${createdVehicles.length} vehicles created`);

    // -------------------------
    // 4. Create Mechanics
    // -------------------------

    const mechanics = [];

    for (let i = 1; i <= 20; i++) {
      mechanics.push({
        name: `Mechanic ${i}`,

        phone: `98111000${String(i).padStart(2, "0")}`,

        status: "AVAILABLE",

        jobsCompleted: Math.floor(Math.random() * 150),
      });
    }

    const createdMechanics = await Mechanic.insertMany(mechanics);

    console.log(`${createdMechanics.length} mechanics created`);

    // -------------------------
    // 5. Create Bookings
    // -------------------------

    const statuses = [
      "PENDING",
      "ASSIGNED",
      "ON_THE_WAY",
      "COMPLETED",
      "CANCELLED",
    ];

    const bookings = [];

    for (let i = 1; i <= 500; i++) {
      // Pick random vehicle
      const vehicle =
        createdVehicles[Math.floor(Math.random() * createdVehicles.length)];

      // Find vehicle customer
      const customer = createdCustomers.find(
        (customer) => customer._id.toString() === vehicle.customerId.toString(),
      );

      if (!customer) {
        throw new Error("Customer not found for vehicle");
      }

      // Pick random service
      const service = services[Math.floor(Math.random() * services.length)];

      // Pick random status
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      let mechanicId = undefined;

      // Assign mechanic if booking is not
      // pending or cancelled
      if (status !== "PENDING" && status !== "CANCELLED") {
        const mechanic =
          createdMechanics[Math.floor(Math.random() * createdMechanics.length)];

        mechanicId = mechanic._id;
      }

      // -------------------------
      // Booking Date
      // -------------------------

      let scheduledAt: Date;

      // First 30 bookings are scheduled today.
      if (i <= 30) {
        const today = new Date();

        today.setHours(
          9 + Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 60),
          0,
          0,
        );

        scheduledAt = today;
      } else {
        // Remaining bookings are distributed
        // across the previous 30 days.
        scheduledAt = new Date(
          Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
        );
      }

      bookings.push({
        bookingNumber: `BK-${1000 + i}`,

        customerId: customer._id,

        vehicleId: vehicle._id,

        serviceId: service._id,

        mechanicId,

        status,

        amount: service.basePrice,

        scheduledAt,
      });
    }

    const createdBookings = await Booking.insertMany(bookings);

    console.log(`${createdBookings.length} bookings created`);

    console.log("Database seeded successfully");

    await mongoose.disconnect();

    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);

    await mongoose.disconnect();

    process.exit(1);
  }
};

seedDatabase();
