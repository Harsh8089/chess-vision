import ControlOption from '../interface/controlOption';
import GameOption from './GameOption';

const ControlPanel = ({
    option,
    selectedValue,
    onSelect,
    isDisabled
}: {
    option: ControlOption;
    selectedValue: number | null;
    onSelect: (value: number | null) => void;
    isDisabled: boolean;
}) => (
    <div className={`w-full max-w-2xl flex flex-col items-center bg-blue-dark bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm transition-opacity duration-300 ${isDisabled ? 'opacity-50' : 'opacity-100'}`}>
      <div className="flex items-center gap-3 mb-6">
        {option.icon}
        <h2 className="text-xl font-semibold">{option.title}</h2>
      </div>
      
      <div className="flex justify-center gap-6">
        {option.count.map((value) => (
          <GameOption
            key={value}
            isSelected={selectedValue === value}
            value={value}
            unit={option.timer ? 'seconds' : 'cells'}
            disabled={isDisabled}
            onClick={() => {
              if (selectedValue === value) {
                onSelect(null); 
              } else {
                onSelect(value);
              }
            }}
          />
        ))}
      </div>
    </div>
);

export default ControlPanel