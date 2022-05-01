/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserService } from "@authentication";
import { SnackBarService } from "@shared";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private TOKEN_HEADER_KEY: string = "Authorization";

  constructor(
      private snackbarService: SnackBarService,
      private userService: UserService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;

    const loggingInOrSigningUp = authReq.url.includes("login") || authReq.url.includes("signup")
    const token = this.userService?.getUser()?.accessToken;
    if (token != null && !loggingInOrSigningUp) {
      authReq = this.addTokenHeader(req, `Bearer ${token}`);
    }
    const handle = next.handle(authReq);
    return handle.pipe(
      catchError(err => {
        this.snackbarService.open(err.message);
        return throwError(err);
      })
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set(this.TOKEN_HEADER_KEY, token)
    });
  }
}
