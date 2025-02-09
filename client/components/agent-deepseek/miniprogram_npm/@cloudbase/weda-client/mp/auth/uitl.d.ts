export declare function checkAnonymous(): Promise<boolean>;
export declare function findLoginPage(): any;
export declare function getAccessPermission(appId: any, packageName: string, pageId: any, isAdminPortal?: boolean): Promise<any>;
export declare function cleanAccessPermissionCache(): void;
export declare function redirectToLogin(currentPage?: any, extraUrlParams?: {}): Promise<boolean>;
export declare function getAuthConfig(isAdminPortal?: boolean): Promise<any>;
