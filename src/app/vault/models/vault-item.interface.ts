import { Folder } from "@folder";
import { Password } from "@password";
import { TypeEnum } from "@shared";
import { ItemIconEnum } from "@ui-kit";

export class VaultItem {
  object: Folder | Password;
  itemType: TypeEnum;
  icon: ItemIconEnum;
  type: TypeEnum;
}
