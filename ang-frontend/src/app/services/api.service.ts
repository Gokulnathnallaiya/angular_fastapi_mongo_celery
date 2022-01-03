import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map }from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getSavedQueries() {
    return this.http.get<any>('http://localhost:9000/query/saved-queries').pipe(map((res: any)=>{
        return res;
    }));
  }

  fetchData(body: any) {
    return this.http.post<any>('http://localhost:9000/query/fetch-data', body).pipe(map((res: any)=>{
        return res;
    }))
  }

  saveQuery(body: any) {
    return this.http.post<any>('http://localhost:9000/query/save-query', body).pipe(map((res: any)=>{
        return res;
    }))
  }

  loginUser(body: any) {
    return this.http.post<any>('http://localhost:9000/auth/login', body)
  }

  registerUser(body: any) {
    return this.http.post<any>('http://localhost:9000/auth/register', body)
  }

  getTaskStatus(id: string) {
    return this.http.get<any>(`http://localhost:9000/task/status/${id}`)
  }
}
