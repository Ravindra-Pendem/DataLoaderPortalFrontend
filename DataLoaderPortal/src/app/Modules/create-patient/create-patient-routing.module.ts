import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePatientComponent } from 'src/app/Components/create-patient/create-patient.component';

const routes: Routes = [
  {path:'', component:CreatePatientComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatePatientRoutingModule { }
