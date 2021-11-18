export class BookModel{

    public name: string;
    public description: string;
    public image: any;
    public author:string;
    public status:number;
    public genre:string;
    public quantity:number;



    constructor(name: string, desc: string,image: any, author:string , status:number , genre:string ,quantity:number)
    {
        this.name=name;
        this.description=desc;
        this.image=image;
        this.author=author;
        this.status=status;
        this.genre=genre;
        this.quantity=quantity;
    }

}