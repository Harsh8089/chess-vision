import { useGameContext } from "../../context/GameContext";

interface ButtonProps {
  socket: WebSocket | null;
  type: string;
  label: string; 
}

function Button({ socket, type, label }: ButtonProps) {
  const { roomId, username } = useGameContext();

  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded"
      onClick={() => socket?.send(JSON.stringify({
        type,
        room_id: roomId,
        username
      }))}
    >
      {label}
    </button>
  );
}

export default Button;
