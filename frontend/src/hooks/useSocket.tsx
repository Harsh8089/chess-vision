import { useEffect, useState } from "react";

const SOCKET_URL = 'ws://localhost:8080';

const useSocket = () => {
    const [socket, setSocket] = useState<null | WebSocket>(null);

    useEffect(() => {
        const ws = new WebSocket(SOCKET_URL);
        ws.onopen = () => setSocket(ws);
        ws.onclose = () => setSocket(null);
        return () => ws.close();
     }, []);

    return socket;
}

export default useSocket