import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  
  createPostRequest(url: string, data: any): Observable<any> {
    return this.http.post(url, data);
  }

  createGetRequest(url: string): Observable<any> {
    return this.http.get(url);
  }

  createDeleteRequest(url: string): Observable<any> {
    return this.http.delete(url);
  }

  createPutRequest(url: string, data: any): Observable<any> {
    return this.http.put(url, data);
  }

  createPatchRequest(url: string, data: any): Observable<any> {
    return this.http.patch(url, data);
  }

  createGetRequestWithParam(url: string, param: any): Observable<any> {
    return this.http.get(url, {
      params: param
    });
  }

  createPostRequestWithParam(url: string, param: any): Observable<any> {
    return this.http.post(url, null, {
      params: param
    });
  }
}
