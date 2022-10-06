import { useState, useRef, useEffect } from "react";
import "../Styles/Countdown.css";
import CircularProgress from '@mui/material/CircularProgress';

const Countdown = ({ endDate }) => {
    let interval = useRef();
    const [timeLeft, setTimeleft] = useState({});
    const startCountdown = () => {
        const countDownDate = new Date(endDate).getTime();
        interval = setInterval(() => {
            const startingDate = new Date().getTime();
            const distance = countDownDate - startingDate;
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            if (distance < 0) {
                setTimeleft({
                    days: "00",
                    hours: "00",
                    minutes: "00",
                    seconds: "00",
                });
                clearInterval(interval.current);
            } else {
                setTimeleft({
                    days: days,
                    hours: hours,
                    minutes: minutes,
                    seconds: seconds,
                });
            }
        }, 1000);
    };

    useEffect(() => {
        startCountdown();
        return () => {
            clearInterval(interval);
        };
    });

    return (
        <span className="Countdown">
            {
                Object.keys(timeLeft).length < 4 ? <span className="simple-center-div primary-tae-color"><CircularProgress color="inherit" size={20} /></span> :
                    (
                        timeLeft.days === "00" && timeLeft.hours === "00" && timeLeft.minutes === "00" && timeLeft.seconds === "00" ?
                            <span className="countdown-expired">Expired</span> :
                            <>
                                <span>{timeLeft.days}d</span>
                                <span>{timeLeft.hours}h</span>
                            </>
                    )
            }
        </span>
    );
};

export default Countdown;
