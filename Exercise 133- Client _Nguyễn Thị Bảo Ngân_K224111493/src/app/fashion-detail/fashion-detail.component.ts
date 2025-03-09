import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FashionAPIService } from '../fashion-api.service';

@Component({
  selector: 'app-fashion-detail',
  standalone:false,
  templateUrl: './fashion-detail.component.html',
  styleUrls: ['./fashion-detail.component.css']
})
export class FashionDetailComponent implements OnInit {
  fashion: any;

  constructor(private route: ActivatedRoute, private fashionService: FashionAPIService) {}

  ngOnInit() {
    const fashionId = this.route.snapshot.paramMap.get('id');
    if (fashionId) {
      this.fashionService.getFashionById(fashionId).subscribe(
        (data: any) => {
          this.fashion = data;
        },
        (error: any) => console.error('Error loading fashion details', error) // Định kiểu `error: any`
      );
      
    }
  }
}
