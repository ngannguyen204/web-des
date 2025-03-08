import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FashionAPIService } from '../fashion-api.service';
@Component({
    selector: 'app-fashion-new',
    standalone:false,
    templateUrl: './fashion-new.component.html',
    styleUrls: ['./fashion-new.component.css']
})
export class FashionNewComponent {
    fashionForm: FormGroup;

    @Output() fashionAdded = new EventEmitter<void>();  // Sự kiện báo về component cha
    @Output() cancel = new EventEmitter<void>();
    imagePreview: string | ArrayBuffer | null = null;

    constructor(private fb: FormBuilder, private fashionService: FashionAPIService) {
        this.fashionForm = this.fb.group({
            fashion_subject: ['', Validators.required],
            style: ['', Validators.required],
            fashion_detail: [''],
            fashion_image: [null],
            
        });
    }

    onFileChange(event: any): void {
        const file = event.target.files[0];
        if (file) {
            this.fashionForm.patchValue({ fashion_image: file });
    
            const reader = new FileReader();
            reader.onload = () => {
                this.imagePreview = reader.result; 
            };
            reader.readAsDataURL(file);
        }
    }
    
    
    

    save(): void {
        const formData = new FormData();
        formData.append('fashion_subject', this.fashionForm.value.fashion_subject);
        formData.append('style', this.fashionForm.value.style);
        formData.append('fashion_detail', this.fashionForm.value.fashion_detail);
    
        // Kiểm tra nếu có ảnh mới
        if (this.fashionForm.get('fashion_image')?.value) {
            formData.append('fashion_image', this.fashionForm.get('fashion_image')?.value);
        }
    
        this.fashionService.postFashion(formData).subscribe(() => {
            alert('Fashion added successfully!');
            this.fashionAdded.emit();  // Báo về cha
        }, error => {
            console.error("Upload failed:", error);
            alert('Upload failed!');
        });
    }

    cancelAdd(): void {
        this.cancel.emit();  // Báo về cha để đóng form
    }
}
