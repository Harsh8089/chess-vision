import ControlPanel from '../ControlPanel';
import ControlOption from '../../interface/controlOption';
import { Grid, Timer } from 'lucide-react';
import { useSinglePlayer } from '../../context/SinglePlayer';

const controlOptions: ControlOption[] = [
    {
        icon: <Timer className="w-6 h-6 text-blue-400" />,
        title: "Select Time Control",
        count: [15, 30, 45],
        timer: true
    },
    {
        icon: <Grid className="w-6 h-6 text-blue-400" />,
        title: "Select Cell Count",
        count: [15, 30, 45],
        timer: false
    }
];

function GameMode() {
    const { selectedTime, setSelectedTime, selectedCells, setSelectedCells, setStartGame } = useSinglePlayer();

    const handleTimeSelect = (value: number | null) => {
        setSelectedTime(value);
        if (value !== null) {
            setSelectedCells(null);
        }
    };

    const handleCellsSelect = (value: number | null) => {
        setSelectedCells(value);
        if (value !== null) {
            setSelectedTime(null);
        }
    };

  return (
    <>
        <ControlPanel
            option={controlOptions[0]}
            selectedValue={selectedTime}
            onSelect={handleTimeSelect}
            isDisabled={selectedCells !== null}
        />

        <div className="flex justify-center items-center">
            <div className="w-20 h-[1px] bg-white/20" />
            <span className="px-4 text-white/60">or</span>
            <div className="w-20 h-[1px] bg-white/20" />
        </div>

        <ControlPanel
            option={controlOptions[1]}
            selectedValue={selectedCells}
            onSelect={handleCellsSelect}
            isDisabled={selectedTime !== null}
        />

        {(selectedTime || selectedCells) && (
            <div className="mt-12 flex flex-col items-center gap-4">
                <button
                    onClick={() => setStartGame(true)}
                    className="bg-blue-500 px-8 py-3 rounded-xl hover:bg-blue-600 transition-colors duration-300 font-semibold shadow-lg shadow-blue-500/20"
                >
                    Start Game with {selectedTime ? `${selectedTime} seconds` : `${selectedCells} cells`}
                </button>
                <button
                    onClick={() => {
                        setSelectedTime(null);
                        setSelectedCells(null);
                    }}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
                >
                    Reset Selection
                </button>
            </div>
        )}
    </>
  )
}

export default GameMode