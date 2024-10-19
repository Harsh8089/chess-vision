import { CREATE_ROOM } from "./message.js";

class Game {
    player1;
    player2;
    player1_username
    player2_username;
    cellSequence;
    
    generateCellSequence() {
        let cells = [];
        const letters = 'abcdefgh';
        const numbers = '12345678'; 
        for(let i = 0; i < 5; i++) {
            const randomSquare = letters[Math.floor(Math.random() * letters.length)];
            const cellNo = numbers[Math.floor(Math.random() * numbers.length)];
            cells.push(randomSquare + cellNo);
        }
        return cells;
    }

    constructor(player1ID, room_id, username) {
        this.player1 = player1ID;
        this.player1_username = username;
        this.player2 = null;
        this.player2_username = null;
        this.player1PlayCount = 0;
        this.player2PlayCount = 0;
        this.cellSequence = this.generateCellSequence();
        this.player1.send(JSON.stringify(
            {
                success: true,
                status: CREATE_ROOM,
                message: `Room created with ID - ${room_id}`,
            }
        ))
        console.log(this.cellSequence);
    }

    handleCellClicked(socket, cell) {
        if(socket == this.player1) {
            // send player next cell to be clicked
            this.player1.send(JSON.stringify({
                status: 'PROVIDE',
                cellToClick: this.cellSequence[++this.player1PlayCount]
            }));
            this.player2.send(JSON.stringify({
                status: 'OPPONENT',
                cellToClick: this.cellSequence[this.player1PlayCount]
            }))

            // send opponent to verify
            this.player2.send(JSON.stringify(
                {
                    status: 'VERIFY',
                    cellToClick: this.cellSequence[this.player1PlayCount - 1], // cell suppossed to be clicked by player 1
                    cellClicked: cell, // cell clicked by player 1
                }
            ))
        }
        else {
            this.player2.send(JSON.stringify({
                status: 'PROVIDE',
                cellToClick: this.cellSequence[++this.player2PlayCount]
            }));
            this.player1.send(JSON.stringify({
                status: 'OPPONENT',
                cellToClick: this.cellSequence[this.player2PlayCount]
            }))

            this.player1.send(JSON.stringify(
                {
                    status: 'VERIFY',
                    cellToClick: this.cellSequence[this.player2PlayCount - 1], // cell suppossed to be clicked by player 2
                    cellClicked: cell, // cell clicked by player 2
                }
            ))
        }
    }

}

export default Game;