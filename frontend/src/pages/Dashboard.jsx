import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Flame, Activity, Sparkles } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function Dashboard() {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        fill: true,
        label: 'Wellness Score',
        data: [65, 59, 80, 81, 76, 85, 90],
        borderColor: '#CDB4DB',
        backgroundColor: 'rgba(205, 180, 219, 0.2)',
        tension: 0.4,
        pointBackgroundColor: '#FFFFFF',
        pointBorderColor: '#A2D2FF',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#FFFFFF',
        titleColor: '#4A4E69',
        bodyColor: '#4A4E69',
        borderColor: '#F8F9FA',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6
      }
    },
    scales: {
      y: { 
        beginAtZero: true, 
        max: 100,
        grid: { color: 'rgba(0,0,0,0.03)' },
        border: { display: false }
      },
      x: {
        grid: { display: false },
        border: { display: false }
      }
    }
  };

  return (
    <div className="fade-in">
       <div style={{ marginBottom: '2rem' }}>
         <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Your Wellness Dashboard</h1>
         <p style={{ fontSize: '1.1rem' }}>You're doing better than you think. Here's your progress.</p>
       </div>
       
       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
         
         <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
           <div style={{ background: 'var(--risk-low)', padding: '1.2rem', borderRadius: '50%', color: '#2E5A1C' }}>
             <Activity size={32} />
           </div>
           <div>
             <p style={{ margin: 0, fontSize: '1rem', color: 'var(--text-light)', fontWeight: '500' }}>Current Risk Level</p>
             <h2 style={{ margin: 0, fontSize: '1.8rem', color: '#2E5A1C' }}>Low</h2>
           </div>
         </div>

         <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
           <div style={{ background: 'var(--accent)', padding: '1.2rem', borderRadius: '50%', color: '#fff' }}>
             <Flame size={32} />
           </div>
           <div>
             <p style={{ margin: 0, fontSize: '1rem', color: 'var(--text-light)', fontWeight: '500' }}>Daily Streak</p>
             <h2 style={{ margin: 0, fontSize: '1.8rem' }}>5 Days</h2>
           </div>
         </div>

       </div>

       <div className="card" style={{ marginBottom: '2rem' }}>
         <h3 style={{ marginBottom: '1.5rem', fontWeight: '600' }}>Mood Trend</h3>
         <div style={{ height: '320px', width: '100%' }}>
           <Line options={options} data={data} />
         </div>
       </div>

       <div className="card" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', borderLeft: '6px solid var(--primary)' }}>
          <div style={{ background: 'rgba(205, 180, 219, 0.2)', padding: '1rem', borderRadius: '50%' }}>
            <Sparkles color="var(--primary)" size={28} />
          </div>
          <div>
            <h3 style={{ marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-main)' }}>AI Insight</h3>
            <p style={{ fontSize: '1.1rem' }}>We've noticed a steady increase in your positive sentiment over the last week. Taking time to reflect on your daily experiences is building your emotional resilience. Let's take this one step at a time.</p>
          </div>
       </div>
    </div>
  )
}
