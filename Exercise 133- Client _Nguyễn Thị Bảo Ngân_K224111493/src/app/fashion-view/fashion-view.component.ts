import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { FashionAPIService } from '../fashion-api.service';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-fashion-view',
  standalone:false,
  templateUrl: './fashion-view.component.html',
  styleUrls: ['./fashion-view.component.css']
})
export class FashionViewComponent implements OnInit {
  fashions: any[] = [];
  filteredFashions: any[] = [];
  styles: string[] = [];
  searchControl = new FormControl('');
  selectedStyle: string = ''; // Lưu lại style đã chọn

  constructor(private fashionService: FashionAPIService, private router: Router) {}

  ngOnInit() {
    this.loadFashions();

    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => this.filterByStyle(value?.toString() || ''));
      this.fashionService.getFashions().subscribe(
        (data) => {
          console.log("Fashion items received:", data); // ✅ Debug dữ liệu
          this.filteredFashions = data;
        },
        (error) => console.error("Error loading fashion items", error)
      );
  }

  loadFashions() {
    this.fashionService.getFashions().subscribe(
      (data: any[]) => {
        this.fashions = data;
        this.filteredFashions = [...data]; // Hiển thị tất cả khi mới mở
        this.styles = Array.from(new Set(data.map(f => f.style))); // Lấy danh sách style (loại bỏ trùng)
      },
      error => console.error('Error loading fashions', error)
    );
  }

  filterByStyle(selectedStyle: string) {
    this.selectedStyle = selectedStyle; // Lưu lại style đã chọn
    
    if (!selectedStyle) {
      this.filteredFashions = [...this.fashions]; // Nếu không chọn style, hiển thị tất cả
    } else {
      this.filteredFashions = this.fashions.filter(fashion => 
        fashion.style.toLowerCase() === selectedStyle.toLowerCase()
      );
    }
  }

  onStyleChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.filterByStyle(target.value);
    }
  }

  viewDetails(fashion: any) {
    if (!fashion || !fashion._id) {  // ✅ Kiểm tra ID hợp lệ trước khi navigate
      console.error('Fashion item is missing an ID:', fashion);
      return;
    }
    this.router.navigate(['/fashion-detail', fashion._id]);
  }
  
}
