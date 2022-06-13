import { BehaviorSubject, Observable } from "rxjs";
import { take } from "rxjs/operators";

import { Injectable } from "@angular/core";
import { UserKeyService } from "@crypto";
import { User, UserService } from "@identity";

import { UserPreferences } from "../models/user-preferences.model";

@Injectable({
  providedIn: 'root'
})
export class UserPreferenceStateService {
  private userPreferencesBehaviorSubject: BehaviorSubject<UserPreferences> = new BehaviorSubject<UserPreferences>(null);
  public userPreferencesObservable: Observable<UserPreferences> = this.userPreferencesBehaviorSubject.asObservable();

  constructor(
    private userService: UserService,
  ) { 
    this.userService
      .userObservable
      .pipe(
        take(1)
      )
      .subscribe((user: User) => {
        this.updateUserPreferences(user.userPreferences);
      });
  }

  public updateUserPreferences(userPreferences: UserPreferences): void {
    this.userPreferencesBehaviorSubject.next(userPreferences);
  }
}
