import Navbar from '../components/Navbar';
import GameMode from '../components/singleplayer/GameMode';
import GamePlay from '../components/singleplayer/GamePlay';
import { useSinglePlayer } from '../context/SinglePlayer';

function OnePlayer() {
  const { startGame } = useSinglePlayer();

  return (
    <div
      style={{ fontFamily: 'Supreme-Regular' }}
      className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white overflow-hidden"
    >
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col items-center gap-4">
          {
            startGame?  (
              <GamePlay />
            ) : (
              <GameMode />
            )
          }
      </div>
    </div>
  );
}

export default OnePlayer;