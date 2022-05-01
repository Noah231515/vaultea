import { Folder } from "@folder";

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/* eslint-disable @typescript-eslint/no-explicit-any */
export abstract class DataUtil {

  public static camelCaseToSnakeCase(string: string): string {
    if (string.match(/[A-Z]/g)) {
      return string.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    }
    return string;
  }

  public static setPathNodes(folders: Folder[]): void {
    folders.forEach(folder => {
      if (folder.folderId) {
        folder.pathNodes = this.traversePath(folder, folders);
      } else {
        folder.pathNodes = [];
      }
    })
  }

  // TODO: Optimize
  private static traversePath(folder: Folder, folders: Folder[]): Folder[] {
    const results: Folder[] =  [];
    let folderId = folder.folderId;

    while (folderId) {
      const parentFolder = folders.find(f => f.id === folderId);
      if (parentFolder) {
        results.push(parentFolder);
      }
      folderId = parentFolder?.folderId;
    }
    return results.reverse();
  }

  public static setChildFolders(folders: Folder[]): void {
    folders.forEach(folder => {
      folder.childFolders = folders.filter(x => x.folderId === folder.id)
    });
  }

  public static buildPathString(folder: Folder): string {
    let result = "Vault/";
    for (let i = 0; i < folder.pathNodes.length; i++) {
      result = result.concat(folder.pathNodes[i].name) + "/";
    }
    result = result.concat(folder.name);
    return result;
  }
}
