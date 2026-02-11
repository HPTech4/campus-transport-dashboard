import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import TopUp from "./pages/TopUp";
import RideHistory from "./pages/RideHistory";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="topup" element={<TopUp />} />
          <Route path="rides" element={<RideHistory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
