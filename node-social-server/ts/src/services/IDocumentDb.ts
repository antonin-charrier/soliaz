export interface IDocumentDb {
    find<T>(collection: string, filter: Object): Promise<T[]>;
    findOneById<T>(collection: string, objectId: string ): Promise<T>;
    insert<T>(collection: string, model: T): Promise<T>;
    update<T>(collection: string, objectId: string, model: T): Promise<T>;
    remove<T>(collection: string, objectId: string): Promise<any>;
}