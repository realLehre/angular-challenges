import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  template: `
    <mat-spinner></mat-spinner>
  `,
  styles: ``,
  imports: [MatProgressSpinnerModule],
})
export class LoadingSpinnerComponent {}
