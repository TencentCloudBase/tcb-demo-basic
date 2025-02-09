export declare class EventFlow {
    #private;
    id: string;
    description?: string;
    constructor({ schema, context, options }: {
        schema: any;
        context: any;
        options: any;
    });
    trigger(additionalScope: any, options?: {}): any;
}
export declare function generateEventFlows(flows: any[], context: any, options?: any): {};
