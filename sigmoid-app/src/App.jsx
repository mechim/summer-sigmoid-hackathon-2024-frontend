import { BrowserRouter, Route, Routes } from "react-router-dom";
import Categories from "./pages/Categories";
import PageLayout from "./routes/PageLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Categories />} />
          <Route path="*" element={<PageLayout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
