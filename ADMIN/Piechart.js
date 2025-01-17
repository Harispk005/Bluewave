import React from 'react';
import { Pie } from 'react-chartjs-2';

// Register chart.js components
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({usercount,trainercount,poolcount,complaintcount,bookingcount,feedcount}) => {

  const data = {
    labels:['Trainers','Users','Pools','Complaints','Bookings','Feedback'],
    datasets: [
      {
      
        data: [trainercount, usercount, poolcount,complaintcount,bookingcount,feedcount], 
        backgroundColor: [
          'green',
          'red',
          'blue',
          'yellow',
          'purple',
          'darkblue',
          
        ],
        borderColor: [
            'green',
          'red',
          'blue',
          'yellow',
          'purple',
          'darkblue',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
  };

  return (
    <div style={{ width: '100%', height: '300px', padding: '10px' }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
