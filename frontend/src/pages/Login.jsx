import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, Moon, Sun, ArrowRight, Lock } from 'lucide-react';

export default function Login({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login, redirect directly to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="fade-in" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      backgroundColor: 'var(--background)'
    }}>
      {/* Dark mode toggle absolute positioned */}
      <button 
        className="btn btn-secondary" 
        style={{
          position: 'absolute', 
          top: '2rem', 
          right: '2rem',
          padding: '0.6rem', 
          borderRadius: '50%', 
          width: '46px', 
          height: '46px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: 'var(--card-bg)',
          border: 'none',
          boxShadow: 'var(--shadow-soft)'
        }}
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? <Sun size={22} color="var(--text-main)" /> : <Moon size={22} color="var(--text-main)" />}
      </button>

      <div className="card" style={{ maxWidth: '450px', width: '100%', padding: '3rem 2.5rem', textAlign: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--primary)', fontSize: '2rem', fontWeight: '700' }}>
            <Heart fill="var(--accent)" color="var(--primary)" size={32} />
            Selfinity
          </div>
        </Link>
        
        <h2 style={{ marginBottom: '0.5rem', fontSize: '1.8rem' }}>Welcome Back</h2>
        <p style={{ color: 'var(--text-light)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>Your safe space is waiting for you.</p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div style={{ textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-main)', fontWeight: '500' }}>Email Address</label>
            <input 
              type="email" 
              className="input-field" 
              placeholder="you@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: '1rem', minHeight: 'auto' }}
              required
            />
          </div>
          
          <div style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label style={{ color: 'var(--text-main)', fontWeight: '500' }}>Password</label>
              <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.9rem' }}>Forgot?</a>
            </div>
            <input 
              type="password" 
              className="input-field" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '1rem', minHeight: 'auto' }}
              required
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', marginBottom: '1.5rem', color: 'var(--text-light)', fontSize: '0.9rem', justifyContent: 'center' }}>
            <Lock size={14} />
            <span>Your data is fully encrypted and private.</span>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1.2rem', fontSize: '1.1rem', borderRadius: '30px' }}>
            Sign In <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
          </button>
        </form>

        <div style={{ marginTop: '2rem', color: 'var(--text-light)' }}>
          Don't have an account? <a href="#" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>Sign up anonymously</a>
        </div>
      </div>
    </div>
  );
}
