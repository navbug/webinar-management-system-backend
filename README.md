# Webinar Management System

A full-stack web application for managing webinars and attendee registrations built with React, NestJS, and MongoDB.

## Repository Links

- **Backend Repository:** https://github.com/navbug/webinar-management-system-backend
- **Frontend Repository:** https://github.com/navbug/webinar-management-system-frontend

## Features

- Create and view webinars
- Register attendees for webinars
- View webinar details with attendee statistics
- Prevent duplicate registrations
- Clean and responsive UI with Tailwind CSS

## Setup Instructions

### Clone Repositories

```bash
# Clone backend repository
git clone <BACKEND_REPO_URL>
cd backend

# Clone frontend repository
git clone <FRONTEND_REPO_URL>
cd frontend
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend root:
```env
MONGODB_URI=<MONGODB_URL>
PORT=3000
```

4. Start the backend server:
```bash
npm run start:dev
```

The backend will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend root:
```env
VITE_API_BASE_URL=http://localhost:3000
```

4. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Webinar APIs
- `POST /webinars` - Create a new webinar
- `GET /webinars` - List all webinars
- `GET /webinars/:id` - Get webinar details with attendees

### Attendee APIs
- `POST /webinars/:id/register` - Register an attendee
- `GET /webinars/:id/attendees` - List attendees for a webinar

## Assumptions

1. No authentication/authorization required
2. No edit or delete functionality required
   
