import { Navigate, Route, Routes } from "react-router-dom";
import OnePlayer from "./pages/OnePlayer";
import TwoPlayer from "./pages/TwoPlayer";
import { useAuth } from "./context/AuthContext";
import Welcome from "./pages/Welcome";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const { user } = useAuth();

  return (
    <div
      style={{ fontFamily: 'Supreme-Regular' }}
      className="min-h-screen flex flex-col bg-gradient-to-b from-black to-gray-900 text-white overflow-hidden"
    >
      <Navbar />
      <main className="grow">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/single-player" element={user ? <OnePlayer /> : <Navigate to="/" />} />
          <Route path="/two-player" element={user ? <TwoPlayer /> : <Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App;
