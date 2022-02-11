import { Folder } from "@folder";

import { Password } from "../password/password.model";

export class User {
  id: string;
  username: string;
  accessToken: string;
  key: string;
  vaultId: string;
  folders: Folder[];
  passwords: Password[];
}
