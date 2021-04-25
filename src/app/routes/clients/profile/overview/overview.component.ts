import {Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

import { DateAdapter } from '@angular/material/core';
import { Subscription } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import { MatDialog } from '@angular/material/dialog';

import { ProfileService, EquipmentModel, OrderModel, ServiceModel, BillingModel } from '../profile.service';

import { ProfileLayoutComponent } from '../profile-layout/profile-layout.component';

@Component({
  selector: 'app-profile-overview',
  templateUrl: './overview.component.html',
})
export class ProfileOverviewComponent implements OnInit, AfterViewInit {

  @ViewChild('paginatorEquipments') paginatorEquipments: MatPaginator;
  @ViewChild('paginatorServices') paginatorServices: MatPaginator;
  @ViewChild('paginatorBillings') paginatorBillings: MatPaginator;
  @ViewChild('paginatorOrders') paginatorOrders: MatPaginator;

  @ViewChild('sortEquipments') sortEquipments: MatSort;
  @ViewChild('sortServices') sortServices: MatSort;
  @ViewChild('sortBillings') sortBillings: MatSort;
  @ViewChild('sortOrders') sortOrders: MatSort;

  displayedColumnsEquipments: string[] = ['name','brand','id'];
  displayedColumnsBillings: string[] = ['equipment','brand','value','paymentType','date','id'];
  displayedColumnsServices: string[] = ['equipment','brand','value','approved','term','id'];
  displayedColumnsOrders: string[] = ['equipment','brand','defect','entry','id'];

  dataEquipments: Array<EquipmentModel> = [];
  dataServices: Array<ServiceModel> = [];
  dataBillings: Array<BillingModel> = [];
  dataOrders: Array<OrderModel> = [];

  resultsLengthEquipments = 0;
  isLoadingResultsEquipments = true;
  isRateLimitReachedEquipments = false;
  searchEquipments: string;

  resultsLengthBillings = 0;
  isLoadingResultsBillings = true;
  isRateLimitReachedBillings = false;
  searchBillings: string;

  resultsLengthServices = 0;
  isLoadingResultsServices = true;
  isRateLimitReachedServices = false;
  searchServices: string;

  resultsLengthOrders = 0;
  isLoadingResultsOrders = true;
  isRateLimitReachedOrders = false;
  searchOrders: string;

  translateSubscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private translate: TranslateService,
    private dateAdapter: DateAdapter<any>,
    private paginatorIntl: MatPaginatorIntl,
    private profile: ProfileLayoutComponent,
    private profileService:ProfileService){}

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
    this.loadDataEquipments();
  }

  onTabChanged($event:any) {
    if($event.index==0) this.loadDataEquipments();
    if($event.index==1) this.loadDataOrders();
    if($event.index==2) this.loadDataServices();
    if($event.index==3) this.loadDataBillings();
  }

  loadDataEquipments(){

    this.sortEquipments.sortChange.subscribe(() => this.paginatorEquipments.pageIndex = 0);

    merge(this.sortEquipments.sortChange, this.paginatorEquipments.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResultsEquipments = true;
          return this.profileService.getAllEquipmentsByUser(
            this.profile.id,
            this.sortEquipments.active,
            this.sortEquipments.direction,
            ((this.paginatorEquipments.pageIndex*this.paginatorEquipments.pageSize)),
            this.paginatorEquipments.pageSize);
        }),
        map(data => {
          this.isLoadingResultsEquipments = false;
          this.isRateLimitReachedEquipments = false;
          this.resultsLengthEquipments = data.total_count;
          return data.items;
        }),
        catchError(() => {
          this.isLoadingResultsEquipments = false;
          this.isRateLimitReachedEquipments = true;
          return observableOf([]);
        })
      ).subscribe(data => this.dataEquipments = data);
  }

  loadDataOrders(){

    this.sortOrders.sortChange.subscribe(() => this.paginatorOrders.pageIndex = 0);

    merge(this.sortOrders.sortChange, this.paginatorOrders.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResultsOrders = true;
          return this.profileService.getAllOrdersByUser(
            this.profile.id,
            this.sortOrders.active,
            this.sortOrders.direction,
            ((this.paginatorOrders.pageIndex*this.paginatorOrders.pageSize)),
            this.paginatorOrders.pageSize);
        }),
        map(data => {
          this.isLoadingResultsOrders = false;
          this.isRateLimitReachedOrders = false;
          this.resultsLengthOrders = data.total_count;
          return data.items;
        }),
        catchError(() => {
          this.isLoadingResultsOrders = false;
          this.isRateLimitReachedOrders = true;
          return observableOf([]);
        })
      ).subscribe(data => this.dataOrders = data);

  }

  loadDataServices(){

    this.sortServices.sortChange.subscribe(() => this.paginatorServices.pageIndex = 0);

    merge(this.sortServices.sortChange, this.paginatorServices.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResultsServices = true;
          return this.profileService.getAllServicesByUser(
            this.profile.id,
            this.sortServices.active,
            this.sortServices.direction,
            ((this.paginatorServices.pageIndex*this.paginatorServices.pageSize)),
            this.paginatorServices.pageSize);
        }),
        map(data => {
          this.isLoadingResultsServices = false;
          this.isRateLimitReachedServices = false;
          this.resultsLengthServices = data.total_count;
          return data.items;
        }),
        catchError(() => {
          this.isLoadingResultsServices = false;
          this.isRateLimitReachedServices = true;
          return observableOf([]);
        })
      ).subscribe(data => this.dataServices = data);

  }

  loadDataBillings(){

    this.sortBillings.sortChange.subscribe(() => this.paginatorBillings.pageIndex = 0);

    merge(this.sortBillings.sortChange, this.paginatorBillings.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResultsBillings = true;
          return this.profileService.getAllBillingsByUser(
            this.profile.id,
            this.sortBillings.active,
            this.sortBillings.direction,
            ((this.paginatorBillings.pageIndex*this.paginatorBillings.pageSize)),
            this.paginatorBillings.pageSize);
        }),
        map(data => {
          this.isLoadingResultsBillings = false;
          this.isRateLimitReachedBillings = false;
          this.resultsLengthBillings = data.total_count;
          return data.items;
        }),
        catchError(() => {
          this.isLoadingResultsBillings = false;
          this.isRateLimitReachedBillings = true;
          return observableOf([]);
        })
      ).subscribe(data => this.dataBillings = data);

  }

  openDeleteDialogEquipments(id: string) {
    const dialogRef = this.dialog.open(DialogDeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(Boolean(JSON.parse(result)))
        this.profileService.deleteEquipment(id).subscribe(() => this.loadDataEquipments());
    });
  }

  openDeleteDialogServices(id: string) {
    const dialogRef = this.dialog.open(DialogDeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(Boolean(JSON.parse(result)))
        this.profileService.deleteService(id).subscribe(() => this.loadDataServices());
    });
  }

  openDeleteDialogOrders(id: string) {
    const dialogRef = this.dialog.open(DialogDeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(Boolean(JSON.parse(result)))
        this.profileService.deleteOrder(id).subscribe(() => this.loadDataOrders());
    });
  }

  openDeleteDialogBillings(id: string) {
    const dialogRef = this.dialog.open(DialogDeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(Boolean(JSON.parse(result)))
        this.profileService.deleteBilling(id).subscribe(() => this.loadDataBillings());
    });
  }

}

// Dialog
@Component({
  selector: 'dialog-delete',
  templateUrl: 'dialog.delete.html',
})
export class DialogDeleteComponent {}
