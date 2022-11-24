import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePatientComponent } from './Components/create-patient/create-patient.component';
import { EditPatientComponent } from './Components/edit-patient/edit-patient.component';
import { LoginComponent } from './Components/login/login.component';
import { AuthGuard } from './Services/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'create', component: CreatePatientComponent, canActivate: [AuthGuard] },
  { path: 'edit', component: EditPatientComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
