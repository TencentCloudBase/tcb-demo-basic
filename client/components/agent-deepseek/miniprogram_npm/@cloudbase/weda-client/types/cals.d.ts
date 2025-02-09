/**
 * CALS接口定义，方便查阅
 */
export interface ICALS {
    id: string;
    appId: string;
    label: string;
    main: string;
    item: Array<IPageItem>;
    resources: Array<IResourcesItem>;
    dataset: {
        state: {
            [key: string]: IState;
        };
        params: {
            [key: string]: IParams;
        };
    };
}
declare enum ItemType {
    PAGE = "PAGE"
}
interface IPageItem {
    id: string;
    type: ItemType;
    component: string;
    attributes: {
        backgroundColor: string;
        backgroundColorBottom: string;
        backgroundColorTop: string;
        backgroundTextStyle: string;
        enablePullDownRefresh: boolean;
        navigationBarBackgroundColor: string;
        navigationBarTextStyle: string;
        navigationStyle: string;
        pageOrientation: string;
        reachBottomDistance: string;
        title: string;
    };
    items: Array<IComponentItem>;
}
interface IComponentItem {
    id: string;
    module: string;
    component: string;
    attributes: {
        [key: string]: string;
    };
    items: Array<IComponentItem>;
    listeners: Array<IListeners>;
    directives: {
        ':if': boolean;
    };
    class?: string;
    style?: string;
    extra: {
        commonStyle: {
            self: {
                [key: string]: string;
            };
            size: {
                width: string;
                height: string;
            };
            border: {
                type: string;
                color: string;
                width: string;
                radiusInfo: {
                    topLeft: string;
                    topRight: string;
                    bottomLeft: string;
                    bottomRight: string;
                };
            };
            custom: [];
            margin: {
                top: number;
                left: number;
                right: number;
                bottom: number;
            };
            zIndex: number;
            display: string;
            padding: {
                top: number;
                left: number;
                right: number;
                bottom: number;
            };
            position: {
                position: string;
            };
            background: {
                color: string;
                bgType: string;
            };
        };
        xIndex: number;
    };
}
interface IListeners {
    id: string;
    eventName: string;
    type: string;
    handler: {
        name: string;
        module: string;
        params: {
            target: string;
        };
    };
    isCapturePhase: boolean;
}
interface IState {
    name: string;
    varType: string;
    dataType: string;
    initMethod: {
        name: string;
        params: {
            [key: string]: string;
        };
    };
    initialValue: string;
    dataSourceName?: string;
    updateMethod?: {
        name: string;
        params: string;
    };
}
/**
 * 资源，主要是代码
 */
interface IResourcesItem {
    id: string;
    code: string;
    name: string;
    path: string;
    pageId: string;
    system: boolean;
    oldName: string;
    type: string;
    codeType: string;
}
/**
 * 参数变量
 */
interface IParams {
    varType: string;
    dataType: string;
    initMethod: {
        name: string;
        params: {
            [key: string]: string;
        };
    };
    name: string;
    required: boolean;
    sampleValue: string;
}
export {};
