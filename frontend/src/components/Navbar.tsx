import { Crown, Sword, Swords, UserRound } from "lucide-react"
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

  return (
    <div className='max-w-[80vw] mx-auto mt-10 flex justify-between items-center'>
        <div className="flex gap-10">
            <button 
                onClick={() => navigate("/")}
                className="text-2xl tracking-wide font-semibold flex cursor-pointer"
            >
                <h1>Square</h1>
                <h1 className="text-blue-light">Blitz</h1>
            </button>
            <div className="flex items-center gap-4">
                {
                    [Crown, Sword, Swords].map((icon, index) => {
                        const IconComponent = icon;
                        return (
                            <button 
                                key={index} 
                                className="hover:opacity-100 opacity-70 transition-all duration-200"
                                onClick={() => navigate("/single-player")}
                            >
                                <IconComponent className="text-white" size={25} cursor="pointer" />
                            </button>
                        )
                    })
                }
            </div>
        </div>
        <div className="flex">
            <button className="hover:opacity-100 opacity-70 transition-all duration-200">
                <UserRound color="white" size="25" cursor="pointer" />
            </button>
        </div>
    </div>
  )
}

export default Navbar