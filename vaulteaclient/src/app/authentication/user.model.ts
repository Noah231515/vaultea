import { Folder } from "@folder";

export class User {
  id: string;
  username: string;
  accessToken: string;
  key: string;
  vaultId: string;
  folders: Folder[];
}
