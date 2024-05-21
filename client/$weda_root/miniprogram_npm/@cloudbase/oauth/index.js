module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1715324755314, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuth = exports.Auth = exports.initializeApp = exports.ErrorType = exports.Client = exports.initializeClient = void 0;
const auth_1 = require("./auth");
const app_1 = require("./app");
function initializeClient(options) {
    return new Client(options);
}
exports.initializeClient = initializeClient;
class Client {
    constructor(initOptions) {
        this.app = (0, app_1.initializeApp)(initOptions);
        this.auth = (0, auth_1.getAuth)(this.app);
    }
}
exports.Client = Client;
var request_1 = require("./app/request");
Object.defineProperty(exports, "ErrorType", { enumerable: true, get: function () { return request_1.ErrorType; } });
var app_2 = require("./app");
Object.defineProperty(exports, "initializeApp", { enumerable: true, get: function () { return app_2.initializeApp; } });
var auth_2 = require("./auth");
Object.defineProperty(exports, "Auth", { enumerable: true, get: function () { return auth_2.Auth; } });
Object.defineProperty(exports, "getAuth", { enumerable: true, get: function () { return auth_2.getAuth; } });
//# sourceMappingURL=index.js.map
}, function(modId) {var map = {"./auth":1715324755315,"./app":1715324755325,"./app/request":1715324755326}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1715324755315, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = exports.getAuth = exports.DeviceAuthorizeState = exports.VerificationUsages = exports.ErrorType = void 0;
const consts_1 = require("./consts");
const oauthclient_1 = require("../oauthclient");
const captcha_1 = require("../captcha");
const internal_1 = require("../app/internal");
var consts_2 = require("./consts");
Object.defineProperty(exports, "ErrorType", { enumerable: true, get: function () { return consts_2.ErrorType; } });
Object.defineProperty(exports, "VerificationUsages", { enumerable: true, get: function () { return consts_2.VerificationUsages; } });
Object.defineProperty(exports, "DeviceAuthorizeState", { enumerable: true, get: function () { return consts_2.DeviceAuthorizeState; } });
/**
 * Returns the existing `Auth` instance that is associated with the app
 */
function getAuth(app, initOptions) {
    return (0, internal_1._getComponent)(app, "auth", () => {
        const credentialsClient = (0, oauthclient_1.getOAuthClient)(app, initOptions);
        const baseRequest = credentialsClient.request.bind(credentialsClient);
        const captcha = (0, captcha_1.getCaptcha)(app, { request: baseRequest });
        return new Auth({
            credentialsClient: credentialsClient,
            captcha: captcha,
        });
    });
}
exports.getAuth = getAuth;
/**
 * Auth
 */
class Auth {
    /**
     * constructor
     * @param {AuthOptions} opts
     */
    constructor(opts) {
        this.request = opts.captcha.request.bind(opts.captcha);
        this.credentialsClient = opts.credentialsClient;
    }
    /**
     * Sign in.
     * @param {SignInRequest} params A SignInRequest Object.
     * @return {Promise<Credentials>} A Promise<Credentials> object.
     */
    async signIn(params) {
        const credentials = await this.request(consts_1.ApiUrls.AUTH_SIGN_IN_URL, {
            method: "POST",
            withBasicAuth: true,
            body: params,
        });
        await this.credentialsClient.setCredentials(credentials);
        return Promise.resolve(credentials);
    }
    /**
     * Sign in Anonymously
     * @return {Promise<Credentials>} A Promise<Credentials> object.
     */
    async signInAnonymously() {
        const credentials = await this.request(consts_1.ApiUrls.AUTH_SIGN_IN_ANONYMOUSLY_URL, {
            method: "POST",
            withBasicAuth: true,
            body: {},
        });
        await this.credentialsClient.setCredentials(credentials);
        return Promise.resolve(credentials);
    }
    /**
     * Sign up.
     * @param {SignUpRequest} params A SignUpRequest Object.
     * @return {Promise<Credentials>} A Promise<Credentials> object.
     */
    async signUp(params) {
        const data = await this.request(consts_1.ApiUrls.AUTH_SIGN_UP_URL, {
            method: "POST",
            withBasicAuth: true,
            body: params,
        });
        await this.credentialsClient.setCredentials(data);
        return Promise.resolve(data);
    }
    /**
     * Sign out.
     * @param {SignoutRequest} params A SignoutRequest Object.
     * @return {SignoutReponse} A Promise<SignoutReponse> object.
     */
    async signOut(params) {
        var resp = {};
        if (!params) {
            params = {};
        }
        try {
            resp = await this.request(consts_1.ApiUrls.AUTH_SIGNOUT_URL, {
                method: "POST",
                withCredentials: true,
                body: params,
            });
        }
        catch (err) {
            if (err.error !== oauthclient_1.ErrorType.UNAUTHENTICATED) {
                console.log("sign_out_error", err);
            }
        }
        await this.credentialsClient.setCredentials();
        return resp;
    }
    /**
     * Revoke All Devices
     * @return {Object} A Promise<void> object.
     */
    async revokeAllDevices() {
        await this.request(consts_1.ApiUrls.AUTH_REVOKE_ALL_URL, {
            method: "DELETE",
            withCredentials: true,
        });
    }
    /**
     * Revoke Device
     * @return {Object} A Promise<void> object.
     */
    async revokeDevice(params) {
        await this.request(consts_1.ApiUrls.AUTHORIZED_DEVICES_DELETE_URL + params.device_id, {
            method: "DELETE",
            withCredentials: true,
        });
    }
    /**
     * Send the VerificationCode.
     * @param {SendVerificationCodeRequest} params A GetVerificationRequest Object.
     * @return {Promise<SendVerificationCodeResponse>} A Promise<GetVerificationResponse> object.
     */
    async sendVerificationCode(params) {
        let withBasicAuth = false;
        let withCredentials = false;
        // 发送短信时，如果时给当前用户发，则需要带上鉴权信息
        if (params.target == "CUR_USER") {
            withCredentials = true;
        }
        else {
            const hasLogin = await this.hasLoginState();
            if (hasLogin) {
                withCredentials = true;
            }
            else {
                withBasicAuth = true;
            }
        }
        return this.request(consts_1.ApiUrls.VERIFICATION_URL, {
            method: "POST",
            withBasicAuth: withBasicAuth,
            withCredentials: withCredentials,
            body: params,
            withCaptcha: true,
        });
    }
    /**
     *  Verify the code
     * @param {VerifyRequest} params A VerifyRequest Object.
     * @return {Promise<VerifyResponse>} A Promise<VerifyResponse> object.
     */
    async verify(params) {
        return this.request(consts_1.ApiUrls.VERIFY_URL, {
            method: "POST",
            withBasicAuth: true,
            body: params,
        });
    }
    /**
     * Reset Password
     * @param params A ResetPasswordRequest Object
     */
    async resetPassword(params) {
        return this.request(consts_1.ApiUrls.RESET_PASSWORD_URL, {
            method: "POST",
            withBasicAuth: true,
            body: params,
        });
    }
    /**
     * Gen provider redirect uri.
     * @param {GenProviderRedirectUriRequest} params A GenProviderRedirectUriRequest object.
     * @return {Promise<GenProviderRedirectUriResponse>} A Promise<GenProviderRedirectUriResponse> object.
     */
    async genProviderRedirectUri(params) {
        const otherParams = params.other_params;
        delete params.other_params;
        let url = `${consts_1.ApiUrls.PROVIDER_URI_URL}?${Auth.parseParamsToSearch(params)}`;
        if (otherParams) {
            otherParams.forEach((value, key) => {
                url += `&other_params[${key}]=${encodeURIComponent(value)}`;
            });
        }
        return this.request(url, {
            method: "GET",
            withBasicAuth: true,
        });
    }
    /**
     * Grant provider token.
     * @param {GrantProviderTokenRequest} params A GrantProviderTokenRequest object.
     * @return {Promise<GrantProviderTokenResponse>} A Promise<GrantProviderTokenResponse> object.
     */
    async grantProviderToken(params) {
        return this.request(consts_1.ApiUrls.PROVIDER_TOKEN_URL, {
            method: "POST",
            withBasicAuth: true,
            body: params,
        });
    }
    /**
     * Grant provider token.
     * @param {PatchProviderTokenRequest} params A PatchProviderTokenRequest object.
     * @return {Promise<PatchProviderTokenResponse>} A Promise<PatchProviderTokenResponse> object.
     */
    async patchProviderToken(params) {
        return this.request(consts_1.ApiUrls.PROVIDER_TOKEN_URL, {
            method: "PATCH",
            withBasicAuth: true,
            body: params,
        });
    }
    /**
     * Signin with provider request.
     * @param {SignInWithProviderRequest} params A SignInWithProviderRequest object.
     * @return {Promise<Credentials>} A Promise<Credentials> object.
     */
    async signInWithProvider(params) {
        const credentials = await this.request(consts_1.ApiUrls.AUTH_SIGN_IN_WITH_PROVIDER_URL, {
            method: "POST",
            withBasicAuth: true,
            body: params,
        });
        await this.credentialsClient.setCredentials(credentials);
        return Promise.resolve(credentials);
    }
    /**
     * Bind with provider
     * @param {BindWithProviderRequest} params A BindWithProviderRequest object.
     * @return {Promise<void>} A Promise<void> object.
     */
    async bindWithProvider(params) {
        return this.request(consts_1.ApiUrls.PROVIDER_BIND_URL, {
            method: "POST",
            withBasicAuth: true,
            body: params,
            withCredentials: true,
        });
    }
    /**
     * Get the user profile.
     * @return {Promise<UserProfile>} A Promise<UserProfile> object.
     */
    async getUserProfile() {
        return this.request(consts_1.ApiUrls.USER_ME_URL, {
            method: "GET",
            withCredentials: true,
        });
    }
    /**
     * Get the user profile.
     * @return {Promise<UserProfile>} A Promise<UserProfile> object.
     */
    async updateUserProfile(params) {
        return this.request(consts_1.ApiUrls.USER_ME_URL, {
            method: "PATCH",
            withCredentials: true,
            body: params,
        });
    }
    /**
     * hasLoginState check if has login state
     * @return {Promise<boolean>} A Promise<boolean> object.
     */
    async hasLoginState() {
        try {
            await this.credentialsClient.getAccessToken();
            return true;
        }
        catch (err) {
            if (err.error === oauthclient_1.ErrorType.UNAUTHENTICATED) {
                return false;
            }
            return Promise.reject(err);
        }
    }
    /**
     * loginScope return scope of current token
     * @return {Promise<string>} A Promise<string> object.
     */
    async loginScope() {
        return this.credentialsClient.getScope();
    }
    /**
     * Trans by provider.
     * @param {TransByProviderRequest} params A TransByProviderRequest object.
     * @return {Promise<Credentials>} A Promise<Credentials> object.
     */
    async transByProvider(params) {
        return this.request(consts_1.ApiUrls.USER_TRANS_BY_PROVIDER_URL, {
            method: "PATCH",
            body: params,
            withCredentials: true,
        });
    }
    /**
     * Grant token.
     * @param {GrantTokenRequest} params A GrantTokenRequest object.
     * @return {Promise<Credentials>} A Promise<Credentials> object.
     */
    async grantToken(params) {
        const credentials = await this.request(consts_1.ApiUrls.AUTH_TOKEN_URL, {
            method: "POST",
            withBasicAuth: true,
            body: params,
        });
        await this.credentialsClient.setCredentials(credentials);
        return Promise.resolve(credentials);
    }
    /**
     * Get the provide list.
     * @return {Promise<ProvidersResponse>} A Promise<UserProfileProviderList> object.
     */
    async getProviders() {
        return this.request(consts_1.ApiUrls.PROVIDER_LIST_URL, {
            method: "GET",
            withCredentials: true,
        });
    }
    /**
     * check if username is exist
     * @param params CheckIfUserExistRequest
     */
    async checkIfUserExist(params) {
        const url = `${consts_1.ApiUrls.USER_ME_URL}?${Auth.parseParamsToSearch(params)}`;
        return this.request(url, {
            method: "GET",
        });
    }
    /**
     * unbind provider.
     * @param {UnbindProviderRequest} params
     * @return {Promise<void>}
     */
    async unbindProvider(params) {
        return this.request(`${consts_1.ApiUrls.PROVIDER_UNBIND_URL}/${params.provider_id}`, {
            method: "DELETE",
            withCredentials: true,
        });
    }
    /**
     * check Password.
     * @param {CheckPasswordRequest} params
     * @return {Promise<void>}
     */
    async checkPassword(params) {
        return this.request(`${consts_1.ApiUrls.SUDO_URL}`, {
            method: "POST",
            withCredentials: true,
            body: params,
        });
    }
    /**
     * Edit Contact 修改 手机号 或 邮箱
     * @param {EditContactRequest} params
     * @return {Promise<void>}
     */
    async editContact(params) {
        return this.request(`${consts_1.ApiUrls.EDIT_CONTACT_URL}`, {
            method: "PATCH",
            withCredentials: true,
            body: params,
        });
    }
    /**
     * Set Password.
     * @param {SetPasswordRequest} params
     * @return {Promise<void>}
     */
    async setPassword(params) {
        return this.request(`${consts_1.ApiUrls.AUTH_SET_PASSWORD_URL}`, {
            method: "PATCH",
            withCredentials: true,
            body: params,
        });
    }
    /**
     * updatePasswordByOld 使用旧密码修改密码，如果已经绑定手机号，请先：sudo，再修改密码
     * @param {UpdatePasswordRequest} params
     * @return {Promise<void>}
     */
    async updatePasswordByOld(params) {
        const sudoToken = await this.sudo({ password: params.old_password });
        return this.setPassword({
            sudo_token: sudoToken.sudo_token,
            new_password: params.new_password,
        });
    }
    /**
     * sudo
     * @param {sudo} params
     * @return {Promise<SudoResponse>}
     */
    async sudo(params) {
        return this.request(`${consts_1.ApiUrls.SUDO_URL}`, {
            method: "POST",
            withCredentials: true,
            body: params,
        });
    }
    /**
     * Get the current user verification.
     * @param {SendVerificationCodeRequest} params A SendVerificationCodeToCurrentUser Object.
     * @return {Promise<SendVerificationCodeResponse>} A Promise<SendVerificationCodeResponse> object.
     */
    async SendVerificationCodeToCurrentUser(params) {
        params.target = "CUR_USER";
        return this.request(consts_1.ApiUrls.VERIFICATION_URL, {
            method: "POST",
            body: params,
            withCredentials: true,
            withCaptcha: true,
        });
    }
    /**
     * change Bound provider.
     * @param {ChangeBoundProviderRequest} params A GetVerificationRequest Object.
     * @return {Promise<ChangeBoundProviderResponse>} A Promise<GetVerificationResponse> object.
     */
    async changeBoundProvider(params) {
        return this.request(`${consts_1.ApiUrls.PROVIDER_LIST_URL}/${params.provider_id}/trans`, {
            method: "POST",
            body: {
                provider_trans_token: params.trans_token,
            },
            withCredentials: true,
        });
    }
    /**
     * set the user profile.
     * @param {UserProfile} params A UserProfile Object.
     * @return {Promise<UserProfile>} A Promise<UserProfile> object.
     */
    async setUserProfile(params) {
        return this.request(consts_1.ApiUrls.USER_PROFILE_URL, {
            method: "PATCH",
            body: params,
            withCredentials: true,
        });
    }
    /**
     * Delete me
     * @param params
     */
    async deleteMe(params) {
        const url = `${consts_1.ApiUrls.USER_ME_URL}?${Auth.parseParamsToSearch(params)}`;
        return this.request(url, {
            method: "DELETE",
            withCredentials: true,
        });
    }
    /**
     * setCustomSignFunc set the get ticket function
     * @param getTickFn
     */
    setCustomSignFunc(getTickFn) {
        this._getCustomSignTicketFn = getTickFn;
    }
    /**
     * SignInWithCustomTicket custom signIn
     * @constructor
     */
    async SignInWithCustomTicket() {
        const customSignTicketFn = this._getCustomSignTicketFn;
        if (!customSignTicketFn) {
            return Promise.reject({
                error: "failed_precondition",
                error_description: "please use setCustomSignFunc to set custom sign function",
            });
        }
        const customTicket = await customSignTicketFn();
        return this.signInWithProvider({
            provider_id: "custom",
            provider_token: customTicket,
        });
    }
    /**
     * queryUserProfile query user profile
     * @param params queryUserProfile query user profile
     */
    async queryUserProfile(params) {
        const url = `${consts_1.ApiUrls.USER_QUERY_URL}?${Auth.parseParamsToSearch(params)}`;
        return this.request(url, {
            method: "GET",
            withCredentials: true,
        });
    }
    /**
     * Authorize oauth Authorize
     * @param params
     * @constructor
     */
    async authorize(params) {
        return this.request(consts_1.ApiUrls.AUTHORIZE_URL, {
            method: "POST",
            withCredentials: true,
            body: params,
        });
    }
    /**
     * authorize device
     * @param params
     */
    async authorizeDevice(params) {
        return this.request(consts_1.ApiUrls.AUTHORIZE_DEVICE_URL, {
            method: "POST",
            withCredentials: true,
            body: params,
        });
    }
    async deviceAuthorize(params) {
        return this.request(consts_1.ApiUrls.AUTHORIZE_DEVICE_CODE_URL, {
            method: "POST",
            withBasicAuth: true,
            body: params,
        });
    }
    /**
     * OAuth get authorize info
     * @param params
     * @constructor
     */
    async authorizeInfo(params) {
        const url = `${consts_1.ApiUrls.AUTHORIZE_INFO_URL}?${Auth.parseParamsToSearch(params)}`;
        let withBasicAuth = true;
        let withCredentials = false;
        const hasLogin = await this.hasLoginState();
        if (hasLogin) {
            withCredentials = true;
            withBasicAuth = false;
        }
        return this.request(url, {
            method: "GET",
            withBasicAuth: withBasicAuth,
            withCredentials: withCredentials,
        });
    }
    /**
     * get provider sub type
     * @returns
     */
    async getProviderSubType() {
        return this.request(consts_1.ApiUrls.GET_PROVIDER_TYPE, {
            method: 'POST',
            body: {
                provider_id: 'weda',
            },
        });
    }
    static parseParamsToSearch(params) {
        for (let key in params) {
            if (!params[key]) {
                delete params[key];
            }
        }
        const searchParams = new URLSearchParams(params);
        return searchParams.toString();
    }
}
exports.Auth = Auth;
//# sourceMappingURL=index.js.map
}, function(modId) { var map = {"./consts":1715324755316,"../oauthclient":1715324755317,"../captcha":1715324755324,"../app/internal":1715324755318}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1715324755316, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceAuthorizeState = exports.ErrorType = exports.VerificationUsages = exports.ApiUrls = void 0;
var ApiUrls;
(function (ApiUrls) {
    ApiUrls["AUTH_SIGN_IN_URL"] = "/auth/v1/signin";
    ApiUrls["AUTH_SIGN_IN_ANONYMOUSLY_URL"] = "/auth/v1/signin/anonymously";
    ApiUrls["AUTH_SIGN_IN_WITH_PROVIDER_URL"] = "/auth/v1/signin/with/provider";
    ApiUrls["AUTH_SIGN_UP_URL"] = "/auth/v1/signup";
    ApiUrls["AUTH_TOKEN_URL"] = "/auth/v1/token";
    ApiUrls["AUTH_REVOKE_URL"] = "/auth/v1/revoke";
    ApiUrls["AUTH_SIGNOUT_URL"] = "/auth/v1/user/signout";
    ApiUrls["PROVIDER_BIND_URL"] = "/auth/v1/user/provider/bind";
    ApiUrls["PROVIDER_TOKEN_URL"] = "/auth/v1/provider/token";
    ApiUrls["PROVIDER_URI_URL"] = "/auth/v1/provider/uri";
    ApiUrls["USER_ME_URL"] = "/auth/v1/user/me";
    ApiUrls["RESET_PASSWORD_URL"] = "/auth/v1/reset";
    ApiUrls["USER_QUERY_URL"] = "/auth/v1/user/query";
    ApiUrls["USER_PROFILE_URL"] = "/auth/v1/user/profile";
    ApiUrls["USER_TRANS_BY_PROVIDER_URL"] = "/auth/v1/user/trans/by/provider";
    ApiUrls["VERIFICATION_URL"] = "/auth/v1/verification";
    ApiUrls["VERIFY_URL"] = "/auth/v1/verification/verify";
    ApiUrls["PROVIDER_LIST_URL"] = "/auth/v1/user/provider";
    ApiUrls["PROVIDER_UNBIND_URL"] = "/auth/v1/user/provider";
    ApiUrls["SUDO_URL"] = "/auth/v1/user/sudo";
    ApiUrls["EDIT_CONTACT_URL"] = "/auth/v1/user/contact";
    ApiUrls["AUTH_SET_PASSWORD_URL"] = "/auth/v1/user/password";
    ApiUrls["CHECK_IF_USER_EXIST_URL"] = "/auth/v1/checkIfUserExist";
    ApiUrls["AUTHORIZE_URL"] = "/auth/v1/user/authorize";
    ApiUrls["AUTHORIZE_DEVICE_URL"] = "/auth/v1/user/device/authorize";
    ApiUrls["AUTHORIZE_DEVICE_CODE_URL"] = "/auth/v1/device/code";
    ApiUrls["AUTHORIZE_INFO_URL"] = "/auth/v1/user/authorize/info";
    ApiUrls["AUTHORIZED_URL"] = "/auth/v1/user/authorized";
    ApiUrls["AUTHORIZED_DELETE_URL"] = "/auth/v1/user/authorized/";
    ApiUrls["AUTHORIZED_DEVICES_URL"] = "/auth/v1/user/authorized/devices";
    ApiUrls["AUTHORIZED_DEVICES_DELETE_URL"] = "/auth/v1/user/authorized/devices/";
    ApiUrls["AUTH_REVOKE_ALL_URL"] = "/auth/v1/user/revoke/all";
    ApiUrls["GET_PROVIDER_TYPE"] = "/auth/v1/mgr/provider/providerSubType";
})(ApiUrls = exports.ApiUrls || (exports.ApiUrls = {}));
var VerificationUsages;
(function (VerificationUsages) {
    VerificationUsages["REGISTER"] = "REGISTER";
    VerificationUsages["SIGN_IN"] = "SIGN_IN";
    VerificationUsages["PASSWORD_RESET"] = "PASSWORD_RESET";
    VerificationUsages["EMAIL_ADDRESS_CHANGE"] = "EMAIL_ADDRESS_CHANGE";
    VerificationUsages["PHONE_NUMBER_CHANGE"] = "PHONE_NUMBER_CHANGE";
})(VerificationUsages = exports.VerificationUsages || (exports.VerificationUsages = {}));
var ErrorType;
(function (ErrorType) {
    ErrorType["INVALID_ARGUMENT"] = "invalid_argument";
    ErrorType["DEADLINE_EXCEEDED"] = "deadline_exceeded";
    ErrorType["NOT_FOUND"] = "not_found";
    ErrorType["ALREADY_EXISTS"] = "already_exists";
    ErrorType["PERMISSION_DENIED"] = "permission_denied";
    ErrorType["ABORTED"] = "aborted";
    ErrorType["OUT_OF_RANGE"] = "out_of_range";
    ErrorType["UNIMPLEMENTED"] = "unimplemented";
    ErrorType["INTERNAL"] = "internal";
    ErrorType["UNAVAILABLE"] = "unavailable";
    ErrorType["DATA_LOSS"] = "data_loss";
    // CommonError
    ErrorType["CAPTCHA_REQUIRED"] = "captcha_required";
    ErrorType["CAPTCHA_INVALID"] = "captcha_invalid";
    ErrorType["INVALID_PASSWORD"] = "invalid_password";
    ErrorType["PASSWORD_NOT_SET"] = "password_not_set";
    ErrorType["INVALID_STATUS"] = "invalid_status";
    ErrorType["USER_PENDING"] = "user_pending";
    ErrorType["USER_BLOCKED"] = "user_blocked";
})(ErrorType = exports.ErrorType || (exports.ErrorType = {}));
var DeviceAuthorizeState;
(function (DeviceAuthorizeState) {
    // 完成
    DeviceAuthorizeState["ACCOMPLISHED"] = "ACCOMPLISHED";
    // 等待连接
    DeviceAuthorizeState["WAITING_CONNECT"] = "WAITING_CONNECT";
    // 等待用户点击同意界面
    DeviceAuthorizeState["WAITING_CONSENT"] = "WAITING_CONSENT";
    // 用户拒绝授权
    DeviceAuthorizeState["ACCESS_DENIED"] = "ACCESS_DENIED";
})(DeviceAuthorizeState = exports.DeviceAuthorizeState || (exports.DeviceAuthorizeState = {}));
//# sourceMappingURL=consts.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1715324755317, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.getOAuthClient = exports.ErrorType = void 0;
const internal_1 = require("../app/internal");
const oauthclient_1 = require("./oauthclient");
var consts_1 = require("./consts");
Object.defineProperty(exports, "ErrorType", { enumerable: true, get: function () { return consts_1.ErrorType; } });
function getOAuthClient(app, opts) {
    return (0, internal_1._getComponent)(app, "oauthclient", () => {
        const appOpts = app.options;
        const oauthOpts = {
            clientId: appOpts.clientId,
            clientSecret: appOpts.clientSecret,
            request: appOpts.request,
            storage: appOpts.storage,
        };
        return (new oauthclient_1.OAuth2Client(oauthOpts));
    });
}
exports.getOAuthClient = getOAuthClient;
//# sourceMappingURL=index.js.map
}, function(modId) { var map = {"../app/internal":1715324755318,"./oauthclient":1715324755319,"./consts":1715324755320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1715324755318, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports._getComponent = void 0;
/**
 *
 * @param app - App instance
 * @param name - service name
 * @param creator - new T
 *
 * @returns the provider for the service with the matching name
 *
 * @internal
 */
function _getComponent(app, name, creator) {
    const container = app.container;
    let component = container.get(name);
    if (component) {
        return component;
    }
    component = creator();
    container.set(name, component);
    return component;
}
exports._getComponent = _getComponent;
//# sourceMappingURL=internal.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1715324755319, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuth2Client = exports.LocalCredentials = exports.generateRequestId = exports.toResponseError = void 0;
const consts_1 = require("./consts");
const uuid_1 = require("../utils/uuid");
const base64_1 = require("../utils/base64");
const promise_1 = require("../utils/promise");
const RequestIdHeaderName = 'x-request-id';
const DeviceIdHeaderName = 'x-device-id';
const DeviceIdSectionName = 'device_';
const toResponseError = (error, options) => {
    let responseError;
    const formatOptions = options || {};
    if (error instanceof Error) {
        responseError = {
            error: formatOptions.error || consts_1.ErrorType.LOCAL,
            error_description: formatOptions.error_description || error.message,
            error_uri: formatOptions.error_uri,
            details: formatOptions.details || error.stack,
        };
    }
    else {
        const formatError = error || {};
        responseError = {
            error: formatOptions.error || formatError.error || consts_1.ErrorType.LOCAL,
            error_description: formatOptions.error_description || formatError.error_description,
            error_uri: formatOptions.error_uri || formatError.error_uri,
            details: formatOptions.details || formatError.details,
        };
    }
    return responseError;
};
exports.toResponseError = toResponseError;
/**
 * Generate request id.
 * @return {string}
 */
function generateRequestId() {
    return (0, uuid_1.uuidv4)();
}
exports.generateRequestId = generateRequestId;
/**
 * Check if credentials is expired.
 * @param {Credentials} credentials
 * @return {boolean}
 */
function isCredentialsExpired(credentials) {
    let isExpired = true;
    if (credentials && credentials.expires_at && credentials.access_token) {
        isExpired = credentials.expires_at < new Date();
    }
    return isExpired;
}
/**
 * Local credentials.
 * Local credentials, with memory cache and storage cache.
 * If the memory cache expires, the storage cache is automatically loaded.
 */
class LocalCredentials {
    /**
     * constructor
     * @param {LocalCredentialsOptions} options
     */
    constructor(options) {
        this._credentials = null;
        this._promiseOnce = new promise_1.PromiseOnce();
        this._tokenSectionName = options.tokenSectionName;
        this._storage = options.storage;
    }
    /**
     * setCredentials Provides an alternative fetch api request implementation with auth credentials
     * @param {Credentials} credentials
     */
    async setCredentials(credentials) {
        if (credentials && credentials.expires_in) {
            credentials.expires_at = new Date(Date.now() + (credentials.expires_in - 30) * 1000);
            if (this._storage) {
                const tokenStr = JSON.stringify(credentials);
                await this._storage.setItem(this._tokenSectionName, tokenStr);
            }
            this._credentials = credentials;
        }
        else {
            if (this._storage) {
                await this._storage.removeItem(this._tokenSectionName);
            }
            this._credentials = null;
        }
    }
    /**
     * Get credentials.
     * @return {Promise<Credentials>}
     */
    async getCredentials() {
        return this._promiseOnce.run('getCredentials', async () => {
            if (isCredentialsExpired(this._credentials)) {
                this._credentials = await this._getStorageCredentials();
            }
            return this._credentials;
        });
    }
    /**
     * Get storage credentials.
     */
    async _getStorageCredentials() {
        return this._promiseOnce.run('_getStorageCredentials', async () => {
            let credentials = null;
            const tokenStr = await this._storage.getItem(this._tokenSectionName);
            if (tokenStr !== undefined && tokenStr !== null) {
                try {
                    credentials = JSON.parse(tokenStr);
                    if (credentials && credentials.expires_at) {
                        credentials.expires_at = new Date(credentials.expires_at);
                    }
                }
                catch (error) {
                    await this._storage.removeItem(this._tokenSectionName);
                    credentials = null;
                }
            }
            return credentials;
        });
    }
}
exports.LocalCredentials = LocalCredentials;
/**
 * OAuth2Client
 */
class OAuth2Client {
    /**
     * constructor
     * @param {OAuth2ClientOptions} options
     */
    constructor(options) {
        this._promiseOnce = new promise_1.PromiseOnce();
        this._retry = this._formatRetry(options.retry, OAuth2Client._defaultRetry);
        this._baseRequest = options.request;
        if (!options.clientSecret) {
            options.clientSecret = "";
        }
        if (options.clientId !== '') {
            this._basicAuth = "Basic " + (0, base64_1.weBtoa)(options.clientId + ":" + options.clientSecret);
        }
        this._tokenInURL = options.tokenInURL;
        this._headers = options.headers;
        // @ts-ignore
        this._storage = options.storage || defaultStorage;
        this._localCredentials = new LocalCredentials({
            tokenSectionName: 'credentials_',
            storage: this._storage,
        });
        this._refreshTokenFunc =
            options.refreshTokenFunc || this._defaultRefreshTokenFunc;
    }
    /**
     * setCredentials Provides an alternative fetch api request implementation with auth credentials
     * @param {Credentials} credentials
     * @return {Promise<void>}
     */
    setCredentials(credentials) {
        return this._localCredentials.setCredentials(credentials);
    }
    /**
     * getAccessToken return a validate access token
     */
    async getAccessToken() {
        const credentials = await this._getCredentials();
        if (credentials && credentials.access_token) {
            return Promise.resolve(credentials.access_token);
        }
        return Promise.reject({ error: consts_1.ErrorType.UNAUTHENTICATED });
    }
    /**
     * getScope return a validate access token
     */
    async getScope() {
        let credentials = await this._localCredentials.getCredentials();
        if (credentials == null) {
            return this._unAuthenticatedError("credentials not found");
        }
        return credentials.scope;
    }
    /**
     * request http like simple fetch api, exp:request('/v1/user/me', {withCredentials:true})
     * @param {string} url
     * @param {AuthClientRequestOptions} options
     */
    async request(url, options) {
        if (!options) {
            options = {};
        }
        const retry = this._formatRetry(options.retry, this._retry);
        options.headers = options.headers || {};
        if (this._headers) {
            options.headers = {
                ...this._headers,
                ...options.headers,
            };
        }
        if (!options.headers[RequestIdHeaderName]) {
            options.headers[RequestIdHeaderName] = generateRequestId();
        }
        if (!options.headers[DeviceIdHeaderName]) {
            const deviceId = await this._getDeviceId();
            options.headers[DeviceIdHeaderName] = deviceId;
        }
        if (options && options.withBasicAuth && this._basicAuth) {
            options.headers['Authorization'] = this._basicAuth;
        }
        if (options && options.withCredentials) {
            const credentials = await this._getCredentials();
            if (credentials) {
                if (this._tokenInURL) {
                    if (url.indexOf('?') < 0) {
                        url += '?';
                    }
                    url += 'access_token=' + credentials.access_token;
                }
                else {
                    options.headers['Authorization'] =
                        credentials.token_type + ' ' + credentials.access_token;
                }
            }
        }
        let response;
        const maxRequestTimes = retry + 1;
        for (let requestTime = 0; requestTime < maxRequestTimes; requestTime++) {
            try {
                response = await this._baseRequest(url, options);
                break;
            }
            catch (responseError) {
                if (options.withCredentials && responseError && responseError.error === consts_1.ErrorType.UNAUTHENTICATED) {
                    await this.setCredentials(null);
                    return Promise.reject(responseError);
                }
                if (requestTime === retry ||
                    !responseError ||
                    responseError.error !== 'unreachable') {
                    return Promise.reject(responseError);
                }
            }
            await this._sleep(OAuth2Client._retryInterval);
        }
        return response;
    }
    /**
     * Check retry value.
     * @param {number} retry
     * @return {number}
     */
    _checkRetry(retry) {
        let responseError = null;
        if (typeof retry !== 'number' ||
            retry < OAuth2Client._minRetry ||
            retry > OAuth2Client._maxRetry) {
            responseError = {
                error: consts_1.ErrorType.UNREACHABLE,
                error_description: 'wrong options param: retry',
            };
        }
        if (responseError) {
            throw responseError;
        }
        return retry;
    }
    /**
     * Format retry value.
     * @param {number} retry
     * @param {number} defaultVale
     * @return {number}
     */
    _formatRetry(retry, defaultVale) {
        if (typeof retry === 'undefined') {
            return defaultVale;
        }
        else {
            return this._checkRetry(retry);
        }
    }
    /**
     * Sleep.
     * @param {number} ms
     * @return {Promise<void>}
     */
    async _sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, ms);
        });
    }
    /**
     * Refresh expired token.
     * @param {Credentials} credentials
     * @return {Promise<Credentials>}
     */
    async _refreshToken(credentials) {
        return this._promiseOnce.run('_refreshToken', async () => {
            if (!credentials || !credentials.refresh_token) {
                return this._unAuthenticatedError('no refresh token found in credentials');
            }
            try {
                const newCredentials = await this._refreshTokenFunc(credentials.refresh_token);
                await this._localCredentials.setCredentials(newCredentials);
                return newCredentials;
            }
            catch (error) {
                if (error.error === consts_1.ErrorType.INVALID_GRANT) {
                    await this._localCredentials.setCredentials(null);
                    return this._unAuthenticatedError(error.error_description);
                }
                return Promise.reject(error);
            }
        });
    }
    /**
     * anonymous signIn
     * @param {Credentials} credentials
     * @return {Promise<Credentials>}
     */
    async _anonymousSignIn(credentials) {
        return this._promiseOnce.run('_anonymous', async () => {
            if (!credentials || credentials.scope !== 'anonymous') {
                return this._unAuthenticatedError('no anonymous in credentials');
            }
            try {
                const newCredentials = await this.request('/auth/v1/signin/anonymously', {
                    method: 'POST',
                    withBasicAuth: true,
                    body: {}
                });
                await this._localCredentials.setCredentials(newCredentials);
                return newCredentials;
            }
            catch (error) {
                if (error.error === consts_1.ErrorType.INVALID_GRANT) {
                    await this._localCredentials.setCredentials(null);
                    return this._unAuthenticatedError(error.error_description);
                }
                return Promise.reject(error);
            }
        });
    }
    /**
     * Default refresh token function.
     * @param {string} refreshToken
     * @return {Promise<Credentials>}
     */
    _defaultRefreshTokenFunc(refreshToken) {
        if (refreshToken === undefined || refreshToken === '') {
            return this._unAuthenticatedError('refresh token not found');
        }
        return this.request('/auth/v1/token', {
            method: 'POST',
            withBasicAuth: true,
            body: {
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
            },
        });
    }
    /**
     * Get credentials.
     */
    async _getCredentials() {
        let credentials = await this._localCredentials.getCredentials();
        if (credentials == null) {
            return this._unAuthenticatedError("credentials not found");
        }
        if (isCredentialsExpired(credentials)) {
            if (credentials && credentials.scope === 'anonymous') {
                credentials = await this._anonymousSignIn(credentials);
            }
            else {
                credentials = await this._refreshToken(credentials);
            }
        }
        return credentials;
    }
    /**
     * Get deviceId
     */
    async _getDeviceId() {
        if (this._deviceID) {
            return this._deviceID;
        }
        let deviceId = await this._storage.getItem(DeviceIdSectionName);
        if (!(typeof deviceId === 'string' &&
            deviceId.length >= 16 &&
            deviceId.length <= 48)) {
            deviceId = (0, uuid_1.uuidv4)();
            await this._storage.setItem(DeviceIdSectionName, deviceId);
        }
        this._deviceID = deviceId;
        return deviceId;
    }
    /**
     * Generate unAuthenticated error.
     * @param {string} err
     * @return {Promise<T>}
     */
    _unAuthenticatedError(err) {
        return Promise.reject({
            error: consts_1.ErrorType.UNAUTHENTICATED,
            error_description: err,
        });
    }
}
OAuth2Client._defaultRetry = 2;
OAuth2Client._minRetry = 0;
OAuth2Client._maxRetry = 5;
OAuth2Client._retryInterval = 1000;
exports.OAuth2Client = OAuth2Client;
//# sourceMappingURL=oauthclient.js.map
}, function(modId) { var map = {"./consts":1715324755320,"../utils/uuid":1715324755321,"../utils/base64":1715324755322,"../utils/promise":1715324755323}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1715324755320, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorType = exports.Syntax = void 0;
var Syntax;
(function (Syntax) {
    Syntax["CLIENT_ID"] = "client_id";
    Syntax["CLIENT_SECRET"] = "client_secret";
    Syntax["RESPONSE_TYPE"] = "response_type";
    Syntax["SCOPE"] = "scope";
    Syntax["STATE"] = "state";
    Syntax["REDIRECT_URI"] = "redirect_uri";
    Syntax["ERROR"] = "error";
    Syntax["ERROR_DESCRIPTION"] = "error_description";
    Syntax["ERROR_URI"] = "error_uri";
    Syntax["GRANT_TYPE"] = "grant_type";
    Syntax["CODE"] = "code";
    Syntax["ACCESS_TOKEN"] = "access_token";
    Syntax["TOKEN_TYPE"] = "token_type";
    Syntax["EXPIRES_IN"] = "expires_in";
    Syntax["USERNAME"] = "username";
    Syntax["PASSWORD"] = "password";
    Syntax["REFRESH_TOKEN"] = "refresh_token";
})(Syntax = exports.Syntax || (exports.Syntax = {}));
var ErrorType;
(function (ErrorType) {
    ErrorType["UNREACHABLE"] = "unreachable";
    ErrorType["LOCAL"] = "local";
    ErrorType["CANCELLED"] = "cancelled";
    ErrorType["UNKNOWN"] = "unknown";
    ErrorType["INVALID_ARGUMENT"] = "invalid_argument";
    ErrorType["DEADLINE_EXCEEDED"] = "deadline_exceeded";
    ErrorType["NOT_FOUND"] = "not_found";
    ErrorType["ALREADY_EXISTS"] = "already_exists";
    ErrorType["PERMISSION_DENIED"] = "permission_denied";
    ErrorType["UNAUTHENTICATED"] = "unauthenticated";
    ErrorType["RESOURCE_EXHAUSTED"] = "resource_exhausted";
    ErrorType["FAILED_PRECONDITION"] = "failed_precondition";
    ErrorType["ABORTED"] = "aborted";
    ErrorType["OUT_OF_RANGE"] = "out_of_range";
    ErrorType["UNIMPLEMENTED"] = "unimplemented";
    ErrorType["INTERNAL"] = "internal";
    ErrorType["UNAVAILABLE"] = "unavailable";
    ErrorType["DATA_LOSS"] = "data_loss";
    // CommonError
    ErrorType["ACCESS_DENIED"] = "access_denied";
    ErrorType["UNSUPPORTED_RESPONSE_TYPE"] = "unsupported_response_type";
    ErrorType["INVALID_SCOPE"] = "invalid_scope";
    ErrorType["INVALID_GRANT"] = "invalid_grant";
    ErrorType["SERVER_ERROR"] = "server_error";
    ErrorType["TEMPORARILY_UNAVAILABLE"] = "temporarily_unavailable";
    ErrorType["INTERACTION_REQUIRED"] = "interaction_required";
})(ErrorType = exports.ErrorType || (exports.ErrorType = {}));
//# sourceMappingURL=consts.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1715324755321, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.uuidv4 = void 0;
/**
 * Generate uuidv4 string.
 * @return {string}
 */
function uuidv4() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
exports.uuidv4 = uuidv4;
//# sourceMappingURL=uuid.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1715324755322, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.weappJwtDecode = exports.base64_url_decode = exports.weAtob = exports.weBtoa = void 0;
// weapp jwt-decode
const b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
// btoa
function weBtoa(string) {
    string = String(string);
    var bitmap, a, b, c, result = "", i = 0, rest = string.length % 3;
    for (; i < string.length;) {
        if ((a = string.charCodeAt(i++)) > 255 ||
            (b = string.charCodeAt(i++)) > 255 ||
            (c = string.charCodeAt(i++)) > 255)
            throw new TypeError("Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range.");
        bitmap = (a << 16) | (b << 8) | c;
        result +=
            b64.charAt((bitmap >> 18) & 63) +
                b64.charAt((bitmap >> 12) & 63) +
                b64.charAt((bitmap >> 6) & 63) +
                b64.charAt(bitmap & 63);
    }
    return rest ? result.slice(0, rest - 3) + "===".substring(rest) : result;
}
exports.weBtoa = weBtoa;
// atob
const weAtob = function (string) {
    string = String(string).replace(/[\t\n\f\r ]+/g, "");
    if (!b64re.test(string))
        throw new TypeError("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    string += "==".slice(2 - (string.length & 3));
    var bitmap, result = "", r1, r2, i = 0;
    for (; i < string.length;) {
        bitmap =
            (b64.indexOf(string.charAt(i++)) << 18) |
                (b64.indexOf(string.charAt(i++)) << 12) |
                ((r1 = b64.indexOf(string.charAt(i++))) << 6) |
                (r2 = b64.indexOf(string.charAt(i++)));
        result +=
            r1 === 64
                ? String.fromCharCode((bitmap >> 16) & 255)
                : r2 === 64
                    ? String.fromCharCode((bitmap >> 16) & 255, (bitmap >> 8) & 255)
                    : String.fromCharCode((bitmap >> 16) & 255, (bitmap >> 8) & 255, bitmap & 255);
    }
    return result;
};
exports.weAtob = weAtob;
function b64DecodeUnicode(str) {
    return decodeURIComponent((0, exports.weAtob)(str).replace(/(.)/g, function (p) {
        var code = p.charCodeAt(0).toString(16).toUpperCase();
        if (code.length < 2) {
            code = "0" + code;
        }
        return "%" + code;
    }));
}
function base64_url_decode(str) {
    var output = str.replace(/-/g, "+").replace(/_/g, "/");
    switch (output.length % 4) {
        case 0:
            break;
        case 2:
            output += "==";
            break;
        case 3:
            output += "=";
            break;
        default:
            throw new Error("Illegal base64url string!");
    }
    try {
        return b64DecodeUnicode(output);
    }
    catch (err) {
        return (0, exports.weAtob)(output);
    }
}
exports.base64_url_decode = base64_url_decode;
function weappJwtDecode(token, options) {
    if (typeof token !== "string") {
        throw new Error("Invalid token specified");
    }
    options = options || {};
    var pos = options.header === true ? 0 : 1;
    try {
        return JSON.parse(base64_url_decode(token.split(".")[pos]));
    }
    catch (e) {
        throw new Error("Invalid token specified: " + e ? e.message : "");
    }
}
exports.weappJwtDecode = weappJwtDecode;
//# sourceMappingURL=base64.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1715324755323, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.PromiseOnce = void 0;
/**
 * Promise Once
 */
class PromiseOnce {
    constructor() {
        this._fnPromiseMap = new Map();
    }
    /**
     * Run Once promise.
     * @param {string} key
     * @param {Function} fn
     * @return {Promise<T>}
     */
    async run(key, fn) {
        let result = this._fnPromiseMap.get(key);
        if (!result) {
            result = new Promise(async (resolve, reject) => {
                try {
                    // The idle promise must be run to prevent _fnPromiseMap from
                    // storing the current promise function.
                    await this._runIdlePromise();
                    const fnResult = fn();
                    resolve(await fnResult);
                }
                catch (error) {
                    reject(error);
                }
                finally {
                    this._fnPromiseMap.delete(key);
                }
            });
            this._fnPromiseMap.set(key, result);
        }
        return result;
    }
    /**
     * Run idle promise.
     * @return {Promise<void>}
     */
    _runIdlePromise() {
        return Promise.resolve();
    }
}
exports.PromiseOnce = PromiseOnce;
//# sourceMappingURL=promise.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1715324755324, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.Captcha = exports.getCaptcha = void 0;
const internal_1 = require("../app/internal");
function getCaptcha(app, opts) {
    return (0, internal_1._getComponent)(app, "captcha", () => {
        const initOpts = {
            request: app.options.request,
            storage: app.options.storage,
            openURIWithCallback: app.options.openURIWithCallback,
        };
        if (opts && opts.request) {
            initOpts.request = opts.request;
        }
        return new Captcha(initOpts);
    });
}
exports.getCaptcha = getCaptcha;
const GET_CAPTCHA_URL = '/auth/v1/captcha/init';
class Captcha {
    /**
     * constructor
     * @param {CaptchaOptions} opts
     */
    constructor(opts) {
        this._config = opts;
        this._tokenSectionName = 'captcha_';
    }
    /**
     * request http like simple fetch api, exp:request('/v1/user/me', {withCredentials:true})
     * @param {string} url
     * @param {AuthClientRequestOptions} options
     */
    async request(url, options) {
        if (!options) {
            options = {};
        }
        if (!options.method) {
            options.method = 'GET';
        }
        const state = options.method + ":" + url;
        let reqURL = url;
        if (options.withCaptcha) {
            reqURL = await this._appendCaptchaTokenToURL(url, state, false);
        }
        let resp;
        try {
            resp = await this._config.request(reqURL, options);
        }
        catch (err) {
            if (err.error === 'captcha_required' || err.error === 'captcha_invalid') {
                url = await this._appendCaptchaTokenToURL(url, state, err.error === 'captcha_invalid');
                return this._config.request(url, options);
            }
            else {
                return Promise.reject(err);
            }
        }
        return resp;
    }
    /**
     * _getCaptchaToken get captcha token
     */
    async _getCaptchaToken(forceNewToken, state) {
        if (!forceNewToken) {
            // if local has captcha token then return
            const captchaToken = await this._findCaptchaToken();
            if (captchaToken) {
                return captchaToken;
            }
        }
        const redirectURL = window.location.origin + window.location.pathname;
        const captchaTokenResp = await this._config.request(GET_CAPTCHA_URL, {
            method: 'POST',
            body: {
                redirect_uri: redirectURL,
                state: state
            },
            withBasicAuth: true,
        });
        if (captchaTokenResp.captcha_token) {
            const captchaToken = {
                captcha_token: captchaTokenResp.captcha_token,
                expires_in: captchaTokenResp.expires_in,
            };
            await this._saveCaptchaToken(captchaToken);
            return captchaTokenResp.captcha_token;
        }
        const callbackData = await this._config.openURIWithCallback(captchaTokenResp.url, { width: '355px', height: '355px' });
        const captchaToken = {
            captcha_token: callbackData.captcha_token,
            expires_in: Number(callbackData.expires_in)
        };
        await this._saveCaptchaToken(captchaToken);
        return captchaToken.captcha_token;
    }
    async _appendCaptchaTokenToURL(url, state, forceNewToken) {
        const captchaToken = await this._getCaptchaToken(forceNewToken, state);
        if (url.indexOf("?") > 0) {
            url += "&captcha_token=" + captchaToken;
        }
        else {
            url += "?captcha_token=" + captchaToken;
        }
        return url;
    }
    async _saveCaptchaToken(token) {
        token.expires_at = new Date(Date.now() + (token.expires_in - 10) * 1000);
        const tokenStr = JSON.stringify(token);
        await this._config.storage.setItem(this._tokenSectionName, tokenStr);
    }
    async _findCaptchaToken() {
        const tokenStr = await this._config.storage.getItem(this._tokenSectionName);
        if (tokenStr !== undefined && tokenStr !== null) {
            try {
                const captchaToken = JSON.parse(tokenStr);
                if (captchaToken && captchaToken.expires_at) {
                    captchaToken.expires_at = new Date(captchaToken.expires_at);
                }
                const isExpired = captchaToken.expires_at < new Date();
                if (isExpired) {
                    return null;
                }
                return captchaToken.captcha_token;
            }
            catch (error) {
                await this._config.storage.removeItem(this._tokenSectionName);
                return null;
            }
        }
        return null;
    }
}
exports.Captcha = Captcha;
//# sourceMappingURL=index.js.map
}, function(modId) { var map = {"../app/internal":1715324755318}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1715324755325, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.AppImpl = exports.initializeApp = void 0;
const request_1 = require("./request");
const openuri_1 = require("./openuri");
const storage_1 = require("./storage");
function initializeApp(options) {
    return new AppImpl(options);
}
exports.initializeApp = initializeApp;
class AppImpl {
    constructor(options) {
        this._container = new Map();
        if (!options.region) {
            options.region = 'ap-shanghai';
        }
        if (!options.apiOrigin) {
            options.apiOrigin = `https://${options.env}.${options.region}.tcb-api.tencentcloudapi.com`;
        }
        let storageEnv = options.env;
        if (!options.clientId) {
            options.clientId = '';
        }
        else {
            storageEnv = options.clientId;
        }
        if (!options.storage) {
            options.storage = new storage_1.DefaultStorage({ env: storageEnv });
        }
        if (!options.openURIWithCallback) {
            options.openURIWithCallback = openuri_1.defaultOpenURIWithCallback;
        }
        let baseRequest = options.request;
        if (!baseRequest) {
            baseRequest = request_1.defaultRequest;
        }
        const apiOrigin = options.apiOrigin;
        options.request = async (url, options) => {
            if (url.startsWith('/')) {
                url = apiOrigin + url;
            }
            return baseRequest(url, options);
        };
        this._options = options;
    }
    get options() {
        return this._options;
    }
    get container() {
        return this._container;
    }
}
exports.AppImpl = AppImpl;
//# sourceMappingURL=index.js.map
}, function(modId) { var map = {"./request":1715324755326,"./openuri":1715324755327,"./storage":1715324755328}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1715324755326, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultRequest = exports.ErrorType = void 0;
var ErrorType;
(function (ErrorType) {
    ErrorType["UNREACHABLE"] = "unreachable";
})(ErrorType = exports.ErrorType || (exports.ErrorType = {}));
const defaultRequest = async (url, options) => {
    let result;
    let responseError;
    // Objects must be copied to prevent modification of data such as body.
    const copyOptions = Object.assign({}, options);
    if (!copyOptions.method) {
        copyOptions.method = 'GET';
    }
    if (copyOptions.body && typeof copyOptions.body !== 'string') {
        copyOptions.body = JSON.stringify(copyOptions.body, (key, value) => {
            if (value && value !== '') {
                return value;
            }
        });
    }
    const requestId = copyOptions.headers['x-request-id'];
    try {
        const responseResult = await fetch(url, copyOptions);
        const jsonResponse = await responseResult.json();
        if (jsonResponse.error || responseResult.status >= 400) {
            responseError = jsonResponse;
            responseError.error_uri = new URL(url).pathname;
            responseError.request_id = requestId;
        }
        else {
            result = jsonResponse;
        }
    }
    catch (error) {
        responseError = {
            error: ErrorType.UNREACHABLE,
            error_description: error.message,
            error_uri: new URL(url).pathname,
            request_id: requestId,
        };
    }
    if (responseError) {
        throw responseError;
    }
    else {
        return result;
    }
};
exports.defaultRequest = defaultRequest;
//# sourceMappingURL=request.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1715324755327, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultOpenURIWithCallback = void 0;
/**
 * default use iframe to open url can return callback
 * for example : open https://example.com/callback?rediret_uri=http://127.0.0.1:8080/
 *     the it is done, it will callback http://127.0.0.1:8080/?data1=x&data2=3
 *
 * for example : open https://example.com/callback?rediret_uri=http://127.0.0.1:8080/?__iframe==on
 *      window.addEventListener('message', function(e) {
        console.log(e)
        alert('data from domain2 ---> ' + e.data);
    }, false);
 *
 */
const defaultOpenURIWithCallback = (url, opts) => {
    let iframeTag = '__iframe';
    if (window.location.search.indexOf(iframeTag) > 0) {
        document.body.style.display = 'none';
    }
    if (!opts) {
        opts = {
            width: '355px',
            height: '355px'
        };
    }
    if (document.getElementById('_iframe_panel_wrap') === null) {
        var elementDiv = document.createElement('div');
        elementDiv.style.cssText =
            'background-color: rgba(0, 0, 0, 0.7);position: fixed;left: 0px;right: 0px;top: 0px;bottom: 0px;padding: 9vw 0 0 0;display: none;z-index:100;';
        elementDiv.setAttribute('id', '_iframe_panel_wrap');
        document.body.appendChild(elementDiv);
    }
    const target = document.getElementById('_iframe_panel_wrap'), iframe = document.createElement('iframe');
    target.innerHTML = '';
    const openURL = new URL(url);
    const redirectUri = openURL.searchParams.get('redirect_uri');
    if (redirectUri) {
        const redirectUrl = new URL(redirectUri);
        redirectUrl.searchParams.append(iframeTag, "on");
        openURL.searchParams.set('redirect_uri', redirectUrl.href);
        url = openURL.href;
    }
    iframe.setAttribute('src', url);
    iframe.setAttribute('id', '_iframe_panel_wrap_iframe');
    iframe.style.cssText = `min-width:${opts.width};display:block;height:${opts.height};margin:0 auto;background-color: rgb(255, 255, 255);border: none;`;
    target.appendChild(iframe);
    target.style.display = 'block';
    let callBack = new Callback();
    // handle callback from iframe post message
    window.addEventListener('message', e => {
        if (e.origin == openURL.origin && callBack.callFunc) {
            if (!(typeof e.data === "string")) {
                return;
            }
            target.style.display = 'none';
            const data = JSON.parse(e.data);
            try {
                callBack.callFunc(data);
            }
            catch (e) {
            }
        }
    }, false);
    return new Promise((resolve, reject) => {
        callBack.callFunc = data => {
            if (data.error) {
                return reject(data);
            }
            return resolve(data);
        };
        // handle callback from iframe redirect uri
        iframe.onload = () => {
            try {
                var windowLocation = window.location;
                var iframeLocation = iframe.contentWindow.location;
                if (iframeLocation.host +
                    iframeLocation.pathname ===
                    windowLocation.host +
                        windowLocation.pathname) {
                    target.style.display = 'none';
                    const iframeUrlParams = new URLSearchParams(iframeLocation.search);
                    const data = {};
                    iframeUrlParams.forEach((v, k) => {
                        data[k] = v;
                    });
                    if (data.error) {
                        return reject({
                            error: iframeUrlParams.get('error'),
                            error_description: iframeUrlParams.get('error_description')
                        });
                    }
                    return resolve(data);
                }
                else {
                    target.style.display = 'block';
                }
            }
            catch (error) {
                target.style.display = 'block';
            }
        };
    });
};
exports.defaultOpenURIWithCallback = defaultOpenURIWithCallback;
class Callback {
}
//# sourceMappingURL=openuri.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1715324755328, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultStorage = void 0;
/**
 * Default Storage.
 */
class DefaultStorage {
    constructor(opts) {
        this._env = opts.env;
    }
    /**
     * Get item.
     * @param {string} key
     */
    async getItem(key) {
        return localStorage.getItem(key + this._env);
    }
    /**
     * Remove item.
     * @param {string} key
     */
    async removeItem(key) {
        return localStorage.removeItem(key + this._env);
    }
    /**
     * Set item.
     * @param {string} key
     * @param {string} value
     */
    async setItem(key, value) {
        return localStorage.setItem(key + this._env, value);
    }
}
exports.DefaultStorage = DefaultStorage;
//# sourceMappingURL=storage.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1715324755314);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map