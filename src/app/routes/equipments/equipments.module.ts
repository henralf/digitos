import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { EquipmentsRoutingModule } from './equipments-routing.module';

const COMPONENTS = [];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    EquipmentsRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class EquipmentsModule { }
