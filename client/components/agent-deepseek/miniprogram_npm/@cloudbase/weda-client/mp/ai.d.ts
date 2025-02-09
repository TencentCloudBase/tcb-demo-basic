import type { IAppAPI, IMpAuth, IRouterAPI } from '../types/mp';
export declare function createMpAiAPI(ctx: Omit<IAppAPI<IMpAuth>, keyof IRouterAPI>): {
    ai: {
        LLM: {
            chat: (params: {
                provider: string;
                model: string;
                messages: import("@cloudbase/ai").ChatModelMessage[];
                stream: boolean;
                temperature: number;
                top_p: number;
                varPath?: string;
                setStateType: string;
                callbackEventFlowId?: string;
            }, $w: any) => Promise<any>;
        };
        bot: {
            getFeedback: (params: any) => any;
            getRecommendQuestions: (params: any, $w: any) => Promise<{
                textStream: AsyncIterable<string>;
                eventStream: {
                    [Symbol.asyncIterator](): any;
                    next(): Promise<{
                        done?: boolean;
                        value?: unknown;
                    }>;
                };
            }>;
            sendMessage: (params: any, $w: any) => Promise<{
                textStream: AsyncIterable<string>;
                eventStream: {
                    [Symbol.asyncIterator](): any;
                    next(): Promise<{
                        done?: boolean;
                        value?: unknown;
                    }>;
                };
            }>;
        };
    };
};
export declare function createAiMethods(ctx: Omit<IAppAPI<IMpAuth>, keyof IRouterAPI>): {
    LLM: {
        chat: (params: {
            provider: string;
            model: string;
            messages: Array<import('@cloudbase/ai').ChatModelMessage>;
            stream: boolean;
            temperature: number;
            top_p: number;
            varPath?: string;
            setStateType: string;
            callbackEventFlowId?: string;
        }, $w: any) => Promise<any>;
    };
    bot: {
        getFeedback: (params: any) => any;
        getRecommendQuestions: (params: any, $w: any) => Promise<{
            textStream: AsyncIterable<string>;
            eventStream: {
                [Symbol.asyncIterator](): any;
                next(): Promise<{
                    done?: boolean;
                    value?: unknown;
                }>;
            };
        }>;
        sendMessage: (params: any, $w: any) => Promise<{
            textStream: AsyncIterable<string>;
            eventStream: {
                [Symbol.asyncIterator](): any;
                next(): Promise<{
                    done?: boolean;
                    value?: unknown;
                }>;
            };
        }>;
    };
};
interface AsyncIterable<T = unknown> {
    [Symbol.asyncIterator](): AsyncIterator<T>;
}
export {};
