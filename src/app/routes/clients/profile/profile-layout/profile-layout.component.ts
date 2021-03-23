import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from '../../clients.service'

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
})
export class ProfileLayoutComponent {

  public id: string;

  client: ClientModel = {
    id: null,
    name: 'Carregando...',
    lastname: null,
    email: null,
    phone: null,
    phone2: null,
    document: null,
    documentType: null,
    address: []
  };

  constructor(
    private clientsService: ClientsService,
    private route: ActivatedRoute
  ) {

    this.id = this.route.snapshot.params.id;

    this.loadData();

  }

  public loadData(): void {
    this.clientsService.findOne(this.id).subscribe(data => {
      this.client = data;
    })
  }

  getId(){
    return this.id
  }
}

export interface ClientModel {
  id: string;
  name: string;
  lastname: string;
  email: string;
  phone: number;
  phone2: number;
  document: string;
  documentType: string;
  address: Array<any>;
}
