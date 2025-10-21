import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type {
  TaskContextType,
  Task,
  Category,
  Priority,
  Tag,
  Notification,
  TaskFormData,
  CategoryFormData,
  PriorityFormData,
  TagFormData,
  TaskFilters,
  TaskStatistics,
  Subtask,
} from '../types';
import {
  taskApi,
  categoryApi,
  priorityApi,
  tagApi,
  notificationApi,
} from '../services/api';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  // Load all data when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      loadAllData();
    } else {
      // Clear data on logout
      setTasks([]);
      setCategories([]);
      setPriorities([]);
      setTags([]);
      setNotifications([]);
    }
  }, [isAuthenticated, user]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [tasksData, categoriesData, prioritiesData, tagsData, notificationsData] =
        await Promise.all([
          taskApi.getTasks(),
          categoryApi.getCategories(),
          priorityApi.getPriorities(),
          tagApi.getTags(),
          notificationApi.getNotifications(),
        ]);

      setTasks(tasksData);
      setCategories(categoriesData);
      setPriorities(prioritiesData);
      setTags(tagsData);
      setNotifications(notificationsData);
    } catch (error: any) {
      console.error('Error loading data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const statistics: TaskStatistics = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = tasks.filter((t) => t.status === 'pending').length;
    const inProgress = tasks.filter((t) => t.status === 'in-progress').length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    const byCategory: Record<string, number> = {};
    const byPriority: Record<string, number> = {};

    tasks.forEach((task) => {
      byCategory[task.categoryId] = (byCategory[task.categoryId] || 0) + 1;
      byPriority[task.priorityId] = (byPriority[task.priorityId] || 0) + 1;
    });

    return {
      total,
      completed,
      pending,
      inProgress,
      completionRate,
      byCategory,
      byPriority,
    };
  }, [tasks]);

  // Task operations
  const addTask = async (taskData: TaskFormData): Promise<void> => {
    try {
      const newTask = await taskApi.createTask(taskData);
      setTasks([...tasks, newTask]);
      toast.success('Task created successfully');
    } catch (error: any) {
      console.error('Error creating task:', error);
      toast.error(error.response?.data?.message || 'Failed to create task');
      throw error;
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>): Promise<void> => {
    try {
      const updatedTask = await taskApi.updateTask(id, updates);
      setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
      toast.success('Task updated successfully');
    } catch (error: any) {
      console.error('Error updating task:', error);
      toast.error(error.response?.data?.message || 'Failed to update task');
      throw error;
    }
  };

  const deleteTask = async (id: string): Promise<void> => {
    try {
      await taskApi.deleteTask(id);
      setTasks(tasks.filter((t) => t.id !== id));
      toast.success('Task deleted successfully');
    } catch (error: any) {
      console.error('Error deleting task:', error);
      toast.error(error.response?.data?.message || 'Failed to delete task');
      throw error;
    }
  };

  const toggleTaskComplete = async (id: string): Promise<void> => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      const completed = !task.completed;
      const status = completed ? 'completed' : 'pending';
      await updateTask(id, { completed, status });
    }
  };

  // Subtask operations
  const addSubtask = async (taskId: string, title: string): Promise<void> => {
    try {
      const updatedTask = await taskApi.addSubtask(taskId, title);
      setTasks(tasks.map((t) => (t.id === taskId ? updatedTask : t)));
      toast.success('Subtask added');
    } catch (error: any) {
      console.error('Error adding subtask:', error);
      toast.error(error.response?.data?.message || 'Failed to add subtask');
      throw error;
    }
  };

  const updateSubtask = async (
    taskId: string,
    subtaskId: string,
    updates: Partial<Subtask>
  ): Promise<void> => {
    try {
      const updatedTask = await taskApi.updateSubtask(taskId, subtaskId, updates);
      setTasks(tasks.map((t) => (t.id === taskId ? updatedTask : t)));
    } catch (error: any) {
      console.error('Error updating subtask:', error);
      toast.error(error.response?.data?.message || 'Failed to update subtask');
      throw error;
    }
  };

  const deleteSubtask = async (taskId: string, subtaskId: string): Promise<void> => {
    try {
      const updatedTask = await taskApi.deleteSubtask(taskId, subtaskId);
      setTasks(tasks.map((t) => (t.id === taskId ? updatedTask : t)));
      toast.success('Subtask deleted');
    } catch (error: any) {
      console.error('Error deleting subtask:', error);
      toast.error(error.response?.data?.message || 'Failed to delete subtask');
      throw error;
    }
  };

  // Category operations
  const addCategory = async (categoryData: CategoryFormData): Promise<void> => {
    try {
      const newCategory = await categoryApi.createCategory(categoryData);
      setCategories([...categories, newCategory]);
      toast.success('Category created successfully');
    } catch (error: any) {
      console.error('Error creating category:', error);
      toast.error(error.response?.data?.message || 'Failed to create category');
      throw error;
    }
  };

  const updateCategory = async (id: string, updates: Partial<Category>): Promise<void> => {
    try {
      const updatedCategory = await categoryApi.updateCategory(id, updates);
      setCategories(categories.map((c) => (c.id === id ? updatedCategory : c)));
      toast.success('Category updated successfully');
    } catch (error: any) {
      console.error('Error updating category:', error);
      toast.error(error.response?.data?.message || 'Failed to update category');
      throw error;
    }
  };

  const deleteCategory = async (id: string): Promise<void> => {
    try {
      await categoryApi.deleteCategory(id);
      setCategories(categories.filter((c) => c.id !== id));
      toast.success('Category deleted successfully');
    } catch (error: any) {
      console.error('Error deleting category:', error);
      toast.error(error.response?.data?.message || 'Failed to delete category');
      throw error;
    }
  };

  // Priority operations
  const addPriority = async (priorityData: PriorityFormData): Promise<void> => {
    try {
      const newPriority = await priorityApi.createPriority(priorityData);
      setPriorities([...priorities, newPriority]);
      toast.success('Priority created successfully');
    } catch (error: any) {
      console.error('Error creating priority:', error);
      toast.error(error.response?.data?.message || 'Failed to create priority');
      throw error;
    }
  };

  const updatePriority = async (id: string, updates: Partial<Priority>): Promise<void> => {
    try {
      const updatedPriority = await priorityApi.updatePriority(id, updates);
      setPriorities(priorities.map((p) => (p.id === id ? updatedPriority : p)));
      toast.success('Priority updated successfully');
    } catch (error: any) {
      console.error('Error updating priority:', error);
      toast.error(error.response?.data?.message || 'Failed to update priority');
      throw error;
    }
  };

  const deletePriority = async (id: string): Promise<void> => {
    try {
      await priorityApi.deletePriority(id);
      setPriorities(priorities.filter((p) => p.id !== id));
      toast.success('Priority deleted successfully');
    } catch (error: any) {
      console.error('Error deleting priority:', error);
      toast.error(error.response?.data?.message || 'Failed to delete priority');
      throw error;
    }
  };

  // Tag operations
  const addTag = async (tagData: TagFormData): Promise<void> => {
    try {
      const newTag = await tagApi.createTag(tagData);
      setTags([...tags, newTag]);
      toast.success('Tag created successfully');
    } catch (error: any) {
      console.error('Error creating tag:', error);
      toast.error(error.response?.data?.message || 'Failed to create tag');
      throw error;
    }
  };

  const updateTag = async (id: string, updates: Partial<Tag>): Promise<void> => {
    try {
      const updatedTag = await tagApi.updateTag(id, updates);
      setTags(tags.map((t) => (t.id === id ? updatedTag : t)));
      toast.success('Tag updated successfully');
    } catch (error: any) {
      console.error('Error updating tag:', error);
      toast.error(error.response?.data?.message || 'Failed to update tag');
      throw error;
    }
  };

  const deleteTag = async (id: string): Promise<void> => {
    try {
      await tagApi.deleteTag(id);
      setTags(tags.filter((t) => t.id !== id));
      toast.success('Tag deleted successfully');
    } catch (error: any) {
      console.error('Error deleting tag:', error);
      toast.error(error.response?.data?.message || 'Failed to delete tag');
      throw error;
    }
  };

  // Notification operations
  const markNotificationAsRead = async (id: string): Promise<void> => {
    try {
      await notificationApi.markAsRead(id);
      setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
    } catch (error: any) {
      console.error('Error marking notification as read:', error);
      toast.error(error.response?.data?.message || 'Failed to mark notification as read');
      throw error;
    }
  };

  const deleteNotification = async (id: string): Promise<void> => {
    try {
      await notificationApi.deleteNotification(id);
      setNotifications(notifications.filter((n) => n.id !== id));
    } catch (error: any) {
      console.error('Error deleting notification:', error);
      toast.error(error.response?.data?.message || 'Failed to delete notification');
      throw error;
    }
  };

  const clearAllNotifications = async (): Promise<void> => {
    try {
      await notificationApi.clearAll();
      setNotifications([]);
      toast.success('All notifications cleared');
    } catch (error: any) {
      console.error('Error clearing notifications:', error);
      toast.error(error.response?.data?.message || 'Failed to clear notifications');
      throw error;
    }
  };

  // Utility functions
  const getTaskById = (id: string) => tasks.find((t) => t.id === id);
  const getCategoryById = (id: string) => categories.find((c) => c.id === id);
  const getPriorityById = (id: string) => priorities.find((p) => p.id === id);
  const getTagById = (id: string) => tags.find((t) => t.id === id);

  const getFilteredTasks = (filters: TaskFilters): Task[] => {
    return tasks.filter((task) => {
      // Status filter
      if (filters.status && filters.status.length > 0 && !filters.status.includes(task.status)) {
        return false;
      }

      // Priority filter
      if (
        filters.priority &&
        filters.priority.length > 0 &&
        !filters.priority.includes(task.priorityId)
      ) {
        return false;
      }

      // Category filter
      if (
        filters.category &&
        filters.category.length > 0 &&
        !filters.category.includes(task.categoryId)
      ) {
        return false;
      }

      // Tag filter
      if (filters.tags && filters.tags.length > 0) {
        const hasMatchingTag = filters.tags.some((tagId) => task.tags.includes(tagId));
        if (!hasMatchingTag) {
          return false;
        }
      }

      // Date range filter
      if (filters.startDate && new Date(task.dueDate) < new Date(filters.startDate)) {
        return false;
      }
      if (filters.endDate && new Date(task.dueDate) > new Date(filters.endDate)) {
        return false;
      }

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          task.title.toLowerCase().includes(searchLower) ||
          task.description.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        categories,
        priorities,
        tags,
        notifications,
        statistics,
        loading,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskComplete,
        addSubtask,
        updateSubtask,
        deleteSubtask,
        addCategory,
        updateCategory,
        deleteCategory,
        addPriority,
        updatePriority,
        deletePriority,
        addTag,
        updateTag,
        deleteTag,
        markNotificationAsRead,
        deleteNotification,
        clearAllNotifications,
        getTaskById,
        getCategoryById,
        getPriorityById,
        getTagById,
        getFilteredTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
