export default class EventEmitter {
    listeners: any;
    constructor();
    on(eventName: any, listener: any): void;
    off(eventName: any, listener: any): void;
    emit(eventName: any, ...args: any[]): void;
    clear(): void;
}
interface IEventProps {
    type: string;
    currentTarget?: any;
    target?: any;
    detail?: any;
    _isCapturePhase?: boolean;
    origin?: Event;
    originEvent?: any;
}
export declare class Event {
    type: string;
    detail: any;
    /**
     * 类别应当为 typeof UserWidget
     * 当前类别为 typeof $page.widgets.xxxx
     * 添加上报确定用量
     */
    currentTarget: any;
    target?: any;
    /**
     * 内部实现
     * 外部不应该进行访问
     */
    _isCapturePhase: boolean;
    origin: Event;
    originEvent?: any;
    constructor({ type, detail, currentTarget, target, _isCapturePhase, origin, originEvent, }: IEventProps);
}
export {};
