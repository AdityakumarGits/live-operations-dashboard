import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Mechanics from "./pages/Mechanics";
import Customers from "./components/Customers";
import BookingDetail from "./pages/BookingDetail";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/mechanics" element={<Mechanics />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/bookings/:id" element={<BookingDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
