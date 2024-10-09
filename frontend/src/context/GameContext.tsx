import React, { createContext, useContext, useState, ReactNode } from "react";

interface GameContextType {
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    roomId: string;
    setRoomId: React.Dispatch<React.SetStateAction<string>>;
    opponentUsername: string;
    setOpponentUsername: React.Dispatch<React.SetStateAction<string>>;
}

const defaultContextValue: GameContextType = {
    username: '',
    setUsername: () => {},
    roomId: '',
    setRoomId: () => {}, 
    opponentUsername: '',
    setOpponentUsername: () => {}, 
};

const GameContext = createContext<GameContextType>(defaultContextValue);

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [username, setUsername] = useState<string>("");
    const [roomId, setRoomId] = useState<string>("");
    const [opponentUsername, setOpponentUsername] = useState<string>("");

    return (
        <GameContext.Provider value={{ username, setUsername, roomId, setRoomId, opponentUsername, setOpponentUsername }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => {
    return useContext(GameContext);
};
