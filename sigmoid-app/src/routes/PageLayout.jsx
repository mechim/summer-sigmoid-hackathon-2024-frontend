import { Routes, Route } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Tinder from "../pages/Tinder";
import Matches from "../pages/Matches";
import Polls from "../pages/Polls";
import PollDiscussion from "../components/polls/PollDiscussion";

export default function PageLayout() {
  return (
    <>
      <Routes>
        <Route path="/tinder" element={<Tinder />} />
        <Route path="/polls" element={<Polls />} />
        <Route path="/discussion" element={<PollDiscussion />} />
        <Route path="/matches" element={<Matches />} />
      </Routes>
      <Navbar />
    </>
  );
}
