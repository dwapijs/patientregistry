import { AggregateRoot } from "../../../../sharedkernel/src";
import { Column, Entity, OneToMany } from "typeorm";
import { PatientIdentifier } from "./patient-identifier";

@Entity()
export class Patient extends AggregateRoot {
    @Column()
    names: string;
    @Column()
    gender: string;
    @Column()
    birthDate: Date;
    @OneToMany(type => PatientIdentifier, p => p.patient, {cascade: true, eager: true})
    identifiers: PatientIdentifier[];

    constructor(names: string, gender: string, birthDate: Date) {
        super();
        this.names = names;
        this.gender = gender;
        this.birthDate = birthDate;
    }

    addIdentifier(identifier: PatientIdentifier) {
        if (!this.identifiers) {
            this.identifiers = [];
        }
        this.identifiers.push(identifier);
    }

    toString(): string {
        return `${this.names},${this.gender}`;
    }
}