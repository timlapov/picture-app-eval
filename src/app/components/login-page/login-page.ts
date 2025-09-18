import {Component, inject} from '@angular/core';
import {AuthenticationApi} from '../../authentication/authentication-api';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage {
  private readonly authenticationApi = inject(AuthenticationApi);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);

  protected readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  protected onSubmit() {
    console.log('submit');
    if (this.form.invalid) {
      return;
    }
    const {email, password} = this.form.getRawValue();
    this.authenticationApi.login({email, password}).subscribe({
      next: (response) => {
        console.log('login successful', response);
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1000);

      },
      error: (error) => {
        console.log('error', error);
      }
    });
  }
}
