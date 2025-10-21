import type { Task, Category, Priority, User, Notification } from '../types';
import { generateId } from './helpers';

// Mock User Data
export const mockUser: User = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  password: 'Password123', // In real app, this would be hashed
  photo: '',
  phone: '+1 234 567 8900',
  bio: 'Product designer and task management enthusiast',
  createdAt: new Date('2024-01-01').toISOString(),
};

// Mock Categories
export const mockCategories: Category[] = [
  {
    id: 'cat-1',
    name: 'Work',
    color: '#3B82F6',
    icon: 'briefcase',
    userId: 'user-1',
    createdAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: 'cat-2',
    name: 'Personal',
    color: '#10B981',
    icon: 'user',
    userId: 'user-1',
    createdAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: 'cat-3',
    name: 'Shopping',
    color: '#F59E0B',
    icon: 'shopping-cart',
    userId: 'user-1',
    createdAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: 'cat-4',
    name: 'Health',
    color: '#EF4444',
    icon: 'heart',
    userId: 'user-1',
    createdAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: 'cat-5',
    name: 'Learning',
    color: '#8B5CF6',
    icon: 'book',
    userId: 'user-1',
    createdAt: new Date('2024-01-01').toISOString(),
  },
];

// Mock Priorities
export const mockPriorities: Priority[] = [
  {
    id: 'pri-1',
    name: 'High',
    level: 'high',
    color: '#EF4444',
    userId: 'user-1',
    createdAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: 'pri-2',
    name: 'Medium',
    level: 'medium',
    color: '#F59E0B',
    userId: 'user-1',
    createdAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: 'pri-3',
    name: 'Low',
    level: 'low',
    color: '#10B981',
    userId: 'user-1',
    createdAt: new Date('2024-01-01').toISOString(),
  },
];

// Mock Tasks
export const mockTasks: Task[] = [
  {
    id: 'task-1',
    userId: 'user-1',
    title: 'Complete project proposal',
    description: 'Finish the Q1 project proposal and send it to the team for review',
    categoryId: 'cat-1',
    priorityId: 'pri-1',
    status: 'in-progress',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    completed: false,
    createdAt: new Date('2024-10-15').toISOString(),
    updatedAt: new Date('2024-10-18').toISOString(),
  },
  {
    id: 'task-2',
    userId: 'user-1',
    title: 'Buy groceries',
    description: 'Milk, eggs, bread, vegetables, and fruits',
    categoryId: 'cat-3',
    priorityId: 'pri-2',
    status: 'pending',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    completed: false,
    createdAt: new Date('2024-10-19').toISOString(),
    updatedAt: new Date('2024-10-19').toISOString(),
  },
  {
    id: 'task-3',
    userId: 'user-1',
    title: 'Morning workout',
    description: '30 minutes cardio and strength training',
    categoryId: 'cat-4',
    priorityId: 'pri-2',
    status: 'completed',
    dueDate: new Date().toISOString(),
    completed: true,
    createdAt: new Date('2024-10-20').toISOString(),
    updatedAt: new Date('2024-10-20').toISOString(),
  },
  {
    id: 'task-4',
    userId: 'user-1',
    title: 'Read TypeScript documentation',
    description: 'Study advanced TypeScript patterns and best practices',
    categoryId: 'cat-5',
    priorityId: 'pri-3',
    status: 'pending',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    completed: false,
    createdAt: new Date('2024-10-17').toISOString(),
    updatedAt: new Date('2024-10-17').toISOString(),
  },
  {
    id: 'task-5',
    userId: 'user-1',
    title: 'Team meeting preparation',
    description: 'Prepare slides and agenda for the weekly team sync',
    categoryId: 'cat-1',
    priorityId: 'pri-1',
    status: 'pending',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    completed: false,
    createdAt: new Date('2024-10-19').toISOString(),
    updatedAt: new Date('2024-10-19').toISOString(),
  },
  {
    id: 'task-6',
    userId: 'user-1',
    title: 'Update portfolio website',
    description: 'Add recent projects and update the about section',
    categoryId: 'cat-2',
    priorityId: 'pri-2',
    status: 'in-progress',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    completed: false,
    createdAt: new Date('2024-10-16').toISOString(),
    updatedAt: new Date('2024-10-18').toISOString(),
  },
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'user-1',
    type: 'task-due',
    title: 'Task Due Tomorrow',
    message: 'Buy groceries is due tomorrow',
    read: false,
    taskId: 'task-2',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'notif-2',
    userId: 'user-1',
    type: 'task-completed',
    title: 'Task Completed',
    message: 'You completed Morning workout',
    read: false,
    taskId: 'task-3',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif-3',
    userId: 'user-1',
    type: 'task-due',
    title: 'Upcoming Task',
    message: 'Complete project proposal is due in 2 days',
    read: true,
    taskId: 'task-1',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Initialize mock data in localStorage
export const initializeMockData = () => {
  const existingTasks = localStorage.getItem('taskManager_tasks');
  if (!existingTasks) {
    localStorage.setItem('taskManager_tasks', JSON.stringify(mockTasks));
    localStorage.setItem('taskManager_categories', JSON.stringify(mockCategories));
    localStorage.setItem('taskManager_priorities', JSON.stringify(mockPriorities));
    localStorage.setItem('taskManager_notifications', JSON.stringify(mockNotifications));
  }
};
