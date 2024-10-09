import Form from './Form';
import Button from './Button'
import { CREATE_ROOM, INIT_GAME, JOIN_ROOM } from '../consts/Message'
import useSocket from '../hooks/useSocket';
import { useEffect } from 'react';
import { useGameContext } from '../context/GameContext';

function TwoPlayerLobby() {
    const socket = useSocket();
    const { opponentUsername, setOpponentUsername } = useGameContext();

    useEffect(() => {
        if(socket) {
            socket.onmessage = (event) => { 
                const message = JSON.parse(event.data);
                console.log(message);
                if(message.success) {
                    if(message.status == INIT_GAME) {
                        setOpponentUsername(message.opponent);
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
                <div>Game Board</div>
            )
        }
    </>
  )
}

export default TwoPlayerLobby