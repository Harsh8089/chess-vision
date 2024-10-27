import { CircleChevronRight } from "lucide-react";
import ErrorImg from "../assets/chess-board-404.png";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
    const navigate = useNavigate();

  return (
    <div className='min-h-[50vh] flex flex-col mt-12 justify-center items-center'>
        <img src={ErrorImg} alt="404"></img>
        <div className="font-semibold text-gray-400 tracking-wide text-xl">
            Requested Page was not found
        </div>
        <button 
            onClick={() => navigate("/")}
            className="bg-blue-800 bg-opacity-15 hover:bg-opacity-35 transition-all duration-300 flex gap-2 text-blue-light px-10 py-2 mt-5 rounded-2xl border-2 border-blue-light"
        >
            <p>Back to Home</p>
            <CircleChevronRight className="w-5" />
        </button>
    </div>
  )
}

export default PageNotFound