import { IAppAPI, IMpAuth } from '../../types';
interface IQueryContext {
    $app?: IAppAPI<IMpAuth>;
    $w?: any;
    $page?: any;
    $comp?: any;
}
export declare class Query {
    #private;
    _schema: {};
    initPromise: any;
    constructor({ schema, context, options, }: {
        schema: any;
        context: IQueryContext;
        options?: {
            looseError?: boolean;
        };
    });
    get id(): any;
    get label(): any;
    get description(): any;
    get data(): any;
    get error(): any;
    get isFetching(): boolean;
    trigger(additionalScope: any, options?: {}): Promise<void>;
    reset(): void;
    destroy(): void;
    /**
     * 用于调试
     */
    _toSchema(): any;
    toJSON(): {};
}
export declare function generateDatasetQuery(schema: any, context: any, options?: any): {};
export {};
