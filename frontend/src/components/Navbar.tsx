import { Crown, Sword, Swords, UserRound } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../assets/chess-board.png";

const NavItems = [
    {
        icon: Crown,
        to: '/leaderboard'
    },
    {
        icon: Sword,
        to: '/single-player'
    },
    {
        icon: Swords,
        to: '/two-player'
    },
];

function Navbar() {
    const location = useLocation();

    return (
        <div className='min-w-[80vw] mx-auto mt-10 flex justify-between items-center'>
            <div className="flex gap-10">
                <Link to="/">
                    <button className="text-2xl tracking-wide font-semibold flex cursor-pointer gap-1">
                        <img src={Logo} width={22} alt="Logo" />
                        <h1>Square</h1>
                        <h1 className="text-blue-light">Blitz</h1>
                    </button>
                </Link>
                <div className="flex items-center gap-4">
                    {
                        NavItems.map((item, index) => {
                            const IconComponent = item.icon;
                            return (
                                <button
                                    onClick={() => {
                                        if(location.pathname === item.to) {
                                            window.location.reload();
                                        }
                                    }}
                                >
                                    <NavLink 
                                        key={index} 
                                        to={item.to} 
                                        className={({ isActive }) => 
                                            `hover:opacity-100  transition-all duration-200 ${isActive? "opacity-100" : "opacity-50"}`
                                        }
                                    >
                                        <IconComponent 
                                            className={`font-bold hover:scale-105 hover:-translate-y-[3px] transition-all duration-250`} 
                                            size={25} 
                                        />
                                    </NavLink>
                                </button>
                            );
                        })
                    }
                </div>
            </div>
            <div className="flex">
                <button className="hover:opacity-100 opacity-70 transition-all duration-200">
                    <UserRound color="white" size="25" />
                </button>
            </div>
        </div>
    );
}

export default Navbar;
