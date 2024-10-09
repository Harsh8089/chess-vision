import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import OnePlayer from "./pages/OnePlayer";
import TwoPlayer from "./pages/TwoPlayer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/single-player" element={<OnePlayer />} />
      <Route path="/two-player" element={<TwoPlayer />}></Route>
    </Routes>
  )
}

export default App