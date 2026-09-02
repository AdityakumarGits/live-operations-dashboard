import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <Header />

      <main className="pt-16 md:ml-64">
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;