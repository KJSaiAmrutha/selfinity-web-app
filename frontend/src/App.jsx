import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink, Link, useLocation } from 'react-router-dom';
import { Heart, Activity, BookOpen, MessageCircle, Moon, Sun, LogIn } from 'lucide-react';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Journal from './pages/Journal';
import Chatbot from './pages/Chatbot';
import Login from './pages/Login';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check local storage or system preference on mount
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.setAttribute('data-theme', 'light');
    }
  }, [darkMode]);

  const isLoginPage = location.pathname === '/login';

  return (
    <div className="app-container">
      {!isLoginPage && (
        <nav className="navbar fade-in">
          <Link to="/" className="logo">
            <Heart fill="var(--accent)" color="var(--primary)" size={28}/> 
            Selfinity
          </Link>
          <div className="nav-links">
            <NavLink to="/dashboard" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
              <span style={{display: 'flex', alignItems: 'center', gap: '0.3rem'}}><Activity size={20}/>Dashboard</span>
            </NavLink>
            <NavLink to="/journal" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
              <span style={{display: 'flex', alignItems: 'center', gap: '0.3rem'}}><BookOpen size={20}/>Journal</span>
            </NavLink>
            <NavLink to="/chat" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
              <span style={{display: 'flex', alignItems: 'center', gap: '0.3rem'}}><MessageCircle size={20}/>Chat Space</span>
            </NavLink>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '1rem', borderLeft: '1px solid rgba(156,163,175,0.2)', paddingLeft: '1rem'}}>
              <button 
                className="btn btn-secondary" 
                style={{padding: '0.5rem', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                onClick={() => setDarkMode(!darkMode)}
                aria-label="Toggle Dark Mode"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <Link to="/login" className="btn btn-primary" style={{padding: '0.6rem 1.2rem', fontSize: '1rem', borderRadius: '30px'}}>
                <LogIn size={18} />
                Sign In
              </Link>
            </div>
          </div>
        </nav>
      )}

      <main className="fade-in">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/chat" element={<Chatbot />} />
          <Route path="/login" element={<Login darkMode={darkMode} setDarkMode={setDarkMode} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
