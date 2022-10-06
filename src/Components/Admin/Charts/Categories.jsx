import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Categories = ({ labels, values }) => {
    const datasets = [
        {
            data: values,
            backgroundColor: [
                '#efefef',
                '#2eca455c',
            ],
            borderColor: [
                '#999',
                '#2ECA45',
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
        <Doughnut data={data} options={options} />
    )
};

export default Categories;