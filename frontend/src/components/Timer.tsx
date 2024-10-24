import { useEffect, useState } from "react";

function Timer() {
    const [time, setTime] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prev => prev + 1000); // Increase time by 1000 milliseconds (1 second)
        }, 1000); // Set interval to 1 second
       
        return () => clearInterval(interval); // Clear interval on component unmount
    }, []);

    // Calculate minutes and seconds
    const minutes = Math.floor(time / 60000); // Convert time to minutes
    const seconds = Math.floor((time % 60000) / 1000); // Get remaining seconds

    return (
        <div className="text-lg font-semibold">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
    );
}

export default Timer;
