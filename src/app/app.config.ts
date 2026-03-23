import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LucideAngularModule, FlaskConical, Shield, Activity, ClipboardList, Users, BarChart3, ChevronRight, Play, CheckCircle, LayoutDashboard, Beaker, FileText, ShieldCheck, Bell, Settings, LogOut, Search, Menu, X, Plus, MoreVertical, CheckCircle2, AlertCircle, Layers, Edit2, Trash2, Microscope, ArrowRight, ArrowUpRight, UserCheck } from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(LucideAngularModule.pick({
      FlaskConical, Shield, Activity, ClipboardList, Users, BarChart3, ChevronRight, Play, CheckCircle, LayoutDashboard, Beaker, FileText, ShieldCheck, Bell, Settings, LogOut, Search, Menu, X, Plus, MoreVertical, CheckCircle2, AlertCircle, Layers, Edit2, Trash2, Microscope, ArrowRight, ArrowUpRight, UserCheck
    }))
  ]
};
