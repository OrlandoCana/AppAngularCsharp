import { SaleConcept } from "./saleConcept";

export interface Sale {
    idClient: number;
    concepts: SaleConcept[];
}