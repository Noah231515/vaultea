export class KeysToOmitConstant {
  public static readonly FOLDER: string[] = [
    "id",
    "vaultId",
    "parentFolderId",
    "pathNodes",
    "childFolders"
  ];

  public static readonly PASSWORD: string[] = [
    "id",
    "vaultId",
    "folderId"
  ];
}
