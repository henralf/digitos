import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingsListComponent } from './list.component';

describe('ListComponent', () => {
  let component: BillingsListComponent;
  let fixture: ComponentFixture<BillingsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
