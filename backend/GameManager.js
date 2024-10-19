import { CREATE_ROOM, EXIT_ROOM, INIT_GAME, JOIN_ROOM, CELL_CLICKED } from "./message.js";
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
                const { type, room_id, cell, username } = data;
                
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
                                room_id,
                                cellToClick: game.cellSequence[0],
                            }));
                            game.player2.send(JSON.stringify({
                                success: true,
                                opponent: game.player1_username,
                                status: INIT_GAME,
                                room_id,
                                cellToClick: game.cellSequence[0],
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
                else if(type == CELL_CLICKED) {
                    if(this.games.has(room_id)) {
                        const game = this.games.get(room_id);
                        if(game.player1 != null && game.player2 != null) {
                            game.handleCellClicked(socket, cell);
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