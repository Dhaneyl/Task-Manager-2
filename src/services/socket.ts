import { io, Socket } from 'socket.io-client';
import type { Task } from '../types';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

class SocketService {
  private socket: Socket | null = null;
  private userId: string | null = null;

  connect(userId: string): void {
    if (this.socket?.connected) {
      return;
    }

    this.userId = userId;
    this.socket = io(SOCKET_URL, {
      transports: ['websocket'],
      autoConnect: true,
    });

    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket?.id);
      if (this.userId) {
        this.socket?.emit('join', this.userId);
      }
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.userId = null;
    }
  }

  // Event listeners
  onTaskCreated(callback: (task: Task) => void): void {
    this.socket?.on('task:created', callback);
  }

  onTaskUpdated(callback: (task: Task) => void): void {
    this.socket?.on('task:updated', callback);
  }

  onTaskDeleted(callback: (data: { id: string }) => void): void {
    this.socket?.on('task:deleted', callback);
  }

  // Remove listeners
  offTaskCreated(): void {
    this.socket?.off('task:created');
  }

  offTaskUpdated(): void {
    this.socket?.off('task:updated');
  }

  offTaskDeleted(): void {
    this.socket?.off('task:deleted');
  }

  // Emit events
  emitTaskUpdate(userId: string, task: Task): void {
    this.socket?.emit('task:update', { userId, task });
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }
}

export const socketService = new SocketService();
export default socketService;
