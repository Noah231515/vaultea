import { Folder } from "@folder";
import { Password } from "@password";
import { TypeEnum } from "@shared";

export class VaultItem {
  object: Folder | Password;
  itemType: TypeEnum;
}
