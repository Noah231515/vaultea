export class KeysToOmitConstant {
  public static readonly FOLDER: string[] = [
    "id",
    "folderId",
    "pathNodes",
    "childFolders",
    "starred",
    "createdAt",
    "updatedAt"
  ];

  public static readonly PASSWORD: string[] = [
    "id",
    "folderId",
    "expireDate",
    "starred",
    "createdAt",
    "updatedAt",
    "expireDate",
  ];
}
