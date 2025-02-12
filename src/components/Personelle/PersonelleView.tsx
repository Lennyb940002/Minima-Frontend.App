import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function FocusTimer() {
    const FOCUS_TIME = 10 * 1; // 10 minutes en secondes
    const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
    const [isActive, setIsActive] = useState(false);
    const [isFlashing, setIsFlashing] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(time => time - 1);
            }, 1000);
        } else if (timeLeft === 0 && !isFlashing) {
            setIsFlashing(true);
            setIsActive(false);
            // Arrêter le flash après 10 secondes
            setTimeout(() => {
                setIsFlashing(false);
                setTimeLeft(FOCUS_TIME);
            }, 10000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, timeLeft, isFlashing]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(FOCUS_TIME);
        setIsFlashing(false);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        if (isFlashing) {
            document.documentElement.classList.add('flashing');
        } else {
            document.documentElement.classList.remove('flashing');
        }
    }, [isFlashing]);

    return (
        <div className="min-h-screen flex items-center justify-center transition-colors duration-300 bg-black">
            <style jsx global>{`
                @keyframes flash {
                    0%, 100% { background-color: black; }
                    50% { background-color: rgb(153, 27, 27); }
                }
                .flashing {
                    animation: flash 1s ease-in-out infinite;
                }
                html, body {
                    height: 100%;
                    margin: 0;
                }
            `}</style>

            <div className="text-center space-y-8">
                {/* Titre */}
                <h1 className="text-4xl font-bold text-indigo-400">Focus</h1>

                {/* Timer */}
                <div className="text-8xl font-bold text-white font-mono">
                    {formatTime(timeLeft)}
                </div>

                {/* Contrôles */}
                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={toggleTimer}
                        className="p-4 bg-indigo-500 hover:bg-indigo-600 rounded-full text-white transition-all duration-200"
                    >
                        {isActive ? (
                            <Pause className="w-8 h-8" />
                        ) : (
                            <Play className="w-8 h-8" />
                        )}
                    </button>

                    <button
                        onClick={resetTimer}
                        className="p-4 bg-black hover:bg-black/60 rounded-full text-indigo-400 border-2 border-indigo-500/30 hover:border-indigo-500 transition-all duration-200"
                    >
                        <RotateCcw className="w-8 h-8" />
                    </button>
                </div>

                {/* Message d'état */}
                <p className="text-indigo-300 text-lg">
                    {isActive ? 'Concentrez-vous...' : 'Prêt à démarrer ?'}
                </p>
            </div>
        </div>
    );
}