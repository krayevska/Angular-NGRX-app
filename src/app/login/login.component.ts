import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { User } from '../interfaces';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  email: AbstractControl;
  password: AbstractControl;
  hide = true;

  user$: Observable<User[]>;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private store: Store<{ user: User[] }>
  ) {
    this.user$ = store.select('user');
  }

  ngOnInit() {
    console.log('ON INIT LOGIN');
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.email = this.loginForm.get('email');
    this.password = this.loginForm.get('password');
  }

  get form() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    console.log('SUBMIT');
    console.log('this.form.email.value ', this.form.email.value);
    console.log('this.form.password.value ', this.form.password.value);
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService
      .login(this.form.email.value, this.form.password.value)
      .pipe(take(1))
      .subscribe(
        (data) => {
          console.log('DATA ', data);
          this.router.navigate(['']);
        },
        (error) => {
          console.log('ERROR ', error.message);
        }
      );
  }

  getErrorMessage(): void {
    console.log('ERROR');
  }
}
