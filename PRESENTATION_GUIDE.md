# Technical Presentation Guide: Health Compass

This document provides a comprehensive technical overview of the **Health Compass** platform. It is designed to help you explain the architecture, features, and implementation details to your professor.

---

## 1. Core Features & Implementation

### 🛡️ Authentication (Google OAuth 2.0)
*   **Frontend**: Implemented using `@react-oauth/google`. It provides a "One-Tap" and button-based login experience.
*   **Backend**: Verified using the `google-auth-library`. When a user logs in, the backend verifies the Google ID Token, extracts the user's details, and issues a local **JWT (JSON Web Token)** for session management.
*   **Why**: This ensures a secure, passwordless experience tailored for older adults and busy caregivers.

### 💰 Subscription Management (Stripe Simulation)
*   **Implementation**: A high-fidelity **Stripe Simulation** was custom-built. 
*   **Frontend**: Includes a realistic checkout modal with real-time card formatting (Luhn algorithm concepts) and processing states.
*   **Backend**: A dedicated `/api/subscription` route handles tier upgrades (Free, Basic, Pro). 
*   **Role-Based Access Control (RBAC)**: Different tiers unlock specific features (e.g., PDF export, Adaptive testing, Clinician support).

### 🤖 AI Question Generation (Google Gemini)
*   **Engine**: Integrated with **Google Gemini 1.5 Flash**.
*   **Logic**: Uses a complex "Neuropsychologist Prompt" that adjusts question difficulty and vocabulary based on the patient's **Age**, **Education Level**, and **Occupation**.
*   **Adaptive Mode**: If enabled, the AI generates questions one-by-one, adjusting the difficulty of the next question based on the user's performance on the previous one.

### 📄 Clinical PDF Reporting
*   **Libraries**: Built using `jspdf` and `jspdf-autotable`.
*   **Design**: Uses a customized "Clinical Branding" (Navy & Sage palette).
*   **Data Integrity**: Safely parses complex longitudinal data, scores, and AI interpretations into a structured, multi-page professional clinical report.

### 🏥 Specialist Contact System
*   **Implementation**: Uses `nodemailer` to connect patients with clinical specialists.
*   **Feature**: Includes a "Reply-To" header so specialists can reply directly to the patient's email from their own inbox.

---

## 2. Technical Stack
*   **Frontend**: React.js, Lucide Icons, Recharts (Analytics), CSS3 (Glassmorphism & Micro-animations).
*   **Backend**: Node.js, Express.js.
*   **Database**: MongoDB (Mongoose ODM).
*   **AI**: Google Generative AI (Gemini API).

---

## 3. Deployment & Dockerization
The project is fully **containerized** for reliable deployment in any environment.

### Docker Architecture:
1.  **`mongodb`**: Runs the official MongoDB image, ensuring the database is always consistent.
2.  **`healthcompass-backend`**: A Node.js container that exposes the API. It connects to the internal Mongo service.
3.  **`healthcompass-frontend`**: A React production-ready container.
4.  **`healthcompass-ml`**: A Python Flask service for specialized analysis.

### How to Deploy:
1.  Ensure **Docker Desktop** is running.
2.  Run `docker-compose up --build`.
3.  The entire ecosystem (DB, API, Frontend) starts automatically and talks to each other via a private Docker network.

---

## 4. GitHub Status
*   **Repository**: [Health-Compass](https://github.com/hammadshabbir10/Health-Compass)
*   **Last Commit**: "Final submission: Clinical analytics, PDF reporting, and UI refinements"
*   **Branch**: `master` (pushed and tracked).

---

## 5. Summary Pitch for Professor
*"Health Compass is a clinical-grade cognitive screening platform designed to bridge the gap between home-based monitoring and professional care. We've leveraged Google's Gemini AI to create adaptive, patient-centric assessments, and implemented a robust MERN stack architecture. By using Docker, we've ensured the platform is scalable and deployable, while the integrated PDF reporting service provides actionable longitudinal data for healthcare providers."*
