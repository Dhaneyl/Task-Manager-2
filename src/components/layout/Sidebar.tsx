import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  CheckSquare,
  FolderKanban,
  Calendar,
  Bell,
  Settings,
  LogOut,
  Moon,
  Sun,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useTasks } from '../../contexts/TaskContext';

const Sidebar: React.FC = () => {
  const { logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { notifications } = useTasks();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/tasks', icon: CheckSquare, label: 'My Tasks' },
    { path: '/categories', icon: FolderKanban, label: 'Categories' },
    { path: '/calendar', icon: Calendar, label: 'Calendar' },
    { path: '/notifications', icon: Bell, label: 'Notifications', badge: unreadCount },
    { path: '/account', icon: Settings, label: 'Account' },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-coral-500 text-white flex flex-col shadow-xl z-50">
      {/* Logo */}
      <div className="p-6 border-b border-coral-400">
        <h1 className="text-2xl font-bold">Task Manager</h1>
        <p className="text-coral-100 text-sm mt-1">Stay organized, stay productive</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-coral-500 shadow-md'
                      : 'text-white hover:bg-coral-400'
                  }`
                }
              >
                <item.icon size={20} />
                <span className="font-medium flex-1">{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="bg-white text-coral-500 text-xs font-bold px-2 py-1 rounded-full min-w-[24px] text-center">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile & Actions */}
      <div className="p-4 border-t border-coral-400 space-y-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-coral-400 transition-all duration-200"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          <span className="font-medium">{theme === 'light' ? 'Dark' : 'Light'} Mode</span>
        </button>

        {/* User Info */}
        {user && (
          <div className="flex items-center gap-3 px-4 py-2 bg-coral-400 rounded-lg">
            <div className="w-10 h-10 bg-white text-coral-500 rounded-full flex items-center justify-center font-bold text-lg">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-white truncate">{user.name}</p>
              <p className="text-xs text-coral-100 truncate">{user.email}</p>
            </div>
          </div>
        )}

        {/* Logout */}
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-red-500 transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
