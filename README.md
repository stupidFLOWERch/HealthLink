# HealthLink — Doctor Consultation Booking

A patient portal for booking doctor consultations. Built as part of the AI/Automation Engineer assessment.

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | Angular 22 |
| Backend | Node.js + Express + TypeScript |
| Storage | File-based (JSON) |
| HTTP | Angular HttpClient |


## Prerequisites

- Node.js 20+
- npm 10+

## Setup Instructions

### 1. Install dependencies

```
cd HealthLink
npm install
npm --prefix frontend install
npm --prefix backend install
```

### 2. Run the app

```
npm start
```

This starts both:

- Frontend: http://localhost:4200
- Backend: http://localhost:3000

Open http://localhost:4200 in your browser.

### 3. Run separately (optional)

```
# Terminal 1 — backend
cd backend
npm run dev

# Terminal 2 — frontend
cd frontend
npm start
```

## API Endpoints

Base URL: http://localhost:3000

| Method | Path | Description |
|--------|------|-------------|
| GET | / | Health check |
| GET | /doctors | List all available doctors |
| GET | /consultations | List all consultations |
| POST | /consultations | Create a new consultation |

### Example: POST /consultations

Request body:

```json
{
  "doctorId": 1,
  "type": "Chat",
  "preferredTime": "2026-10-09T15:30:00",
  "reason": "Fever and sore throat for 2 days"
}
```

Response (201):

```json
{
  "id": 3,
  "doctorId": 1,
  "doctorName": "Dr. Sarah Lim",
  "specialty": "General Practitioner",
  "type": "Chat",
  "preferredTime": "2026-10-09T15:30:00",
  "reason": "Fever and sore throat for 2 days",
  "status": "Scheduled"
}
```

## Features

### Doctor List
- Displays available doctors (name, specialty, availability)
- Each card has a Book Consultation button
- Clicking a card or button opens the booking form

### Booking Form
- Slide-in panel on the right
- Captures Consultation Type (Chat / Video), Preferred Time, Reason for Visit
- Submits via POST /consultations
- On success, shows a confirmation and refreshes the list

### My Consultations
- Fetches from GET /consultations
- Displays each consultation with doctor name, specialty, type, preferred time
- Status badge: Scheduled / Completed

## How It Works

```
Angular Component
      ↓
Service (HttpClient)
      ↓  http://localhost:3000/...
Express API
      ↓
Controller → jsonStore (read/write)
      ↓
data/*.json
```

- Components only display data and handle user actions.
- Services are the only place that talks to the API.
- Controllers handle business logic.
- jsonStore is a tiny helper for reading/writing JSON files.

## Notes

- Storage is file-based (backend/data/*.json). Data persists across server restarts.
- No database is required. JSON files are read/written on each request.
- CORS is enabled on the backend so the frontend on port 4200 can reach port 3000.
- Status (Scheduled / Completed) is seeded and static — no automatic transitions.
- The frontend calls the API via absolute URL http://localhost:3000. 
- Both frontend and backend must be running.

## Sample Data

backend/data/doctors.json:

```json
[
  {
    "id": 1,
    "name": "Dr. Sarah Lim",
    "specialty": "General Practitioner",
    "available": true,
    "photoUrl": "data:image/svg+xml;utf8,<svg ...>"
  }
]
```

backend/data/consultations.json:

```json
[
  {
    "id": 1,
    "doctorId": 1,
    "doctorName": "Dr. Sarah Lim",
    "specialty": "General Practitioner",
    "type": "Chat",
    "preferredTime": "2026-10-08T15:30:00",
    "reason": "Fever and sore throat for 2 days",
    "status": "Scheduled"
  }
]
```
