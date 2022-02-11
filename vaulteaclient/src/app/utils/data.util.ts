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

  public static snakeCaseToCamelCase(string: string): string {
    if (string.includes("_")) {
      const parts = string.split("_");
      for (let i = 1; i < parts.length; i++) {
        const part = parts[i];
        parts[i] = part.replace(part.charAt(0), part.charAt(0).toUpperCase());
      }
      return parts.join("");
    }
    return string;
  }

  public static objectKeysToSnakeCase(object: any): void {
    Object.keys(object).forEach(key => {
      const camelCase = this.camelCaseToSnakeCase(key);
      if (camelCase != key) {
        object[this.camelCaseToSnakeCase(key)] = object[key];
        delete object[key];
      }
    });
  }

  public static transformToNestedState(folders: Folder[]): Folder[] { // TODO: Fix broken children on adding a folder
    folders.forEach(folder => {
      if (!folder.childFolders?.length) {
        folder.childFolders = [];
      }

      if (folder.folderId) { // If folder is a child
        folder.pathNodes = [];
        const parentFolder = folders.find(f => f.id === folder.folderId);

        if (parentFolder) {
          parentFolder.childFolders.push(folder);
          if (!parentFolder.pathNodes) { // If parent hasn't been iterated over yet
            parentFolder.pathNodes = this.getPathNodes(folders, folder);
          }
          folder.pathNodes = folder.pathNodes.concat(parentFolder.pathNodes);
          folder.pathNodes.push(parentFolder);
        }
      } else { // If folder is a root
        folder.pathNodes = [];
      }
    });
    return folders.filter(f => !f.folderId);
  }

  public static getPathNodes(folders: Folder[], folder: Folder): Folder[] {
    let folderId: any = folder.folderId;

    const results: Folder[] =  [];
    while (folderId) {
      const parentFolder = folders.find(f => f.id === folderId);
      if (parentFolder) {
        results.push(parentFolder);
      }
      folderId = parentFolder?.folderId;
    }
    return results;
  }

  public static buildPathString(folder: Folder): string {
    let result = "Vault/";
    for (let i = folder.pathNodes.length - 1 ; i >= 0; i--) {
      result = result.concat(folder.pathNodes[i].name) + "/";
    }
    result = result.concat(folder.name);
    return result;
  }
}
