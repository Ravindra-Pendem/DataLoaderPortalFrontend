import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatePatientRoutingModule } from './create-patient-routing.module';
import { CreatePatientComponent } from 'src/app/Components/create-patient/create-patient.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PatientService } from 'src/app/Services/patient.service';
import { TokenInterceptorService } from 'src/app/Services/token-interceptor.service';
import { FooterComponent } from 'src/app/Components/footer/footer.component';
import { HeaderComponent } from 'src/app/Components/header/header.component';

@NgModule({
  declarations: [
    CreatePatientComponent
  ],
  imports: [
    CommonModule,
    CreatePatientRoutingModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDialogModule,
    MatGridListModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    PatientService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }, FooterComponent, HeaderComponent
  ]
})
export class CreatePatientModule { }
