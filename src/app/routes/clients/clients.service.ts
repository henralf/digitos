import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = '/api/clients';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) { }

  getAllClients(sort: string='id', order: string='desc', page: number=0, limit: number=5, search: any=''): Observable<ClientsModelApi> {
    const href = '/api/clients/all';

    let q = search.trim() != '' ? `&_q=${search}` : '';

    let onsort = (order != '') ? `&_sort=${sort}:${order}`: '&_sort=name:asc';

    let requestUrl = `${href}?_limit=${limit}&_start=${page}${onsort}${q}`
    return this.http.get<ClientsModelApi>(requestUrl);
  }

  getAll(limite:number=10, start:number=0): Observable<any> {
    return this.http.get(baseUrl+`?_limit=${limite}&_start=${start}`);
  }

  findOne(id:string): Observable<any> {
    return this.http.get<any>(`${baseUrl}/${id}`);
  }

  count(): Observable<any> {
    return this.http.get(`${baseUrl}/count`);
  }

  create(data:ClientModel): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id:any, data:ClientModel): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id:string): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title:any): Observable<any> {
    return this.http.get(`${baseUrl}?title=${title}`);
  }
}

export interface ClientsModelApi {
  items: ClientModel[];
  total_count: number;
}

export interface ClientModel {
  id: number;
  name: string;
  lastname: string;
  email: string;
  phone: number;
  phone2: number;
  document: number;
  documentType: string;
  address: Array<any>
}
