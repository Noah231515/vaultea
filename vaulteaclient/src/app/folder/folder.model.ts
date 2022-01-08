export class Folder {
  public id: string;
  public vaultId: string;
  public name: string;
  public description: string;
  public parentFolderId: string;
  public childFolders: Folder[];
}
