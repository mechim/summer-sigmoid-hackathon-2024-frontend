import { Routes, Route } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Tinder from "../pages/Tinder";
import Matches from "../pages/Matches";
import Polls from "../pages/Polls";

export default function PageLayout() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/tinder" element={<Tinder />} />
        <Route path="/polls" element={<Polls />} />
        <Route path="/matches" element={<Matches />} />
      </Routes>
    </>
  );
}
