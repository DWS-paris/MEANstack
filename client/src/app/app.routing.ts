import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { CoursesComponent } from './components/courses/courses.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'courses/:link',
    component: CoursesComponent
  }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);