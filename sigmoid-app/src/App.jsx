import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/shared/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index />
          <Route path="/polls" />
          <Route path="/tinder" />
          <Route path="/matches" />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
