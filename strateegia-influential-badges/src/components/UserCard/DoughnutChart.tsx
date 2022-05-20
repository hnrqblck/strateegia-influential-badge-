import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface IProps {
    totalA: number;
    totalE: number;
}


const DoughnutChart = ({totalA, totalE}: IProps ) => {

    const data = {
        labels: ['Total em respostas', 'Total em engajamento'],
        datasets: [
          {
            label: '# of Votes',
            data: [totalA, totalE],
            backgroundColor: [
              '#464AA6',
              '#1B208C',
            ],
            weight: 1,
            borderWidth: 0,
          },
        ],
      };

    const options = {
        cutout: '70%',
        plugins: {
            legend: {
                display: false,
               
            }
        }
    }

    return <Doughnut options={options} data={data} />;
}

export default DoughnutChart;