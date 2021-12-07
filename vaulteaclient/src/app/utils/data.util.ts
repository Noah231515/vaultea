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
}
