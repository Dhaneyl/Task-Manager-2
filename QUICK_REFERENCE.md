# Task Manager - Quick Reference Guide

## 🚀 Essential Commands (Must Know)

### Development
```bash
# Start the application (MOST IMPORTANT)
npm run dev
# → Opens at http://localhost:5173
# → Hot reload enabled
# → Press Ctrl+C to stop

# Install dependencies (First time setup)
npm install
```

### Production
```bash
# Build for production
npm run build
# → Creates /dist folder with optimized files

# Preview production build
npm run preview
# → Test the production build locally
```

### Code Quality
```bash
# Run linter
npm run lint
# → Check for code issues
```

---

## 📋 Demo Credentials

```
Email: john.doe@example.com
Password: Password123
```

---

## 🎯 Quick Feature Access

### After Login, Navigate To:

| Feature | URL | Shortcut |
|---------|-----|----------|
| Dashboard | `/dashboard` | Click sidebar logo |
| My Tasks | `/tasks` | Sidebar → My Tasks |
| Add Task | `/tasks` | Click "Add Task" button |
| Categories | `/categories` | Sidebar → Categories |
| Calendar | `/calendar` | Sidebar → Calendar |
| Notifications | `/notifications` | Sidebar → Notifications |
| Account | `/account` | Sidebar → Account |
| Dark Mode | Any page | Sidebar → Toggle button |
| Logout | Any page | Sidebar → Logout button |

---

## 🔧 Troubleshooting Commands

### Port Issues
```bash
# If port 5173 is busy
lsof -ti:5173 | xargs kill -9
# Then run: npm run dev
```

### Dependency Issues
```bash
# Reset everything
rm -rf node_modules package-lock.json
npm install
```

### Cache Issues
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

### Data Reset
```javascript
// In browser console (F12)
localStorage.clear();
location.reload();
```

---

## 📁 Important File Locations

```
src/
├── App.tsx                    # Main app + routing
├── main.tsx                   # Entry point
├── index.css                  # Global styles
├── contexts/
│   ├── AuthContext.tsx       # Authentication logic
│   ├── ThemeContext.tsx      # Dark/Light mode
│   └── TaskContext.tsx       # All task operations
├── pages/                     # All page components
├── components/                # Reusable components
├── services/storage.ts        # localStorage handler
└── utils/
    ├── helpers.ts            # Utility functions
    └── mockData.ts           # Demo data
```

---

## 💡 Quick Code Snippets

### Using Task Functions
```typescript
import { useTasks } from './contexts/TaskContext';

// In your component
const { tasks, addTask, updateTask, deleteTask } = useTasks();

// Add task
addTask({
  title: "New Task",
  description: "Description",
  categoryId: "cat-1",
  priorityId: "pri-1",
  status: "pending",
  dueDate: "2025-12-31"
});

// Update task
updateTask(taskId, { title: "Updated Title" });

// Delete task
deleteTask(taskId);
```

### Using Authentication
```typescript
import { useAuth } from './contexts/AuthContext';

const { user, login, logout } = useAuth();

// Login
await login(email, password, rememberMe);

// Logout
logout();
```

### Using Theme
```typescript
import { useTheme } from './contexts/ThemeContext';

const { theme, toggleTheme } = useTheme();

// Toggle dark/light mode
toggleTheme();
```

---

## 🎨 Customization Quick Tips

### Change Primary Color
Edit `tailwind.config.js`:
```javascript
colors: {
  coral: {
    500: '#YOUR_COLOR_HERE',  // Main color
  }
}
```

### Add New Page
1. Create component in `src/pages/your-page/`
2. Add route in `src/App.tsx`
3. Add link in `src/components/layout/Sidebar.tsx`

---

## 📊 Default Data

### Categories (5 default)
- Work (Blue)
- Personal (Green)
- Shopping (Orange)
- Health (Red)
- Learning (Purple)

### Priorities (3 default)
- High (Red)
- Medium (Orange)
- Low (Green)

### Task Statuses
- Pending
- In Progress
- Completed

---

## 🌐 URLs Reference

| Environment | URL |
|-------------|-----|
| Development | http://localhost:5173 |
| Production Build | http://localhost:4173 |

---

## ⌨️ Keyboard Shortcuts (Browser)

| Action | Shortcut |
|--------|----------|
| Open DevTools | F12 or Ctrl+Shift+I |
| Hard Refresh | Ctrl+Shift+R |
| Clear Cache | Ctrl+Shift+Delete |

---

## 📦 Installed Packages

### Core
- `react` - UI framework
- `react-dom` - React renderer
- `react-router-dom` - Routing
- `typescript` - Type safety

### UI
- `tailwindcss` - Styling
- `lucide-react` - Icons
- `recharts` - Charts

### Utilities
- `date-fns` - Date formatting
- `@hello-pangea/dnd` - Drag & drop

### Build
- `vite` - Build tool
- `@vitejs/plugin-react` - React plugin

---

## 🔒 Security Notes

1. **Demo Mode**: Uses simulated authentication (not production-ready)
2. **Data Storage**: All data stored in browser localStorage
3. **Password**: Demo password is hardcoded
4. **Production**: Implement real backend authentication

---

## 🚨 Common Errors & Fixes

| Error | Quick Fix |
|-------|-----------|
| Module not found | `npm install` |
| Port in use | Kill port or use different one |
| Build fails | Check for TypeScript errors |
| White screen | Check browser console (F12) |
| Dark mode broken | Check tailwind.config.js |
| Data not saving | Check localStorage enabled |

---

## 📱 Browser Compatibility

✅ Chrome (recommended)
✅ Firefox
✅ Safari
✅ Edge
❌ IE11 (not supported)

---

## 🎓 Learning Resources

- React: https://react.dev/learn
- TypeScript: https://www.typescriptlang.org/docs/
- Tailwind: https://tailwindcss.com/docs
- Vite: https://vitejs.dev/guide/

---

## 📞 Getting Help

1. Check DOCUMENTATION.md for detailed info
2. Check README.md for overview
3. Check browser console for errors
4. Clear cache and reinstall dependencies

---

## ✅ Daily Development Checklist

- [ ] Run `npm run dev`
- [ ] Check http://localhost:5173
- [ ] Test new features
- [ ] Check console for errors
- [ ] Run `npm run lint` before commit
- [ ] Run `npm run build` to verify production build

---

**Pro Tip:** Keep this file open while developing! 🚀

**Last Updated:** October 2025
