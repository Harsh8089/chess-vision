const GameOption = ({ 
    isSelected, 
    value, 
    unit, 
    onClick,
    disabled
}: { 
    isSelected: boolean;
    value: number;
    unit: string;
    onClick: () => void;
    disabled: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      relative px-8 py-4 rounded-xl
      transition-all duration-300 ease-in-out
      ${isSelected ? 
        'bg-blue-500 text-white scale-105 shadow-lg' : 
        disabled ?
          'bg-gray-500 bg-opacity-10 border-2 border-gray-400/30 cursor-not-allowed opacity-50' :
          'bg-blue-500 bg-opacity-10 hover:bg-opacity-20 border-2 border-blue-400/30'
      }
    `}
  >
    <div className="flex flex-col items-center gap-1">
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-sm opacity-80">{unit}</span>
    </div>
  </button>
);

export default GameOption