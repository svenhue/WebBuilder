interface Dir{
    name: string;
    files: Array<{name: string, value: Uint8Array}>;
    subDirs: Dir[];
}


export { Dir}