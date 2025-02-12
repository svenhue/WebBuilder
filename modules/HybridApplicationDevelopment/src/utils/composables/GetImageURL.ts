export function GetImageURL(path: string, name: string): string {
    return new URL(path + name, import.meta.url).href
}