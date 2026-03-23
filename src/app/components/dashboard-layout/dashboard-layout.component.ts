import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule, RouterLink, RouterLinkActive, 
    LucideAngularModule
  ],
  template: `
    <div class="flex h-screen bg-bg-main overflow-hidden font-sans">
      <!-- Mobile Sidebar Overlay -->
      <div *ngIf="isMobileMenuOpen" 
           class="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
           (click)="isMobileMenuOpen = false"></div>

      <!-- Sidebar -->
      <aside [class.translate-x-0]="isMobileMenuOpen"
             [class.-translate-x-full]="!isMobileMenuOpen"
             class="fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-100 transition-transform duration-300 lg:relative lg:translate-x-0 flex flex-col">
        
        <div class="p-8 flex items-center gap-3">
          <div class="p-2 bg-primary rounded-xl shadow-lg shadow-primary/20">
            <i-lucide name="flask-conical" class="w-6 h-6 text-white"></i-lucide>
          </div>
          <span class="text-2xl font-black tracking-tight text-slate-900">Lab<span class="text-primary">Connect</span></span>
        </div>

        <nav class="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          <div *ngFor="let section of menuSections" class="pb-6">
            <h4 class="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">{{section.title}}</h4>
            <div class="space-y-1">
              <a *ngFor="let item of section.items"
                 [routerLink]="item.path"
                 routerLinkActive="bg-primary/10 text-primary shadow-sm"
                 [routerLinkActiveOptions]="{exact: true}"
                 class="flex items-center gap-4 px-4 py-3 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all group">
                <i-lucide [name]="item.icon" class="w-5 h-5 group-hover:scale-110 transition-transform"></i-lucide>
                {{item.label}}
                <i-lucide *ngIf="item.badge" name="chevron-right" class="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity"></i-lucide>
              </a>
            </div>
          </div>
        </nav>

        <div class="p-6 border-t border-slate-50">
          <div class="bg-slate-50 rounded-3xl p-4 flex items-center gap-4">
            <div class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-black text-primary shadow-sm">
              {{user()?.username?.[0]?.toUpperCase()}}
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-sm font-black text-slate-900 truncate">{{user()?.username}}</div>
              <div class="text-[10px] font-bold text-primary uppercase tracking-widest">{{user()?.role}}</div>
            </div>
            <button (click)="logout()" class="p-2 text-slate-400 hover:text-danger hover:bg-danger/10 rounded-xl transition-all">
              <i-lucide name="log-out" class="w-5 h-5"></i-lucide>
            </button>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
        <!-- Header -->
        <header class="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-8 z-30">
          <div class="flex items-center gap-4">
            <button (click)="isMobileMenuOpen = true" class="lg:hidden p-2 hover:bg-slate-100 rounded-xl">
              <i-lucide name="menu" class="w-6 h-6"></i-lucide>
            </button>
            <div class="relative hidden md:block w-96">
              <i-lucide name="search" class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"></i-lucide>
              <input type="text" placeholder="Search anything..." 
                     class="w-full bg-slate-50 border-none rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all" />
            </div>
          </div>

          <div class="flex items-center gap-4">
            <button class="relative p-3 hover:bg-slate-50 rounded-2xl transition-all group">
              <i-lucide name="bell" class="w-5 h-5 text-slate-600 group-hover:text-primary"></i-lucide>
              <span class="absolute top-3 right-3 w-2.5 h-2.5 bg-danger rounded-full border-2 border-white"></span>
            </button>
            <button class="p-3 hover:bg-slate-50 rounded-2xl transition-all group">
              <i-lucide name="settings" class="w-5 h-5 text-slate-600 group-hover:text-primary"></i-lucide>
            </button>
            <div class="h-8 w-px bg-slate-100 mx-2"></div>
            <div class="hidden sm:flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-2xl">
              <div class="w-2 h-2 rounded-full bg-success animate-pulse"></div>
              <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest">System Live</span>
            </div>
          </div>
        </header>

        <!-- Page View -->
        <main class="flex-1 overflow-y-auto p-8">
          <div class="max-w-7xl mx-auto">
            <ng-content></ng-content>
          </div>
        </main>
      </div>
    </div>
  `,
  styles: []
})
export class DashboardLayoutComponent {
  isMobileMenuOpen = false;
  user = this.auth.user;

  menuSections = [
    {
      title: 'Main',
      items: [
        { path: '/dashboard', label: 'Overview', icon: 'layout-dashboard', badge: false },
        { path: '/orders', label: 'Lab Orders', icon: 'clipboard-list', badge: true },
        { path: '/workflow', label: 'Workflow', icon: 'activity', badge: false },
      ]
    },
    {
      title: 'Diagnostics',
      items: [
        { path: '/results', label: 'Test Results', icon: 'beaker', badge: true },
        { path: '/catalog', label: 'Test Catalog', icon: 'file-text', badge: false },
        { path: '/qc', label: 'Quality Control', icon: 'shield-check', badge: false },
      ]
    }
  ];

  constructor(private auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
