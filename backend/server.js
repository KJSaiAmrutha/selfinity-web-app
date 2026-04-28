const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenAI } = require('@google/genai');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Initialize Gemini
let ai;
try {
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  } else {
    console.warn('⚠️ GEMINI_API_KEY not found in .env. API routes will fail.');
  }
} catch (e) {
  console.error('Failed to initialize Gemini:', e);
}

const analyzePrompt = `You are a mental health wellness analyzer. Analyze the following journal entry from a student.
Provide your response strictly as a JSON object with the following fields:
- "score": A wellness score from 0 to 100 (integer, higher is better)
- "sentiment": A short string describing the sentiment (e.g. "Stressed", "Hopeful", "Anxious")
- "riskLevel": A string, either "Low", "Medium", or "High" indicating risk of severe mental distress or self-harm
- "insight": A short, personalized, empathetic 2-sentence insight about their entry

Do not include any markdown formatting or extra text outside the JSON.`;

const chatPrompt = `You are an anonymous AI empathetic safe space chatbot for students.
Your tone must be empathetic, non-judgmental, calming, and supportive.
If the user expresses severe distress (e.g., self-harm, extreme panic), you MUST set "isEscalation" to true in your JSON response and gently suggest they seek professional help or emergency services.
Provide your response strictly as a JSON object with:
- "reply": Your conversational response
- "isEscalation": boolean indicating if severe distress was detected

Do not include any markdown formatting or backticks around the JSON.`;

app.post('/api/analyze', async (req, res) => {
  try {
    if (!ai) return res.status(500).json({ error: 'Gemini API not configured' });
    const { text } = req.body;
    
    if (!text) return res.status(400).json({ error: 'Text is required' });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: `${analyzePrompt}\n\nJournal Entry:\n${text}` }] }]
    });
    
    let rawText = response.text;
    rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const data = JSON.parse(rawText);
    res.json(data);
  } catch (err) {
    console.error('Analyze Error:', err);
    res.status(500).json({ error: 'Failed to analyze text' });
  }
});

app.post('/api/chat', async (req, res) => {
  try {
    if (!ai) return res.status(500).json({ error: 'Gemini API not configured' });
    const { message, history } = req.body;
    
    if (!message) return res.status(400).json({ error: 'Message is required' });

    let conversationHistory = "";
    if (history && history.length > 0) {
      conversationHistory = history.map(h => `${h.role === 'ai' ? 'Assistant' : 'Student'}: ${h.content}`).join('\n');
    }
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: `${chatPrompt}\n\nConversation History:\n${conversationHistory}\nStudent: ${message}` }] }]
    });
    
    let rawText = response.text;
    rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const data = JSON.parse(rawText);
    res.json(data);
  } catch (err) {
    console.error('Chat Error:', err);
    res.status(500).json({ error: 'Failed to generate chat response' });
  }
});

// Simple health check route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Selfinity backend is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
