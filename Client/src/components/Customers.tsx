import { useEffect, useState } from "react";
import { Users } from "lucide-react";

import api from "../services/api";

interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await api.get("/customers");

        setCustomers(response.data.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load customers.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Customers
        </h1>

        <p className="mt-4 text-gray-500">
          Loading customers...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Customers
        </h1>

        <p className="mt-4 text-red-500">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Customers
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          View and manage your customers.
        </p>
      </div>

      {/* Customer Table */}
      {customers.length === 0 ? (
        <div className="rounded-xl border bg-white p-10 text-center text-gray-500">
          No customers found.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-5 py-3">Customer</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Phone</th>
                  <th className="px-5 py-3">Joined</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {customers.map((customer) => (
                  <tr
                    key={customer._id}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                          <Users size={17} />
                        </div>

                        <span className="font-medium text-gray-900">
                          {customer.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {customer.email}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {customer.phone}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {new Date(
                        customer.createdAt
                      ).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;