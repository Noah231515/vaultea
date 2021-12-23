import { TypeEnum } from "@shared";

export interface Card {
  objectId: string;
  title: string;
  description: string;
  type: TypeEnum
}
