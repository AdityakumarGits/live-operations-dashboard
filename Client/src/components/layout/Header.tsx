import { Bell, User } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed left-64 right-0 top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-6">
      <div>
        <h2 className="text-lg font-semibold">
          Live Operations
        </h2>

        <p className="text-sm text-gray-500">
          Monitor your service operations
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-full p-2 hover:bg-gray-100">
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200">
            <User size={18} />
          </div>

          <span className="text-sm font-medium">
            Admin
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;