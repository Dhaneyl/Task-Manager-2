import axios, { type AxiosInstance, type AxiosError } from 'axios';
import type {
  User,
  Task,
  Category,
  Priority,
  Tag,
  Notification,
  TaskFormData,
  CategoryFormData,
  PriorityFormData,
  TagFormData,
  RegisterFormData,
  Subtask,
  Attachment,
} from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and data transformation
api.interceptors.response.use(
  (response) => {
    // Transform _id to id for all responses
    if (response.data?.data) {
      if (Array.isArray(response.data.data)) {
        response.data.data = response.data.data.map(transformMongoDoc);
      } else {
        response.data.data = transformMongoDoc(response.data.data);
      }
    }
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Helper function to transform MongoDB _id to id
function transformMongoDoc(doc: any): any {
  if (!doc) return doc;

  const transformed: any = { ...doc };

  // Transform _id to id
  if (doc._id) {
    transformed.id = doc._id;
    delete transformed._id;
  }

  // Transform nested objects
  if (doc.categoryId && typeof doc.categoryId === 'object') {
    transformed.categoryId = doc.categoryId._id || doc.categoryId.id || doc.categoryId;
  }
  if (doc.priorityId && typeof doc.priorityId === 'object') {
    transformed.priorityId = doc.priorityId._id || doc.priorityId.id || doc.priorityId;
  }
  if (doc.tags && Array.isArray(doc.tags)) {
    transformed.tags = doc.tags.map((tag: any) =>
      typeof tag === 'object' ? (tag._id || tag.id) : tag
    );
  }

  return transformed;
}

// API Response type
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  count?: number;
}

// Authentication
export const authApi = {
  register: async (data: RegisterFormData): Promise<{ user: User; token: string }> => {
    const response = await api.post<ApiResponse<User> & { token: string }>('/auth/register', data);
    return { user: response.data.data, token: response.data.token };
  },

  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    const response = await api.post<ApiResponse<User> & { token: string }>('/auth/login', {
      email,
      password,
    });
    return { user: response.data.data, token: response.data.token };
  },

  getMe: async (): Promise<User> => {
    const response = await api.get<ApiResponse<User>>('/auth/me');
    return response.data.data;
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await api.put<ApiResponse<User>>('/auth/profile', data);
    return response.data.data;
  },
};

// Tasks
export const taskApi = {
  getTasks: async (): Promise<Task[]> => {
    const response = await api.get<ApiResponse<Task[]>>('/tasks');
    return response.data.data;
  },

  getTask: async (id: string): Promise<Task> => {
    const response = await api.get<ApiResponse<Task>>(`/tasks/${id}`);
    return response.data.data;
  },

  createTask: async (task: TaskFormData): Promise<Task> => {
    const response = await api.post<ApiResponse<Task>>('/tasks', task);
    return response.data.data;
  },

  updateTask: async (id: string, task: Partial<Task>): Promise<Task> => {
    const response = await api.put<ApiResponse<Task>>(`/tasks/${id}`, task);
    return response.data.data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },

  // Subtasks
  addSubtask: async (taskId: string, title: string): Promise<Task> => {
    const response = await api.post<ApiResponse<Task>>(`/tasks/${taskId}/subtasks`, { title });
    return response.data.data;
  },

  updateSubtask: async (
    taskId: string,
    subtaskId: string,
    updates: Partial<Subtask>
  ): Promise<Task> => {
    const response = await api.put<ApiResponse<Task>>(
      `/tasks/${taskId}/subtasks/${subtaskId}`,
      updates
    );
    return response.data.data;
  },

  deleteSubtask: async (taskId: string, subtaskId: string): Promise<Task> => {
    const response = await api.delete<ApiResponse<Task>>(
      `/tasks/${taskId}/subtasks/${subtaskId}`
    );
    return response.data.data;
  },
};

// Categories
export const categoryApi = {
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get<ApiResponse<Category[]>>('/categories');
    return response.data.data;
  },

  getCategory: async (id: string): Promise<Category> => {
    const response = await api.get<ApiResponse<Category>>(`/categories/${id}`);
    return response.data.data;
  },

  createCategory: async (category: CategoryFormData): Promise<Category> => {
    const response = await api.post<ApiResponse<Category>>('/categories', category);
    return response.data.data;
  },

  updateCategory: async (id: string, category: Partial<Category>): Promise<Category> => {
    const response = await api.put<ApiResponse<Category>>(`/categories/${id}`, category);
    return response.data.data;
  },

  deleteCategory: async (id: string): Promise<void> => {
    await api.delete(`/categories/${id}`);
  },
};

// Priorities
export const priorityApi = {
  getPriorities: async (): Promise<Priority[]> => {
    const response = await api.get<ApiResponse<Priority[]>>('/priorities');
    return response.data.data;
  },

  getPriority: async (id: string): Promise<Priority> => {
    const response = await api.get<ApiResponse<Priority>>(`/priorities/${id}`);
    return response.data.data;
  },

  createPriority: async (priority: PriorityFormData): Promise<Priority> => {
    const response = await api.post<ApiResponse<Priority>>('/priorities', priority);
    return response.data.data;
  },

  updatePriority: async (id: string, priority: Partial<Priority>): Promise<Priority> => {
    const response = await api.put<ApiResponse<Priority>>(`/priorities/${id}`, priority);
    return response.data.data;
  },

  deletePriority: async (id: string): Promise<void> => {
    await api.delete(`/priorities/${id}`);
  },
};

// Tags
export const tagApi = {
  getTags: async (): Promise<Tag[]> => {
    const response = await api.get<ApiResponse<Tag[]>>('/tags');
    return response.data.data;
  },

  getTag: async (id: string): Promise<Tag> => {
    const response = await api.get<ApiResponse<Tag>>(`/tags/${id}`);
    return response.data.data;
  },

  createTag: async (tag: TagFormData): Promise<Tag> => {
    const response = await api.post<ApiResponse<Tag>>('/tags', tag);
    return response.data.data;
  },

  updateTag: async (id: string, tag: Partial<Tag>): Promise<Tag> => {
    const response = await api.put<ApiResponse<Tag>>(`/tags/${id}`, tag);
    return response.data.data;
  },

  deleteTag: async (id: string): Promise<void> => {
    await api.delete(`/tags/${id}`);
  },
};

// Notifications
export const notificationApi = {
  getNotifications: async (): Promise<Notification[]> => {
    const response = await api.get<ApiResponse<Notification[]>>('/notifications');
    return response.data.data;
  },

  markAsRead: async (id: string): Promise<Notification> => {
    const response = await api.put<ApiResponse<Notification>>(`/notifications/${id}/read`);
    return response.data.data;
  },

  deleteNotification: async (id: string): Promise<void> => {
    await api.delete(`/notifications/${id}`);
  },

  clearAll: async (): Promise<void> => {
    await api.delete('/notifications');
  },
};

// File upload
export const uploadApi = {
  uploadFile: async (file: File): Promise<Attachment> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post<ApiResponse<Attachment>>('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.data;
  },
};

export default api;
