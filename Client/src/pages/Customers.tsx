import { useEffect, useState } from "react";

import { Users } from "lucide-react";

import api from "../services/api";

interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  createdAt?: string;
}

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/customers");

      setCustomers(response.data.data);
    } catch (error) {
      console.error(error);
      setError("Failed to load customers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Customers
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          View and manage your customers.
        </p>

        <div className="mt-6 rounded-xl border bg-white p-10 text-center text-gray-500 shadow-sm">
          Loading customers...
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Customers
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          View and manage your customers.
        </p>

        <div className="mt-6 rounded-xl border bg-white p-10 text-center shadow-sm">
          <p className="text-red-500">
            {error}
          </p>

          <button
            onClick={fetchCustomers}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Customers
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          View and manage your customers.
        </p>
      </div>

      {/* Customer Count */}
      <div className="mb-6 rounded-xl border bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <Users size={20} />
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Total Customers
            </p>

            <p className="text-2xl font-bold text-gray-900">
              {customers.length}
            </p>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {customers.length === 0 ? (
        <div className="rounded-xl border bg-white p-10 text-center shadow-sm">
          <Users
            size={40}
            className="mx-auto text-gray-400"
          />

          <h2 className="mt-4 text-lg font-semibold text-gray-900">
            No customers found
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            There are no customers available yet.
          </p>
        </div>
      ) : (
        /* Customer Table */
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-5 py-3">
                    Customer
                  </th>

                  <th className="px-5 py-3">
                    Email
                  </th>

                  <th className="px-5 py-3">
                    Phone
                  </th>

                  <th className="px-5 py-3">
                    Joined
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {customers.map((customer) => (
                  <tr
                    key={customer._id}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      <div className="font-medium text-gray-900">
                        {customer.name}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {customer.email}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {customer.phone}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {customer.createdAt
                        ? new Date(
                            customer.createdAt
                          ).toLocaleDateString("en-IN")
                        : "-"}
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