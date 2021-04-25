import {HttpClient} from '@angular/common/http';
import {Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

import { DateAdapter } from '@angular/material/core';
import { Subscription } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import { MatDialog } from '@angular/material/dialog';

import { ClientsService } from '../clients.service'

@Component({
  selector: 'app-clients-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ClientsListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  search:any = '';

  showAddProduct:boolean = false;

  displayedColumns: string[] = ['name','lastname','phone','id'];
  clientsDatabase: ClientsHttpDatabase | null;
  data: ClientModel[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  translateSubscription: Subscription;



  constructor(
    public dialog: MatDialog,
    private translate: TranslateService,
    private dateAdapter: DateAdapter<any>,
    private _httpClient: HttpClient,
    private paginatorIntl: MatPaginatorIntl,
    private clientsService: ClientsService){}

  ngOnInit() {

    this.translateSubscription = this.translate.onLangChange.subscribe((res: { lang: any }) => {
      this.dateAdapter.setLocale(res.lang);
    });

    this.translate.get('paginator').subscribe(p => {
      const pi = this.paginatorIntl;
      pi.firstPageLabel = p.first_page;
      pi.lastPageLabel = p.last_page;
      pi.itemsPerPageLabel = p.items_per_page;
      pi.nextPageLabel = p.next_page;
      pi.previousPageLabel = p.previous_page;
      pi.getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length == 0 || pageSize == 0) { return `0 ${p.of} ${length}`; }

        length = Math.max(length, 0);

        const startIndex = page * pageSize;

        const endIndex = startIndex < length ?
            Math.min(startIndex + pageSize, length) :
            startIndex + pageSize;

        return `${startIndex + 1} - ${endIndex} ${p.of} ${length}`;
      }
      pi.changes.next();
    });
  }

  ngOnDestroy() {
    this.translateSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.loadData();
  }

  onSubmitSearch(){
    this.loadData();
  }

  loadData(){
    this.clientsDatabase = new ClientsHttpDatabase(this._httpClient);

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.clientsDatabase!.getAllClients(
            this.sort.active, this.sort.direction, ((this.paginator.pageIndex*this.paginator.pageSize)),this.paginator.pageSize,this.search);
        }),
        map(data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;
          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }

  openDeleteDialog(id: string) {
    const dialogRef = this.dialog.open(DialogDeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(Boolean(JSON.parse(result)))
        this.clientsService.delete(id).subscribe(() => this.loadData());
    });
  }

}

// Dialog
@Component({
  selector: 'dialog-delete',
  templateUrl: 'dialog.delete.html',
})
export class DialogDeleteComponent {}

export class ClientsHttpDatabase {

  constructor(private _httpClient: HttpClient) {}

  getAllClients(sort: string='id', order: string='desc', page: number=0, limit: number=5, search: any=''): Observable<ClientsModelApi> {
    const href = '/api/clients/all';


    let q = search.trim() != '' ? `&_q=${search}` : '';

    let onsort = (order != '') ? `&_sort=${sort}:${order}`: '&_sort=createdAt:desc';

    let requestUrl = `${href}?_limit=${limit}&_start=${page}${onsort}${q}`
    return this._httpClient.get<ClientsModelApi>(requestUrl);
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
  document: string;
  documentType: string;
  address: Array<any>
}
