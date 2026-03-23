import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from '../../components/dashboard-layout/dashboard-layout.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-workflow',
  standalone: true,
  imports: [CommonModule, DashboardLayoutComponent, LucideAngularModule],
  template: `
    <app-dashboard-layout>
      <div class="space-y-10">
        <div class="space-y-1">
          <h2 class="text-5xl font-black text-slate-900 tracking-tight">Workflow</h2>
          <p class="text-slate-500 font-bold uppercase tracking-widest text-xs">Laboratory processing pipeline monitoring</p>
        </div>

        <!-- Pipeline Visualizer -->
        <div class="card-modern p-10 bg-gradient-to-br from-white to-slate-50">
          <div class="flex flex-col md:flex-row justify-between items-center gap-8 relative">
            <div class="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 hidden md:block z-0"></div>
            
            <div *ngFor="let stage of stages; let i = index" class="relative z-10 flex flex-col items-center gap-4">
              <div class="w-20 h-20 rounded-3xl flex items-center justify-center border-4 border-white shadow-xl transition-all duration-500"
                   [ngClass]="i <= activeStage ? 'bg-primary text-white scale-110' : 'bg-white text-slate-300'">
                <i-lucide [name]="stage.icon" class="w-8 h-8"></i-lucide>
              </div>
              <div class="text-center">
                <div class="text-xs font-black uppercase tracking-widest" [ngClass]="i <= activeStage ? 'text-primary' : 'text-slate-400'">
                  {{stage.label}}
                </div>
                <div class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                  {{stage.count}} Samples
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid lg:grid-cols-2 gap-8">
          <!-- Active Runs -->
          <div class="card-modern">
            <div class="flex justify-between items-center mb-8">
              <h3 class="text-xl font-black text-slate-900">Instrument Status</h3>
              <div class="flex items-center gap-2 px-3 py-1 bg-success/10 text-success rounded-full text-[10px] font-black uppercase tracking-widest">
                <span class="w-1.5 h-1.5 rounded-full bg-success animate-ping"></span>
                Live
              </div>
            </div>
            
            <div class="space-y-8">
              <div *ngFor="let run of runs" class="space-y-3">
                <div class="flex justify-between items-end">
                  <div>
                    <div class="text-sm font-black text-slate-900">{{run.name}}</div>
                    <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{run.test}}</div>
                  </div>
                  <div class="text-[10px] font-black text-primary uppercase tracking-widest">{{run.progress}}%</div>
                </div>
                <div class="h-3 bg-slate-50 rounded-full overflow-hidden">
                  <div class="h-full bg-primary rounded-full transition-all duration-1000" [style.width.%]="run.progress"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Transition Log -->
          <div class="card-modern">
            <h3 class="text-xl font-black text-slate-900 mb-8">Recent Transitions</h3>
            <div class="space-y-4">
              <div *ngFor="let log of logs" class="p-4 rounded-2xl bg-slate-50 flex items-center justify-between group hover:bg-white hover:shadow-lg transition-all">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                    <i-lucide name="arrow-right" class="w-4 h-4"></i-lucide>
                  </div>
                  <div>
                    <div class="text-sm font-black text-slate-900">{{log.orderId}}</div>
                    <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Moved to {{log.stage}}</div>
                  </div>
                </div>
                <div class="text-[10px] font-black text-slate-300 uppercase tracking-widest">{{log.time}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </app-dashboard-layout>
  `,
  styles: []
})
export class WorkflowComponent {
  activeStage = 2;
  stages = [
    { label: 'Accessioning', icon: 'flask-conical', count: 24 },
    { label: 'Pre-Analytical', icon: 'clock', count: 18 },
    { label: 'Analytical', icon: 'microscope', count: 42 },
    { label: 'Post-Analytical', icon: 'check-circle-2', count: 12 },
  ];

  runs = [
    { name: 'Cobas 6000', test: 'Chemistry Panel', progress: 65 },
    { name: 'Sysmex XN-1000', test: 'Hematology Diff', progress: 30 },
    { name: 'Architect i2000', test: 'Immunoassay', progress: 90 },
  ];

  logs = [
    { orderId: 'ORD-8234', stage: 'Analytical', time: '2m ago' },
    { orderId: 'ORD-1290', stage: 'Post-Analytical', time: '15m ago' },
    { orderId: 'ORD-5542', stage: 'Pre-Analytical', time: '22m ago' },
  ];
}
