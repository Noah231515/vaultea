import { ButtonInterface } from "../button/button.interface";

export interface GenericDialogData {
  headerText: string;
  text: string;
  primaryButton: ButtonInterface;
  secondaryButton: ButtonInterface;
}
