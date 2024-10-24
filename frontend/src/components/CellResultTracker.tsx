import { Check, CircleCheck, CircleX, Clock, Gauge, X } from "lucide-react";
import Timer from "./Timer";

interface CellResultTrackerProps {
    style: string;
    correctCell: boolean[],
    cellSequence: string[]
}

function CellResultTracker({ style, correctCell, cellSequence }: CellResultTrackerProps) {
  return (
    <div className={`${style} bg-blue-light bg-opacity-20 rounded-xl p-3 flex flex-col gap-2 text-white`}>
      <div className="flex flex-col items-center gap-2">
        <p className="opacity-50">Square To Click</p>
        <div className="bg-blue-light px-3 py-2 rounded-lg bg-opacity-20">
          <h1 className="font-bold text-3xl text-center">
            {cellSequence[correctCell.length]}
          </h1>
        </div>
      </div>

      <div className="flex justify-around items-center border-b border-slate-600 pb-3 h-16">
        <div className="flex items-center gap-2">
          <Clock className="text-blue-light" size={20} />
          <Timer />
        </div>
        <div className="flex items-center gap-2">
          <Gauge className="text-green-light" size={20} />
          <p className="text-lg font-semibold">{correctCell.length}</p>
        </div>
      </div>
 
      <div className="flex justify-around items-center border-b border-slate-600 pb-3 h-16">
        <div className="flex items-center gap-2">
          <CircleCheck className="text-green-light" size={20} />
          <p className="text-lg font-medium">
            {correctCell.filter(cell => cell === true).length}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <CircleX className="text-red-400" size={20} />
          <p className="text-lg font-medium">
          {correctCell.filter(cell => cell !== true).length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-1">
        {Array.from({ length: correctCell.length }, (_, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-1 rounded bg-slate-700 hover:bg-slate-600 transition-colors"
          >
            {!correctCell[index] ? (
              <X className="text-red-light" size={14} />
            ) : (
              <Check className="text-green-light" size={14} />
            )}
            <p className="font-mono text-xs">
              {cellSequence[index]}
            </p>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-2 text-xs text-slate-300 mt-1">
        <div className="flex items-center gap-1">
          <Check className="text-green-light" size={12} />
          <span>Correct</span>
        </div>
        <div className="flex items-center gap-1">
          <X className="text-red-400" size={12} />
          <span>Incorrect</span>
        </div>
      </div>
    </div>
  );
}

export default CellResultTracker;