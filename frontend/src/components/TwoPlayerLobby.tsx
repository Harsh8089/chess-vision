import Form from './Form';
import Button from './Button'
import { CREATE_ROOM, INIT_GAME, JOIN_ROOM } from '../consts/Message'
import useSocket from '../hooks/useSocket';
import { useEffect, useState } from 'react';
import { useGameContext } from '../context/GameContext';
import MyBoard from './MyBoard';
import OpponentBoard from './OpponentBoard';

function TwoPlayerLobby() {
    const socket = useSocket();
    const { opponentUsername, setOpponentUsername } = useGameContext();
    const [myCell, setMyCell] = useState<string>("");
    const [opponentCell, setOpponentCell] = useState<string>("");

    const [opponentCorrectCell, setOpponentCorrectCell] = useState<boolean[]>([]);

      useEffect(() => {
        if(socket) {
            const handleMessage = (event: MessageEvent) => {
                const message = JSON.parse(event.data);
                console.log(message);
                if(message.status == INIT_GAME) {
                    setOpponentUsername(message.opponent);
                    setMyCell(message.cellToClick);
                    setOpponentCell(message.cellToClick);
                }
                else if(message.status === 'PROVIDE') setMyCell(message.cellToClick);
                else if(message.status === 'OPPONENT') {
                    setOpponentCell(message.cellToClick);
                }
                else if(message.status === 'VERIFY') {
                    setOpponentCorrectCell((prev) => {
                        return [...prev, message.cellToClick === message.cellClicked];
                    })
                }
            }
    
            socket.addEventListener('message', handleMessage);
    
            return () => socket.removeEventListener('message', handleMessage);
        }
      }, [socket]);
    

  return (
    <>
        {
            opponentUsername.length == 0 ? 
            (
                <div className='flex flex-col items-center justify-between h-56'>
                    <Form />
                    <div className='flex gap-5'>
                        <Button 
                            label="Create"
                            type={CREATE_ROOM}
                            socket={socket}
                        />
                        <Button 
                            label="Join"
                            type={JOIN_ROOM}
                            socket={socket}
                        />
                    </div>
                </div>
            ):
            (
                <div className='flex w-[100vw] justify-between'>
                    <MyBoard
                        socket={socket}
                        myCell={myCell}
                    />
                    <OpponentBoard
                        socket={socket}
                        opponentCell={opponentCell}
                        opponentCorrectCell={opponentCorrectCell}
                    />
                </div>
            )
        }
    </>
  )
}

export default TwoPlayerLobby