import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocsService {

  constructor(public http: HttpClient) { }

  createDoc(body) {
    return this.http.post(`${environment.baseUrl}/docs/create`, body);
  }

  readDoc(id) {
    return this.http.get(`${environment.baseUrl}/docs/${id}`);
  }
}
