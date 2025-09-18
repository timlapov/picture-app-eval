import {Component, inject, signal} from '@angular/core';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {PictureApi} from '../../services/picture-api';
import {ToastNotification} from '../../services/toast-notification';
import {environment} from '../../../environments/environment.development';
import {AuthenticationApi} from '../../authentication/authentication-api';

@Component({
  selector: 'app-add-picture',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-picture.html',
  styleUrl: './add-picture.css'
})
export class AddPicture {
  private readonly toastNotificationService = inject(ToastNotification);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);
  private readonly pictureApi = inject(PictureApi);
  private readonly authApi = inject(AuthenticationApi);

  private selectedFile: File | null = null;

  protected readonly isUploading = signal(false);
  protected readonly isSubmitting = signal(false);

  protected readonly form = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });

  // Track file selection separately
  protected readonly fileSelected = signal(false);

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];
      this.fileSelected.set(true);
    }
  }

  onSubmit() {
    if (this.form.invalid || !this.selectedFile) {
      this.form.markAllAsTouched();
      if (!this.selectedFile) {
        this.addToast('error', 'Please select an image file');
      }
      return;
    }

    this.isSubmitting.set(true);
    this.isUploading.set(true);

    // Verify authentication with server before proceeding
    this.authApi.checkAuthStatus().subscribe({
      next: () => {
        this.proceedWithUpload();
      },
      error: () => {
        this.isSubmitting.set(false);
        this.isUploading.set(false);

        // Clear invalid session data
        localStorage.removeItem('user');
        this.authApi.user.set(null);

        this.addToast('error', 'Your session has expired. Please log in again.');
        this.authApi.logout();
        void this.router.navigate(['/login']);
      }
    });
  }

  private proceedWithUpload() {

    this.pictureApi.upload(this.selectedFile!).subscribe({
      next: (uploadResponse) => {
        this.isUploading.set(false);

        // Step 2: Create the image URL
        const imageUrl = `${environment.apiUrl}/uploads/${uploadResponse.filename}`;
        const pictureData = {
          title: this.form.controls.title.value,
          description: this.form.controls.description.value,
          image: imageUrl
        };

        this.pictureApi.addPicture(pictureData).subscribe({
          next: (picture) => {
            this.isSubmitting.set(false);
            this.addToast('success', 'Picture added successfully!');
            // Navigate to the picture details page
            this.router.navigate(['/picture', picture.id]);
          },
          error: () => {
            this.isSubmitting.set(false);
            this.addToast('error', 'Error adding picture. Please try again.');
          }
        });
      },
      error: () => {
        this.isUploading.set(false);
        this.isSubmitting.set(false);
        this.addToast('error', 'Error uploading image. Please try again.');
      }
    });
  }

  private addToast(type: 'success' | 'error' | 'info' | 'warning', text: string) {
    this.toastNotificationService.addMessage({type, text});
  }
}
