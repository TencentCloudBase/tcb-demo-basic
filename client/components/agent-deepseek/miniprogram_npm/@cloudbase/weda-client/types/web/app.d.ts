/**
 * web app.init初始化参数
 */
export interface IWebInitParams {
    /**
     * 环境id
     */
    envId: string;
    /**
     * 是否是正式环境
     */
    isProd: boolean;
    /**
     * portal:企业工作台
     */
    type: string;
    /**
     * 登录后的回调函数，调用auth.signIn后的执行回调函数，例如可跳转到登录页
     */
    login?: () => void;
}
