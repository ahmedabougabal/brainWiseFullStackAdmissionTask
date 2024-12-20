import {Company} from "./company.types";
import {Department} from "./department.types";

export interface Employee {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    designation: string;
    mobile_number: string;
    address: string;
    hired_on: string;
    status: 'HIRED' | 'NOT_ACCEPTED' | 'PENDING';
    company_id: number;
    department_id: number;
    company?: Company;
    department?: Department;
}