# StudySync – AI Powered Study Assistant

StudySync is a full-stack MERN application designed to help students organize and improve their study workflow. It combines task management, notes, flashcards, Pomodoro focus sessions, AI assistance, and analytics in a single platform.

---

## Features

### User Authentication
- Secure signup and login using JWT authentication
- Email OTP verification
- Forgot password and reset password functionality

### Study Management
- Create, update, and delete tasks
- Create and manage study notes
- Flashcard decks for learning and revision
- Resource management for storing study materials

### Productivity Tools
- Pomodoro focus timer
- Focus session analytics
- Task progress tracking

### AI Assistant
- AI powered chat to help with study questions and learning

### Reports & Data Export
- Export tasks as CSV
- Export notes as CSV
- Export flashcards as CSV

### Admin Dashboard
- System statistics overview
- Charts showing system data distribution

### UI/UX
- Responsive modern interface
- Light / Dark theme toggle
- Toast notifications for actions

---

## Tech Stack

### Frontend
- React.js
- React Router
- Context API
- Axios
- Recharts

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Nodemailer (OTP email verification)
- Multer (file upload)
- json2csv (report export)

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## Project Structure

```
studysync
│
├── client
│   ├── public
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   │   ├── common
│   │   │   ├── flashcards
│   │   │   ├── reports
│   │   │   └── tasks
│   │   ├── context
│   │   ├── pages
│   │   │   ├── admin
│   │   │   ├── dashboard
│   │   │   ├── pomodoro
│   │   │   └── profile
│   │   ├── utils
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── utils
│   └── server.js
│
└── README.md
```

## Installation

---

### 1. Clone the repository

---

```bash
git clone https://github.com/nadhafathima281-star/studysync.git 
```
---

### 2. Install backend dependencies

```bash
cd server
npm install
```
---

### 3. Install frontend dependencies

```bash
cd client
npm install
```
---

### 4. Create environment variables

Create a `.env` file inside the **server folder**.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```
---

### 5. Run backend server

```bash
cd server
npm run dev
```
---

### 6. Run frontend

```bash
cd client
npm run dev
```
---

## Usage

After running both the backend and frontend servers, open your browser and navigate to:
```
http://localhost:5173
```
From there you can:

- Register or log in to your account
- Create and manage study tasks
- Write and organize notes
- Create flashcards and study using them
- Use the Pomodoro timer for focused study sessions
- Chat with the AI assistant for study help
- Export your study data as CSV reports
- Access the admin dashboard (admin users only)

---

## API Endpoints

### Authentication
- POST `/api/auth/register`
- POST  `/api/auth/login`
- POST `/api/auth/verify-otp`
- POST `/api/auth/forgot-password`
- POST `/api/auth/reset-password`

### Tasks
- GET `/api/tasks`
- POST `/api/tasks`
- PUT `/api/tasks/:id`
- DELETE `/api/tasks/:id`

### Notes
- GET `/api/notes`
- POST `/api/notes`
- PUT `/api/notes/:id`
- DELETE `/api/notes/:id`

### Flashcards
- GET `/api/flashcards`
- POST `/api/flashcards`
- DELETE `/api/flashcards/:id`

### Reports
- GET `/api/reports/export/tasks`
- GET `/api/reports/export/notes`
- GET `/api/reports/export/flashcards`

---

## Live Demo

Frontend: (Add Vercel link after deployment)

Backend: (Add Render link after deployment)

---

## Future Improvements

- PDF report export
- Mobile application
- Collaborative study groups
- Advanced AI learning assistant

---

## Author

**Nada Fathima**  
MERN Stack Developer
