import { BehaviorSubject } from "rxjs";

import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UserDataService {

  public sortByBehaviorSubject: BehaviorSubject<string> = new BehaviorSubject<string>("None");
}
