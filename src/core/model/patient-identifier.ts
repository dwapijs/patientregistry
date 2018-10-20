import { EntityBase } from "../../../../sharedkernel/src";
import { Patient } from "./patient";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class PatientIdentifier extends EntityBase {
    @Column()
    idType: string;
    @Column()
    identifier: string;
    @ManyToOne(type => Patient, p => p.identifiers)
    patient: Patient;

    constructor(idType: string, identifier: string, patient: Patient) {
        super();
        this.idType = idType;
        this.identifier = identifier;
        this.patient = patient;
    }

    toString(): string {
        return `${this.idType}:${this.identifier}`;
    }
}