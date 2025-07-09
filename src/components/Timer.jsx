import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Timer = ({formatedTime, setFormatedTime, gameConfig}) => {
    // Parsear el tiempo configurado
    const parseTime = (timeString) => {
        const [minutes, seconds] = timeString.split(':').map(Number);
        return { minutes: minutes || 0, seconds: seconds || 0 };
    };

    const initialTime = parseTime(gameConfig?.timer || "01:00");
    const [seconds, setSeconds] = useState(initialTime.seconds);
    const [minutes, setMinutes] = useState(initialTime.minutes);
    const navigate = useNavigate();

    // Reinicializar el timer cuando cambie la configuración
    useEffect(() => {
        const newTime = parseTime(gameConfig?.timer || "01:00");
        setMinutes(newTime.minutes);
        setSeconds(newTime.seconds);
    }, [gameConfig?.timer]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds((prev) => prev - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);            
                } else {
                    setMinutes((prev) => prev - 1);
                    setSeconds(59);
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [seconds, minutes]);

    useEffect(() => {
        const formatedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formatedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        setFormatedTime(`${formatedMinutes}:${formatedSeconds}`);
    }, [minutes, seconds, setFormatedTime]);

    useEffect(() => {
        if (minutes === 0 && seconds === 0) {
            navigate('/completeGame');
        }
    }, [minutes, seconds, navigate]);

    return (
        <div className="timer">
            <p>{formatedTime}</p>
        </div>
    );
}

export default Timer;