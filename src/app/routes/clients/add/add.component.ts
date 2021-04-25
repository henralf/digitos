import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

import { ClientsService } from '../clients.service'

@Component({
  selector: 'app-clients-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class ClientsAddComponent implements OnInit {

  reactiveFormClient: FormGroup;

  translateSubscription: Subscription;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dateAdapter: DateAdapter<any>,
    private translate: TranslateService,
    private clientsService: ClientsService
  ) {

    this.reactiveFormClient = this.fb.group({
      name: [null, [Validators.required]],
      lastname: [null],
      email: [null],
      document: [null],
      documentType: [null],
      phoneType: [null],
      phoneType2: [null],
      phone: [null],
      phone2: [null]
    });
  }

  ngOnInit() {
    this.translateSubscription = this.translate.onLangChange.subscribe((res: { lang: any }) => {
      this.dateAdapter.setLocale(res.lang);
    });
  }

  ngOnDestroy() {
    this.translateSubscription.unsubscribe();
  }

  onSubmit() {
    if(this.reactiveFormClient.valid && this.reactiveFormClient.dirty){
      this.clientsService.create(this.reactiveFormClient.value).subscribe(() => {
          this.router.navigate(['clients/list']);
      });
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
