import { createContext, ReactNode, useContext, useState } from "react";

interface SinglePlayerContextType {
  selectedTime: number | null;
  setSelectedTime: (time: number | null) => void;
  selectedCells: number | null;
  setSelectedCells: (cells: number | null) => void;
  startGame: boolean;
  setStartGame: (start: boolean) => void;
}

const SinglePlayerContext = createContext<SinglePlayerContextType | undefined>(undefined);

export const SinglePlayerProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [selectedCells, setSelectedCells] = useState<number | null>(null);
  const [startGame, setStartGame] = useState<boolean>(false);

  return (
    <SinglePlayerContext.Provider
      value={{
        selectedTime,
        setSelectedTime,
        selectedCells,
        setSelectedCells,
        startGame,
        setStartGame,
      }}
    >
      {children}
    </SinglePlayerContext.Provider>
  );
};

export const useSinglePlayer = () => {
  const context = useContext(SinglePlayerContext);
  if (!context) {
    throw new Error("useSinglePlayer must be used within a SinglePlayerProvider");
  }
  return context;
};
