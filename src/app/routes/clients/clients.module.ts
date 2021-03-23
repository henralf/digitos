import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsAddComponent } from './add/add.component';
import { ClientsListComponent, DialogDeleteComponent } from './list/list.component';

import { ClientsService } from './clients.service';


const COMPONENTS = [ClientsAddComponent, ClientsListComponent];
const COMPONENTS_DYNAMIC = [DialogDeleteComponent];

@NgModule({
  imports: [
    SharedModule,
    ClientsRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC,
  providers: [
    ClientsService
  ]
})
export class ClientsModule { }
