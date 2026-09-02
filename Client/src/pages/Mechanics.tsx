import { useEffect, useState } from "react";
import { Wrench } from "lucide-react";

import api from "../services/api";

interface Mechanic {
  _id: string;
  name: string;
  phone: string;
  status: "AVAILABLE" | "ON_JOB" | "ON_THE_WAY" | "OFFLINE";
  jobsCompleted: number;
  currentBookingId?: {
    bookingNumber: string;
  };
}

const Mechanics = () => {
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMechanics = async () => {
      try {
        const response = await api.get("/mechanics");

        setMechanics(response.data.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load mechanics.");
      } finally {
        setLoading(false);
      }
    };

    fetchMechanics();
  }, []);

  const getStatusClass = (status: Mechanic["status"]) => {
    switch (status) {
      case "AVAILABLE":
        return "bg-green-100 text-green-700";

      case "ON_JOB":
        return "bg-blue-100 text-blue-700";

      case "ON_THE_WAY":
        return "bg-purple-100 text-purple-700";

      case "OFFLINE":
        return "bg-gray-100 text-gray-600";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Mechanics
        </h1>

        <p className="mt-4 text-gray-500">
          Loading mechanics...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Mechanics
        </h1>

        <p className="mt-4 text-red-500">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Mechanics
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Monitor mechanic availability and workload.
        </p>
      </div>

      {/* Mechanics Grid */}
      {mechanics.length === 0 ? (
        <div className="rounded-xl border bg-white p-10 text-center text-gray-500">
          No mechanics found.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {mechanics.map((mechanic) => (
            <div
              key={mechanic._id}
              className="rounded-xl border bg-white p-5 shadow-sm"
            >
              {/* Name + Icon */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <Wrench size={20} />
                  </div>

                  <div>
                    <h2 className="font-semibold text-gray-900">
                      {mechanic.name}
                    </h2>

                    <p className="text-sm text-gray-500">
                      {mechanic.phone}
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
                    mechanic.status
                  )}`}
                >
                  {mechanic.status.replace("_", " ")}
                </span>
              </div>

              {/* Stats */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-gray-50 p-3">
                  <p className="text-xs text-gray-500">
                    Jobs Completed
                  </p>

                  <p className="mt-1 text-lg font-semibold">
                    {mechanic.jobsCompleted}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-3">
                  <p className="text-xs text-gray-500">
                    Current Booking
                  </p>

                  <p className="mt-1 truncate text-sm font-semibold">
                    {mechanic.currentBookingId?.bookingNumber ||
                      "None"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Mechanics;