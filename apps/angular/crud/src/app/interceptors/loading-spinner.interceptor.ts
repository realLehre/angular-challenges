import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { LoadingSpinnerService } from '../services/loading-spinner.service';

export class LoadingSpinnerInterceptor implements HttpInterceptor {
  loadingSpinnerService = inject(LoadingSpinnerService);
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    this.loadingSpinnerService.showSpinner();
    return next.handle(req).pipe(
      finalize(() => {
        this.loadingSpinnerService.hideSpinner();
      }),
    );
  }
}
