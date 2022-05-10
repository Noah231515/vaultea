import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SnackBarService } from "@ui-kit";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

/* eslint-disable @typescript-eslint/no-explicit-any */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
      private snackBarService: SnackBarService
  ) {  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(err: any) {
    if (err.status === 500) {
      this.snackBarService.open(err.message);
    }
    return throwError(err);
  }
}
