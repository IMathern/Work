import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeDetailComponent }  from './employee-detail/employee-detail.component';
import { DashboardComponent }   from './dashboard/dashboard.component';

import { ProfessionsComponent } from './professions/professions.component';
import { QualificationsComponent } from './qualifications/qualifications.component';

import { DualListComponent } from './dual-list/dual-list.component';
import { TeamsComponent } from './teams/teams.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: EmployeeDetailComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'professions', component: ProfessionsComponent },
  { path: 'qualifications', component: QualificationsComponent },
  { path: 'dual-list', component: DualListComponent },
  { path: 'teams', component: TeamsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
