import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from '../../components/dashboard-layout/dashboard-layout.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, DashboardLayoutComponent, LucideAngularModule],
  template: `
    <app-dashboard-layout>
      <div class="space-y-10">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div class="space-y-1">
            <h2 class="text-5xl font-black text-slate-900 tracking-tight">Catalog</h2>
            <p class="text-slate-500 font-bold uppercase tracking-widest text-xs">Laboratory test directory and pricing</p>
          </div>
          <button class="btn-primary flex items-center gap-2">
            <i-lucide name="plus" class="w-5 h-5"></i-lucide>
            Add New Test
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div *ngFor="let test of tests" class="card-modern group relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[5rem] -mr-16 -mt-16 transition-all group-hover:bg-primary/10 group-hover:scale-110"></div>
            
            <div class="flex justify-between items-start mb-8">
              <div class="p-3 bg-slate-50 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <i-lucide name="layers" class="w-6 h-6"></i-lucide>
              </div>
              <div class="text-2xl font-black text-slate-900">
                {{ '$' }} {{test.price}}
              </div>
            </div>

            <div class="space-y-4 mb-10">
              <div>
                <div class="text-[10px] font-black text-primary uppercase tracking-widest mb-1">{{test.category}}</div>
                <h3 class="text-2xl font-black text-slate-900">{{test.name}}</h3>
              </div>
              
              <div class="flex flex-wrap gap-2">
                <span *ngFor="let p of test.parameters" class="px-3 py-1 bg-slate-50 rounded-xl text-[9px] font-black text-slate-500 uppercase tracking-widest">
                  {{p}}
                </span>
              </div>
            </div>

            <div class="flex justify-end gap-2 pt-6 border-t border-slate-50">
              <button class="p-3 hover:bg-slate-50 rounded-xl transition-all text-slate-400 hover:text-primary">
                <i-lucide name="edit-2" class="w-4 h-4"></i-lucide>
              </button>
              <button class="p-3 hover:bg-danger/10 rounded-xl transition-all text-slate-400 hover:text-danger">
                <i-lucide name="trash-2" class="w-4 h-4"></i-lucide>
              </button>
            </div>
          </div>
        </div>
      </div>
    </app-dashboard-layout>
  `,
  styles: []
})
export class CatalogComponent {
  tests = [
    { id: 'T-001', name: 'Complete Blood Count', category: 'Hematology', price: 25.00, parameters: ['WBC', 'RBC', 'HGB', 'HCT', 'PLT'] },
    { id: 'T-002', name: 'Lipid Profile', category: 'Biochemistry', price: 45.00, parameters: ['Cholesterol', 'Triglycerides', 'HDL', 'LDL'] },
    { id: 'T-003', name: 'HbA1c', category: 'Endocrinology', price: 35.00, parameters: ['Glycated Hemoglobin'] },
    { id: 'T-004', name: 'Liver Function Test', category: 'Biochemistry', price: 55.00, parameters: ['ALT', 'AST', 'ALP', 'Bilirubin'] },
  ];
}
