import { useEffect, useState } from 'react'

function CountDown({ countDownTime }: { countDownTime: number }) {
    const [time, setTime] = useState<number>(countDownTime * 1000);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prev => prev - 1000); 
        }, 1000); 
        
        return () => clearInterval(interval); 
    }, []);

    const minutes = Math.floor(time / 60000); 
    const seconds = Math.floor((time % 60000) / 1000);

    return (
        <div className="text-lg font-semibold">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
    );
}

export default CountDown