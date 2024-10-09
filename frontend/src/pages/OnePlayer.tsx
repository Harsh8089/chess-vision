import React, { useEffect, useState } from "react";

function OnePlayer() {
  const [cellSequence, setCellSequence] = useState<string[]>([]);
  const [cellClicked, setCellClicked] = useState<string[]>([]);
  const [correctCell, setCorrectCell] = useState<boolean[]>([]);

  const initCellSequence = () => {
    const cells: string[] = [];
    const letters = 'abcdefgh';
    const numbers = '12345678';
    for (let i = 0; i < 5; i++) {
      const randomSquare = letters[Math.floor(Math.random() * letters.length)];
      const cellNo = numbers[Math.floor(Math.random() * numbers.length)];
      cells.push(randomSquare + cellNo);
    }
    setCellSequence(cells);
  };

  useEffect(() => {
    initCellSequence();
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
    setCellClicked((prev) => [...prev, cell]);
  };

  return (
    <div className="w-full min-h-screen bg-black flex justify-center items-center p-4">
      <div className="w-full max-w-2xl flex flex-col md:flex-row justify-center items-center gap-4">
        <div className="text-white">Find the Square {cellSequence[cellClicked.length]}</div>
        <div className="w-full md:w-3/4 aspect-square grid grid-cols-9 grid-rows-9">
          {Array.from({ length: 81 }, (_, index) => {
            const row = Math.floor(index / 9);
            const col = index % 9;
            let cell = '';
            let cellColor = '';
            let cellContent = '';

            if(row === 8 && col === 0) cellColor = 'bg-black';
            else if(row === 8) {
              cell = String.fromCharCode(col + 96);
              cellColor = 'bg-black text-white flex justify-center items-center';
              cellContent = cell;
            } else if (col === 0) {
              cell = (8 - row).toString();
              cellColor = 'bg-black text-white flex justify-center items-center';
              cellContent = cell;
            } else {
              cell = String.fromCharCode(col + 96) + (8 - row).toString();
              if (cellClicked.length > 0 && cell === cellClicked[cellClicked.length - 1]) {
                cellColor = cellClicked[cellClicked.length - 1] === cellSequence[cellClicked.length - 1] ? 'bg-green-300' : 'bg-red-300';
              } else {
                cellColor = (row + col) % 2 === 0 ? 'bg-blue-800' : 'bg-blue-100';
              }
              if(cell == cellSequence[cellClicked.length - 1]) cellColor = 'bg-green-300';
            }



            return (
              <div
                key={index}
                className={`w-full h-full ${cellColor} ${col > 0 && row < 8 ? 'cursor-pointer' : ''}`}
                onClick={() => col > 0 && row < 8 && handleClick(row, col - 1)}
              >
                {cellContent}
              </div>
            );
          })}
        </div>

        <div className="flex flex-row md:flex-col justify-center items-center gap-2 mt-4 md:mt-0">
          {Array.from({ length: 5 }, (_, idx) => (
            <div
              key={idx}
              className={`w-8 h-8 md:w-12 md:h-12 rounded-full ${
                correctCell[idx] === true
                  ? 'bg-green-500'
                  : correctCell[idx] === false
                  ? 'bg-red-500'
                  : 'bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default OnePlayer;