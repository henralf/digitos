import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

import { ProfileLayoutComponent } from '../profile-layout/profile-layout.component';

import { ClientsService } from '../../clients.service'

@Component({
  selector: 'app-profile-settings',
  templateUrl: './settings.component.html',
})
export class ProfileSettingsComponent implements OnInit {

  reactiveFormClient: FormGroup;

  translateSubscription: Subscription;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dateAdapter: DateAdapter<any>,
    private translate: TranslateService,
    private clientsService: ClientsService,
    private profile: ProfileLayoutComponent
  ) {


  }

  ngOnInit() {

    this.reactiveFormClient = this.fb.group({
      name: [null, Validators.required],
      lastname: [null],
      email: [null],
      document: [null],
      documentType: [null],
      phone: [null, Validators.required],
      phone2: [null]
    });

    this.clientsService.findOne(this.profile.id).subscribe( (data:ClientModel) => {

       this.reactiveFormClient.setValue({
         name: (data.name != '') ? data.name : null,
         lastname: (data.lastname != '') ? data.lastname : null,
         email: (data.email != '') ? data.email : null,
         document: (data.document != '') ? data.document : null,
         documentType: (data.documentType != '') ? data.documentType : null,
         phone: (data.phone != '') ? data.phone : null,
         phone2: (data.phone2 != '') ? data.phone2 : null
       });

     })

    this.translateSubscription = this.translate.onLangChange.subscribe((res: { lang: any }) => {
      this.dateAdapter.setLocale(res.lang);
    });
  }

  ngOnDestroy() {
    this.translateSubscription.unsubscribe();
  }

  onSubmit() {

    if(this.reactiveFormClient.valid && this.reactiveFormClient.dirty){
      //this.reactiveFormClient.value.phone2= this.reactiveFormClient.value.phone2 ? this.reactiveFormClient.value.phone2 : 0
      this.clientsService.update(this.profile.id, this.reactiveFormClient.value).subscribe(() => {
          this.profile.loadData();
          this.router.navigate([`clients/view/${this.profile.id}/overview`]);
      });
    }

    if(!this.reactiveFormClient.dirty) {
      this.router.navigate([`clients/view/${this.profile.id}/overview`]);
    }

  }

  getErrorMessage(form: FormGroup) {
    return form.get('email').hasError('required')
      ? 'validations.required'
      : form.get('email').hasError('email')
      ? 'validations.invalid_email'
      : '';
  }

}

export interface ClientModel {
  id: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  phone2: string;
  document: string;
  documentType: string;
  address: Array<any>
}
