import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPatients } from '../Interfaces/IPatient';
import { IStatus } from '../Interfaces/IStatus';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private _patientUrl = "http://localhost:8085/patient/load/patientdata";

  constructor(private http: HttpClient) { }

  savePatient(patients: IPatients[]){
    return this.http.post<Array<IPatients>>(this._patientUrl,patients);
  }

  getPatients(){
    return this.http.get<IStatus>(this._patientUrl);
  }
  
}
