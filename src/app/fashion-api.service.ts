import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError, Observable } from 'rxjs';
import { Fashion } from './Fashion';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FashionAPIService {
  private apiUrl = '/fashions';

  constructor(private _http: HttpClient) { }

  getFashions(): Observable<Fashion[]> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    const requestOptions = {
      headers: headers,
      responseType: "json" as const
    };

    return this._http.get<Fashion[]>("/fashions", requestOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  // ⚠️ Hàm này phải nằm bên trong class, cùng cấp với getFashions
  
  getFashion(id: string): Observable<Fashion> {
    const url = `${this.apiUrl}/${id}`;  // Tạo URL dạng /fashions/:id
    
    return this._http.get<Fashion>(url).pipe(
      catchError(this.handleError) // Xử lý lỗi
    );
  }

  // Hàm xử lý lỗi
  private handleError(error: HttpErrorResponse) {
    console.error('There was an error!', error);
    return throwError(() => new Error(error.message));
  }

  postFashion(formData: FormData): Observable<any> 
{ 
    return this._http.post<any>("/fashions", formData)
    .pipe(
        retry(3),
        catchError(this.handleError)
    );
}

  
  deleteFashion(id: string): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    const requestOptions = {
        headers: headers,
        responseType: "text" as const // Nếu API trả về JSON thì đổi lại thành "json"
    };

    const url = `${this.apiUrl}/${id}`; // URL dạng /fashions/:id

    return this._http.delete(url, requestOptions).pipe(
        map((res: string) => {
            // Trường hợp API trả về chuỗi JSON thì parse ra
            try {
                return JSON.parse(res);
            } catch (e) {
                return res; // Nếu không phải JSON thì trả về chuỗi thô (text message)
            }
        }),
        retry(3),
        catchError(this.handleError)
    );
}

updateFashion(id: string, formData: FormData): Observable<any> {
  return this._http.put(`/fashions/${id}`, formData).pipe(
    catchError(this.handleError)
  );
}

 
}


