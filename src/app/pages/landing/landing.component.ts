import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, FlaskConical, Shield, Activity, ClipboardList, Users, BarChart3, ChevronRight, Play, CheckCircle } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, FlaskConical, Shield, Activity, ClipboardList, Users, BarChart3, ChevronRight, Play, CheckCircle],
  template: `
    <div class="min-h-screen bg-slate-50 overflow-hidden font-sans">
      <!-- Animated Background Blobs -->
      <div class="fixed inset-0 pointer-events-none overflow-hidden">
        <div class="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute top-1/2 -right-24 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s"></div>
        <div class="absolute -bottom-24 left-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 4s"></div>
      </div>

      <!-- Nav -->
      <nav class="relative z-10 flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div class="flex items-center gap-3">
          <div class="p-2 bg-primary rounded-xl shadow-lg shadow-primary/30">
            <i-lucide name="flask-conical" class="w-6 h-6 text-white"></i-lucide>
          </div>
          <span class="text-2xl font-extrabold tracking-tight text-slate-900">Lab<span class="text-primary">Connect</span></span>
        </div>
        <div class="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600 uppercase tracking-widest">
          <a href="#" class="hover:text-primary transition-colors">Solutions</a>
          <a href="#" class="hover:text-primary transition-colors">Technology</a>
          <a href="#" class="hover:text-primary transition-colors">Security</a>
        </div>
        <button (click)="openAuth()" class="btn-primary flex items-center gap-2">
          Access Portal
          <i-lucide name="chevron-right" class="w-4 h-4"></i-lucide>
        </button>
      </nav>

      <!-- Hero -->
      <main class="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-32">
        <div class="grid lg:grid-cols-2 gap-20 items-center">
          <div class="space-y-8">
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest">
              <span class="flex h-2 w-2 rounded-full bg-primary animate-ping"></span>
              Next-Gen Diagnostics
            </div>
            <h1 class="text-6xl md:text-8xl font-black text-slate-900 leading-[1.1] tracking-tight">
              Precision <br/>
              <span class="gradient-text">Meets Speed.</span>
            </h1>
            <p class="text-xl text-slate-600 max-w-lg leading-relaxed font-medium">
              Revolutionizing laboratory workflows with AI-driven insights, real-time tracking, and seamless microservices integration.
            </p>
            <div class="flex flex-wrap gap-4">
              <button (click)="openAuth()" class="btn-primary text-lg px-10 py-4">
                Get Started Now
              </button>
              <button class="flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-slate-700 hover:bg-white hover:shadow-xl transition-all">
                <div class="p-2 bg-slate-100 rounded-full">
                  <i-lucide name="play" class="w-4 h-4 text-primary fill-primary"></i-lucide>
                </div>
                Watch Demo
              </button>
            </div>
            
            <div class="pt-8 flex items-center gap-8">
              <div class="flex -space-x-4">
                <img *ngFor="let i of [1,2,3,4]" [src]="'https://i.pravatar.cc/100?u=' + i" class="w-12 h-12 rounded-full border-4 border-white shadow-sm" />
              </div>
              <div class="text-sm font-bold text-slate-500">
                <span class="text-slate-900">500+</span> Labs Trust Us
              </div>
            </div>
          </div>

          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-[3rem] blur-3xl -rotate-6"></div>
            <div class="relative bg-white rounded-[3rem] p-4 shadow-2xl border border-slate-100 overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1579154273821-29c193f862f1?auto=format&fit=crop&q=80&w=1000" 
                   class="rounded-[2.5rem] w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-110" 
                   referrerPolicy="no-referrer" />
              <div class="absolute bottom-8 left-8 right-8 glass p-6 rounded-3xl">
                <div class="flex justify-between items-center">
                  <div>
                    <div class="text-xs font-bold text-primary uppercase tracking-widest mb-1">Live Status</div>
                    <div class="text-2xl font-black text-slate-900">12.4k Tests Today</div>
                  </div>
                  <div class="flex items-center gap-2 px-4 py-2 bg-success/10 text-success rounded-full text-xs font-bold">
                    <i-lucide name="check-circle" class="w-4 h-4"></i-lucide>
                    99.9% Uptime
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Features -->
        <div class="mt-40 grid md:grid-cols-3 gap-8">
          <div *ngFor="let f of features" class="card-modern group">
            <div class="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500">
              <i-lucide [name]="f.icon" class="w-6 h-6"></i-lucide>
            </div>
            <h3 class="text-2xl font-extrabold text-slate-900 mb-4">{{f.title}}</h3>
            <p class="text-slate-500 leading-relaxed font-medium">{{f.desc}}</p>
          </div>
        </div>
      </main>

      <!-- Auth Modal (Simplified for demo) -->
      <div *ngIf="isAuthOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" (click)="isAuthOpen = false"></div>
        <div class="relative w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-2xl border border-slate-100">
          <h2 class="text-4xl font-black text-slate-900 mb-2">Welcome Back</h2>
          <p class="text-slate-500 font-medium mb-8">Enter your credentials to access the lab.</p>
          
          <div class="space-y-6">
            <div class="space-y-2">
              <label class="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
              <input type="email" [(ngModel)]="email" placeholder="name@hospital.com" class="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary transition-all" />
            </div>
            <div class="space-y-2">
              <label class="text-xs font-bold text-slate-400 uppercase tracking-widest">Role</label>
              <select [(ngModel)]="role" class="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary transition-all font-bold text-slate-700">
                <option value="ADMIN">Administrator</option>
                <option value="TECHNICIAN">Technician</option>
                <option value="PATHOLOGIST">Pathologist</option>
                <option value="CLINICIAN">Clinician</option>
                <option value="MANAGER">Manager</option>
              </select>
            </div>
            <button (click)="handleLogin()" class="btn-primary w-full py-5 text-lg">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class LandingComponent {
  isAuthOpen = false;
  email = '';
  role = 'TECHNICIAN';

  features = [
    { icon: 'shield', title: 'Identity Service', desc: 'Secure JWT-based authentication with granular role-based access control.' },
    { icon: 'activity', title: 'Real-time Tracking', desc: 'Monitor specimen lifecycle from collection to final authorization.' },
    { icon: 'bar-chart-3', title: 'Smart Analytics', desc: 'Advanced reporting dashboards with predictive diagnostic insights.' }
  ];

  constructor(private auth: AuthService, private router: Router) {}

  openAuth() {
    this.isAuthOpen = true;
  }

  handleLogin() {
    this.auth.login(this.email || 'demo@lab.com', this.role as any);
    this.router.navigate(['/dashboard']);
  }
}
