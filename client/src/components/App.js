import "../css/index.css";
import Challenge from "./Challenge";
import Home from "./Home";
import All from "./All";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>} />

        <Route path="challenge">
          <Route path=":id" element={<Challenge></Challenge>} />
        </Route>

        <Route path="all" element={<All></All>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
