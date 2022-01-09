export class Folder {
  public id: string;
  public vaultId: string;
  public name: string;
  public description: string;
  public parentFolderId: string;

  /** Client side defined fields */
  public pathNodes: Folder[] = [];
  public childFolders: Folder[] = [];
}
