import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:5000/api/items';

  constructor(private http: HttpClient) {}

  // POST new item
  addItem(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // GET all items
  getAllItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
