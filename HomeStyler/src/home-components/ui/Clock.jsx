import React, { useState, useEffect, useRef } from 'react';
import "../../styles/clock.css";

const Clock = () => {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const intervalRef = useRef(null);

    const countDown = () => {
        const destination = new Date('nov 12, 2024').getTime();

        intervalRef.current = setInterval(() => {
            const now = new Date().getTime();
            const difference = destination - now;

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            if (difference < 0) {
                clearInterval(intervalRef.current);
            } else {
                setDays(days);
                setHours(hours);
                setMinutes(minutes);
                setSeconds(seconds);
            }
        }, 1000);
    };

    useEffect(() => {
        countDown();
        return () => clearInterval(intervalRef.current); // Cleanup on unmount
    }, []);

    return (
        <div className="clock__wrapper d-flex align-items-center gap-3">
            <div className="clock__data d-flex align-items-center gap-3">
                <div className='text-center'>
                    <h1 className='text-white fs-3 mb-2'>{days}</h1>
                    <h5 className='text-white fs-6'>Days</h5>
                </div>
                <span className='text-white fs-3'>:</span>
            </div>

            <div className="clock__data d-flex align-items-center gap-5">
                <div className='text-center'>
                    <h1 className='text-white fs-3 mb-2'>{hours}</h1>
                    <h5 className='text-white fs-6'>Hours</h5>
                </div>
                <span className='text-white fs-3'>:</span>
            </div>

            <div className="clock__data d-flex align-items-center gap-5">
                <div className='text-center'>
                    <h1 className='text-white fs-3 mb-2'>{minutes}</h1>
                    <h5 className='text-white fs-6'>Minutes</h5>
                </div>
                <span className='text-white fs-3'>:</span>
            </div>

            <div className="clock__data d-flex align-items-center gap-5">
                <div className='text-center'>
                    <h1 className='text-white fs-3 mb-2'>{seconds}</h1>
                    <h5 className='text-white fs-6'>Seconds</h5>
                </div>
            </div>
        </div>
    );
};

export default Clock;
