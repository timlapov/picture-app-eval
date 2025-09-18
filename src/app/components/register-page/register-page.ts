import {Component, inject} from '@angular/core';
import {AuthenticationApi} from '../../authentication/authentication-api';
import {AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css'
})
export class RegisterPage {
  private readonly authenticationApi = inject(AuthenticationApi);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);

  private passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : {passwordsMismatch: true};
  }

  protected readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    displayName: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4)]]
  }, {validators: this.passwordsMatchValidator});

  protected onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const {email, displayName, password} =  this.form.getRawValue();
    this.authenticationApi.register({email, displayName, password}).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.log('error', error);
      }
    })
  }
}
