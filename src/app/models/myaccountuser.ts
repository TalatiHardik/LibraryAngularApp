import { User } from "../user";

export class Myaccountuser implements User {
    email!: string;
    pwd!: string;
    phone!: string;
    fname!: string;
    lname!: string;
    city!: string;
    sq!: number;
    sqa!: string;
    dob!: Date;
    gender!: string;
    constructor(){}
    
}
