import { Folder } from "@folder";
import { UserPreferences } from "@userPreferences";

import { Password } from "../../password/password.model";

export class User {
  id: string;
  username: string;
  accessToken: string;
  key: string;
  folders: Folder[];
  passwords: Password[];
  userPreferences: UserPreferences;
}
