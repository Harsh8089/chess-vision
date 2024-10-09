import { WebSocketServer } from 'ws';
import GameManager from './GameManager.js'

const wss = new WebSocketServer({ port: 8080 });

const gameManager = new GameManager();


wss.on('connection', (ws) => {
    ws.on('error', console.error);
    gameManager.handleMessage(ws);    
});

console.log('WebSocket server running on ws://localhost:8080');
