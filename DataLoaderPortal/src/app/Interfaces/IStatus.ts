import { IPatients } from "./IPatient";

export interface IStatus{
    statusCode: number,
    statusMessage: string,
    userDetils: IPatients[]
}