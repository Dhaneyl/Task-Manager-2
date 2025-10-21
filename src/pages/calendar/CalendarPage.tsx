import React, { useEffect, useState } from 'react';
import Header from '../../components/layout/Header';
import { useTasks } from '../../contexts/TaskContext';
import { formatDate } from '../../utils/helpers';

const CalendarPage: React.FC = () => {
  const { tasks, categories } = useTasks();
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const tasksByDate = tasks.reduce((acc, task) => {
    const date = task.dueDate.split('T')[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(task);
    return acc;
  }, {} as Record<string, typeof tasks>);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header title="Calendar" subtitle="View your tasks by date" />

      <div className="p-8">
        <div className="card">
          <h3 className="text-xl font-bold mb-6" style={{ color: isDark ? '#ffffff' : '#111827' }}>Upcoming Tasks</h3>
          <div className="space-y-6">
            {Object.entries(tasksByDate)
              .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
              .slice(0, 10)
              .map(([date, dateTasks]) => (
                <div key={date}>
                  <h4 className="font-semibold mb-3" style={{ color: isDark ? '#ffffff' : '#111827' }}>{formatDate(date, 'EEEE, MMMM d, yyyy')}</h4>
                  <div className="space-y-2">
                    {dateTasks.map((task) => {
                      const category = categories.find((c) => c.id === task.categoryId);
                      return (
                        <div key={task.id} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                          <input type="checkbox" checked={task.completed} readOnly className="w-4 h-4" />
                          <div className="flex-1">
                            <p className={`font-medium ${task.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                              {task.title}
                            </p>
                          </div>
                          {category && (
                            <span className="text-xs px-2 py-1 rounded-full text-white" style={{ backgroundColor: category.color }}>
                              {category.name}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
