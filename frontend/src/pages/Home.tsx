import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="w-[100vw] h-[100vh] bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-10">Game Mode Selection</h1>
      <div className="flex items-center w-[500px] justify-evenly">
        <Link to="/single-player">
          <button className="px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded text-lg font-semibold">
            Single Player
          </button>
        </Link>

        <Link to="/two-player">
          <button className="px-8 py-4 bg-green-500 hover:bg-green-600 rounded text-lg font-semibold">
            Two Player
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
