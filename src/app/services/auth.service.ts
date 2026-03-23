import { Injectable, signal } from '@angular/core';
import { User, UserRole } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSignal = signal<User | null>(null);
  
  user = this.userSignal.asReadonly();
  isAuthenticated = signal(false);

  constructor() {
    const saved = localStorage.getItem('labconnect_user');
    if (saved) {
      const userData = JSON.parse(saved);
      this.userSignal.set(userData);
      this.isAuthenticated.set(true);
    }
  }

  async login(email: string, role: UserRole) {
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      username: email.split('@')[0],
      email: email,
      role: role
    };
    this.userSignal.set(mockUser);
    this.isAuthenticated.set(true);
    localStorage.setItem('labconnect_user', JSON.stringify(mockUser));
  }

  logout() {
    this.userSignal.set(null);
    this.isAuthenticated.set(false);
    localStorage.removeItem('labconnect_user');
  }
}
