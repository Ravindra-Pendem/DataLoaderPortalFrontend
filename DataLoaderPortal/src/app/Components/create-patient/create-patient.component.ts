import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IPatients } from 'src/app/Interfaces/IPatient';
import { PatientService } from 'src/app/Services/patient.service';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.css']
})
export class CreatePatientComponent implements OnInit {

  excelData:any;
  patientsList:IPatients[];
  displayPatients:MatTableDataSource<IPatients>;

  displayedColumns: string[] = ['patientId', 'patientName', 'patientAddress', 'patientDateOfBirth',
                                'patientEmail','patientContactNumber','patientDrugId','patientDrugName','status','edit'];
  // dataSource: MatTableDataSource<IPatients>(this.displayPa);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _patientService:PatientService, private _router:Router) { }

  ngOnInit(): void {
    this.displayPatients = new MatTableDataSource<any>();

    this._patientService.getPatients()
    .subscribe(
      res => {
        console.log("Base response"+res.userDetils);
        this.displayPatients.data = res.userDetils;
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

  readFile(event: any){
    let file = event.target.files[0];
    let fileReader = new FileReader();

    fileReader.readAsBinaryString(file);
    fileReader.onload = (e) =>{
      var workBook = XLSX.read(fileReader.result, {type: 'binary'});
      var sheetNames = workBook.SheetNames;
      this.excelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]],{
        raw: false,
        // header: this.worksheetHasHeader ? 0 : 1,
        dateNF: "dd/mm/yyyy"
      });
      console.log(this.excelData);
    }

  }

  uploadFile(){
    this.patientsList = this.excelData;
    console.log(this.patientsList);
    this.patientsList.forEach((element) => {
      element.status = "INDUCTED";
    });
    this._patientService.savePatient(this.patientsList)
    .subscribe(
      res => {console.log(res)
              location.reload()},
      err => console.log(err)
    )
  }

  navigateToEdit(patient){
    console.log(patient);
  }

  editPatient(patient:any){
    console.log(patient);
    this._router.navigate(['/edit']);
  }

}
