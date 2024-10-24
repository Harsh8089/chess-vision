import { ReactNode } from 'react'
import PushableButton from '../PushableButton';

interface BoardProps {
    style: string;
    cellClicked: string[];
    cellSequence: string[];
    handleClick: (row: number, col: number) => void;
    children?: ReactNode; 
}

function Board({ style, cellClicked, cellSequence, handleClick, children }: BoardProps) {
  return (
    <div className={`${style}`}>
        {
            Array.from({ length: 64 }, (_, index) => {
                const row = Math.floor(index / 8);
                const col = index % 8;
                let cell = "";
                let cellColor = "";

                cell = String.fromCharCode(col + 97) + (8 - row).toString();
                if (cellClicked.length > 0 && cell === cellClicked[cellClicked.length - 1]) {
                    console.log(cellClicked[cellClicked.length - 1], cellSequence[cellClicked.length - 1], cellClicked.length - 1);
                    cellColor = cellClicked[cellClicked.length - 1] === cellSequence[cellClicked.length - 1] ? "bg-green-300" : "bg-red-300";
                } else {
                    cellColor = (row + col) % 2 === 0 ? "bg-blue-800" : "bg-blue-100";
                }

                if (cell === cellSequence[cellClicked.length - 1]) cellColor = "bg-green-300";

                return (
                    <PushableButton
                        key={index}
                        cellContent={""}
                        cellColor={cellColor}
                        style={`cursor-pointer w-full h-full`}
                        onClick={() => handleClick(row, col)}
                    />
                );
            })
        }

         {children}
    </div>
  )
}

export default Board