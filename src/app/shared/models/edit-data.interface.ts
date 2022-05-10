import { Folder } from "@folder";
import { Password } from "@password";
import { FormStateEnum } from "@ui-kit";

// TODO: Change name
export interface EditData {
  existingObject: Folder | Password;
  formState?: FormStateEnum;
}
