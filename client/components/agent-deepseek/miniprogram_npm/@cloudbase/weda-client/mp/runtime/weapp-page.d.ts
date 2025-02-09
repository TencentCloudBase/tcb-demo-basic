import { IConfig } from '@cloudbase/weda-cloud-sdk';
import { IAppAPI, IMpAuth } from '../../types';
export declare const PAGE_ROOT_SYMBOL: unique symbol;
export declare function createPage({ app, id, widgetProps, lifecycle, state, computed, evtListeners, dataBinds, handlers, query: datasetQuery, eventFlows, pageContext, pageAttributes, resetShare, datasetProfile, checkAuth, getExpiredMessage, style, }: {
    app: IAppAPI<IMpAuth>;
    id: string;
    widgetProps: any;
    lifecycle: any;
    state: any;
    computed: any;
    evtListeners: Record<string, any>;
    handlers: Record<string, Function>;
    dataBinds?: Record<string, Record<string, Function>>;
    query?: Record<string, any>;
    eventFlows?: any[];
    pageContext?: {
        uuid?: string;
        id?: string;
    };
    pageAttributes?: Record<string, any>;
    resetShare?: boolean;
    datasetProfile?: IConfig['datasetProfiles'];
    checkAuth: (app: IAppAPI<IMpAuth>, appId: string, $page: any) => Promise<boolean>;
    getExpiredMessage: () => Promise<string>;
    style: any;
}): string;
export declare function createSimplePageAPIFromLaunchOptions(): Promise<{
    id: string;
    uuid: string;
    params: Record<string, string>;
}>;
