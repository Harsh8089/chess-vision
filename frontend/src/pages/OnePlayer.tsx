import { useEffect, useState } from "react";
import PushableButton from "../components/PushableButton";
import "../fonts/fonts/PilcrowRounded-Regular.ttf";

function OnePlayer() {
  const [readyCounter, setReadyCounter] = useState<number>(3);
  const [gameStart, setGameStart] = useState<boolean>(false);

  useEffect(() => {
    let interval: number | null = null;

    if (readyCounter > 0 && !gameStart) {
      interval = setInterval(() => {
        setReadyCounter((prev) => {
          if (prev === 1) {
            setGameStart(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [readyCounter, gameStart]);


  console.log(readyCounter);

  const [cellSequence, setCellSequence] = useState<string[]>([]);
  const [cellClicked, setCellClicked] = useState<string[]>([]);
  const [correctCell, setCorrectCell] = useState<boolean[]>([]);
  const [time, setTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState<number | null>(null);
  const [stats, setStats] = useState<number[]>([]);

  const initCellSequence = () => {
    const cells: string[] = [];
    const letters = "abcdefgh";
    const numbers = "12345678";
    for (let i = 0; i < 5; i++) {
      const randomSquare =
        letters[Math.floor(Math.random() * letters.length)];
      const cellNo = numbers[Math.floor(Math.random() * numbers.length)];
      cells.push(randomSquare + cellNo);
    }
    setCellSequence(cells);
  };

  const initTimer = () => {
    if (timerInterval) clearInterval(timerInterval);
    const newInterval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
    setTimerInterval(newInterval);
  };

  useEffect(() => {
    if (gameStart) {
      initCellSequence();
      initTimer();

      return () => {
        if (timerInterval) {
          clearInterval(timerInterval);
        }
      };
    }
  }, [gameStart]);

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
    setCellClicked((prev) => [...prev, cell]);
    setStats((prev) => [...prev, time]);
    setTime(0);
    initTimer();
  };

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="w-full min-h-screen bg-black text-white flex justify-center items-center p-4">
      {!gameStart ? (
        <div>{readyCounter}</div>
      ) : cellClicked.length < 5 ? (
        <div className="w-full max-w-4xl flex flex-col justify-center items-center gap-4">
          <div
            className="text-white text-lg sm:text-xl md:text-2xl"
            style={{ fontFamily: "PilcrowRounded-Medium" }}
          >
            Find the Square {cellSequence[cellClicked.length]}{" "}
            {formatTime(time)}
          </div>
          <div className="flex flex-col md:flex-row w-full justify-between items-center">
            <div className="w-full md:w-3/4 aspect-square grid grid-cols-9 grid-rows-9 mb-4 md:mb-0">
              {Array.from({ length: 81 }, (_, index) => {
                const row = Math.floor(index / 9);
                const col = index % 9;
                let cell = "";
                let cellColor = "";
                let cellContent = "";

                if (row === 8 && col === 0) cellColor = "bg-black";
                else if (row === 8) {
                  cell = String.fromCharCode(col + 96);
                  cellColor = "bg-black text-white flex justify-center items-center";
                  cellContent = cell;
                } else if (col === 0) {
                  cell = (8 - row).toString();
                  cellColor = "bg-black text-white flex justify-center items-center";
                  cellContent = cell;
                } else {
                  cell = String.fromCharCode(col + 96) + (8 - row).toString();
                  if (
                    cellClicked.length > 0 &&
                    cell === cellClicked[cellClicked.length - 1]
                  ) {
                    cellColor =
                      cellClicked[cellClicked.length - 1] ===
                      cellSequence[cellClicked.length - 1]
                        ? "bg-green-300"
                        : "bg-red-300";
                  } else {
                    cellColor =
                      (row + col) % 2 === 0
                        ? "bg-blue-800"
                        : "bg-blue-100";
                  }
                  if (cell === cellSequence[cellClicked.length - 1])
                    cellColor = "bg-green-300";
                }

                return (
                  <PushableButton
                    key={index}
                    cellContent={cellContent}
                    cellColor={cellColor}
                    style={`${
                      col > 0 && row < 8 ? "cursor-pointer w-full h-full" : ""
                    } text-xs sm:text-sm md:text-base`}
                    onClick={() =>
                      col > 0 && row < 8 && handleClick(row, col - 1)
                    }
                  ></PushableButton>
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
        </div>
      ) : (
        <div className="text-white">
          {stats.map((time, index) => {
            return <div key={index}>{formatTime(time)}</div>;
          })}
          <button onClick={() => window.location.reload()}>Play again</button>
        </div>
      )}
    </div>
  );
}

export default OnePlayer;
