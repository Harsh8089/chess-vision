import { useGameContext } from "../../context/GameContext";

function OpponentBoard({ socket, opponentCell, opponentCorrectCell } : { socket: WebSocket | null, opponentCell: string, opponentCorrectCell: boolean[] }) {
    const { opponentUsername } = useGameContext();
    

  return (
    <div className="w-[40vw] gap-10 flex">
        <div>{opponentUsername}</div>
        <div>{opponentCell}</div>
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

        <div className="flex flex-row md:flex-col justify-center items-center gap-2 mt-4 md:mt-0">
              {Array.from({ length: 5 }, (_, idx) => (
                <div
                  key={idx}
                  className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full ${
                    opponentCorrectCell[idx] === true
                      ? "bg-green-500"
                      : opponentCorrectCell[idx] === false
                      ? "bg-red-500"
                      : "bg-gray-500"
                  }`}
                />
              ))}
        </div>

    </div>
  )
}

export default OpponentBoard