import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as SecureLS from 'secure-ls';
import { login } from '../models/login.interface copy';
import { register } from '../models/register.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit  {
  ls = new SecureLS({ encodingType: "aes" }); // encoding data before storing it to localStorage

  private subscriptions: Subscription = new Subscription();
  registerData = {
    email: '',
    password: '',
    name: ''
  };
  registerForm: FormGroup = new FormGroup({});
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
  }
  register(user: register) {
    this.registerForm.markAllAsTouched()
    if (this.registerForm.valid) {
      this.isSubmit=true;
      this.subscriptions.add(
        this.AuthService.register(user).subscribe(
          (res: any) => {
                this.router.navigate(['./home']);
            },
          (err) => {
            this.message="Error";
            this.ls.remove("remeberMe");
            this.ls.set("remeberMe", user);
          },
          ()=>{
            this.isSubmit=false;
          }
        )
      );
    }
  }
  get form() {
    return this.registerForm.controls
  }
  initForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.email]],
      password: ['', [Validators.required,Validators.minLength(5)]],
      name: ['']
    })
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
