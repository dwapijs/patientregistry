import "reflect-metadata";
import { createConnection } from "typeorm";
import * as fs from "fs";
import { Patient } from "../../src/core/model/patient";
import { PatientIdentifier } from "../../src/core/model/patient-identifier";
import { PatientRepository } from "../../src/infrastructure/patient-repository";


describe("Patient Repository", () => {
    const dbPath: string = "test/dwapitest.sqlite3";
    let patientRepository: PatientRepository;

    const patients = [
        new Patient("Mary Doe", "F", new Date(1999, 2, 3)),
        new Patient("Bob Lee Swagger", "M", new Date(1985, 11, 25)),
    ];

    patients[0].addIdentifier(new PatientIdentifier("NationalID", "222", patients[0]));
    patients[0].addIdentifier(new PatientIdentifier("NHIF", "3094", patients[0]));
    patients[1].addIdentifier(new PatientIdentifier("NHIF", "4545-09", patients[1]));

    beforeAll(async () => {
        fs.unlink(dbPath, (err) => {
                if (err) {
                    console.log(err);
                }
                console.log("db deleted !");
            }
        );
        const connection = await createConnection({
            logging: true,
            type: "sqlite",
            database: dbPath,
            entities: ["./src/core/model/*.ts"],
            synchronize: true
        });
        patientRepository = new PatientRepository(Patient, connection);
        await patientRepository.create(patients[1]);
    });

    test("should create patient with Identifiers", async () => {
        await patientRepository.create(patients[0]);
        const partient = await patientRepository.get(patients[0].id);
        expect(partient.identifiers.length > 0);
        console.log(`${partient}`);
        partient.identifiers.forEach((f) => console.log(`> ${f}`));
    });
});