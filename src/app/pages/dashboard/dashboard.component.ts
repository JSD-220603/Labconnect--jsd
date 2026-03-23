import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from '../../components/dashboard-layout/dashboard-layout.component';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DashboardLayoutComponent, LucideAngularModule],
  template: `
    <app-dashboard-layout>
      <div class="space-y-10">
        <!-- Welcome Section -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div class="space-y-2">
            <h2 class="text-5xl font-black text-slate-900 tracking-tight">Dashboard</h2>
            <p class="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs">
              Welcome back, <span class="text-primary">{{user()?.username}}</span> • {{user()?.role}}
            </p>
          </div>
          <div class="flex gap-3">
            <button class="btn-primary flex items-center gap-2">
              <i-lucide name="clipboard-list" class="w-4 h-4"></i-lucide>
              New Order
            </button>
          </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div *ngFor="let stat of stats" class="card-modern group hover:bg-primary transition-all duration-500">
            <div class="flex justify-between items-start mb-6">
              <div class="p-3 rounded-2xl bg-slate-50 group-hover:bg-white/20 transition-colors">
                <i-lucide [name]="stat.icon" [class]="'w-6 h-6 ' + stat.color + ' group-hover:text-white'"></i-lucide>
              </div>
              <div class="flex items-center gap-1 text-success font-bold text-xs group-hover:text-white">
                <i-lucide name="arrow-up-right" class="w-3 h-3"></i-lucide>
                {{stat.trend}}
              </div>
            </div>
            <div class="text-4xl font-black text-slate-900 group-hover:text-white mb-1">{{stat.value}}</div>
            <div class="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-white/60">{{stat.label}}</div>
          </div>
        </div>

        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Main Chart Placeholder -->
          <div class="lg:col-span-2 card-modern">
            <div class="flex justify-between items-center mb-10">
              <h3 class="text-xl font-black text-slate-900">Lab Throughput</h3>
              <select class="bg-slate-50 border-none rounded-xl text-xs font-bold uppercase tracking-widest p-2">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div class="h-[300px] flex items-end gap-4 px-4">
              <div *ngFor="let d of [40, 70, 55, 90, 65, 85, 50]" 
                   class="flex-1 bg-primary/10 rounded-t-2xl relative group cursor-pointer hover:bg-primary transition-all"
                   [style.height.%]="d">
                <div class="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {{d}}%
                </div>
              </div>
            </div>
            <div class="flex justify-between mt-6 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>

          <!-- Alerts / Notifications -->
          <div class="card-modern">
            <h3 class="text-xl font-black text-slate-900 mb-8">Critical Alerts</h3>
            <div class="space-y-4">
              <div *ngFor="let alert of alerts" class="p-4 rounded-2xl bg-danger/5 border border-danger/10 flex gap-4 items-start">
                <div class="p-2 bg-danger/10 rounded-xl">
                  <i-lucide name="alert-circle" class="w-4 h-4 text-danger"></i-lucide>
                </div>
                <div>
                  <div class="text-sm font-black text-slate-900">{{alert.title}}</div>
                  <div class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{{alert.time}}</div>
                </div>
              </div>
              <button class="w-full py-4 text-xs font-bold text-primary uppercase tracking-widest hover:bg-primary/5 rounded-2xl transition-all">
                View All Notifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </app-dashboard-layout>
  `,
  styles: []
})
export class DashboardComponent {
  user = this.auth.user;

  stats = [
    { label: 'Active Orders', value: '124', icon: 'clipboard-list', color: 'text-primary', trend: '+12%' },
    { label: 'Pending Results', value: '42', icon: 'activity', color: 'text-warning', trend: '+5%' },
    { label: 'Total Patients', value: '1.2k', icon: 'users', color: 'text-success', trend: '+18%' },
    { label: 'Critical Alerts', value: '03', icon: 'alert-circle', color: 'text-danger', trend: '-2%' },
  ];

  alerts = [
    { title: 'High Glucose: Patient #823', time: '12 mins ago' },
    { title: 'QC Failure: Cobas 6000', time: '45 mins ago' },
    { title: 'Delayed Result: Order #129', time: '1 hour ago' },
  ];

  constructor(private auth: AuthService) {}
}
