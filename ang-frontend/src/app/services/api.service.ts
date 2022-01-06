import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map }from 'rxjs'
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getSavedQueries() { 
    return this.http.get<any>(environment.API_URL + '/query/saved-queries').pipe(map((res: any)=>{
        return res;
    }));
  }

  fetchData(body: any) {
    return this.http.post<any>(environment.API_URL + '/query/fetch-data', body).pipe(map((res: any)=>{
        return res;
    }))
  }

  saveQuery(body: any) {
    return this.http.post<any>(environment.API_URL + '/query/save-query', body).pipe(map((res: any)=>{
        return res;
    }))
  }
   
  loginUser(body: any) {
    return this.http.post<any>(environment.API_URL +'/auth/login', body)
  }

  registerUser(body: any) {
    return this.http.post<any>(environment.API_URL +'/auth/register', body)
  }

  getTaskStatus(id: string) {
    return this.http.get<any>(environment.API_URL + `/task/status/${id}`)
  }

  getKaggleDatasetList(search: string){
    return this.http.post<any>(environment.API_URL + `/kaggle/dataset-list`, {search:search})
  }

  getDatasetFiles(datasetName: string){
    
    return this.http.post<any>(environment.API_URL + `/kaggle/dataset-list-files`, {datasetName:datasetName})
  }


  getKaggleData(body: any){
        return this.http.post<any>(environment.API_URL + `/kaggle/get_data`, body)

  }

  saveKaggleData(body: any){
        return this.http.post<any>(environment.API_URL + `/query/save_kaggle_query`, body)

  }
}
