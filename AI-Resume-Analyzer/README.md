# AI Resume Analyzer & Job Recommendation System

A professional full-stack college project that analyzes PDF resumes, calculates resume/ATS scores, detects skills and gaps, and recommends job roles based on skill matching.

## Project Structure

- `frontend/` — React + Vite user interface
- `backend/` — Node.js + Express REST API
- MongoDB — optional persistence for accounts and analysis history

## Features

- Modern dark AI-themed UI
- PDF resume upload
- Resume text extraction
- Resume/ATS score
- Technical and soft skill detection
- Missing skill identification
- Strengths and improvement suggestions
- Job recommendations and match percentage
- Search and match filters
- Register/Login with JWT
- Password hashing with bcrypt
- Resume history model
- Responsive dashboard

## Run Backend

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

On macOS/Linux use:

```bash
cp .env.example .env
```

Backend runs at `http://localhost:5000`.

## Run Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

## MongoDB

For authentication and saved analysis history, set `MONGODB_URI` in `backend/.env`.

Example local database:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/ai_resume_analyzer
```

The server can still start without MongoDB, but database-dependent features will not persist.

## Environment Variables

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
```

Never commit a real `.env` file or secrets to GitHub.

## Main API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/resumes/analyze`
- `GET /api/resumes/history`
- `GET /api/jobs`
- `POST /api/jobs/recommendations`
- `GET /api/health`
