export class KeysToOmitConstant {
  public static readonly FOLDER: string[] = [
    "id",
    "vaultId",
    "folderId",
    "pathNodes",
    "childFolders",
    "starred"
  ];

  public static readonly PASSWORD: string[] = [
    "id",
    "vaultId",
    "folderId",
    "expireDate",
    "starred"
  ];
}
