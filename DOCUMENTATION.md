# Task Manager - Complete Documentation

## Table of Contents
1. [Quick Start](#quick-start)
2. [Vital Commands](#vital-commands)
3. [Application Architecture](#application-architecture)
4. [Features Documentation](#features-documentation)
5. [Component Reference](#component-reference)
6. [API Reference](#api-reference)
7. [Data Flow](#data-flow)
8. [Customization Guide](#customization-guide)
9. [Troubleshooting](#troubleshooting)

---

## Quick Start

### Prerequisites
- Node.js 16.x or higher
- npm 7.x or higher
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation Steps

```bash
# Navigate to project directory
cd task-manager

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

### First Time Setup
1. Application will auto-initialize with mock data
2. Use demo credentials to login:
   - **Email:** john.doe@example.com
   - **Password:** Password123

---

## Vital Commands

### 🚀 Essential Commands

```bash
# Start Development Server
npm run dev
# Starts Vite dev server at http://localhost:5173
# Hot Module Replacement (HMR) enabled
# Press 'h' for help, 'q' to quit

# Build for Production
npm run build
# Creates optimized production build in /dist folder
# Includes minification, tree-shaking, and optimization

# Preview Production Build
npm run preview
# Serves production build locally for testing
# Use this to test production build before deployment

# Run Linter
npm run lint
# Checks code quality using ESLint
# Identifies potential issues and code style problems
```

### 📦 Dependency Management

```bash
# Install All Dependencies
npm install

# Install Specific Package
npm install package-name

# Update Dependencies
npm update

# Check for Outdated Packages
npm outdated

# Audit for Security Issues
npm audit

# Fix Security Issues
npm audit fix
```

### 🧹 Clean Up Commands

```bash
# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite

# Remove build artifacts
rm -rf dist
```

### 🔧 Development Tools

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# List installed packages
npm list --depth=0

# Check package info
npm info package-name
```

---

## Application Architecture

### Technology Stack

```
┌─────────────────────────────────────────┐
│         React 18 + TypeScript           │
├─────────────────────────────────────────┤
│  State Management: Context API          │
│  - AuthContext (Authentication)         │
│  - ThemeContext (Dark/Light Mode)       │
│  - TaskContext (Tasks, Categories, etc) │
├─────────────────────────────────────────┤
│  Routing: React Router DOM v6           │
│  - Protected Routes                     │
│  - Public Routes                        │
│  - Nested Routes                        │
├─────────────────────────────────────────┤
│  Styling: Tailwind CSS                  │
│  - Custom Coral Theme                   │
│  - Dark Mode Support                    │
│  - Responsive Design                    │
├─────────────────────────────────────────┤
│  Data Layer: localStorage               │
│  - Tasks, Categories, Priorities        │
│  - User Data, Notifications             │
│  - Theme Preferences                    │
└─────────────────────────────────────────┘
```

### Folder Structure

```
task-manager/
├── public/                    # Static assets
├── src/
│   ├── components/
│   │   ├── common/           # Reusable UI components
│   │   │   ├── Button.tsx    # Button component with variants
│   │   │   └── Modal.tsx     # Modal/Dialog component
│   │   └── layout/           # Layout components
│   │       ├── Header.tsx    # Page header
│   │       ├── Sidebar.tsx   # Navigation sidebar
│   │       └── MainLayout.tsx # Main app layout wrapper
│   │
│   ├── contexts/             # React Context providers
│   │   ├── AuthContext.tsx   # Authentication state & logic
│   │   ├── ThemeContext.tsx  # Theme (dark/light) management
│   │   └── TaskContext.tsx   # Tasks, categories, priorities
│   │
│   ├── pages/                # Page components (routes)
│   │   ├── auth/
│   │   │   ├── Login.tsx     # Login page
│   │   │   └── Register.tsx  # Registration page
│   │   ├── dashboard/
│   │   │   └── Dashboard.tsx # Main dashboard with stats
│   │   ├── tasks/
│   │   │   └── TasksPage.tsx # Task management page
│   │   ├── categories/
│   │   │   └── CategoriesPage.tsx # Category management
│   │   ├── calendar/
│   │   │   └── CalendarPage.tsx # Calendar view
│   │   ├── notifications/
│   │   │   └── NotificationsPage.tsx # Notifications
│   │   └── account/
│   │       └── AccountPage.tsx # User account settings
│   │
│   ├── services/             # Service layer
│   │   └── storage.ts        # localStorage abstraction
│   │
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts          # All TypeScript interfaces
│   │
│   ├── utils/                # Utility functions
│   │   ├── helpers.ts        # Helper functions
│   │   └── mockData.ts       # Mock data initialization
│   │
│   ├── App.tsx               # Main App component with routing
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles + Tailwind
│
├── tailwind.config.js        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite build configuration
├── package.json              # Dependencies and scripts
└── README.md                 # Project overview
```

---

## Features Documentation

### 1. Authentication System

**Location:** `src/pages/auth/`

#### Login Process
1. User enters email and password
2. System validates credentials against localStorage
3. On success, creates auth token and redirects to dashboard
4. "Remember me" option persists session

**Demo Credentials:**
- Email: `john.doe@example.com`
- Password: `Password123`

#### Registration Process
1. User fills form: name, email, password, confirm password
2. Validation checks:
   - Valid email format
   - Password strength (8+ chars, uppercase, lowercase, number)
   - Passwords match
3. Creates new user account in localStorage
4. Auto-login after registration

**Code Example:**
```typescript
// Login
const { login } = useAuth();
await login(email, password, rememberMe);

// Register
const { register } = useAuth();
await register({ name, email, password, confirmPassword });
```

---

### 2. Dashboard

**Location:** `src/pages/dashboard/Dashboard.tsx`

#### Components
- **Statistics Cards**: Display task counts and metrics
- **Pie Charts**: Visual representation using Recharts
- **Recent Tasks**: Last 5 updated tasks
- **Quick Actions**: Shortcuts to common operations
- **Completion Rate**: Progress indicator

#### Key Metrics
- Total Tasks
- Completed Tasks (with completion rate %)
- In Progress Tasks
- Pending Tasks

**Data Flow:**
```
TaskContext → useTasks hook → Dashboard component
                ↓
        statistics object
                ↓
    StatCard components & Charts
```

---

### 3. Task Management

**Location:** `src/pages/tasks/TasksPage.tsx`

#### Task Properties
```typescript
interface Task {
  id: string;
  userId: string;
  title: string;              // Required
  description: string;
  categoryId: string;         // Required
  priorityId: string;         // Required
  status: TaskStatus;         // pending | in-progress | completed
  dueDate: string;            // ISO date string
  completed: boolean;
  image?: string;             // Optional
  createdAt: string;
  updatedAt: string;
}
```

#### Operations

**Create Task:**
```typescript
const { addTask } = useTasks();
addTask({
  title: "New Task",
  description: "Task description",
  categoryId: "cat-1",
  priorityId: "pri-1",
  status: "pending",
  dueDate: "2025-01-01"
});
```

**Update Task:**
```typescript
const { updateTask } = useTasks();
updateTask(taskId, { title: "Updated Title" });
```

**Delete Task:**
```typescript
const { deleteTask } = useTasks();
deleteTask(taskId);
```

**Toggle Completion:**
```typescript
const { toggleTaskComplete } = useTasks();
toggleTaskComplete(taskId);
```

#### Search & Filter
- **Search**: Real-time search by title or description
- **Filters**: By status, category, priority, date range

---

### 4. Categories

**Location:** `src/pages/categories/CategoriesPage.tsx`

#### Category Properties
```typescript
interface Category {
  id: string;
  name: string;
  color: string;      // Hex color code
  icon?: string;
  userId: string;
  createdAt: string;
}
```

#### Default Categories
- Work (Blue: #3B82F6)
- Personal (Green: #10B981)
- Shopping (Orange: #F59E0B)
- Health (Red: #EF4444)
- Learning (Purple: #8B5CF6)

#### Operations
```typescript
const { addCategory, updateCategory, deleteCategory } = useTasks();

// Create category
addCategory({ name: "Fitness", color: "#10B981" });

// Update category
updateCategory(categoryId, { name: "Work Projects" });

// Delete category
deleteCategory(categoryId);
```

---

### 5. Priorities

#### Priority Levels
```typescript
type PriorityLevel = 'low' | 'medium' | 'high';

interface Priority {
  id: string;
  name: string;
  level: PriorityLevel;
  color: string;
  userId: string;
  createdAt: string;
}
```

#### Default Priorities
- **High**: Red (#EF4444)
- **Medium**: Orange (#F59E0B)
- **Low**: Green (#10B981)

---

### 6. Calendar View

**Location:** `src/pages/calendar/CalendarPage.tsx`

#### Features
- Tasks grouped by due date
- Chronological ordering
- Color-coded by category
- Completed tasks shown with strikethrough
- Displays next 10 upcoming dates

---

### 7. Notifications

**Location:** `src/pages/notifications/NotificationsPage.tsx`

#### Notification Types
```typescript
type NotificationType = 'task-due' | 'task-completed' | 'task-assigned' | 'system';
```

#### Features
- Real-time notification creation
- Read/Unread status
- Badge counter in sidebar
- Delete individual or all notifications
- Auto-generated on task actions

#### Trigger Events
- Task created → System notification
- Task completed → Completion notification
- Task deleted → Deletion notification

---

### 8. User Account

**Location:** `src/pages/account/AccountPage.tsx`

#### Profile Management
- Update name, email, phone, bio
- All fields editable
- Changes persist to localStorage

#### Password Change
- Current password verification
- New password validation
- Confirm password matching

---

### 9. Theme System

**Location:** `src/contexts/ThemeContext.tsx`

#### Features
- Light and Dark modes
- Persistent preference (localStorage)
- Smooth transitions
- Toggle button in sidebar
- Applied via Tailwind's `dark:` prefix

**Usage:**
```typescript
const { theme, toggleTheme } = useTheme();

// Current theme: 'light' | 'dark'
console.log(theme);

// Toggle theme
toggleTheme();
```

---

## Component Reference

### Common Components

#### Button Component
**Location:** `src/components/common/Button.tsx`

**Props:**
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  // ...extends HTMLButtonElement props
}
```

**Usage:**
```tsx
<Button variant="primary" size="md" icon={<Plus />}>
  Add Task
</Button>

<Button variant="secondary" loading={isLoading}>
  Save
</Button>
```

#### Modal Component
**Location:** `src/components/common/Modal.tsx`

**Props:**
```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}
```

**Usage:**
```tsx
<Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Task">
  <form>
    {/* Form content */}
  </form>
</Modal>
```

### Layout Components

#### Sidebar
**Location:** `src/components/layout/Sidebar.tsx`

**Features:**
- Navigation links with active state
- Notification badge
- Theme toggle
- User profile display
- Logout button

#### Header
**Location:** `src/components/layout/Header.tsx`

**Props:**
```typescript
interface HeaderProps {
  title: string;
  subtitle?: string;
}
```

#### MainLayout
**Location:** `src/components/layout/MainLayout.tsx`

**Purpose:** Wrapper layout with sidebar and content area

---

## API Reference

### Context Hooks

#### useAuth()
**Location:** `src/contexts/AuthContext.tsx`

```typescript
const {
  user,              // Current user object (without password)
  isAuthenticated,   // Boolean authentication status
  login,             // Login function
  register,          // Register function
  logout,            // Logout function
  updateProfile      // Update user profile
} = useAuth();
```

**Methods:**
```typescript
// Login
login(email: string, password: string, rememberMe: boolean): Promise<boolean>

// Register
register(data: RegisterFormData): Promise<boolean>

// Logout
logout(): void

// Update profile
updateProfile(data: Partial<AuthUser>): void
```

#### useTheme()
**Location:** `src/contexts/ThemeContext.tsx`

```typescript
const {
  theme,        // Current theme: 'light' | 'dark'
  toggleTheme   // Toggle theme function
} = useTheme();
```

#### useTasks()
**Location:** `src/contexts/TaskContext.tsx`

```typescript
const {
  // Data
  tasks,
  categories,
  priorities,
  notifications,
  statistics,

  // Task operations
  addTask,
  updateTask,
  deleteTask,
  toggleTaskComplete,

  // Category operations
  addCategory,
  updateCategory,
  deleteCategory,

  // Priority operations
  addPriority,
  updatePriority,
  deletePriority,

  // Notification operations
  markNotificationAsRead,
  deleteNotification,
  clearAllNotifications,

  // Utility functions
  getTaskById,
  getCategoryById,
  getPriorityById,
  getFilteredTasks
} = useTasks();
```

---

### Storage Service

**Location:** `src/services/storage.ts`

#### Generic Storage Operations
```typescript
// Get item
const data = storage.get<Type>('key');

// Set item
storage.set('key', data);

// Remove item
storage.remove('key');

// Clear all
storage.clear();
```

#### Specific Storage Operations
```typescript
// Auth
authStorage.getUser()
authStorage.setUser(user)
authStorage.getToken()
authStorage.setToken(token)
authStorage.clearAuth()

// Tasks
taskStorage.getTasks()
taskStorage.setTasks(tasks)
taskStorage.addTask(task)
taskStorage.updateTask(id, updates)
taskStorage.deleteTask(id)

// Categories
categoryStorage.getCategories()
categoryStorage.addCategory(category)
// ... similar methods

// Priorities
priorityStorage.getPriorities()
// ... similar methods

// Notifications
notificationStorage.getNotifications()
notificationStorage.markAsRead(id)
// ... similar methods

// Theme
themeStorage.getTheme()
themeStorage.setTheme(theme)
```

---

### Utility Functions

**Location:** `src/utils/helpers.ts`

```typescript
// ID Generation
generateId(): string

// Date Formatting
formatDate(date: string | Date, format?: string): string
formatDateTime(date: string | Date): string
getRelativeDate(date: string | Date): string  // "Today", "Tomorrow", etc.

// Color Helpers
getStatusColor(status: string): string
getPriorityColor(level: string): string

// Validation
isValidEmail(email: string): boolean
isStrongPassword(password: string): boolean

// Calculations
calculateCompletionRate(completed: number, total: number): number

// String Utilities
truncateText(text: string, maxLength: number): string
getInitials(name: string): string

// Array Utilities
sortTasks(tasks: Task[], sortBy: string): Task[]

// File Utilities
fileToBase64(file: File): Promise<string>

// Debounce
debounce(func: Function, wait: number): Function
```

---

## Data Flow

### Task Creation Flow
```
User Input (Form)
    ↓
TasksPage Component
    ↓
addTask() from useTasks()
    ↓
TaskContext
    ↓
taskStorage.addTask()
    ↓
localStorage
    ↓
State Update (setTasks)
    ↓
UI Re-render
    ↓
Notification Created
```

### Authentication Flow
```
Login Form
    ↓
login() from useAuth()
    ↓
Validate Credentials
    ↓
Generate Token
    ↓
Save to localStorage (if remember me)
    ↓
Update Context State
    ↓
Redirect to Dashboard
    ↓
Protected Routes Accessible
```

### Theme Toggle Flow
```
Toggle Button Click
    ↓
toggleTheme() from useTheme()
    ↓
Update Context State
    ↓
Save to localStorage
    ↓
Apply/Remove 'dark' class to <html>
    ↓
CSS Variables Update
    ↓
UI Re-render with New Theme
```

---

## Customization Guide

### Changing Theme Colors

**Edit:** `tailwind.config.js`

```javascript
theme: {
  extend: {
    colors: {
      coral: {
        50: '#fff5f5',
        100: '#ffe3e3',
        // ... change these values
        500: '#FF6B6B',  // Main color
        // ...
      },
    },
  },
}
```

### Adding New Categories

```typescript
const { addCategory } = useTasks();

addCategory({
  name: "New Category",
  color: "#8B5CF6",  // Custom color
  icon: "star"       // Optional icon reference
});
```

### Customizing Mock Data

**Edit:** `src/utils/mockData.ts`

```typescript
// Add more tasks
export const mockTasks: Task[] = [
  // ... existing tasks
  {
    id: 'task-new',
    userId: 'user-1',
    title: 'Your Custom Task',
    // ... other properties
  }
];
```

### Adding Custom Routes

**Edit:** `src/App.tsx`

```tsx
// 1. Create new page component
// 2. Import it
import NewPage from './pages/new/NewPage';

// 3. Add route
<Route path="new-page" element={<NewPage />} />

// 4. Add to sidebar navigation in Sidebar.tsx
```

---

## Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Error: Port 5173 is already in use

# Solution 1: Kill the process
lsof -ti:5173 | xargs kill -9

# Solution 2: Use different port
npm run dev -- --port 3000
```

#### 2. Module Not Found
```bash
# Error: Cannot find module 'X'

# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### 3. TypeScript Errors
```bash
# Error: Type errors

# Solution 1: Check tsconfig.json
# Solution 2: Restart TypeScript server in IDE
# Solution 3: Clear cache
rm -rf node_modules/.vite
npm run dev
```

#### 4. Dark Mode Not Working
```javascript
// Check: tailwind.config.js must have
darkMode: 'class',

// Check: index.css must have
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### 5. Data Not Persisting
```javascript
// Check: localStorage is enabled in browser
// Check: Not in private/incognito mode
// Clear storage and reload:
localStorage.clear();
location.reload();
```

#### 6. Build Errors
```bash
# Error during build

# Solution: Check for console.log statements
# Solution: Fix TypeScript errors
# Solution: Check import paths are correct

npm run build 2>&1 | grep "error"
```

---

## Performance Tips

### 1. Optimize Bundle Size
```bash
# Analyze bundle
npm run build
npx vite-bundle-visualizer

# Use lazy loading for routes
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
```

### 2. localStorage Best Practices
- Don't store large images (use base64 carefully)
- Limit localStorage to ~5MB
- Use compression for large datasets
- Clear old data periodically

### 3. React Performance
- Use `useMemo` for expensive calculations
- Use `useCallback` for function props
- Implement virtual scrolling for long lists
- Lazy load heavy components

---

## Deployment

### Build for Production
```bash
# Create production build
npm run build

# Output directory: /dist
# Contains: optimized HTML, CSS, JS, assets

# Test production build locally
npm run preview
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Deploy to Netlify
```bash
# Build command: npm run build
# Publish directory: dist

# Or use Netlify CLI
npm i -g netlify-cli
netlify deploy --prod
```

### Environment Variables
Create `.env` file for environment-specific configs:
```bash
VITE_API_URL=https://api.example.com
VITE_APP_NAME=Task Manager
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## Additional Resources

### Documentation Links
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Router](https://reactrouter.com/)

### Recommended Extensions (VS Code)
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Hero
- ES7+ React/Redux/React-Native snippets

---

## Version History

### v1.0.0 (Current)
- Initial release
- Complete task management system
- Authentication
- Dark mode
- Responsive design
- localStorage persistence

---

**Last Updated:** October 2025
**Maintained By:** Task Manager Team

For questions or issues, please refer to the troubleshooting section or create an issue in the project repository.
