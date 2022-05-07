import { TypeEnum } from '../../../shared/enums/type.enum';

export interface TreeItem {
  id: string;
  name: string;
  folderId: string;
  itemType: TypeEnum
  childItems: TreeItem[];
}
