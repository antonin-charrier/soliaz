import { Vertex, Edge, GraphItemBase } from "../database/dbtypes";

export interface IGraphDb {
    createVertex<T extends Vertex>( Vertex: T ): Promise<T>;
    createEdge<TFrom extends Vertex, TTo extends Vertex>( edge: Edge<TFrom, TTo>): Promise<Edge<TFrom, TTo>>;
    query<T>( query: string, params?: any): Promise<T[]> ;
    first<T>( query: string, params?: any ): Promise<T>;
    transaction<T>( scope: (db: IGraphDb, commit: (result: T) => void, rollback: (reason?: any) => void) => void ): Promise<T>;
    updateVertex<T extends Vertex>( Vertex: T ): Promise<T>;
    deleteEdge<TFrom extends Vertex, TTo extends Vertex>( edge: Edge<TFrom, TTo> ): Promise<Edge<TFrom, TTo>>;
}