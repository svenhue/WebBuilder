export interface IRepositoryChanges{

    changes: Array<{
        path: string,
        content: string,
        message?: string
    }>
    
}