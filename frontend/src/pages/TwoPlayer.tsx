import { GameProvider } from '../context/GameContext';
import TwoPlayerLobby from '../components/TwoPlayerLobby';

function TwoPlayer() {
  return (
    <div className="w-full min-h-screen bg-black flex flex-col justify-center items-center p-4 text-white">
      TwoPlayer
      <GameProvider>
        <TwoPlayerLobby />
      </GameProvider>
    </div>
  )
}

export default TwoPlayer