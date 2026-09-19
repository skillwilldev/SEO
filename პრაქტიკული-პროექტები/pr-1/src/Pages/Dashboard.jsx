import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function Dashboard() {
    const pieData = {
        labels: ['Electronics', 'Clothing', 'Books', 'Food'],
        datasets: [{
            data: [30, 25, 20, 25],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        }],
    };

    const barData = {
        labels: ['იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი'],
        datasets: [{
            label: 'გაყიდვები',
            data: [1200, 1900, 3000, 5000, 2300, 3200],
            backgroundColor: '#36A2EB',
        }],
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Dashboard</h1>
            <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                <div style={{ width: '400px' }}>
                    <h2>კატეგორიები</h2>
                    <Pie data={pieData} />
                </div>
                <div style={{ width: '600px' }}>
                    <h2>გაყიდვები</h2>
                    <Bar data={barData} />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;