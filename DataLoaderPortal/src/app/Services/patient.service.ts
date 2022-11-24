import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_constants } from '../Constants/url_constants';
import { IPatients } from '../Interfaces/IPatient';
import { IStatus } from '../Interfaces/IStatus';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  public patient:IPatients;

  constructor(private http: HttpClient) { }

  savePatient(patients: IPatients[]){
    return this.http.post<Array<IPatients>>(`${url_constants.SAVE_PATIENT}`,patients);
  }

  getPatients(){
    return this.http.get<IStatus>(`${url_constants.GET_PATIENT}`);
  }

  updatePatient(patient: IPatients){
    return this.http.put<IPatients>(`${url_constants.UPDATE_PATIENT}`,patient);
  }
  
}
