import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FashionAPIService } from '../fashion-api.service'; 


@Component({
  selector: 'app-fashion-delete',
  standalone: false,
  templateUrl: './fashion-delete.component.html',
  styleUrl: './fashion-delete.component.css'
})
export class FashionDeleteComponent {
  @Input() fashionId: string = '';            // Nhận id từ FashionComponent
  @Output() deleteConfirmed = new EventEmitter<void>();  // Báo lên cha khi xóa thành công
  @Output() deleteCancelled = new EventEmitter<void>();  // Báo lên cha khi hủy

  constructor(private fashionService: FashionAPIService) {}

  confirmDelete() {
    this.fashionService.deleteFashion(this.fashionId).subscribe({
      next: () => {
        alert('Xóa thành công!');
        this.deleteConfirmed.emit();  // Gửi sự kiện báo về FashionComponent
      },
      error: (err) => {
        alert('Xóa thất bại!');
        console.error(err);
      }
    });
  }

  cancelDelete() {
    this.deleteCancelled.emit();  // Báo hủy về FashionComponent
  }
}
