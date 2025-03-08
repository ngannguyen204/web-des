import { Component } from '@angular/core';
import { FashionAPIService } from '../fashion-api.service';
import { Router } from '@angular/router';
import { FashionStateService } from '../fashion-state.service';  // IMPORT service state

@Component({
    selector: 'app-fashion',
    standalone: false,
    templateUrl: './fashion.component.html',
    styleUrls: ['./fashion.component.css']
})
export class FashionComponent {
    fashions: any;
    errMessage: string = '';
    showDeletePopup: boolean = false;
    showAddForm: boolean = false; 
    targetFashionId: string = '';

    constructor(
        public _service: FashionAPIService,
        private router: Router,
        private fashionState: FashionStateService   // INJECT fashionState
    ) {
        this.loadFashions();  // Gọi lần đầu khi component được khởi tạo

        // Lắng nghe sự kiện từ FashionStateService để refresh danh sách sau khi Edit thành công
        this.fashionState.refreshNeeded$.subscribe(() => {
            this.loadFashions();
        });
    }

    loadFashions() {
        this._service.getFashions().subscribe({
            next: (data) => { this.fashions = data; },
            error: (err) => { this.errMessage = err; }
        });
    }

    editFashion(fashion: any) {
        console.log('Edit fashion:', fashion);
        this.router.navigate(['/fashion-edit', fashion._id]);
    }

    deleteFashion(fashionId: string) {
        this.targetFashionId = fashionId;
        this.showDeletePopup = true;
    }

    onDeleteConfirmed() {
        this.showDeletePopup = false;
        this.loadFashions();  // Reload danh sách sau khi xóa
    }

    onDeleteCancelled() {
        this.showDeletePopup = false;
    }
    addFashion(): void {
        this.showAddForm = true;  // Bấm Add thì hiện form
    }
    
    onFashionAdded(): void {
        this.showAddForm = false;  // Đóng form sau khi thêm thành công
        this.loadFashions();      // Reload danh sách từ database
    }
}
