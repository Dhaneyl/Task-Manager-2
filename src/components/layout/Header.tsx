import React from 'react';
import { Search, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../../contexts/TaskContext';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const navigate = useNavigate();
  const { notifications } = useTasks();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="bg-primary border-b border-primary px-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          {subtitle && (
            <p className="text-secondary mt-1">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Notification Bell - Mobile */}
          <button
            onClick={() => navigate('/notifications')}
            className="lg:hidden relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Bell size={24} className="text-secondary" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-coral-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
