import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { rout } from 'src/app/core/config/routes';
import { login } from '../models/login.interface copy';
import { AuthService } from '../services/auth.service';
import * as SecureLS from "secure-ls";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  ls = new SecureLS({ encodingType: "aes" }); // encoding data before storing it to localStorage

  private subscriptions: Subscription = new Subscription();
  loginData = {
    email: 'admin@test.com',
    password: 'admin',
    rememberMe: true
  };
  loginForm: FormGroup = new FormGroup({});
  isSubmit: boolean = false;
  message : string = ''
  constructor(
    private AuthService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    if (this.ls.get("remeberMe")) {
      this.setValueToForm(this.ls.get("remeberMe"))
    }
  }
  login(user: login) {
    this.loginForm.markAllAsTouched()
    if (this.loginForm.valid) {
      this.isSubmit=true;
      this.subscriptions.add(
        this.AuthService.login(user).subscribe(
          (res: any) => {
            if (res.authorisation.token) {
              if (user.rememberMe == true) {
                this.ls.set("remeberMe", JSON.stringify(user));
                this.router.navigate(['./home']);
              } else {
                this.ls.remove("remeberMe");
              }
            }
            this.message="Wellcome";
          },
          (err) => {
            
            if (user.rememberMe == true) {
              this.ls.set("remeberMe", JSON.stringify(user));
              this.router.navigate(['./home']);
            } else {
              this.ls.remove("remeberMe");
            }
            this.message="Error";
          },
          ()=>{
            this.isSubmit=false;
          }
        )
      );
    }
  }
  get form() {
    return this.loginForm.controls
  }
  setValueToForm(loginData: any) {
    loginData = JSON.parse(loginData)
    this.loginForm.patchValue({
      email: loginData.email,
      password: loginData.password,
      rememberMe: loginData.rememberMe,
    });
  }
  initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: ['']
    })
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
