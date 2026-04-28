import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="fade-in" style={{
      background: 'linear-gradient(180deg, var(--primary) 0%, var(--background) 60%)',
      minHeight: 'calc(100vh - 120px)',
      borderRadius: 'var(--radius)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem'
    }}>
       <div style={{ maxWidth: '600px' }}>
          <h1 style={{ 
            fontSize: '4rem', 
            fontWeight: '600', 
            color: 'var(--card-bg)', 
            marginBottom: '1rem',
            textShadow: '0 2px 10px rgba(0,0,0,0.05)'
          }}>
            You're not alone.
          </h1>
          <p style={{ 
            fontSize: '1.4rem', 
            color: 'var(--text-main)', 
            marginBottom: '3rem',
            opacity: 0.9
          }}>
            Let's take this one step at a time. A safe, anonymous space for your thoughts.
          </p>
          
          <button 
            className="btn btn-primary" 
            onClick={() => navigate('/journal')} 
            style={{ 
              fontSize: '1.2rem', 
              padding: '1.2rem 3rem', 
              borderRadius: '30px',
              backgroundColor: 'var(--card-bg)',
              color: 'var(--primary)',
              fontWeight: '700'
            }}
          >
            <BookOpen size={24} />
            Start Journaling
          </button>
       </div>
    </div>
  );
}
