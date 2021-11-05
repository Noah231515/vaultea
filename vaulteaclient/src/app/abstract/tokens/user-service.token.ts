import { InjectionToken } from "@angular/core";

import { UserService } from "../../services/user-service";

export const USER_SERVICE: InjectionToken<UserService> = new InjectionToken<UserService> ("User Service Token");
