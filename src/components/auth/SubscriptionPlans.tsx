import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';
import { subscriptionApi, Plan } from '../../services/sub';
import logo from '../../image/logo.png';

// Helper function for debounce
function debounce(func: Function, wait: number) {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any[]) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const AnimatedBackground: React.FC = () => {
    useEffect(() => {
        const createPoints = () => {
            const container = document.getElementById('points-container');
            if (!container) return;

            container.innerHTML = '';
            const width = window.innerWidth;
            const height = window.innerHeight;
            const spacing = 40;

            for (let x = 0; x < width; x += spacing) {
                for (let y = 0; y < height; y += spacing) {
                    const point = document.createElement('div');
                    const offsetX = (Math.random() - 0.5) * 10;
                    const offsetY = (Math.random() - 0.5) * 10;
                    point.className = 'point';
                    point.style.left = (x + offsetX) + 'px';
                    point.style.top = (y + offsetY) + 'px';
                    container.appendChild(point);
                }
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            const points = document.querySelectorAll('.point');
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const radius = 80;

            points.forEach(point => {
                const rect = point.getBoundingClientRect();
                const pointX = rect.left + rect.width / 2;
                const pointY = rect.top + rect.height / 2;

                const distance = Math.sqrt(
                    Math.pow(mouseX - pointX, 2) +
                    Math.pow(mouseY - pointY, 2)
                );

                if (distance < radius) {
                    const scale = 1 - (distance / radius);
                    point.classList.add('active');
                    point.style.transform = `scale(${1 + scale})`;
                } else {
                    point.classList.remove('active');
                    point.style.transform = 'scale(1)';
                }
            });
        };

        createPoints();
        window.addEventListener('mousemove', handleMouseMove);
        const debouncedResize = debounce(createPoints, 150);
        window.addEventListener('resize', debouncedResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', debouncedResize);
        };
    }, []);

    return <div id="points-container" className="fixed inset-0 pointer-events-none" />;
};

export const SubscriptionPlans: React.FC = () => {
    const navigate = useNavigate();
    const { setSelectedPlan } = useAuth();
    const [plan, setPlan] = useState<Plan | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPlan = async () => {
            try {
                const data = await subscriptionApi.getPlans();
                setPlan(data[0]);
            } catch (err) {
                setError("Erreur lors du chargement du plan");
                console.error('Erreur chargement plan:', err);
            } finally {
                setIsLoading(false);
            }
        };

        loadPlan();
    }, []);

    const handlePlanSelect = (selectedPlan: Plan) => {
        setSelectedPlan(selectedPlan);
        navigate('/auth');
    };

    if (isLoading) {
        return (
            <div className="max-w-6xl mx-auto p-6 text-center">
                <p className="text-white">Chargement du plan...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-6xl mx-auto p-6 text-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-black">
            <button
                onClick={() => handlePlanSelect(plan!)}
                className="absolute right-0 w-34 py-2 px-4 bg-black text-white rounded-lg border border-white hover:bg-white hover:text-black hover:border-black transition-colors z-20" // Ajout de z-20
            >
                Connexion
            </button>
            <style>
                {`
                .point {
                    position: absolute;
                    width: 2px;
                    height: 2px;
                    background: #444;
                    border-radius: 50%;
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .point.active {
                    background: rgba(255, 255, 255, 0.8);
                    box-shadow: 0 0 4px rgba(255, 255, 255, 0.5);
                }
                `}
            </style>

            <AnimatedBackground />
            <div className="relative z-10 container mx-auto px-4 py-12 justify-center flex flex-col items-center ">
                <div className="flex flex-col items-center mb-16">
                    <img src={logo} alt="Minima Logo" className="w-20 h-20 mb-8" />
                    <h1 className="text-white text-4xl font-bold mb-4">Simplifiez votre business</h1>
                    <p className="text-gray-400 text-xl mb-8">Une solution complète. Un prix minimal.</p>
                </div>

                {plan && (
                    <div className="h-[500px] w-96 bg-white rounded-xl p-6 shadow-lg ">
                        <h2 className="text-4xl text-center font-bold text-black mb-24">Offre Unique</h2>
                        <p className="text-9xl text-center font-bold text-black mb-24">
                            1€<span className="text-sm font-normal">/Mois</span>
                        </p>
                        <p className="text-xl text-center text-gray-600 mb-4">By Minima</p>
                        <button
                            onClick={() => handlePlanSelect(plan)}
                            className="w-full py-2 px-4 bg-black text-white rounded-lg hover:bg-white hover:text-black hover:border-black transition-colors"
                        >
                            Commencer
                        </button>
                    </div>
                )}
                <p className="text-center text-gray-500 mt-8">
                    By Minima — La simplicité au service de votre réussite
                </p>
            </div>
        </div>
    );
}

export default SubscriptionPlans;