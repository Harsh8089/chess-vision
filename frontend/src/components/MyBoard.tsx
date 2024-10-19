import React, { useEffect, useState } from "react";
import { CELL_CLICKED } from "../consts/Message";
import { useGameContext } from "../context/GameContext";

function MyBoard({ socket, myCell }: { socket: WebSocket | null; myCell: string }) {
  const { username, roomId } = useGameContext();
  const [cellClicked, setCellClicked] = useState<string[]>([]);
  const [correctCell, setCorrectCell] = useState<boolean[]>([]);

  useEffect(() => {
    let currTry: number = cellClicked.length - 1;
    if (currTry >= 0) {
      if (cellClicked[currTry] === myCell) {
        console.log("correct");
        setCorrectCell((prev) => [...prev, true]);
      } else {
        setCorrectCell((prev) => [...prev, false]);
      }
    }
  }, [cellClicked]);


  const handleClick = (row: number, col: number) => {
      const cell = String.fromCharCode(col + 97) + (8 - row).toString();

      socket?.send(JSON.stringify({
          type: CELL_CLICKED,
          room_id: roomId,
          cell
      }));

      setCellClicked((prev) => [...prev, cell]);
  }


  return (
    <div className="w-[40vw] gap-10 flex">
      <div>{username}</div>
      <div>{myCell}</div>
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
      
      <div className="flex flex-row md:flex-col justify-center items-center gap-2 mt-4 md:mt-0">
              {Array.from({ length: 5 }, (_, idx) => (
                <div
                  key={idx}
                  className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full ${
                    correctCell[idx] === true
                      ? "bg-green-500"
                      : correctCell[idx] === false
                      ? "bg-red-500"
                      : "bg-gray-500"
                  }`}
                />
              ))}
        </div>


    </div>
  );
}

export default React.memo(MyBoard);