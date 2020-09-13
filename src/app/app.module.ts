import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeSearchComponent } from './employee-search/employee-search.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* import { DateAdapter } from '@angular/material/core';
import {  MAT_DATE_FORMATS } from '@angular/material/core'; */

import { MatDatepickerModule } from '@angular/material/Datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';


/* import { I18N_DATE_FORMATS } from './I18nDateAdapter';
import { I18nDateAdapter } from './I18nDateAdapter';  */

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);


import { NgSelectModule } from '@ng-select/ng-select';
import { ProfessionsComponent } from './professions/professions.component';
import { QualificationsComponent } from './qualifications/qualifications.component';

import { DualListComponent } from './dual-list/dual-list.component';
import { TeamsComponent } from './teams/teams.component';



@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeDetailComponent,
    MessagesComponent,
    DashboardComponent,
    EmployeeSearchComponent,
    ProfessionsComponent,
    QualificationsComponent,
    DualListComponent,
    TeamsComponent

  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgSelectModule 
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' }
/*     ,{ provide: DateAdapter, useClass: I18nDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: I18N_DATE_FORMATS } */
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
