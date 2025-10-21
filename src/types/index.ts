// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  photo?: string;
  phone?: string;
  bio?: string;
  createdAt: string;
}

export interface AuthUser extends Omit<User, 'password'> {}

// Task Types
export type TaskStatus = 'pending' | 'in-progress' | 'completed';
export type RecurrenceFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  order: number;
  createdAt: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: string;
}

export interface RecurrencePattern {
  frequency: RecurrenceFrequency;
  interval: number;
  daysOfWeek?: number[]; // 0-6 (Sunday to Saturday)
  dayOfMonth?: number; // 1-31
  endDate?: string;
}

export interface Task {
  id: string;
  userId: string;
  title: string;
  description: string;
  categoryId: string;
  priorityId: string;
  status: TaskStatus;
  dueDate: string;
  completed: boolean;
  image?: string;

  // New features
  subtasks: Subtask[];
  tags: string[]; // Array of tag IDs
  attachments: Attachment[];
  recurrence?: RecurrencePattern;
  parentTaskId?: string; // For recurring task instances

  createdAt: string;
  updatedAt: string;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  color: string;
  icon?: string;
  userId: string;
  createdAt: string;
}

// Priority Types
export type PriorityLevel = 'low' | 'medium' | 'high';

export interface Priority {
  id: string;
  name: string;
  level: PriorityLevel;
  color: string;
  userId: string;
  createdAt: string;
}

// Tag Types
export interface Tag {
  id: string;
  name: string;
  color: string;
  userId: string;
  createdAt: string;
}

// Notification Types
export type NotificationType = 'task-due' | 'task-completed' | 'task-assigned' | 'system';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  taskId?: string;
  createdAt: string;
}

// Filter and Search Types
export interface TaskFilters {
  status?: TaskStatus[];
  priority?: string[];
  category?: string[];
  tags?: string[]; // New: filter by tags
  startDate?: string;
  endDate?: string;
  search?: string;
}

// Statistics Types
export interface TaskStatistics {
  total: number;
  completed: number;
  pending: number;
  inProgress: number;
  completionRate: number;
  byCategory: Record<string, number>;
  byPriority: Record<string, number>;
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  categoryId: string;
  priorityId: string;
  status: TaskStatus;
  dueDate: string;
  image?: File | string;
  tags?: string[]; // New: tags selection
  recurrence?: RecurrencePattern; // New: recurrence pattern
}

export interface CategoryFormData {
  name: string;
  color: string;
  icon?: string;
}

export interface PriorityFormData {
  name: string;
  level: PriorityLevel;
  color: string;
}

export interface TagFormData {
  name: string;
  color: string;
}

export interface ProfileFormData {
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  photo?: File | string;
}

export interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Context Types
export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, rememberMe: boolean) => Promise<boolean>;
  register: (data: RegisterFormData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<AuthUser>) => void;
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export interface TaskContextType {
  tasks: Task[];
  categories: Category[];
  priorities: Priority[];
  tags: Tag[]; // New: tags array
  notifications: Notification[];
  statistics: TaskStatistics;
  loading: boolean; // New: loading state

  // Task operations
  addTask: (task: TaskFormData) => Promise<void>;
  updateTask: (id: string, task: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTaskComplete: (id: string) => Promise<void>;

  // Subtask operations
  addSubtask: (taskId: string, title: string) => Promise<void>;
  updateSubtask: (taskId: string, subtaskId: string, updates: Partial<Subtask>) => Promise<void>;
  deleteSubtask: (taskId: string, subtaskId: string) => Promise<void>;

  // Category operations
  addCategory: (category: CategoryFormData) => Promise<void>;
  updateCategory: (id: string, category: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;

  // Priority operations
  addPriority: (priority: PriorityFormData) => Promise<void>;
  updatePriority: (id: string, priority: Partial<Priority>) => Promise<void>;
  deletePriority: (id: string) => Promise<void>;

  // Tag operations (New)
  addTag: (tag: TagFormData) => Promise<void>;
  updateTag: (id: string, tag: Partial<Tag>) => Promise<void>;
  deleteTag: (id: string) => Promise<void>;

  // Notification operations
  markNotificationAsRead: (id: string) => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  clearAllNotifications: () => Promise<void>;

  // Utility functions
  getTaskById: (id: string) => Task | undefined;
  getCategoryById: (id: string) => Category | undefined;
  getPriorityById: (id: string) => Priority | undefined;
  getTagById: (id: string) => Tag | undefined; // New
  getFilteredTasks: (filters: TaskFilters) => Task[];
}

// Component Props Types
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export interface TaskCardProps {
  task: Task;
  category: Category;
  priority: Priority;
  onEdit: () => void;
  onDelete: () => void;
  onToggleComplete: () => void;
}

export interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}
