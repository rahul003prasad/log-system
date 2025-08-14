# Log Ingestion & Querying System

A full-stack log ingestion and querying platform featuring real-time updates, sophisticated filtering, analytic dashboards, and easy deployment via Docker.

---

##  Project Overview

This application consists of:

- **Backend**: A Node.js + Express API that handles log ingestion and querying, with powerful, multi-criteria filtering.
- **Frontend**: A React-based interface offering dynamic filtering, real-time log delivery via WebSockets, and visual analytics.
- **Additional Highlights**:
  - Live log updates for seamless UX
  - Interactive analytics visualizations
  - Dockerized for consistent, hassle-free deployment

---

##  Key Features

- **Advanced API Filtering**: Query logs using combined AND filters across level, message content, resource ID, timestamps, and more.
- **Reactive Frontend**:
  - Filter bar includes search, resets, and time-based queries.
  - New logs surge into view instantly using WebSockets.
  - Analytics screen shows log distribution by level and trends over time.
  - Built with responsiveness and accessibility in mind.
- **Docker Compatibility**: Run completely via Docker for streamlined setup and deployment.
- **Clean Architecture**: Maintains a clear separation of concerns with thoughtful documentation and code structure.

---

##  Setup & Installation

### Prerequisites

Ensure the following are installed:

- Node.js (version 18 or higher)
- Docker and Docker Compose

### Option 1: Local Development (without Docker)

**Backend**  
```bash
cd backend
npm install
npm start
```  
The API will run at `http://localhost:5000`.

**Frontend**  
```bash
cd frontend
npm install
npm run dev
```  
The UI will be available at `http://localhost:3000`.

### Option 2: Dockerized Setup (Recommended)

```bash
docker-compose up --build
```  
Then visit the app at `http://localhost:3000`.

To stop and clean up containers:
```bash
docker-compose down
```

---

##  How to Use

- Use the filter bar to narrow logs by level, message, resourceId, time, and more.
- Watch live log entries appear without page refresh.
- Navigate to **Analytics** for real-time summaries and charts.
- Hit **Clear Filters** to reset your filters at any time.

---

##  Design & Architecture

- **In-Memory Log Storage**: Fast and simple, with optional future support for persistent databases.
- **WebSocket Real-Time Updates**: Keeps the UI in sync with backend events.
- **React Hooks & Functional Components**: Favored for maintainability and developer ergonomics.
- **Visualizations via Recharts**: Responsive, customizable charts and dashboards.
- **Container-first Design**: Enables consistent environments and smoother deployment.

---

##  Testing & CI/CD

- Frontend and backend components can be individually tested via their respective test scripts.
- CI/CD pipelines can be set up for automated testing and deployment workflows.

---

##  Troubleshooting

- Ensure ports **3000** (frontend) and **5000** (backend) are not occupied.
- Run `docker-compose logs` to check for container-specific errors.
- Check environment configuration, especially `VITE_API_URL` for frontend-backend connectivity.

---

##  Future Enhancements

- Add durable **persistent storage** (e.g., database backends).
- Support **authentication** with roles and access control.
- Expand analytics (e.g., log severity over time, exporting charts).
- Enable **bulk import/export**, pagination, and caching for scale.

---

## 🤝 Contributions & Support

Want to contribute? Great! Please open an issue or submit a pull request. Your input is welcome!
