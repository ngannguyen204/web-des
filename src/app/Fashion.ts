export class Fashion{ 
    public readonly created_at: Date = new Date();
    constructor( 
        public _id:any=null, 
        public style:string="", 
        public fashion_subject:string="", 
        public fashion_detail:string="", 
        public fashion_image:string=""){}
}