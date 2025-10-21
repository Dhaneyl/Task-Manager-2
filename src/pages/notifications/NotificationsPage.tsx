import React, { useEffect, useState } from 'react';
import { Bell, Trash2, CheckCheck } from 'lucide-react';
import { useTasks } from '../../contexts/TaskContext';
import Header from '../../components/layout/Header';
import Button from '../../components/common/Button';
import { formatDateTime } from '../../utils/helpers';

const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationAsRead, deleteNotification, clearAllNotifications } = useTasks();
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header title="Notifications" subtitle="Stay updated with your task activities" />

      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            {notifications.filter((n) => !n.read).length} unread notifications
          </p>
          {notifications.length > 0 && (
            <Button variant="secondary" onClick={clearAllNotifications} size="sm">
              Clear All
            </Button>
          )}
        </div>

        <div className="space-y-3">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`card flex items-start gap-4 ${!notification.read ? 'border-2 border-coral-500' : ''}`}
              >
                <div className={`p-3 rounded-xl ${notification.read ? 'bg-gray-100 dark:bg-gray-700' : 'bg-coral-100 dark:bg-coral-900/30'}`}>
                  <Bell size={20} className={notification.read ? 'text-gray-500' : 'text-coral-500'} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1" style={{ color: isDark ? '#ffffff' : '#111827' }}>{notification.title}</h3>
                  <p className="text-sm mb-2" style={{ color: isDark ? '#9ca3af' : '#4b5563' }}>{notification.message}</p>
                  <p className="text-xs" style={{ color: isDark ? '#6b7280' : '#6b7280' }}>{formatDateTime(notification.createdAt)}</p>
                </div>
                <div className="flex gap-2">
                  {!notification.read && (
                    <button
                      onClick={() => markNotificationAsRead(notification.id)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                      title="Mark as read"
                    >
                      <CheckCheck size={18} className="text-green-500" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    title="Delete"
                  >
                    <Trash2 size={18} className="text-red-500" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="card text-center py-12">
              <Bell size={48} className="text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No notifications</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
