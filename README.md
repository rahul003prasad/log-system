# Log Ingestion and Querying System

## Project Overview

This project is a log ingestion and querying system with:

- **Backend:** Node.js + Express API for ingesting and querying logs with robust filtering.
- **Frontend:** React app featuring dynamic filters, real-time log updates, and analytics visualizations.
- **Bonus Features:** Real-time log updates via WebSockets, analytics dashboard with charts, and Docker containerization for easy deployment.

The system supports comprehensive log filtering by message, level, resourceId, timestamps, and more, with live updates pushing new logs to connected clients instantly.

---

## Features

- Robust backend API with combined AND filtering for logs.
- React frontend with:
  - Filter bar for message, level, resourceId, timestamps, and clear/reset options.
  - Real-time log updates via WebSocket.
  - Analytics dashboard showing log counts per level and over time.
  - Responsive and accessible UI.
- Dockerized backend and frontend for easy setup and deployment.
- Clean code with clear separation of concerns and commentary.

---

## Setup & Installation

### Prerequisites

- [Node.js](https://nodejs.org) >= 18
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop)

---

### Local Development (Without Docker)

#### Backend

cd backend
npm install
npm start
Backend runs on [http://localhost:5000](http://localhost:5000)

#### Frontend

cd frontend
npm install
npm run dev

Frontend runs on [http://localhost:3000](http://localhost:3000)

---

### Running with Docker (Recommended)

1. Ensure Docker Desktop is running.

2. Build and start containers:

docker-compose up --build


3. Visit [http://localhost:3000](http://localhost:3000) in your browser to use the app.

4. To stop containers:

docker-compose down

---

## Usage

- Use the filter bar to search logs by level, message, resourceId, and timestamps.
- New logs appear in real-time without refreshing.
- Switch to the **Analytics** tab to view visual summaries of log levels and logs over time.
- Clear filters anytime using the **Clear Filters** button.

---

## Design Decisions

- **Backend** uses in-memory log storage for simplicity; can be extended for persistent DB.
- File-based JSON persistence with locks was considered for concurrency handling.
- Real-time updates utilize WebSocket for performance and UX.
- Frontend architecture using React functional components and hooks for maintainability.
- Charting done via Recharts for responsiveness and ease of integration.
- Full containerization allows easy environment setup and deployment.

---

## Testing

- Backend and frontend unit tests can be run (if implemented) via respective test scripts.
- CI/CD pipelines can be configured for automated test runs.

---

## Troubleshooting

- Ensure Docker is running and ports 3000 (frontend) and 5000 (backend) are free.
- Use `docker-compose logs` to check container logs for errors.
- Verify frontend's backend API URL configuration via environment variables (`VITE_API_URL`).

---

## Future Improvements

- Implement persistent storage (database) for logs instead of in-memory.
- Add authentication and user roles.
- Expand analytics with more detailed visualizations.
- Support bulk log import/export.
- Implement pagination and caching for scalability.

---

## Contact & Contributions

For issues or contributions, please raise issues or pull requests on the GitHub repository.
