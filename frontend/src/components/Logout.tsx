import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Logout() {
const navigate = useNavigate();
  const { setUser } = useAuth();

  const logout = () => {
      localStorage.removeItem('user');
      setUser(null);
      navigate('/');
  }
  return (
    <button
        onClick={() => logout()}
      >
        Logout
    </button>
  )
}

export default Logout