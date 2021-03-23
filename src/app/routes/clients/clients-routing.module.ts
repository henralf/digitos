import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsAddComponent } from './add/add.component';
import { ClientsListComponent } from './list/list.component';

const routes: Routes = [
  { path: 'add', component: ClientsAddComponent, data: { title: 'Add', titleI18n: 'add' }  },
  { path: 'list', component: ClientsListComponent, data: { title: 'List', titleI18n: 'list' }  },
  { path: 'view', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule), data: { title: 'View', titleI18n: 'view' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
