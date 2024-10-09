import { CREATE_ROOM } from "./message.js";

class Game {
    player1;
    player2;
    player1_username
    player2_username;
    moveSequence;
    
    generateMoveSequence() {
        let moves = [];
        const letters = 'abcdefgh';
        const numbers = '12345678'; 
        for(let i = 0; i < 5; i++) {
            const randomSquare = letters[Math.floor(Math.random() * letters.length)];
            const cellNo = numbers[Math.floor(Math.random() * numbers.length)];
            moves.push(randomSquare + cellNo);
        }
        return moves;
    }

    constructor(player1ID, room_id, username) {
        this.player1 = player1ID;
        this.player1_username = username;
        this.player2 = null;
        this.player2_username = null;
        this.player1MoveCount = 0;
        this.player2MoveCount = 0;
        this.moveSequence = this.generateMoveSequence();
        this.player1.send(JSON.stringify(
            {
                success: true,
                status: CREATE_ROOM,
                message: `Room created with ID - ${room_id}`,
            }
        ))
    }

    makeMove(socket, move) {
        if(socket == this.player1) {
            this.player2.send(JSON.stringify(
                {
                    sucess: true,
                    move
                }
            ))
        }
        else {
            this.player1.send(JSON.stringify(
                {
                    success: true,
                    move
                }
            ))
        }
    }

}

export default Game;