import { Password } from "@password";
import { TypeEnum } from "@shared";

import { Folder } from "../../../folder/folder.model";

export interface CardData {
  object: Folder | Password;
  type: TypeEnum;
}
