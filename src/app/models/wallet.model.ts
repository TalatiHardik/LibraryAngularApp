import { Order } from "./finedOrder.model";

export class Wallet{
    walletId! : number;
    username!: string;
    balance! : number;
    orders! : Order[];
    constructor(){}
    
}
