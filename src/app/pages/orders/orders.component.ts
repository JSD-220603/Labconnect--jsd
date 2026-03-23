import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from '../../components/dashboard-layout/dashboard-layout.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, DashboardLayoutComponent, LucideAngularModule],
  template: `
    <app-dashboard-layout>
      <div class="space-y-8">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div class="space-y-1">
            <h2 class="text-5xl font-black text-slate-900 tracking-tight">Orders</h2>
            <p class="text-slate-500 font-bold uppercase tracking-widest text-xs">Manage and track laboratory requests</p>
          </div>
          <button class="btn-primary flex items-center gap-2">
            <i-lucide name="plus" class="w-5 h-5"></i-lucide>
            Create New Order
          </button>
        </div>

        <div class="flex flex-col lg:flex-row gap-4">
          <div class="flex-1 relative">
            <i-lucide name="search" class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"></i-lucide>
            <input type="text" placeholder="Search by patient, order ID, or test..." 
                   class="w-full bg-white border-none rounded-2xl py-4 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium" />
          </div>
          <div class="flex gap-2">
            <button class="px-6 py-4 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-widest hover:bg-slate-50 transition-all">
              <i-lucide name="filter" class="w-4 h-4"></i-lucide>
              Filters
            </button>
          </div>
        </div>

        <div class="grid gap-4">
          <div *ngFor="let order of orders" class="card-modern flex flex-col md:flex-row items-center gap-6 group">
            <div class="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-primary font-black text-xs group-hover:bg-primary group-hover:text-white transition-all">
              #{{order.id.split('-')[2]}}
            </div>
            
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-3 mb-1">
                <h4 class="text-lg font-black text-slate-900 truncate">{{order.patientName}}</h4>
                <span class="px-2 py-0.5 bg-slate-100 rounded-lg text-[9px] font-black text-slate-500 uppercase tracking-widest">
                  {{order.id}}
                </span>
              </div>
              <div class="flex flex-wrap gap-2">
                <span *ngFor="let test of order.tests" class="text-[10px] font-bold text-primary uppercase tracking-widest">
                  {{test}}
                </span>
              </div>
            </div>

            <div class="flex items-center gap-8">
              <div class="text-right hidden sm:block">
                <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Created</div>
                <div class="text-xs font-bold text-slate-700">{{order.createdAt}}</div>
              </div>

              <div class="flex items-center gap-2 px-4 py-2 rounded-xl" [ngClass]="getStatusClass(order.status)">
                <i-lucide [name]="getStatusIcon(order.status)" class="w-4 h-4"></i-lucide>
                <span class="text-[10px] font-black uppercase tracking-widest">{{order.status}}</span>
              </div>

              <button class="p-3 hover:bg-slate-100 rounded-xl transition-all">
                <i-lucide name="more-vertical" class="w-5 h-5 text-slate-400"></i-lucide>
              </button>
            </div>
          </div>
        </div>
      </div>
    </app-dashboard-layout>
  `,
  styles: []
})
export class OrdersComponent {
  orders = [
    { id: 'ORD-2026-001', patientName: 'Alice Johnson', tests: ['CBC', 'Lipid Profile'], status: 'COMPLETED', createdAt: 'Today, 09:15' },
    { id: 'ORD-2026-002', patientName: 'Bob Smith', tests: ['HbA1c', 'Liver Function'], status: 'PROCESSING', createdAt: 'Today, 10:30' },
    { id: 'ORD-2026-003', patientName: 'Charlie Brown', tests: ['Thyroid Panel'], status: 'PENDING', createdAt: 'Today, 11:45' },
    { id: 'ORD-2026-004', patientName: 'Diana Prince', tests: ['Urinalysis'], status: 'COLLECTED', createdAt: 'Yesterday, 13:20' },
  ];

  getStatusIcon(status: string) {
    switch (status) {
      case 'COMPLETED': return 'check-circle-2';
      case 'PROCESSING': return 'clock';
      case 'PENDING': return 'alert-circle';
      default: return 'clock';
    }
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'COMPLETED': return 'bg-success/10 text-success';
      case 'PROCESSING': return 'bg-warning/10 text-warning';
      case 'PENDING': return 'bg-slate-100 text-slate-400';
      default: return 'bg-info/10 text-info';
    }
  }
}
