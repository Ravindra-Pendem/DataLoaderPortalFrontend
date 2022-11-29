import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditPatientComponent } from 'src/app/Components/edit-patient/edit-patient.component';

const routes: Routes = [
  { path: '', component: EditPatientComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditPatientRoutingModule { }
