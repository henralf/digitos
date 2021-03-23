import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BillingsRoutingModule } from './billings-routing.module';
import { BillingsListComponent } from './list/list.component';

const COMPONENTS = [BillingsListComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    BillingsRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class BillingsModule { }
