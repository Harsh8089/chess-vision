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
    const [cell, setCell] = useState<string>("");

    useEffect(() => {
        if(socket) {
            socket.onmessage = (event) => { 
                const message = JSON.parse(event.data);
                console.log(message);
                if(message.success) {
                    if(message.status == INIT_GAME) {
                        setOpponentUsername(message.opponent);
                        setCell(message.cellToClick);
                    }
                }
            }
        }
      }, [socket])
    

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
                        cell={cell}
                    />
                    <OpponentBoard
                        socket={socket}
                        cell={cell}
                    />
                </div>
            )
        }
    </>
  )
}

export default TwoPlayerLobby