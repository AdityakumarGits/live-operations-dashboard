import {
  LayoutDashboard,
  CalendarDays,
  Wrench,
  Users,
  BarChart3,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    name: "Bookings",
    icon: CalendarDays,
    path: "/bookings",
  },
  {
    name: "Mechanics",
    icon: Wrench,
    path: "/mechanics",
  },
  {
    name: "Customers",
    icon: Users,
    path: "/customers",
  },
  {
    name: "Analytics",
    icon: BarChart3,
    path: "/analytics",
  },
];

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 z-20 hidden h-screen w-64 border-r bg-white md:block">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-bold text-gray-900">
          Instant Mechanic
        </h1>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `mb-1 flex items-center gap-3 rounded-lg px-4 py-3 ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={20} />

              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;