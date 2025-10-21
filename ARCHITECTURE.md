# Task Manager - Architecture Overview

## Visual Application Structure

```
┌─────────────────────────────────────────────────────────────────────┐
│                         TASK MANAGER APP                            │
│                    http://localhost:5173                            │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │      main.tsx             │
                    │   (Entry Point)           │
                    └─────────────┬─────────────┘
                                  │
                    ┌─────────────▼─────────────┐
                    │       App.tsx             │
                    │  (BrowserRouter)          │
                    └─────────────┬─────────────┘
                                  │
            ┌────────────────────┴────────────────────┐
            │         Context Providers                │
            │  ┌────────────────────────────────────┐ │
            │  │   ThemeProvider (Dark/Light)       │ │
            │  └────────────┬───────────────────────┘ │
            │               │                          │
            │  ┌────────────▼───────────────────────┐ │
            │  │   AuthProvider (Login/Register)    │ │
            │  └────────────┬───────────────────────┘ │
            │               │                          │
            │  ┌────────────▼───────────────────────┐ │
            │  │   TaskProvider (Tasks/Categories)  │ │
            │  └────────────┬───────────────────────┘ │
            └───────────────┴──────────────────────────┘
                            │
        ┌───────────────────┴───────────────────┐
        │          React Router                  │
        └───────────────────┬───────────────────┘
                            │
        ┌───────────────────┴───────────────────────────────┐
        │                                                    │
   ┌────▼──────┐                                    ┌───────▼──────┐
   │  PUBLIC   │                                    │  PROTECTED   │
   │  ROUTES   │                                    │   ROUTES     │
   └────┬──────┘                                    └───────┬──────┘
        │                                                   │
   ┌────▼────────┐                          ┌──────────────┴──────────────┐
   │  /login     │                          │      MainLayout              │
   │  /register  │                          │  ┌─────────┬──────────────┐ │
   └─────────────┘                          │  │ Sidebar │   Content    │ │
                                            │  │         │    Area      │ │
                                            │  └─────────┴──────────────┘ │
                                            └──────────────┬──────────────┘
                                                           │
                      ┌────────────────────────────────────┴──────────────┐
                      │                    PAGES                           │
                      └────────────────────────────────────┬──────────────┘
                                                           │
     ┌─────────────┬────────────┬────────────┬────────────┼────────────┬─────────────┐
     │             │            │            │            │            │             │
┌────▼───┐  ┌──────▼──┐  ┌─────▼────┐  ┌───▼────┐  ┌────▼────┐  ┌───▼────┐  ┌─────▼─────┐
│Dashboard│  │  Tasks  │  │Categories│  │Calendar│  │Notific- │  │Account │  │  (Future) │
│         │  │         │  │          │  │        │  │ ations  │  │        │  │   Pages   │
└─────────┘  └─────────┘  └──────────┘  └────────┘  └─────────┘  └────────┘  └───────────┘
```

---

## Component Hierarchy

```
App
├── ThemeProvider
│   └── AuthProvider
│       └── TaskProvider
│           └── BrowserRouter
│               ├── Public Routes
│               │   ├── Login
│               │   └── Register
│               │
│               └── Protected Routes
│                   └── MainLayout
│                       ├── Sidebar
│                       │   ├── Navigation Links
│                       │   ├── Theme Toggle
│                       │   ├── User Profile
│                       │   └── Logout Button
│                       │
│                       └── Outlet (Page Content)
│                           ├── Dashboard
│                           │   ├── Header
│                           │   ├── Stat Cards
│                           │   ├── Charts (Recharts)
│                           │   ├── Recent Tasks
│                           │   └── Quick Actions
│                           │
│                           ├── TasksPage
│                           │   ├── Header
│                           │   ├── Search Bar
│                           │   ├── Task List
│                           │   └── Modal (Add/Edit)
│                           │
│                           ├── CategoriesPage
│                           │   ├── Header
│                           │   ├── Category Grid
│                           │   └── Modal (Add/Edit)
│                           │
│                           ├── CalendarPage
│                           │   ├── Header
│                           │   └── Task Timeline
│                           │
│                           ├── NotificationsPage
│                           │   ├── Header
│                           │   └── Notification List
│                           │
│                           └── AccountPage
│                               ├── Header
│                               ├── Profile Form
│                               └── Password Form
```

---

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    USER INTERACTION                         │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                 REACT COMPONENTS                            │
│  (Pages, Forms, Buttons, Modals)                           │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              CONTEXT API (State Management)                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ AuthContext  │  │ ThemeContext │  │ TaskContext  │     │
│  │   - user     │  │   - theme    │  │   - tasks    │     │
│  │   - login    │  │   - toggle   │  │   - add/edit │     │
│  │   - logout   │  │              │  │   - delete   │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
└─────────┼──────────────────┼──────────────────┼─────────────┘
          │                  │                  │
          ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                   SERVICE LAYER                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           storage.ts (localStorage Abstraction)      │  │
│  │  - authStorage    - taskStorage                      │  │
│  │  - themeStorage   - categoryStorage                  │  │
│  │  - priorityStorage - notificationStorage             │  │
│  └──────────────────────────────────────────────────────┘  │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              BROWSER localStorage                           │
│  {                                                          │
│    taskManager_user: { id, name, email, ... },            │
│    taskManager_token: "abc123...",                         │
│    taskManager_tasks: [...],                               │
│    taskManager_categories: [...],                          │
│    taskManager_priorities: [...],                          │
│    taskManager_notifications: [...],                       │
│    taskManager_theme: "light" | "dark"                     │
│  }                                                          │
└─────────────────────────────────────────────────────────────┘
```

---

## Authentication Flow

```
┌──────────────┐
│  User Opens  │
│     App      │
└──────┬───────┘
       │
       ▼
┌──────────────────┐      ┌─────────────────┐
│ Check localStorage├─────►│ Token Found?    │
└──────────────────┘      └────────┬────────┘
                                   │
                   ┌───────────────┴───────────────┐
                   │ YES                           │ NO
                   ▼                               ▼
         ┌──────────────────┐           ┌──────────────────┐
         │ Auto Login       │           │ Show Login Page  │
         │ Redirect to      │           └──────────────────┘
         │ Dashboard        │                     │
         └──────────────────┘                     │
                                                  ▼
                                        ┌──────────────────┐
                                        │ User Enters      │
                                        │ Credentials      │
                                        └────────┬─────────┘
                                                 │
                                                 ▼
                                        ┌──────────────────┐
                                        │ Validate         │
                                        └────────┬─────────┘
                                                 │
                              ┌──────────────────┴──────────────────┐
                              │ Valid                               │ Invalid
                              ▼                                     ▼
                    ┌──────────────────┐                  ┌──────────────────┐
                    │ Generate Token   │                  │ Show Error       │
                    │ Save to Context  │                  └──────────────────┘
                    │ Save to Storage  │
                    │ (if remember me) │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Redirect to      │
                    │ Dashboard        │
                    └──────────────────┘
```

---

## Task CRUD Operations Flow

### CREATE Task
```
User Clicks "Add Task"
         ↓
Modal Opens with Form
         ↓
User Fills Form & Submits
         ↓
TasksPage calls addTask()
         ↓
TaskContext.addTask()
         ↓
Generate unique ID
         ↓
taskStorage.addTask(newTask)
         ↓
Save to localStorage
         ↓
Update Context State (setTasks)
         ↓
Create Notification
         ↓
UI Re-renders with New Task
         ↓
Modal Closes
```

### READ Tasks
```
Component Mounts
         ↓
useTasks() Hook Called
         ↓
TaskContext Provides Data
         ↓
tasks Array Available
         ↓
Component Renders List
         ↓
User Can Search/Filter
         ↓
getFilteredTasks() Called
         ↓
Filtered Results Displayed
```

### UPDATE Task
```
User Clicks Edit Icon
         ↓
Modal Opens with Pre-filled Data
         ↓
User Modifies & Submits
         ↓
TasksPage calls updateTask(id, updates)
         ↓
TaskContext.updateTask()
         ↓
taskStorage.updateTask()
         ↓
Update in localStorage
         ↓
Update Context State
         ↓
UI Re-renders
         ↓
Modal Closes
```

### DELETE Task
```
User Clicks Delete Icon
         ↓
TasksPage calls deleteTask(id)
         ↓
TaskContext.deleteTask()
         ↓
taskStorage.deleteTask()
         ↓
Remove from localStorage
         ↓
Update Context State
         ↓
Create Notification
         ↓
UI Re-renders (Task Removed)
```

---

## State Management Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     GLOBAL STATE                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌────────────────────────────────────────────────────┐   │
│  │           AuthContext (Authentication)             │   │
│  │                                                     │   │
│  │  State:                         Actions:           │   │
│  │  - user: AuthUser | null        - login()         │   │
│  │  - isAuthenticated: boolean     - register()      │   │
│  │                                  - logout()        │   │
│  │                                  - updateProfile() │   │
│  └────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌────────────────────────────────────────────────────┐   │
│  │           ThemeContext (UI Theme)                  │   │
│  │                                                     │   │
│  │  State:                         Actions:           │   │
│  │  - theme: 'light' | 'dark'      - toggleTheme()   │   │
│  └────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌────────────────────────────────────────────────────┐   │
│  │           TaskContext (Business Logic)             │   │
│  │                                                     │   │
│  │  State:                         Actions:           │   │
│  │  - tasks: Task[]                - addTask()        │   │
│  │  - categories: Category[]       - updateTask()     │   │
│  │  - priorities: Priority[]       - deleteTask()     │   │
│  │  - notifications: Notif[]       - toggleComplete() │   │
│  │  - statistics: Stats            - addCategory()    │   │
│  │                                  - updateCategory() │   │
│  │                                  - deleteCategory() │   │
│  │                                  - addPriority()    │   │
│  │                                  - updatePriority() │   │
│  │                                  - deletePriority() │   │
│  │                                  - markAsRead()     │   │
│  │                                  - deleteNotif()    │   │
│  │                                  - clearAll()       │   │
│  │                                                     │   │
│  │  Computed:                                         │   │
│  │  - statistics (useMemo)                            │   │
│  │  - getTaskById()                                   │   │
│  │  - getCategoryById()                               │   │
│  │  - getPriorityById()                               │   │
│  │  - getFilteredTasks()                              │   │
│  └────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Routing Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    React Router v6                          │
└─────────────────────────────────────────────────────────────┘
                           │
        ┌──────────────────┴──────────────────┐
        │                                     │
   ┌────▼─────┐                         ┌────▼─────┐
   │  Public  │                         │Protected │
   │  Routes  │                         │  Routes  │
   └────┬─────┘                         └────┬─────┘
        │                                    │
        │                                    │
        │                               ┌────▼──────────┐
   ┌────▼──────┐                        │ MainLayout    │
   │  /login   │                        │ (with Sidebar)│
   │           │                        └────┬──────────┘
   │ Login.tsx │                             │
   └───────────┘                             │
                                   ┌─────────┴─────────┐
   ┌────────────┐                  │                   │
   │ /register  │            ┌─────▼─────┐      ┌──────▼──────┐
   │            │            │     /     │      │  /dashboard │
   │Register.tsx│            │ Redirect  │      │             │
   └────────────┘            │    to     │      │Dashboard.tsx│
                             │/dashboard │      └─────────────┘
                             └───────────┘
                                              ┌──────▼──────┐
                                              │   /tasks    │
                                              │             │
                                              │TasksPage.tsx│
                                              └─────────────┘

                                              ┌──────▼──────┐
                                              │/categories  │
                                              │             │
                                              │Categories   │
                                              │  Page.tsx   │
                                              └─────────────┘

                                              ┌──────▼──────┐
                                              │ /calendar   │
                                              │             │
                                              │Calendar     │
                                              │  Page.tsx   │
                                              └─────────────┘

                                              ┌──────▼──────┐
                                              │/notifications│
                                              │             │
                                              │Notifications│
                                              │  Page.tsx   │
                                              └─────────────┘

                                              ┌──────▼──────┐
                                              │  /account   │
                                              │             │
                                              │AccountPage  │
                                              │    .tsx     │
                                              └─────────────┘
```

---

## Technology Stack Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                       │
│  - React Components (JSX/TSX)                              │
│  - Tailwind CSS (Styling)                                  │
│  - Lucide React (Icons)                                    │
│  - Recharts (Data Visualization)                           │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                     BUSINESS LOGIC LAYER                    │
│  - React Context API (State Management)                    │
│  - Custom Hooks (useAuth, useTheme, useTasks)             │
│  - Utility Functions (helpers.ts)                          │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                      SERVICE LAYER                          │
│  - Storage Service (storage.ts)                            │
│  - localStorage Abstraction                                │
│  - Mock Data Initialization                                │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    DATA PERSISTENCE LAYER                   │
│  - Browser localStorage API                                │
│  - JSON serialization/deserialization                      │
└─────────────────────────────────────────────────────────────┘
```

---

## Build & Development Pipeline

```
┌──────────────┐
│  Source Code │
│  (src/*.tsx) │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ TypeScript   │
│  Compiler    │
└──────┬───────┘
       │
       ▼
┌──────────────┐      ┌──────────────┐
│    Vite      │◄─────┤ Hot Module   │
│  Dev Server  │      │ Replacement  │
└──────┬───────┘      └──────────────┘
       │
       ▼
┌──────────────┐
│   Browser    │
│ localhost:   │
│    5173      │
└──────────────┘

Production Build:
┌──────────────┐
│ npm run build│
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  TypeScript  │
│    Check     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│     Vite     │
│ Optimization │
│  - Minify    │
│  - Bundle    │
│  - Tree Shake│
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  /dist/      │
│  Folder      │
│  (Deploy)    │
└──────────────┘
```

---

## Performance Optimization Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                    OPTIMIZATION LAYERS                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. React Level                                            │
│     - useMemo for expensive calculations                   │
│     - useCallback for function props                       │
│     - Virtual scrolling for long lists                     │
│                                                             │
│  2. Code Splitting                                         │
│     - Lazy loading routes                                  │
│     - Dynamic imports                                      │
│                                                             │
│  3. Bundle Optimization                                    │
│     - Tree shaking (Vite)                                  │
│     - Minification                                         │
│     - Code splitting                                       │
│                                                             │
│  4. Asset Optimization                                     │
│     - Image compression                                    │
│     - Font optimization                                    │
│     - CSS purging (Tailwind)                              │
│                                                             │
│  5. Caching Strategy                                       │
│     - localStorage for data                                │
│     - Service Worker (future)                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

**This architecture supports:**
- ✅ Scalability
- ✅ Maintainability
- ✅ Type Safety
- ✅ Performance
- ✅ Developer Experience

**Last Updated:** October 2025
