import { BehaviorSubject, Observable } from "rxjs";
import { take } from "rxjs/operators";

import { Injectable } from "@angular/core";
import { CryptoBusinessLogicService, UserKeyService } from "@crypto";
import { User } from "@identity";
import { DataUtil } from "@util";

import { UserService } from "../../identity/services/user.service";

@Injectable({
  providedIn: "root"
})
export class UserDataService {

  public sortByBehaviorSubject: BehaviorSubject<string> = new BehaviorSubject<string>("None");
}
