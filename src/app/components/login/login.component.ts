import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import {
  assessmentReportSelector,
  currentUserSelector,
  errorSelector,
  loadingtSelector,
} from '../../state/selectors';
import { AppState } from '../../state/app.state';
import * as actions from 'src/app/state/user.actions';
import { Observable } from 'rxjs/internal/Observable';
import { Report } from 'src/app/models/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  hide = true;

  loading$: Observable<boolean> = this.store.select(loadingtSelector);
  loginError$: Observable<boolean> = this.store.select(errorSelector);

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
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
    const email = this.form.email.value;
    const password = this.form.password.value;
    if (this.loginForm.invalid) {
      return;
    }

    this.store.dispatch(actions.getCurrentUser({ email, password }));
  }
}
