import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  api_url = environment.APP.API_URLS;
  base_api_url = environment.APP.BASE_URL;

  constructor(
    private http: HttpClient
  ) { }

  headerWithContentType(contentType: string = 'application/json'): any {
    return new HttpHeaders({
      'Content-Type': contentType,
    });
  }

  getheaders(opt?: any, showError?: any) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    if (opt) {
      Object.assign(options, opt);
    }
    if (showError) {
      Object.assign(options, { params: { showError: showError } });
    }
    return options;
  }

  get(url: string, options?: any, showError?: any): Observable<any> {
    const apiUrl = this.base_api_url + url;
    return this.http.get(apiUrl, this.getheaders(options, showError));
  }

  post(url: string, data?: any, data_type = 'json', options?: any, showError?: any): Observable<any> {
    const apiUrl = this.base_api_url + url;
    if(data_type === 'json') {
      data = JSON.stringify(data);
    }
    if(data_type === 'file' && !options) {
      options = {
        headers: new HttpHeaders({
          'X-Requested-With': 'XMLHttpRequest'
        })
      };
    }
    return this.http.post(apiUrl, data, this.getheaders(options, showError));
  }

  put(url: string, data?: any, showError?: any, contentType?: any): Observable<any> {
    const apiUrl = this.base_api_url + url;
    const options = {
      headers : this.headerWithContentType(contentType),
    };
    return this.http.put(apiUrl, data ? JSON.stringify(data) : null, options);
  }

  delete(url: string, showError?: any, contentType?: any) {
    const apiUrl = this.base_api_url + url;
    const options = {
      headers : this.headerWithContentType(contentType),
    };
    return this.http.delete(apiUrl, this.getheaders(options, showError));
  }

  
  fileUpload(url: any, data: any, showError?: any): Observable<any> {
    const apiUrl = this.base_api_url + url;
    const options = {
      headers: new HttpHeaders({
        'X-Requested-With': 'XMLHttpRequest',
      }),
    };
    const fd = new FormData();
    for (const key of Object.keys(data)) {
      fd.append(key, data[key]);
    }
    return this.http.post(apiUrl, fd, options);
  }


}
