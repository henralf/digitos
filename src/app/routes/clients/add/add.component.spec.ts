import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsAddComponent } from './add.component';

describe('AddComponent', () => {
  let component: ClientsAddComponent;
  let fixture: ComponentFixture<ClientsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
