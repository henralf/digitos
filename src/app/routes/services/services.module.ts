import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ServicesRoutingModule } from './services-routing.module';
import { ServicesListComponent } from './list/list.component';

const COMPONENTS = [ServicesListComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    ServicesRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class ServicesModule { }
