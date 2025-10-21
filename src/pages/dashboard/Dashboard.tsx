import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Clock, AlertCircle, ListTodo, TrendingUp, Plus } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useTasks } from '../../contexts/TaskContext';
import Header from '../../components/layout/Header';
import Button from '../../components/common/Button';
import { formatDate, getRelativeDate } from '../../utils/helpers';

const Dashboard: React.FC = () => {
  const { tasks, statistics, categories, priorities } = useTasks();

  // Recent tasks (last 5)
  const recentTasks = tasks
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  // Chart data for task status
  const statusData = [
    { name: 'Completed', value: statistics.completed, color: '#10B981' },
    { name: 'In Progress', value: statistics.inProgress, color: '#3B82F6' },
    { name: 'Pending', value: statistics.pending, color: '#F59E0B' },
  ];

  // Category data for pie chart
  const categoryData = categories.map((cat) => ({
    name: cat.name,
    value: statistics.byCategory[cat.id] || 0,
    color: cat.color,
  })).filter((item) => item.value > 0);

  const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
    <div className="card card-hover">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-secondary text-sm font-medium mb-2">{title}</p>
          <h3 className="text-3xl font-bold">{value}</h3>
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp size={16} className={trend.isPositive ? '' : 'rotate-180'} />
              <span>{trend.value}%</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header
        title="Dashboard"
        subtitle="Welcome back! Here's what's happening with your tasks."
      />

      <div className="p-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Tasks"
            value={statistics.total}
            icon={ListTodo}
            color="bg-coral-500"
          />
          <StatCard
            title="Completed"
            value={statistics.completed}
            icon={CheckCircle2}
            color="bg-green-500"
            trend={{ value: statistics.completionRate, isPositive: true }}
          />
          <StatCard
            title="In Progress"
            value={statistics.inProgress}
            icon={Clock}
            color="bg-blue-500"
          />
          <StatCard
            title="Pending"
            value={statistics.pending}
            icon={AlertCircle}
            color="bg-yellow-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Task Status Chart */}
          <div className="card lg:col-span-1">
            <h3 className="text-xl font-bold mb-6">Task Status</h3>
            {statusData.some((d) => d.value > 0) ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500 text-center py-12">No tasks yet</p>
            )}
          </div>

          {/* Category Distribution */}
          <div className="card lg:col-span-2">
            <h3 className="text-xl font-bold mb-6">Tasks by Category</h3>
            {categoryData.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {categoryData.map((cat) => (
                  <div key={cat.name} className="p-4 border border-primary rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: cat.color }} />
                      <span className="font-medium">{cat.name}</span>
                    </div>
                    <p className="text-2xl font-bold">{cat.value}</p>
                    <p className="text-sm text-secondary">tasks</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-12">No categories yet</p>
            )}
          </div>
        </div>

        {/* Recent Tasks & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Tasks */}
          <div className="card lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Recent Tasks</h3>
              <Link to="/tasks">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
            {recentTasks.length > 0 ? (
              <div className="space-y-3">
                {recentTasks.map((task) => {
                  const category = categories.find((c) => c.id === task.categoryId);
                  const priority = priorities.find((p) => p.id === task.priorityId);
                  return (
                    <div
                      key={task.id}
                      className="flex items-center gap-4 p-4 border border-primary rounded-lg hover:border-coral-500 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={task.completed}
                        readOnly
                        className="w-5 h-5 text-coral-500 border-gray-300 rounded focus:ring-coral-500"
                      />
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                          {task.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          {category && (
                            <span
                              className="text-xs px-2 py-1 rounded-full text-white"
                              style={{ backgroundColor: category.color }}
                            >
                              {category.name}
                            </span>
                          )}
                          <span className="text-xs text-gray-500">{getRelativeDate(task.dueDate)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-12">No tasks yet</p>
            )}
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <Link to="/tasks?action=new" className="block">
                <div className="p-4 bg-coral-50 dark:bg-coral-900/20 hover:bg-coral-100 dark:hover:bg-coral-900/30 border border-coral-200 dark:border-coral-800 rounded-lg transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Plus size={20} className="text-coral-500" />
                    <span className="font-medium text-coral-700 dark:text-coral-400">Add New Task</span>
                  </div>
                </div>
              </Link>
              <Link to="/categories" className="block">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Plus size={20} className="text-blue-500" />
                    <span className="font-medium text-blue-700 dark:text-blue-400">New Category</span>
                  </div>
                </div>
              </Link>
              <Link to="/calendar" className="block">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Clock size={20} className="text-green-500" />
                    <span className="font-medium text-green-700 dark:text-green-400">View Calendar</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Completion Rate */}
            <div className="mt-8 p-6 bg-gradient-to-br from-coral-500 to-coral-600 rounded-xl text-white">
              <p className="text-sm opacity-90 mb-2">Completion Rate</p>
              <p className="text-4xl font-bold">{statistics.completionRate}%</p>
              <div className="mt-4 bg-white/20 rounded-full h-2">
                <div
                  className="bg-white rounded-full h-2 transition-all duration-500"
                  style={{ width: `${statistics.completionRate}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
