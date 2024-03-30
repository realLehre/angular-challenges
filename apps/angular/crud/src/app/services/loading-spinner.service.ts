import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingSpinnerService {
  isLoading = signal(false);

  showSpinner() {
    this.isLoading.set(true);
  }

  hideSpinner() {
    this.isLoading.set(false);
  }
}
