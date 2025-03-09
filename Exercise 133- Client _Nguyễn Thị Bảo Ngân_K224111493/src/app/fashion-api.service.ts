import { HttpClient, HttpErrorResponse, HttpHeaders } from 
'@angular/common/http'; 
import { Injectable } from '@angular/core'; 
import { catchError, map, Observable, retry, throwError } from 'rxjs'; 
import { Fashion } from './Fashion'; 
 
@Injectable({ 
  providedIn: 'root' 
}) 
export class FashionAPIService { 
  private apiUrl = '/fashions'; 
  constructor(private _http: HttpClient) { }   
  
  getFashions(): Observable<Fashion[]> {
    return this._http.get<Fashion[]>('/fashions')
      .pipe(
        map(res => {
          console.log("Fetched fashions:", res); // ✅ Kiểm tra API có trả về ID không
          return res.map(item => ({
            ...item,
            id:  item._id  
          }));
        }),
        retry(3),
        catchError(this.handleError)
      );
  }
  

  // ✅ Hàm lấy thông tin chi tiết sản phẩm theo ID
  getFashionById(id: string): Observable<Fashion> {
    return this._http.get<Fashion>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // ✅ Hàm xử lý lỗi
  private handleError(error: HttpErrorResponse) { 
    return throwError(() => new Error(error.message));
  }  
}