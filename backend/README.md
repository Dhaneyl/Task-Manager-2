# Task Manager Backend API

Node.js + Express + MongoDB backend with Socket.io real-time features.

## Features

- JWT authentication
- RESTful API endpoints
- Real-time updates via Socket.io
- File upload support
- Recurring tasks
- Subtasks management
- Tags system
- Notifications

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (use `.env.example` as template):
```bash
cp .env.example .env
```

3. Update `.env` with your MongoDB URI and JWT secret

4. Start MongoDB (if running locally):
```bash
mongod
```

5. Run development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user
- PUT `/api/auth/profile` - Update profile

### Tasks
- GET `/api/tasks` - Get all tasks
- POST `/api/tasks` - Create task
- GET `/api/tasks/:id` - Get single task
- PUT `/api/tasks/:id` - Update task
- DELETE `/api/tasks/:id` - Delete task

### Subtasks
- POST `/api/tasks/:id/subtasks` - Add subtask
- PUT `/api/tasks/:id/subtasks/:subtaskId` - Update subtask
- DELETE `/api/tasks/:id/subtasks/:subtaskId` - Delete subtask

### Categories
- GET `/api/categories` - Get all categories
- POST `/api/categories` - Create category
- PUT `/api/categories/:id` - Update category
- DELETE `/api/categories/:id` - Delete category

### Priorities
- GET `/api/priorities` - Get all priorities
- POST `/api/priorities` - Create priority
- PUT `/api/priorities/:id` - Update priority
- DELETE `/api/priorities/:id` - Delete priority

### Tags
- GET `/api/tags` - Get all tags
- POST `/api/tags` - Create tag
- PUT `/api/tags/:id` - Update tag
- DELETE `/api/tags/:id` - Delete tag

### Notifications
- GET `/api/notifications` - Get all notifications
- PUT `/api/notifications/:id/read` - Mark as read
- DELETE `/api/notifications/:id` - Delete notification
- DELETE `/api/notifications` - Clear all notifications

### Upload
- POST `/api/upload` - Upload file

## Socket.io Events

### Client → Server
- `join` - Join user-specific room
- `task:update` - Update task

### Server → Client
- `task:created` - Task created
- `task:updated` - Task updated
- `task:deleted` - Task deleted

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - JWT secret key
- `JWT_EXPIRE` - Token expiration (default: 7d)
- `CLIENT_URL` - Frontend URL for CORS
- `MAX_FILE_SIZE` - Max upload size in bytes
- `UPLOAD_PATH` - Upload directory path
