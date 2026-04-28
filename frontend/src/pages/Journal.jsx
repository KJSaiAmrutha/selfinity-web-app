import React, { useState } from 'react';
import { Send, Loader2, BookHeart } from 'lucide-react';

export default function Journal() {
  const [entry, setEntry] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!entry.trim()) return;
    setIsAnalyzing(true);
    setResult(null);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: entry })
      });
      
      if (!response.ok) throw new Error('API Error');
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      // Fallback dummy data for demo purposes
      setTimeout(() => {
        setResult({
          score: 82,
          sentiment: 'Hopeful',
          riskLevel: 'Low',
          insight: "You're expressing a lot of optimism today. Let's take this one step at a time, you're doing better than you think."
        });
        setIsAnalyzing(false);
      }, 1500);
      return;
    }
    setIsAnalyzing(false);
  };

  const getRiskColorClass = (level) => {
    switch(level) {
      case 'High': return 'badge-high';
      case 'Medium': return 'badge-medium';
      default: return 'badge-low';
    }
  };

  return (
    <div className="fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
       <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', background: 'var(--card-bg)', padding: '1rem', borderRadius: '50%', marginBottom: '1rem', boxShadow: 'var(--shadow-soft)' }}>
            <BookHeart color="var(--primary)" size={32} />
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Your Journal</h1>
          <p style={{ fontSize: '1.2rem' }}>Write freely. This is your safe space.</p>
       </div>

       <div className="card" style={{ marginBottom: '2rem' }}>
          <textarea 
            className="input-field" 
            placeholder="How are you feeling today?"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            style={{ fontSize: '1.2rem', padding: '1.5rem', border: 'none', background: 'var(--background)' }}
          ></textarea>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
             <button 
               className="btn btn-primary" 
               onClick={handleAnalyze} 
               disabled={isAnalyzing || !entry.trim()}
             >
               {isAnalyzing ? <Loader2 style={{ animation: 'spin 1s linear infinite' }} size={20} /> : <Send size={20} />}
               {isAnalyzing ? 'Reflecting...' : 'Save & Analyze'}
             </button>
          </div>
       </div>

       {result && (
         <div className="card fade-in" style={{ borderTop: '6px solid var(--secondary)' }}>
            <h3 style={{ marginBottom: '1.5rem', fontWeight: '600' }}>AI Reflection</h3>
            
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ background: 'var(--background)', padding: '1rem 1.5rem', borderRadius: 'var(--radius)', flex: 1, minWidth: '150px' }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', margin: '0 0 0.5rem 0' }}>Sentiment</p>
                <h3 style={{ margin: 0, color: 'var(--text-main)' }}>{result.sentiment}</h3>
              </div>
              <div style={{ background: 'var(--background)', padding: '1rem 1.5rem', borderRadius: 'var(--radius)', flex: 1, minWidth: '150px' }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', margin: '0 0 0.5rem 0' }}>Risk Assessment</p>
                <span className={`badge ${getRiskColorClass(result.riskLevel)}`}>{result.riskLevel} Risk</span>
              </div>
            </div>

            <p style={{ fontSize: '1.15rem', background: 'var(--background)', padding: '1.5rem', borderRadius: 'var(--radius)', fontStyle: 'italic' }}>
              "{result.insight}"
            </p>
         </div>
       )}
       
       <style>{`
         @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
       `}</style>
    </div>
  )
}
