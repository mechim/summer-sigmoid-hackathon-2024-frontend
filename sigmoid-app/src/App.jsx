import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Tinder from './pages/Tinder'
import Matches from "./pages/Matches";
import Polls from "./pages/Polls";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index />
          <Route path="/tinder" element={<Tinder/>}/>
          <Route path="/polls" element={<Polls />} />
          <Route path="/matches" element={<Matches />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
