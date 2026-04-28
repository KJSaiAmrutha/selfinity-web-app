# Selfinity 🌿 - AI-Powered Mental Wellness for Students

## Problem Statement
Students face unprecedented levels of stress, burnout, and anxiety, but seeking help often comes with stigma or a lack of immediate accessibility. Identifying emotional distress early is critical, but traditional methods are reactive rather than proactive.

## Solution: Selfinity
Selfinity is a privacy-first, full-stack AI application designed to detect early signs of mental health issues and provide intelligent, empathetic, and immediate support. By analyzing behavioral signals and daily reflections, Selfinity acts as a private safe space to track emotional wellness and offer anonymous, non-judgmental interventions.

## Architecture & Tech Stack

**Frontend**:
- React (Vite)
- React Router DOM
- Vanilla CSS (Glassmorphism, Dark/Light modes, Smooth Animations)
- Chart.js (Data Visualization)
- Lucide React (Icons)

**Backend**:
- Node.js & Express
- `@google/genai` (Google Gemini API for Core Intelligence)
- CORS, Dotenv

**Architecture Diagram**:


## Setup Instructions

### 1. Backend Setup
1. Open terminal and navigate to `backend` directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file in the `backend` folder and add your Gemini API Key:
   ```env
   PORT=5000
   GEMINI_API_KEY=your_google_gemini_api_key
   ```
4. Start the server: `node server.js`

### 2. Frontend Setup
1. Open a new terminal and navigate to `frontend` directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

### 3. Usage
- Go to `http://localhost:5173`
- Start Journaling or Talk to the AI Chatbot.



## Key Features
- **AI-Based Behavioral Detection**: Uses Gemini to analyze sentiment, risk level, and output a wellness score from journal entries.
- **Anonymous Chatbot**: Provides a safe space with guided prompts and coping strategies.
- **Smart Escalation**: Detects high-risk signs and triggers supportive alerts.
- **Privacy-First**: No login required.
- **Premium UI**: Designed with aesthetic, Gen-Z friendly pastel colors and a smooth, interactive glassmorphism layout.

## Live Demo
https://selfinity-web-app.vercel.app/login
Video Demo :
https://drive.google.com/drive/folders/1osAMvrpjfsy0zq2Pfc0xi8AGS-7r1Mmd?usp=drive_link
