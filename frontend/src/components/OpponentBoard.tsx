import { useEffect, useState } from "react";
import { useGameContext } from "../context/GameContext";

function OpponentBoard({ socket, cell } : { socket: WebSocket | null, cell: string }) {
    const { opponentUsername } = useGameContext();
    const [cellToClick, setCellToClick] = useState<string>(cell);

    useEffect(() => {
        if(socket) {
            const handleMessage = (event: MessageEvent) => {
                const message = JSON.parse(event.data);
                if(message.type === 'PROVIDE' && message.player2) setCellToClick(message.cellToClick);
                else if(message.type === 'VERIFY') console.log(message); 
            }

            socket.addEventListener('message', handleMessage);

            return () => socket.removeEventListener('message', handleMessage);
        }
    }, [socket]);

  return (
    <div className="w-[40vw]">
        <div>{opponentUsername}</div>
        <div>{cellToClick}</div>
        <div className="w-full md:w-3/4 aspect-square grid grid-cols-9 grid-rows-9">
            {
                Array.from({ length: 81 }, (_, index) => {
                    const row = Math.floor(index / 9);
                    const col = index % 9;
                    let cell = "";
                    let cellStyle = "";

                    if(row == 8 && col == 0) {

                    }
                    else if(col == 0) {
                        cell = (8 - row).toString();
                        cellStyle = 'text-white flex justify-center items-center';
                    }
                    else if(row == 8) {
                        cell = String.fromCharCode(col + 96);
                        cellStyle = 'text-white flex justify-center items-center';
                    }
                    else {
                        cell = String.fromCharCode(col + 96) + (8 - row).toString();
                        cellStyle = (row + col) % 2 === 0 ? 'bg-blue-800' : 'bg-blue-100';
                    }

                    return (
                        <div
                            key={index}
                            className={`w-full h-full ${cellStyle}`}
                        >
                            {
                                ((col == 0 || row == 8) && cell)
                            }
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default OpponentBoard