export class CheckedOutBookModel{

    public orderid: number;
    public name: string;
    public image: any;
    public issue_date: Date;
    public return_date: Date;
    public fine_amount: number;

    constructor(orderid: number , name: string, image: any,issue_date: Date,return_date: Date, fine_amount: number)
    {
        this.orderid = orderid;
        this.name=name;
        this.image = image;
        this.issue_date = issue_date;
        this.return_date = return_date;
        this.fine_amount = fine_amount;
        
    }

}