import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IPatients } from 'src/app/Interfaces/IPatient';
import { PatientService } from 'src/app/Services/patient.service';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.css']
})
export class EditPatientComponent implements OnInit {

  edit: boolean = false;
  editPatient: FormGroup;

  constructor(private fb: FormBuilder, private _patientService: PatientService, private _router: Router, public dialog: MatDialog) {

    this.editPatient = this.fb.group({
      patientId: [''],
      patientName: [''],
      patientAddress: [''],
      patientDateOfBirth: [''],
      patientEmail: [''],
      patientContactNumber: [''],
      patientDrugId: [''],
      patientDrugName: [''],
      status: ['']
    });
  }

  ngOnInit(): void {
    let patient: IPatients;
    patient = JSON.parse(sessionStorage.getItem('patient').toString());
    this.editPatient.setValue(patient);
    this.editPatient.get('patientDateOfBirth').setValue(formatDate(this.editPatient.get('patientDateOfBirth').value, 'yyyy-MM-dd', 'en'));
  }

  changeEditForSave() {
    this.edit = !this.edit;
    this.editPatient.disable();
  }

  changeEditForEdit() {
    this.edit = !this.edit;
    this.editPatient.enable();
  }

  saveEditPatient() {
    this._patientService.updatePatient(this.editPatient.value).subscribe(
      res => {
        console.log(res)
        const dialogRef = this.dialog.open(AlertDialogComponent, {
          disableClose: true,
          panelClass: 'green-dialog',
          data: { message: "Details Saved Successfully." },
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this._router.navigate(['/create'])
        });
      },
      err => console.log(err)
    )
  }

}
