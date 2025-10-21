# Task Manager Application

A comprehensive, full-stack task management application with real-time features, built with the MERN stack (MongoDB, Express, React, Node.js). Features subtasks, recurring tasks, tags, file attachments, WebSocket real-time updates, and a beautiful coral-themed UI with dark mode support.

![React](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Node.js](https://img.shields.io/badge/Node.js-16+-green) ![MongoDB](https://img.shields.io/badge/MongoDB-Latest-brightgreen) ![Socket.io](https://img.shields.io/badge/Socket.io-4-black)

## Features

### 🆕 New Features (Latest Update)
- **Subtasks**: Break down tasks into smaller checklist items with progress tracking
- **Recurring Tasks**: Set tasks to repeat daily, weekly, monthly, or yearly
- **Tags System**: Organize tasks with multiple tags for flexible categorization
- **File Attachments**: Upload and attach files/documents to tasks
- **Real-time Updates**: Live synchronization across devices via WebSocket
- **Backend API**: Full REST API with JWT authentication
- **Database Storage**: MongoDB for persistent, scalable data storage

### Core Functionality
- **Authentication System**: JWT-based secure login and registration
- **Dashboard**: Comprehensive overview with statistics, charts, and recent tasks
- **Task Management**: Full CRUD operations with filtering, search, and status tracking
- **Categories**: Organize tasks with color-coded categories
- **Priorities**: High, Medium, and Low priority levels
- **Calendar View**: Visualize tasks by due date
- **Notifications**: Real-time notifications for task activities
- **User Account**: Profile management and password change

### UI/UX Features
- **Toast Notifications**: User-friendly success/error messages
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern Design**: Clean, minimalist interface with smooth animations
- **Coral Theme**: Beautiful coral (#FF6B6B) color palette
- **Interactive Charts**: Visual statistics using Recharts

### Technical Features
- **Full-Stack Architecture**: MERN (MongoDB, Express, React, Node.js)
- **TypeScript**: Full type safety on frontend and backend
- **WebSocket**: Real-time bidirectional communication
- **RESTful API**: Well-structured API endpoints
- **JWT Authentication**: Secure token-based auth
- **File Upload**: Multer-based file handling
- **Context API**: React global state management
- **Axios**: HTTP client with interceptors
- **Socket.io**: Real-time event-driven communication

## Tech Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken) + bcrypt
- **Real-time**: Socket.io
- **File Upload**: Multer
- **Validation**: express-validator

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios
- **Real-time**: Socket.io-client
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Utilities**: date-fns
- **Drag & Drop**: @hello-pangea/dnd
- **Notifications**: react-hot-toast

## Getting Started

**⚠️ Important:** This is a full-stack application that requires both frontend and backend servers to be running.

### Quick Start

#### Prerequisites
- Node.js 16+ and npm
- MongoDB (local installation or MongoDB Atlas account)

#### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install backend dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

#### Frontend Setup

1. Navigate to the project root directory:
```bash
cd ..
```

2. Install frontend dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Getting Started
- Register a new account through the registration page
- Default categories and priorities will be automatically created
- Start creating and managing your tasks!

## Project Structure

```
task-manager/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts          # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.ts    # Authentication logic
│   │   │   ├── taskController.ts    # Task CRUD operations
│   │   │   ├── categoryController.ts
│   │   │   ├── priorityController.ts
│   │   │   ├── tagController.ts
│   │   │   ├── notificationController.ts
│   │   │   └── uploadController.ts
│   │   ├── middleware/
│   │   │   ├── auth.ts              # JWT authentication
│   │   │   └── upload.ts            # File upload handling
│   │   ├── models/
│   │   │   ├── User.ts              # User schema
│   │   │   ├── Task.ts              # Task schema with subtasks
│   │   │   ├── Category.ts
│   │   │   ├── Priority.ts
│   │   │   ├── Tag.ts
│   │   │   └── Notification.ts
│   │   ├── routes/
│   │   │   ├── authRoutes.ts
│   │   │   ├── taskRoutes.ts
│   │   │   ├── categoryRoutes.ts
│   │   │   ├── priorityRoutes.ts
│   │   │   ├── tagRoutes.ts
│   │   │   ├── notificationRoutes.ts
│   │   │   └── uploadRoutes.ts
│   │   ├── utils/
│   │   │   ├── seedDefaults.ts      # Default data seeding
│   │   │   ├── recurrence.ts        # Recurring tasks logic
│   │   │   └── generateToken.ts     # JWT token generation
│   │   └── server.ts                # Express server & Socket.io
│   └── package.json
├── src/
│   ├── components/
│   │   ├── common/        # Reusable components (Button, Modal)
│   │   └── layout/        # Layout components (Sidebar, Header, MainLayout)
│   ├── contexts/          # React Context providers
│   │   ├── AuthContext.tsx
│   │   └── TaskContext.tsx
│   ├── pages/             # Page components
│   │   ├── auth/          # Login, Register
│   │   ├── dashboard/     # Dashboard
│   │   ├── tasks/         # Task management
│   │   ├── categories/    # Category management
│   │   ├── calendar/      # Calendar view
│   │   ├── notifications/ # Notifications
│   │   └── account/       # User account settings
│   ├── services/          # Service layer
│   │   ├── api.ts         # API client with all endpoints
│   │   └── socket.ts      # WebSocket service
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/             # Utility functions
│   │   └── helpers.ts     # Helper functions
│   ├── App.tsx            # Main App component with routing
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies
```

## Features in Detail

### 1. Dashboard
- **Statistics Cards**: Total, Completed, In Progress, and Pending tasks
- **Pie Charts**: Visual representation of task status and categories
- **Recent Tasks**: Quick view of latest tasks
- **Quick Actions**: Shortcuts to common operations
- **Completion Rate**: Progress indicator

### 2. Task Management
- **Create/Edit/Delete**: Full CRUD operations
- **Task Properties**: Title, description, category, priority, status, due date
- **Search**: Real-time task search
- **Filters**: Filter by status, category, priority, date
- **Checkbox Toggle**: Quick completion status change
- **Visual Indicators**: Color-coded categories and priorities

### 3. Categories
- **Custom Categories**: Create unlimited categories
- **Color Picker**: Choose custom colors for each category
- **Task Counter**: See how many tasks per category
- **Edit/Delete**: Manage categories easily

### 4. Calendar
- **Date-based View**: See tasks organized by due date
- **Upcoming Tasks**: View tasks chronologically
- **Color Coding**: Categories shown with their colors

### 5. Notifications
- **Activity Feed**: Track task creation, completion, and updates
- **Read/Unread**: Mark notifications as read
- **Delete**: Remove individual or all notifications
- **Badge Counter**: Unread count in sidebar

### 6. User Account
- **Profile Management**: Update name, email, phone, bio
- **Password Change**: Secure password update
- **Profile Data**: Persistent user information

### 7. Theme System
- **Dark Mode**: Complete dark theme support
- **Persistent**: Theme preference saved to localStorage
- **Smooth Transition**: Animated theme switching

## Data Models

### Task
```typescript
{
  id: string;
  userId: string;
  title: string;
  description: string;
  categoryId: string;
  priorityId: string;
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string;
  completed: boolean;
  subtasks: Array<{
    id: string;
    title: string;
    completed: boolean;
  }>;
  tags: string[];
  attachments: Array<{
    fileName: string;
    fileUrl: string;
    fileSize: number;
  }>;
  recurrence?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
    endDate?: string;
  };
  createdAt: string;
  updatedAt: string;
}
```

### Category
```typescript
{
  id: string;
  name: string;
  color: string;
  icon?: string;
  userId: string;
  createdAt: string;
}
```

### Priority
```typescript
{
  id: string;
  name: string;
  level: 'low' | 'medium' | 'high';
  color: string;
  userId: string;
  createdAt: string;
}
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks/:id` - Get task by ID
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PUT /api/tasks/:id/complete` - Toggle completion
- `POST /api/tasks/:id/subtasks` - Add subtask
- `PUT /api/tasks/:taskId/subtasks/:subtaskId` - Update subtask
- `DELETE /api/tasks/:taskId/subtasks/:subtaskId` - Delete subtask

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Priorities
- `GET /api/priorities` - Get all priorities
- `POST /api/priorities` - Create priority
- `PUT /api/priorities/:id` - Update priority
- `DELETE /api/priorities/:id` - Delete priority

### Tags
- `GET /api/tags` - Get all tags
- `POST /api/tags` - Create tag
- `PUT /api/tags/:id` - Update tag
- `DELETE /api/tags/:id` - Delete tag

### Notifications
- `GET /api/notifications` - Get all notifications
- `PUT /api/notifications/:id/read` - Mark as read
- `DELETE /api/notifications/:id` - Delete notification
- `DELETE /api/notifications` - Clear all

## Available Scripts

### Frontend
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm run dev` - Start backend with nodemon
- `npm run build` - Compile TypeScript
- `npm start` - Run production server

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

Potential features for future versions:
- Task collaboration and sharing
- Task comments and discussions
- Advanced filtering and sorting
- Export to PDF/CSV
- Email notifications
- Mobile applications (iOS/Android)
- Task templates
- Task dependencies
- Time tracking
- Advanced analytics and reports
- Calendar integrations (Google Calendar, Outlook)

## License

This project is open source and available for educational purposes.

## Author

**Dhanibel Reyes**

A comprehensive full-stack task management solution built with the MERN stack.
