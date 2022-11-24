import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
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
  patientsList: IPatients[];
  displayPatients: MatTableDataSource<IPatients>;
  durationInSeconds = 5;

  displayedColumns: string[] = ['patientId', 'patientName', 'patientAddress', 'patientDateOfBirth',
    'patientEmail', 'patientContactNumber', 'patientDrugId', 'patientDrugName', 'status', 'edit'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _patientService: PatientService, private _router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.displayPatients = new MatTableDataSource<any>();

    this._patientService.getPatients()
      .subscribe(
        res => {
          console.log("Base response" + res.data);
          this.displayPatients.data = res.data;
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
        // header: this.worksheetHasHeader ? 0 : 1,
        dateNF: "dd/mm/yyyy"
      });
      console.log(this.excelData);
    }

  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  uploadFile() {
    this.patientsList = this.excelData;
    console.log(this.patientsList);
    if (this.patientsList != undefined) {
      this.patientsList.forEach((element) => {
        element.status = "INDUCTED";
      });
    }
    this._patientService.savePatient(this.patientsList)
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
          // this._patientService.getPatients()
          //   .subscribe(
          //     res => {
          //       console.log("Base response" + res.data);
          //       this.displayPatients.data = res.data;
          //     },
          //     err => console.log(err)
          //   )
        },
        err => {
          console.log(err)
          const dialogRef = this.dialog.open(AlertDialogComponent, {
            disableClose: true,
            panelClass: 'red-dialog',
            data: { message: "Please Upload File Correctly"},
          });
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
          });
        }
      )
  }

  navigateToEdit(patient) {
    console.log(patient);
  }

  editPatient(patient: any) {
    console.log(patient);
    this._patientService.patient = patient;
    this._router.navigate(['/edit']);
  }

}
