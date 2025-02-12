import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface FinancialChartProps {
    transactions: { date: string, amount: number }[];
}

const FinancialChart: React.FC<FinancialChartProps> = ({ transactions }) => {
    const dates = transactions.map(t => new Date(t.date).toLocaleDateString());
    const amounts = transactions.map(t => t.amount);

    const data = {
        labels: dates,
        datasets: [
            {
                label: 'Évolution du Compte',
                data: amounts,
                fill: true,
                borderColor: 'rgb(2, 241, 2)', // Green line color
                tension: 0.1,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Évolution du Compte en termes d\'argent',
            },
        },
        scales: {
            x: {
                grid: {
                    color: 'white', // White grid lines
                },
                ticks: {
                    color: 'white', // White labels
                },
            },
            y: {
                grid: {
                    color: 'white', // White grid lines
                },
                ticks: {
                    color: 'white', // White labels
                },
            },
        },
    };

    return (
        <div className="bg-black rounded-lg p-6">
            <Line data={data} options={options} />
        </div>
    );
};

export default FinancialChart;