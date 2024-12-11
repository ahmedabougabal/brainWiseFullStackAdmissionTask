import {Company} from "./company.types";

export interface Department {
    id: number;
    name: string;
    company_id:number;
    company?: Company;
}