import { useEffect, useRef, useState } from "react";
import initCellSequenceByCellCount from "../../utils/generateCellSequence";
import Row from "../Row";
import Board from "./Board";
import Column from "../Column";
import CellResultTracker from "../CellResultTracker";
import "../../styles/fadeOutText.css"
import { useSinglePlayer } from "../../context/SinglePlayer";

function GamePlay() {
  const { selectedTime, selectedCells } = useSinglePlayer();

  const [cellSequence, setCellSequence] = useState<string[]>([]);
  const [cellClicked, setCellClicked] = useState<string[]>([]);
  const [correctCell, setCorrectCell] = useState<boolean[]>([]);
  const [time, setTime] = useState(0);
  const [stats, setStats] = useState<number[]>([]);

  const fadeOutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(selectedCells) setCellSequence(initCellSequenceByCellCount(selectedCells));
  }, []);

  useEffect(() => {
    let currTry: number = cellClicked.length - 1;
    if (currTry >= 0) {
      if (cellClicked[currTry] === cellSequence[currTry]) {
        setCorrectCell((prev) => [...prev, true]);
      } else {
        setCorrectCell((prev) => [...prev, false]);
      }
    }
  }, [cellClicked, cellSequence]);

  const handleClick = (row: number, col: number) => {
    const cell = String.fromCharCode(col + 97) + (8 - row).toString();
    console.log("cell clicked: ", cell);
    setCellClicked((prev) => [...prev, cell]);
    setStats((prev) => [...prev, time]);

    if(fadeOutRef.current) {
      fadeOutRef.current.classList.remove("fade-out");
      void fadeOutRef.current.offsetWidth;
      fadeOutRef.current.classList.add("fade-out");
    }
  };

  useEffect(() => {
    console.log("Cell Sequence:", cellSequence);
  }, [cellSequence]);

  return (
    <div className="w-[80vw] flex justify-center items-center">
      {cellClicked.length < cellSequence.length ? (
        <div className="flex w-full">
          <div className="flex flex-col  w-3/4 justify-center items-center">
            <div className="flex flex-col items-center w-full">
              <div className="flex justify-center items-center w-full">
                <Row style="h-full w-10 text-white grid grid-rows-8" />
                <div className="w-[70%] flex justify-center items-center">
                  <Board
                    style="aspect-square grid grid-cols-8 grid-rows-8 mb-4 md:mb-0 relative w-full"
                    cellClicked={cellClicked} 
                    cellSequence={cellSequence}
                    handleClick={handleClick}
                  >
                    <div 
                      ref={fadeOutRef}
                      className="fade-out absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] text-9xl font-bold text-orange-400"
                    >
                      {cellSequence[cellClicked.length]}
                    </div>
                  </Board>
                </div>
              </div>
              <Column style={["w-full flex justify-center", "h-[20px] w-10", "h-[20px] w-[70%] grid grid-cols-8 text-white"]} />
            </div>
          </div>
          <CellResultTracker 
            style="w-1/3"
            correctCell={correctCell}
            cellSequence={cellSequence}
          />
        </div>
      ) : (
        <div className="text-white">
          {/* Game over content */}
        </div>
      )}
    </div>
  );
}

export default GamePlay;