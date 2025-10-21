# Task Manager - Complete Setup Guide

This guide will help you set up and run the enhanced Task Manager application with full-stack features.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (cloud)
- **npm** or **yarn** - Package manager (comes with Node.js)
- **Git** (optional) - For version control

---

## 🚀 Quick Start

### 1. Install MongoDB

#### Option A: Local MongoDB
```bash
# macOS (using Homebrew)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Ubuntu/Debian
sudo apt-get install mongodb
sudo systemctl start mongodb

# Windows
# Download installer from https://www.mongodb.com/try/download/community
# Follow the installation wizard
```

#### Option B: MongoDB Atlas (Cloud - Recommended)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Update `backend/.env` with your connection string

---

### 2. Backend Setup

```bash
# Navigate to backend directory
cd task-manager/backend

# Install dependencies
npm install

# Configure environment variables
# Copy .env.example to .env
cp .env.example .env

# Edit .env file with your settings
# (If using MongoDB Atlas, update MONGO_URI)

# Start the backend server
npm run dev
```

The backend server will start on `http://localhost:5000`

You should see:
```
Server running in development mode on port 5000
MongoDB Connected: localhost
```

---

### 3. Frontend Setup

```bash
# Navigate to project root
cd task-manager

# Install dependencies
npm install

# Configure environment variables
# Copy .env.example to .env
cp .env.example .env

# Start the frontend development server
npm run dev
```

The frontend will start on `http://localhost:5173`

---

## 🔧 Configuration

### Backend Environment Variables (`backend/.env`)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database (Local)
MONGO_URI=mongodb://localhost:27017/task-manager

# Database (MongoDB Atlas - Example)
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/task-manager

# JWT Secret (Change this in production!)
JWT_SECRET=task_manager_secret_key_2025_dev
JWT_EXPIRE=7d

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# CORS
CLIENT_URL=http://localhost:5173
```

### Frontend Environment Variables (`.env`)

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

---

## 📁 Project Structure

```
task-manager/
├── backend/                    # Backend API
│   ├── src/
│   │   ├── config/            # Database configuration
│   │   ├── controllers/       # Route controllers
│   │   ├── middleware/        # Auth & upload middleware
│   │   ├── models/            # Mongoose models
│   │   ├── routes/            # API routes
│   │   ├── utils/             # Utility functions
│   │   └── server.ts          # Main server file
│   ├── uploads/               # File uploads (auto-created)
│   ├── .env                   # Environment variables
│   ├── .env.example          # Environment template
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── src/                       # Frontend source
│   ├── components/           # React components
│   ├── contexts/             # React contexts
│   ├── pages/                # Page components
│   ├── services/             # API & Socket services
│   │   ├── api.ts           # REST API client
│   │   └── socket.ts        # WebSocket client
│   ├── types/                # TypeScript types
│   ├── utils/                # Utility functions
│   └── App.tsx
│
├── .env                      # Frontend environment variables
├── .env.example             # Environment template
├── package.json
├── vite.config.ts
├── IMPLEMENTATION_STATUS.md  # Development progress
└── SETUP_GUIDE.md           # This file
```

---

## 🧪 Testing the Setup

### 1. Test Backend API

Open a browser or use curl/Postman:

```bash
# Health check
curl http://localhost:5000/api/health

# Expected response:
# {"success":true,"message":"Server is running"}
```

### 2. Test Frontend

Open browser: `http://localhost:5173`

You should see the Task Manager login page.

### 3. Create a Test Account

1. Click "Register"
2. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
3. Click "Create Account"

**Note:** Currently the frontend still uses localStorage. Backend integration is in progress.

---

## 🔌 API Testing with Postman

### Register a User

```http
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login

```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Save the `token` from the response!

### Get Tasks (Protected Route)

```http
GET http://localhost:5000/api/tasks
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## 🆕 New Features Available

### 1. Subtasks
Each task can now have multiple subtasks with completion tracking.

**API Example:**
```http
POST http://localhost:5000/api/tasks/:taskId/subtasks
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "title": "Subtask title"
}
```

### 2. Tags
Create and assign multiple tags to tasks for better organization.

**API Example:**
```http
POST http://localhost:5000/api/tags
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "name": "Urgent",
  "color": "#FF0000"
}
```

### 3. Recurring Tasks
Set tasks to repeat on a schedule (daily, weekly, monthly, yearly).

**Task Creation with Recurrence:**
```json
{
  "title": "Weekly Team Meeting",
  "description": "Discuss progress",
  "categoryId": "...",
  "priorityId": "...",
  "dueDate": "2025-10-21",
  "status": "pending",
  "recurrence": {
    "frequency": "weekly",
    "interval": 1,
    "daysOfWeek": [1, 3, 5],
    "endDate": "2025-12-31"
  }
}
```

### 4. File Attachments
Upload and attach files to tasks.

**Upload Example:**
```http
POST http://localhost:5000/api/upload
Authorization: Bearer YOUR_TOKEN
Content-Type: multipart/form-data

file: [select file]
```

### 5. Real-time Updates
Tasks automatically sync across all connected clients via WebSocket.

---

## 🐛 Troubleshooting

### MongoDB Connection Error

**Error:** `MongoNetworkError: connect ECONNREFUSED`

**Solution:**
```bash
# Check if MongoDB is running
# macOS
brew services list

# Ubuntu/Linux
sudo systemctl status mongodb

# Start MongoDB if not running
# macOS
brew services start mongodb-community

# Ubuntu/Linux
sudo systemctl start mongodb
```

### Port Already in Use

**Error:** `Port 5000 is already in use`

**Solution:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or change PORT in backend/.env
PORT=5001
```

### CORS Errors

**Error:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution:**
Check that `CLIENT_URL` in `backend/.env` matches your frontend URL:
```env
CLIENT_URL=http://localhost:5173
```

### Cannot Find Module Errors

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Development Workflow

### Backend Development

```bash
cd backend
npm run dev
```

The server will automatically restart on file changes (using ts-node-dev).

### Frontend Development

```bash
npm run dev
```

Vite will provide hot module replacement (HMR) for instant updates.

### Building for Production

#### Backend:
```bash
cd backend
npm run build    # Compiles TypeScript to dist/
npm start        # Runs production server
```

#### Frontend:
```bash
npm run build    # Creates optimized build in dist/
npm run preview  # Preview production build locally
```

---

## 🔐 Security Notes

1. **Change JWT Secret:** Always use a strong, unique JWT_SECRET in production
2. **Environment Variables:** Never commit .env files to version control
3. **MongoDB:** Use strong passwords and enable authentication
4. **CORS:** Configure CLIENT_URL properly for production
5. **File Uploads:** Validate file types and sizes on both client and server

---

## 📦 Deployment

### Backend Deployment (Example: Heroku)

```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create task-manager-backend

# Set environment variables
heroku config:set JWT_SECRET=your_production_secret
heroku config:set MONGO_URI=your_mongodb_atlas_uri

# Deploy
git push heroku main
```

### Frontend Deployment (Example: Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# VITE_API_URL=https://your-backend.herokuapp.com/api
# VITE_SOCKET_URL=https://your-backend.herokuapp.com
```

---

## 🤝 Contributing

This is a personal project, but feel free to:
- Report bugs
- Suggest features
- Submit pull requests

---

## 📄 License

MIT License - Feel free to use this project for learning or personal use.

---

## 🎯 Next Steps

Check `IMPLEMENTATION_STATUS.md` for the current development progress and upcoming features.

The next major milestone is integrating the frontend contexts with the backend API to replace the localStorage implementation.

---

## 💡 Tips

1. Use **MongoDB Compass** for a GUI to view your database
2. Use **Postman** or **Thunder Client** (VS Code extension) for API testing
3. Check browser console and Network tab for debugging
4. Monitor backend logs for server errors
5. Use **React DevTools** for component debugging

---

## 📞 Support

If you encounter issues:
1. Check this guide carefully
2. Review `IMPLEMENTATION_STATUS.md`
3. Check backend logs (terminal running `npm run dev`)
4. Check browser console for frontend errors
5. Verify environment variables are correct

Happy coding! 🚀
