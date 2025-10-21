# Testing Guide - Task Manager Full-Stack Integration

This guide will help you test the newly integrated full-stack Task Manager application.

---

## 🚀 Prerequisites

Before testing, ensure you have completed the setup:

1. **MongoDB is running** (local or MongoDB Atlas)
2. **Backend server is running** on port 5000
3. **Frontend dev server is running** on port 5173

---

## ✅ Step-by-Step Testing

### Step 1: Start MongoDB

#### Local MongoDB:
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongodb

# Windows
# MongoDB should start automatically as a service
# Or run: mongod
```

#### MongoDB Atlas (Cloud):
- Already running, just ensure your connection string is in `backend/.env`

---

### Step 2: Start Backend Server

```bash
cd backend
npm run dev
```

**Expected Output:**
```
Server running in development mode on port 5000
MongoDB Connected: localhost (or your Atlas cluster)
```

If you see these messages, the backend is ready! ✅

**Common Issues:**
- `Port 5000 already in use` → Kill the process or change PORT in .env
- `MongoNetworkError` → MongoDB is not running
- `Error: listen EADDRINUSE` → Another app is using port 5000

---

### Step 3: Start Frontend Server

```bash
# In the project root
npm run dev
```

**Expected Output:**
```
VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Open your browser to http://localhost:5173

---

## 📝 Test Scenarios

### Test 1: User Registration

1. **Navigate** to http://localhost:5173
2. **Click** "Don't have an account? Create one"
3. **Fill in the registration form:**
   - Name: Test User
   - Email: test@example.com
   - Password: password123
   - Confirm Password: password123
4. **Click** "Create Account"

**Expected Result:**
- ✅ Toast notification: "Welcome, Test User! Your account has been created."
- ✅ Redirected to dashboard
- ✅ Empty dashboard (no tasks yet)

**Backend Verification:**
```bash
# In MongoDB, check if user was created
mongosh
> use task-manager
> db.users.find().pretty()
```

You should see your new user in the database.

---

### Test 2: User Login

1. **Logout** (click your name in the header → Logout)
2. **Navigate** to login page
3. **Enter credentials:**
   - Email: test@example.com
   - Password: password123
   - Check "Remember Me" (optional)
4. **Click** "Sign In"

**Expected Result:**
- ✅ Toast notification: "Welcome back, Test User!"
- ✅ Redirected to dashboard
- ✅ User data persists on page refresh

---

### Test 3: Create Category

1. **Navigate** to "Categories" page (sidebar)
2. **Click** "New Category" button
3. **Fill in the form:**
   - Name: Work
   - Color: Pick a color (e.g., blue)
4. **Click** "Create"

**Expected Result:**
- ✅ Toast notification: "Category created successfully"
- ✅ Category appears in the list
- ✅ Data persists on page refresh

---

### Test 4: Create Priority

Default priorities might already exist from the backend. If not:

1. Navigate to priorities (if there's a page, or via API testing)
2. Create: High, Medium, Low priorities

---

### Test 5: Create Task

1. **Navigate** to "Tasks" page
2. **Click** "New Task" button
3. **Fill in the form:**
   - Title: Complete project documentation
   - Description: Write comprehensive docs
   - Category: Work (select from dropdown)
   - Priority: High (select from dropdown)
   - Status: In Progress
   - Due Date: Tomorrow's date
4. **Click** "Create"

**Expected Result:**
- ✅ Toast notification: "Task created successfully"
- ✅ Task appears in the task list
- ✅ Task has correct category color
- ✅ Data persists on page refresh

**Backend Verification:**
```bash
mongosh
> use task-manager
> db.tasks.find().pretty()
```

---

### Test 6: Update Task

1. **Click** on a task to edit it
2. **Change** the title or status
3. **Click** "Save"

**Expected Result:**
- ✅ Toast notification: "Task updated successfully"
- ✅ Changes reflect immediately
- ✅ Data persists on page refresh

---

### Test 7: Delete Task

1. **Click** delete icon on a task
2. **Confirm** deletion (if there's a confirmation modal)

**Expected Result:**
- ✅ Toast notification: "Task deleted successfully"
- ✅ Task removed from list immediately
- ✅ Change persists on page refresh

---

### Test 8: Dashboard Statistics

1. **Navigate** to Dashboard
2. **Verify** the stats cards show correct numbers:
   - Total Tasks
   - Completed Tasks
   - Pending Tasks
   - In Progress Tasks
3. **Check** the charts:
   - Pie chart shows task distribution
   - Stats match actual task counts

**Expected Result:**
- ✅ All statistics are accurate
- ✅ Charts render correctly
- ✅ Data updates when tasks change

---

### Test 9: Notifications

1. **Create a new task**
2. **Navigate** to Notifications page
3. **Check** for notification about task creation

**Expected Result:**
- ✅ Notification appears
- ✅ Can mark as read
- ✅ Can delete notification
- ✅ Unread count badge updates

---

### Test 10: Calendar View

1. **Navigate** to Calendar page
2. **Verify** tasks appear on their due dates
3. **Check** color coding by category

**Expected Result:**
- ✅ Tasks display on correct dates
- ✅ Category colors are visible
- ✅ Can navigate between months

---

### Test 11: User Profile

1. **Click** your name in header
2. **Go to** Account/Profile page
3. **Update** your name or email
4. **Save** changes

**Expected Result:**
- ✅ Toast notification: "Profile updated successfully"
- ✅ Changes reflect in header
- ✅ Data persists on page refresh

---

### Test 12: Authentication Persistence

1. **Create some tasks**
2. **Close the browser** completely
3. **Reopen** and go to http://localhost:5173

**Expected Result:**
- ✅ Still logged in (if "Remember Me" was checked)
- ✅ All tasks are still there
- ✅ Dashboard shows correct stats

---

### Test 13: Token Expiration

1. **In browser DevTools** (F12) → Application → Local Storage
2. **Delete** the `token` item
3. **Try to navigate** to a protected page

**Expected Result:**
- ✅ Redirected to login page
- ✅ Toast notification: "Not authorized" or similar
- ✅ Must log in again

---

### Test 14: Error Handling

1. **Stop the backend server** (Ctrl+C)
2. **Try to create a task** in the frontend

**Expected Result:**
- ✅ Toast notification: "Failed to create task" or connection error
- ✅ App doesn't crash
- ✅ User can still navigate

3. **Restart backend**
4. **Try creating task again**

**Expected Result:**
- ✅ Works normally
- ✅ Data is saved

---

## 🔧 Debugging Tools

### Browser DevTools

#### Network Tab (F12 → Network)
**Check:**
- API requests to `http://localhost:5000/api/*`
- Response status codes (200, 201, 400, 401, etc.)
- Request/response payloads
- Authorization headers

**Example successful task creation:**
```
Request URL: http://localhost:5000/api/tasks
Request Method: POST
Status Code: 201 Created
Request Headers:
  Authorization: Bearer eyJhbGc...
Request Payload:
  {
    "title": "Test task",
    "description": "...",
    ...
  }
Response:
  {
    "success": true,
    "data": { ... }
  }
```

#### Console Tab
**Check for:**
- JavaScript errors (red text)
- Network errors
- API response logs
- Authentication status

#### Application Tab → Local Storage
**Verify:**
- `token` exists (long JWT string)
- `user` exists (JSON object)

---

### Backend Logs

Watch backend terminal for:
- Request logs
- Error messages
- Database connection status
- Socket.io connections

---

### MongoDB Compass (Optional but Recommended)

1. **Download** [MongoDB Compass](https://www.mongodb.com/try/download/compass)
2. **Connect** to `mongodb://localhost:27017`
3. **Browse** database `task-manager`
4. **View collections:**
   - users
   - tasks
   - categories
   - priorities
   - tags
   - notifications

**Visual verification** of data helps debug issues.

---

## ❌ Common Issues & Solutions

### Issue 1: "Cannot connect to backend"
**Symptoms:** All API calls fail, toast shows connection errors

**Solutions:**
1. Check backend is running: `cd backend && npm run dev`
2. Check backend URL in `.env`: `VITE_API_URL=http://localhost:5000/api`
3. Check CORS settings in `backend/src/server.ts`

---

### Issue 2: "401 Unauthorized"
**Symptoms:** Redirected to login, "Not authorized" errors

**Solutions:**
1. Token expired → Log in again
2. Check Authorization header is being sent (Network tab)
3. Verify JWT_SECRET matches in backend `.env`

---

### Issue 3: "Tasks not appearing after creation"
**Symptoms:** Task created but list is empty

**Solutions:**
1. Check browser console for errors
2. Verify task was saved in MongoDB
3. Check if `loadAllData()` is called after login
4. Verify _id to id transformation in API interceptor

---

### Issue 4: "MongoDB connection failed"
**Symptoms:** Backend shows `MongoNetworkError`

**Solutions:**
1. Start MongoDB: `brew services start mongodb-community` (macOS)
2. Check MongoDB is listening on port 27017
3. Verify MONGO_URI in `backend/.env`

---

### Issue 5: "Port already in use"
**Symptoms:** `EADDRINUSE: address already in use :::5000`

**Solutions:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or change port in backend/.env
PORT=5001
```

---

## ✅ Success Checklist

Before moving to next phase, verify:

- [ ] Can register a new user
- [ ] Can login with created user
- [ ] Can create categories
- [ ] Can create priorities (or defaults exist)
- [ ] Can create tasks
- [ ] Can update tasks
- [ ] Can delete tasks
- [ ] Can toggle task completion
- [ ] Dashboard shows correct statistics
- [ ] Calendar displays tasks correctly
- [ ] Notifications appear for task actions
- [ ] Can update user profile
- [ ] Data persists after page refresh
- [ ] Data persists after browser close (with Remember Me)
- [ ] Logout works correctly
- [ ] Token expiration redirects to login
- [ ] Error messages display for failed operations
- [ ] MongoDB contains correct data

---

## 🎯 Next Steps

Once all tests pass:

1. ✅ **Backend integration complete!**
2. 🚧 **Next**: Implement WebSocket real-time updates
3. 🚧 **Next**: Build subtasks UI
4. 🚧 **Next**: Build tags UI
5. 🚧 **Next**: Build recurring tasks UI
6. 🚧 **Next**: Build file attachments UI

---

## 📞 Troubleshooting Help

If you encounter issues:

1. **Check browser console** (F12)
2. **Check backend terminal** logs
3. **Check MongoDB** connection
4. **Verify environment variables** (.env files)
5. **Review** IMPLEMENTATION_STATUS.md
6. **Clear localStorage** and try fresh login
7. **Restart both servers**

---

**Happy Testing!** 🎉

If everything works, you now have a fully functional full-stack task manager with real database persistence!
