import React, { useState, useRef, useEffect } from 'react';
import { Send, User, MessageCircle } from 'lucide-react';

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { role: 'ai', content: "Hi there. I'm your safe space. How are you feeling right now? Let's take this one step at a time." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.content, history: messages })
      });

      if (!response.ok) throw new Error('API Error');

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'ai', content: data.reply, isEscalation: data.isEscalation }]);
    } catch (err) {
      console.error(err);
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'ai', 
          content: "I hear you, and it sounds like things are a bit tough right now. You're doing better than you think. Let's take a slow, deep breath together." 
        }]);
        setIsLoading(false);
      }, 1500);
      return;
    }
    
    setIsLoading(false);
  };

  return (
    <div className="fade-in" style={{ maxWidth: '800px', margin: '0 auto', height: 'calc(100vh - 180px)', display: 'flex', flexDirection: 'column' }}>
       <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>AI Support</h1>
          <p style={{ fontSize: '1.2rem' }}>An empathetic, non-judgmental space just for you.</p>
       </div>

       <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '0' }}>
         <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'var(--background)' }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ 
                display: 'flex', 
                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                gap: '1rem',
                alignItems: 'flex-start'
              }}>
                <div style={{ 
                  background: msg.role === 'user' ? 'var(--primary)' : 'var(--card-bg)',
                  padding: '0.8rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-soft)'
                }}>
                  {msg.role === 'user' ? <User color="#fff" size={20} /> : <MessageCircle color="var(--primary)" size={20} />}
                </div>
                
                <div style={{
                  maxWidth: '75%',
                  padding: '1.2rem',
                  background: msg.role === 'user' ? 'var(--primary)' : 'var(--card-bg)',
                  color: msg.role === 'user' ? '#fff' : 'var(--text-main)',
                  boxShadow: 'var(--shadow-soft)',
                  borderTopLeftRadius: msg.role === 'ai' ? '4px' : 'var(--radius)',
                  borderTopRightRadius: msg.role === 'user' ? '4px' : 'var(--radius)',
                  borderBottomLeftRadius: 'var(--radius)',
                  borderBottomRightRadius: 'var(--radius)',
                  lineHeight: '1.6',
                  fontSize: '1.1rem'
                }}>
                  {msg.content}
                </div>

                {msg.isEscalation && (
                  <div style={{ width: '100%', display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', marginTop: '-0.5rem' }}>
                    <div className="badge badge-high" style={{ marginTop: '0.5rem' }}>
                      Please contact emergency services. You matter.
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ background: 'var(--card-bg)', padding: '0.8rem', borderRadius: '50%', boxShadow: 'var(--shadow-soft)' }}>
                  <MessageCircle color="var(--primary)" size={20} />
                </div>
                <div style={{ padding: '1.2rem', background: 'var(--card-bg)', borderTopLeftRadius: '4px', borderTopRightRadius: 'var(--radius)', borderBottomLeftRadius: 'var(--radius)', borderBottomRightRadius: 'var(--radius)', boxShadow: 'var(--shadow-soft)' }}>
                  <div className="typing-indicator">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
         </div>

         <div style={{ padding: '1.5rem', background: 'var(--card-bg)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
            <form onSubmit={handleSend} style={{ display: 'flex', gap: '1rem' }}>
              <input 
                type="text" 
                className="input-field" 
                placeholder="Type your message here..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{ flex: 1, padding: '1.2rem 1.5rem' }}
              />
              <button type="submit" className="btn btn-primary" disabled={isLoading || !input.trim()} style={{ width: '60px', padding: 0 }}>
                <Send size={24} style={{ marginLeft: '-2px' }} />
              </button>
            </form>
         </div>
       </div>

       <style>{`
         .typing-indicator {
           display: flex;
           gap: 6px;
           align-items: center;
           height: 24px;
         }
         .typing-indicator span {
           width: 8px;
           height: 8px;
           background-color: var(--primary);
           border-radius: 50%;
           animation: bounce 1.4s infinite ease-in-out both;
         }
         .typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
         .typing-indicator span:nth-child(2) { animation-delay: -0.16s; }
         
         @keyframes bounce {
           0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
           40% { transform: scale(1); opacity: 1; }
         }
       `}</style>
    </div>
  )
}
