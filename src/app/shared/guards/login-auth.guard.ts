import { Observable } from "rxjs";

import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree
} from "@angular/router";
import { UserService } from "@identity";

@Injectable({
  providedIn: "root"
})
export class LoginAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.userService.getUser()) {
      return this.router.parseUrl("/vault/home");
    }
    return true;
  }
}
