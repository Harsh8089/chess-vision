import React, { useEffect, useState, useCallback } from "react";
import { CELL_CLICKED } from "../consts/Message";
import { useGameContext } from "../context/GameContext";

function MyBoard({ socket, cell }: { socket: WebSocket | null; cell: string }) {
  const { username, roomId } = useGameContext();
  const [cellToClick, setCellToClick] = useState<string>(cell);

  const handleClick = (row: number, col: number) => {
        socket?.send(JSON.stringify({
            type: CELL_CLICKED,
            room_id: roomId,
            cell: String.fromCharCode(col + 97) + (8 - row).toString()
        }));
    }

  useEffect(() => {
    if(socket) {
        const handleMessage = (event: MessageEvent) => {
            const message = JSON.parse(event.data);
            if(message.type === 'PROVIDE' && message.player1) setCellToClick(message.cellToClick);
            else if(message.type === 'VERIFY') console.log(message); 
        }

        socket.addEventListener('message', handleMessage);

        return () => socket.removeEventListener('message', handleMessage);
    }
  }, [socket]);

  console.log("Rendering with cellToClick:", cellToClick);

  return (
    <div className="w-[40vw]">
      <div>{username}</div>
      <div>{cellToClick}</div>
      <div className="w-full md:w-3/4 aspect-square grid grid-cols-9 grid-rows-9">
        {Array.from({ length: 81 }, (_, index) => {
          const row = Math.floor(index / 9);
          const col = index % 9;
          let cell = "";
          let cellStyle = "";

          if (row === 8 && col === 0) {
            // Empty cell
          } else if (col === 0) {
            cell = (8 - row).toString();
            cellStyle = 'text-white flex justify-center items-center';
          } else if (row === 8) {
            cell = String.fromCharCode(col + 96);
            cellStyle = 'text-white flex justify-center items-center';
          } else {
            cell = String.fromCharCode(col + 96) + (8 - row).toString();
            cellStyle = (row + col) % 2 === 0 ? 'bg-blue-800' : 'bg-blue-100';
          }

          return (
            <div
              key={index}
              className={`w-full h-full ${cellStyle} ${col > 0 && row < 8 ? 'cursor-pointer' : ''}`}
              onClick={() => col > 0 && row < 8 && handleClick(row, col - 1)}
            >
              {(col === 0 || row === 8) && cell}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(MyBoard);