import { Folder } from "@folder";

export class User {
  id: string;
  username: string;
  accessToken: string;
  vaultId: string;
  folders: Folder[];
}
