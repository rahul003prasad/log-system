# Log Ingestion and Querying System

## 📌 Overview
A full-stack log management tool that allows you to **ingest, store, and query logs** efficiently.  
It features a **React + Vite frontend** for real-time filtering and a **Node.js + Express backend** with JSON-file storage.  

---

## 🛠 Architecture & Tech Stack

- **Backend:** Node.js, Express  
  - JSON file acts as a simple database (no external DB setup).
  - Filtering & sorting performed in Node.
- **Frontend:** React + Vite  
  - Functional components + Hooks.
  - Filters: message, level, resourceId, timestamp range, etc.
- **Testing:**  
  - Backend: Jest API tests (valid/invalid payloads, filter edge cases).
  - Frontend: React Testing Library + Jest (UI & API behavior).
- **Optional Extensions:** WebSockets, analytics dashboard.
- **Deployment:** Docker support for full-stack containerization.

---

## ⚙ Local Setup

### 1️⃣ Prerequisites
- Node.js v18+
- npm

### 2️⃣ Installation
```bash
# Clone repo
git clone https://github.com/rahul003prasad/log-system.git
cd log-system

# Install backend deps
cd backend
npm install

# Install frontend deps
cd ../frontend
npm install
```

### 3️⃣ Running Locally
**Start Backend**
```bash
cd backend
npm start
```
**Start Frontend**
```bash
cd ../frontend
npm run dev
```

- Frontend → http://localhost:5173  
- Backend → http://localhost:5000  
- API requests from frontend are proxied to backend.

---

## 🐳 Docker Setup
```bash
docker-compose up --build
```
> Spins up backend & frontend containers (see `docker-compose.yml` for port mapping).

---

## 📡 API Endpoints

### `POST /logs`
**Purpose:** Add a new log  
**Request Body:**
```json
{
  "level": "error|warn|info|debug",
  "message": "string",
  "resourceId": "string",
  "timestamp": "2025-08-15T08:00:00Z",
  "traceId": "string",
  "spanId": "string",
  "commit": "string",
  "metadata": { "parentResourceId": "string" }
}
```
**Response:** `201 Created` + stored log object

---

### `GET /logs`
**Purpose:** Retrieve filtered logs  
**Optional Query Params:**
- `level`
- `message`
- `resourceId`
- `timestamp_start` / `timestamp_end`
- `traceId`
- `spanId`
- `commit`

**Response:** Array of logs sorted reverse-chronologically.

---

## 🧪 Running Tests

### Backend
```bash
cd backend
npm test
```

### Frontend
```bash
cd frontend
npm test
```

Covers:
- UI rendering
- API interactions & mocks
- Each filter & combinations
- Loading/error states
- Empty results handling

---

## 🎯 Design Choices
- **File-based DB:** Keeps setup simple for assignments/demos.
- **Real-time filtering** via React state.
- **No Redux:** Context & hooks are enough for scope.
- **Accessibility:** Proper roles & ARIA attributes where applicable.

---

## ⚠ Limitations
- No authentication (public API)
- File storage not suited for heavy concurrent writes
- No log rotation for large datasets
- WebSockets & analytics optional, not core

---

## 🤝 Contribution
1. Fork & branch
2. Make changes with tests
3. Submit PR

---

**Author:** Your Name  
GitHub: [rahul003prasad](https://github.com/rahul003prasad)  
Email: rahul003prasad@gmail.com
