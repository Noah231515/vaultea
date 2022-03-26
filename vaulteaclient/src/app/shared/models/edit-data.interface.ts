import { FormStateEnum } from "@abstract";
import { Folder } from "@folder";
import { Password } from "@password";

// TODO: Change name
export interface EditData {
  existingObject: Folder | Password;
  formState?: FormStateEnum;
}
