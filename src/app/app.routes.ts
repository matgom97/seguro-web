import { Routes } from '@angular/router';
import { RegisterFormComponent } from './register/register-form/register-form.component';
import { InsuranceListComponent } from './management/insurance-list/insurance-list.component';
import { EditInsuranceComponent } from './management/edit-insurance/edit-insurance.component';

export const routes: Routes = [
  { path: 'management', component: InsuranceListComponent },
  { path: 'edit-insurance/:id', component: EditInsuranceComponent },
  { path: 'register', component: RegisterFormComponent },

  { path: '', redirectTo: '/management', pathMatch: 'full' }
];
