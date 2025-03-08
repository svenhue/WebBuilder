export interface IRemoteRepository{
    contents: Array<{
        path: string,
        content: string
    }>
}