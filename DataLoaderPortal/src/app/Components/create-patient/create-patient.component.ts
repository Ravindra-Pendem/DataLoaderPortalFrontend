import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IPatients } from 'src/app/Interfaces/IPatient';
import { PatientService } from 'src/app/Services/patient.service';
import * as XLSX from 'xlsx'
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.css']
})
export class CreatePatientComponent implements OnInit {

  excelData: any;
  patientsForm: FormGroup;
  patientsList: IPatients[];
  displayPatients: MatTableDataSource<IPatients>;
  durationInSeconds = 5;

  displayedColumns: string[] = ['patientId', 'patientName', 'patientAddress', 'patientDateOfBirth',
    'patientEmail', 'patientContactNumber', 'patientDrugId', 'patientDrugName', 'status', 'edit'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _patientService: PatientService, private _router: Router, public dialog: MatDialog,
    private fb: FormBuilder) {

    this.patientsForm =
      this.fb.group({
        patients: fb.array([]),
      })

  }

  ngOnInit(): void {
    this.displayPatients = new MatTableDataSource<any>();

    this._patientService.getPatients()
      .subscribe(
        res => {
          console.log("Base response" + JSON.stringify(res.data));
          let patientData = [];
          res.data.forEach((element) => {
            if (element.status != "FAILED") {
              patientData.push(element);
            }
          });
          this.displayPatients.data = patientData;
        },
        err => console.log(err)
      )

  }

  ngAfterViewInit() {
    this.displayPatients.paginator = this.paginator;
    this.displayPatients.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.displayPatients.filter = filterValue.trim().toLowerCase();

    if (this.displayPatients.paginator) {
      this.displayPatients.paginator.firstPage();
    }
  }

  readFile(event: any) {
    let file = event.target.files[0];
    let fileReader = new FileReader();

    fileReader.readAsBinaryString(file);
    fileReader.onload = (e) => {
      var workBook = XLSX.read(fileReader.result, { type: 'binary' });
      var sheetNames = workBook.SheetNames;
      this.excelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]], {
        raw: false,
        dateNF: "mm/dd/yyyy"
      });
      console.log(this.excelData);
    }

  }

  uploadFile() {
    this.patientsList = this.excelData;
    console.log(this.patientsList);

    if (this.patientsList != undefined) {
      this.patientsList.forEach((element) => {
        element.status = "INDUCTED";
      });
    }

    let patients = this.patientsForm.get('patients') as FormArray;
    this.patientsList.forEach((ele, index) => {
      patients.push(this.patientsFormControl());
      patients.at(patients.length - 1).setValue(ele);
    });

    if (this.patientsForm.invalid) {
      const patientsControl = this.patientsForm.get('patients') as FormArray;
      patientsControl.controls.forEach((ele) => {
        if (ele.invalid) {
          ele.get('status').setValue("FAILED");
        }
      });

    }
    console.log(this.patientsForm);
    this._patientService.savePatient(this.patientsForm.get('patients').value)
      .subscribe(
        res => {
          console.log(res)
          const dialogRef = this.dialog.open(AlertDialogComponent, {
            disableClose: true,
            panelClass: 'green-dialog',
            data: { message: "File Uploaded Successfully" },
          });
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            location.reload();
          });
        },
        err => {
          console.log(err)
          const dialogRef = this.dialog.open(AlertDialogComponent, {
            disableClose: true,
            panelClass: 'red-dialog',
            data: { message: "Please Upload File." },
          });
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
          });
        }
      )
  }

  patientsFormControl(): FormGroup {
    return this.fb.group({
      patientName: ['', [Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.maxLength(30), Validators.minLength(5)]],
      patientAddress: [''],
      patientDateOfBirth: [''],
      patientEmail: ['', [Validators.required, Validators.email]],
      patientContactNumber: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      patientDrugId: ['', [Validators.required]],
      patientDrugName: [''],
      status: ['']
    })
  }
  // (?:\(\d{5}\)|\d{5}-)\d{4}-\d{2}

  navigateToEdit(patient) {
    console.log(patient);
  }

  editPatient(patient: IPatients) {
    console.log(patient);
    sessionStorage.setItem('patient', JSON.stringify(patient));
    this._router.navigate(['/edit']);
  }

}
