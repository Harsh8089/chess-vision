import { CREATE_ROOM, EXIT_ROOM, INIT_GAME, JOIN_ROOM, MOVE } from "./message.js";
import Game from "./Game.js";

class GameManager {
    games;

    constructor() {
        this.games = new Map();
    }
    
    handleMessage(socket) {
        socket.on('message', (message) => {
            try {
                const data = JSON.parse(message);
                console.log(data);
                const { type, room_id, move, username } = data;
                
                // init new game
                if(type == CREATE_ROOM) {
                    if(this.games.has(room_id)) {
                        socket.send(JSON.stringify({
                            success: false,
                            message: "Room is already created by some other user"
                        }))
                    }
                    else  {
                        const game = new Game(socket, room_id, username);
                        this.games.set(room_id, game);
                    }
                }
                else if(type == JOIN_ROOM) {
                    if(this.games.has(room_id)) {
                        const game = this.games.get(room_id);
                        if(game.player2 == null) {
                            game.player2 = socket;
                            game.player2_username = username;
                            game.player1.send(JSON.stringify({
                                success: true,
                                opponent: game.player2_username,
                                status: INIT_GAME,
                                room_id
                            }));
                            game.player2.send(JSON.stringify({
                                success: true,
                                opponent: game.player1_username,
                                status: INIT_GAME,
                                room_id
                            }));
                        }
                        else {
                            socket.send(JSON.stringify({
                                success: false,
                                message: "Room is already full"
                            }))
                        }
                    }
                    else {
                        socket.send(JSON.stringify(
                            {
                                success: false,
                                message: `Room doesn't exist for id - ${room_id}`
                            }
                        ))
                    }
                }
                else if(type == EXIT_ROOM) {
                    if(this.games.has(room_id)) {
                        const game = this.games.get(room_id);
                        if(socket == game.player1) {
                            this.games.delete(room_id);
                            socket.send(JSON.stringify(
                                {
                                    success: true,
                                    message: "Room deleted"
                                }
                            ))
                        }
                    }
                    else {
                        socket.send(JSON.stringify(
                            {
                                success: false,
                                message: "Something went wrong. Couldn't find this game"
                            }
                        ))
                    }
                }
                else if(type == MOVE) {
                    if(this.games.has(room_id)) {
                        const game = this.games.get(room_id);
                        if(game.player1 != null && game.player2 != null) {
                            game.makeMove(socket, move);
                        }
                    }
                }
                else {
                    socket.send('Something went wrong. Please try again later');
                }
            } catch (error) {
                console.error('Error parsing message:', error);
                socket.send('Invalid message format');
            }
        }); 
    }


}

export default GameManager;