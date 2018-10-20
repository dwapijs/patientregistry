import { RepositoryBase } from "../../../sharedkernel/src";
import { Patient } from "../core/model/patient";
import { IPatientRepository } from "../core/interfaces/ipatient-repository";

export class PatientRepository extends RepositoryBase<Patient> implements IPatientRepository {
}