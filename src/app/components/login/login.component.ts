import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  currentUserSelector,
  errorSelector,
  loadingtSelector,
} from '../../state/selectors';
import { AppState } from '../../state/app.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean;
  email: AbstractControl;
  password: AbstractControl;
  hide = true;
  loginError: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.email = this.loginForm.get('email');
    this.password = this.loginForm.get('password');

    this.store.select(currentUserSelector).subscribe((user) => {
      if (user) {
        this.router.navigate(['']);
      }
    });

    this.store.select(loadingtSelector).subscribe((loading) => {
      this.loading = loading;
    });

    this.store.select(errorSelector).subscribe((loginError) => {
      this.loginError = loginError;
    });
  }

  get form() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    let email = this.form.email.value;
    let password = this.form.password.value;
    if (this.loginForm.invalid) {
      return;
    }
    this.store.dispatch({
      type: '[Login Component] Get current User',
      payload: { email, password },
    });
  }
}
