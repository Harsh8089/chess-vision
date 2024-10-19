import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import OnePlayer from "./pages/OnePlayer";
import TwoPlayer from "./pages/TwoPlayer";
import { useAuth } from "./context/AuthContext";
import PublicHome from "./pages/PublicHome";

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<PublicHome />} />
      <Route path="/home" element={ user ? <Home /> : <Navigate to="/" />} />
      <Route path="/single-player" element={ user ? <OnePlayer /> : <Navigate to="/" />} />
      <Route path="/two-player" element={ user ? <TwoPlayer /> : <Navigate to="/" /> }></Route>
    </Routes>
  )
}

export default App