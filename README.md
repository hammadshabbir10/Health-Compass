# Health Compass

Health Compass is a patient ability assessment web app that guides caregivers through structured, MCQ-based cognitive and daily-function tests. It generates age-, gender-, and occupation-aware question sets and presents clear scoring with visual summaries.

## Features
- Profile-based test generation (age, gender, occupation)
- Five-domain assessment flow: Global, Episodic Memory, Executive, Language, Functional
- MCQ-only questions with 1-mark scoring
- Visual results with radar profile and progress bars
- Secure auth flow and protected test routes

## Tech Stack
- Frontend: React, React Router
- Backend: Node.js, Express
- AI: Gemini (via API)

## Project Structure
- backend/: API server, AI test generation, auth
- frontend/: React UI

## Getting Started

### Backend
1. Create backend/config.env with your secrets:
```
PORT=5000
GEMINI_API_KEY=your_key_here
JWT_SECRET=your_jwt_secret
```
2. Install and run:
```
cd backend
npm install
node server.js
```

### Frontend
```
cd frontend
npm install
npm start
```

## Notes
- Do not commit backend/config.env (it is ignored).
- Generate new tests after changing the AI prompt.

## License
MIT
