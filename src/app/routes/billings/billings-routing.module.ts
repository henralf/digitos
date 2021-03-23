import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillingsListComponent } from './list/list.component';

const routes: Routes = [{ path: 'list', component: BillingsListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingsRoutingModule { }
