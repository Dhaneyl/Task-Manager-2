import React, { useState } from 'react';
import { Plus, Search, Filter, Edit2, Trash2 } from 'lucide-react';
import { useTasks } from '../../contexts/TaskContext';
import Header from '../../components/layout/Header';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import type { TaskFormData, TaskFilters } from '../../types';
import { formatDate, getStatusColor } from '../../utils/helpers';

const TasksPage: React.FC = () => {
  const { tasks, categories, priorities, toggleTaskComplete, deleteTask, addTask, updateTask } = useTasks();
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<TaskFilters>({});
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    categoryId: categories[0]?.id || '',
    priorityId: priorities[0]?.id || '',
    status: 'pending',
    dueDate: new Date().toISOString().split('T')[0],
  });

  const filteredTasks = tasks.filter((task) => {
    if (search && !task.title.toLowerCase().includes(search.toLowerCase()) &&
        !task.description.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTask) {
      updateTask(editingTask, formData);
    } else {
      addTask(formData);
    }
    setShowModal(false);
    resetForm();
  };

  const handleEdit = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        categoryId: task.categoryId,
        priorityId: task.priorityId,
        status: task.status,
        dueDate: task.dueDate.split('T')[0],
      });
      setEditingTask(taskId);
      setShowModal(true);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      categoryId: categories[0]?.id || '',
      priorityId: priorities[0]?.id || '',
      status: 'pending',
      dueDate: new Date().toISOString().split('T')[0],
    });
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header title="My Tasks" subtitle="Manage all your tasks in one place" />

      <div className="p-8">
        {/* Search and Actions */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-11 w-full"
            />
          </div>
          <Button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            icon={<Plus size={20} />}
          >
            Add Task
          </Button>
        </div>

        {/* Tasks Grid */}
        <div className="grid gap-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => {
              const category = categories.find((c) => c.id === task.categoryId);
              const priority = priorities.find((p) => p.id === task.priorityId);
              return (
                <div
                  key={task.id}
                  className="card card-hover flex items-start gap-4"
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskComplete(task.id)}
                    className="mt-1 w-5 h-5 text-coral-500 border-gray-300 rounded focus:ring-coral-500"
                  />
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold mb-2 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                      {task.title}
                    </h3>
                    <p className="text-secondary mb-3">{task.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {category && (
                        <span className="text-xs px-3 py-1 rounded-full text-white" style={{ backgroundColor: category.color }}>
                          {category.name}
                        </span>
                      )}
                      {priority && (
                        <span className="text-xs px-3 py-1 rounded-full text-white" style={{ backgroundColor: priority.color }}>
                          {priority.name}
                        </span>
                      )}
                      <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                      <span className="text-xs px-3 py-1 dark-bg-gray text-secondary rounded-full">
                        Due: {formatDate(task.dueDate)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(task.id)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <Edit2 size={18} className="text-blue-500" />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} className="text-red-500" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="card text-center py-12">
              <p className="text-gray-500 text-lg">No tasks found</p>
              <Button onClick={() => setShowModal(true)} className="mt-4" icon={<Plus size={20} />}>
                Create Your First Task
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Task Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        title={editingTask ? 'Edit Task' : 'Add New Task'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input"
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input min-h-[100px]"
              placeholder="Enter task description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Category *</label>
              <select
                required
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="input"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Priority *</label>
              <select
                required
                value={formData.priorityId}
                onChange={(e) => setFormData({ ...formData, priorityId: e.target.value })}
                className="input"
              >
                {priorities.map((pri) => (
                  <option key={pri.id} value={pri.id}>{pri.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Status *</label>
              <select
                required
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="input"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Due Date *</label>
              <input
                type="date"
                required
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="input"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              {editingTask ? 'Update Task' : 'Create Task'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TasksPage;
