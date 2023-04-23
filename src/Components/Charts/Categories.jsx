import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Categories = ({ labels, values }) => {
    const datasets = [
        {
            data: values,
            backgroundColor: [
                '#ee9b0074',
                '#ee9b00',
            ],
            borderColor: [
                '#fff',
                '#fff',
            ],
            borderWidth: 2,
        },
    ];

    const data = {
        labels,
        datasets
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    }

    return (
        <Pie data={data} options={options} />
    )
};

export default Categories;