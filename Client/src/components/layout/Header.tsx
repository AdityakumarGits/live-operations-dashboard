import { Bell, User } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 md:left-64 md:px-6">
      <div>
        <h2 className="text-lg font-semibold">
          Live Operations
        </h2>

        <p className="hidden text-sm text-gray-500 sm:block">
          Monitor your service operations
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* Live Indicator */}
        <div className="hidden items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 sm:flex">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          Live
        </div>

        <button className="rounded-full p-2 hover:bg-gray-100">
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200">
            <User size={18} />
          </div>

          <span className="hidden text-sm font-medium sm:block">
            Admin
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;