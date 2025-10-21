import type { User, Task, Category, Priority, Notification } from '../types';

// Storage keys
const STORAGE_KEYS = {
  USER: 'taskManager_user',
  TOKEN: 'taskManager_token',
  TASKS: 'taskManager_tasks',
  CATEGORIES: 'taskManager_categories',
  PRIORITIES: 'taskManager_priorities',
  NOTIFICATIONS: 'taskManager_notifications',
  THEME: 'taskManager_theme',
} as const;

// Generic storage operations
export const storage = {
  // Get item from localStorage
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting ${key} from localStorage:`, error);
      return null;
    }
  },

  // Set item in localStorage
  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting ${key} in localStorage:`, error);
    }
  },

  // Remove item from localStorage
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
    }
  },

  // Clear all localStorage
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};

// Auth operations
export const authStorage = {
  getUser: () => storage.get<User>(STORAGE_KEYS.USER),
  setUser: (user: User) => storage.set(STORAGE_KEYS.USER, user),
  removeUser: () => storage.remove(STORAGE_KEYS.USER),

  getToken: () => storage.get<string>(STORAGE_KEYS.TOKEN),
  setToken: (token: string) => storage.set(STORAGE_KEYS.TOKEN, token),
  removeToken: () => storage.remove(STORAGE_KEYS.TOKEN),

  clearAuth: () => {
    authStorage.removeUser();
    authStorage.removeToken();
  },
};

// Task operations
export const taskStorage = {
  getTasks: () => storage.get<Task[]>(STORAGE_KEYS.TASKS) || [],
  setTasks: (tasks: Task[]) => storage.set(STORAGE_KEYS.TASKS, tasks),
  addTask: (task: Task) => {
    const tasks = taskStorage.getTasks();
    tasks.push(task);
    taskStorage.setTasks(tasks);
  },
  updateTask: (id: string, updates: Partial<Task>) => {
    const tasks = taskStorage.getTasks();
    const index = tasks.findIndex((t) => t.id === id);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...updates, updatedAt: new Date().toISOString() };
      taskStorage.setTasks(tasks);
    }
  },
  deleteTask: (id: string) => {
    const tasks = taskStorage.getTasks().filter((t) => t.id !== id);
    taskStorage.setTasks(tasks);
  },
};

// Category operations
export const categoryStorage = {
  getCategories: () => storage.get<Category[]>(STORAGE_KEYS.CATEGORIES) || [],
  setCategories: (categories: Category[]) => storage.set(STORAGE_KEYS.CATEGORIES, categories),
  addCategory: (category: Category) => {
    const categories = categoryStorage.getCategories();
    categories.push(category);
    categoryStorage.setCategories(categories);
  },
  updateCategory: (id: string, updates: Partial<Category>) => {
    const categories = categoryStorage.getCategories();
    const index = categories.findIndex((c) => c.id === id);
    if (index !== -1) {
      categories[index] = { ...categories[index], ...updates };
      categoryStorage.setCategories(categories);
    }
  },
  deleteCategory: (id: string) => {
    const categories = categoryStorage.getCategories().filter((c) => c.id !== id);
    categoryStorage.setCategories(categories);
  },
};

// Priority operations
export const priorityStorage = {
  getPriorities: () => storage.get<Priority[]>(STORAGE_KEYS.PRIORITIES) || [],
  setPriorities: (priorities: Priority[]) => storage.set(STORAGE_KEYS.PRIORITIES, priorities),
  addPriority: (priority: Priority) => {
    const priorities = priorityStorage.getPriorities();
    priorities.push(priority);
    priorityStorage.setPriorities(priorities);
  },
  updatePriority: (id: string, updates: Partial<Priority>) => {
    const priorities = priorityStorage.getPriorities();
    const index = priorities.findIndex((p) => p.id === id);
    if (index !== -1) {
      priorities[index] = { ...priorities[index], ...updates };
      priorityStorage.setPriorities(priorities);
    }
  },
  deletePriority: (id: string) => {
    const priorities = priorityStorage.getPriorities().filter((p) => p.id !== id);
    priorityStorage.setPriorities(priorities);
  },
};

// Notification operations
export const notificationStorage = {
  getNotifications: () => storage.get<Notification[]>(STORAGE_KEYS.NOTIFICATIONS) || [],
  setNotifications: (notifications: Notification[]) =>
    storage.set(STORAGE_KEYS.NOTIFICATIONS, notifications),
  addNotification: (notification: Notification) => {
    const notifications = notificationStorage.getNotifications();
    notifications.unshift(notification); // Add to beginning
    notificationStorage.setNotifications(notifications);
  },
  markAsRead: (id: string) => {
    const notifications = notificationStorage.getNotifications();
    const index = notifications.findIndex((n) => n.id === id);
    if (index !== -1) {
      notifications[index].read = true;
      notificationStorage.setNotifications(notifications);
    }
  },
  deleteNotification: (id: string) => {
    const notifications = notificationStorage.getNotifications().filter((n) => n.id !== id);
    notificationStorage.setNotifications(notifications);
  },
  clearAll: () => {
    notificationStorage.setNotifications([]);
  },
};

// Theme operations
export const themeStorage = {
  getTheme: () => storage.get<'light' | 'dark'>(STORAGE_KEYS.THEME) || 'light',
  setTheme: (theme: 'light' | 'dark') => storage.set(STORAGE_KEYS.THEME, theme),
};
