import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const Sales = ({ labels, values }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: {
                min: 0,
                grid: {
                    drawBorder: true,
                    color: '#efefef',
                },
                ticks: {
                    beginAtZero: true,
                    stepSize: 1,
                    fontSize: 12,
                },
                title: {
                    display: true,
                    text: "Quantity",
                },
            },
            xAxes: {
                grid: {
                    drawBorder: true,
                    color: '#efefef',
                },
                ticks: {
                    beginAtZero: true,
                    fontSize: 12,
                },
                title: {
                    display: true,
                    text: "Month",
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        },
    };
    const data = {
        labels,
        datasets: [
            {
                data: values,
                fill: true,
                borderColor: '#ee9b00',
                color: "#999",
                lineTension: 0,
                backgroundColor: '#f9c09f39',
            }
        ],
    };
    return (
        <Line height={300} options={options} data={data} />
    );
}

export default Sales;
