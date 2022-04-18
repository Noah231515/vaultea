export class Folder {
  public id: string;
  public name: string;
  public description: string;
  public folderId: string;
  public starred: boolean;

  /** Client side defined fields */
  public pathNodes: Folder[] = [];
  public childFolders: Folder[] = [];
}
