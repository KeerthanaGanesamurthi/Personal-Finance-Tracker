import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Charts = ({ transactions }) => {
  // Process data for charts
  const processChartData = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    // Monthly data for bar chart
    const monthlyData = Array(12).fill(0);
    const monthlyIncome = Array(12).fill(0);
    
    // Category data for doughnut chart
    const categoryData = {};
    
    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const month = date.getMonth();
      const year = date.getFullYear();
      
      if (year === currentYear) {
        if (transaction.type === 'expense') {
          monthlyData[month] += transaction.amount;
        } else {
          monthlyIncome[month] += transaction.amount;
        }
      }
      
      if (transaction.type === 'expense') {
        categoryData[transaction.category] = (categoryData[transaction.category] || 0) + transaction.amount;
      }
    });

    return { monthlyData, monthlyIncome, categoryData };
  };

  const { monthlyData, monthlyIncome, categoryData } = processChartData();

  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Income',
        data: monthlyIncome,
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
      {
        label: 'Expenses',
        data: monthlyData,
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
      }
    ]
  };

  const doughnutData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: [
          '#3B82F6', '#EF4444', '#10B981', '#F59E0B', 
          '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
        ],
        borderWidth: 2,
        borderColor: '#1F2937'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart'
    }
  };

  const barChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '₹' + value;
          }
        }
      }
    }
  };

  return (
    <div className="charts-container">
      <div className="card chart-card">
        <h3>Monthly Overview</h3>
        <div className="chart-wrapper">
          <Bar data={barChartData} options={barChartOptions} />
        </div>
      </div>

      <div className="card chart-card">
        <h3>Spending by Category</h3>
        <div className="chart-wrapper">
          {Object.keys(categoryData).length > 0 ? (
            <Doughnut data={doughnutData} options={chartOptions} />
          ) : (
            <div className="no-data">
              <p>No expense data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Charts;