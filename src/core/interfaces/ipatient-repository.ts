import { IRepositoryBase } from "../../../../sharedkernel/src";
import { Patient } from "../model/patient";

export interface IPatientRepository extends IRepositoryBase <Patient> {
}