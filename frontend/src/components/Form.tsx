import { useGameContext } from "../context/GameContext";

function Form() {
    const { username, setUsername, roomId, setRoomId } = useGameContext();

    return (
        <div className="flex flex-col gap-4 p-4">
            <input
                name='username'
                type='text'
                placeholder='Enter your username'
                className='bg-white text-black w-60 h-10 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                name='roomId'
                type='text'
                placeholder='Enter roomId'
                className='bg-white text-black w-60 h-10 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={roomId} 
                onChange={(e) => setRoomId(e.target.value)} 
            />
        </div>
    );
}

export default Form;
