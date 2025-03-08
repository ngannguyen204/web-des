import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FashionAPIService } from '../fashion-api.service';
import { FashionStateService } from '../fashion-state.service';

@Component({
  selector: 'app-fashion-edit',
  standalone:false,
  templateUrl: './fashion-edit.component.html',
  styleUrls: ['./fashion-edit.component.css']
})
export class FashionEditComponent implements OnInit {
  fashionForm!: FormGroup;
  fashionId!: string;
  existingThumbnailUrl: string = '';
  selectedFile: File | null = null;
  createdAt: Date = new Date();


  
  constructor(
    private fb: FormBuilder,
    private fashionService: FashionAPIService,
    private route: ActivatedRoute,
    private router: Router,
    private fashionState: FashionStateService
  ) {}

  ngOnInit(): void {
    this.fashionId = this.route.snapshot.paramMap.get('id') || '';
    
    this.fashionForm = this.fb.group({
      fashion_subject: ['', Validators.required],
      style: ['', Validators.required],
      fashion_detail: [''],
      fashion_image: [null]
    });

    if (this.fashionId) {
      this.fashionService.getFashion(this.fashionId).subscribe(fashion => {
        this.fashionForm.patchValue({
          fashion_subject: fashion.fashion_subject,
          style: fashion.style,
          fashion_detail: fashion.fashion_detail
        });
        this.existingThumbnailUrl = fashion.fashion_image; // nếu có ảnh cũ
this.createdAt = fashion.created_at ? new Date(fashion.created_at) : new Date();
      });
    }
  }

  onThumbnailChange(event: any): void {
    const file = event.target.files[0];
    this.fashionForm.patchValue({ thumbnail: file });
    this.selectedFile = file;
  }

  save(): void {
    const formData = new FormData();
formData.append('style', this.fashionForm.value.style);
formData.append('fashion_subject', this.fashionForm.value.title);
formData.append('fashion_detail', this.fashionForm.value.details);

if (this.selectedFile) {
    formData.append('thumbnail', this.selectedFile);  // File mới upload
} else {
    formData.append('existingImage', this.existingThumbnailUrl);  // Giữ ảnh cũ
}

    this.fashionService.updateFashion(this.fashionId, formData).subscribe(() => {
        alert('Fashion updated successfully!');
        this.fashionState.triggerRefresh(); // Thêm
        this.router.navigate(['/fashions']);
    });
  }

  cancel(): void {
    this.router.navigate(['/fashions']);
  }
  
}
