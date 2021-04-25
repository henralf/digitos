import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrlEquipments = '/api/equipments';
const baseUrlOrders = '/api/orders';
const baseUrlServices = '/api/services';
const baseUrlBillings = '/api/billings';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getAllClients(sort: string='id', order: string='desc', page: number=0, limit: number=5, search: any=''): Observable<ModelApi> {
    const href = '/api/clients/all';

    let q = search.trim() != '' ? `&_q=${search}` : '';

    let onsort = (order != '') ? `&_sort=${sort}:${order}`: '&_sort=name:asc';

    let requestUrl = `${href}?_limit=${limit}&_start=${page}${onsort}${q}`
    return this.http.get<ModelApi>(requestUrl);
  }

  // Equipments
  getAllEquipmentsByUser(id_user:string, sort: string='id', order: string='desc', page: number=0, limit: number=5): Observable<ModelApi> {
    const href = `${baseUrlEquipments}/all/${id_user}`;

    let onsort = (order != '') ? `&_sort=${sort}:${order}`: '&_sort=createdAt:desc';

    let requestUrl = `${href}?_limit=${limit}&_start=${page}${onsort}`
    return this.http.get<ModelApi>(requestUrl);
  }

  getAllEquipments(limite:number=10, start:number=0): Observable<any> {
    return this.http.get(baseUrlEquipments+`?_limit=${limite}&_start=${start}`);
  }

  findOneEquipment(id:string): Observable<any> {
    return this.http.get<any>(`${baseUrlEquipments}/${id}`);
  }

  countEquipments(): Observable<any> {
    return this.http.get(`${baseUrlEquipments}/count`);
  }

  createEquipments(data:EquipmentModel): Observable<any> {
    return this.http.post(baseUrlEquipments, data);
  }

  updateEquipment(id:any, data:EquipmentModel): Observable<any> {
    return this.http.put(`${baseUrlEquipments}/${id}`, data);
  }

  deleteEquipment(id:string): Observable<any> {
    return this.http.delete(`${baseUrlEquipments}/${id}`);
  }

  deleteAllEquipments(): Observable<any> {
    return this.http.delete(baseUrlEquipments);
  }

  // Orders
  getAllOrdersByUser(id_user:string, sort: string='id', order: string='desc', page: number=0, limit: number=5): Observable<ModelApi> {
    const href = `${baseUrlOrders}/all/${id_user}`;

    let onsort = (order != '') ? `&_sort=${sort}:${order}`: '&_sort=createdAt:desc';

    let requestUrl = `${href}?_limit=${limit}&_start=${page}${onsort}`
    return this.http.get<ModelApi>(requestUrl);
  }

  getAllOrders(limite:number=10, start:number=0): Observable<any> {
    return this.http.get(baseUrlOrders+`?_limit=${limite}&_start=${start}`);
  }

  findOneOrder(id:string): Observable<any> {
    return this.http.get<any>(`${baseUrlOrders}/${id}`);
  }

  countOrders(): Observable<any> {
    return this.http.get(`${baseUrlOrders}/count`);
  }

  createOrders(data:OrderModel): Observable<any> {
    return this.http.post(baseUrlOrders, data);
  }

  updateOrder(id:any, data:OrderModel): Observable<any> {
    return this.http.put(`${baseUrlOrders}/${id}`, data);
  }

  deleteOrder(id:string): Observable<any> {
    return this.http.delete(`${baseUrlOrders}/${id}`);
  }

  deleteAllOrders(): Observable<any> {
    return this.http.delete(baseUrlOrders);
  }

  // Services
  getAllServicesByUser(id_user:string, sort: string='id', order: string='desc', page: number=0, limit: number=5): Observable<ModelApi> {
    const href = `${baseUrlServices}/all/${id_user}`;

    let onsort = (order != '') ? `&_sort=${sort}:${order}`: '&_sort=createdAt:desc';

    let requestUrl = `${href}?_limit=${limit}&_start=${page}${onsort}`
    return this.http.get<ModelApi>(requestUrl);
  }

  getAllServices(limite:number=10, start:number=0): Observable<any> {
    return this.http.get(baseUrlServices+`?_limit=${limite}&_start=${start}`);
  }

  findOneService(id:string): Observable<any> {
    return this.http.get<any>(`${baseUrlServices}/${id}`);
  }

  countServices(): Observable<any> {
    return this.http.get(`${baseUrlServices}/count`);
  }

  createServices(data:ServiceModel): Observable<any> {
    return this.http.post(baseUrlServices, data);
  }

  updateService(id:any, data:ServiceModel): Observable<any> {
    return this.http.put(`${baseUrlServices}/${id}`, data);
  }

  deleteService(id:string): Observable<any> {
    return this.http.delete(`${baseUrlServices}/${id}`);
  }

  deleteAllServices(): Observable<any> {
    return this.http.delete(baseUrlServices);
  }

  // Billings
  getAllBillingsByUser(id_user:string, sort: string='id', order: string='desc', page: number=0, limit: number=5): Observable<ModelApi> {
    const href = `${baseUrlBillings}/all/${id_user}`;

    let onsort = (order != '') ? `&_sort=${sort}:${order}`: '&_sort=createdAt:desc';

    let requestUrl = `${href}?_limit=${limit}&_start=${page}${onsort}`
    return this.http.get<ModelApi>(requestUrl);
  }

  getAllBillings(limite:number=10, start:number=0): Observable<any> {
    return this.http.get(baseUrlBillings+`?_limit=${limite}&_start=${start}`);
  }

  findOneBilling(id:string): Observable<any> {
    return this.http.get<any>(`${baseUrlBillings}/${id}`);
  }

  countBillings(): Observable<any> {
    return this.http.get(`${baseUrlBillings}/count`);
  }

  createBillings(data:BillingModel): Observable<any> {
    return this.http.post(baseUrlBillings, data);
  }

  updateBilling(id:any, data:BillingModel): Observable<any> {
    return this.http.put(`${baseUrlBillings}/${id}`, data);
  }

  deleteBilling(id:string): Observable<any> {
    return this.http.delete(`${baseUrlBillings}/${id}`);
  }

  deleteAllBillings(): Observable<any> {
    return this.http.delete(baseUrlBillings);
  }

}

export interface ModelApi {
  items: [];
  total_count: number;
}

export interface ClientModel {
  id: number;
  name: string;
  lastname: string;
  email: string;
  phone: number;
  phone2: number;
  document: string;
  documentType: string;
  address: Array<any>
}

export interface EquipmentModel {
  id: number;
  client: ClientModel;
  name: string;
  model: string;
  serial: string;
  annotation: string;
  orders: [OrderModel];
  services: [ServiceModel];
}

export interface OrderModel {
  id: number;
  client: ClientModel;
  equipment: EquipmentModel;
  entry: string;
  defect: string;
  annotation: string;
}

export interface ServiceModel {
  id: number;
  client: ClientModel;
  equipment: EquipmentModel;
  order: OrderModel;
  defect: string;
  value: number;
  budget: string;
  term: string;
  approved: boolean;
  warranty: number;
}

export interface BillingModel {
  id: number;
  client: ClientModel;
  equipment: EquipmentModel;
  order: OrderModel;
  service: OrderModel;
  date: string;
  value: number;
  paymentType: string;
}
