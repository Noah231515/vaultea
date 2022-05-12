import { BehaviorSubject, Observable } from "rxjs";

import { Injectable } from "@angular/core";
import { UrlSegment } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class UrlStateService {
  private currentUrlSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public currentUrl: Observable<string> = this.currentUrlSubject.asObservable();

  public next(urlSegment: UrlSegment[]): void {
    this.currentUrlSubject.next(urlSegment.toString());
  }
}
