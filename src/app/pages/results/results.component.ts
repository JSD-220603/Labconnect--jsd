import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from '../../components/dashboard-layout/dashboard-layout.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, DashboardLayoutComponent, LucideAngularModule],
  template: `
    <app-dashboard-layout>
      <div class="space-y-8">
        <div class="flex justify-between items-center">
          <div class="space-y-1">
            <h2 class="text-5xl font-black text-slate-900 tracking-tight">Results</h2>
            <p class="text-slate-500 font-bold uppercase tracking-widest text-xs">Diagnostic verification and authorization</p>
          </div>
          <button class="btn-primary flex items-center gap-2">
            <i-lucide name="user-check" class="w-5 h-5"></i-lucide>
            Authorize All
          </button>
        </div>

        <div class="grid lg:grid-cols-4 gap-8">
          <!-- Sidebar Filters -->
          <div class="lg:col-span-1 space-y-6">
            <div class="card-modern space-y-6">
              <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest">Quick Filters</h3>
              <div class="space-y-2">
                <button *ngFor="let f of ['All Results', 'Pending Review', 'Critical Values', 'Authorized']"
                        class="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
                  {{f}}
                </button>
              </div>
              <div class="pt-6 border-t border-slate-50">
                <div class="flex items-center gap-3 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                  <i-lucide name="shield-check" class="w-5 h-5 text-primary"></i-lucide>
                  <div class="text-[10px] font-black text-primary uppercase tracking-widest">QC Verified</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Results List -->
          <div class="lg:col-span-3 space-y-6">
            <div *ngFor="let res of results" class="card-modern group overflow-hidden relative">
              <div class="absolute top-0 left-0 w-1.5 h-full" [ngClass]="res.status === 'FINAL' ? 'bg-success' : 'bg-warning'"></div>
              
              <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                <div>
                  <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{{res.orderId}}</div>
                  <h4 class="text-2xl font-black text-slate-900">{{res.testName}}</h4>
                </div>
                <div class="flex items-center gap-3">
                  <div class="text-right">
                    <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</div>
                    <div class="text-xs font-bold" [ngClass]="res.status === 'FINAL' ? 'text-success' : 'text-warning'">{{res.status}}</div>
                  </div>
                  <div class="h-8 w-px bg-slate-100 mx-2"></div>
                  <button class="p-3 bg-slate-50 rounded-xl hover:bg-primary hover:text-white transition-all">
                    <i-lucide name="check-circle-2" class="w-5 h-5"></i-lucide>
                  </button>
                </div>
              </div>

              <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div class="col-span-1">
                  <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Result</div>
                  <div class="text-4xl font-black text-slate-900">
                    {{res.value}} <span class="text-sm font-bold text-slate-400">{{res.unit}}</span>
                  </div>
                </div>
                <div class="col-span-1">
                  <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Reference</div>
                  <div class="text-sm font-black text-slate-700">{{res.referenceRange}}</div>
                </div>
                <div class="col-span-2 md:text-right">
                  <div *ngIf="res.authorizedBy" class="inline-flex flex-col items-end">
                    <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Authorized By</div>
                    <div class="px-4 py-2 bg-success/5 text-success rounded-xl text-xs font-black uppercase tracking-widest border border-success/10">
                      {{res.authorizedBy}}
                    </div>
                  </div>
                  <button *ngIf="!res.authorizedBy" class="btn-primary py-3 px-8 text-xs">
                    Verify Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </app-dashboard-layout>
  `,
  styles: []
})
export class ResultsComponent {
  results = [
    { id: 'RES-001', orderId: 'ORD-2026-001', testName: 'Hemoglobin', value: '14.2', unit: 'g/dL', referenceRange: '13.5 - 17.5', status: 'FINAL', authorizedBy: 'Dr. Sarah Wilson' },
    { id: 'RES-002', orderId: 'ORD-2026-001', testName: 'WBC Count', value: '7.5', unit: 'x10^9/L', referenceRange: '4.5 - 11.0', status: 'FINAL', authorizedBy: 'Dr. Sarah Wilson' },
    { id: 'RES-003', orderId: 'ORD-2026-002', testName: 'Glucose (Fasting)', value: '112', unit: 'mg/dL', referenceRange: '70 - 99', status: 'PRELIMINARY' },
  ];
}
