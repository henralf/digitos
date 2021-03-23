import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SettingsService, StartupService, TokenService } from '@core';

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private token: TokenService,
    private startup: StartupService,
    private settings: SettingsService,
    private loginService: LoginService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {

    let user = {identifier: this.loginForm.value.username, password: this.loginForm.value.password};

    this.loginService.auth(user).subscribe((data:any) => {

      this.token.set(data.jwt);
      this.settings.setUser(data.user);

      // Regain the initial data
      this.startup.load().then(() => {
        let url = this.token.referrer!.url || '/';
        if (url.includes('/auth')) {
          url = '/';
        }
        this.router.navigateByUrl(url);
      });

    });

  }

}
