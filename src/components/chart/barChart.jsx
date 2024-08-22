import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
export default function BarChartComponent({data, labels, label}) {
    const barData = {
        labels: labels,
        datasets: [
          {
            label: label,
            data: data.map(item => item.value),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
          },
        ],
      };
    return (
        <div className="chart-container" style={{ width: '100%'}}>
        <h3>Biểu đồ hình cột</h3>
        <Bar data={barData} />
      </div>
    )
}