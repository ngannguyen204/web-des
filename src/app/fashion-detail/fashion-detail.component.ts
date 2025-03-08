import { Component } from '@angular/core';
import { FashionAPIService } from '../fashion-api.service';
import { Fashion } from '../Fashion';

@Component({
  selector: 'app-fashion-detail',
  standalone: false,
  templateUrl: './fashion-detail.component.html',
  styleUrl: './fashion-detail.component.css'
})
export class FashionDetailComponent {
  fashion: any;  
  book:any; 
  errMessage:string='' 
  constructor(private _service: FashionAPIService){     
  } 
  searchFashion(fashionId:string) 
  { 
    this._service.getFashion(fashionId).subscribe({ 
      next:(data)=>{this.fashion=data}, 
      error:(err)=>{this.errMessage=err} 
    }) 
  } 
}
