# 🧑‍💻 Collaborative Task Manager

A full-stack, real-time task management application built to streamline team collaboration. Features secure authentication, live task updates, and a responsive dashboard.

**🚀 Live Demo:** [https://full-stack-cnbsfo9ab-yashwanths-projects-307796b5.vercel.app](https://full-stack-cnbsfo9ab-yashwanths-projects-307796b5.vercel.app)  
**🔗 Backend API:** [https://fullstack-5rb5.onrender.com](https://fullstack-5rb5.onrender.com)

---

## ⚙️ Tech Stack

* **Frontend:** React (Vite), TypeScript, Tailwind CSS, SWR/Axios.
* **Backend:** Node.js, Express, TypeScript, Socket.io.
* **Database:** PostgreSQL (via Render).
* **ORM:** Prisma.
* **Deployment:** Vercel (Frontend), Render (Backend).

---

## 🛠️ Setup Instructions (Run Locally)

### Prerequisites
* Node.js (v18+)
* PostgreSQL installed locally

### 1. Clone the Repository
```bash
git clone [https://github.com/Yashwanthkasula25/FullStack.git](https://github.com/Yashwanthkasula25/FullStack.git)
cd FullStack

cd backend
npm install

# Create a .env file in the backend folder
# Add: DATABASE_URL="postgresql://user:password@localhost:5432/taskdb"
# Add: JWT_SECRET="your_super_secret_key"
# Add: PORT=5000

# Initialize Database
npx prisma migrate dev --name init
npx prisma generate

# Start Server
npm run dev

cd ../frontend
npm install

# Create a .env file in the frontend folder
# Add: VITE_API_URL="http://localhost:5000"

# Start React App
npm run dev

🏗️ Architecture & Design Decisions
Database Choice: PostgreSQL & Prisma
I chose PostgreSQL because task management requires strict relational data integrity (Users have many Tasks; Tasks belong to Creators/Assignees). Prisma was selected as the ORM to ensure end-to-end type safety with TypeScript, reducing runtime errors significantly.

Service-Repository Pattern
To ensure scalability and clean code, the backend is organized into layers:

Controllers: Handle HTTP requests and send responses.

Services: Contain the business logic (e.g., "Assigning a task requires sending an email/notification").

Repositories: Handle direct database queries.

DTOs: Use strict typing to validate all incoming data before it reaches the logic layer.

Authentication
Stateless JWT (JSON Web Tokens) are used for session management. This allows the backend to be easily scalable without maintaining session stores. Passwords are hashed using bcrypt before storage.

⚡ Real-Time Implementation (Socket.io)
Real-time collaboration is powered by Socket.io.

Server: Listens for events like task_created or task_updated.

Client: Connects to the socket server on load.

Logic: When a user updates a task status, the server broadcasts an event to all connected clients. The frontend listeners automatically trigger a re-fetch of the data (via SWR/React Query cache invalidation) or update the UI state directly.

📡 API Contract
Auth
POST /api/v1/auth/register - Create a new user.

POST /api/v1/auth/login - Authenticate and receive Token.

Tasks
GET /api/v1/tasks - Fetch all tasks (supports filtering ?status=...&priority=...).

POST /api/v1/tasks - Create a new task.

PATCH /api/v1/tasks/:id - Update task details (Status, Priority, Assignee).

DELETE /api/v1/tasks/:id - Remove a task.

🧪 Testing
Unit tests are implemented using Jest.

Location: backend/tests/

Coverage: Critical service logic, including task status toggling and priority validation.
