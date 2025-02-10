module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1739103120822, function(require, module, exports) {

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = exports.registerAi = exports.models = exports.createAi = exports.Bot = exports.AI = void 0;
var AI_1 = require("./AI");
Object.defineProperty(exports, "AI", { enumerable: true, get: function () { return AI_1.AI; } });
var bot_1 = require("./bot");
Object.defineProperty(exports, "Bot", { enumerable: true, get: function () { return bot_1.Bot; } });
var models = __importStar(require("./models"));
var utils = __importStar(require("./utils"));
exports.utils = utils;
var COMPONENT_NAME = 'ai';
var MODELS = models.MODELS, restModels = __rest(models, ["MODELS"]);
exports.models = restModels;
var createRequestInstanceWithAccessTokenHeader = function (_a) {
    var getAccessToken = _a.getAccessToken, req = _a.req;
    var fetch = function (options) { return __awaiter(void 0, void 0, void 0, function () {
        var token, _a, headers, restOptions, accessToken;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (typeof req.fetch !== 'function') {
                        throw new Error('req.fetch is not a function');
                    }
                    token = options.token, _a = options.headers, headers = _a === void 0 ? {} : _a, restOptions = __rest(options, ["token", "headers"]);
                    if (!(token != null)) return [3, 1];
                    accessToken = token;
                    return [3, 3];
                case 1: return [4, getAccessToken()];
                case 2:
                    accessToken = (_b.sent()).accessToken;
                    _b.label = 3;
                case 3: return [2, req.fetch(__assign({ headers: __assign({ Authorization: "Bearer ".concat(accessToken) }, headers) }, restOptions))];
            }
        });
    }); };
    return {
        download: req.download,
        post: req.post,
        upload: req.upload,
        fetch: fetch,
    };
};
function createAi(_a) {
    var env = _a.env, baseUrl = _a.baseUrl, req = _a.req, getAccessToken = _a.getAccessToken, handleReqInstance = _a.handleReqInstance;
    var getBaseUrl = function () {
        if (baseUrl != null) {
            return baseUrl;
        }
        if (env == null) {
            throw new Error('`env` is required when `baseUrl` is not provided!');
        }
        return "https://".concat(env, ".api.tcloudbasegateway.com/v1");
    };
    var getReq = function () {
        if (handleReqInstance == null) {
            if (getAccessToken == null) {
                throw new Error('`getAccessToken` is required when `handleReqInstance` is not provided!');
            }
            return createRequestInstanceWithAccessTokenHeader({ req: req, getAccessToken: getAccessToken });
        }
        return handleReqInstance({ req: req });
    };
    return new AI_1.AI(getReq(), getBaseUrl());
}
exports.createAi = createAi;
function ai(options) {
    var _this = this;
    var _a;
    var req = this.request;
    if (req.fetch == null) {
        throw new Error('cloudbase.request.fetch() unimplemented!');
    }
    var getUrlFromCloud = function () {
        var _a = _this.getEndPointWithKey('GATEWAY'), BASE_URL = _a.BASE_URL, PROTOCOL = _a.PROTOCOL;
        return "".concat(PROTOCOL).concat(BASE_URL);
    };
    var baseUrl = (_a = options === null || options === void 0 ? void 0 : options.baseUrl) !== null && _a !== void 0 ? _a : getUrlFromCloud();
    return createAi({ req: req, baseUrl: baseUrl, handleReqInstance: function (_a) {
            var req = _a.req;
            return req;
        } });
}
var component = {
    name: COMPONENT_NAME,
    entity: { ai: ai },
};
function registerAi(app) {
    try {
        app.registerComponent(component);
    }
    catch (e) {
        console.warn(e);
    }
}
exports.registerAi = registerAi;
__exportStar(require("./type"), exports);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0EsMkJBQXlCO0FBMkloQixtRkEzSUEsT0FBRSxPQTJJQTtBQTFJWCw2QkFBMkI7QUEwSWQsb0ZBMUlKLFNBQUcsT0EwSUk7QUF6SWhCLCtDQUFrQztBQUNsQyw2Q0FBZ0M7QUF3SThCLHNCQUFLO0FBdEluRSxJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUE7QUFFbkIsSUFBQSxNQUFNLEdBQW9CLE1BQU0sT0FBMUIsRUFBSyxVQUFVLFVBQUssTUFBTSxFQUFsQyxVQUF5QixDQUFGLENBQVc7QUFvSUUsNEJBQU07QUE1SGhELElBQU0sMENBQTBDLEdBQUcsVUFBQyxFQUdrQztRQUZwRixjQUFjLG9CQUFBLEVBQ2QsR0FBRyxTQUFBO0lBRUgsSUFBTSxLQUFLLEdBQXFCLFVBQU8sT0FBMkM7Ozs7O29CQUNoRixJQUFJLE9BQU8sR0FBRyxDQUFDLEtBQUssS0FBSyxVQUFVLEVBQUU7d0JBQ25DLE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQTtxQkFDL0M7b0JBRU8sS0FBSyxHQUFtQyxPQUFPLE1BQTFDLEVBQUUsS0FBaUMsT0FBTyxRQUE1QixFQUFaLE9BQU8sbUJBQUcsRUFBRSxLQUFBLEVBQUssV0FBVyxVQUFLLE9BQU8sRUFBakQsb0JBQXVDLENBQUYsQ0FBWTt5QkFFbkQsQ0FBQSxLQUFLLElBQUksSUFBSSxDQUFBLEVBQWIsY0FBYTtvQkFDZixXQUFXLEdBQUcsS0FBSyxDQUFBOzt3QkFFSixXQUFNLGNBQWMsRUFBRSxFQUFBOztvQkFBckMsV0FBVyxHQUFHLENBQUMsU0FBc0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQTs7d0JBR3BELFdBQU8s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ZXF1ZXN0SW50ZXJmYWNlIH0gZnJvbSAnQGNsb3VkYmFzZS9hZGFwdGVyLWludGVyZmFjZSdcbmltcG9ydCB0eXBlIHsgSUNsb3VkYmFzZSB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMnXG5pbXBvcnQgdHlwZSB7IElDbG91ZGJhc2VDb21wb25lbnQgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2NvbXBvbmVudCdcbmltcG9ydCB7IEFJIH0gZnJvbSAnLi9BSSdcbmltcG9ydCB7IEJvdCB9IGZyb20gJy4vYm90J1xuaW1wb3J0ICogYXMgbW9kZWxzIGZyb20gJy4vbW9kZWxzJ1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi91dGlscydcblxuY29uc3QgQ09NUE9ORU5UX05BTUUgPSAnYWknXG5cbmNvbnN0IHsgTU9ERUxTLCAuLi5yZXN0TW9kZWxzIH0gPSBtb2RlbHNcblxuaW50ZXJmYWNlIElIYW5kbGVSZXF1ZXN0SW5zdGFuY2Uge1xuICByZXE6IFNES1JlcXVlc3RJbnRlcmZhY2Vcbn1cblxudHlwZSBIYW5kbGVSZXF1ZXN0SW5zdGFuY2VGdW5jID0gKG9wdGlvbnM6IElIYW5kbGVSZXF1ZXN0SW5zdGFuY2UpID0+IFNES1JlcXVlc3RJbnRlcmZhY2VcblxuY29uc3QgY3JlYXRlUmVxdWVzdEluc3RhbmNlV2l0aEFjY2Vzc1Rva2VuSGVhZGVyID0gKHtcbiAgZ2V0QWNjZXNzVG9rZW4sXG4gIHJlcSxcbn06IElIYW5kbGVSZXF1ZXN0SW5zdGFuY2UgJiB7IGdldEFjY2Vzc1Rva2VuOiAoKSA9PiBQcm9taXNlPHsgYWNjZXNzVG9rZW46IHN0cmluZyB9PiB9KSA9PiB7XG4gIGNvbnN0IGZldGNoOiB0eXBlb2YgcmVxLmZldGNoID0gYXN5bmMgKG9wdGlvbnM6IElGZXRjaE9wdGlvbnMgJiB7IHRva2VuPzogc3RyaW5nIH0pID0+IHtcbiAgICBpZiAodHlwZW9mIHJlcS5mZXRjaCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdyZXEuZmV0Y2ggaXMgbm90IGEgZnVuY3Rpb24nKVxuICAgIH1cblxuICAgIGNvbnN0IHsgdG9rZW4sIGhlYWRlcnMgPSB7fSwgLi4ucmVzdE9wdGlvbnMgfSA9IG9wdGlvbnNcbiAgICBsZXQgYWNjZXNzVG9rZW46IHN0cmluZ1xuICAgIGlmICh0b2tlbiAhPSBudWxsKSB7XG4gICAgICBhY2Nlc3NUb2tlbiA9IHRva2VuXG4gICAgfSBlbHNlIHtcbiAgICAgIGFjY2Vzc1Rva2VuID0gKGF3YWl0IGdldEFjY2Vzc1Rva2VuKCkpLmFjY2Vzc1Rva2VuXG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcS5mZXRjaCh7XG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHthY2Nlc3NUb2tlbn1gLFxuICAgICAgICAuLi5oZWFkZXJzLFxuICAgICAgfSxcbiAgICAgIC4uLnJlc3RPcHRpb25zLFxuICAgIH0pXG4gIH1cblxuICByZXR1cm4ge1xuICAgIGRvd25sb2FkOiByZXEuZG93bmxvYWQsXG4gICAgcG9zdDogcmVxLnBvc3QsXG4gICAgdXBsb2FkOiByZXEudXBsb2FkLFxuICAgIGZldGNoLFxuICB9XG59XG5cbmludGVyZmFjZSBBSUluaXRPcHRpb24ge1xuICBiYXNlVXJsPzogc3RyaW5nXG59XG5cbmludGVyZmFjZSBJQ3JlYXRlQWkge1xuICByZXE6IFNES1JlcXVlc3RJbnRlcmZhY2VcbiAgYmFzZVVybD86IHN0cmluZ1xuICBlbnY/OiBzdHJpbmdcbiAgZ2V0QWNjZXNzVG9rZW4/OiAoKSA9PiBQcm9taXNlPHsgYWNjZXNzVG9rZW46IHN0cmluZyB9PlxuICBoYW5kbGVSZXFJbnN0YW5jZT86IEhhbmRsZVJlcXVlc3RJbnN0YW5jZUZ1bmNcbn1cblxuLyoqXG4gKiDmnIDnroDlnLDliJvlu7rkuIDkuKrmjqXkupHlvIDlj5HnvZHlhbPmnI3liqHnmoQgYEFJYCDlrp7kvovvvIzor7fmsYLml7bkvJroh6rliqjluKbkuIrpibTmnYPor7fmsYLlpLTjgIJcbiAqIOWPqumcgOimgeS8oOWFpe+8mlxuICpcbiAqIC0gYGdldEFjY2Vzc1Rva2VuYDog6I635Y+WIGFjY2Vzc1Rva2VuIOeahOWHveaVsFxuICogLSBgcmVxYDog6K+35rGC5Ye95pWw77yM5LiA6Iis5LuOIGFkYXB0ZXIg5LiK5ou/XG4gKiAtIGBlbnZgOiDkupHlvIDlj5Hnjq/looMgSURcbiAqXG4gKiDlhbbku5blj4LmlbDlj6/mjInpnIDkvKDlhaXopobnm5blh73mlbDpgLvovpHjgIJcbiAqL1xuZnVuY3Rpb24gY3JlYXRlQWkoeyBlbnYsIGJhc2VVcmwsIHJlcSwgZ2V0QWNjZXNzVG9rZW4sIGhhbmRsZVJlcUluc3RhbmNlIH06IElDcmVhdGVBaSkge1xuICBjb25zdCBnZXRCYXNlVXJsID0gKCkgPT4ge1xuICAgIGlmIChiYXNlVXJsICE9IG51bGwpIHtcbiAgICAgIHJldHVybiBiYXNlVXJsXG4gICAgfVxuICAgIGlmIChlbnYgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdgZW52YCBpcyByZXF1aXJlZCB3aGVuIGBiYXNlVXJsYCBpcyBub3QgcHJvdmlkZWQhJylcbiAgICB9XG4gICAgcmV0dXJuIGBodHRwczovLyR7ZW52fS5hcGkudGNsb3VkYmFzZWdhdGV3YXkuY29tL3YxYFxuICB9XG5cbiAgY29uc3QgZ2V0UmVxID0gKCkgPT4ge1xuICAgIGlmIChoYW5kbGVSZXFJbnN0YW5jZSA9PSBudWxsKSB7XG4gICAgICBpZiAoZ2V0QWNjZXNzVG9rZW4gPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2BnZXRBY2Nlc3NUb2tlbmAgaXMgcmVxdWlyZWQgd2hlbiBgaGFuZGxlUmVxSW5zdGFuY2VgIGlzIG5vdCBwcm92aWRlZCEnKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGNyZWF0ZVJlcXVlc3RJbnN0YW5jZVdpdGhBY2Nlc3NUb2tlbkhlYWRlcih7IHJlcSwgZ2V0QWNjZXNzVG9rZW4gfSlcbiAgICB9XG4gICAgcmV0dXJuIGhhbmRsZVJlcUluc3RhbmNlKHsgcmVxIH0pXG4gIH1cblxuICByZXR1cm4gbmV3IEFJKGdldFJlcSgpLCBnZXRCYXNlVXJsKCkpXG59XG5cbi8qKlxuICog5Yib5bu6IGBBSWAg5a6e5L6L44CCXG4gKiDor6Xlh73mlbDmjILovb3lnKgganMgc2RrIOeahCBDbG91ZGJhc2Ug5a6e5L6L5LiK44CCXG4gKiDor6Xlh73mlbDosIPnlKjkuobmnKzmqKHlnZfmmrTpnLLnmoQgYGNyZWF0ZUFpYCDlh73mlbDvvIzkvYbosIPnlKjml7bpgJrov4fkvKDlhaXlj4LmlbDlgZrkuobpgLvovpHopobnm5bvvJpcbiAqXG4gKiAtIOS8oOWFpeS7jiBDbG91ZGJhc2Ug5a6e5L6L5LiK55qE5Lit5b+D55qEIGByZXFgXG4gKiAtIOS8oOWFpeS7jiBDbG91ZGJhc2Ug5a6e5L6L5LiK5ou/5Yiw55qEIGBiYXNlVXJsYFxuICogLSDkvKDlhaXkuIDkuKrkuI3lpITnkIYgYHJlcWAg55qEIGBoYW5kbGVSZXFJbnN0YW5jZWDvvIznlLHkuo4gYHJlcWAg5piv5LuOIENsb3VkYmFzZSDlrp7kvovkuIrmi7/liLDnmoTvvIzov5nkuKrkuK3lv4PnmoQgYHJlcWAg5bey57uP5Y+v55So5LqGXG4gKiAtIOS4jeeUqOS8oOWFpSBgZW52YCDkuobvvIzlm6DkuLrlt7Lnu4/kvKDkuoYgYGJhc2VVcmxgXG4gKiAtIOS4jeeUqOS8oOWFpSBgZ2V0QWNjZXNzVG9rZW5gIOS6hu+8jOWboOS4uuS8oOS6hiBgaGFuZGxlUmVxSW5zdGFuY2VgXG4gKi9cbmZ1bmN0aW9uIGFpKFxuICB0aGlzOiBJQ2xvdWRiYXNlICYgeyBnZXRFbmRQb2ludFdpdGhLZXk6IChrZXk6ICdHQVRFV0FZJykgPT4geyBCQVNFX1VSTDogc3RyaW5nOyBQUk9UT0NPTDogc3RyaW5nIH0gfSxcbiAgb3B0aW9ucz86IEFJSW5pdE9wdGlvbixcbikge1xuICBjb25zdCByZXEgPSB0aGlzLnJlcXVlc3RcblxuICBpZiAocmVxLmZldGNoID09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2Nsb3VkYmFzZS5yZXF1ZXN0LmZldGNoKCkgdW5pbXBsZW1lbnRlZCEnKVxuICB9XG5cbiAgY29uc3QgZ2V0VXJsRnJvbUNsb3VkID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgQkFTRV9VUkwsIFBST1RPQ09MIH0gPSB0aGlzLmdldEVuZFBvaW50V2l0aEtleSgnR0FURVdBWScpXG4gICAgcmV0dXJuIGAke1BST1RPQ09MfSR7QkFTRV9VUkx9YFxuICB9XG5cbiAgY29uc3QgYmFzZVVybCA9IG9wdGlvbnM/LmJhc2VVcmwgPz8gZ2V0VXJsRnJvbUNsb3VkKClcblxuICByZXR1cm4gY3JlYXRlQWkoeyByZXEsIGJhc2VVcmwsIGhhbmRsZVJlcUluc3RhbmNlOiAoeyByZXEgfSkgPT4gcmVxIH0pXG59XG5cbmNvbnN0IGNvbXBvbmVudDogSUNsb3VkYmFzZUNvbXBvbmVudCA9IHtcbiAgbmFtZTogQ09NUE9ORU5UX05BTUUsXG4gIGVudGl0eTogeyBhaSB9LFxufVxuXG5mdW5jdGlvbiByZWdpc3RlckFpKGFwcDogSUNsb3VkYmFzZSkge1xuICB0cnkge1xuICAgIGFwcC5yZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLndhcm4oZSlcbiAgfVxufVxuXG5leHBvcnQgeyBBSSwgQm90LCBjcmVhdGVBaSwgcmVzdE1vZGVscyBhcyBtb2RlbHMsIHJlZ2lzdGVyQWksIHV0aWxzIH1cbmV4cG9ydCAqIGZyb20gJy4vdHlwZSdcbiJdfQ==
}, function(modId) {var map = {"./AI":1739103120823,"./bot":1739103120824,"./models":1739103120828,"./utils":1739103120825,"./type":1739103120841}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1739103120823, function(require, module, exports) {

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AI = void 0;
var bot_1 = require("./bot");
var models = __importStar(require("./models"));
var MODELS = models.MODELS;
var AI = (function () {
    function AI(req, baseUrl) {
        var _this = this;
        this.req = req;
        this.baseUrl = baseUrl;
        this.modelRequest = function (_a) {
            var url = _a.url, data = _a.data, headers = _a.headers, stream = _a.stream;
            return __awaiter(_this, void 0, void 0, function () {
                var fetchHeaders;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            fetchHeaders = {
                                'Content-Type': 'application/json',
                            };
                            stream && Object.assign(fetchHeaders, { Accept: 'text/event-stream' });
                            return [4, this.req.fetch({
                                    method: 'post',
                                    headers: __assign(__assign({}, fetchHeaders), headers),
                                    body: JSON.stringify(data),
                                    url: url,
                                    stream: stream,
                                })];
                        case 1: return [2, (_b.sent()).data];
                    }
                });
            });
        };
        this.botRequest = function (_a) {
            var method = _a.method, url = _a.url, _b = _a.data, data = _b === void 0 ? {} : _b, headers = _a.headers, stream = _a.stream;
            return __awaiter(_this, void 0, void 0, function () {
                function objectToParam(obj) {
                    return Object.entries(obj)
                        .map(function (_a) {
                        var key = _a[0], value = _a[1];
                        return "".concat(key, "=").concat(value);
                    })
                        .join('&');
                }
                var fetchHeaders;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!(method === 'get')) return [3, 2];
                            return [4, this.req.fetch({ url: "".concat(url, "?").concat(objectToParam(data)), method: method, headers: headers, stream: stream })];
                        case 1: return [2, (_c.sent()).data];
                        case 2:
                            fetchHeaders = {
                                'Content-Type': 'application/json',
                            };
                            stream && Object.assign(fetchHeaders, { Accept: 'text/event-stream' });
                            return [4, this.req.fetch({
                                    url: url,
                                    body: JSON.stringify(data),
                                    headers: __assign(__assign({}, fetchHeaders), headers),
                                    stream: stream,
                                    method: method,
                                })];
                        case 3: return [2, (_c.sent()).data];
                    }
                });
            });
        };
        this.aiBaseUrl = "".concat(baseUrl, "/ai");
        this.aiBotBaseUrl = "".concat(baseUrl, "/aibot");
        this.bot = new bot_1.Bot(this.botRequest, this.aiBotBaseUrl);
    }
    AI.prototype.createModel = function (model) {
        var SimpleModelConstructor = MODELS[model];
        var simpleModel = new SimpleModelConstructor(this.modelRequest, this.aiBaseUrl);
        var reactModel = new models.ReactModel(simpleModel);
        return reactModel;
    };
    AI.prototype.registerModel = function (name, model) {
        if (MODELS[name] != null) {
            console.warn("AI model ".concat(name, " already exists!"));
            return;
        }
        MODELS[name] = model;
    };
    AI.prototype.registerFunctionTool = function (functionTool) {
        if (models.toolMap.has(functionTool.name)) {
            console.warn("AI function tool ".concat(functionTool.name, " already exists and will be overwritten!"));
        }
        models.toolMap.set(functionTool.name, functionTool.fn);
    };
    return AI;
}());
exports.AI = AI;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQUkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvQUkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDZCQUEyQjtBQUMzQiwrQ0FBa0M7QUFHMUIsSUFBQSxNQUFNLEdBQUssTUFBTSxPQUFYLENBQVc7QUFFekI7SUFLRSxZQUFvQixHQUF3QixFQUFTLE9BQWU7UUFBcEUsaUJBSUM7UUFKbUIsUUFBRyxHQUFILEdBQUcsQ0FBcUI7UUFBUyxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBcUJwRSxpQkFBWSxHQUFtQixVQUFPLEVBQThCO2dCQUE1QixHQUFHLFNBQUEsRUFBRSxJQUFJLFVBQUEsRUFBRSxPQUFPLGFBQUEsRUFBRSxNQUFNLFlBQUE7Ozs7Ozs0QkFDMUQsWUFBWSxHQUFHO2dDQUNuQixjQUFjLEVBQUUsa0JBQWtCOzZCQUNuQyxDQUFBOzRCQUVELE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxFQUFFLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxDQUFDLENBQUE7NEJBR3BFLFdBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7b0NBQ25CLE1BQU0sRUFBRSxNQUFNO29DQUNkLE9BQU8sd0JBQU8sWUFBWSxHQUFLLE9BQU8sQ0FBRTtvQ0FDeEMsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO29DQUMxQixHQUFHLEtBQUE7b0NBQ0gsTUFBTSxRQUFBO2lDQUNQLENBQUMsRUFBQTtnQ0FQSixXQUFPLENBQ0wsU0FNRSxDQUNILENBQUMsSUFBSSxFQUFBOzs7O1NBQ1AsQ0FBQTtRQUVELGVBQVUsR0FBaUIsVUFBTyxFQUEyQztnQkFBekMsTUFBTSxZQUFBLEVBQUUsR0FBRyxTQUFBLEVBQUUsWUFBUyxFQUFULElBQUksbUJBQUcsRUFB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LFNBQUM7QUFBRCxDQUFDLEFBakZELElBaUZDO0FBRVEsZ0JBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IFNES1JlcXVlc3RJbnRlcmZhY2UgfSBmcm9tICdAY2xvdWRiYXNlL2FkYXB0ZXItaW50ZXJmYWNlJ1xuaW1wb3J0IHsgQm90IH0gZnJvbSAnLi9ib3QnXG5pbXBvcnQgKiBhcyBtb2RlbHMgZnJvbSAnLi9tb2RlbHMnXG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuL3R5cGUnXG5cbmNvbnN0IHsgTU9ERUxTIH0gPSBtb2RlbHNcblxuY2xhc3MgQUkge1xuICBwdWJsaWMgYWlCYXNlVXJsOiBzdHJpbmdcbiAgcHVibGljIGFpQm90QmFzZVVybDogc3RyaW5nXG4gIHB1YmxpYyBib3Q6IEJvdFxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVxOiBTREtSZXF1ZXN0SW50ZXJmYWNlLCBwdWJsaWMgYmFzZVVybDogc3RyaW5nKSB7XG4gICAgdGhpcy5haUJhc2VVcmwgPSBgJHtiYXNlVXJsfS9haWBcbiAgICB0aGlzLmFpQm90QmFzZVVybCA9IGAke2Jhc2VVcmx9L2FpYm90YFxuICAgIHRoaXMuYm90ID0gbmV3IEJvdCh0aGlzLmJvdFJlcXVlc3QsIHRoaXMuYWlCb3RCYXNlVXJsKVxuICB9XG5cbiAgY3JlYXRlTW9kZWw8VCBleHRlbmRzIGtleW9mIHR5cGVvZiBNT0RFTFM+KG1vZGVsOiBUKSB7XG4gICAgY29uc3QgU2ltcGxlTW9kZWxDb25zdHJ1Y3RvciA9IE1PREVMU1ttb2RlbF1cbiAgICBjb25zdCBzaW1wbGVNb2RlbDogdHlwZXMuU2ltcGxlQ2hhdE1vZGVsID0gbmV3IFNpbXBsZU1vZGVsQ29uc3RydWN0b3IodGhpcy5tb2RlbFJlcXVlc3QsIHRoaXMuYWlCYXNlVXJsKVxuICAgIGNvbnN0IHJlYWN0TW9kZWwgPSBuZXcgbW9kZWxzLlJlYWN0TW9kZWwoc2ltcGxlTW9kZWwpXG4gICAgcmV0dXJuIHJlYWN0TW9kZWxcbiAgfVxuXG4gIHJlZ2lzdGVyTW9kZWwobmFtZTogc3RyaW5nLCBtb2RlbDogdHlwZXMuQ2hhdE1vZGVsQ29uc3RydWN0b3IpIHtcbiAgICBpZiAoTU9ERUxTW25hbWVdICE9IG51bGwpIHtcbiAgICAgIGNvbnNvbGUud2FybihgQUkgbW9kZWwgJHtuYW1lfSBhbHJlYWR5IGV4aXN0cyFgKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIE1PREVMU1tuYW1lXSA9IG1vZGVsXG4gIH1cblxuICBtb2RlbFJlcXVlc3Q6IHR5cGVzLk1vZGVsUmVxID0gYXN5bmMgKHsgdXJsLCBkYXRhLCBoZWFkZXJzLCBzdHJlYW0gfSkgPT4ge1xuICAgIGNvbnN0IGZldGNoSGVhZGVycyA9IHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgfVxuICAgIC8vIOW4piBBY2NlcHQ6IHRleHQvZXZlbnQtc3RyZWFtICDor7fmsYLlpLTmmL7lvI/mjIflrprmmK8gU1NFIOe7lei/hyA2MHMg55qE6ZmQ5Yi2XG4gICAgc3RyZWFtICYmIE9iamVjdC5hc3NpZ24oZmV0Y2hIZWFkZXJzLCB7IEFjY2VwdDogJ3RleHQvZXZlbnQtc3RyZWFtJyB9KVxuXG4gICAgcmV0dXJuIChcbiAgICAgIGF3YWl0IHRoaXMucmVxLmZldGNoKHtcbiAgICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICAgIGhlYWRlcnM6IHsgLi4uZmV0Y2hIZWFkZXJzLCAuLi5oZWFkZXJzIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgICB1cmwsXG4gICAgICAgIHN0cmVhbSxcbiAgICAgIH0pXG4gICAgKS5kYXRhXG4gIH1cblxuICBib3RSZXF1ZXN0OiB0eXBlcy5Cb3RSZXEgPSBhc3luYyAoeyBtZXRob2QsIHVybCwgZGF0YSA9IHt9LCBoZWFkZXJzLCBzdHJlYW0gfSkgPT4ge1xuICAgIGlmIChtZXRob2QgPT09ICdnZXQnKSB7XG4gICAgICByZXR1cm4gKGF3YWl0IHRoaXMucmVxLmZldGNoKHsgdXJsOiBgJHt1cmx9PyR7b2JqZWN0VG9QYXJhbShkYXRhKX1gLCBtZXRob2QsIGhlYWRlcnMsIHN0cmVhbSB9KSkuZGF0YVxuICAgIH1cblxuICAgIGNvbnN0IGZldGNoSGVhZGVycyA9IHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgfVxuICAgIC8vIOW4piBBY2NlcHQ6IHRleHQvZXZlbnQtc3RyZWFtICDor7fmsYLlpLTmmL7lvI/mjIflrprmmK8gU1NFIOe7lei/hyA2MHMg55qE6ZmQ5Yi2XG4gICAgc3RyZWFtICYmIE9iamVjdC5hc3NpZ24oZmV0Y2hIZWFkZXJzLCB7IEFjY2VwdDogJ3RleHQvZXZlbnQtc3RyZWFtJyB9KVxuXG4gICAgcmV0dXJuIChcbiAgICAgIGF3YWl0IHRoaXMucmVxLmZldGNoKHtcbiAgICAgICAgdXJsLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgIC4uLmZldGNoSGVhZGVycyxcbiAgICAgICAgICAuLi5oZWFkZXJzLFxuICAgICAgICB9LFxuICAgICAgICBzdHJlYW0sXG4gICAgICAgIG1ldGhvZCxcbiAgICAgIH0pXG4gICAgKS5kYXRhXG5cbiAgICBmdW5jdGlvbiBvYmplY3RUb1BhcmFtKG9iajogT2JqZWN0KSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmVudHJpZXMob2JqKVxuICAgICAgICAubWFwKChba2V5LCB2YWx1ZV0pID0+IGAke2tleX09JHt2YWx1ZX1gKVxuICAgICAgICAuam9pbignJicpXG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJGdW5jdGlvblRvb2woZnVuY3Rpb25Ub29sOiB0eXBlcy5GdW5jdGlvblRvb2wpIHtcbiAgICBpZiAobW9kZWxzLnRvb2xNYXAuaGFzKGZ1bmN0aW9uVG9vbC5uYW1lKSkge1xuICAgICAgY29uc29sZS53YXJuKGBBSSBmdW5jdGlvbiB0b29sICR7ZnVuY3Rpb25Ub29sLm5hbWV9IGFscmVhZHkgZXhpc3RzIGFuZCB3aWxsIGJlIG92ZXJ3cml0dGVuIWApXG4gICAgfVxuICAgIG1vZGVscy50b29sTWFwLnNldChmdW5jdGlvblRvb2wubmFtZSwgZnVuY3Rpb25Ub29sLmZuKVxuICB9XG59XG5cbmV4cG9ydCB7IEFJIH1cbiJdfQ==
}, function(modId) { var map = {"./bot":1739103120824,"./models":1739103120828}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1739103120824, function(require, module, exports) {

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
var utils_1 = require("../utils");
var Bot = (function () {
    function Bot(req, baseUrl) {
        this.baseUrl = baseUrl;
        var token = arguments[2];
        if (typeof token === 'string') {
            this.req = function (_a) {
                var _b = _a.headers, headers = _b === void 0 ? {} : _b, rest = __rest(_a, ["headers"]);
                return req(__assign(__assign({}, rest), { headers: __assign(__assign({}, headers), { Authorization: "Bearer ".concat(token) }) }));
            };
        }
        else {
            this.req = req;
        }
    }
    Bot.prototype.list = function (props) {
        return this.req({
            method: 'get',
            url: this.join('bots'),
            data: props,
        });
    };
    Bot.prototype.create = function (_a) {
        var botInfo = _a.botInfo;
        return this.req({
            method: 'post',
            url: this.join('bots'),
            data: botInfo,
        });
    };
    Bot.prototype.get = function (_a) {
        var botId = _a.botId;
        return this.req({
            method: 'get',
            url: this.join("bots/".concat(botId)),
        });
    };
    Bot.prototype.update = function (_a) {
        var botId = _a.botId, botInfo = _a.botInfo;
        return this.req({
            method: 'PATCH',
            url: this.join("bots/".concat(botId)),
            data: botInfo,
        });
    };
    Bot.prototype.delete = function (_a) {
        var botId = _a.botId;
        return this.req({ method: 'delete', url: this.join("bots/".concat(botId)) });
    };
    Bot.prototype.getChatRecords = function (props) {
        return this.req({ method: 'get', url: this.join("bots/".concat(props.botId, "/records")), data: props });
    };
    Bot.prototype.sendFeedback = function (_a) {
        var userFeedback = _a.userFeedback;
        return this.req({ method: 'post', url: this.join("bots/".concat(userFeedback.botId, "/feedback")), data: userFeedback });
    };
    Bot.prototype.getFeedback = function (props) {
        return this.req({ method: 'get', url: this.join("bots/".concat(props.botId, "/feedback")), data: props });
    };
    Bot.prototype.getRecommendQuestions = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.req({
                            method: 'post',
                            url: this.join("bots/".concat(props.botId, "/recommend-questions")),
                            data: props,
                            stream: true,
                        })];
                    case 1:
                        res = _a.sent();
                        return [2, new StreamResult(res)];
                }
            });
        });
    };
    Bot.prototype.generateBot = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.req({ method: 'post', url: this.join('generate-bot'), data: props, stream: true })];
                    case 1:
                        res = _a.sent();
                        return [2, new StreamResult(res)];
                }
            });
        });
    };
    Bot.prototype.getPreview = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.req({ method: 'post', url: this.join('preview'), data: props, stream: true })];
                    case 1:
                        res = _a.sent();
                        return [2, new StreamResult(res)];
                }
            });
        });
    };
    Bot.prototype.generateImage = function (props) {
        return this.req({ method: 'post', url: this.join('generate-image'), data: props });
    };
    Bot.prototype.sendMessage = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.req({
                            method: 'post',
                            url: this.join("bots/".concat(props.botId, "/send-message")),
                            data: props,
                            stream: true,
                        })];
                    case 1:
                        res = _a.sent();
                        return [2, new StreamResult(res)];
                }
            });
        });
    };
    Bot.prototype.join = function (url) {
        return "".concat(this.baseUrl, "/").concat(url);
    };
    return Bot;
}());
exports.Bot = Bot;
var StreamResult = (function () {
    function StreamResult(_stream) {
        var stream = (0, utils_1.toPolyfillReadable)(_stream);
        this._eventSourceStream = stream
            .pipeThrough(new utils_1.TextDecoderStream())
            .pipeThrough((0, utils_1.createEventSourceParserTransformStream)());
    }
    Object.defineProperty(StreamResult.prototype, "teeedStream", {
        get: function () {
            var _a = this._eventSourceStream.tee(), s1 = _a[0], s2 = _a[1];
            this._eventSourceStream = s2;
            return s1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamResult.prototype, "eventSourceStream", {
        get: function () {
            return (0, utils_1.createAsyncIterable)(this.teeedStream);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamResult.prototype, "dataStream", {
        get: function () {
            return (0, utils_1.createAsyncIterable)(this.eventSourceStream.pipeThrough(new utils_1.TransformStream({
                transform: function (chunk, controller) {
                    try {
                        var data = JSON.parse(chunk.data);
                        controller.enqueue(data);
                    }
                    catch (e) {
                        if (chunk.data !== '[DONE]') {
                            console.warn('Error when transforming event source data to json', e, chunk);
                        }
                    }
                },
            })));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StreamResult.prototype, "textStream", {
        get: function () {
            return (0, utils_1.createAsyncIterable)(this.dataStream.pipeThrough(new utils_1.TransformStream({
                transform: function (chunk, controller) {
                    var _a;
                    controller.enqueue((_a = chunk === null || chunk === void 0 ? void 0 : chunk.content) !== null && _a !== void 0 ? _a : '');
                },
            })));
        },
        enumerable: false,
        configurable: true
    });
    return StreamResult;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYm90L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkEsa0NBTWlCO0FBRWpCO0lBR0UsYUFBWSxHQUFXLEVBQVMsT0FBZTtRQUFmLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDN0MsSUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzFCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzdCLElBQUksQ0FBQyxHQUFHLEdBQUcsVUFBQyxFQUF5QjtnQkFBdkIsSUFBQSxlQUFZLEVBQVosT0FBTyxtQkFBRyxFQUFFLEtBQUEsRUFBSyxJQUFJLGNBQXZCLFdBQXlCLENBQUY7Z0JBQU8sT0FBQSxHQUFHLHVCQUFNLElBQUksS0FBRSxPQUFPLHdCQUFPLE9BQU8sS0FBRSxhQUFhLEVBQUUsaUJBQVUsS0FBSyxDQUFFLE9BQUssQ0FBQTthQUFBLENBQUE7U0FDdEg7YUFBTTtZQUNMLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFBO1NBQ2Y7SUFDSCxDQUFDO0lBRUQsa0JBQUksR0FBSixVQUFLLEtBQWtCO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUNkLE1BQU0sRUFBRSxLQUFLO1lBQ2IsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3RCLElBQUksRUFBRSxLQUFLO1NBQ1osQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELG9CQUFNLEdBQU4sVUFBTyxFQUF1QjtZQUFyQixPQUFPLGFBQUE7UUFDZCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7WUFDZCxNQUFNLEVBQUUsTUFBTTtZQUNkLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUN0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QTZCO2dCQUNyRyxTQUFTLFlBQUMsS0FBSyxFQUFFLFVBQVU7O29CQUN6QixVQUFVLENBQUMsT0FBTyxDQUFDLE1BQUEsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLE9BQU8sbUNBQUksRUFBRSxDQUFDLENBQUE7Z0JBQzFDLENBQUM7YUFDRixDQUFDLENBQUUsQ0FBRSxDQUFBO1FBQ1IsQ0FBQzs7O09BQUE7SUFDSCxtQkFBQztBQUFELENBQUMsQUExQ0QsSUEwQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0eXBlIFBhcnNlZEV2ZW50IH0gZnJvbSAnLi4vZXZlbnRzb3VyY2VfcGFyc2VyJ1xuaW1wb3J0IHsgQm90UmVxIH0gZnJvbSAnLi4vdHlwZSdcbmltcG9ydCB7XG4gIElCb3RQcmV2aWV3LFxuICBJQm90U2VuZE1lc3NhZ2UsXG4gIElDcmVhdGVCb3QsXG4gIElEZWxldGVCb3QsXG4gIElHZW5lcmF0ZUJvdCxcbiAgSUdlbmVyYXRlSW1hZ2UsXG4gIElHZXRCb3QsXG4gIElHZXRCb3RDaGF0UmVjb3JkcyxcbiAgSUdldEJvdEZlZWRiYWNrLFxuICBJR2V0Qm90TGlzdCxcbiAgSUdldEJvdFJlY29tbWVuZFF1ZXN0aW9ucyxcbiAgSVNlbmRCb3RGZWVkYmFjayxcbiAgSVVwZGF0ZUJvdCxcbn0gZnJvbSAnLi90eXBlcydcbmltcG9ydCB7XG4gIGNyZWF0ZUFzeW5jSXRlcmFibGUsXG4gIHRvUG9seWZpbGxSZWFkYWJsZSxcbiAgY3JlYXRlRXZlbnRTb3VyY2VQYXJzZXJUcmFuc2Zvcm1TdHJlYW0sXG4gIFRleHREZWNvZGVyU3RyZWFtLFxuICBUcmFuc2Zvcm1TdHJlYW0sXG59IGZyb20gJy4uL3V0aWxzJ1xuXG5leHBvcnQgY2xhc3MgQm90IHtcbiAgcmVxOiBCb3RSZXFcblxuICBjb25zdHJ1Y3RvcihyZXE6IEJvdFJlcSwgcHVibGljIGJhc2VVcmw6IHN0cmluZykge1xuICAgIGNvbnN0IHRva2VuID0gYXJndW1lbnRzWzJdXG4gICAgaWYgKHR5cGVvZiB0b2tlbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMucmVxID0gKHsgaGVhZGVycyA9IHt9LCAuLi5yZXN0IH0pID0+IHJlcSh7IC4uLnJlc3QsIGhlYWRlcnM6IHsgLi4uaGVhZGVycywgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VufWAgfSB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlcSA9IHJlcVxuICAgIH1cbiAgfVxuXG4gIGxpc3QocHJvcHM6IElHZXRCb3RMaXN0KSB7XG4gICAgcmV0dXJuIHRoaXMucmVxKHtcbiAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICB1cmw6IHRoaXMuam9pbignYm90cycpLFxuICAgICAgZGF0YTogcHJvcHMsXG4gICAgfSlcbiAgfVxuXG4gIGNyZWF0ZSh7IGJvdEluZm8gfTogSUNyZWF0ZUJvdCkge1xuICAgIHJldHVybiB0aGlzLnJlcSh7XG4gICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgIHVybDogdGhpcy5qb2luKCdib3RzJyksXG4gICAgICBkYXRhOiBib3RJbmZvLFxuICAgIH0pXG4gIH1cblxuICBnZXQoeyBib3RJZCB9OiBJR2V0Qm90KSB7XG4gICAgcmV0dXJuIHRoaXMucmVxKHtcbiAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICB1cmw6IHRoaXMuam9pbihgYm90cy8ke2JvdElkfWApLFxuICAgIH0pXG4gIH1cblxuICB1cGRhdGUoeyBib3RJZCwgYm90SW5mbyB9OiBJVXBkYXRlQm90KSB7XG4gICAgcmV0dXJuIHRoaXMucmVxKHtcbiAgICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICAgIHVybDogdGhpcy5qb2luKGBib3RzLyR7Ym90SWR9YCksXG4gICAgICBkYXRhOiBib3RJbmZvLFxuICAgIH0pXG4gIH1cblxuICBkZWxldGUoeyBib3RJZCB9OiBJRGVsZXRlQm90KSB7XG4gICAgcmV0dXJuIHRoaXMucmVxKHsgbWV0aG9kOiAnZGVsZXRlJywgdXJsOiB0aGlzLmpvaW4oYGJvdHMvJHtib3RJZH1gKSB9KVxuICB9XG5cbiAgZ2V0Q2hhdFJlY29yZHMocHJvcHM6IElHZXRCb3RDaGF0UmVjb3Jkcykge1xuICAgIHJldHVybiB0aGlzLnJlcSh7IG1ldGhvZDogJ2dldCcsIHVybDogdGhpcy5qb2luKGBib3RzLyR7cHJvcHMuYm90SWR9L3JlY29yZHNgKSwgZGF0YTogcHJvcHMgfSlcbiAgfVxuXG4gIHNlbmRGZWVkYmFjayh7IHVzZXJGZWVkYmFjayB9OiBJU2VuZEJvdEZlZWRiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxKHsgbWV0aG9kOiAncG9zdCcsIHVybDogdGhpcy5qb2luKGBib3RzLyR7dXNlckZlZWRiYWNrLmJvdElkfS9mZWVkYmFja2ApLCBkYXRhOiB1c2VyRmVlZGJhY2sgfSlcbiAgfVxuXG4gIGdldEZlZWRiYWNrKHByb3BzOiBJR2V0Qm90RmVlZGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5yZXEoeyBtZXRob2Q6ICdnZXQnLCB1cmw6IHRoaXMuam9pbihgYm90cy8ke3Byb3BzLmJvdElkfS9mZWVkYmFja2ApLCBkYXRhOiBwcm9wcyB9KVxuICB9XG5cbiAgYXN5bmMgZ2V0UmVjb21tZW5kUXVlc3Rpb25zKHByb3BzOiBJR2V0Qm90UmVjb21tZW5kUXVlc3Rpb25zKSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5yZXEoe1xuICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICB1cmw6IHRoaXMuam9pbihgYm90cy8ke3Byb3BzLmJvdElkfS9yZWNvbW1lbmQtcXVlc3Rpb25zYCksXG4gICAgICBkYXRhOiBwcm9wcyxcbiAgICAgIHN0cmVhbTogdHJ1ZSxcbiAgICB9KVxuICAgIHJldHVybiBuZXcgU3RyZWFtUmVzdWx0KHJlcylcbiAgfVxuXG4gIGFzeW5jIGdlbmVyYXRlQm90KHByb3BzOiBJR2VuZXJhdGVCb3QpIHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLnJlcSh7IG1ldGhvZDogJ3Bvc3QnLCB1cmw6IHRoaXMuam9pbignZ2VuZXJhdGUtYm90JyksIGRhdGE6IHByb3BzLCBzdHJlYW06IHRydWUgfSlcbiAgICByZXR1cm4gbmV3IFN0cmVhbVJlc3VsdChyZXMpXG4gIH1cblxuICBhc3luYyBnZXRQcmV2aWV3KHByb3BzOiBJQm90UHJldmlldykge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMucmVxKHsgbWV0aG9kOiAncG9zdCcsIHVybDogdGhpcy5qb2luKCdwcmV2aWV3JyksIGRhdGE6IHByb3BzLCBzdHJlYW06IHRydWUgfSlcbiAgICByZXR1cm4gbmV3IFN0cmVhbVJlc3VsdChyZXMpXG4gIH1cblxuICBnZW5lcmF0ZUltYWdlKHByb3BzOiBJR2VuZXJhdGVJbWFnZSkge1xuICAgIHJldHVybiB0aGlzLnJlcSh7IG1ldGhvZDogJ3Bvc3QnLCB1cmw6IHRoaXMuam9pbignZ2VuZXJhdGUtaW1hZ2UnKSwgZGF0YTogcHJvcHMgfSlcbiAgfVxuXG4gIGFzeW5jIHNlbmRNZXNzYWdlKHByb3BzOiBJQm90U2VuZE1lc3NhZ2UpIHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLnJlcSh7XG4gICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgIHVybDogdGhpcy5qb2luKGBib3RzLyR7cHJvcHMuYm90SWR9L3NlbmQtbWVzc2FnZWApLFxuICAgICAgZGF0YTogcHJvcHMsXG4gICAgICBzdHJlYW06IHRydWUsXG4gICAgfSlcbiAgICByZXR1cm4gbmV3IFN0cmVhbVJlc3VsdChyZXMpXG4gIH1cblxuICBwcml2YXRlIGpvaW4odXJsOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gYCR7dGhpcy5iYXNlVXJsfS8ke3VybH1gXG4gIH1cbn1cblxudHlwZSBCb3RFdmVudFN0cmVhbURhdGEgPSB7IGNvbnRlbnQ6IHN0cmluZyB9XG5cbmNsYXNzIFN0cmVhbVJlc3VsdCB7XG4gIHByaXZhdGUgX2V2ZW50U291cmNlU3RyZWFtOiBSZWFkYWJsZVN0cmVhbTxQYXJzZWRFdmVudD5cblxuICBjb25zdHJ1Y3Rvcihfc3RyZWFtOiBSZWFkYWJsZVN0cmVhbTxVaW50OEFycmF5Pikge1xuICAgIGNvbnN0IHN0cmVhbSA9IHRvUG9seWZpbGxSZWFkYWJsZShfc3RyZWFtKSBhcyB0eXBlb2YgX3N0cmVhbVxuICAgIHRoaXMuX2V2ZW50U291cmNlU3RyZWFtID0gc3RyZWFtXG4gICAgICAucGlwZVRocm91Z2gobmV3IFRleHREZWNvZGVyU3RyZWFtKCkpXG4gICAgICAucGlwZVRocm91Z2goY3JlYXRlRXZlbnRTb3VyY2VQYXJzZXJUcmFuc2Zvcm1TdHJlYW0oKSlcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IHRlZWVkU3RyZWFtKCkge1xuICAgIGNvbnN0IFtzMSwgczJdID0gdGhpcy5fZXZlbnRTb3VyY2VTdHJlYW0udGVlKClcbiAgICB0aGlzLl9ldmVudFNvdXJjZVN0cmVhbSA9IHMyXG4gICAgcmV0dXJuIHMxXG4gIH1cblxuICBnZXQgZXZlbnRTb3VyY2VTdHJlYW0oKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUFzeW5jSXRlcmFibGUodGhpcy50ZWVlZFN0cmVhbSlcbiAgfVxuXG4gIGdldCBkYXRhU3RyZWFtKCkge1xuICAgIHJldHVybiBjcmVhdGVBc3luY0l0ZXJhYmxlKHRoaXMuZXZlbnRTb3VyY2VTdHJlYW0ucGlwZVRocm91Z2gobmV3IFRyYW5zZm9ybVN0cmVhbTxQYXJzZWRFdmVudCwgQm90RXZlbnRTdHJlYW1EYXRhPih7XG4gICAgICB0cmFuc2Zvcm0oY2h1bmssIGNvbnRyb2xsZXIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShjaHVuay5kYXRhKVxuICAgICAgICAgIGNvbnRyb2xsZXIuZW5xdWV1ZShkYXRhKVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgaWYgKGNodW5rLmRhdGEgIT09ICdbRE9ORV0nKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0Vycm9yIHdoZW4gdHJhbnNmb3JtaW5nIGV2ZW50IHNvdXJjZSBkYXRhIHRvIGpzb24nLCBlLCBjaHVuaylcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSksKSwpXG4gIH1cblxuICBnZXQgdGV4dFN0cmVhbSgpIHtcbiAgICByZXR1cm4gY3JlYXRlQXN5bmNJdGVyYWJsZSh0aGlzLmRhdGFTdHJlYW0ucGlwZVRocm91Z2gobmV3IFRyYW5zZm9ybVN0cmVhbTxCb3RFdmVudFN0cmVhbURhdGEsIHN0cmluZz4oe1xuICAgICAgdHJhbnNmb3JtKGNodW5rLCBjb250cm9sbGVyKSB7XG4gICAgICAgIGNvbnRyb2xsZXIuZW5xdWV1ZShjaHVuaz8uY29udGVudCA/PyAnJylcbiAgICAgIH0sXG4gICAgfSksKSwpXG4gIH1cbn1cbiJdfQ==
}, function(modId) { var map = {"../utils":1739103120825}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1739103120825, function(require, module, exports) {

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.functionToolToModelTool = exports.isToolCallAssistantMessage = exports.createPromise = exports.intoStandardStream = exports.createAsyncIterable = exports.TextDecoderStream = exports.toPolyfillReadable = exports.createEventSourceParserTransformStream = exports.TransformStream = exports.ReadableStream = void 0;
var web_streams_polyfill_1 = require("web-streams-polyfill");
var web_streams_adapter_1 = require("@mattiasbuelens/web-streams-adapter");
var eventsource_parser_1 = require("./eventsource_parser");
var text_encoding_shim_1 = require("text-encoding-shim");
exports.ReadableStream = web_streams_polyfill_1.ReadableStream;
exports.TransformStream = web_streams_polyfill_1.TransformStream;
var createEventSourceParserTransformStream = function () {
    var parser;
    return new exports.TransformStream({
        start: function (controller) {
            parser = (0, eventsource_parser_1.createParser)(function (event) {
                if (event.type === 'event') {
                    controller.enqueue(event);
                }
            });
        },
        transform: function (chunk) {
            parser.feed(chunk);
        },
    });
};
exports.createEventSourceParserTransformStream = createEventSourceParserTransformStream;
exports.toPolyfillReadable = (0, web_streams_adapter_1.createReadableStreamWrapper)(exports.ReadableStream);
var TextDecoderStream = (function () {
    function TextDecoderStream(encoding, options) {
        if (encoding === void 0) { encoding = 'utf-8'; }
        if (options === void 0) { options = {}; }
        var _this = this;
        this.transform = new exports.TransformStream({
            transform: function (chunk, controller) {
                var value = _this.handle.decode(new Uint8Array(chunk), { stream: true });
                if (value) {
                    controller.enqueue(value);
                }
            },
            flush: function (controller) {
                var value = _this.handle.decode();
                if (value) {
                    controller.enqueue(value);
                }
                controller.terminate();
            },
        });
        this.handle = new text_encoding_shim_1.TextDecoder(encoding, options);
    }
    Object.defineProperty(TextDecoderStream.prototype, "encoding", {
        get: function () {
            return this.handle.encoding;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextDecoderStream.prototype, "fatal", {
        get: function () {
            return this.handle.fatal;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextDecoderStream.prototype, "ignoreBOM", {
        get: function () {
            return this.handle.ignoreBOM;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextDecoderStream.prototype, "readable", {
        get: function () {
            return this.transform.readable;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextDecoderStream.prototype, "writable", {
        get: function () {
            return this.transform.writable;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextDecoderStream.prototype, Symbol.toStringTag, {
        get: function () {
            return 'TextDecoderStream';
        },
        enumerable: false,
        configurable: true
    });
    return TextDecoderStream;
}());
exports.TextDecoderStream = TextDecoderStream;
function createAsyncIterable(stream) {
    var _stream = stream;
    _stream[Symbol.asyncIterator] = function () {
        var reader = stream.getReader();
        return {
            next: function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _a, done, value;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4, reader.read()];
                            case 1:
                                _a = _b.sent(), done = _a.done, value = _a.value;
                                return [2, done ? { done: true, value: undefined } : { done: false, value: value }];
                        }
                    });
                });
            },
        };
    };
    return _stream;
}
exports.createAsyncIterable = createAsyncIterable;
function intoStandardStream(stream) {
    return createAsyncIterable(stream
        .pipeThrough(new TextDecoderStream())
        .pipeThrough((0, exports.createEventSourceParserTransformStream)())
        .pipeThrough(new exports.TransformStream({
        transform: function (chunk, controller) {
            try {
                var data = JSON.parse(chunk.data);
                controller.enqueue(data);
            }
            catch (e) {
                if (chunk.data !== '[DONE]') {
                    console.warn('Error when transforming event source data to json', e, chunk);
                }
            }
        },
    })));
}
exports.intoStandardStream = intoStandardStream;
function createPromise() {
    var res;
    var rej;
    var promise = new Promise(function (resolve, reject) {
        res = resolve;
        rej = reject;
    });
    return { promise: promise, res: res, rej: rej };
}
exports.createPromise = createPromise;
function isToolCallAssistantMessage(message) {
    return message.role === 'assistant' && 'tool_calls' in message && message.tool_calls[0] != null;
}
exports.isToolCallAssistantMessage = isToolCallAssistantMessage;
function functionToolToModelTool(tool) {
    return {
        type: 'function',
        function: {
            description: tool.description,
            name: tool.name,
            parameters: tool.parameters,
        },
    };
}
exports.functionToolToModelTool = functionToolToModelTool;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkRBQTZHO0FBQzdHLDJFQUFpRjtBQUNqRiwyREFBNkY7QUFRN0YseURBQWdEO0FBRW5DLFFBQUEsY0FBYyxHQUFHLHFDQVc3QixDQUFBO0FBRVksUUFBQSxlQUFlLEdBQUcsc0NBUTlCLENBQUE7QUFFTSxJQUFNLHNDQUFzQyxHQUFHO0lBQ3BELElBQUksTUFBMEIsQ0FBQTtJQUU5QixPQUFPLElBQUksdUJBQWUsQ0FBc0I7UUFDOUMsS0FBSyxZQUFDLFVBQVU7WUFDZCxNQUFNLEdBQUcsSUFBQSxpQ0FBWSxFQUFDLFVBQUMsS0FBSztnQkFDMUIsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtvQkFDMUIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtpQkFDMUI7WUFDSCxDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUM7UUFDRCxTQUFTLFlBQUMsS0FBSztZQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDcEIsQ0FBQztLQUNGLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQWZZLFFBQUEsc0NBQXNDLDBDQWVsRDtBQUVZLFFBQUEsa0JBQWtCLEdBQUcsSUFBQSxpREFBMkIsRUFBQyxzQkFBYyxDQUFDLENBQUE7QUFFN0U7SUFxQkUsMkJBQVksUUFBa0IsRUFBRSxPQUFnQztRQUFwRCx5QkFBQSxFQUFBLGtCQUFrQjtRQUFFLHdCQUFBLEVBQUEsWUFBZ0M7UUFBaEUsaUJBRUM7UUFwQk8sY0FBUyxHQUFHLElBQUksdUJBQWUsQ0FBQztZQUN0QyxTQUFTLEVBQUUsVUFBQyxLQUFLLEVBQUUsVUFBVTtnQkFDM0IsSUFBTSxLQUFLLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFN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SUFBSSxLQUFLLFFBQVEsRUFBRTtvQkFDM0IsT0FBTyxDQUFDLElBQUksQ0FBQyxtREFBbUQsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUE7aUJBQzVFO2FBQ0Y7UUFDSCxDQUFDO0tBQ0YsQ0FBQyxDQUFFLENBQUUsQ0FBQTtBQUNWLENBQUM7QUFoQkQsZ0RBZ0JDO0FBRUQsU0FBZ0IsYUFBYTtJQUMzQixJQUFJLEdBQXdDLENBQUE7SUFDNUMsSUFBSSxHQUEyQixDQUFBO0lBQy9CLElBQU0sT0FBTyxHQUFHLElBQUksT0FBTyxDQUFJLFVBQUMsT0FBTyxFQUFFLE1BQU07UUFDN0MsR0FBRyxHQUFHLE9BQU8sQ0FBQTtRQUNiLEdBQUcsR0FBRyxNQUFNLENBQUE7SUFDZCxDQUFDLENBQUMsQ0FBQTtJQUNGLE9BQU8sRUFBRSxPQUFPLFNBQUEsRUFBRSxHQUFHLEtBQUEsRUFBRSxHQUFHLEtBQUEsRUFBRSxDQUFBO0FBQzlCLENBQUM7QUFSRCxzQ0FRQztBQUVELFNBQWdCLDBCQUEwQixDQUFDLE9BQXlCO0lBQ2xFLE9BQU8sT0FBTyxDQUFDLElBQUksS0FBSyxXQUFXLElBQUksWUFBWSxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQTtBQUNqRyxDQUFDO0FBRkQsZ0VBRUM7QUFFRCxTQUFnQix1QkFBdUIsQ0FBQyxJQUFrQjtJQUN4RCxPQUFPO1FBQ0wsSUFBSSxFQUFFLFVBQVU7UUFDaEIsUUFBUSxFQUFFO1lBQ1IsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtTQUM1QjtLQUNGLENBQUE7QUFDSCxDQUFDO0FBVEQsMERBU0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUcmFuc2Zvcm1TdHJlYW0gYXMgX1RyYW5zZm9ybVN0cmVhbSwgUmVhZGFibGVTdHJlYW0gYXMgX1JlYWRhYmxlU3RyZWFtIH0gZnJvbSAnd2ViLXN0cmVhbXMtcG9seWZpbGwnXG5pbXBvcnQgeyBjcmVhdGVSZWFkYWJsZVN0cmVhbVdyYXBwZXIgfSBmcm9tICdAbWF0dGlhc2J1ZWxlbnMvd2ViLXN0cmVhbXMtYWRhcHRlcidcbmltcG9ydCB7IGNyZWF0ZVBhcnNlciwgdHlwZSBFdmVudFNvdXJjZVBhcnNlciwgdHlwZSBQYXJzZWRFdmVudCB9IGZyb20gJy4vZXZlbnRzb3VyY2VfcGFyc2VyJ1xuaW1wb3J0IHR5cGUge1xuICBBc3luY0l0ZXJhYmxlUmVhZGFibGVTdHJlYW0sXG4gIENoYXRNb2RlbE1lc3NhZ2UsXG4gIFRvb2xDYWxsQXNzaXN0YW50TWVzc2FnZSxcbiAgTW9kZWxUb29sLFxuICBGdW5jdGlvblRvb2wsXG59IGZyb20gJy4vdHlwZSdcbmltcG9ydCB7IFRleHREZWNvZGVyIH0gZnJvbSAndGV4dC1lbmNvZGluZy1zaGltJ1xuXG5leHBvcnQgY29uc3QgUmVhZGFibGVTdHJlYW0gPSBfUmVhZGFibGVTdHJlYW0gYXMge1xuICBwcm90b3R5cGU6IFJlYWRhYmxlU3RyZWFtXG5cbiAgbmV3IChcbiAgICB1bmRlcmx5aW5nU291cmNlOiBVbmRlcmx5aW5nQnl0ZVNvdXJjZSxcbiAgICBzdHJhdGVneT86IHtcbiAgICAgIGhpZ2hXYXRlck1hcms/OiBudW1iZXJcbiAgICB9LFxuICApOiBSZWFkYWJsZVN0cmVhbTxVaW50OEFycmF5PlxuICBuZXcgPFIgPSBhbnk+KHVuZGVybHlpbmdTb3VyY2U6IFVuZGVybHlpbmdEZWZhdWx0U291cmNlPFI+LCBzdHJhdGVneT86IFF1ZXVpbmdTdHJhdGVneTxSPik6IFJlYWRhYmxlU3RyZWFtPFI+XG4gIG5ldyA8UiA9IGFueT4odW5kZXJseWluZ1NvdXJjZT86IFVuZGVybHlpbmdTb3VyY2U8Uj4sIHN0cmF0ZWd5PzogUXVldWluZ1N0cmF0ZWd5PFI+KTogUmVhZGFibGVTdHJlYW08Uj5cbn1cblxuZXhwb3J0IGNvbnN0IFRyYW5zZm9ybVN0cmVhbSA9IF9UcmFuc2Zvcm1TdHJlYW0gYXMge1xuICBwcm90b3R5cGU6IFRyYW5zZm9ybVN0cmVhbVxuXG4gIG5ldyA8SSA9IGFueSwgTyA9IGFueT4oXG4gICAgdHJhbnNmb3JtZXI/OiBUcmFuc2Zvcm1lcjxJLCBPPixcbiAgICB3cml0YWJsZVN0cmF0ZWd5PzogUXVldWluZ1N0cmF0ZWd5PEk+LFxuICAgIHJlYWRhYmxlU3RyYXRlZ3k/OiBRdWV1aW5nU3RyYXRlZ3k8Tz4sXG4gICk6IFRyYW5zZm9ybVN0cmVhbTxJLCBPPlxufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlRXZlbnRTb3VyY2VQYXJzZXJUcmFuc2Zvcm1TdHJlYW0gPSAoKSA9PiB7XG4gIGxldCBwYXJzZXIhOiBFdmVudFNvdXJjZVBhcnNlclxuXG4gIHJldHVybiBuZXcgVHJhbnNmb3JtU3RyZWFtPHN0cmluZywgUGFyc2VkRXZlbnQ+KHtcbiAgICBzdGFydChjb250cm9sbGVyKSB7XG4gICAgICBwYXJzZXIgPSBjcmVhdGVQYXJzZXIoKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC50eXBlID09PSAnZXZlbnQnKSB7XG4gICAgICAgICAgY29udHJvbGxlci5lbnF1ZXVlKGV2ZW50KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgdHJhbnNmb3JtKGNodW5rKSB7XG4gICAgICBwYXJzZXIuZmVlZChjaHVuaylcbiAgICB9LFxuICB9KVxufVxuXG5leHBvcnQgY29uc3QgdG9Qb2x5ZmlsbFJlYWRhYmxlID0gY3JlYXRlUmVhZGFibGVTdHJlYW1XcmFwcGVyKFJlYWRhYmxlU3RyZWFtKVxuXG5leHBvcnQgY2xhc3MgVGV4dERlY29kZXJTdHJlYW0ge1xuICBwcml2YXRlIGhhbmRsZTogVGV4dERlY29kZXJcblxuICBwcml2YXRlIHRyYW5zZm9ybSA9IG5ldyBUcmFuc2Zvcm1TdHJlYW0oe1xuICAgIHRyYW5zZm9ybTogKGNodW5rLCBjb250cm9sbGVyKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuaGFuZGxlLmRlY29kZShuZXcgVWludDhBcnJheShjaHVuayksIHsgc3RyZWFtOiB0cnVlIH0pXG5cbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBjb250cm9sbGVyLmVucXVldWUodmFsdWUpXG4gICAgICB9XG4gICAgfSxcbiAgICBmbHVzaDogKGNvbnRyb2xsZXIpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5oYW5kbGUuZGVjb2RlKClcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBjb250cm9sbGVyLmVucXVldWUodmFsdWUpXG4gICAgICB9XG5cbiAgICAgIGNvbnRyb2xsZXIudGVybWluYXRlKClcbiAgICB9LFxuICB9KVxuXG4gIGNvbnN0cnVjdG9yKGVuY29kaW5nID0gJ3V0Zi04Jywgb3B0aW9uczogVGV4dERlY29kZXJPcHRpb25zID0ge30pIHtcbiAgICB0aGlzLmhhbmRsZSA9IG5ldyBUZXh0RGVjb2RlcihlbmNvZGluZywgb3B0aW9ucylcbiAgfVxuXG4gIGdldCBlbmNvZGluZygpIHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGUuZW5jb2RpbmdcbiAgfVxuXG4gIGdldCBmYXRhbCgpIHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGUuZmF0YWxcbiAgfVxuXG4gIGdldCBpZ25vcmVCT00oKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlLmlnbm9yZUJPTVxuICB9XG5cbiAgZ2V0IHJlYWRhYmxlKCkge1xuICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybS5yZWFkYWJsZVxuICB9XG5cbiAgZ2V0IHdyaXRhYmxlKCkge1xuICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybS53cml0YWJsZVxuICB9XG5cbiAgZ2V0IFtTeW1ib2wudG9TdHJpbmdUYWddKCkge1xuICAgIHJldHVybiAnVGV4dERlY29kZXJTdHJlYW0nXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFzeW5jSXRlcmFibGU8VD4oc3RyZWFtOiBSZWFkYWJsZVN0cmVhbTxUPikge1xuICBjb25zdCBfc3RyZWFtID0gc3RyZWFtIGFzIEFzeW5jSXRlcmFibGVSZWFkYWJsZVN0cmVhbTxUPlxuICBfc3RyZWFtW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9ICgpID0+IHtcbiAgICBjb25zdCByZWFkZXIgPSBzdHJlYW0uZ2V0UmVhZGVyKClcbiAgICByZXR1cm4ge1xuICAgICAgYXN5bmMgbmV4dCgpOiBQcm9taXNlPEl0ZXJhdG9yUmVzdWx0PFQ+PiB7XG4gICAgICAgIGNvbnN0IHsgZG9uZSwgdmFsdWUgfSA9IGF3YWl0IHJlYWRlci5yZWFkKClcbiAgICAgICAgcmV0dXJuIGRvbmUgPyB7IGRvbmU6IHRydWUsIHZhbHVlOiB1bmRlZmluZWQgfSA6IHsgZG9uZTogZmFsc2UsIHZhbHVlIH1cbiAgICAgIH0sXG4gICAgfVxuICB9XG4gIHJldHVybiBfc3RyZWFtXG59XG5cbi8qKlxuICog5bCGIFNTRSDkuozov5vliLbmtYHovazmjaLkuLogVCDnsbvlnovnmoTmtYFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGludG9TdGFuZGFyZFN0cmVhbTxUPihzdHJlYW06IFJlYWRhYmxlU3RyZWFtPFVpbnQ4QXJyYXk+KTogUmVhZGFibGVTdHJlYW08VD4ge1xuICByZXR1cm4gY3JlYXRlQXN5bmNJdGVyYWJsZShzdHJlYW1cbiAgICAucGlwZVRocm91Z2gobmV3IFRleHREZWNvZGVyU3RyZWFtKCkpXG4gICAgLnBpcGVUaHJvdWdoKGNyZWF0ZUV2ZW50U291cmNlUGFyc2VyVHJhbnNmb3JtU3RyZWFtKCkpXG4gICAgLnBpcGVUaHJvdWdoKG5ldyBUcmFuc2Zvcm1TdHJlYW08UGFyc2VkRXZlbnQsIFQ+KHtcbiAgICAgIHRyYW5zZm9ybShjaHVuaywgY29udHJvbGxlcikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKGNodW5rLmRhdGEpIGFzIFRcbiAgICAgICAgICBjb250cm9sbGVyLmVucXVldWUoZGF0YSlcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGlmIChjaHVuay5kYXRhICE9PSAnW0RPTkVdJykge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdFcnJvciB3aGVuIHRyYW5zZm9ybWluZyBldmVudCBzb3VyY2UgZGF0YSB0byBqc29uJywgZSwgY2h1bmspXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0pLCksKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUHJvbWlzZTxUID0gdW5rbm93bj4oKSB7XG4gIGxldCByZXM6ICh2YWx1ZTogVCB8IFByb21pc2VMaWtlPFQ+KSA9PiB2b2lkXG4gIGxldCByZWo6IChyZWFzb24/OiBhbnkpID0+IHZvaWRcbiAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlPFQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICByZXMgPSByZXNvbHZlXG4gICAgcmVqID0gcmVqZWN0XG4gIH0pXG4gIHJldHVybiB7IHByb21pc2UsIHJlcywgcmVqIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVG9vbENhbGxBc3Npc3RhbnRNZXNzYWdlKG1lc3NhZ2U6IENoYXRNb2RlbE1lc3NhZ2UpOiBtZXNzYWdlIGlzIFRvb2xDYWxsQXNzaXN0YW50TWVzc2FnZSB7XG4gIHJldHVybiBtZXNzYWdlLnJvbGUgPT09ICdhc3Npc3RhbnQnICYmICd0b29sX2NhbGxzJyBpbiBtZXNzYWdlICYmIG1lc3NhZ2UudG9vbF9jYWxsc1swXSAhPSBudWxsXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmdW5jdGlvblRvb2xUb01vZGVsVG9vbCh0b29sOiBGdW5jdGlvblRvb2wpOiBNb2RlbFRvb2wge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdmdW5jdGlvbicsXG4gICAgZnVuY3Rpb246IHtcbiAgICAgIGRlc2NyaXB0aW9uOiB0b29sLmRlc2NyaXB0aW9uLFxuICAgICAgbmFtZTogdG9vbC5uYW1lLFxuICAgICAgcGFyYW1ldGVyczogdG9vbC5wYXJhbWV0ZXJzLFxuICAgIH0sXG4gIH1cbn1cbiJdfQ==
}, function(modId) { var map = {"./eventsource_parser":1739103120826}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1739103120826, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.createParser = void 0;
var parse_1 = require("./parse");
Object.defineProperty(exports, "createParser", { enumerable: true, get: function () { return parse_1.createParser; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZXZlbnRzb3VyY2VfcGFyc2VyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLGlDQUFzQztBQUE3QixxR0FBQSxZQUFZLE9BQUEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgdHlwZSB7IEV2ZW50U291cmNlUGFyc2VyLCBQYXJzZWRFdmVudCwgUmVjb25uZWN0SW50ZXJ2YWwsIFBhcnNlRXZlbnQsIEV2ZW50U291cmNlUGFyc2VDYWxsYmFjayB9IGZyb20gJy4vdHlwZXMnXG5leHBvcnQgeyBjcmVhdGVQYXJzZXIgfSBmcm9tICcuL3BhcnNlJ1xuIl19
}, function(modId) { var map = {"./parse":1739103120827}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1739103120827, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.createParser = void 0;
function createParser(onParse) {
    var isFirstChunk;
    var buffer;
    var startingPosition;
    var startingFieldLength;
    var eventId;
    var eventName;
    var data;
    reset();
    return { feed: feed, reset: reset };
    function reset() {
        isFirstChunk = true;
        buffer = '';
        startingPosition = 0;
        startingFieldLength = -1;
        eventId = undefined;
        eventName = undefined;
        data = '';
    }
    function feed(chunk) {
        buffer = buffer ? buffer + chunk : chunk;
        if (isFirstChunk && hasBom(buffer)) {
            buffer = buffer.slice(BOM.length);
        }
        isFirstChunk = false;
        var length = buffer.length;
        var position = 0;
        var discardTrailingNewline = false;
        while (position < length) {
            if (discardTrailingNewline) {
                if (buffer[position] === '\n') {
                    position += 1;
                }
                discardTrailingNewline = false;
            }
            var lineLength = -1;
            var fieldLength = startingFieldLength;
            var character = void 0;
            for (var index = startingPosition; lineLength < 0 && index < length; index++) {
                character = buffer[index];
                if (character === ':' && fieldLength < 0) {
                    fieldLength = index - position;
                }
                else if (character === '\r') {
                    discardTrailingNewline = true;
                    lineLength = index - position;
                }
                else if (character === '\n') {
                    lineLength = index - position;
                }
            }
            if (lineLength < 0) {
                startingPosition = length - position;
                startingFieldLength = fieldLength;
                break;
            }
            else {
                startingPosition = 0;
                startingFieldLength = -1;
            }
            parseEventStreamLine(buffer, position, fieldLength, lineLength);
            position += lineLength + 1;
        }
        if (position === length) {
            buffer = '';
        }
        else if (position > 0) {
            buffer = buffer.slice(position);
        }
    }
    function parseEventStreamLine(lineBuffer, index, fieldLength, lineLength) {
        if (lineLength === 0) {
            if (data.length > 0) {
                onParse({
                    type: 'event',
                    id: eventId,
                    event: eventName || undefined,
                    data: data.slice(0, -1),
                });
                data = '';
                eventId = undefined;
            }
            eventName = undefined;
            return;
        }
        var noValue = fieldLength < 0;
        var field = lineBuffer.slice(index, index + (noValue ? lineLength : fieldLength));
        var step = 0;
        if (noValue) {
            step = lineLength;
        }
        else if (lineBuffer[index + fieldLength + 1] === ' ') {
            step = fieldLength + 2;
        }
        else {
            step = fieldLength + 1;
        }
        var position = index + step;
        var valueLength = lineLength - step;
        var value = lineBuffer.slice(position, position + valueLength).toString();
        if (field === 'data') {
            data += value ? "".concat(value, "\n") : '\n';
        }
        else if (field === 'event') {
            eventName = value;
        }
        else if (field === 'id' && !value.includes('\u0000')) {
            eventId = value;
        }
        else if (field === 'retry') {
            var retry = parseInt(value, 10);
            if (!Number.isNaN(retry)) {
                onParse({ type: 'reconnect-interval', value: retry });
            }
        }
    }
}
exports.createParser = createParser;
var BOM = [239, 187, 191];
function hasBom(buffer) {
    return BOM.every(function (charCode, index) { return buffer.charCodeAt(index) === charCode; });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZXZlbnRzb3VyY2VfcGFyc2VyL3BhcnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQWtCQSxTQUFnQixZQUFZLENBQUMsT0FBaUM7SUFFNUQsSUFBSSxZQUFxQixDQUFBO0lBQ3pCLElBQUksTUFBYyxDQUFBO0lBQ2xCLElBQUksZ0JBQXdCLENBQUE7SUFDNUIsSUFBSSxtQkFBMkIsQ0FBQTtJQUcvQixJQUFJLE9BQTJCLENBQUE7SUFDL0IsSUFBSSxTQUE2QixDQUFBO0lBQ2pDLElBQUksSUFBWSxDQUFBO0lBRWhCLEtBQUssRUFBRSxDQUFBO0lBQ1AsT0FBTyxFQUFFLElBQUksTUFBQSxFQUFFLEtBQUssT0FBQSxFQUFFLENBQUE7SUFFdEIsU0FBUyxLQUFLO1FBQ1osWUFBWSxHQUFHLElBQUksQ0FBQTtRQUNuQixNQUFNLEdBQUcsRUFBRSxDQUFBO1FBQ1gsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFBO1FBQ3BCLG1CQUFtQixHQUFHLENBQUMsQ0FBQyxDQUFBO1FBRXhCLE9BQU8sR0FBRyxTQUFTLENBQUE7UUFDbkIsU0FBUyxHQUFHLFNBQVMsQ0FBQTtRQUNyQixJQUFJLEdBQUcsRUFBRSxDQUFBO0lBQ1gsQ0FBQztJQUVELFNBQVMsSUFBSSxDQUFDLEtBQWE7UUFDekIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFBO1FBS3hDLElBQUksWUFBWSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNsQyxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7U0FDbEM7UUFFRCxZQUFZLEdBQUcsS0FBSyxDQUFBO1FBR1osSUFBQSxNQUFNLEdBQUssTUFBTSxPQUFYLENBQVc7UUFDekIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFB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RSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUE7QUFFM0IsU0FBUyxNQUFNLENBQUMsTUFBYztJQUM1QixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBQyxRQUFnQixFQUFFLEtBQWEsSUFBSyxPQUFBLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssUUFBUSxFQUFyQyxDQUFxQyxDQUFDLENBQUE7QUFDOUYsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRXZlbnRTb3VyY2UvU2VydmVyLVNlbnQgRXZlbnRzIHBhcnNlclxuICogQHNlZSBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9zZXJ2ZXItc2VudC1ldmVudHMuaHRtbFxuICpcbiAqIEJhc2VkIG9uIGNvZGUgZnJvbSB0aGUge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9FdmVudFNvdXJjZS9ldmVudHNvdXJjZSB8IEV2ZW50U291cmNlIG1vZHVsZX0sXG4gKiB3aGljaCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuIEFuZCBjb3B5cmlnaHRlZCB0aGUgRXZlbnRTb3VyY2UgR2l0SHViIG9yZ2FuaXNhdGlvbi5cbiAqL1xuaW1wb3J0IHR5cGUgeyBFdmVudFNvdXJjZVBhcnNlQ2FsbGJhY2ssIEV2ZW50U291cmNlUGFyc2VyIH0gZnJvbSAnLi90eXBlcydcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IEV2ZW50U291cmNlIHBhcnNlci5cbiAqXG4gKiBAcGFyYW0gb25QYXJzZSAtIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGEgbmV3IGV2ZW50IGlzIHBhcnNlZCwgb3IgYSBuZXcgcmVjb25uZWN0aW9uIGludGVydmFsXG4gKiAgICAgICAgICAgICAgICAgIGhhcyBiZWVuIHNlbnQgZnJvbSB0aGUgc2VydmVyXG4gKlxuICogQHJldHVybnMgQSBuZXcgRXZlbnRTb3VyY2UgcGFyc2VyLCB3aXRoIGBwYXJzZWAgYW5kIGByZXNldGAgbWV0aG9kcy5cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBhcnNlcihvblBhcnNlOiBFdmVudFNvdXJjZVBhcnNlQ2FsbGJhY2spOiBFdmVudFNvdXJjZVBhcnNlciB7XG4gIC8vIFByb2Nlc3Npbmcgc3RhdGVcbiAgbGV0IGlzRmlyc3RDaHVuazogYm9vbGVhblxuICBsZXQgYnVmZmVyOiBzdHJpbmdcbiAgbGV0IHN0YXJ0aW5nUG9zaXRpb246IG51bWJlclxuICBsZXQgc3RhcnRpbmdGaWVsZExlbmd0aDogbnVtYmVyXG5cbiAgLy8gRXZlbnQgc3RhdGVcbiAgbGV0IGV2ZW50SWQ6IHN0cmluZyB8IHVuZGVmaW5lZFxuICBsZXQgZXZlbnROYW1lOiBzdHJpbmcgfCB1bmRlZmluZWRcbiAgbGV0IGRhdGE6IHN0cmluZ1xuXG4gIHJlc2V0KClcbiAgcmV0dXJuIHsgZmVlZCwgcmVzZXQgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0KCk6IHZvaWQge1xuICAgIGlzRmlyc3RDaHVuayA9IHRydWVcbiAgICBidWZmZXIgPSAnJ1xuICAgIHN0YXJ0aW5nUG9zaXRpb24gPSAwXG4gICAgc3RhcnRpbmdGaWVsZExlbmd0aCA9IC0xXG5cbiAgICBldmVudElkID0gdW5kZWZpbmVkXG4gICAgZXZlbnROYW1lID0gdW5kZWZpbmVkXG4gICAgZGF0YSA9ICcnXG4gIH1cblxuICBmdW5jdGlvbiBmZWVkKGNodW5rOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBidWZmZXIgPSBidWZmZXIgPyBidWZmZXIgKyBjaHVuayA6IGNodW5rXG5cbiAgICAvLyBTdHJpcCBhbnkgVVRGOCBieXRlIG9yZGVyIG1hcmsgKEJPTSkgYXQgdGhlIHN0YXJ0IG9mIHRoZSBzdHJlYW0uXG4gICAgLy8gTm90ZSB0aGF0IHdlIGRvIG5vdCBzdHJpcCBhbnkgbm9uIC0gVVRGOCBCT00sIGFzIGV2ZW50c291cmNlIHN0cmVhbXMgYXJlXG4gICAgLy8gYWx3YXlzIGRlY29kZWQgYXMgVVRGOCBhcyBwZXIgdGhlIHNwZWNpZmljYXRpb24uXG4gICAgaWYgKGlzRmlyc3RDaHVuayAmJiBoYXNCb20oYnVmZmVyKSkge1xuICAgICAgYnVmZmVyID0gYnVmZmVyLnNsaWNlKEJPTS5sZW5ndGgpXG4gICAgfVxuXG4gICAgaXNGaXJzdENodW5rID0gZmFsc2VcblxuICAgIC8vIFNldCB1cCBjaHVuay1zcGVjaWZpYyBwcm9jZXNzaW5nIHN0YXRlXG4gICAgY29uc3QgeyBsZW5ndGggfSA9IGJ1ZmZlclxuICAgIGxldCBwb3NpdGlvbiA9IDBcbiAgICBsZXQgZGlzY2FyZFRyYWlsaW5nTmV3bGluZSA9IGZhbHNlXG5cbiAgICAvLyBSZWFkIHRoZSBjdXJyZW50IGJ1ZmZlciBieXRlIGJ5IGJ5dGVcbiAgICB3aGlsZSAocG9zaXRpb24gPCBsZW5ndGgpIHtcbiAgICAgIC8vIEV2ZW50U291cmNlIGFsbG93cyBmb3IgY2FycmlhZ2UgcmV0dXJuICsgbGluZSBmZWVkLCB3aGljaCBtZWFucyB3ZVxuICAgICAgLy8gbmVlZCB0byBpZ25vcmUgYSBsaW5lZmVlZCBjaGFyYWN0ZXIgaWYgdGhlIHByZXZpb3VzIGNoYXJhY3RlciB3YXMgYVxuICAgICAgLy8gY2FycmlhZ2UgcmV0dXJuXG4gICAgICAvLyBAdG9kbyByZWZhY3RvciB0byByZWR1Y2UgbmVzdGluZywgY29uc2lkZXIgY2hlY2tpbmcgcHJldmlvdXMgYnl0ZT9cbiAgICAgIC8vIEB0b2RvIGJ1dCBjb25zaWRlciBtdWx0aXBsZSBjaHVua3MgZXRjXG4gICAgICBpZiAoZGlzY2FyZFRyYWlsaW5nTmV3bGluZSkge1xuICAgICAgICBpZiAoYnVmZmVyW3Bvc2l0aW9uXSA9PT0gJ1xcbicpIHtcbiAgICAgICAgICBwb3NpdGlvbiArPSAxXG4gICAgICAgIH1cbiAgICAgICAgZGlzY2FyZFRyYWlsaW5nTmV3bGluZSA9IGZhbHNlXG4gICAgICB9XG5cbiAgICAgIGxldCBsaW5lTGVuZ3RoID0gLTFcbiAgICAgIGxldCBmaWVsZExlbmd0aCA9IHN0YXJ0aW5nRmllbGRMZW5ndGhcbiAgICAgIGxldCBjaGFyYWN0ZXI6IHN0cmluZ1xuXG4gICAgICBmb3IgKGxldCBpbmRleCA9IHN0YXJ0aW5nUG9zaXRpb247IGxpbmVMZW5ndGggPCAwICYmIGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIGNoYXJhY3RlciA9IGJ1ZmZlcltpbmRleF1cbiAgICAgICAgaWYgKGNoYXJhY3RlciA9PT0gJzonICYmIGZpZWxkTGVuZ3RoIDwgMCkge1xuICAgICAgICAgIGZpZWxkTGVuZ3RoID0gaW5kZXggLSBwb3NpdGlvblxuICAgICAgICB9IGVsc2UgaWYgKGNoYXJhY3RlciA9PT0gJ1xccicpIHtcbiAgICAgICAgICBkaXNjYXJkVHJhaWxpbmdOZXdsaW5lID0gdHJ1ZVxuICAgICAgICAgIGxpbmVMZW5ndGggPSBpbmRleCAtIHBvc2l0aW9uXG4gICAgICAgIH0gZWxzZSBpZiAoY2hhcmFjdGVyID09PSAnXFxuJykge1xuICAgICAgICAgIGxpbmVMZW5ndGggPSBpbmRleCAtIHBvc2l0aW9uXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGxpbmVMZW5ndGggPCAwKSB7XG4gICAgICAgIHN0YXJ0aW5nUG9zaXRpb24gPSBsZW5ndGggLSBwb3NpdGlvblxuICAgICAgICBzdGFydGluZ0ZpZWxkTGVuZ3RoID0gZmllbGRMZW5ndGhcbiAgICAgICAgYnJlYWtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXJ0aW5nUG9zaXRpb24gPSAwXG4gICAgICAgIHN0YXJ0aW5nRmllbGRMZW5ndGggPSAtMVxuICAgICAgfVxuXG4gICAgICBwYXJzZUV2ZW50U3RyZWFtTGluZShidWZmZXIsIHBvc2l0aW9uLCBmaWVsZExlbmd0aCwgbGluZUxlbmd0aClcblxuICAgICAgcG9zaXRpb24gKz0gbGluZUxlbmd0aCArIDFcbiAgICB9XG5cbiAgICBpZiAocG9zaXRpb24gPT09IGxlbmd0aCkge1xuICAgICAgLy8gSWYgd2UgY29uc3VtZWQgdGhlIGVudGlyZSBidWZmZXIgdG8gcmVhZCB0aGUgZXZlbnQsIHJlc2V0IHRoZSBidWZmZXJcbiAgICAgIGJ1ZmZlciA9ICcnXG4gICAgfSBlbHNlIGlmIChwb3NpdGlvbiA+IDApIHtcbiAgICAgIC8vIElmIHRoZXJlIGFyZSBieXRlcyBsZWZ0IHRvIHByb2Nlc3MsIHNldCB0aGUgYnVmZmVyIHRvIHRoZSB1bnByb2Nlc3NlZFxuICAgICAgLy8gcG9ydGlvbiBvZiB0aGUgYnVmZmVyIG9ubHlcbiAgICAgIGJ1ZmZlciA9IGJ1ZmZlci5zbGljZShwb3NpdGlvbilcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZUV2ZW50U3RyZWFtTGluZShsaW5lQnVmZmVyOiBzdHJpbmcsIGluZGV4OiBudW1iZXIsIGZpZWxkTGVuZ3RoOiBudW1iZXIsIGxpbmVMZW5ndGg6IG51bWJlcikge1xuICAgIGlmIChsaW5lTGVuZ3RoID09PSAwKSB7XG4gICAgICAvLyBXZSByZWFjaGVkIHRoZSBsYXN0IGxpbmUgb2YgdGhpcyBldmVudFxuICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICBvblBhcnNlKHtcbiAgICAgICAgICB0eXBlOiAnZXZlbnQnLFxuICAgICAgICAgIGlkOiBldmVudElkLFxuICAgICAgICAgIGV2ZW50OiBldmVudE5hbWUgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgIGRhdGE6IGRhdGEuc2xpY2UoMCwgLTEpLCAvLyByZW1vdmUgdHJhaWxpbmcgbmV3bGluZVxuICAgICAgICB9KVxuXG4gICAgICAgIGRhdGEgPSAnJ1xuICAgICAgICBldmVudElkID0gdW5kZWZpbmVkXG4gICAgICB9XG4gICAgICBldmVudE5hbWUgPSB1bmRlZmluZWRcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IG5vVmFsdWUgPSBmaWVsZExlbmd0aCA8IDBcbiAgICBjb25zdCBmaWVsZCA9IGxpbmVCdWZmZXIuc2xpY2UoaW5kZXgsIGluZGV4ICsgKG5vVmFsdWUgPyBsaW5lTGVuZ3RoIDogZmllbGRMZW5ndGgpKVxuICAgIGxldCBzdGVwID0gMFxuXG4gICAgaWYgKG5vVmFsdWUpIHtcbiAgICAgIHN0ZXAgPSBsaW5lTGVuZ3RoXG4gICAgfSBlbHNlIGlmIChsaW5lQnVmZmVyW2luZGV4ICsgZmllbGRMZW5ndGggKyAxXSA9PT0gJyAnKSB7XG4gICAgICBzdGVwID0gZmllbGRMZW5ndGggKyAyXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ZXAgPSBmaWVsZExlbmd0aCArIDFcbiAgICB9XG5cbiAgICBjb25zdCBwb3NpdGlvbiA9IGluZGV4ICsgc3RlcFxuICAgIGNvbnN0IHZhbHVlTGVuZ3RoID0gbGluZUxlbmd0aCAtIHN0ZXBcbiAgICBjb25zdCB2YWx1ZSA9IGxpbmVCdWZmZXIuc2xpY2UocG9zaXRpb24sIHBvc2l0aW9uICsgdmFsdWVMZW5ndGgpLnRvU3RyaW5nKClcblxuICAgIGlmIChmaWVsZCA9PT0gJ2RhdGEnKSB7XG4gICAgICBkYXRhICs9IHZhbHVlID8gYCR7dmFsdWV9XFxuYCA6ICdcXG4nXG4gICAgfSBlbHNlIGlmIChmaWVsZCA9PT0gJ2V2ZW50Jykge1xuICAgICAgZXZlbnROYW1lID0gdmFsdWVcbiAgICB9IGVsc2UgaWYgKGZpZWxkID09PSAnaWQnICYmICF2YWx1ZS5pbmNsdWRlcygnXFx1MDAwMCcpKSB7XG4gICAgICBldmVudElkID0gdmFsdWVcbiAgICB9IGVsc2UgaWYgKGZpZWxkID09PSAncmV0cnknKSB7XG4gICAgICBjb25zdCByZXRyeSA9IHBhcnNlSW50KHZhbHVlLCAxMClcbiAgICAgIGlmICghTnVtYmVyLmlzTmFOKHJldHJ5KSkge1xuICAgICAgICBvblBhcnNlKHsgdHlwZTogJ3JlY29ubmVjdC1pbnRlcnZhbCcsIHZhbHVlOiByZXRyeSB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBCT00gPSBbMjM5LCAxODcsIDE5MV1cblxuZnVuY3Rpb24gaGFzQm9tKGJ1ZmZlcjogc3RyaW5nKSB7XG4gIHJldHVybiBCT00uZXZlcnkoKGNoYXJDb2RlOiBudW1iZXIsIGluZGV4OiBudW1iZXIpID0+IGJ1ZmZlci5jaGFyQ29kZUF0KGluZGV4KSA9PT0gY2hhckNvZGUpXG59XG4iXX0=
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1739103120828, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.toolMap = exports.ReactModel = exports.HunYuanOpenSimpleModel = exports.HunYuanExpSimpleModel = exports.MoonshotSimpleModel = exports.YiSimpleModel = exports.DSSimpleModel = exports.ArkSimpleModel = exports.HunYuanSimpleModel = exports.HunYuanBetaSimpleModel = exports.ZhiPuSimpleModel = exports.MODELS = void 0;
var index_1 = require("./ZhiPu/index");
Object.defineProperty(exports, "ZhiPuSimpleModel", { enumerable: true, get: function () { return index_1.ZhiPuSimpleModel; } });
var index_2 = require("./HunYuanBeta/index");
Object.defineProperty(exports, "HunYuanBetaSimpleModel", { enumerable: true, get: function () { return index_2.HunYuanBetaSimpleModel; } });
var index_3 = require("./HunYuan/index");
Object.defineProperty(exports, "HunYuanSimpleModel", { enumerable: true, get: function () { return index_3.HunYuanSimpleModel; } });
var index_4 = require("./Ark/index");
Object.defineProperty(exports, "ArkSimpleModel", { enumerable: true, get: function () { return index_4.ArkSimpleModel; } });
var index_5 = require("./DashScope/index");
Object.defineProperty(exports, "DSSimpleModel", { enumerable: true, get: function () { return index_5.DSSimpleModel; } });
var index_6 = require("./Yi/index");
Object.defineProperty(exports, "YiSimpleModel", { enumerable: true, get: function () { return index_6.YiSimpleModel; } });
var index_7 = require("./Moonshot/index");
Object.defineProperty(exports, "MoonshotSimpleModel", { enumerable: true, get: function () { return index_7.MoonshotSimpleModel; } });
var index_8 = require("./HunYuanExp/index");
Object.defineProperty(exports, "HunYuanExpSimpleModel", { enumerable: true, get: function () { return index_8.HunYuanExpSimpleModel; } });
var index_9 = require("./HunYuanOpen/index");
Object.defineProperty(exports, "HunYuanOpenSimpleModel", { enumerable: true, get: function () { return index_9.HunYuanOpenSimpleModel; } });
var DeepSeek_1 = require("./DeepSeek");
exports.MODELS = {
    hunyuan: index_3.HunYuanSimpleModel,
    'hunyuan-beta': index_2.HunYuanBetaSimpleModel,
    ark: index_4.ArkSimpleModel,
    dashscope: index_5.DSSimpleModel,
    '01-ai': index_6.YiSimpleModel,
    moonshot: index_7.MoonshotSimpleModel,
    zhipu: index_1.ZhiPuSimpleModel,
    'hunyuan-exp': index_8.HunYuanExpSimpleModel,
    'hunyuan-open': index_9.HunYuanOpenSimpleModel,
    deepseek: DeepSeek_1.DeepSeekSimpleModel,
};
var model_1 = require("./model");
Object.defineProperty(exports, "ReactModel", { enumerable: true, get: function () { return model_1.ReactModel; } });
Object.defineProperty(exports, "toolMap", { enumerable: true, get: function () { return model_1.toolMap; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kZWxzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHVDQUFnRDtBQXlCOUMsaUdBekJPLHdCQUFnQixPQXlCUDtBQXhCbEIsNkNBQTREO0FBeUIxRCx1R0F6Qk8sOEJBQXNCLE9BeUJQO0FBeEJ4Qix5Q0FBb0Q7QUF5QmxELG1HQXpCTywwQkFBa0IsT0F5QlA7QUF4QnBCLHFDQUE0QztBQXlCMUMsK0ZBekJPLHNCQUFjLE9BeUJQO0FBeEJoQiwyQ0FBaUQ7QUF5Qi9DLDhGQXpCTyxxQkFBYSxPQXlCUDtBQXhCZixvQ0FBMEM7QUF5QnhDLDhGQXpCTyxxQkFBYSxPQXlCUDtBQXhCZiwwQ0FBc0Q7QUF5QnBELG9HQXpCTywyQkFBbUIsT0F5QlA7QUF4QnJCLDRDQUEwRDtBQXlCeEQsc0dBekJPLDZCQUFxQixPQXlCUDtBQXhCdkIsNkNBQTREO0FBeUIxRCx1R0F6Qk8sOEJBQXNCLE9BeUJQO0FBeEJ4Qix1Q0FBZ0Q7QUFFbkMsUUFBQSxNQUFNLEdBQUc7SUFDcEIsT0FBTyxFQUFFLDBCQUFrQjtJQUMzQixjQUFjLEVBQUUsOEJBQXNCO0lBQ3RDLEdBQUcsRUFBRSxzQkFBYztJQUNuQixTQUFTLEVBQUUscUJBQWE7SUFDeEIsT0FBTyxFQUFFLHFCQUFhO0lBQ3RCLFFBQVEsRUFBRSwyQkFBbUI7SUFDN0IsS0FBSyxFQUFFLHdCQUFnQjtJQUN2QixhQUFhLEVBQUUsNkJBQXFCO0lBQ3BDLGNBQWMsRUFBRSw4QkFBc0I7SUFDdEMsUUFBUSxFQUFFLDhCQUFtQjtDQUM5QixDQUFBO0FBY0QsaUNBQTZDO0FBQXBDLG1HQUFBLFVBQVUsT0FBQTtBQUFFLGdHQUFBLE9BQU8sT0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFpoaVB1U2ltcGxlTW9kZWwgfSBmcm9tICcuL1poaVB1L2luZGV4J1xuaW1wb3J0IHsgSHVuWXVhbkJldGFTaW1wbGVNb2RlbCB9IGZyb20gJy4vSHVuWXVhbkJldGEvaW5kZXgnXG5pbXBvcnQgeyBIdW5ZdWFuU2ltcGxlTW9kZWwgfSBmcm9tICcuL0h1bll1YW4vaW5kZXgnXG5pbXBvcnQgeyBBcmtTaW1wbGVNb2RlbCB9IGZyb20gJy4vQXJrL2luZGV4J1xuaW1wb3J0IHsgRFNTaW1wbGVNb2RlbCB9IGZyb20gJy4vRGFzaFNjb3BlL2luZGV4J1xuaW1wb3J0IHsgWWlTaW1wbGVNb2RlbCB9IGZyb20gJy4vWWkvaW5kZXgnXG5pbXBvcnQgeyBNb29uc2hvdFNpbXBsZU1vZGVsIH0gZnJvbSAnLi9Nb29uc2hvdC9pbmRleCdcbmltcG9ydCB7IEh1bll1YW5FeHBTaW1wbGVNb2RlbCB9IGZyb20gJy4vSHVuWXVhbkV4cC9pbmRleCdcbmltcG9ydCB7IEh1bll1YW5PcGVuU2ltcGxlTW9kZWwgfSBmcm9tICcuL0h1bll1YW5PcGVuL2luZGV4J1xuaW1wb3J0IHsgRGVlcFNlZWtTaW1wbGVNb2RlbCB9IGZyb20gJy4vRGVlcFNlZWsnXG5cbmV4cG9ydCBjb25zdCBNT0RFTFMgPSB7XG4gIGh1bnl1YW46IEh1bll1YW5TaW1wbGVNb2RlbCxcbiAgJ2h1bnl1YW4tYmV0YSc6IEh1bll1YW5CZXRhU2ltcGxlTW9kZWwsXG4gIGFyazogQXJrU2ltcGxlTW9kZWwsXG4gIGRhc2hzY29wZTogRFNTaW1wbGVNb2RlbCxcbiAgJzAxLWFpJzogWWlTaW1wbGVNb2RlbCxcbiAgbW9vbnNob3Q6IE1vb25zaG90U2ltcGxlTW9kZWwsXG4gIHpoaXB1OiBaaGlQdVNpbXBsZU1vZGVsLFxuICAnaHVueXVhbi1leHAnOiBIdW5ZdWFuRXhwU2ltcGxlTW9kZWwsXG4gICdodW55dWFuLW9wZW4nOiBIdW5ZdWFuT3BlblNpbXBsZU1vZGVsLFxuICBkZWVwc2VlazogRGVlcFNlZWtTaW1wbGVNb2RlbCxcbn1cblxuZXhwb3J0IHtcbiAgWmhpUHVTaW1wbGVNb2RlbCxcbiAgSHVuWXVhbkJldGFTaW1wbGVNb2RlbCxcbiAgSHVuWXVhblNpbXBsZU1vZGVsLFxuICBBcmtTaW1wbGVNb2RlbCxcbiAgRFNTaW1wbGVNb2RlbCxcbiAgWWlTaW1wbGVNb2RlbCxcbiAgTW9vbnNob3RTaW1wbGVNb2RlbCxcbiAgSHVuWXVhbkV4cFNpbXBsZU1vZGVsLFxuICBIdW5ZdWFuT3BlblNpbXBsZU1vZGVsLFxufVxuXG5leHBvcnQgeyBSZWFjdE1vZGVsLCB0b29sTWFwIH0gZnJvbSAnLi9tb2RlbCdcbiJdfQ==
}, function(modId) { var map = {"./ZhiPu/index":1739103120829,"./HunYuanBeta/index":1739103120830,"./HunYuan/index":1739103120832,"./Ark/index":1739103120833,"./DashScope/index":1739103120834,"./Yi/index":1739103120835,"./Moonshot/index":1739103120836,"./HunYuanExp/index":1739103120837,"./HunYuanOpen/index":1739103120838,"./DeepSeek":1739103120839,"./model":1739103120840}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1739103120829, function(require, module, exports) {

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZhiPuSimpleModel = void 0;
var utils_1 = require("../../utils");
function processInput(input) {
    var messages = input.messages, model = input.model, temperature = input.temperature, tool_choice = input.tool_choice, tools = input.tools, top_p = input.top_p;
    var processToolChoice = function () {
        if (tool_choice && tool_choice !== 'auto') {
            console.warn('`tool_choice` is not \'auto\'');
        }
        return tool_choice;
    };
    return __assign(__assign({}, input), { messages: messages, model: model, temperature: temperature, tool_choice: processToolChoice(), tools: tools, top_p: top_p });
}
var ZhiPuSimpleModel = (function () {
    function ZhiPuSimpleModel(req, baseUrl, subUrl) {
        this.req = req;
        this.baseUrl = baseUrl;
        this.subUrl = 'zhipu/api/paas/v4/chat/completions';
        if (subUrl != null) {
            this.subUrl = subUrl;
        }
    }
    Object.defineProperty(ZhiPuSimpleModel.prototype, "url", {
        get: function () {
            return "".concat(this.baseUrl, "/").concat(this.subUrl);
        },
        enumerable: false,
        configurable: true
    });
    ZhiPuSimpleModel.prototype.doGenerate = function (_data) {
        return __awaiter(this, void 0, void 0, function () {
            var data, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = processInput(_data);
                        return [4, this.req({
                                url: this.url,
                                data: __assign(__assign({}, data), { stream: false }),
                                stream: false,
                            })];
                    case 1:
                        res = (_a.sent());
                        return [2, __assign(__assign({}, res), { rawResponse: res })];
                }
            });
        });
    };
    ZhiPuSimpleModel.prototype.doStream = function (_data) {
        return __awaiter(this, void 0, void 0, function () {
            var data, isToolCall, _stream, stream, zhipuStream, streamWithRaw;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = processInput(_data);
                        isToolCall = null;
                        return [4, this.req({
                                url: this.url,
                                data: __assign(__assign({}, data), { stream: true }),
                                stream: true,
                            })];
                    case 1:
                        _stream = _a.sent();
                        stream = (0, utils_1.toPolyfillReadable)(_stream);
                        zhipuStream = (0, utils_1.intoStandardStream)(stream);
                        streamWithRaw = zhipuStream.pipeThrough(new utils_1.TransformStream({
                            transform: function (chunk, controller) {
                                var newChoices = chunk.choices.map(function (choice) {
                                    var message = choice.delta;
                                    if (isToolCall == null)
                                        isToolCall = (0, utils_1.isToolCallAssistantMessage)(message);
                                    if (isToolCall) {
                                        return __assign(__assign({}, choice), { finish_reason: 'tool_calls', delta: message });
                                    }
                                    return choice;
                                });
                                var newChunk = __assign(__assign({}, chunk), { choices: newChoices });
                                controller.enqueue(__assign(__assign({}, newChunk), { rawResponse: chunk }));
                            },
                        }));
                        return [2, (0, utils_1.createAsyncIterable)(streamWithRaw)];
                }
            });
        });
    };
    return ZhiPuSimpleModel;
}());
exports.ZhiPuSimpleModel = ZhiPuSimpleModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kZWxzL1poaVB1L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBTW9CO0FBV3BCLFNBQVMsWUFBWSxDQUFDLEtBQXlCO0lBQ3JDLElBQUEsUUFBUSxHQUFvRCxLQUFLLFNBQXpELEVBQUUsS0FBSyxHQUE2QyxLQUFLLE1BQWxELEVBQUUsV0FBVyxHQUFnQyxLQUFLLFlBQXJDLEVBQUUsV0FBVyxHQUFtQixLQUFLLFlBQXhCLEVBQUUsS0FBSyxHQUFZLEtBQUssTUFBakIsRUFBRSxLQUFLLEdBQUssS0FBSyxNQUFWLENBQVU7SUFFekUsSUFBTSxpQkFBaUIsR0FBRztRQUN4QixJQUFJLFdBQVcsSUFBSSxXQUFXLEtBQUssTUFBTSxFQUFFO1lBQ3pDLE9BQU8sQ0FBQyxJQUFJLENBQUMsK0JBQStCLENBQUMsQ0FBQTtTQUM5QztRQUNELE9BQU8sV0FBa0IsQ0FBQTtJQUMzQixDQUFDLENBQUE7SUFFRCw2QkFDSyxLQUFLLEtBQ1IsUUFBUSxVQUFBLEVBQ1IsS0FBSyxPQUFBLEVBQ0wsV0FBVyxhQUFBLEVBQ1gsV0FBVyxFQUFFLGlCQUFpQixFQUFFLEVBQ2hDLEtBQUssT0FBQSxFQUNMLEtBQUssT0FBQSxJQUNOO0FBQ0gsQ0FBQztBQUVEO0lBRUUsMEJBQW9CLEdBQWEsRUFBUyxPQUFlLEVBQUUsTUFBZTtRQUF0RCxRQUFHLEdBQUgsR0FBRyxDQUFVO1FBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQURsRCxXQUFNLEdBQUcsb0NBQW9DLENBQUE7UUFFbEQsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO1NBQ3JCO0lBQ0gsQ0FBQztJQUVELHNCQUFZLGlDQUFHO2FBQWY7WUFDRSxPQUFPLFVBQUcsSUFBSSxDQUFDLE9BQU8sY0FBSSxJQUFJLENBQUMsTUFBTSxDQUFFLENBQUE7UUFDekMsQ0FBQzs7O09BQUE7SUFFWSxxQ0FBVSxHQUF2QixVQUF3QixLQUF5Qjs7Ozs7O3dCQUN6QyxJQUFJLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFBO3dCQUNuQixXQUFNLElBQUksQ0FBQyxHQUFHLENBQUM7Z0NBQzFCLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztnQ0FDYixJQUFJLHdCQUNDLElBQUksS0FDUCxNQUFNLEVBQUUsS0FBSyxHQUNkO2dDQUNELE1BQU0sRUFBRSxLQUFLOzZCQUNkLENBQUMsRUFBQTs7d0JBUEksR0FBRyxHQUFHLENBQUMsU0FPWCxDQUE0Qjt3QkFDOUIsaUNBQVksR0FBRyxLQUFFLFdBQVcsRUFBRSxHQUFHLEtBQUU7Ozs7S0FDcEM7SUFFWSxtQ0FBUSxHQUFyQixVQUFzQixLQUF5Qjs7Ozs7O3dCQUN2QyxJQUFJLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFBO3dCQUM1QixVQUFVLEdBQW1CLElBQUksQ0FBQTt3QkFDckIsV0FBTSxJQUFJLENBQUMsR0FBRyxDQUFDO2dDQUM3QixHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7Z0NBQ2IsSUFBSSx3QkFDQyxJQUFJLEtBQ1AsTUFBTSxFQUFFLElBQUksR0FDYjtnQ0FDRCxNQUFNLEVBQUUsSUFBSTs2QkFDYixDQUFDLEVBQUE7O3dCQVBJLE9BQU8sR0FBRyxTQU9kO3dCQUNJLE1BQU0sR0FBRyxJQUFBLDBCQUFrQixFQUFDLE9BQU8sQ0FBbUIsQ0FBQTt3QkFFdEQsV0FBVyxHQUFHLElBQUEsMEJBQWtCLEVBQXdCLE1BQU0sQ0FBQyxDQUFBO3dCQUMvRCxhQUFhLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLHVCQUFlLENBQXlFOzRCQUN4SSxTQUFTLFlBQUMsS0FBSyxFQUFFLFVBQVU7Z0NBQ3pCLElBQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUMsTUFBTTtvQ0FDMUMsSUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQTtvQ0FDNUIsSUFBSSxVQUFVLElBQUksSUFBSTt3Q0FBRSxVQUFVLEdBQUcsSUFBQSxrQ0FBMEIsRUFBQyxPQUFPLENBQUMsQ0FBQTtvQ0FDeEUsSUFBSSxVQUFVLEVBQUU7d0NBQ2QsNkJBQ0ssTUFBTSxLQUNULGFBQWEsRUFBRSxZQUFxQixFQUNwQyxLQUFLLEVBQUUsT0FBTyxJQUNmO3FDQUNGO29DQUNELE9BQU8sTUFBTSxDQUFBO2dDQUNmLENBQUMsQ0FBQyxDQUFBO2dDQUNGLElBQU0sUUFBUSx5QkFBUSxLQUFLLEtBQUUsT0FBTyxFQUFFLFVBQVUsR0FBRSxDQUFBO2dDQUNsRCxVQUFVLENBQUMsT0FBTyx1QkFBTSxRQUFRLEtBQUUsV0FBVyxFQUFFLEtBQUssSUFBRyxDQUFBOzRCQUN6RCxDQUFDO3lCQUNGLENBQUMsQ0FBRSxDQUFBO3dCQUVKLFdBQU8sSUFBQSwyQkFBbUIsRUFBQyxhQUFhLENBQUMsRUFBQTs7OztLQUMxQztJQUNILHVCQUFDO0FBQUQsQ0FBQyxBQTVERCxJQTREQztBQTVEWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBjcmVhdGVBc3luY0l0ZXJhYmxlLFxuICBUcmFuc2Zvcm1TdHJlYW0sXG4gIHRvUG9seWZpbGxSZWFkYWJsZSxcbiAgaW50b1N0YW5kYXJkU3RyZWFtLFxuICBpc1Rvb2xDYWxsQXNzaXN0YW50TWVzc2FnZSxcbn0gZnJvbSAnLi4vLi4vdXRpbHMnXG5pbXBvcnQgdHlwZSB7IFpoaVB1R2VuZXJhdGVUZXh0T3V0cHV0LCBaaGlQdUlucHV0RGF0YSwgWmhpUHVTdHJlYW1UZXh0T3V0cHV0IH0gZnJvbSAnLi90eXBlJ1xuaW1wb3J0IHR5cGUge1xuICBNb2RlbFJlcSxcbiAgQmFzZUNoYXRNb2RlbElucHV0LFxuICBTaW1wbGVDaGF0TW9kZWwsXG4gIERvU3RyZWFtT3V0cHV0LFxuICBCYXNlRG9TdHJlYW1PdXRwdXRDaHVuayxcbiAgRG9HZW5lcmF0ZU91dHB1dCxcbn0gZnJvbSAnLi4vLi4vdHlwZSdcblxuZnVuY3Rpb24gcHJvY2Vzc0lucHV0KGlucHV0OiBCYXNlQ2hhdE1vZGVsSW5wdXQpOiBaaGlQdUlucHV0RGF0YSB7XG4gIGNvbnN0IHsgbWVzc2FnZXMsIG1vZGVsLCB0ZW1wZXJhdHVyZSwgdG9vbF9jaG9pY2UsIHRvb2xzLCB0b3BfcCB9ID0gaW5wdXRcblxuICBjb25zdCBwcm9jZXNzVG9vbENob2ljZSA9ICgpID0+IHtcbiAgICBpZiAodG9vbF9jaG9pY2UgJiYgdG9vbF9jaG9pY2UgIT09ICdhdXRvJykge1xuICAgICAgY29uc29sZS53YXJuKCdgdG9vbF9jaG9pY2VgIGlzIG5vdCBcXCdhdXRvXFwnJylcbiAgICB9XG4gICAgcmV0dXJuIHRvb2xfY2hvaWNlIGFzIGFueVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5pbnB1dCxcbiAgICBtZXNzYWdlcyxcbiAgICBtb2RlbCxcbiAgICB0ZW1wZXJhdHVyZSxcbiAgICB0b29sX2Nob2ljZTogcHJvY2Vzc1Rvb2xDaG9pY2UoKSxcbiAgICB0b29scyxcbiAgICB0b3BfcCxcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgWmhpUHVTaW1wbGVNb2RlbCBpbXBsZW1lbnRzIFNpbXBsZUNoYXRNb2RlbCB7XG4gIHB1YmxpYyBzdWJVcmwgPSAnemhpcHUvYXBpL3BhYXMvdjQvY2hhdC9jb21wbGV0aW9ucydcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZXE6IE1vZGVsUmVxLCBwdWJsaWMgYmFzZVVybDogc3RyaW5nLCBzdWJVcmw/OiBzdHJpbmcpIHtcbiAgICBpZiAoc3ViVXJsICE9IG51bGwpIHtcbiAgICAgIHRoaXMuc3ViVXJsID0gc3ViVXJsXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXQgdXJsKCkge1xuICAgIHJldHVybiBgJHt0aGlzLmJhc2VVcmx9LyR7dGhpcy5zdWJVcmx9YFxuICB9XG5cbiAgcHVibGljIGFzeW5jIGRvR2VuZXJhdGUoX2RhdGE6IEJhc2VDaGF0TW9kZWxJbnB1dCk6IFByb21pc2U8RG9HZW5lcmF0ZU91dHB1dD4ge1xuICAgIGNvbnN0IGRhdGEgPSBwcm9jZXNzSW5wdXQoX2RhdGEpXG4gICAgY29uc3QgcmVzID0gKGF3YWl0IHRoaXMucmVxKHtcbiAgICAgIHVybDogdGhpcy51cmwsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIC4uLmRhdGEsXG4gICAgICAgIHN0cmVhbTogZmFsc2UsXG4gICAgICB9LFxuICAgICAgc3RyZWFtOiBmYWxzZSxcbiAgICB9KSkgYXMgWmhpUHVHZW5lcmF0ZVRleHRPdXRwdXRcbiAgICByZXR1cm4geyAuLi5yZXMsIHJhd1Jlc3BvbnNlOiByZXMgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGRvU3RyZWFtKF9kYXRhOiBCYXNlQ2hhdE1vZGVsSW5wdXQpOiBQcm9taXNlPERvU3RyZWFtT3V0cHV0PiB7XG4gICAgY29uc3QgZGF0YSA9IHByb2Nlc3NJbnB1dChfZGF0YSlcbiAgICBsZXQgaXNUb29sQ2FsbDogbnVsbCB8IGJvb2xlYW4gPSBudWxsXG4gICAgY29uc3QgX3N0cmVhbSA9IGF3YWl0IHRoaXMucmVxKHtcbiAgICAgIHVybDogdGhpcy51cmwsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIC4uLmRhdGEsXG4gICAgICAgIHN0cmVhbTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICBzdHJlYW06IHRydWUsXG4gICAgfSlcbiAgICBjb25zdCBzdHJlYW0gPSB0b1BvbHlmaWxsUmVhZGFibGUoX3N0cmVhbSkgYXMgdHlwZW9mIF9zdHJlYW1cblxuICAgIGNvbnN0IHpoaXB1U3RyZWFtID0gaW50b1N0YW5kYXJkU3RyZWFtPFpoaVB1U3RyZWFtVGV4dE91dHB1dD4oc3RyZWFtKVxuICAgIGNvbnN0IHN0cmVhbVdpdGhSYXcgPSB6aGlwdVN0cmVhbS5waXBlVGhyb3VnaChuZXcgVHJhbnNmb3JtU3RyZWFtPFpoaVB1U3RyZWFtVGV4dE91dHB1dCwgQmFzZURvU3RyZWFtT3V0cHV0Q2h1bmsgJiB7IHJhd1Jlc3BvbnNlPzogYW55IH0+KHtcbiAgICAgIHRyYW5zZm9ybShjaHVuaywgY29udHJvbGxlcikge1xuICAgICAgICBjb25zdCBuZXdDaG9pY2VzID0gY2h1bmsuY2hvaWNlcy5tYXAoKGNob2ljZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBjaG9pY2UuZGVsdGFcbiAgICAgICAgICBpZiAoaXNUb29sQ2FsbCA9PSBudWxsKSBpc1Rvb2xDYWxsID0gaXNUb29sQ2FsbEFzc2lzdGFudE1lc3NhZ2UobWVzc2FnZSlcbiAgICAgICAgICBpZiAoaXNUb29sQ2FsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgLi4uY2hvaWNlLFxuICAgICAgICAgICAgICBmaW5pc2hfcmVhc29uOiAndG9vbF9jYWxscycgYXMgY29uc3QsXG4gICAgICAgICAgICAgIGRlbHRhOiBtZXNzYWdlLFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gY2hvaWNlXG4gICAgICAgIH0pXG4gICAgICAgIGNvbnN0IG5ld0NodW5rID0geyAuLi5jaHVuaywgY2hvaWNlczogbmV3Q2hvaWNlcyB9XG4gICAgICAgIGNvbnRyb2xsZXIuZW5xdWV1ZSh7IC4uLm5ld0NodW5rLCByYXdSZXNwb25zZTogY2h1bmsgfSlcbiAgICAgIH0sXG4gICAgfSksKVxuXG4gICAgcmV0dXJuIGNyZWF0ZUFzeW5jSXRlcmFibGUoc3RyZWFtV2l0aFJhdylcbiAgfVxufVxuIl19
}, function(modId) { var map = {"../../utils":1739103120825}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1739103120830, function(require, module, exports) {

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HunYuanBetaSimpleModel = void 0;
var utils_1 = require("../../utils");
var util_1 = require("../HunYuan/util");
var HunYuanBetaSimpleModel = (function () {
    function HunYuanBetaSimpleModel(req, baseUrl, subUrl) {
        this.req = req;
        this.baseUrl = baseUrl;
        this.subUrl = 'hunyuan-beta/openapi/v1/chat/completions';
        if (subUrl != null) {
            this.subUrl = subUrl;
        }
    }
    Object.defineProperty(HunYuanBetaSimpleModel.prototype, "url", {
        get: function () {
            return "".concat(this.baseUrl, "/").concat(this.subUrl);
        },
        enumerable: false,
        configurable: true
    });
    HunYuanBetaSimpleModel.prototype.doGenerate = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.req({
                            url: this.url,
                            data: __assign(__assign({}, (0, util_1.processInput)(data)), { stream: false }),
                            stream: false,
                        })];
                    case 1:
                        res = (_a.sent());
                        return [2, __assign(__assign({}, res), { rawResponse: res })];
                }
            });
        });
    };
    HunYuanBetaSimpleModel.prototype.doStream = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var isToolCall, _stream, stream, hunyuanBetaStream, streamWithRaw;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isToolCall = null;
                        return [4, this.req({
                                url: this.url,
                                data: __assign(__assign({}, (0, util_1.processInput)(data)), { stream: true }),
                                stream: true,
                            })];
                    case 1:
                        _stream = _a.sent();
                        stream = (0, utils_1.toPolyfillReadable)(_stream);
                        hunyuanBetaStream = (0, utils_1.intoStandardStream)(stream);
                        streamWithRaw = hunyuanBetaStream.pipeThrough(new utils_1.TransformStream({
                            transform: function (chunk, controller) {
                                var newChoices = chunk.choices.map(function (choice) {
                                    var message = choice.delta;
                                    if (isToolCall == null)
                                        isToolCall = (0, utils_1.isToolCallAssistantMessage)(message);
                                    if (isToolCall) {
                                        return __assign(__assign({}, choice), { finish_reason: 'tool_calls', delta: message });
                                    }
                                    return choice;
                                });
                                var newChunk = __assign(__assign({}, chunk), { choices: newChoices });
                                controller.enqueue(__assign(__assign({}, newChunk), { rawResponse: chunk }));
                            },
                        }));
                        return [2, (0, utils_1.createAsyncIterable)(streamWithRaw)];
                }
            });
        });
    };
    return HunYuanBetaSimpleModel;
}());
exports.HunYuanBetaSimpleModel = HunYuanBetaSimpleModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kZWxzL0h1bll1YW5CZXRhL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBTW9CO0FBU3BCLHdDQUE4QztBQUc5QztJQUVFLGdDQUFvQixHQUFhLEVBQVMsT0FBZSxFQUFFLE1BQWU7UUFBdEQsUUFBRyxHQUFILEdBQUcsQ0FBVTtRQUFTLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFEbEQsV0FBTSxHQUFHLDBDQUEwQyxDQUFBO1FBRXhELElBQUksTUFBTSxJQUFJLElBQUksRUFBRTtZQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtTQUNyQjtJQUNILENBQUM7SUFFRCxzQkFBWSx1Q0FBRzthQUFmO1lBQ0UsT0FBTyxVQUFHLElBQUksQ0FBQyxPQUFPLGNBQUksSUFBSSxDQUFDLE1BQU0sQ0FBRSxDQUFBO1FBQ3pDLENBQUM7OztPQUFBO0lBRVksMkNBQVUsR0FBdkIsVUFBd0IsSUFBd0I7Ozs7OzRCQUNqQyxXQUFNLElBQUksQ0FBQyxHQUFHLENBQUM7NEJBQzFCLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRzs0QkFDYixJQUFJLHdCQUNDLElBQUEsbUJBQVksRUFBQyxJQUFJLENBQUMsS0FDckIsTUFBTSxFQUFFLEtBQUssR0FDZDs0QkFDRCxNQUFNLEVBQUUsS0FBSzt5QkFDZCxDQUFDLEVBQUE7O3dCQVBJLEdBQUcsR0FBRyxDQUFDLFNBT1gsQ0FBOEI7d0JBQ2hDLGlDQUFZLEdBQUcsS0FBRSxXQUFXLEVBQUUsR0FBRyxLQUFFOzs7O0tBQ3BDO0lBRVkseUNBQVEsR0FBckIsVUFBc0IsSUFBd0I7Ozs7Ozt3QkFDeEMsVUFBVSxHQUFtQixJQUFJLENBQUE7d0JBRXJCLFdBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQztnQ0FDN0IsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO2dDQUNiLElBQUksd0JBQ0MsSUFBQSxtQkFBWSxFQUFDLElBQUksQ0FBQyxLQUNyQixNQUFNLEVBQUUsSUFBSSxHQUNiO2dDQUNELE1BQU0sRUFBRSxJQUFJOzZCQUNiLENBQUMsRUFBQTs7d0JBUEksT0FBTyxHQUFHLFNBT2Q7d0JBQ0ksTUFBTSxHQUFHLElBQUEsMEJBQWtCLEVBQUMsT0FBTyxDQUFtQixDQUFBO3dCQUV0RCxpQkFBaUIsR0FBRyxJQUFBLDBCQUFrQixFQUEwQixNQUFNLENBQUMsQ0FBQTt3QkFDdkUsYUFBYSxHQUFHLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxJQUFJLHVCQUFlLENBQTJFOzRCQUNoSixTQUFTLFlBQUMsS0FBSyxFQUFFLFVBQVU7Z0NBQ3pCLElBQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUMsTUFBTTtvQ0FDMUMsSUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQTtvQ0FDNUIsSUFBSSxVQUFVLElBQUksSUFBSTt3Q0FBRSxVQUFVLEdBQUcsSUFBQSxrQ0FBMEIsRUFBQyxPQUFPLENBQUMsQ0FBQTtvQ0FDeEUsSUFBSSxVQUFVLEVBQUU7d0NBQ2QsNkJBQ0ssTUFBTSxLQUNULGFBQWEsRUFBRSxZQUFZLEVBQzNCLEtBQUssRUFBRSxPQUFPLElBQ2Y7cUNBQ0Y7b0NBQ0QsT0FBTyxNQUFNLENBQUE7Z0NBQ2YsQ0FBQyxDQUFDLENBQUE7Z0NBQ0YsSUFBTSxRQUFRLHlCQUFRLEtBQUssS0FBRSxPQUFPLEVBQUUsVUFBVSxHQUFFLENBQUE7Z0NBQ2xELFVBQVUsQ0FBQyxPQUFPLHVCQUFNLFFBQVEsS0FBRSxXQUFXLEVBQUUsS0FBSyxJQUFHLENBQUE7NEJBQ3pELENBQUM7eUJBQ0YsQ0FBQyxDQUFFLENBQUE7d0JBRUosV0FBTyxJQUFBLDJCQUFtQixFQUFDLGFBQWEsQ0FBQyxFQUFBOzs7O0tBQzFDO0lBQ0gsNkJBQUM7QUFBRCxDQUFDLEFBM0RELElBMkRDO0FBM0RZLHdEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIGNyZWF0ZUFzeW5jSXRlcmFibGUsXG4gIFRyYW5zZm9ybVN0cmVhbSxcbiAgdG9Qb2x5ZmlsbFJlYWRhYmxlLFxuICBpbnRvU3RhbmRhcmRTdHJlYW0sXG4gIGlzVG9vbENhbGxBc3Npc3RhbnRNZXNzYWdlLFxufSBmcm9tICcuLi8uLi91dGlscydcbmltcG9ydCB0eXBlIHtcbiAgTW9kZWxSZXEsXG4gIEJhc2VDaGF0TW9kZWxJbnB1dCxcbiAgU2ltcGxlQ2hhdE1vZGVsLFxuICBEb1N0cmVhbU91dHB1dCxcbiAgQmFzZURvU3RyZWFtT3V0cHV0Q2h1bmssXG4gIERvR2VuZXJhdGVPdXRwdXQsXG59IGZyb20gJy4uLy4uL3R5cGUnXG5pbXBvcnQgeyBwcm9jZXNzSW5wdXQgfSBmcm9tICcuLi9IdW5ZdWFuL3V0aWwnXG5pbXBvcnQgeyBIdW5ZdWFuR2VuZXJhdGVUZXh0T3V0cHV0LCBIdW5ZdWFuU3RyZWFtVGV4dE91dHB1dCB9IGZyb20gJy4uL0h1bll1YW4vdHlwZSdcblxuZXhwb3J0IGNsYXNzIEh1bll1YW5CZXRhU2ltcGxlTW9kZWwgaW1wbGVtZW50cyBTaW1wbGVDaGF0TW9kZWwge1xuICBwdWJsaWMgc3ViVXJsID0gJ2h1bnl1YW4tYmV0YS9vcGVuYXBpL3YxL2NoYXQvY29tcGxldGlvbnMnXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVxOiBNb2RlbFJlcSwgcHVibGljIGJhc2VVcmw6IHN0cmluZywgc3ViVXJsPzogc3RyaW5nKSB7XG4gICAgaWYgKHN1YlVybCAhPSBudWxsKSB7XG4gICAgICB0aGlzLnN1YlVybCA9IHN1YlVybFxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0IHVybCgpIHtcbiAgICByZXR1cm4gYCR7dGhpcy5iYXNlVXJsfS8ke3RoaXMuc3ViVXJsfWBcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBkb0dlbmVyYXRlKGRhdGE6IEJhc2VDaGF0TW9kZWxJbnB1dCk6IFByb21pc2U8RG9HZW5lcmF0ZU91dHB1dD4ge1xuICAgIGNvbnN0IHJlcyA9IChhd2FpdCB0aGlzLnJlcSh7XG4gICAgICB1cmw6IHRoaXMudXJsLFxuICAgICAgZGF0YToge1xuICAgICAgICAuLi5wcm9jZXNzSW5wdXQoZGF0YSksXG4gICAgICAgIHN0cmVhbTogZmFsc2UsXG4gICAgICB9LFxuICAgICAgc3RyZWFtOiBmYWxzZSxcbiAgICB9KSkgYXMgSHVuWXVhbkdlbmVyYXRlVGV4dE91dHB1dFxuICAgIHJldHVybiB7IC4uLnJlcywgcmF3UmVzcG9uc2U6IHJlcyB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZG9TdHJlYW0oZGF0YTogQmFzZUNoYXRNb2RlbElucHV0KTogUHJvbWlzZTxEb1N0cmVhbU91dHB1dD4ge1xuICAgIGxldCBpc1Rvb2xDYWxsOiBudWxsIHwgYm9vbGVhbiA9IG51bGxcblxuICAgIGNvbnN0IF9zdHJlYW0gPSBhd2FpdCB0aGlzLnJlcSh7XG4gICAgICB1cmw6IHRoaXMudXJsLFxuICAgICAgZGF0YToge1xuICAgICAgICAuLi5wcm9jZXNzSW5wdXQoZGF0YSksXG4gICAgICAgIHN0cmVhbTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICBzdHJlYW06IHRydWUsXG4gICAgfSlcbiAgICBjb25zdCBzdHJlYW0gPSB0b1BvbHlmaWxsUmVhZGFibGUoX3N0cmVhbSkgYXMgdHlwZW9mIF9zdHJlYW1cblxuICAgIGNvbnN0IGh1bnl1YW5CZXRhU3RyZWFtID0gaW50b1N0YW5kYXJkU3RyZWFtPEh1bll1YW5TdHJlYW1UZXh0T3V0cHV0PihzdHJlYW0pXG4gICAgY29uc3Qgc3RyZWFtV2l0aFJhdyA9IGh1bnl1YW5CZXRhU3RyZWFtLnBpcGVUaHJvdWdoKG5ldyBUcmFuc2Zvcm1TdHJlYW08SHVuWXVhblN0cmVhbVRleHRPdXRwdXQsIEJhc2VEb1N0cmVhbU91dHB1dENodW5rICYgeyByYXdSZXNwb25zZT86IGFueSB9Pih7XG4gICAgICB0cmFuc2Zvcm0oY2h1bmssIGNvbnRyb2xsZXIpIHtcbiAgICAgICAgY29uc3QgbmV3Q2hvaWNlcyA9IGNodW5rLmNob2ljZXMubWFwKChjaG9pY2UpID0+IHtcbiAgICAgICAgICBjb25zdCBtZXNzYWdlID0gY2hvaWNlLmRlbHRhXG4gICAgICAgICAgaWYgKGlzVG9vbENhbGwgPT0gbnVsbCkgaXNUb29sQ2FsbCA9IGlzVG9vbENhbGxBc3Npc3RhbnRNZXNzYWdlKG1lc3NhZ2UpXG4gICAgICAgICAgaWYgKGlzVG9vbENhbGwpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIC4uLmNob2ljZSxcbiAgICAgICAgICAgICAgZmluaXNoX3JlYXNvbjogJ3Rvb2xfY2FsbHMnLFxuICAgICAgICAgICAgICBkZWx0YTogbWVzc2FnZSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGNob2ljZVxuICAgICAgICB9KVxuICAgICAgICBjb25zdCBuZXdDaHVuayA9IHsgLi4uY2h1bmssIGNob2ljZXM6IG5ld0Nob2ljZXMgfVxuICAgICAgICBjb250cm9sbGVyLmVucXVldWUoeyAuLi5uZXdDaHVuaywgcmF3UmVzcG9uc2U6IGNodW5rIH0pXG4gICAgICB9LFxuICAgIH0pLClcblxuICAgIHJldHVybiBjcmVhdGVBc3luY0l0ZXJhYmxlKHN0cmVhbVdpdGhSYXcpXG4gIH1cbn1cbiJdfQ==
}, function(modId) { var map = {"../../utils":1739103120825,"../HunYuan/util":1739103120831}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1739103120831, function(require, module, exports) {

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.titleCaseToSnakeCase = exports.processInput = void 0;
function processInput(input) {
    var messages = input.messages, model = input.model, temperature = input.temperature, tool_choice = input.tool_choice, tools = input.tools, top_p = input.top_p;
    var handleTools = function () {
        if (!tools)
            return undefined;
        tools.forEach(function (tool) {
            if (tool.type !== 'function')
                console.warn('`type` in tool is not \'function\'', tool);
        });
        return tools;
    };
    var handleMessages = function () {
        messages.forEach(function (message) {
            if ('tool_calls' in message) {
                message.tool_calls
                    .filter(function (tool_call) { return tool_call.type !== 'function'; })
                    .forEach(function (tool_call) { return console.warn('`type` in tool_call is not \'function\'', tool_call, message); });
            }
        });
        return messages;
    };
    return __assign(__assign({}, input), { messages: handleMessages(), model: model, tools: handleTools(), top_p: top_p, tool_choice: tool_choice, temperature: temperature });
}
exports.processInput = processInput;
function titleCaseToSnakeCase(obj) {
    if (typeof obj !== 'object' || obj == null)
        return obj;
    if (Array.isArray(obj))
        return obj.map(function (item) { return titleCaseToSnakeCase(item); });
    return Object.entries(obj).reduce(function (acc, _a) {
        var key = _a[0], value = _a[1];
        var snakeCaseKey = toSnakeCase(key);
        acc[snakeCaseKey] = typeof value === 'object' ? titleCaseToSnakeCase(value) : value;
        return acc;
    }, {});
    function toSnakeCase(s) {
        var ret = s.replace(/[A-Z]/g, function (match) { return "_".concat(match.toLowerCase()); });
        return ret.charAt(0) === '_' ? ret.slice(1) : ret;
    }
}
exports.titleCaseToSnakeCase = titleCaseToSnakeCase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbHMvSHVuWXVhbi91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBUUEsU0FBZ0IsWUFBWSxDQUFDLEtBQXlCO0lBQzVDLElBQUEsUUFBUSxHQUFvRCxLQUFLLFNBQXpELEVBQUUsS0FBSyxHQUE2QyxLQUFLLE1BQWxELEVBQUUsV0FBVyxHQUFnQyxLQUFLLFlBQXJDLEVBQUUsV0FBVyxHQUFtQixLQUFLLFlBQXhCLEVBQUUsS0FBSyxHQUFZLEtBQUssTUFBakIsRUFBRSxLQUFLLEdBQUssS0FBSyxNQUFWLENBQVU7SUFFekUsSUFBTSxXQUFXLEdBQUc7UUFDbEIsSUFBSSxDQUFDLEtBQUs7WUFBRSxPQUFPLFNBQVMsQ0FBQTtRQUM1QixLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSTtZQUNqQixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssVUFBVTtnQkFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLG9DQUFvQyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ3hGLENBQUMsQ0FBQyxDQUFBO1FBQ0YsT0FBTyxLQUFrQyxDQUFBO0lBQzNDLENBQUMsQ0FBQTtJQUVELElBQU0sY0FBYyxHQUFHO1FBQ3JCLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxPQUFPO1lBQ3ZCLElBQUksWUFBWSxJQUFJLE9BQU8sRUFBRTtnQkFDM0IsT0FBTyxDQUFDLFVBQVU7cUJBQ2YsTUFBTSxDQUFDLFVBQUEsU0FBUyxJQUFJLE9BQUEsU0FBUyxDQUFDLElBQUksS0FBSyxVQUFVLEVBQTdCLENBQTZCLENBQUM7cUJBQ2xELE9BQU8sQ0FBQyxVQUFBLFNBQVMsSUFBSSxPQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMseUNBQXlDLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxFQUEzRSxDQUEyRSxDQUFDLENBQUE7YUFDckc7UUFDSCxDQUFDLENBQUMsQ0FBQTtRQUNGLE9BQU8sUUFBd0MsQ0FBQTtJQUNqRCxDQUFDLENBQUE7SUFFRCw2QkFDSyxLQUFLLEtBQ1IsUUFBUSxFQUFFLGNBQWMsRUFBRSxFQUMxQixLQUFLLE9BQUEsRUFDTCxLQUFLLEVBQUUsV0FBVyxFQUFFLEVBQ3BCLEtBQUssT0FBQSxFQUNMLFdBQVcsYUFBQSxFQUNYLFdBQVcsYUFBQSxJQUNaO0FBQ0gsQ0FBQztBQS9CRCxvQ0ErQkM7QUFFRCxTQUFnQixvQkFBb0IsQ0FBQyxHQUFZO0lBQy9DLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxJQUFJLEdBQUcsSUFBSSxJQUFJO1FBQUUsT0FBTyxHQUFHLENBQUE7SUFFdEQsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUFFLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLG9CQUFvQixDQUFDLElBQUksQ0FBQyxFQUExQixDQUEwQixDQUFDLENBQUE7SUFFMUUsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQUcsRUFBRSxFQUFZO1lBQVgsR0FBRyxRQUFBLEVBQUUsS0FBSyxRQUFBO1FBQ2pELElBQU0sWUFBWSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUVyQyxHQUFHLENBQUMsWUFBWSxDQUFDLEdBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFBO1FBQ25GLE9BQU8sR0FBRyxDQUFBO0lBQ1osQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBRU4sU0FBUyxXQUFXLENBQUMsQ0FBUztRQUM1QixJQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxVQUFBLEtBQUssSUFBSSxPQUFBLFdBQUksS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFFLEVBQXpCLENBQXlCLENBQUMsQ0FBQTtRQUNuRSxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUE7SUFDbkQsQ0FBQztBQUNILENBQUM7QUFoQkQsb0RBZ0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHVuWXVhbklucHV0RGF0YSB9IGZyb20gJy4vdHlwZSdcbmltcG9ydCB7IEJhc2VDaGF0TW9kZWxJbnB1dCB9IGZyb20gJy4uLy4uL3R5cGUnXG5cbi8qKlxuICog6L+Z6YeM55qEIHByb2Nlc3Mg5Y+q5piv5a+55LiN56ym5ZCI55qEIGlucHV0IOWBmiB3YXJuaW5n44CCXG4gKiDlrp7pmYXkuIrov5jmmK/kvJrlpoLlrp7kvKDpgJLjgIJcbiAqIOmYsuatouacquadpeaooeWei+WPguaVsOabtOaWsO+8jFNESyDmsqHot5/kuIrogIzlr7zoh7TnlKjmiLfovpPlhaXml6Dms5XnlJ/mlYjjgIJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3NJbnB1dChpbnB1dDogQmFzZUNoYXRNb2RlbElucHV0KTogSHVuWXVhbklucHV0RGF0YSB7XG4gIGNvbnN0IHsgbWVzc2FnZXMsIG1vZGVsLCB0ZW1wZXJhdHVyZSwgdG9vbF9jaG9pY2UsIHRvb2xzLCB0b3BfcCB9ID0gaW5wdXRcblxuICBjb25zdCBoYW5kbGVUb29scyA9ICgpID0+IHtcbiAgICBpZiAoIXRvb2xzKSByZXR1cm4gdW5kZWZpbmVkXG4gICAgdG9vbHMuZm9yRWFjaCgodG9vbCkgPT4ge1xuICAgICAgaWYgKHRvb2wudHlwZSAhPT0gJ2Z1bmN0aW9uJykgY29uc29sZS53YXJuKCdgdHlwZWAgaW4gdG9vbCBpcyBub3QgXFwnZnVuY3Rpb25cXCcnLCB0b29sKVxuICAgIH0pXG4gICAgcmV0dXJuIHRvb2xzIGFzIEh1bll1YW5JbnB1dERhdGFbJ3Rvb2xzJ11cbiAgfVxuXG4gIGNvbnN0IGhhbmRsZU1lc3NhZ2VzID0gKCkgPT4ge1xuICAgIG1lc3NhZ2VzLmZvckVhY2goKG1lc3NhZ2UpID0+IHtcbiAgICAgIGlmICgndG9vbF9jYWxscycgaW4gbWVzc2FnZSkge1xuICAgICAgICBtZXNzYWdlLnRvb2xfY2FsbHNcbiAgICAgICAgICAuZmlsdGVyKHRvb2xfY2FsbCA9PiB0b29sX2NhbGwudHlwZSAhPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAuZm9yRWFjaCh0b29sX2NhbGwgPT4gY29uc29sZS53YXJuKCdgdHlwZWAgaW4gdG9vbF9jYWxsIGlzIG5vdCBcXCdmdW5jdGlvblxcJycsIHRvb2xfY2FsbCwgbWVzc2FnZSkpXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gbWVzc2FnZXMgYXMgSHVuWXVhbklucHV0RGF0YVsnbWVzc2FnZXMnXVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5pbnB1dCxcbiAgICBtZXNzYWdlczogaGFuZGxlTWVzc2FnZXMoKSxcbiAgICBtb2RlbCxcbiAgICB0b29sczogaGFuZGxlVG9vbHMoKSxcbiAgICB0b3BfcCxcbiAgICB0b29sX2Nob2ljZSxcbiAgICB0ZW1wZXJhdHVyZSxcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdGl0bGVDYXNlVG9TbmFrZUNhc2Uob2JqOiB1bmtub3duKSB7XG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JyB8fCBvYmogPT0gbnVsbCkgcmV0dXJuIG9iaiAvLyDlpoLmnpzkuI3mmK/lr7nosaHmiJbogIXmmK9udWxs77yM5YiZ55u05o6l6L+U5ZueXG5cbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkgcmV0dXJuIG9iai5tYXAoaXRlbSA9PiB0aXRsZUNhc2VUb1NuYWtlQ2FzZShpdGVtKSkgLy8g5aaC5p6c5piv5pWw57uE77yM6YCS5b2S5aSE55CG5q+P5Liq5YWD57SgXG5cbiAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKG9iaikucmVkdWNlKChhY2MsIFtrZXksIHZhbHVlXSkgPT4ge1xuICAgIGNvbnN0IHNuYWtlQ2FzZUtleSA9IHRvU25ha2VDYXNlKGtleSlcblxuICAgIGFjY1tzbmFrZUNhc2VLZXldID0gdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyA/IHRpdGxlQ2FzZVRvU25ha2VDYXNlKHZhbHVlKSA6IHZhbHVlXG4gICAgcmV0dXJuIGFjY1xuICB9LCB7fSlcblxuICBmdW5jdGlvbiB0b1NuYWtlQ2FzZShzOiBzdHJpbmcpIHtcbiAgICBjb25zdCByZXQgPSBzLnJlcGxhY2UoL1tBLVpdL2csIG1hdGNoID0+IGBfJHttYXRjaC50b0xvd2VyQ2FzZSgpfWApXG4gICAgcmV0dXJuIHJldC5jaGFyQXQoMCkgPT09ICdfJyA/IHJldC5zbGljZSgxKSA6IHJldFxuICB9XG59XG4iXX0=
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1739103120832, function(require, module, exports) {

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HunYuanSimpleModel = void 0;
var utils_1 = require("../../utils");
var util_1 = require("./util");
var HunYuanSimpleModel = (function () {
    function HunYuanSimpleModel(req, baseUrl, subUrl) {
        this.req = req;
        this.baseUrl = baseUrl;
        this.subUrl = 'hunyuan';
        if (subUrl != null) {
            this.subUrl = subUrl;
        }
    }
    Object.defineProperty(HunYuanSimpleModel.prototype, "url", {
        get: function () {
            return "".concat(this.baseUrl, "/").concat(this.subUrl);
        },
        enumerable: false,
        configurable: true
    });
    HunYuanSimpleModel.prototype.doGenerate = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var res, output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.req({
                            url: this.url,
                            headers: {
                                'X-Tc-Action': 'ChatCompletions',
                            },
                            data: __assign(__assign({}, (0, util_1.processInput)(data)), { stream: false }),
                            stream: false,
                        })];
                    case 1:
                        res = (_a.sent());
                        output = (0, util_1.titleCaseToSnakeCase)(res.Response);
                        return [2, __assign(__assign({}, output), { rawResponse: res })];
                }
            });
        });
    };
    HunYuanSimpleModel.prototype.doStream = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var isToolCall, _stream, stream, hunyuanStream, streamWithRaw;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isToolCall = null;
                        return [4, this.req({
                                url: this.url,
                                headers: {
                                    'X-Tc-Action': 'ChatCompletions',
                                },
                                data: __assign(__assign({}, data), { stream: true }),
                                stream: true,
                            })];
                    case 1:
                        _stream = _a.sent();
                        stream = (0, utils_1.toPolyfillReadable)(_stream);
                        hunyuanStream = (0, utils_1.intoStandardStream)(stream);
                        streamWithRaw = hunyuanStream.pipeThrough(new utils_1.TransformStream({
                            transform: function (_chunk, controller) {
                                var chunk = (0, util_1.titleCaseToSnakeCase)(_chunk);
                                var newChoices = chunk.choices.map(function (choice) {
                                    var message = choice.delta;
                                    if (isToolCall == null)
                                        isToolCall = (0, utils_1.isToolCallAssistantMessage)(message);
                                    if (isToolCall) {
                                        return __assign(__assign({}, choice), { finish_reason: 'tool_calls', delta: message });
                                    }
                                    return choice;
                                });
                                var newChunk = __assign(__assign({}, chunk), { choices: newChoices });
                                controller.enqueue(__assign(__assign({}, newChunk), { rawResponse: _chunk }));
                            },
                        }));
                        return [2, (0, utils_1.createAsyncIterable)(streamWithRaw)];
                }
            });
        });
    };
    return HunYuanSimpleModel;
}());
exports.HunYuanSimpleModel = HunYuanSimpleModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kZWxzL0h1bll1YW4vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQ0FNb0I7QUFTcEIsK0JBQTJEO0FBRzNEO0lBRUUsNEJBQW9CLEdBQWEsRUFBUyxPQUFlLEVBQUUsTUFBZTtRQUF0RCxRQUFHLEdBQUgsR0FBRyxDQUFVO1FBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQURsRCxXQUFNLEdBQUcsU0FBUyxDQUFBO1FBRXZCLElBQUksTUFBTSxJQUFJLElBQUksRUFBRTtZQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtTQUNyQjtJQUNILENBQUM7SUFFRCxzQkFBWSxtQ0FBRzthQUFmO1lBQ0UsT0FBTyxVQUFHLElBQUksQ0FBQyxPQUFPLGNBQUksSUFBSSxDQUFDLE1BQU0sQ0FBRSxDQUFBO1FBQ3pDLENBQUM7OztPQUFBO0lBRVksdUNBQVUsR0FBdkIsVUFBd0IsSUFBd0I7Ozs7OzRCQUNqQyxXQUFNLElBQUksQ0FBQyxHQUFHLENBQUM7NEJBQzFCLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRzs0QkFDYixPQUFPLEVBQUU7Z0NBQ1AsYUFBYSxFQUFFLGlCQUFpQjs2QkFDakM7NEJBQ0QsSUFBSSx3QkFDQyxJQUFBLG1CQUFZLEVBQUMsSUFBSSxDQUFDLEtBQ3JCLE1BQU0sRUFBRSxLQUFLLEdBQ2Q7NEJBQ0QsTUFBTSxFQUFFLEtBQUs7eUJBQ2QsQ0FBQyxFQUFBOzt3QkFWSSxHQUFHLEdBQUcsQ0FBQyxTQVVYLENBQXNCO3dCQUNsQixNQUFNLEdBQUcsSUFBQSwyQkFBb0IsRUFBQyxHQUFHLENBQUMsUUFBUSxDQUE4QixDQUFBO3dCQUM5RSxpQ0FDSyxNQUFNLEtBQ1QsV0FBVyxFQUFFLEdBQUcsS0FDakI7Ozs7S0FDRjtJQUVZLHFDQUFRLEdBQXJCLFVBQXNCLElBQXdCOzs7Ozs7d0JBQ3hDLFVBQVUsR0FBbUIsSUFBSSxDQUFBO3dCQUVyQixXQUFNLElBQUksQ0FBQyxHQUFHLENBQUM7Z0NBQzdCLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztnQ0FDYixPQUFPLEVBQUU7b0NBQ1AsYUFBYSxFQUFFLGlCQUFpQjtpQ0FDakM7Z0NBQ0QsSUFBSSx3QkFDQyxJQUFJLEtBQ1AsTUFBTSxFQUFFLElBQUksR0FDYjtnQ0FDRCxNQUFNLEVBQUUsSUFBSTs2QkFDYixDQUFDLEVBQUE7O3dCQVZJLE9BQU8sR0FBRyxTQVVkO3dCQUNJLE1BQU0sR0FBRyxJQUFBLDBCQUFrQixFQUFDLE9BQU8sQ0FBbUIsQ0FBQTt3QkFFdEQsYUFBYSxHQUFHLElBQUEsMEJBQWtCLEVBQUMsTUFBTSxDQUFDLENBQUE7d0JBQzFDLGFBQWEsR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksdUJBQWUsQ0FBMkQ7NEJBQzVILFNBQVMsWUFBQyxNQUFNLEVBQUUsVUFBVTtnQ0FDMUIsSUFBTSxLQUFLLEdBQUcsSUFBQSwyQkFBb0IsRUFBQyxNQUFNLENBQTRCLENBQUE7Z0NBQ3JFLElBQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUMsTUFBTTtvQ0FDMUMsSUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQTtvQ0FDNUIsSUFBSSxVQUFVLElBQUksSUFBSTt3Q0FBRSxVQUFVLEdBQUcsSUFBQSxrQ0FBMEIsRUFBQyxPQUFPLENBQUMsQ0FBQTtvQ0FDeEUsSUFBSSxVQUFVLEVBQUU7d0NBQ2QsNkJBQ0ssTUFBTSxLQUNULGFBQWEsRUFBRSxZQUFZLEVBQzNCLEtBQUssRUFBRSxPQUFPLElBQ2Y7cUNBQ0Y7b0NBQ0QsT0FBTyxNQUFNLENBQUE7Z0NBQ2YsQ0FBQyxDQUFDLENBQUE7Z0NBQ0YsSUFBTSxRQUFRLHlCQUFRLEtBQUssS0FBRSxPQUFPLEVBQUUsVUFBVSxHQUFFLENBQUE7Z0NBQ2xELFVBQVUsQ0FBQyxPQUFPLHVCQUFNLFFBQVEsS0FBRSxXQUFXLEVBQUUsTUFBTSxJQUFHLENBQUE7NEJBQzFELENBQUM7eUJBQ0YsQ0FBQyxDQUFFLENBQUE7d0JBRUosV0FBTyxJQUFBLDJCQUFtQixFQUFDLGFBQWEsQ0FBQyxFQUFBOzs7O0tBQzFDO0lBQ0gseUJBQUM7QUFBRCxDQUFDLEFBdEVELElBc0VDO0FBdEVZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIGNyZWF0ZUFzeW5jSXRlcmFibGUsXG4gIFRyYW5zZm9ybVN0cmVhbSxcbiAgdG9Qb2x5ZmlsbFJlYWRhYmxlLFxuICBpbnRvU3RhbmRhcmRTdHJlYW0sXG4gIGlzVG9vbENhbGxBc3Npc3RhbnRNZXNzYWdlLFxufSBmcm9tICcuLi8uLi91dGlscydcbmltcG9ydCB0eXBlIHtcbiAgTW9kZWxSZXEsXG4gIEJhc2VDaGF0TW9kZWxJbnB1dCxcbiAgQmFzZURvU3RyZWFtT3V0cHV0Q2h1bmssXG4gIERvU3RyZWFtT3V0cHV0LFxuICBTaW1wbGVDaGF0TW9kZWwsXG4gIERvR2VuZXJhdGVPdXRwdXQsXG59IGZyb20gJy4uLy4uL3R5cGUnXG5pbXBvcnQgeyBwcm9jZXNzSW5wdXQsIHRpdGxlQ2FzZVRvU25ha2VDYXNlIH0gZnJvbSAnLi91dGlsJ1xuaW1wb3J0IHsgSHVuWXVhbkdlbmVyYXRlVGV4dE91dHB1dCwgSHVuWXVhblN0cmVhbVRleHRPdXRwdXQgfSBmcm9tICcuL3R5cGUnXG5cbmV4cG9ydCBjbGFzcyBIdW5ZdWFuU2ltcGxlTW9kZWwgaW1wbGVtZW50cyBTaW1wbGVDaGF0TW9kZWwge1xuICBwdWJsaWMgc3ViVXJsID0gJ2h1bnl1YW4nXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVxOiBNb2RlbFJlcSwgcHVibGljIGJhc2VVcmw6IHN0cmluZywgc3ViVXJsPzogc3RyaW5nKSB7XG4gICAgaWYgKHN1YlVybCAhPSBudWxsKSB7XG4gICAgICB0aGlzLnN1YlVybCA9IHN1YlVybFxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0IHVybCgpIHtcbiAgICByZXR1cm4gYCR7dGhpcy5iYXNlVXJsfS8ke3RoaXMuc3ViVXJsfWBcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBkb0dlbmVyYXRlKGRhdGE6IEJhc2VDaGF0TW9kZWxJbnB1dCk6IFByb21pc2U8RG9HZW5lcmF0ZU91dHB1dD4ge1xuICAgIGNvbnN0IHJlcyA9IChhd2FpdCB0aGlzLnJlcSh7XG4gICAgICB1cmw6IHRoaXMudXJsLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnWC1UYy1BY3Rpb24nOiAnQ2hhdENvbXBsZXRpb25zJyxcbiAgICAgIH0sXG4gICAgICBkYXRhOiB7XG4gICAgICAgIC4uLnByb2Nlc3NJbnB1dChkYXRhKSxcbiAgICAgICAgc3RyZWFtOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBzdHJlYW06IGZhbHNlLFxuICAgIH0pKSBhcyB7IFJlc3BvbnNlOiBhbnkgfVxuICAgIGNvbnN0IG91dHB1dCA9IHRpdGxlQ2FzZVRvU25ha2VDYXNlKHJlcy5SZXNwb25zZSkgYXMgSHVuWXVhbkdlbmVyYXRlVGV4dE91dHB1dFxuICAgIHJldHVybiB7XG4gICAgICAuLi5vdXRwdXQsXG4gICAgICByYXdSZXNwb25zZTogcmVzLFxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBkb1N0cmVhbShkYXRhOiBCYXNlQ2hhdE1vZGVsSW5wdXQpOiBQcm9taXNlPERvU3RyZWFtT3V0cHV0PiB7XG4gICAgbGV0IGlzVG9vbENhbGw6IG51bGwgfCBib29sZWFuID0gbnVsbFxuXG4gICAgY29uc3QgX3N0cmVhbSA9IGF3YWl0IHRoaXMucmVxKHtcbiAgICAgIHVybDogdGhpcy51cmwsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdYLVRjLUFjdGlvbic6ICdDaGF0Q29tcGxldGlvbnMnLFxuICAgICAgfSxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgLi4uZGF0YSxcbiAgICAgICAgc3RyZWFtOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIHN0cmVhbTogdHJ1ZSxcbiAgICB9KVxuICAgIGNvbnN0IHN0cmVhbSA9IHRvUG9seWZpbGxSZWFkYWJsZShfc3RyZWFtKSBhcyB0eXBlb2YgX3N0cmVhbVxuXG4gICAgY29uc3QgaHVueXVhblN0cmVhbSA9IGludG9TdGFuZGFyZFN0cmVhbShzdHJlYW0pXG4gICAgY29uc3Qgc3RyZWFtV2l0aFJhdyA9IGh1bnl1YW5TdHJlYW0ucGlwZVRocm91Z2gobmV3IFRyYW5zZm9ybVN0cmVhbTx1bmtub3duLCBCYXNlRG9TdHJlYW1PdXRwdXRDaHVuayAmIHsgcmF3UmVzcG9uc2U/OiBhbnkgfT4oe1xuICAgICAgdHJhbnNmb3JtKF9jaHVuaywgY29udHJvbGxlcikge1xuICAgICAgICBjb25zdCBjaHVuayA9IHRpdGxlQ2FzZVRvU25ha2VDYXNlKF9jaHVuaykgYXMgSHVuWXVhblN0cmVhbVRleHRPdXRwdXRcbiAgICAgICAgY29uc3QgbmV3Q2hvaWNlcyA9IGNodW5rLmNob2ljZXMubWFwKChjaG9pY2UpID0+IHtcbiAgICAgICAgICBjb25zdCBtZXNzYWdlID0gY2hvaWNlLmRlbHRhXG4gICAgICAgICAgaWYgKGlzVG9vbENhbGwgPT0gbnVsbCkgaXNUb29sQ2FsbCA9IGlzVG9vbENhbGxBc3Npc3RhbnRNZXNzYWdlKG1lc3NhZ2UpXG4gICAgICAgICAgaWYgKGlzVG9vbENhbGwpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIC4uLmNob2ljZSxcbiAgICAgICAgICAgICAgZmluaXNoX3JlYXNvbjogJ3Rvb2xfY2FsbHMnLFxuICAgICAgICAgICAgICBkZWx0YTogbWVzc2FnZSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGNob2ljZVxuICAgICAgICB9KVxuICAgICAgICBjb25zdCBuZXdDaHVuayA9IHsgLi4uY2h1bmssIGNob2ljZXM6IG5ld0Nob2ljZXMgfVxuICAgICAgICBjb250cm9sbGVyLmVucXVldWUoeyAuLi5uZXdDaHVuaywgcmF3UmVzcG9uc2U6IF9jaHVuayB9KVxuICAgICAgfSxcbiAgICB9KSwpXG5cbiAgICByZXR1cm4gY3JlYXRlQXN5bmNJdGVyYWJsZShzdHJlYW1XaXRoUmF3KVxuICB9XG59XG4iXX0=
}, function(modId) { var map = {"../../utils":1739103120825,"./util":1739103120831}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1739103120833, function(require, module, exports) {

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArkSimpleModel = void 0;
var utils_1 = require("../../utils");
function processInput(input) {
    var messages = input.messages, model = input.model, temperature = input.temperature, tools = input.tools, top_p = input.top_p;
    return __assign(__assign({}, input), { messages: messages, model: model, tools: tools, top_p: top_p, temperature: temperature });
}
var ArkSimpleModel = (function () {
    function ArkSimpleModel(req, baseUrl, subUrl) {
        this.req = req;
        this.baseUrl = baseUrl;
        this.subUrl = 'ark/api/v3/chat/completions';
        if (subUrl != null) {
            this.subUrl = subUrl;
        }
    }
    Object.defineProperty(ArkSimpleModel.prototype, "url", {
        get: function () {
            return "".concat(this.baseUrl, "/").concat(this.subUrl);
        },
        enumerable: false,
        configurable: true
    });
    ArkSimpleModel.prototype.doGenerate = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.req({
                            url: this.url,
                            data: __assign(__assign({}, processInput(data)), { stream: false }),
                            stream: false,
                        })];
                    case 1:
                        res = (_a.sent());
                        return [2, __assign(__assign({}, res), { rawResponse: res })];
                }
            });
        });
    };
    ArkSimpleModel.prototype.doStream = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var isToolCall, _stream, stream, arkStream, streamWithRaw;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isToolCall = null;
                        return [4, this.req({
                                url: this.url,
                                data: __assign(__assign({}, processInput(data)), { stream: true }),
                                stream: true,
                            })];
                    case 1:
                        _stream = _a.sent();
                        stream = (0, utils_1.toPolyfillReadable)(_stream);
                        arkStream = (0, utils_1.intoStandardStream)(stream);
                        streamWithRaw = arkStream.pipeThrough(new utils_1.TransformStream({
                            transform: function (chunk, controller) {
                                var newChoices = chunk.choices.map(function (choice) {
                                    var message = choice.delta;
                                    if (isToolCall == null)
                                        isToolCall = (0, utils_1.isToolCallAssistantMessage)(message);
                                    if (isToolCall) {
                                        return __assign(__assign({}, choice), { finish_reason: 'tool_calls', delta: message });
                                    }
                                    return choice;
                                });
                                var newChunk = __assign(__assign({}, chunk), { choices: newChoices });
                                controller.enqueue(__assign(__assign({}, newChunk), { rawResponse: chunk }));
                            },
                        }));
                        return [2, (0, utils_1.createAsyncIterable)(streamWithRaw)];
                }
            });
        });
    };
    return ArkSimpleModel;
}());
exports.ArkSimpleModel = ArkSimpleModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kZWxzL0Fyay9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFDQU1vQjtBQVdwQixTQUFTLFlBQVksQ0FBQyxLQUF5QjtJQUNyQyxJQUFBLFFBQVEsR0FBdUMsS0FBSyxTQUE1QyxFQUFFLEtBQUssR0FBZ0MsS0FBSyxNQUFyQyxFQUFFLFdBQVcsR0FBbUIsS0FBSyxZQUF4QixFQUFFLEtBQUssR0FBWSxLQUFLLE1BQWpCLEVBQUUsS0FBSyxHQUFLLEtBQUssTUFBVixDQUFVO0lBRTVELDZCQUNLLEtBQUssS0FDUixRQUFRLFVBQUEsRUFDUixLQUFLLE9BQUEsRUFDTCxLQUFLLE9BQUEsRUFDTCxLQUFLLE9BQUEsRUFDTCxXQUFXLGFBQUEsSUFDWjtBQUNILENBQUM7QUFFRDtJQUVFLHdCQUFvQixHQUFhLEVBQVMsT0FBZSxFQUFFLE1BQWU7UUFBdEQsUUFBRyxHQUFILEdBQUcsQ0FBVTtRQUFTLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFEbEQsV0FBTSxHQUFHLDZCQUE2QixDQUFBO1FBRTNDLElBQUksTUFBTSxJQUFJLElBQUksRUFBRTtZQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtTQUNyQjtJQUNILENBQUM7SUFFRCxzQkFBWSwrQkFBRzthQUFmO1lBQ0UsT0FBTyxVQUFHLElBQUksQ0FBQyxPQUFPLGNBQUksSUFBSSxDQUFDLE1BQU0sQ0FBRSxDQUFBO1FBQ3pDLENBQUM7OztPQUFBO0lBRVksbUNBQVUsR0FBdkIsVUFBd0IsSUFBd0I7Ozs7OzRCQUNqQyxXQUFNLElBQUksQ0FBQyxHQUFHLENBQUM7NEJBQzFCLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRzs0QkFDYixJQUFJLHdCQUNDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FDckIsTUFBTSxFQUFFLEtBQUssR0FDZDs0QkFDRCxNQUFNLEVBQUUsS0FBSzt5QkFDZCxDQUFDLEVBQUE7O3dCQVBJLEdBQUcsR0FBRyxDQUFDLFNBT1gsQ0FBMEI7d0JBQzVCLGlDQUFZLEdBQUcsS0FBRSxXQUFXLEVBQUUsR0FBRyxLQUFFOzs7O0tBQ3BDO0lBRVksaUNBQVEsR0FBckIsVUFBc0IsSUFBd0I7Ozs7Ozt3QkFDeEMsVUFBVSxHQUFtQixJQUFJLENBQUE7d0JBQ3JCLFdBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQztnQ0FDN0IsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO2dDQUNiLElBQUksd0JBQ0MsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUNyQixNQUFNLEVBQUUsSUFBSSxHQUNiO2dDQUNELE1BQU0sRUFBRSxJQUFJOzZCQUNiLENBQUMsRUFBQTs7d0JBUEksT0FBTyxHQUFHLFNBT2Q7d0JBQ0ksTUFBTSxHQUFHLElBQUEsMEJBQWtCLEVBQUMsT0FBTyxDQUFtQixDQUFBO3dCQUV0RCxTQUFTLEdBQUcsSUFBQSwwQkFBa0IsRUFBc0IsTUFBTSxDQUFDLENBQUE7d0JBQzNELGFBQWEsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksdUJBQWUsQ0FBdUU7NEJBQ3BJLFNBQVMsWUFBQyxLQUFLLEVBQUUsVUFBVTtnQ0FDekIsSUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQyxNQUFNO29DQUMxQyxJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFBO29DQUM1QixJQUFJLFVBQVUsSUFBSSxJQUFJO3dDQUFFLFVBQVUsR0FBRyxJQUFBLGtDQUEwQixFQUFDLE9BQU8sQ0FBQyxDQUFBO29DQUN4RSxJQUFJLFVBQVUsRUFBRTt3Q0FDZCw2QkFDSyxNQUFNLEtBQ1QsYUFBYSxFQUFFLFlBQXFCLEVBQ3BDLEtBQUssRUFBRSxPQUFPLElBQ2Y7cUNBQ0Y7b0NBQ0QsT0FBTyxNQUFNLENBQUE7Z0NBQ2YsQ0FBQyxDQUFDLENBQUE7Z0NBQ0YsSUFBTSxRQUFRLHlCQUFRLEtBQUssS0FBRSxPQUFPLEVBQUUsVUFBVSxHQUFFLENBQUE7Z0NBQ2xELFVBQVUsQ0FBQyxPQUFPLHVCQUFNLFFBQVEsS0FBRSxXQUFXLEVBQUUsS0FBSyxJQUFHLENBQUE7NEJBQ3pELENBQUM7eUJBQ0YsQ0FBQyxDQUFFLENBQUE7d0JBRUosV0FBTyxJQUFBLDJCQUFtQixFQUFDLGFBQWEsQ0FBQyxFQUFBOzs7O0tBQzFDO0lBQ0gscUJBQUM7QUFBRCxDQUFDLEFBMURELElBMERDO0FBMURZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgY3JlYXRlQXN5bmNJdGVyYWJsZSxcbiAgVHJhbnNmb3JtU3RyZWFtLFxuICB0b1BvbHlmaWxsUmVhZGFibGUsXG4gIGludG9TdGFuZGFyZFN0cmVhbSxcbiAgaXNUb29sQ2FsbEFzc2lzdGFudE1lc3NhZ2UsXG59IGZyb20gJy4uLy4uL3V0aWxzJ1xuaW1wb3J0IHR5cGUgeyBBcmtHZW5lcmF0ZVRleHRPdXRwdXQsIEFya0lucHV0RGF0YSwgQXJrU3RyZWFtVGV4dE91dHB1dCB9IGZyb20gJy4vdHlwZSdcbmltcG9ydCB0eXBlIHtcbiAgTW9kZWxSZXEsXG4gIEJhc2VDaGF0TW9kZWxJbnB1dCxcbiAgU2ltcGxlQ2hhdE1vZGVsLFxuICBEb0dlbmVyYXRlT3V0cHV0LFxuICBEb1N0cmVhbU91dHB1dCxcbiAgQmFzZURvU3RyZWFtT3V0cHV0Q2h1bmssXG59IGZyb20gJy4uLy4uL3R5cGUnXG5cbmZ1bmN0aW9uIHByb2Nlc3NJbnB1dChpbnB1dDogQmFzZUNoYXRNb2RlbElucHV0KTogQXJrSW5wdXREYXRhIHtcbiAgY29uc3QgeyBtZXNzYWdlcywgbW9kZWwsIHRlbXBlcmF0dXJlLCB0b29scywgdG9wX3AgfSA9IGlucHV0XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5pbnB1dCxcbiAgICBtZXNzYWdlcyxcbiAgICBtb2RlbCxcbiAgICB0b29scyxcbiAgICB0b3BfcCxcbiAgICB0ZW1wZXJhdHVyZSxcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQXJrU2ltcGxlTW9kZWwgaW1wbGVtZW50cyBTaW1wbGVDaGF0TW9kZWwge1xuICBwdWJsaWMgc3ViVXJsID0gJ2Fyay9hcGkvdjMvY2hhdC9jb21wbGV0aW9ucydcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZXE6IE1vZGVsUmVxLCBwdWJsaWMgYmFzZVVybDogc3RyaW5nLCBzdWJVcmw/OiBzdHJpbmcpIHtcbiAgICBpZiAoc3ViVXJsICE9IG51bGwpIHtcbiAgICAgIHRoaXMuc3ViVXJsID0gc3ViVXJsXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXQgdXJsKCkge1xuICAgIHJldHVybiBgJHt0aGlzLmJhc2VVcmx9LyR7dGhpcy5zdWJVcmx9YFxuICB9XG5cbiAgcHVibGljIGFzeW5jIGRvR2VuZXJhdGUoZGF0YTogQmFzZUNoYXRNb2RlbElucHV0KTogUHJvbWlzZTxEb0dlbmVyYXRlT3V0cHV0PiB7XG4gICAgY29uc3QgcmVzID0gKGF3YWl0IHRoaXMucmVxKHtcbiAgICAgIHVybDogdGhpcy51cmwsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIC4uLnByb2Nlc3NJbnB1dChkYXRhKSxcbiAgICAgICAgc3RyZWFtOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBzdHJlYW06IGZhbHNlLFxuICAgIH0pKSBhcyBBcmtHZW5lcmF0ZVRleHRPdXRwdXRcbiAgICByZXR1cm4geyAuLi5yZXMsIHJhd1Jlc3BvbnNlOiByZXMgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGRvU3RyZWFtKGRhdGE6IEJhc2VDaGF0TW9kZWxJbnB1dCk6IFByb21pc2U8RG9TdHJlYW1PdXRwdXQ+IHtcbiAgICBsZXQgaXNUb29sQ2FsbDogbnVsbCB8IGJvb2xlYW4gPSBudWxsXG4gICAgY29uc3QgX3N0cmVhbSA9IGF3YWl0IHRoaXMucmVxKHtcbiAgICAgIHVybDogdGhpcy51cmwsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIC4uLnByb2Nlc3NJbnB1dChkYXRhKSxcbiAgICAgICAgc3RyZWFtOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIHN0cmVhbTogdHJ1ZSxcbiAgICB9KVxuICAgIGNvbnN0IHN0cmVhbSA9IHRvUG9seWZpbGxSZWFkYWJsZShfc3RyZWFtKSBhcyB0eXBlb2YgX3N0cmVhbVxuXG4gICAgY29uc3QgYXJrU3RyZWFtID0gaW50b1N0YW5kYXJkU3RyZWFtPEFya1N0cmVhbVRleHRPdXRwdXQ+KHN0cmVhbSlcbiAgICBjb25zdCBzdHJlYW1XaXRoUmF3ID0gYXJrU3RyZWFtLnBpcGVUaHJvdWdoKG5ldyBUcmFuc2Zvcm1TdHJlYW08QXJrU3RyZWFtVGV4dE91dHB1dCwgQmFzZURvU3RyZWFtT3V0cHV0Q2h1bmsgJiB7IHJhd1Jlc3BvbnNlPzogYW55IH0+KHtcbiAgICAgIHRyYW5zZm9ybShjaHVuaywgY29udHJvbGxlcikge1xuICAgICAgICBjb25zdCBuZXdDaG9pY2VzID0gY2h1bmsuY2hvaWNlcy5tYXAoKGNob2ljZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBjaG9pY2UuZGVsdGFcbiAgICAgICAgICBpZiAoaXNUb29sQ2FsbCA9PSBudWxsKSBpc1Rvb2xDYWxsID0gaXNUb29sQ2FsbEFzc2lzdGFudE1lc3NhZ2UobWVzc2FnZSlcbiAgICAgICAgICBpZiAoaXNUb29sQ2FsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgLi4uY2hvaWNlLFxuICAgICAgICAgICAgICBmaW5pc2hfcmVhc29uOiAndG9vbF9jYWxscycgYXMgY29uc3QsXG4gICAgICAgICAgICAgIGRlbHRhOiBtZXNzYWdlLFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gY2hvaWNlXG4gICAgICAgIH0pXG4gICAgICAgIGNvbnN0IG5ld0NodW5rID0geyAuLi5jaHVuaywgY2hvaWNlczogbmV3Q2hvaWNlcyB9XG4gICAgICAgIGNvbnRyb2xsZXIuZW5xdWV1ZSh7IC4uLm5ld0NodW5rLCByYXdSZXNwb25zZTogY2h1bmsgfSlcbiAgICAgIH0sXG4gICAgfSksKVxuXG4gICAgcmV0dXJuIGNyZWF0ZUFzeW5jSXRlcmFibGUoc3RyZWFtV2l0aFJhdylcbiAgfVxufVxuIl19
}, function(modId) { var map = {"../../utils":1739103120825}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1739103120834, function(require, module, exports) {

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DSSimpleModel = void 0;
var utils_1 = require("../../utils");
function processInput(input) {
    var messages = input.messages, model = input.model, temperature = input.temperature, tools = input.tools, top_p = input.top_p;
    return __assign(__assign({}, input), { messages: messages, model: model, tools: tools, top_p: top_p, temperature: temperature });
}
var DSSimpleModel = (function () {
    function DSSimpleModel(req, baseUrl, subUrl) {
        this.req = req;
        this.baseUrl = baseUrl;
        this.subUrl = 'dashscope/compatible-mode/v1/chat/completions';
        if (subUrl != null) {
            this.subUrl = subUrl;
        }
    }
    Object.defineProperty(DSSimpleModel.prototype, "url", {
        get: function () {
            return "".concat(this.baseUrl, "/").concat(this.subUrl);
        },
        enumerable: false,
        configurable: true
    });
    DSSimpleModel.prototype.doGenerate = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.req({
                            url: this.url,
                            data: __assign(__assign({}, processInput(data)), { stream: false }),
                            stream: false,
                        })];
                    case 1:
                        res = (_a.sent());
                        return [2, __assign(__assign({}, res), { rawResponse: res })];
                }
            });
        });
    };
    DSSimpleModel.prototype.doStream = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var isToolCall, _stream, stream, arkStream, streamWithRaw;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isToolCall = null;
                        return [4, this.req({
                                url: this.url,
                                data: __assign(__assign({}, processInput(data)), { stream: true }),
                                stream: true,
                            })];
                    case 1:
                        _stream = _a.sent();
                        stream = (0, utils_1.toPolyfillReadable)(_stream);
                        arkStream = (0, utils_1.intoStandardStream)(stream);
                        streamWithRaw = arkStream.pipeThrough(new utils_1.TransformStream({
                            transform: function (chunk, controller) {
                                var newChoices = chunk.choices.map(function (choice) {
                                    var message = Object.assign(choice.delta, { role: 'assistant' });
                                    if (isToolCall == null)
                                        isToolCall = (0, utils_1.isToolCallAssistantMessage)(message);
                                    if (isToolCall) {
                                        return __assign(__assign({}, choice), { finish_reason: 'tool_calls', delta: message });
                                    }
                                    return __assign(__assign({}, choice), { delta: message });
                                });
                                var newChunk = __assign(__assign({}, chunk), { choices: newChoices });
                                controller.enqueue(__assign(__assign({}, newChunk), { rawResponse: chunk }));
                            },
                        }));
                        return [2, (0, utils_1.createAsyncIterable)(streamWithRaw)];
                }
            });
        });
    };
    return DSSimpleModel;
}());
exports.DSSimpleModel = DSSimpleModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kZWxzL0Rhc2hTY29wZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFDQU1vQjtBQVdwQixTQUFTLFlBQVksQ0FBQyxLQUF5QjtJQUNyQyxJQUFBLFFBQVEsR0FBdUMsS0FBSyxTQUE1QyxFQUFFLEtBQUssR0FBZ0MsS0FBSyxNQUFyQyxFQUFFLFdBQVcsR0FBbUIsS0FBSyxZQUF4QixFQUFFLEtBQUssR0FBWSxLQUFLLE1BQWpCLEVBQUUsS0FBSyxHQUFLLEtBQUssTUFBVixDQUFVO0lBRTVELDZCQUNLLEtBQUssS0FDUixRQUFRLFVBQUEsRUFDUixLQUFLLE9BQUEsRUFDTCxLQUFLLE9BQUEsRUFDTCxLQUFLLE9BQUEsRUFDTCxXQUFXLGFBQUEsSUFDWjtBQUNILENBQUM7QUFFRDtJQUdFLHVCQUFvQixHQUFhLEVBQVMsT0FBZSxFQUFFLE1BQWU7UUFBdEQsUUFBRyxHQUFILEdBQUcsQ0FBVTtRQUFTLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFGbEQsV0FBTSxHQUFHLCtDQUErQyxDQUFBO1FBRzdELElBQUksTUFBTSxJQUFJLElBQUksRUFBRTtZQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtTQUNyQjtJQUNILENBQUM7SUFFRCxzQkFBWSw4QkFBRzthQUFmO1lBQ0UsT0FBTyxVQUFHLElBQUksQ0FBQyxPQUFPLGNBQUksSUFBSSxDQUFDLE1BQU0sQ0FBRSxDQUFBO1FBQ3pDLENBQUM7OztPQUFBO0lBRVksa0NBQVUsR0FBdkIsVUFBd0IsSUFBd0I7Ozs7OzRCQUNqQyxXQUFNLElBQUksQ0FBQyxHQUFHLENBQUM7NEJBQzFCLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRzs0QkFDYixJQUFJLHdCQUNDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FDckIsTUFBTSxFQUFFLEtBQUssR0FDZDs0QkFDRCxNQUFNLEVBQUUsS0FBSzt5QkFDZCxDQUFDLEVBQUE7O3dCQVBJLEdBQUcsR0FBRyxDQUFDLFNBT1gsQ0FBcUI7d0JBQ3ZCLGlDQUFZLEdBQUcsS0FBRSxXQUFXLEVBQUUsR0FBRyxLQUFFOzs7O0tBQ3BDO0lBRVksZ0NBQVEsR0FBckIsVUFBc0IsSUFBd0I7Ozs7Ozt3QkFDeEMsVUFBVSxHQUFtQixJQUFJLENBQUE7d0JBQ3JCLFdBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQztnQ0FDN0IsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO2dDQUNiLElBQUksd0JBQ0MsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUNyQixNQUFNLEVBQUUsSUFBSSxHQUNiO2dDQUNELE1BQU0sRUFBRSxJQUFJOzZCQUNiLENBQUMsRUFBQTs7d0JBUEksT0FBTyxHQUFHLFNBT2Q7d0JBQ0ksTUFBTSxHQUFHLElBQUEsMEJBQWtCLEVBQUMsT0FBTyxDQUFtQixDQUFBO3dCQUV0RCxTQUFTLEdBQUcsSUFBQSwwQkFBa0IsRUFBaUIsTUFBTSxDQUFDLENBQUE7d0JBQ3RELGFBQWEsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksdUJBQWUsQ0FBa0U7NEJBQy9ILFNBQVMsWUFBQyxLQUFLLEVBQUUsVUFBVTtnQ0FDekIsSUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQyxNQUFNO29DQUMxQyxJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLENBRWhFLENBQUE7b0NBQ0QsSUFBSSxVQUFVLElBQUksSUFBSTt3Q0FBRSxVQUFVLEdBQUcsSUFBQSxrQ0FBMEIsRUFBQyxPQUFPLENBQUMsQ0FBQTtvQ0FDeEUsSUFBSSxVQUFVLEVBQUU7d0NBQ2QsNkJBQ0ssTUFBTSxLQUNULGFBQWEsRUFBRSxZQUFxQixFQUNwQyxLQUFLLEVBQUUsT0FBTyxJQUNmO3FDQUNGO29DQUNELDZCQUFZLE1BQU0sS0FBRSxLQUFLLEVBQUUsT0FBTyxJQUFFO2dDQUN0QyxDQUFDLENBQUMsQ0FBQTtnQ0FDRixJQUFNLFFBQVEseUJBQVEsS0FBSyxLQUFFLE9BQU8sRUFBRSxVQUFVLEdBQUUsQ0FBQTtnQ0FDbEQsVUFBVSxDQUFDLE9BQU8sdUJBQU0sUUFBUSxLQUFFLFdBQVcsRUFBRSxLQUFLLElBQUcsQ0FBQTs0QkFDekQsQ0FBQzt5QkFDRixDQUFDLENBQUUsQ0FBQTt3QkFFSixXQUFPLElBQUEsMkJBQW1CLEVBQUMsYUFBYSxDQUFDLEVBQUE7Ozs7S0FDMUM7SUFDSCxvQkFBQztBQUFELENBQUMsQUE3REQsSUE2REM7QUE3RFksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBjcmVhdGVBc3luY0l0ZXJhYmxlLFxuICBUcmFuc2Zvcm1TdHJlYW0sXG4gIGludG9TdGFuZGFyZFN0cmVhbSxcbiAgaXNUb29sQ2FsbEFzc2lzdGFudE1lc3NhZ2UsXG4gIHRvUG9seWZpbGxSZWFkYWJsZSxcbn0gZnJvbSAnLi4vLi4vdXRpbHMnXG5pbXBvcnQgdHlwZSB7IERTSW5wdXQsIERTR2VuZXJhdGVPdXRwdXQsIERTU3RyZWFtT3V0cHV0IH0gZnJvbSAnLi90eXBlJ1xuaW1wb3J0IHR5cGUge1xuICBNb2RlbFJlcSxcbiAgQmFzZUNoYXRNb2RlbElucHV0LFxuICBEb0dlbmVyYXRlT3V0cHV0LFxuICBEb1N0cmVhbU91dHB1dCxcbiAgQmFzZURvU3RyZWFtT3V0cHV0Q2h1bmssXG4gIFNpbXBsZUNoYXRNb2RlbCxcbn0gZnJvbSAnLi4vLi4vdHlwZSdcblxuZnVuY3Rpb24gcHJvY2Vzc0lucHV0KGlucHV0OiBCYXNlQ2hhdE1vZGVsSW5wdXQpOiBEU0lucHV0IHtcbiAgY29uc3QgeyBtZXNzYWdlcywgbW9kZWwsIHRlbXBlcmF0dXJlLCB0b29scywgdG9wX3AgfSA9IGlucHV0XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5pbnB1dCxcbiAgICBtZXNzYWdlcyxcbiAgICBtb2RlbCxcbiAgICB0b29scyxcbiAgICB0b3BfcCxcbiAgICB0ZW1wZXJhdHVyZSxcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRFNTaW1wbGVNb2RlbCBpbXBsZW1lbnRzIFNpbXBsZUNoYXRNb2RlbCB7XG4gIHB1YmxpYyBzdWJVcmwgPSAnZGFzaHNjb3BlL2NvbXBhdGlibGUtbW9kZS92MS9jaGF0L2NvbXBsZXRpb25zJ1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVxOiBNb2RlbFJlcSwgcHVibGljIGJhc2VVcmw6IHN0cmluZywgc3ViVXJsPzogc3RyaW5nKSB7XG4gICAgaWYgKHN1YlVybCAhPSBudWxsKSB7XG4gICAgICB0aGlzLnN1YlVybCA9IHN1YlVybFxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0IHVybCgpIHtcbiAgICByZXR1cm4gYCR7dGhpcy5iYXNlVXJsfS8ke3RoaXMuc3ViVXJsfWBcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBkb0dlbmVyYXRlKGRhdGE6IEJhc2VDaGF0TW9kZWxJbnB1dCk6IFByb21pc2U8RG9HZW5lcmF0ZU91dHB1dD4ge1xuICAgIGNvbnN0IHJlcyA9IChhd2FpdCB0aGlzLnJlcSh7XG4gICAgICB1cmw6IHRoaXMudXJsLFxuICAgICAgZGF0YToge1xuICAgICAgICAuLi5wcm9jZXNzSW5wdXQoZGF0YSksXG4gICAgICAgIHN0cmVhbTogZmFsc2UsXG4gICAgICB9LFxuICAgICAgc3RyZWFtOiBmYWxzZSxcbiAgICB9KSkgYXMgRFNHZW5lcmF0ZU91dHB1dFxuICAgIHJldHVybiB7IC4uLnJlcywgcmF3UmVzcG9uc2U6IHJlcyB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZG9TdHJlYW0oZGF0YTogQmFzZUNoYXRNb2RlbElucHV0KTogUHJvbWlzZTxEb1N0cmVhbU91dHB1dD4ge1xuICAgIGxldCBpc1Rvb2xDYWxsOiBudWxsIHwgYm9vbGVhbiA9IG51bGxcbiAgICBjb25zdCBfc3RyZWFtID0gYXdhaXQgdGhpcy5yZXEoe1xuICAgICAgdXJsOiB0aGlzLnVybCxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgLi4ucHJvY2Vzc0lucHV0KGRhdGEpLFxuICAgICAgICBzdHJlYW06IHRydWUsXG4gICAgICB9LFxuICAgICAgc3RyZWFtOiB0cnVlLFxuICAgIH0pXG4gICAgY29uc3Qgc3RyZWFtID0gdG9Qb2x5ZmlsbFJlYWRhYmxlKF9zdHJlYW0pIGFzIHR5cGVvZiBfc3RyZWFtXG5cbiAgICBjb25zdCBhcmtTdHJlYW0gPSBpbnRvU3RhbmRhcmRTdHJlYW08RFNTdHJlYW1PdXRwdXQ+KHN0cmVhbSlcbiAgICBjb25zdCBzdHJlYW1XaXRoUmF3ID0gYXJrU3RyZWFtLnBpcGVUaHJvdWdoKG5ldyBUcmFuc2Zvcm1TdHJlYW08RFNTdHJlYW1PdXRwdXQsIEJhc2VEb1N0cmVhbU91dHB1dENodW5rICYgeyByYXdSZXNwb25zZT86IGFueSB9Pih7XG4gICAgICB0cmFuc2Zvcm0oY2h1bmssIGNvbnRyb2xsZXIpIHtcbiAgICAgICAgY29uc3QgbmV3Q2hvaWNlcyA9IGNodW5rLmNob2ljZXMubWFwKChjaG9pY2UpID0+IHtcbiAgICAgICAgICBjb25zdCBtZXNzYWdlID0gT2JqZWN0LmFzc2lnbihjaG9pY2UuZGVsdGEsIHsgcm9sZTogJ2Fzc2lzdGFudCcgfSkgYXMgdHlwZW9mIGNob2ljZS5kZWx0YSAmIHtcbiAgICAgICAgICAgIHJvbGU6ICdhc3Npc3RhbnQnXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpc1Rvb2xDYWxsID09IG51bGwpIGlzVG9vbENhbGwgPSBpc1Rvb2xDYWxsQXNzaXN0YW50TWVzc2FnZShtZXNzYWdlKVxuICAgICAgICAgIGlmIChpc1Rvb2xDYWxsKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAuLi5jaG9pY2UsXG4gICAgICAgICAgICAgIGZpbmlzaF9yZWFzb246ICd0b29sX2NhbGxzJyBhcyBjb25zdCxcbiAgICAgICAgICAgICAgZGVsdGE6IG1lc3NhZ2UsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB7IC4uLmNob2ljZSwgZGVsdGE6IG1lc3NhZ2UgfVxuICAgICAgICB9KVxuICAgICAgICBjb25zdCBuZXdDaHVuayA9IHsgLi4uY2h1bmssIGNob2ljZXM6IG5ld0Nob2ljZXMgfVxuICAgICAgICBjb250cm9sbGVyLmVucXVldWUoeyAuLi5uZXdDaHVuaywgcmF3UmVzcG9uc2U6IGNodW5rIH0pXG4gICAgICB9LFxuICAgIH0pLClcblxuICAgIHJldHVybiBjcmVhdGVBc3luY0l0ZXJhYmxlKHN0cmVhbVdpdGhSYXcpXG4gIH1cbn1cbiJdfQ==
}, function(modId) { var map = {"../../utils":1739103120825}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1739103120835, function(require, module, exports) {

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YiSimpleModel = void 0;
var utils_1 = require("../../utils");
function processInput(input) {
    var messages = input.messages, model = input.model, temperature = input.temperature, tools = input.tools, top_p = input.top_p;
    return __assign(__assign({}, input), { messages: messages, model: model, tools: tools, top_p: top_p, temperature: temperature });
}
var YiSimpleModel = (function () {
    function YiSimpleModel(req, baseUrl, subUrl) {
        this.req = req;
        this.baseUrl = baseUrl;
        this.subUrl = '01-ai/v1/chat/completions';
        if (subUrl != null) {
            this.subUrl = subUrl;
        }
    }
    Object.defineProperty(YiSimpleModel.prototype, "url", {
        get: function () {
            return "".concat(this.baseUrl, "/").concat(this.subUrl);
        },
        enumerable: false,
        configurable: true
    });
    YiSimpleModel.prototype.doGenerate = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.req({
                            url: this.url,
                            data: __assign(__assign({}, processInput(data)), { stream: false }),
                            stream: false,
                        })];
                    case 1:
                        res = (_a.sent());
                        return [2, __assign(__assign({}, res), { rawResponse: res })];
                }
            });
        });
    };
    YiSimpleModel.prototype.doStream = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var isToolCall, _stream, stream, arkStream, streamWithRaw;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isToolCall = null;
                        return [4, this.req({
                                url: this.url,
                                data: __assign(__assign({}, processInput(data)), { stream: true }),
                                stream: true,
                            })];
                    case 1:
                        _stream = _a.sent();
                        stream = (0, utils_1.toPolyfillReadable)(_stream);
                        arkStream = (0, utils_1.intoStandardStream)(stream);
                        streamWithRaw = arkStream.pipeThrough(new utils_1.TransformStream({
                            transform: function (chunk, controller) {
                                var _a, _b, _c, _d, _e, _f;
                                if (!(((_c = (_b = (_a = chunk === null || chunk === void 0 ? void 0 : chunk.choices) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.delta) === null || _c === void 0 ? void 0 : _c.content) || ((_f = (_e = (_d = chunk === null || chunk === void 0 ? void 0 : chunk.choices) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.delta) === null || _f === void 0 ? void 0 : _f.tool_calls)))
                                    return;
                                var newChoices = chunk.choices.map(function (choice) {
                                    var message = Object.assign(choice.delta, { role: 'assistant' });
                                    if (isToolCall == null)
                                        isToolCall = (0, utils_1.isToolCallAssistantMessage)(message);
                                    if (isToolCall) {
                                        return __assign(__assign({}, choice), { finish_reason: 'tool_calls', delta: message });
                                    }
                                    return __assign(__assign({}, choice), { delta: message });
                                });
                                var newChunk = __assign(__assign({}, chunk), { choices: newChoices });
                                controller.enqueue(__assign(__assign({}, newChunk), { rawResponse: chunk }));
                            },
                        }));
                        return [2, (0, utils_1.createAsyncIterable)(streamWithRaw)];
                }
            });
        });
    };
    return YiSimpleModel;
}());
exports.YiSimpleModel = YiSimpleModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kZWxzL1lpL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBTW9CO0FBV3BCLFNBQVMsWUFBWSxDQUFDLEtBQXlCO0lBQ3JDLElBQUEsUUFBUSxHQUF1QyxLQUFLLFNBQTVDLEVBQUUsS0FBSyxHQUFnQyxLQUFLLE1BQXJDLEVBQUUsV0FBVyxHQUFtQixLQUFLLFlBQXhCLEVBQUUsS0FBSyxHQUFZLEtBQUssTUFBakIsRUFBRSxLQUFLLEdBQUssS0FBSyxNQUFWLENBQVU7SUFFNUQsNkJBQ0ssS0FBSyxLQUNSLFFBQVEsVUFBQSxFQUNSLEtBQUssT0FBQSxFQUNMLEtBQUssT0FBQSxFQUNMLEtBQUssT0FBQSxFQUNMLFdBQVcsYUFBQSxJQUNaO0FBQ0gsQ0FBQztBQUVEO0lBR0UsdUJBQW9CLEdBQWEsRUFBUyxPQUFlLEVBQUUsTUFBZTtRQUF0RCxRQUFHLEdBQUgsR0FBRyxDQUFVO1FBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUZsRCxXQUFNLEdBQUcsMkJBQTJCLENBQUE7UUFHekMsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO1NBQ3JCO0lBQ0gsQ0FBQztJQUVELHNCQUFZLDhCQUFHO2FBQWY7WUFDRSxPQUFPLFVBQUcsSUFBSSxDQUFDLE9BQU8sY0FBSSxJQUFJLENBQUMsTUFBTSxDQUFFLENBQUE7UUFDekMsQ0FBQzs7O09BQUE7SUFFWSxrQ0FBVSxHQUF2QixVQUF3QixJQUF3Qjs7Ozs7NEJBQ2pDLFdBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQzs0QkFDMUIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHOzRCQUNiLElBQUksd0JBQ0MsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUNyQixNQUFNLEVBQUUsS0FBSyxHQUNkOzRCQUNELE1BQU0sRUFBRSxLQUFLO3lCQUNkLENBQUMsRUFBQTs7d0JBUEksR0FBRyxHQUFHLENBQUMsU0FPWCxDQUFxQjt3QkFDdkIsaUNBQVksR0FBRyxLQUFFLFdBQVcsRUFBRSxHQUFHLEtBQUU7Ozs7S0FDcEM7SUFFWSxnQ0FBUSxHQUFyQixVQUFzQixJQUF3Qjs7Ozs7O3dCQUN4QyxVQUFVLEdBQW1CLElBQUksQ0FBQTt3QkFDckIsV0FBTSxJQUFJLENBQUMsR0FBRyxDQUFDO2dDQUM3QixHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7Z0NBQ2IsSUFBSSx3QkFDQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQ3JCLE1BQU0sRUFBRSxJQUFJLEdBQ2I7Z0NBQ0QsTUFBTSxFQUFFLElBQUk7NkJBQ2IsQ0FBQyxFQUFBOzt3QkFQSSxPQUFPLEdBQUcsU0FPZDt3QkFDSSxNQUFNLEdBQUcsSUFBQSwwQkFBa0IsRUFBQyxPQUFPLENBQW1CLENBQUE7d0JBRXRELFNBQVMsR0FBRyxJQUFBLDBCQUFrQixFQUFpQixNQUFNLENBQUMsQ0FBQTt3QkFDdEQsYUFBYSxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSx1QkFBZSxDQUFrRTs0QkFDL0gsU0FBUyxZQUFDLEtBQUssRUFBRSxVQUFVOztnQ0FFekIsSUFBSSxDQUFDLENBQUMsQ0FBQSxNQUFBLE1BQUEsTUFBQSxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsT0FBTywwQ0FBRyxDQUFDLENBQUMsMENBQUUsS0FBSywwQ0FBRSxPQUFPLE1BQUksTUFBQSxNQUFBLE1BQUEsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLE9BQU8sMENBQUcsQ0FBQyxDQUFDLDBDQUFFLEtBQUssMENBQUUsVUFBVSxDQUFBLENBQUM7b0NBQUUsT0FBTTtnQ0FFNUYsSUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQyxNQUFNO29DQUMxQyxJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLENBRWhFLENBQUE7b0NBQ0QsSUFBSSxVQUFVLElBQUksSUFBSTt3Q0FBRSxVQUFVLEdBQUcsSUFBQSxrQ0FBMEIsRUFBQyxPQUFPLENBQUMsQ0FBQTtvQ0FDeEUsSUFBSSxVQUFVLEVBQUU7d0NBQ2QsNkJBQ0ssTUFBTSxLQUNULGFBQWEsRUFBRSxZQUFxQixFQUNwQyxLQUFLLEVBQUUsT0FBTyxJQUNmO3FDQUNGO29DQUNELDZCQUFZLE1BQU0sS0FBRSxLQUFLLEVBQUUsT0FBTyxJQUFFO2dDQUN0QyxDQUFDLENBQUMsQ0FBQTtnQ0FDRixJQUFNLFFBQVEseUJBQVEsS0FBSyxLQUFFLE9BQU8sRUFBRSxVQUFVLEdBQUUsQ0FBQTtnQ0FDbEQsVUFBVSxDQUFDLE9BQU8sdUJBQU0sUUFBUSxLQUFFLFdBQVcsRUFBRSxLQUFLLElBQUcsQ0FBQTs0QkFDekQsQ0FBQzt5QkFDRixDQUFDLENBQUUsQ0FBQTt3QkFFSixXQUFPLElBQUEsMkJBQW1CLEVBQUMsYUFBYSxDQUFDLEVBQUE7Ozs7S0FDMUM7SUFDSCxvQkFBQztBQUFELENBQUMsQUFoRUQsSUFnRUM7QUFoRVksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBjcmVhdGVBc3luY0l0ZXJhYmxlLFxuICBUcmFuc2Zvcm1TdHJlYW0sXG4gIHRvUG9seWZpbGxSZWFkYWJsZSxcbiAgaW50b1N0YW5kYXJkU3RyZWFtLFxuICBpc1Rvb2xDYWxsQXNzaXN0YW50TWVzc2FnZSxcbn0gZnJvbSAnLi4vLi4vdXRpbHMnXG5pbXBvcnQgdHlwZSB7IFlpSW5wdXQsIFlpR2VuZXJhdGVPdXRwdXQsIFlpU3RyZWFtT3V0cHV0IH0gZnJvbSAnLi90eXBlJ1xuaW1wb3J0IHR5cGUge1xuICBNb2RlbFJlcSxcbiAgQmFzZUNoYXRNb2RlbElucHV0LFxuICBEb0dlbmVyYXRlT3V0cHV0LFxuICBEb1N0cmVhbU91dHB1dCxcbiAgQmFzZURvU3RyZWFtT3V0cHV0Q2h1bmssXG4gIFNpbXBsZUNoYXRNb2RlbCxcbn0gZnJvbSAnLi4vLi4vdHlwZSdcblxuZnVuY3Rpb24gcHJvY2Vzc0lucHV0KGlucHV0OiBCYXNlQ2hhdE1vZGVsSW5wdXQpOiBZaUlucHV0IHtcbiAgY29uc3QgeyBtZXNzYWdlcywgbW9kZWwsIHRlbXBlcmF0dXJlLCB0b29scywgdG9wX3AgfSA9IGlucHV0XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5pbnB1dCxcbiAgICBtZXNzYWdlcyxcbiAgICBtb2RlbCxcbiAgICB0b29scyxcbiAgICB0b3BfcCxcbiAgICB0ZW1wZXJhdHVyZSxcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgWWlTaW1wbGVNb2RlbCBpbXBsZW1lbnRzIFNpbXBsZUNoYXRNb2RlbCB7XG4gIHB1YmxpYyBzdWJVcmwgPSAnMDEtYWkvdjEvY2hhdC9jb21wbGV0aW9ucydcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlcTogTW9kZWxSZXEsIHB1YmxpYyBiYXNlVXJsOiBzdHJpbmcsIHN1YlVybD86IHN0cmluZykge1xuICAgIGlmIChzdWJVcmwgIT0gbnVsbCkge1xuICAgICAgdGhpcy5zdWJVcmwgPSBzdWJVcmxcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldCB1cmwoKSB7XG4gICAgcmV0dXJuIGAke3RoaXMuYmFzZVVybH0vJHt0aGlzLnN1YlVybH1gXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZG9HZW5lcmF0ZShkYXRhOiBCYXNlQ2hhdE1vZGVsSW5wdXQpOiBQcm9taXNlPERvR2VuZXJhdGVPdXRwdXQ+IHtcbiAgICBjb25zdCByZXMgPSAoYXdhaXQgdGhpcy5yZXEoe1xuICAgICAgdXJsOiB0aGlzLnVybCxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgLi4ucHJvY2Vzc0lucHV0KGRhdGEpLFxuICAgICAgICBzdHJlYW06IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHN0cmVhbTogZmFsc2UsXG4gICAgfSkpIGFzIFlpR2VuZXJhdGVPdXRwdXRcbiAgICByZXR1cm4geyAuLi5yZXMsIHJhd1Jlc3BvbnNlOiByZXMgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGRvU3RyZWFtKGRhdGE6IEJhc2VDaGF0TW9kZWxJbnB1dCk6IFByb21pc2U8RG9TdHJlYW1PdXRwdXQ+IHtcbiAgICBsZXQgaXNUb29sQ2FsbDogbnVsbCB8IGJvb2xlYW4gPSBudWxsXG4gICAgY29uc3QgX3N0cmVhbSA9IGF3YWl0IHRoaXMucmVxKHtcbiAgICAgIHVybDogdGhpcy51cmwsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIC4uLnByb2Nlc3NJbnB1dChkYXRhKSxcbiAgICAgICAgc3RyZWFtOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIHN0cmVhbTogdHJ1ZSxcbiAgICB9KVxuICAgIGNvbnN0IHN0cmVhbSA9IHRvUG9seWZpbGxSZWFkYWJsZShfc3RyZWFtKSBhcyB0eXBlb2YgX3N0cmVhbVxuXG4gICAgY29uc3QgYXJrU3RyZWFtID0gaW50b1N0YW5kYXJkU3RyZWFtPFlpU3RyZWFtT3V0cHV0PihzdHJlYW0pXG4gICAgY29uc3Qgc3RyZWFtV2l0aFJhdyA9IGFya1N0cmVhbS5waXBlVGhyb3VnaChuZXcgVHJhbnNmb3JtU3RyZWFtPFlpU3RyZWFtT3V0cHV0LCBCYXNlRG9TdHJlYW1PdXRwdXRDaHVuayAmIHsgcmF3UmVzcG9uc2U/OiBhbnkgfT4oe1xuICAgICAgdHJhbnNmb3JtKGNodW5rLCBjb250cm9sbGVyKSB7XG4gICAgICAgIC8vIOmdnuW4uOWlh+iRqVxuICAgICAgICBpZiAoIShjaHVuaz8uY2hvaWNlcz8uWzBdPy5kZWx0YT8uY29udGVudCB8fCBjaHVuaz8uY2hvaWNlcz8uWzBdPy5kZWx0YT8udG9vbF9jYWxscykpIHJldHVyblxuXG4gICAgICAgIGNvbnN0IG5ld0Nob2ljZXMgPSBjaHVuay5jaG9pY2VzLm1hcCgoY2hvaWNlKSA9PiB7XG4gICAgICAgICAgY29uc3QgbWVzc2FnZSA9IE9iamVjdC5hc3NpZ24oY2hvaWNlLmRlbHRhLCB7IHJvbGU6ICdhc3Npc3RhbnQnIH0pIGFzIHR5cGVvZiBjaG9pY2UuZGVsdGEgJiB7XG4gICAgICAgICAgICByb2xlOiAnYXNzaXN0YW50J1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaXNUb29sQ2FsbCA9PSBudWxsKSBpc1Rvb2xDYWxsID0gaXNUb29sQ2FsbEFzc2lzdGFudE1lc3NhZ2UobWVzc2FnZSlcbiAgICAgICAgICBpZiAoaXNUb29sQ2FsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgLi4uY2hvaWNlLFxuICAgICAgICAgICAgICBmaW5pc2hfcmVhc29uOiAndG9vbF9jYWxscycgYXMgY29uc3QsXG4gICAgICAgICAgICAgIGRlbHRhOiBtZXNzYWdlLFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4geyAuLi5jaG9pY2UsIGRlbHRhOiBtZXNzYWdlIH1cbiAgICAgICAgfSlcbiAgICAgICAgY29uc3QgbmV3Q2h1bmsgPSB7IC4uLmNodW5rLCBjaG9pY2VzOiBuZXdDaG9pY2VzIH1cbiAgICAgICAgY29udHJvbGxlci5lbnF1ZXVlKHsgLi4ubmV3Q2h1bmssIHJhd1Jlc3BvbnNlOiBjaHVuayB9KVxuICAgICAgfSxcbiAgICB9KSwpXG5cbiAgICByZXR1cm4gY3JlYXRlQXN5bmNJdGVyYWJsZShzdHJlYW1XaXRoUmF3KVxuICB9XG59XG4iXX0=
}, function(modId) { var map = {"../../utils":1739103120825}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1739103120836, function(require, module, exports) {

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoonshotSimpleModel = void 0;
var utils_1 = require("../../utils");
function processInput(input) {
    var messages = input.messages, model = input.model, temperature = input.temperature, tools = input.tools, top_p = input.top_p;
    return __assign(__assign({}, input), { messages: messages, model: model, tools: tools, top_p: top_p, temperature: temperature });
}
var MoonshotSimpleModel = (function () {
    function MoonshotSimpleModel(req, baseUrl, subUrl) {
        this.req = req;
        this.baseUrl = baseUrl;
        this.subUrl = 'moonshot/v1/chat/completions';
        if (subUrl != null) {
            this.subUrl = subUrl;
        }
    }
    Object.defineProperty(MoonshotSimpleModel.prototype, "url", {
        get: function () {
            return "".concat(this.baseUrl, "/").concat(this.subUrl);
        },
        enumerable: false,
        configurable: true
    });
    MoonshotSimpleModel.prototype.doGenerate = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.req({
                            url: this.url,
                            data: __assign(__assign({}, processInput(data)), { stream: false }),
                            stream: false,
                        })];
                    case 1:
                        res = (_a.sent());
                        return [2, __assign(__assign({}, res), { rawResponse: res })];
                }
            });
        });
    };
    MoonshotSimpleModel.prototype.doStream = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var isToolCall, _stream, stream, arkStream, streamWithRaw;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isToolCall = null;
                        return [4, this.req({
                                url: this.url,
                                data: __assign(__assign({}, processInput(data)), { stream: true }),
                                stream: true,
                            })];
                    case 1:
                        _stream = _a.sent();
                        stream = (0, utils_1.toPolyfillReadable)(_stream);
                        arkStream = (0, utils_1.intoStandardStream)(stream);
                        streamWithRaw = arkStream.pipeThrough(new utils_1.TransformStream({
                            transform: function (chunk, controller) {
                                var newChoices = chunk.choices.map(function (choice) {
                                    var message = choice.delta;
                                    if (isToolCall == null)
                                        isToolCall = (0, utils_1.isToolCallAssistantMessage)(message);
                                    if (isToolCall) {
                                        return __assign(__assign({}, choice), { finish_reason: 'tool_calls', delta: message });
                                    }
                                    return choice;
                                });
                                var newChunk = __assign(__assign({}, chunk), { choices: newChoices });
                                controller.enqueue(__assign(__assign({}, newChunk), { rawResponse: chunk }));
                            },
                        }));
                        return [2, (0, utils_1.createAsyncIterable)(streamWithRaw)];
                }
            });
        });
    };
    return MoonshotSimpleModel;
}());
exports.MoonshotSimpleModel = MoonshotSimpleModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kZWxzL01vb25zaG90L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBTW9CO0FBV3BCLFNBQVMsWUFBWSxDQUFDLEtBQXlCO0lBQ3JDLElBQUEsUUFBUSxHQUF1QyxLQUFLLFNBQTVDLEVBQUUsS0FBSyxHQUFnQyxLQUFLLE1BQXJDLEVBQUUsV0FBVyxHQUFtQixLQUFLLFlBQXhCLEVBQUUsS0FBSyxHQUFZLEtBQUssTUFBakIsRUFBRSxLQUFLLEdBQUssS0FBSyxNQUFWLENBQVU7SUFFNUQsNkJBQ0ssS0FBSyxLQUNSLFFBQVEsVUFBQSxFQUNSLEtBQUssT0FBQSxFQUNMLEtBQUssT0FBQSxFQUNMLEtBQUssT0FBQSxFQUNMLFdBQVcsYUFBQSxJQUNaO0FBQ0gsQ0FBQztBQUVEO0lBRUUsNkJBQW9CLEdBQWEsRUFBUyxPQUFlLEVBQUUsTUFBZTtRQUF0RCxRQUFHLEdBQUgsR0FBRyxDQUFVO1FBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQURsRCxXQUFNLEdBQUcsOEJBQThCLENBQUE7UUFFNUMsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO1NBQ3JCO0lBQ0gsQ0FBQztJQUVELHNCQUFZLG9DQUFHO2FBQWY7WUFDRSxPQUFPLFVBQUcsSUFBSSxDQUFDLE9BQU8sY0FBSSxJQUFJLENBQUMsTUFBTSxDQUFFLENBQUE7UUFDekMsQ0FBQzs7O09BQUE7SUFFWSx3Q0FBVSxHQUF2QixVQUF3QixJQUF3Qjs7Ozs7NEJBQ2pDLFdBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQzs0QkFDMUIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHOzRCQUNiLElBQUksd0JBQ0MsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUNyQixNQUFNLEVBQUUsS0FBSyxHQUNkOzRCQUNELE1BQU0sRUFBRSxLQUFLO3lCQUNkLENBQUMsRUFBQTs7d0JBUEksR0FBRyxHQUFHLENBQUMsU0FPWCxDQUErQjt3QkFDakMsaUNBQVksR0FBRyxLQUFFLFdBQVcsRUFBRSxHQUFHLEtBQUU7Ozs7S0FDcEM7SUFFWSxzQ0FBUSxHQUFyQixVQUFzQixJQUF3Qjs7Ozs7O3dCQUN4QyxVQUFVLEdBQW1CLElBQUksQ0FBQTt3QkFDckIsV0FBTSxJQUFJLENBQUMsR0FBRyxDQUFDO2dDQUM3QixHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7Z0NBQ2IsSUFBSSx3QkFDQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQ3JCLE1BQU0sRUFBRSxJQUFJLEdBQ2I7Z0NBQ0QsTUFBTSxFQUFFLElBQUk7NkJBQ2IsQ0FBQyxFQUFBOzt3QkFQSSxPQUFPLEdBQUcsU0FPZDt3QkFDSSxNQUFNLEdBQUcsSUFBQSwwQkFBa0IsRUFBQyxPQUFPLENBQW1CLENBQUE7d0JBRXRELFNBQVMsR0FBRyxJQUFBLDBCQUFrQixFQUEyQixNQUFNLENBQUMsQ0FBQTt3QkFDaEUsYUFBYSxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSx1QkFBZSxDQUE0RTs0QkFDekksU0FBUyxZQUFDLEtBQUssRUFBRSxVQUFVO2dDQUN6QixJQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFDLE1BQU07b0NBQzFDLElBQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUE7b0NBQzVCLElBQUksVUFBVSxJQUFJLElBQUk7d0NBQUUsVUFBVSxHQUFHLElBQUEsa0NBQTBCLEVBQUMsT0FBTyxDQUFDLENBQUE7b0NBQ3hFLElBQUksVUFBVSxFQUFFO3dDQUNkLDZCQUNLLE1BQU0sS0FDVCxhQUFhLEVBQUUsWUFBcUIsRUFDcEMsS0FBSyxFQUFFLE9BQU8sSUFDZjtxQ0FDRjtvQ0FDRCxPQUFPLE1BQU0sQ0FBQTtnQ0FDZixDQUFDLENBQUMsQ0FBQTtnQ0FDRixJQUFNLFFBQVEseUJBQVEsS0FBSyxLQUFFLE9BQU8sRUFBRSxVQUFVLEdBQUUsQ0FBQTtnQ0FDbEQsVUFBVSxDQUFDLE9BQU8sdUJBQU0sUUFBUSxLQUFFLFdBQVcsRUFBRSxLQUFLLElBQUcsQ0FBQTs0QkFDekQsQ0FBQzt5QkFDRixDQUFDLENBQUUsQ0FBQTt3QkFFSixXQUFPLElBQUEsMkJBQW1CLEVBQUMsYUFBYSxDQUFDLEVBQUE7Ozs7S0FDMUM7SUFDSCwwQkFBQztBQUFELENBQUMsQUExREQsSUEwREM7QUExRFksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgY3JlYXRlQXN5bmNJdGVyYWJsZSxcbiAgVHJhbnNmb3JtU3RyZWFtLFxuICB0b1BvbHlmaWxsUmVhZGFibGUsXG4gIGludG9TdGFuZGFyZFN0cmVhbSxcbiAgaXNUb29sQ2FsbEFzc2lzdGFudE1lc3NhZ2UsXG59IGZyb20gJy4uLy4uL3V0aWxzJ1xuaW1wb3J0IHR5cGUgeyBNb29uc2hvdEdlbmVyYXRlVGV4dE91dHB1dCwgTW9vbnNob3RTdHJlYW1UZXh0T3V0cHV0LCBNb29uc2hvdElucHV0RGF0YSB9IGZyb20gJy4vdHlwZSdcbmltcG9ydCB0eXBlIHtcbiAgTW9kZWxSZXEsXG4gIEJhc2VEb1N0cmVhbU91dHB1dENodW5rLFxuICBEb0dlbmVyYXRlT3V0cHV0LFxuICBEb1N0cmVhbU91dHB1dCxcbiAgU2ltcGxlQ2hhdE1vZGVsLFxuICBCYXNlQ2hhdE1vZGVsSW5wdXQsXG59IGZyb20gJy4uLy4uL3R5cGUnXG5cbmZ1bmN0aW9uIHByb2Nlc3NJbnB1dChpbnB1dDogQmFzZUNoYXRNb2RlbElucHV0KTogTW9vbnNob3RJbnB1dERhdGEge1xuICBjb25zdCB7IG1lc3NhZ2VzLCBtb2RlbCwgdGVtcGVyYXR1cmUsIHRvb2xzLCB0b3BfcCB9ID0gaW5wdXRcblxuICByZXR1cm4ge1xuICAgIC4uLmlucHV0LFxuICAgIG1lc3NhZ2VzLFxuICAgIG1vZGVsLFxuICAgIHRvb2xzLFxuICAgIHRvcF9wLFxuICAgIHRlbXBlcmF0dXJlLFxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNb29uc2hvdFNpbXBsZU1vZGVsIGltcGxlbWVudHMgU2ltcGxlQ2hhdE1vZGVsIHtcbiAgcHVibGljIHN1YlVybCA9ICdtb29uc2hvdC92MS9jaGF0L2NvbXBsZXRpb25zJ1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlcTogTW9kZWxSZXEsIHB1YmxpYyBiYXNlVXJsOiBzdHJpbmcsIHN1YlVybD86IHN0cmluZykge1xuICAgIGlmIChzdWJVcmwgIT0gbnVsbCkge1xuICAgICAgdGhpcy5zdWJVcmwgPSBzdWJVcmxcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldCB1cmwoKSB7XG4gICAgcmV0dXJuIGAke3RoaXMuYmFzZVVybH0vJHt0aGlzLnN1YlVybH1gXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZG9HZW5lcmF0ZShkYXRhOiBCYXNlQ2hhdE1vZGVsSW5wdXQpOiBQcm9taXNlPERvR2VuZXJhdGVPdXRwdXQ+IHtcbiAgICBjb25zdCByZXMgPSAoYXdhaXQgdGhpcy5yZXEoe1xuICAgICAgdXJsOiB0aGlzLnVybCxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgLi4ucHJvY2Vzc0lucHV0KGRhdGEpLFxuICAgICAgICBzdHJlYW06IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHN0cmVhbTogZmFsc2UsXG4gICAgfSkpIGFzIE1vb25zaG90R2VuZXJhdGVUZXh0T3V0cHV0XG4gICAgcmV0dXJuIHsgLi4ucmVzLCByYXdSZXNwb25zZTogcmVzIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBkb1N0cmVhbShkYXRhOiBCYXNlQ2hhdE1vZGVsSW5wdXQpOiBQcm9taXNlPERvU3RyZWFtT3V0cHV0PiB7XG4gICAgbGV0IGlzVG9vbENhbGw6IG51bGwgfCBib29sZWFuID0gbnVsbFxuICAgIGNvbnN0IF9zdHJlYW0gPSBhd2FpdCB0aGlzLnJlcSh7XG4gICAgICB1cmw6IHRoaXMudXJsLFxuICAgICAgZGF0YToge1xuICAgICAgICAuLi5wcm9jZXNzSW5wdXQoZGF0YSksXG4gICAgICAgIHN0cmVhbTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICBzdHJlYW06IHRydWUsXG4gICAgfSlcbiAgICBjb25zdCBzdHJlYW0gPSB0b1BvbHlmaWxsUmVhZGFibGUoX3N0cmVhbSkgYXMgdHlwZW9mIF9zdHJlYW1cblxuICAgIGNvbnN0IGFya1N0cmVhbSA9IGludG9TdGFuZGFyZFN0cmVhbTxNb29uc2hvdFN0cmVhbVRleHRPdXRwdXQ+KHN0cmVhbSlcbiAgICBjb25zdCBzdHJlYW1XaXRoUmF3ID0gYXJrU3RyZWFtLnBpcGVUaHJvdWdoKG5ldyBUcmFuc2Zvcm1TdHJlYW08TW9vbnNob3RTdHJlYW1UZXh0T3V0cHV0LCBCYXNlRG9TdHJlYW1PdXRwdXRDaHVuayAmIHsgcmF3UmVzcG9uc2U/OiBhbnkgfT4oe1xuICAgICAgdHJhbnNmb3JtKGNodW5rLCBjb250cm9sbGVyKSB7XG4gICAgICAgIGNvbnN0IG5ld0Nob2ljZXMgPSBjaHVuay5jaG9pY2VzLm1hcCgoY2hvaWNlKSA9PiB7XG4gICAgICAgICAgY29uc3QgbWVzc2FnZSA9IGNob2ljZS5kZWx0YVxuICAgICAgICAgIGlmIChpc1Rvb2xDYWxsID09IG51bGwpIGlzVG9vbENhbGwgPSBpc1Rvb2xDYWxsQXNzaXN0YW50TWVzc2FnZShtZXNzYWdlKVxuICAgICAgICAgIGlmIChpc1Rvb2xDYWxsKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAuLi5jaG9pY2UsXG4gICAgICAgICAgICAgIGZpbmlzaF9yZWFzb246ICd0b29sX2NhbGxzJyBhcyBjb25zdCxcbiAgICAgICAgICAgICAgZGVsdGE6IG1lc3NhZ2UsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBjaG9pY2VcbiAgICAgICAgfSlcbiAgICAgICAgY29uc3QgbmV3Q2h1bmsgPSB7IC4uLmNodW5rLCBjaG9pY2VzOiBuZXdDaG9pY2VzIH1cbiAgICAgICAgY29udHJvbGxlci5lbnF1ZXVlKHsgLi4ubmV3Q2h1bmssIHJhd1Jlc3BvbnNlOiBjaHVuayB9KVxuICAgICAgfSxcbiAgICB9KSwpXG5cbiAgICByZXR1cm4gY3JlYXRlQXN5bmNJdGVyYWJsZShzdHJlYW1XaXRoUmF3KVxuICB9XG59XG4iXX0=
}, function(modId) { var map = {"../../utils":1739103120825}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1739103120837, function(require, module, exports) {

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HunYuanExpSimpleModel = void 0;
var utils_1 = require("../../utils");
var util_1 = require("../HunYuan/util");
var HunYuanExpSimpleModel = (function () {
    function HunYuanExpSimpleModel(req, baseUrl, subUrl) {
        this.req = req;
        this.baseUrl = baseUrl;
        this.subUrl = 'hunyuan-exp/v1/chat/completions';
        if (subUrl != null) {
            this.subUrl = subUrl;
        }
    }
    Object.defineProperty(HunYuanExpSimpleModel.prototype, "url", {
        get: function () {
            return "".concat(this.baseUrl, "/").concat(this.subUrl);
        },
        enumerable: false,
        configurable: true
    });
    HunYuanExpSimpleModel.prototype.doGenerate = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.req({
                            url: this.url,
                            data: __assign(__assign({}, (0, util_1.processInput)(data)), { stream: false }),
                            stream: false,
                        })];
                    case 1:
                        res = (_a.sent());
                        return [2, __assign(__assign({}, res), { rawResponse: res })];
                }
            });
        });
    };
    HunYuanExpSimpleModel.prototype.doStream = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var isToolCall, _stream, stream, hunyuanBetaStream, streamWithRaw;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isToolCall = null;
                        return [4, this.req({
                                url: this.url,
                                data: __assign(__assign({}, (0, util_1.processInput)(data)), { stream: true }),
                                stream: true,
                            })];
                    case 1:
                        _stream = _a.sent();
                        stream = (0, utils_1.toPolyfillReadable)(_stream);
                        hunyuanBetaStream = (0, utils_1.intoStandardStream)(stream);
                        streamWithRaw = hunyuanBetaStream.pipeThrough(new utils_1.TransformStream({
                            transform: function (chunk, controller) {
                                var newChoices = chunk.choices.map(function (choice) {
                                    var message = choice.delta;
                                    if (isToolCall == null)
                                        isToolCall = (0, utils_1.isToolCallAssistantMessage)(message);
                                    if (isToolCall) {
                                        return __assign(__assign({}, choice), { finish_reason: 'tool_calls', delta: message });
                                    }
                                    return choice;
                                });
                                var newChunk = __assign(__assign({}, chunk), { choices: newChoices });
                                controller.enqueue(__assign(__assign({}, newChunk), { rawResponse: chunk }));
                            },
                        }));
                        return [2, (0, utils_1.createAsyncIterable)(streamWithRaw)];
                }
            });
        });
    };
    return HunYuanExpSimpleModel;
}());
exports.HunYuanExpSimpleModel = HunYuanExpSimpleModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kZWxzL0h1bll1YW5FeHAvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQ0FNb0I7QUFTcEIsd0NBQThDO0FBRzlDO0lBRUUsK0JBQW9CLEdBQWEsRUFBUyxPQUFlLEVBQUUsTUFBZTtRQUF0RCxRQUFHLEdBQUgsR0FBRyxDQUFVO1FBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQURsRCxXQUFNLEdBQUcsaUNBQWlDLENBQUE7UUFFL0MsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO1NBQ3JCO0lBQ0gsQ0FBQztJQUVELHNCQUFZLHNDQUFHO2FBQWY7WUFDRSxPQUFPLFVBQUcsSUFBSSxDQUFDLE9BQU8sY0FBSSxJQUFJLENBQUMsTUFBTSxDQUFFLENBQUE7UUFDekMsQ0FBQzs7O09BQUE7SUFFWSwwQ0FBVSxHQUF2QixVQUF3QixJQUF3Qjs7Ozs7NEJBQ2pDLFdBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQzs0QkFDMUIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHOzRCQUNiLElBQUksd0JBQ0MsSUFBQSxtQkFBWSxFQUFDLElBQUksQ0FBQyxLQUNyQixNQUFNLEVBQUUsS0FBSyxHQUNkOzRCQUNELE1BQU0sRUFBRSxLQUFLO3lCQUNkLENBQUMsRUFBQTs7d0JBUEksR0FBRyxHQUFHLENBQUMsU0FPWCxDQUE4Qjt3QkFDaEMsaUNBQVksR0FBRyxLQUFFLFdBQVcsRUFBRSxHQUFHLEtBQUU7Ozs7S0FDcEM7SUFFWSx3Q0FBUSxHQUFyQixVQUFzQixJQUF3Qjs7Ozs7O3dCQUN4QyxVQUFVLEdBQW1CLElBQUksQ0FBQTt3QkFFckIsV0FBTSxJQUFJLENBQUMsR0FBRyxDQUFDO2dDQUM3QixHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7Z0NBQ2IsSUFBSSx3QkFDQyxJQUFBLG1CQUFZLEVBQUMsSUFBSSxDQUFDLEtBQ3JCLE1BQU0sRUFBRSxJQUFJLEdBQ2I7Z0NBQ0QsTUFBTSxFQUFFLElBQUk7NkJBQ2IsQ0FBQyxFQUFBOzt3QkFQSSxPQUFPLEdBQUcsU0FPZDt3QkFDSSxNQUFNLEdBQUcsSUFBQSwwQkFBa0IsRUFBQyxPQUFPLENBQW1CLENBQUE7d0JBRXRELGlCQUFpQixHQUFHLElBQUEsMEJBQWtCLEVBQTBCLE1BQU0sQ0FBQyxDQUFBO3dCQUN2RSxhQUFhLEdBQUcsaUJBQWlCLENBQUMsV0FBVyxDQUFDLElBQUksdUJBQWUsQ0FBMkU7NEJBQ2hKLFNBQVMsWUFBQyxLQUFLLEVBQUUsVUFBVTtnQ0FDekIsSUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQyxNQUFNO29DQUMxQyxJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFBO29DQUM1QixJQUFJLFVBQVUsSUFBSSxJQUFJO3dDQUFFLFVBQVUsR0FBRyxJQUFBLGtDQUEwQixFQUFDLE9BQU8sQ0FBQyxDQUFBO29DQUN4RSxJQUFJLFVBQVUsRUFBRTt3Q0FDZCw2QkFDSyxNQUFNLEtBQ1QsYUFBYSxFQUFFLFlBQVksRUFDM0IsS0FBSyxFQUFFLE9BQU8sSUFDZjtxQ0FDRjtvQ0FDRCxPQUFPLE1BQU0sQ0FBQTtnQ0FDZixDQUFDLENBQUMsQ0FBQTtnQ0FDRixJQUFNLFFBQVEseUJBQVEsS0FBSyxLQUFFLE9BQU8sRUFBRSxVQUFVLEdBQUUsQ0FBQTtnQ0FDbEQsVUFBVSxDQUFDLE9BQU8sdUJBQU0sUUFBUSxLQUFFLFdBQVcsRUFBRSxLQUFLLElBQUcsQ0FBQTs0QkFDekQsQ0FBQzt5QkFDRixDQUFDLENBQUUsQ0FBQTt3QkFFSixXQUFPLElBQUEsMkJBQW1CLEVBQUMsYUFBYSxDQUFDLEVBQUE7Ozs7S0FDMUM7SUFDSCw0QkFBQztBQUFELENBQUMsQUEzREQsSUEyREM7QUEzRFksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgY3JlYXRlQXN5bmNJdGVyYWJsZSxcbiAgVHJhbnNmb3JtU3RyZWFtLFxuICB0b1BvbHlmaWxsUmVhZGFibGUsXG4gIGludG9TdGFuZGFyZFN0cmVhbSxcbiAgaXNUb29sQ2FsbEFzc2lzdGFudE1lc3NhZ2UsXG59IGZyb20gJy4uLy4uL3V0aWxzJ1xuaW1wb3J0IHR5cGUge1xuICBNb2RlbFJlcSxcbiAgQmFzZUNoYXRNb2RlbElucHV0LFxuICBTaW1wbGVDaGF0TW9kZWwsXG4gIERvU3RyZWFtT3V0cHV0LFxuICBCYXNlRG9TdHJlYW1PdXRwdXRDaHVuayxcbiAgRG9HZW5lcmF0ZU91dHB1dCxcbn0gZnJvbSAnLi4vLi4vdHlwZSdcbmltcG9ydCB7IHByb2Nlc3NJbnB1dCB9IGZyb20gJy4uL0h1bll1YW4vdXRpbCdcbmltcG9ydCB7IEh1bll1YW5HZW5lcmF0ZVRleHRPdXRwdXQsIEh1bll1YW5TdHJlYW1UZXh0T3V0cHV0IH0gZnJvbSAnLi4vSHVuWXVhbi90eXBlJ1xuXG5leHBvcnQgY2xhc3MgSHVuWXVhbkV4cFNpbXBsZU1vZGVsIGltcGxlbWVudHMgU2ltcGxlQ2hhdE1vZGVsIHtcbiAgcHVibGljIHN1YlVybCA9ICdodW55dWFuLWV4cC92MS9jaGF0L2NvbXBsZXRpb25zJ1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlcTogTW9kZWxSZXEsIHB1YmxpYyBiYXNlVXJsOiBzdHJpbmcsIHN1YlVybD86IHN0cmluZykge1xuICAgIGlmIChzdWJVcmwgIT0gbnVsbCkge1xuICAgICAgdGhpcy5zdWJVcmwgPSBzdWJVcmxcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldCB1cmwoKSB7XG4gICAgcmV0dXJuIGAke3RoaXMuYmFzZVVybH0vJHt0aGlzLnN1YlVybH1gXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZG9HZW5lcmF0ZShkYXRhOiBCYXNlQ2hhdE1vZGVsSW5wdXQpOiBQcm9taXNlPERvR2VuZXJhdGVPdXRwdXQ+IHtcbiAgICBjb25zdCByZXMgPSAoYXdhaXQgdGhpcy5yZXEoe1xuICAgICAgdXJsOiB0aGlzLnVybCxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgLi4ucHJvY2Vzc0lucHV0KGRhdGEpLFxuICAgICAgICBzdHJlYW06IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHN0cmVhbTogZmFsc2UsXG4gICAgfSkpIGFzIEh1bll1YW5HZW5lcmF0ZVRleHRPdXRwdXRcbiAgICByZXR1cm4geyAuLi5yZXMsIHJhd1Jlc3BvbnNlOiByZXMgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGRvU3RyZWFtKGRhdGE6IEJhc2VDaGF0TW9kZWxJbnB1dCk6IFByb21pc2U8RG9TdHJlYW1PdXRwdXQ+IHtcbiAgICBsZXQgaXNUb29sQ2FsbDogbnVsbCB8IGJvb2xlYW4gPSBudWxsXG5cbiAgICBjb25zdCBfc3RyZWFtID0gYXdhaXQgdGhpcy5yZXEoe1xuICAgICAgdXJsOiB0aGlzLnVybCxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgLi4ucHJvY2Vzc0lucHV0KGRhdGEpLFxuICAgICAgICBzdHJlYW06IHRydWUsXG4gICAgICB9LFxuICAgICAgc3RyZWFtOiB0cnVlLFxuICAgIH0pXG4gICAgY29uc3Qgc3RyZWFtID0gdG9Qb2x5ZmlsbFJlYWRhYmxlKF9zdHJlYW0pIGFzIHR5cGVvZiBfc3RyZWFtXG5cbiAgICBjb25zdCBodW55dWFuQmV0YVN0cmVhbSA9IGludG9TdGFuZGFyZFN0cmVhbTxIdW5ZdWFuU3RyZWFtVGV4dE91dHB1dD4oc3RyZWFtKVxuICAgIGNvbnN0IHN0cmVhbVdpdGhSYXcgPSBodW55dWFuQmV0YVN0cmVhbS5waXBlVGhyb3VnaChuZXcgVHJhbnNmb3JtU3RyZWFtPEh1bll1YW5TdHJlYW1UZXh0T3V0cHV0LCBCYXNlRG9TdHJlYW1PdXRwdXRDaHVuayAmIHsgcmF3UmVzcG9uc2U/OiBhbnkgfT4oe1xuICAgICAgdHJhbnNmb3JtKGNodW5rLCBjb250cm9sbGVyKSB7XG4gICAgICAgIGNvbnN0IG5ld0Nob2ljZXMgPSBjaHVuay5jaG9pY2VzLm1hcCgoY2hvaWNlKSA9PiB7XG4gICAgICAgICAgY29uc3QgbWVzc2FnZSA9IGNob2ljZS5kZWx0YVxuICAgICAgICAgIGlmIChpc1Rvb2xDYWxsID09IG51bGwpIGlzVG9vbENhbGwgPSBpc1Rvb2xDYWxsQXNzaXN0YW50TWVzc2FnZShtZXNzYWdlKVxuICAgICAgICAgIGlmIChpc1Rvb2xDYWxsKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAuLi5jaG9pY2UsXG4gICAgICAgICAgICAgIGZpbmlzaF9yZWFzb246ICd0b29sX2NhbGxzJyxcbiAgICAgICAgICAgICAgZGVsdGE6IG1lc3NhZ2UsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBjaG9pY2VcbiAgICAgICAgfSlcbiAgICAgICAgY29uc3QgbmV3Q2h1bmsgPSB7IC4uLmNodW5rLCBjaG9pY2VzOiBuZXdDaG9pY2VzIH1cbiAgICAgICAgY29udHJvbGxlci5lbnF1ZXVlKHsgLi4ubmV3Q2h1bmssIHJhd1Jlc3BvbnNlOiBjaHVuayB9KVxuICAgICAgfSxcbiAgICB9KSwpXG5cbiAgICByZXR1cm4gY3JlYXRlQXN5bmNJdGVyYWJsZShzdHJlYW1XaXRoUmF3KVxuICB9XG59XG4iXX0=
}, function(modId) { var map = {"../../utils":1739103120825,"../HunYuan/util":1739103120831}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1739103120838, function(require, module, exports) {

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HunYuanOpenSimpleModel = void 0;
var utils_1 = require("../../utils");
var util_1 = require("../HunYuan/util");
var HunYuanOpenSimpleModel = (function () {
    function HunYuanOpenSimpleModel(req, baseUrl, subUrl) {
        this.req = req;
        this.baseUrl = baseUrl;
        this.subUrl = 'hunyuan-open/v1/chat/completions';
        if (subUrl != null) {
            this.subUrl = subUrl;
        }
    }
    Object.defineProperty(HunYuanOpenSimpleModel.prototype, "url", {
        get: function () {
            return "".concat(this.baseUrl, "/").concat(this.subUrl);
        },
        enumerable: false,
        configurable: true
    });
    HunYuanOpenSimpleModel.prototype.doGenerate = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.req({
                            url: this.url,
                            data: __assign(__assign({}, (0, util_1.processInput)(data)), { stream: false }),
                            stream: false,
                        })];
                    case 1:
                        res = (_a.sent());
                        return [2, __assign(__assign({}, res), { rawResponse: res })];
                }
            });
        });
    };
    HunYuanOpenSimpleModel.prototype.doStream = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var isToolCall, _stream, stream, hunyuanBetaStream, streamWithRaw;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isToolCall = null;
                        return [4, this.req({
                                url: this.url,
                                data: __assign(__assign({}, (0, util_1.processInput)(data)), { stream: true }),
                                stream: true,
                            })];
                    case 1:
                        _stream = _a.sent();
                        stream = (0, utils_1.toPolyfillReadable)(_stream);
                        hunyuanBetaStream = (0, utils_1.intoStandardStream)(stream);
                        streamWithRaw = hunyuanBetaStream.pipeThrough(new utils_1.TransformStream({
                            transform: function (chunk, controller) {
                                var newChoices = chunk.choices.map(function (choice) {
                                    var message = choice.delta;
                                    if (isToolCall == null)
                                        isToolCall = (0, utils_1.isToolCallAssistantMessage)(message);
                                    if (isToolCall) {
                                        return __assign(__assign({}, choice), { finish_reason: 'tool_calls', delta: message });
                                    }
                                    return choice;
                                });
                                var newChunk = __assign(__assign({}, chunk), { choices: newChoices });
                                controller.enqueue(__assign(__assign({}, newChunk), { rawResponse: chunk }));
                            },
                        }));
                        return [2, (0, utils_1.createAsyncIterable)(streamWithRaw)];
                }
            });
        });
    };
    return HunYuanOpenSimpleModel;
}());
exports.HunYuanOpenSimpleModel = HunYuanOpenSimpleModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kZWxzL0h1bll1YW5PcGVuL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBTW9CO0FBU3BCLHdDQUE4QztBQUc5QztJQUVFLGdDQUFvQixHQUFhLEVBQVMsT0FBZSxFQUFFLE1BQWU7UUFBdEQsUUFBRyxHQUFILEdBQUcsQ0FBVTtRQUFTLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFEbEQsV0FBTSxHQUFHLGtDQUFrQyxDQUFBO1FBRWhELElBQUksTUFBTSxJQUFJLElBQUksRUFBRTtZQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtTQUNyQjtJQUNILENBQUM7SUFFRCxzQkFBWSx1Q0FBRzthQUFmO1lBQ0UsT0FBTyxVQUFHLElBQUksQ0FBQyxPQUFPLGNBQUksSUFBSSxDQUFDLE1BQU0sQ0FBRSxDQUFBO1FBQ3pDLENBQUM7OztPQUFBO0lBRVksMkNBQVUsR0FBdkIsVUFBd0IsSUFBd0I7Ozs7OzRCQUNqQyxXQUFNLElBQUksQ0FBQyxHQUFHLENBQUM7NEJBQzFCLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRzs0QkFDYixJQUFJLHdCQUNDLElBQUEsbUJBQVksRUFBQyxJQUFJLENBQUMsS0FDckIsTUFBTSxFQUFFLEtBQUssR0FDZDs0QkFDRCxNQUFNLEVBQUUsS0FBSzt5QkFDZCxDQUFDLEVBQUE7O3dCQVBJLEdBQUcsR0FBRyxDQUFDLFNBT1gsQ0FBOEI7d0JBQ2hDLGlDQUFZLEdBQUcsS0FBRSxXQUFXLEVBQUUsR0FBRyxLQUFFOzs7O0tBQ3BDO0lBRVkseUNBQVEsR0FBckIsVUFBc0IsSUFBd0I7Ozs7Ozt3QkFDeEMsVUFBVSxHQUFtQixJQUFJLENBQUE7d0JBRXJCLFdBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQztnQ0FDN0IsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO2dDQUNiLElBQUksd0JBQ0MsSUFBQSxtQkFBWSxFQUFDLElBQUksQ0FBQyxLQUNyQixNQUFNLEVBQUUsSUFBSSxHQUNiO2dDQUNELE1BQU0sRUFBRSxJQUFJOzZCQUNiLENBQUMsRUFBQTs7d0JBUEksT0FBTyxHQUFHLFNBT2Q7d0JBQ0ksTUFBTSxHQUFHLElBQUEsMEJBQWtCLEVBQUMsT0FBTyxDQUFtQixDQUFBO3dCQUV0RCxpQkFBaUIsR0FBRyxJQUFBLDBCQUFrQixFQUEwQixNQUFNLENBQUMsQ0FBQTt3QkFDdkUsYUFBYSxHQUFHLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxJQUFJLHVCQUFlLENBQTJFOzRCQUNoSixTQUFTLFlBQUMsS0FBSyxFQUFFLFVBQVU7Z0NBQ3pCLElBQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUMsTUFBTTtvQ0FDMUMsSUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQTtvQ0FDNUIsSUFBSSxVQUFVLElBQUksSUFBSTt3Q0FBRSxVQUFVLEdBQUcsSUFBQSxrQ0FBMEIsRUFBQyxPQUFPLENBQUMsQ0FBQTtvQ0FDeEUsSUFBSSxVQUFVLEVBQUU7d0NBQ2QsNkJBQ0ssTUFBTSxLQUNULGFBQWEsRUFBRSxZQUFZLEVBQzNCLEtBQUssRUFBRSxPQUFPLElBQ2Y7cUNBQ0Y7b0NBQ0QsT0FBTyxNQUFNLENBQUE7Z0NBQ2YsQ0FBQyxDQUFDLENBQUE7Z0NBQ0YsSUFBTSxRQUFRLHlCQUFRLEtBQUssS0FBRSxPQUFPLEVBQUUsVUFBVSxHQUFFLENBQUE7Z0NBQ2xELFVBQVUsQ0FBQyxPQUFPLHVCQUFNLFFBQVEsS0FBRSxXQUFXLEVBQUUsS0FBSyxJQUFHLENBQUE7NEJBQ3pELENBQUM7eUJBQ0YsQ0FBQyxDQUFFLENBQUE7d0JBRUosV0FBTyxJQUFBLDJCQUFtQixFQUFDLGFBQWEsQ0FBQyxFQUFBOzs7O0tBQzFDO0lBQ0gsNkJBQUM7QUFBRCxDQUFDLEFBM0RELElBMkRDO0FBM0RZLHdEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIGNyZWF0ZUFzeW5jSXRlcmFibGUsXG4gIFRyYW5zZm9ybVN0cmVhbSxcbiAgdG9Qb2x5ZmlsbFJlYWRhYmxlLFxuICBpbnRvU3RhbmRhcmRTdHJlYW0sXG4gIGlzVG9vbENhbGxBc3Npc3RhbnRNZXNzYWdlLFxufSBmcm9tICcuLi8uLi91dGlscydcbmltcG9ydCB0eXBlIHtcbiAgTW9kZWxSZXEsXG4gIEJhc2VDaGF0TW9kZWxJbnB1dCxcbiAgU2ltcGxlQ2hhdE1vZGVsLFxuICBEb1N0cmVhbU91dHB1dCxcbiAgQmFzZURvU3RyZWFtT3V0cHV0Q2h1bmssXG4gIERvR2VuZXJhdGVPdXRwdXQsXG59IGZyb20gJy4uLy4uL3R5cGUnXG5pbXBvcnQgeyBwcm9jZXNzSW5wdXQgfSBmcm9tICcuLi9IdW5ZdWFuL3V0aWwnXG5pbXBvcnQgeyBIdW5ZdWFuR2VuZXJhdGVUZXh0T3V0cHV0LCBIdW5ZdWFuU3RyZWFtVGV4dE91dHB1dCB9IGZyb20gJy4uL0h1bll1YW4vdHlwZSdcblxuZXhwb3J0IGNsYXNzIEh1bll1YW5PcGVuU2ltcGxlTW9kZWwgaW1wbGVtZW50cyBTaW1wbGVDaGF0TW9kZWwge1xuICBwdWJsaWMgc3ViVXJsID0gJ2h1bnl1YW4tb3Blbi92MS9jaGF0L2NvbXBsZXRpb25zJ1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlcTogTW9kZWxSZXEsIHB1YmxpYyBiYXNlVXJsOiBzdHJpbmcsIHN1YlVybD86IHN0cmluZykge1xuICAgIGlmIChzdWJVcmwgIT0gbnVsbCkge1xuICAgICAgdGhpcy5zdWJVcmwgPSBzdWJVcmxcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldCB1cmwoKSB7XG4gICAgcmV0dXJuIGAke3RoaXMuYmFzZVVybH0vJHt0aGlzLnN1YlVybH1gXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZG9HZW5lcmF0ZShkYXRhOiBCYXNlQ2hhdE1vZGVsSW5wdXQpOiBQcm9taXNlPERvR2VuZXJhdGVPdXRwdXQ+IHtcbiAgICBjb25zdCByZXMgPSAoYXdhaXQgdGhpcy5yZXEoe1xuICAgICAgdXJsOiB0aGlzLnVybCxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgLi4ucHJvY2Vzc0lucHV0KGRhdGEpLFxuICAgICAgICBzdHJlYW06IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHN0cmVhbTogZmFsc2UsXG4gICAgfSkpIGFzIEh1bll1YW5HZW5lcmF0ZVRleHRPdXRwdXRcbiAgICByZXR1cm4geyAuLi5yZXMsIHJhd1Jlc3BvbnNlOiByZXMgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGRvU3RyZWFtKGRhdGE6IEJhc2VDaGF0TW9kZWxJbnB1dCk6IFByb21pc2U8RG9TdHJlYW1PdXRwdXQ+IHtcbiAgICBsZXQgaXNUb29sQ2FsbDogbnVsbCB8IGJvb2xlYW4gPSBudWxsXG5cbiAgICBjb25zdCBfc3RyZWFtID0gYXdhaXQgdGhpcy5yZXEoe1xuICAgICAgdXJsOiB0aGlzLnVybCxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgLi4ucHJvY2Vzc0lucHV0KGRhdGEpLFxuICAgICAgICBzdHJlYW06IHRydWUsXG4gICAgICB9LFxuICAgICAgc3RyZWFtOiB0cnVlLFxuICAgIH0pXG4gICAgY29uc3Qgc3RyZWFtID0gdG9Qb2x5ZmlsbFJlYWRhYmxlKF9zdHJlYW0pIGFzIHR5cGVvZiBfc3RyZWFtXG5cbiAgICBjb25zdCBodW55dWFuQmV0YVN0cmVhbSA9IGludG9TdGFuZGFyZFN0cmVhbTxIdW5ZdWFuU3RyZWFtVGV4dE91dHB1dD4oc3RyZWFtKVxuICAgIGNvbnN0IHN0cmVhbVdpdGhSYXcgPSBodW55dWFuQmV0YVN0cmVhbS5waXBlVGhyb3VnaChuZXcgVHJhbnNmb3JtU3RyZWFtPEh1bll1YW5TdHJlYW1UZXh0T3V0cHV0LCBCYXNlRG9TdHJlYW1PdXRwdXRDaHVuayAmIHsgcmF3UmVzcG9uc2U/OiBhbnkgfT4oe1xuICAgICAgdHJhbnNmb3JtKGNodW5rLCBjb250cm9sbGVyKSB7XG4gICAgICAgIGNvbnN0IG5ld0Nob2ljZXMgPSBjaHVuay5jaG9pY2VzLm1hcCgoY2hvaWNlKSA9PiB7XG4gICAgICAgICAgY29uc3QgbWVzc2FnZSA9IGNob2ljZS5kZWx0YVxuICAgICAgICAgIGlmIChpc1Rvb2xDYWxsID09IG51bGwpIGlzVG9vbENhbGwgPSBpc1Rvb2xDYWxsQXNzaXN0YW50TWVzc2FnZShtZXNzYWdlKVxuICAgICAgICAgIGlmIChpc1Rvb2xDYWxsKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAuLi5jaG9pY2UsXG4gICAgICAgICAgICAgIGZpbmlzaF9yZWFzb246ICd0b29sX2NhbGxzJyxcbiAgICAgICAgICAgICAgZGVsdGE6IG1lc3NhZ2UsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBjaG9pY2VcbiAgICAgICAgfSlcbiAgICAgICAgY29uc3QgbmV3Q2h1bmsgPSB7IC4uLmNodW5rLCBjaG9pY2VzOiBuZXdDaG9pY2VzIH1cbiAgICAgICAgY29udHJvbGxlci5lbnF1ZXVlKHsgLi4ubmV3Q2h1bmssIHJhd1Jlc3BvbnNlOiBjaHVuayB9KVxuICAgICAgfSxcbiAgICB9KSwpXG5cbiAgICByZXR1cm4gY3JlYXRlQXN5bmNJdGVyYWJsZShzdHJlYW1XaXRoUmF3KVxuICB9XG59XG4iXX0=
}, function(modId) { var map = {"../../utils":1739103120825,"../HunYuan/util":1739103120831}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1739103120839, function(require, module, exports) {

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeepSeekSimpleModel = void 0;
var utils_1 = require("../../utils");
var DeepSeekSimpleModel = (function () {
    function DeepSeekSimpleModel(req, baseUrl, subUrl) {
        this.req = req;
        this.baseUrl = baseUrl;
        this.subUrl = 'deepseek/v1/chat/completions';
        if (subUrl != null) {
            this.subUrl = subUrl;
        }
    }
    Object.defineProperty(DeepSeekSimpleModel.prototype, "url", {
        get: function () {
            return "".concat(this.baseUrl, "/").concat(this.subUrl);
        },
        enumerable: false,
        configurable: true
    });
    DeepSeekSimpleModel.prototype.doGenerate = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.req({
                            url: this.url,
                            data: __assign(__assign({}, data), { stream: false }),
                            stream: false,
                        })];
                    case 1:
                        res = (_a.sent());
                        return [2, __assign(__assign({}, res), { rawResponse: res })];
                }
            });
        });
    };
    DeepSeekSimpleModel.prototype.doStream = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var isToolCall, _stream, stream, standardStream, streamWithRaw;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isToolCall = null;
                        return [4, this.req({
                                url: this.url,
                                data: __assign(__assign({}, data), { stream: true }),
                                stream: true,
                            })];
                    case 1:
                        _stream = _a.sent();
                        stream = (0, utils_1.toPolyfillReadable)(_stream);
                        standardStream = (0, utils_1.intoStandardStream)(stream);
                        streamWithRaw = standardStream.pipeThrough(new utils_1.TransformStream({
                            transform: function (chunk, controller) {
                                var newChoices = chunk.choices.map(function (choice) {
                                    var message = choice.delta;
                                    if (isToolCall == null)
                                        isToolCall = (0, utils_1.isToolCallAssistantMessage)(message);
                                    if (isToolCall) {
                                        return __assign(__assign({}, choice), { finish_reason: 'tool_calls', delta: message });
                                    }
                                    return choice;
                                });
                                var newChunk = __assign(__assign({}, chunk), { choices: newChoices });
                                controller.enqueue(__assign(__assign({}, newChunk), { rawResponse: chunk }));
                            },
                        }));
                        return [2, (0, utils_1.createAsyncIterable)(streamWithRaw)];
                }
            });
        });
    };
    return DeepSeekSimpleModel;
}());
exports.DeepSeekSimpleModel = DeepSeekSimpleModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kZWxzL0RlZXBTZWVrL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBTW9CO0FBVXBCO0lBRUUsNkJBQW9CLEdBQWEsRUFBUyxPQUFlLEVBQUUsTUFBZTtRQUF0RCxRQUFHLEdBQUgsR0FBRyxDQUFVO1FBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQURsRCxXQUFNLEdBQUcsOEJBQThCLENBQUE7UUFFNUMsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO1NBQ3JCO0lBQ0gsQ0FBQztJQUVELHNCQUFZLG9DQUFHO2FBQWY7WUFDRSxPQUFPLFVBQUcsSUFBSSxDQUFDLE9BQU8sY0FBSSxJQUFJLENBQUMsTUFBTSxDQUFFLENBQUE7UUFDekMsQ0FBQzs7O09BQUE7SUFFWSx3Q0FBVSxHQUF2QixVQUF3QixJQUF3Qjs7Ozs7NEJBQ2pDLFdBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQzs0QkFDMUIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHOzRCQUNiLElBQUksd0JBQ0MsSUFBSSxLQUNQLE1BQU0sRUFBRSxLQUFLLEdBQ2Q7NEJBQ0QsTUFBTSxFQUFFLEtBQUs7eUJBQ2QsQ0FBQyxFQUFBOzt3QkFQSSxHQUFHLEdBQUcsQ0FBQyxTQU9YLENBQXFCO3dCQUN2QixpQ0FBWSxHQUFHLEtBQUUsV0FBVyxFQUFFLEdBQUcsS0FBRTs7OztLQUNwQztJQUVZLHNDQUFRLEdBQXJCLFVBQXNCLElBQXdCOzs7Ozs7d0JBQ3hDLFVBQVUsR0FBbUIsSUFBSSxDQUFBO3dCQUNyQixXQUFNLElBQUksQ0FBQyxHQUFHLENBQUM7Z0NBQzdCLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztnQ0FDYixJQUFJLHdCQUNDLElBQUksS0FDUCxNQUFNLEVBQUUsSUFBSSxHQUNiO2dDQUNELE1BQU0sRUFBRSxJQUFJOzZCQUNiLENBQUMsRUFBQTs7d0JBUEksT0FBTyxHQUFHLFNBT2Q7d0JBQ0ksTUFBTSxHQUFHLElBQUEsMEJBQWtCLEVBQUMsT0FBTyxDQUFtQixDQUFBO3dCQUV0RCxjQUFjLEdBQUcsSUFBQSwwQkFBa0IsRUFBMEIsTUFBTSxDQUFDLENBQUE7d0JBQ3BFLGFBQWEsR0FBRyxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksdUJBQWUsQ0FBMkU7NEJBQzdJLFNBQVMsWUFBQyxLQUFLLEVBQUUsVUFBVTtnQ0FDekIsSUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQyxNQUFNO29DQUMxQyxJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFBO29DQUM1QixJQUFJLFVBQVUsSUFBSSxJQUFJO3dDQUFFLFVBQVUsR0FBRyxJQUFBLGtDQUEwQixFQUFDLE9BQU8sQ0FBQyxDQUFBO29DQUN4RSxJQUFJLFVBQVUsRUFBRTt3Q0FDZCw2QkFDSyxNQUFNLEtBQ1QsYUFBYSxFQUFFLFlBQXFCLEVBQ3BDLEtBQUssRUFBRSxPQUFPLElBQ2Y7cUNBQ0Y7b0NBQ0QsT0FBTyxNQUFNLENBQUE7Z0NBQ2YsQ0FBQyxDQUFDLENBQUE7Z0NBQ0YsSUFBTSxRQUFRLHlCQUFRLEtBQUssS0FBRSxPQUFPLEVBQUUsVUFBVSxHQUFFLENBQUE7Z0NBQ2xELFVBQVUsQ0FBQyxPQUFPLHVCQUFNLFFBQVEsS0FBRSxXQUFXLEVBQUUsS0FBSyxJQUFHLENBQUE7NEJBQ3pELENBQUM7eUJBQ0YsQ0FBQyxDQUFFLENBQUE7d0JBRUosV0FBTyxJQUFBLDJCQUFtQixFQUFDLGFBQWEsQ0FBQyxFQUFBOzs7O0tBQzFDO0lBQ0gsMEJBQUM7QUFBRCxDQUFDLEFBMURELElBMERDO0FBMURZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIGNyZWF0ZUFzeW5jSXRlcmFibGUsXG4gIFRyYW5zZm9ybVN0cmVhbSxcbiAgdG9Qb2x5ZmlsbFJlYWRhYmxlLFxuICBpbnRvU3RhbmRhcmRTdHJlYW0sXG4gIGlzVG9vbENhbGxBc3Npc3RhbnRNZXNzYWdlLFxufSBmcm9tICcuLi8uLi91dGlscydcbmltcG9ydCB0eXBlIHtcbiAgTW9kZWxSZXEsXG4gIEJhc2VDaGF0TW9kZWxJbnB1dCxcbiAgU2ltcGxlQ2hhdE1vZGVsLFxuICBEb1N0cmVhbU91dHB1dCxcbiAgQmFzZURvU3RyZWFtT3V0cHV0Q2h1bmssXG4gIERvR2VuZXJhdGVPdXRwdXQsXG59IGZyb20gJy4uLy4uL3R5cGUnXG5cbmV4cG9ydCBjbGFzcyBEZWVwU2Vla1NpbXBsZU1vZGVsIGltcGxlbWVudHMgU2ltcGxlQ2hhdE1vZGVsIHtcbiAgcHVibGljIHN1YlVybCA9ICdkZWVwc2Vlay92MS9jaGF0L2NvbXBsZXRpb25zJ1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlcTogTW9kZWxSZXEsIHB1YmxpYyBiYXNlVXJsOiBzdHJpbmcsIHN1YlVybD86IHN0cmluZykge1xuICAgIGlmIChzdWJVcmwgIT0gbnVsbCkge1xuICAgICAgdGhpcy5zdWJVcmwgPSBzdWJVcmxcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldCB1cmwoKSB7XG4gICAgcmV0dXJuIGAke3RoaXMuYmFzZVVybH0vJHt0aGlzLnN1YlVybH1gXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZG9HZW5lcmF0ZShkYXRhOiBCYXNlQ2hhdE1vZGVsSW5wdXQpOiBQcm9taXNlPERvR2VuZXJhdGVPdXRwdXQ+IHtcbiAgICBjb25zdCByZXMgPSAoYXdhaXQgdGhpcy5yZXEoe1xuICAgICAgdXJsOiB0aGlzLnVybCxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgLi4uZGF0YSxcbiAgICAgICAgc3RyZWFtOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBzdHJlYW06IGZhbHNlLFxuICAgIH0pKSBhcyBEb0dlbmVyYXRlT3V0cHV0XG4gICAgcmV0dXJuIHsgLi4ucmVzLCByYXdSZXNwb25zZTogcmVzIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBkb1N0cmVhbShkYXRhOiBCYXNlQ2hhdE1vZGVsSW5wdXQpOiBQcm9taXNlPERvU3RyZWFtT3V0cHV0PiB7XG4gICAgbGV0IGlzVG9vbENhbGw6IG51bGwgfCBib29sZWFuID0gbnVsbFxuICAgIGNvbnN0IF9zdHJlYW0gPSBhd2FpdCB0aGlzLnJlcSh7XG4gICAgICB1cmw6IHRoaXMudXJsLFxuICAgICAgZGF0YToge1xuICAgICAgICAuLi5kYXRhLFxuICAgICAgICBzdHJlYW06IHRydWUsXG4gICAgICB9LFxuICAgICAgc3RyZWFtOiB0cnVlLFxuICAgIH0pXG4gICAgY29uc3Qgc3RyZWFtID0gdG9Qb2x5ZmlsbFJlYWRhYmxlKF9zdHJlYW0pIGFzIHR5cGVvZiBfc3RyZWFtXG5cbiAgICBjb25zdCBzdGFuZGFyZFN0cmVhbSA9IGludG9TdGFuZGFyZFN0cmVhbTxCYXNlRG9TdHJlYW1PdXRwdXRDaHVuaz4oc3RyZWFtKVxuICAgIGNvbnN0IHN0cmVhbVdpdGhSYXcgPSBzdGFuZGFyZFN0cmVhbS5waXBlVGhyb3VnaChuZXcgVHJhbnNmb3JtU3RyZWFtPEJhc2VEb1N0cmVhbU91dHB1dENodW5rLCBCYXNlRG9TdHJlYW1PdXRwdXRDaHVuayAmIHsgcmF3UmVzcG9uc2U/OiBhbnkgfT4oe1xuICAgICAgdHJhbnNmb3JtKGNodW5rLCBjb250cm9sbGVyKSB7XG4gICAgICAgIGNvbnN0IG5ld0Nob2ljZXMgPSBjaHVuay5jaG9pY2VzLm1hcCgoY2hvaWNlKSA9PiB7XG4gICAgICAgICAgY29uc3QgbWVzc2FnZSA9IGNob2ljZS5kZWx0YVxuICAgICAgICAgIGlmIChpc1Rvb2xDYWxsID09IG51bGwpIGlzVG9vbENhbGwgPSBpc1Rvb2xDYWxsQXNzaXN0YW50TWVzc2FnZShtZXNzYWdlKVxuICAgICAgICAgIGlmIChpc1Rvb2xDYWxsKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAuLi5jaG9pY2UsXG4gICAgICAgICAgICAgIGZpbmlzaF9yZWFzb246ICd0b29sX2NhbGxzJyBhcyBjb25zdCxcbiAgICAgICAgICAgICAgZGVsdGE6IG1lc3NhZ2UsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBjaG9pY2VcbiAgICAgICAgfSlcbiAgICAgICAgY29uc3QgbmV3Q2h1bmsgPSB7IC4uLmNodW5rLCBjaG9pY2VzOiBuZXdDaG9pY2VzIH1cbiAgICAgICAgY29udHJvbGxlci5lbnF1ZXVlKHsgLi4ubmV3Q2h1bmssIHJhd1Jlc3BvbnNlOiBjaHVuayB9KVxuICAgICAgfSxcbiAgICB9KSwpXG5cbiAgICByZXR1cm4gY3JlYXRlQXN5bmNJdGVyYWJsZShzdHJlYW1XaXRoUmF3KVxuICB9XG59XG4iXX0=
}, function(modId) { var map = {"../../utils":1739103120825}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1739103120840, function(require, module, exports) {

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toolMap = exports.ReactModel = void 0;
var utils_1 = require("../utils");
function processInput(obj) {
    var _a;
    var onStepFinish = obj.onStepFinish, abortSignal = obj.abortSignal, maxSteps = obj.maxSteps, topP = obj.topP, toolChoice = obj.toolChoice, b = __rest(obj, ["onStepFinish", "abortSignal", "maxSteps", "topP", "toolChoice"]);
    if (maxSteps != null && maxSteps < 1) {
        throw new Error('`maxSteps` muse be greater than 0.');
    }
    return [
        { onStepFinish: onStepFinish, abortSignal: abortSignal, maxSteps: maxSteps },
        __assign(__assign({}, b), { tools: (_a = b.tools) === null || _a === void 0 ? void 0 : _a.map(function (tool) {
                if ('fn' in tool) {
                    return (0, utils_1.functionToolToModelTool)(tool);
                }
                return tool;
            }), top_p: topP != null ? topP : b.top_p, tool_choice: toolChoice != null ? toolChoice : b.tool_choice }),
    ];
}
var ReactModel = (function () {
    function ReactModel(model) {
        this.model = model;
    }
    ReactModel.prototype.generateText = function (_input) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var rawResponses, totalUsage, _c, _d, onStepFinish, _e, maxSteps, input, doGenerate, currentRes, currentStep, toolCall, stepUsage_1, toolCallResult, choice, e_1, lastChoice, lastMessage, text, messages, stepUsage;
            var _this = this;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        rawResponses = [];
                        totalUsage = { completion_tokens: 0, prompt_tokens: 0, total_tokens: 0 };
                        _c = processInput(_input), _d = _c[0], onStepFinish = _d.onStepFinish, _e = _d.maxSteps, maxSteps = _e === void 0 ? 10 : _e, input = _c[1];
                        doGenerate = function () { return _this.model.doGenerate(input); };
                        return [4, doGenerate()];
                    case 1:
                        currentRes = _f.sent();
                        currentStep = 1;
                        currentRes.rawResponse && rawResponses.push(currentRes.rawResponse);
                        toolCall = null;
                        _f.label = 2;
                    case 2:
                        if (!(currentStep < maxSteps && (toolCall = getToolCallFromGenerate(currentRes)) != null)) return [3, 9];
                        stepUsage_1 = createSolidUsage(currentRes.usage);
                        addToUsage(totalUsage, stepUsage_1);
                        _f.label = 3;
                    case 3:
                        _f.trys.push([3, 7, , 8]);
                        return [4, callTool(toolCall)];
                    case 4:
                        toolCallResult = _f.sent();
                        choice = currentRes.choices[0];
                        return [4, (onStepFinish === null || onStepFinish === void 0 ? void 0 : onStepFinish({
                                finishReason: choice.finish_reason,
                                messages: input.messages.slice(),
                                text: choice.message.content,
                                toolCall: toolCall,
                                toolResult: toolCallResult,
                                stepUsage: stepUsage_1,
                                totalUsage: Object.assign({}, totalUsage),
                            }))];
                    case 5:
                        _f.sent();
                        pushNewMessages(input.messages, choice.message, toolCallResult);
                        return [4, doGenerate()];
                    case 6:
                        currentRes = _f.sent();
                        currentRes.rawResponse && rawResponses.push(currentRes.rawResponse);
                        currentStep += 1;
                        return [3, 8];
                    case 7:
                        e_1 = _f.sent();
                        return [2, {
                                text: '',
                                messages: input.messages,
                                usage: totalUsage,
                                error: e_1,
                                rawResponses: rawResponses,
                            }];
                    case 8: return [3, 2];
                    case 9:
                        lastChoice = (_a = currentRes === null || currentRes === void 0 ? void 0 : currentRes.choices) === null || _a === void 0 ? void 0 : _a[0];
                        lastMessage = lastChoice === null || lastChoice === void 0 ? void 0 : lastChoice.message;
                        text = (_b = lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.content) !== null && _b !== void 0 ? _b : '';
                        messages = lastMessage ? __spreadArray(__spreadArray([], input.messages, true), [lastMessage], false) : input.messages;
                        stepUsage = createSolidUsage(currentRes.usage);
                        addToUsage(totalUsage, stepUsage);
                        return [4, (onStepFinish === null || onStepFinish === void 0 ? void 0 : onStepFinish({
                                finishReason: lastChoice.finish_reason,
                                messages: messages.slice(),
                                text: text,
                                toolCall: getToolCallFromGenerate(currentRes),
                                toolResult: null,
                                stepUsage: stepUsage,
                                totalUsage: Object.assign({}, totalUsage),
                            }))];
                    case 10:
                        _f.sent();
                        return [2, {
                                text: text,
                                messages: messages,
                                usage: totalUsage,
                                rawResponses: rawResponses,
                            }];
                }
            });
        });
    };
    ReactModel.prototype.streamText = function (_input) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var totalUsage, _b, _c, onStepFinish, _d, maxSteps, input, doStream, currentRes, currentStep, readResult, readCurrentStream, _e, assistantMessage, stepUsage_2, toolCall, toolCallResult, e_2, _f, s1_1, s2_1, message_1, usage, messages, _g, s1_2, s2_2, messagePromise, usagePromise, message, finishReason, stepUsage, originStream, _h, s1, s2;
            var _this = this;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        totalUsage = { completion_tokens: 0, prompt_tokens: 0, total_tokens: 0 };
                        _b = processInput(_input), _c = _b[0], onStepFinish = _c.onStepFinish, _d = _c.maxSteps, maxSteps = _d === void 0 ? 10 : _d, input = _b[1];
                        doStream = function () { return _this.model.doStream(input); };
                        return [4, doStream()];
                    case 1:
                        currentRes = _j.sent();
                        currentStep = 1;
                        readResult = null;
                        readCurrentStream = function () {
                            var _a = currentRes.tee(), oldStream = _a[0], newStream = _a[1];
                            currentRes = (0, utils_1.createAsyncIterable)(oldStream);
                            return readFunctionCallStream(newStream);
                        };
                        _j.label = 2;
                    case 2:
                        _e = currentStep < maxSteps;
                        if (!_e) return [3, 4];
                        return [4, readCurrentStream()];
                    case 3:
                        _e = (readResult = _j.sent()) != null;
                        _j.label = 4;
                    case 4:
                        if (!_e) return [3, 11];
                        assistantMessage = readResult.message, stepUsage_2 = readResult.usage;
                        addToUsage(totalUsage, stepUsage_2);
                        toolCall = (_a = assistantMessage.tool_calls) === null || _a === void 0 ? void 0 : _a[0];
                        _j.label = 5;
                    case 5:
                        _j.trys.push([5, 9, , 10]);
                        return [4, callTool(toolCall)];
                    case 6:
                        toolCallResult = _j.sent();
                        return [4, (onStepFinish === null || onStepFinish === void 0 ? void 0 : onStepFinish({
                                finishReason: 'tool_calls',
                                messages: input.messages.slice(),
                                text: assistantMessage.content,
                                toolCall: toolCall,
                                toolResult: toolCallResult,
                                stepUsage: stepUsage_2,
                                totalUsage: Object.assign({}, totalUsage),
                            }))];
                    case 7:
                        _j.sent();
                        pushNewMessages(input.messages, assistantMessage, toolCallResult);
                        return [4, doStream()];
                    case 8:
                        currentRes = _j.sent();
                        return [3, 10];
                    case 9:
                        e_2 = _j.sent();
                        _f = currentRes.tee(), s1_1 = _f[0], s2_1 = _f[1];
                        return [2, {
                                messages: Promise.resolve(input.messages),
                                dataStream: (0, utils_1.createAsyncIterable)(s1_1),
                                textStream: (0, utils_1.createAsyncIterable)(s2_1.pipeThrough(new utils_1.TransformStream({
                                    transform: function (chunk, controller) {
                                        var _a, _b, _c;
                                        var str = (_c = (_b = (_a = chunk === null || chunk === void 0 ? void 0 : chunk.choices) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.delta) === null || _c === void 0 ? void 0 : _c.content;
                                        if (typeof str === 'string')
                                            controller.enqueue(str);
                                    },
                                }))),
                                usage: Promise.resolve(totalUsage),
                                error: e_2,
                            }];
                    case 10: return [3, 2];
                    case 11: return [4, readCurrentStream()];
                    case 12:
                        readResult = _j.sent();
                        if (readResult) {
                            message_1 = readResult.message, usage = readResult.usage;
                            addToUsage(totalUsage, usage);
                            messages = __spreadArray(__spreadArray([], input.messages, true), [message_1], false);
                            onStepFinish({
                                messages: messages.slice(),
                                finishReason: 'tool_call',
                                stepUsage: usage,
                                text: message_1.content,
                                toolCall: message_1.tool_calls[0],
                                totalUsage: Object.assign({}, totalUsage),
                            });
                            _g = currentRes.tee(), s1_2 = _g[0], s2_2 = _g[1];
                            return [2, {
                                    messages: Promise.resolve(__spreadArray(__spreadArray([], input.messages, true), [message_1], false)),
                                    dataStream: (0, utils_1.createAsyncIterable)(s1_2),
                                    textStream: (0, utils_1.createAsyncIterable)(s2_2.pipeThrough(new utils_1.TransformStream({
                                        transform: function (chunk, controller) {
                                            var _a, _b, _c;
                                            var str = (_c = (_b = (_a = chunk === null || chunk === void 0 ? void 0 : chunk.choices) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.delta) === null || _c === void 0 ? void 0 : _c.content;
                                            if (typeof str === 'string')
                                                controller.enqueue(str);
                                        },
                                    }))),
                                    usage: Promise.resolve(totalUsage),
                                }];
                        }
                        messagePromise = (0, utils_1.createPromise)();
                        usagePromise = (0, utils_1.createPromise)();
                        message = {
                            role: 'assistant',
                            content: '',
                        };
                        finishReason = '';
                        stepUsage = { completion_tokens: 0, prompt_tokens: 0, total_tokens: 0 };
                        originStream = currentRes.pipeThrough(new utils_1.TransformStream({
                            transform: function (chunk, controller) {
                                var _a, _b, _c, _d, _e, _f, _g, _h;
                                var content = (_c = (_b = (_a = chunk === null || chunk === void 0 ? void 0 : chunk.choices) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.delta) === null || _c === void 0 ? void 0 : _c.content;
                                if (typeof content === 'string') {
                                    message.content += content;
                                }
                                var reason = (_e = (_d = chunk === null || chunk === void 0 ? void 0 : chunk.choices) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.finish_reason;
                                if (reason)
                                    finishReason = reason;
                                if ((_f = chunk === null || chunk === void 0 ? void 0 : chunk.usage) === null || _f === void 0 ? void 0 : _f.completion_tokens)
                                    stepUsage.completion_tokens = chunk.usage.completion_tokens;
                                if ((_g = chunk === null || chunk === void 0 ? void 0 : chunk.usage) === null || _g === void 0 ? void 0 : _g.prompt_tokens)
                                    stepUsage.prompt_tokens = chunk.usage.prompt_tokens;
                                if ((_h = chunk === null || chunk === void 0 ? void 0 : chunk.usage) === null || _h === void 0 ? void 0 : _h.total_tokens)
                                    stepUsage.total_tokens = chunk.usage.total_tokens;
                                controller.enqueue(chunk);
                            },
                            flush: function () {
                                messagePromise.res(__spreadArray(__spreadArray([], input.messages, true), [message], false));
                                addToUsage(totalUsage, stepUsage);
                                usagePromise.res(Object.assign({}, totalUsage));
                                onStepFinish === null || onStepFinish === void 0 ? void 0 : onStepFinish({
                                    messages: __spreadArray(__spreadArray([], input.messages, true), [message], false),
                                    finishReason: finishReason,
                                    text: message.content,
                                    stepUsage: stepUsage,
                                    totalUsage: Object.assign({}, totalUsage),
                                });
                            },
                        }));
                        _h = originStream.tee(), s1 = _h[0], s2 = _h[1];
                        return [2, {
                                messages: messagePromise.promise,
                                dataStream: (0, utils_1.createAsyncIterable)(s1),
                                textStream: (0, utils_1.createAsyncIterable)(s2.pipeThrough(new utils_1.TransformStream({
                                    transform: function (chunk, controller) {
                                        var _a, _b, _c;
                                        var content = (_c = (_b = (_a = chunk === null || chunk === void 0 ? void 0 : chunk.choices) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.delta) === null || _c === void 0 ? void 0 : _c.content;
                                        if (typeof content === 'string') {
                                            controller.enqueue(content);
                                        }
                                    },
                                }))),
                                usage: usagePromise.promise,
                            }];
                }
            });
        });
    };
    return ReactModel;
}());
exports.ReactModel = ReactModel;
function getToolCallFromGenerate(output) {
    var _a;
    var choice = (_a = output === null || output === void 0 ? void 0 : output.choices) === null || _a === void 0 ? void 0 : _a[0];
    if (!choice)
        return null;
    var finish_reason = choice.finish_reason, message = choice.message;
    if (finish_reason !== 'tool_calls')
        return null;
    if (!message)
        return null;
    if (!(0, utils_1.isToolCallAssistantMessage)(message))
        return null;
    return message.tool_calls[0];
}
function pushNewMessages(messages, assistantMessage, toolCallResult) {
    messages.push(assistantMessage, {
        role: 'tool',
        tool_call_id: assistantMessage.tool_calls[0].id,
        content: JSON.stringify(toolCallResult),
    });
}
function readFunctionCallStream(stream) {
    var _a, e_3, _b, _c;
    var _d, _e, _f, _g, _h, _j;
    return __awaiter(this, void 0, void 0, function () {
        var stepUsage, aStream, retToolCall, retMessage, _k, aStream_1, aStream_1_1, chunk, choice, finish_reason, delta, toolCall, e_3_1;
        return __generator(this, function (_l) {
            switch (_l.label) {
                case 0:
                    stepUsage = { completion_tokens: 0, prompt_tokens: 0, total_tokens: 0 };
                    aStream = (0, utils_1.createAsyncIterable)(stream);
                    retToolCall = {
                        id: '',
                        function: {
                            name: '',
                            arguments: '',
                        },
                        type: '',
                    };
                    retMessage = {
                        role: 'assistant',
                        content: '',
                        tool_calls: [retToolCall],
                    };
                    _l.label = 1;
                case 1:
                    _l.trys.push([1, 6, 7, 12]);
                    _k = true, aStream_1 = __asyncValues(aStream);
                    _l.label = 2;
                case 2: return [4, aStream_1.next()];
                case 3:
                    if (!(aStream_1_1 = _l.sent(), _a = aStream_1_1.done, !_a)) return [3, 5];
                    _c = aStream_1_1.value;
                    _k = false;
                    try {
                        chunk = _c;
                        choice = chunk === null || chunk === void 0 ? void 0 : chunk.choices[0];
                        if (!choice)
                            return [2, null];
                        finish_reason = choice.finish_reason, delta = choice.delta;
                        if (finish_reason !== 'tool_calls')
                            return [2, null];
                        if (!delta)
                            return [3, 4];
                        if (delta.content)
                            retMessage.content += delta.content;
                        if (!('tool_calls' in delta))
                            return [3, 4];
                        toolCall = (_d = delta === null || delta === void 0 ? void 0 : delta.tool_calls) === null || _d === void 0 ? void 0 : _d[0];
                        if (toolCall === null || toolCall === void 0 ? void 0 : toolCall.id)
                            retToolCall.id = toolCall.id;
                        if (toolCall === null || toolCall === void 0 ? void 0 : toolCall.type)
                            retToolCall.type = toolCall.type;
                        if ((_e = toolCall === null || toolCall === void 0 ? void 0 : toolCall.function) === null || _e === void 0 ? void 0 : _e.name)
                            retToolCall.function.name = toolCall.function.name;
                        if ((_f = toolCall === null || toolCall === void 0 ? void 0 : toolCall.function) === null || _f === void 0 ? void 0 : _f.arguments)
                            retToolCall.function.arguments += toolCall.function.arguments;
                        if ((_g = chunk === null || chunk === void 0 ? void 0 : chunk.usage) === null || _g === void 0 ? void 0 : _g.completion_tokens)
                            stepUsage.completion_tokens = chunk.usage.completion_tokens;
                        if ((_h = chunk === null || chunk === void 0 ? void 0 : chunk.usage) === null || _h === void 0 ? void 0 : _h.prompt_tokens)
                            stepUsage.prompt_tokens = chunk.usage.prompt_tokens;
                        if ((_j = chunk === null || chunk === void 0 ? void 0 : chunk.usage) === null || _j === void 0 ? void 0 : _j.total_tokens)
                            stepUsage.total_tokens = chunk.usage.total_tokens;
                    }
                    finally {
                        _k = true;
                    }
                    _l.label = 4;
                case 4: return [3, 2];
                case 5: return [3, 12];
                case 6:
                    e_3_1 = _l.sent();
                    e_3 = { error: e_3_1 };
                    return [3, 12];
                case 7:
                    _l.trys.push([7, , 10, 11]);
                    if (!(!_k && !_a && (_b = aStream_1.return))) return [3, 9];
                    return [4, _b.call(aStream_1)];
                case 8:
                    _l.sent();
                    _l.label = 9;
                case 9: return [3, 11];
                case 10:
                    if (e_3) throw e_3.error;
                    return [7];
                case 11: return [7];
                case 12: return [2, {
                        message: retMessage,
                        usage: stepUsage,
                    }];
            }
        });
    });
}
exports.toolMap = new Map();
function callTool(toolCall) {
    return exports.toolMap.get(toolCall.function.name)(JSON.parse(toolCall.function.arguments));
}
function createSolidUsage(usage) {
    var _a, _b, _c;
    return {
        completion_tokens: (_a = usage === null || usage === void 0 ? void 0 : usage.completion_tokens) !== null && _a !== void 0 ? _a : 0,
        prompt_tokens: (_b = usage === null || usage === void 0 ? void 0 : usage.prompt_tokens) !== null && _b !== void 0 ? _b : 0,
        total_tokens: (_c = usage === null || usage === void 0 ? void 0 : usage.total_tokens) !== null && _c !== void 0 ? _c : 0,
    };
}
function addToUsage(targetUsage, sourceUsage) {
    targetUsage.completion_tokens += sourceUsage.completion_tokens;
    targetUsage.prompt_tokens += sourceUsage.prompt_tokens;
    targetUsage.total_tokens += sourceUsage.total_tokens;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kZWxzL21vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0NBTWlCO0FBdUNqQixTQUFTLFlBQVksQ0FBQyxHQUFvQjs7SUFDaEMsSUFBQSxZQUFZLEdBQW9ELEdBQUcsYUFBdkQsRUFBRSxXQUFXLEdBQXVDLEdBQUcsWUFBMUMsRUFBRSxRQUFRLEdBQTZCLEdBQUcsU0FBaEMsRUFBRSxJQUFJLEdBQXVCLEdBQUcsS0FBMUIsRUFBRSxVQUFVLEdBQVcsR0FBRyxXQUFkLEVBQUssQ0FBQyxVQUFLLEdBQUcsRUFBckUsaUVBQStELENBQUYsQ0FBUTtJQUUzRSxJQUFJLFFBQVEsSUFBSSxJQUFJLElBQUksUUFBUSxHQUFHLENBQUMsRUFBRTtRQUNwQyxNQUFNLElBQUksS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUE7S0FDdEQ7SUFFRCxPQUFPO1FBQ0wsRUFBRSxZQUFZLGNBQUEsRUFBRSxXQUFXLGFBQUEsRUFBRSxRQUFRLFVBQUEsRUFBRTs4QkFFbEMsQ0FBQyxLQUNKLEtBQUssRUFBRSxNQUFBLENBQUMsQ0FBQyxLQUFLLDBDQUFFLEdBQUcsQ0FBQyxVQUFDLElBQUk7Z0JBQ3ZCLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtvQkFDaEIsT0FBTyxJQUFBLCtCQUF1QixFQUFDLElBQUksQ0FBQyxDQUFBO2lCQUNyQztnQkFDRCxPQUFPLElBQUksQ0FBQTtZQUNiLENBQUMsQ0FBQyxFQUNGLEtBQUssRUFBRSxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQ3BDLFdBQVcsRUFBRSxVQUFVLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFV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Q3RELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBjcmVhdGVBc3luY0l0ZXJhYmxlLFxuICBUcmFuc2Zvcm1TdHJlYW0sXG4gIGNyZWF0ZVByb21pc2UsXG4gIGlzVG9vbENhbGxBc3Npc3RhbnRNZXNzYWdlLFxuICBmdW5jdGlvblRvb2xUb01vZGVsVG9vbCxcbn0gZnJvbSAnLi4vdXRpbHMnXG5pbXBvcnQge1xuICBCYXNlQ2hhdE1vZGVsSW5wdXQsXG4gIEJhc2VEb1N0cmVhbU91dHB1dENodW5rLFxuICBEb1N0cmVhbU91dHB1dCxcbiAgRG9HZW5lcmF0ZU91dHB1dCxcbiAgU2ltcGxlQ2hhdE1vZGVsLFxuICBUb29sQ2FsbCxcbiAgQ2hhdE1vZGVsTWVzc2FnZSxcbiAgQXN5bmNJdGVyYWJsZVJlYWRhYmxlU3RyZWFtLFxuICBVc2FnZSxcbiAgVG9vbENhbGxBc3Npc3RhbnRNZXNzYWdlLFxuICBNb2RlbFRvb2wsXG4gIEZ1bmN0aW9uVG9vbCxcbn0gZnJvbSAnLi4vdHlwZSdcblxudHlwZSBSZWFjdE1vZGVsSW5wdXQgPSBSZWFjdFByb3BzICZcbk9taXQ8QmFzZUNoYXRNb2RlbElucHV0LCAndG9vbHMnPiAmIHtcbiAgdG9vbHM/OiBBcnJheTxNb2RlbFRvb2wgfCBGdW5jdGlvblRvb2w+XG4gIHRvcFA/OiBudW1iZXJcbiAgdG9vbENob2ljZT86ICdub25lJyB8ICdhdXRvJyB8ICdjdXN0b20nXG59XG5cbmludGVyZmFjZSBJT25TdGVwRmluaXNoIHtcbiAgbWVzc2FnZXM6IEFycmF5PENoYXRNb2RlbE1lc3NhZ2U+XG4gIHRleHQ/OiBzdHJpbmdcbiAgdG9vbENhbGw/OiBUb29sQ2FsbFxuICB0b29sUmVzdWx0PzogdW5rbm93blxuICBmaW5pc2hSZWFzb24/OiBzdHJpbmdcbiAgc3RlcFVzYWdlPzogVXNhZ2VcbiAgdG90YWxVc2FnZT86IFVzYWdlXG59XG5cbmludGVyZmFjZSBSZWFjdFByb3BzIHtcbiAgbWF4U3RlcHM/OiBudW1iZXJcbiAgb25TdGVwRmluaXNoPzogKHByb3A6IElPblN0ZXBGaW5pc2gpID0+IHVua25vd25cbiAgYWJvcnRTaWduYWw/OiBBYm9ydFNpZ25hbCAvLyBUT0RPOiDlrp7njrAgYWJvcnRTaWduYWxcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc0lucHV0KG9iajogUmVhY3RNb2RlbElucHV0KTogW1JlYWN0UHJvcHMsIEJhc2VDaGF0TW9kZWxJbnB1dF0ge1xuICBjb25zdCB7IG9uU3RlcEZpbmlzaCwgYWJvcnRTaWduYWwsIG1heFN0ZXBzLCB0b3BQLCB0b29sQ2hvaWNlLCAuLi5iIH0gPSBvYmpcblxuICBpZiAobWF4U3RlcHMgIT0gbnVsbCAmJiBtYXhTdGVwcyA8IDEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2BtYXhTdGVwc2AgbXVzZSBiZSBncmVhdGVyIHRoYW4gMC4nKVxuICB9XG5cbiAgcmV0dXJuIFtcbiAgICB7IG9uU3RlcEZpbmlzaCwgYWJvcnRTaWduYWwsIG1heFN0ZXBzIH0sXG4gICAge1xuICAgICAgLi4uYixcbiAgICAgIHRvb2xzOiBiLnRvb2xzPy5tYXAoKHRvb2wpID0+IHtcbiAgICAgICAgaWYgKCdmbicgaW4gdG9vbCkge1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvblRvb2xUb01vZGVsVG9vbCh0b29sKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b29sXG4gICAgICB9KSxcbiAgICAgIHRvcF9wOiB0b3BQICE9IG51bGwgPyB0b3BQIDogYi50b3BfcCxcbiAgICAgIHRvb2xfY2hvaWNlOiB0b29sQ2hvaWNlICE9IG51bGwgPyB0b29sQ2hvaWNlIDogYi50b29sX2Nob2ljZSxcbiAgICB9LFxuICBdXG59XG5cbmV4cG9ydCBjbGFzcyBSZWFjdE1vZGVsIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RlbDogU2ltcGxlQ2hhdE1vZGVsKSB7fVxuXG4gIHB1YmxpYyBhc3luYyBnZW5lcmF0ZVRleHQoX2lucHV0OiBSZWFjdE1vZGVsSW5wdXQpOiBQcm9taXNlPHtcbiAgICB0ZXh0OiBzdHJpbmdcbiAgICBtZXNzYWdlczogQXJyYXk8Q2hhdE1vZGVsTWVzc2FnZT5cbiAgICB1c2FnZTogVXNhZ2VcbiAgICByYXdSZXNwb25zZXM6IEFycmF5PHVua25vd24+XG4gICAgZXJyb3I/OiBhbnlcbiAgfT4ge1xuICAgIGNvbnN0IHJhd1Jlc3BvbnNlcyA9IFtdXG4gICAgY29uc3QgdG90YWxVc2FnZTogVXNhZ2UgPSB7IGNvbXBsZXRpb25fdG9rZW5zOiAwLCBwcm9tcHRfdG9rZW5zOiAwLCB0b3RhbF90b2tlbnM6IDAgfVxuXG4gICAgY29uc3QgW3sgb25TdGVwRmluaXNoLCBtYXhTdGVwcyA9IDEwIH0sIGlucHV0XSA9IHByb2Nlc3NJbnB1dChfaW5wdXQpXG5cbiAgICBjb25zdCBkb0dlbmVyYXRlID0gKCkgPT4gdGhpcy5tb2RlbC5kb0dlbmVyYXRlKGlucHV0KSAvLyDlkI7nu63ku6PnoIHkvJrnm7TmjqXlr7kgaW5wdXQubWVzc2FnZXMg5Y6f5Zyw5L+u5pS577yM6L+Z6YeM5LiA55u055So5ZCM5LiA5Liq5a+56LGh5bCx6KGMXG4gICAgbGV0IGN1cnJlbnRSZXMgPSBhd2FpdCBkb0dlbmVyYXRlKClcbiAgICBsZXQgY3VycmVudFN0ZXAgPSAxXG4gICAgY3VycmVudFJlcy5yYXdSZXNwb25zZSAmJiByYXdSZXNwb25zZXMucHVzaChjdXJyZW50UmVzLnJhd1Jlc3BvbnNlKVxuXG4gICAgbGV0IHRvb2xDYWxsOiBUb29sQ2FsbCB8IG51bGwgPSBudWxsXG5cbiAgICAvLyBUT0RPOiDkuIDmrKHlr7nor53mnInlpJrkuKogdG9vbCBjYWxsPyDnm67liY3msqHmnInov5nnp43njrDosaHvvIzmmoLml7bkuI3lpITnkIZcbiAgICB3aGlsZSAoY3VycmVudFN0ZXAgPCBtYXhTdGVwcyAmJiAodG9vbENhbGwgPSBnZXRUb29sQ2FsbEZyb21HZW5lcmF0ZShjdXJyZW50UmVzKSkgIT0gbnVsbCkge1xuICAgICAgY29uc3Qgc3RlcFVzYWdlID0gY3JlYXRlU29saWRVc2FnZShjdXJyZW50UmVzLnVzYWdlKVxuICAgICAgYWRkVG9Vc2FnZSh0b3RhbFVzYWdlLCBzdGVwVXNhZ2UpXG5cbiAgICAgIC8vIOW9k+WIpOaWremcgOimgeW3peWFt+iwg+eUqOaXtlxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdG9vbENhbGxSZXN1bHQgPSBhd2FpdCBjYWxsVG9vbCh0b29sQ2FsbCkgLy8g6LCD55SoXG5cbiAgICAgICAgY29uc3QgY2hvaWNlID0gY3VycmVudFJlcy5jaG9pY2VzWzBdIC8vIGdldFRvb2xDYWxsRnJvbUdlbmVyYXRlIOS/neivgeS6hiBjaG9pY2Ug6IKv5a6a5a2Y5ZyoXG5cbiAgICAgICAgYXdhaXQgb25TdGVwRmluaXNoPy4oe1xuICAgICAgICAgIGZpbmlzaFJlYXNvbjogY2hvaWNlLmZpbmlzaF9yZWFzb24sXG4gICAgICAgICAgbWVzc2FnZXM6IGlucHV0Lm1lc3NhZ2VzLnNsaWNlKCksXG4gICAgICAgICAgdGV4dDogY2hvaWNlLm1lc3NhZ2UuY29udGVudCxcbiAgICAgICAgICB0b29sQ2FsbCxcbiAgICAgICAgICB0b29sUmVzdWx0OiB0b29sQ2FsbFJlc3VsdCxcbiAgICAgICAgICBzdGVwVXNhZ2UsXG4gICAgICAgICAgdG90YWxVc2FnZTogT2JqZWN0LmFzc2lnbih7fSwgdG90YWxVc2FnZSksXG4gICAgICAgIH0pXG5cbiAgICAgICAgcHVzaE5ld01lc3NhZ2VzKGlucHV0Lm1lc3NhZ2VzLCBjaG9pY2UubWVzc2FnZSBhcyBUb29sQ2FsbEFzc2lzdGFudE1lc3NhZ2UsIHRvb2xDYWxsUmVzdWx0KSAvLyDnlKjosIPnlKjnu5Pmnpzkv67mlLnmnIDmlrDnmoTmtojmga9cblxuICAgICAgICBjdXJyZW50UmVzID0gYXdhaXQgZG9HZW5lcmF0ZSgpIC8vIOW+queOr+WvueivnVxuICAgICAgICBjdXJyZW50UmVzLnJhd1Jlc3BvbnNlICYmIHJhd1Jlc3BvbnNlcy5wdXNoKGN1cnJlbnRSZXMucmF3UmVzcG9uc2UpXG4gICAgICAgIGN1cnJlbnRTdGVwICs9IDFcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0ZXh0OiAnJyxcbiAgICAgICAgICBtZXNzYWdlczogaW5wdXQubWVzc2FnZXMsXG4gICAgICAgICAgdXNhZ2U6IHRvdGFsVXNhZ2UsXG4gICAgICAgICAgZXJyb3I6IGUsXG4gICAgICAgICAgcmF3UmVzcG9uc2VzLFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgbGFzdENob2ljZSA9IGN1cnJlbnRSZXM/LmNob2ljZXM/LlswXVxuICAgIGNvbnN0IGxhc3RNZXNzYWdlID0gbGFzdENob2ljZT8ubWVzc2FnZVxuXG4gICAgY29uc3QgdGV4dCA9IGxhc3RNZXNzYWdlPy5jb250ZW50ID8/ICcnXG4gICAgY29uc3QgbWVzc2FnZXMgPSBsYXN0TWVzc2FnZSA/IFsuLi5pbnB1dC5tZXNzYWdlcywgbGFzdE1lc3NhZ2VdIDogaW5wdXQubWVzc2FnZXNcblxuICAgIGNvbnN0IHN0ZXBVc2FnZSA9IGNyZWF0ZVNvbGlkVXNhZ2UoY3VycmVudFJlcy51c2FnZSlcbiAgICBhZGRUb1VzYWdlKHRvdGFsVXNhZ2UsIHN0ZXBVc2FnZSlcblxuICAgIGF3YWl0IG9uU3RlcEZpbmlzaD8uKHtcbiAgICAgIGZpbmlzaFJlYXNvbjogbGFzdENob2ljZS5maW5pc2hfcmVhc29uLFxuICAgICAgbWVzc2FnZXM6IG1lc3NhZ2VzLnNsaWNlKCksXG4gICAgICB0ZXh0LFxuICAgICAgdG9vbENhbGw6IGdldFRvb2xDYWxsRnJvbUdlbmVyYXRlKGN1cnJlbnRSZXMpLFxuICAgICAgdG9vbFJlc3VsdDogbnVsbCxcbiAgICAgIHN0ZXBVc2FnZSxcbiAgICAgIHRvdGFsVXNhZ2U6IE9iamVjdC5hc3NpZ24oe30sIHRvdGFsVXNhZ2UpLFxuICAgIH0pXG5cbiAgICByZXR1cm4ge1xuICAgICAgdGV4dCxcbiAgICAgIG1lc3NhZ2VzLFxuICAgICAgdXNhZ2U6IHRvdGFsVXNhZ2UsXG4gICAgICByYXdSZXNwb25zZXMsXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHN0cmVhbVRleHQoX2lucHV0OiBSZWFjdE1vZGVsSW5wdXQpOiBQcm9taXNlPHtcbiAgICBkYXRhU3RyZWFtOiBEb1N0cmVhbU91dHB1dFxuICAgIHRleHRTdHJlYW06IEFzeW5jSXRlcmFibGVSZWFkYWJsZVN0cmVhbTxzdHJpbmc+XG4gICAgbWVzc2FnZXM6IFByb21pc2U8QXJyYXk8Q2hhdE1vZGVsTWVzc2FnZT4+XG4gICAgdXNhZ2U6IFByb21pc2U8VXNhZ2U+XG4gICAgZXJyb3I/OiBhbnlcbiAgfT4ge1xuICAgIGNvbnN0IHRvdGFsVXNhZ2U6IFVzYWdlID0geyBjb21wbGV0aW9uX3Rva2VuczogMCwgcHJvbXB0X3Rva2VuczogMCwgdG90YWxfdG9rZW5zOiAwIH1cblxuICAgIGNvbnN0IFt7IG9uU3RlcEZpbmlzaCwgbWF4U3RlcHMgPSAxMCB9LCBpbnB1dF0gPSBwcm9jZXNzSW5wdXQoX2lucHV0KVxuICAgIGNvbnN0IGRvU3RyZWFtID0gKCkgPT4gdGhpcy5tb2RlbC5kb1N0cmVhbShpbnB1dCkgLy8g5ZCO57ut5Luj56CB5Lya55u05o6l5a+5IGlucHV0Lm1lc3NhZ2VzIOWOn+WcsOS/ruaUue+8jOi/memHjOS4gOebtOeUqOWQjOS4gOS4quWvueixoeWwseihjFxuICAgIGxldCBjdXJyZW50UmVzID0gYXdhaXQgZG9TdHJlYW0oKVxuICAgIGNvbnN0IGN1cnJlbnRTdGVwID0gMVxuICAgIGxldCByZWFkUmVzdWx0OiB7IG1lc3NhZ2U6IFRvb2xDYWxsQXNzaXN0YW50TWVzc2FnZTsgdXNhZ2U6IFVzYWdlIH0gfCBudWxsID0gbnVsbFxuXG4gICAgY29uc3QgcmVhZEN1cnJlbnRTdHJlYW0gPSAoKSA9PiB7XG4gICAgICBjb25zdCBbb2xkU3RyZWFtLCBuZXdTdHJlYW1dID0gY3VycmVudFJlcy50ZWUoKVxuICAgICAgY3VycmVudFJlcyA9IGNyZWF0ZUFzeW5jSXRlcmFibGUob2xkU3RyZWFtKVxuICAgICAgcmV0dXJuIHJlYWRGdW5jdGlvbkNhbGxTdHJlYW0obmV3U3RyZWFtKVxuICAgIH1cblxuICAgIC8vIFRPRE86IOS4gOasoeWvueivneacieWkmuS4qiB0b29sIGNhbGw/IOebruWJjeayoeaciei/meenjeeOsOixoe+8jOaaguaXtuS4jeWkhOeQhlxuICAgIC8vIOi/memHjOWSjCBnZW5lcmF0ZVRleHQg5LiN5aSq5LiA5qC377yM6Zmk5LqG6Kej5p6Q5Ye6IHRvb2xDYWxsIOWklu+8jOi/mOmcgOimgeS7jua1geS4reaehOmAoOWHuuWFtuS7luWujOaVtOeahOS/oeaBr1xuICAgIHdoaWxlIChjdXJyZW50U3RlcCA8IG1heFN0ZXBzICYmIChyZWFkUmVzdWx0ID0gYXdhaXQgcmVhZEN1cnJlbnRTdHJlYW0oKSkgIT0gbnVsbCkge1xuICAgICAgY29uc3QgeyBtZXNzYWdlOiBhc3Npc3RhbnRNZXNzYWdlLCB1c2FnZTogc3RlcFVzYWdlIH0gPSByZWFkUmVzdWx0XG4gICAgICBhZGRUb1VzYWdlKHRvdGFsVXNhZ2UsIHN0ZXBVc2FnZSlcblxuICAgICAgLy8g5b2T5Yik5pat6ZyA6KaB5bel5YW36LCD55So5pe2XG4gICAgICBjb25zdCB0b29sQ2FsbCA9IGFzc2lzdGFudE1lc3NhZ2UudG9vbF9jYWxscz8uWzBdIC8vIOi/meS4qiB0b29sQ2FsbCDkuIDlrprlrZjlnKhcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHRvb2xDYWxsUmVzdWx0ID0gYXdhaXQgY2FsbFRvb2wodG9vbENhbGwpIC8vIOiwg+eUqFxuXG4gICAgICAgIGF3YWl0IG9uU3RlcEZpbmlzaD8uKHtcbiAgICAgICAgICBmaW5pc2hSZWFzb246ICd0b29sX2NhbGxzJyxcbiAgICAgICAgICBtZXNzYWdlczogaW5wdXQubWVzc2FnZXMuc2xpY2UoKSxcbiAgICAgICAgICB0ZXh0OiBhc3Npc3RhbnRNZXNzYWdlLmNvbnRlbnQsXG4gICAgICAgICAgdG9vbENhbGwsXG4gICAgICAgICAgdG9vbFJlc3VsdDogdG9vbENhbGxSZXN1bHQsXG4gICAgICAgICAgc3RlcFVzYWdlLFxuICAgICAgICAgIHRvdGFsVXNhZ2U6IE9iamVjdC5hc3NpZ24oe30sIHRvdGFsVXNhZ2UpLFxuICAgICAgICB9KVxuXG4gICAgICAgIHB1c2hOZXdNZXNzYWdlcyhpbnB1dC5tZXNzYWdlcywgYXNzaXN0YW50TWVzc2FnZSwgdG9vbENhbGxSZXN1bHQpIC8vIOeUqOiwg+eUqOe7k+aenOS/ruaUueacgOaWsOeahOa2iOaBr1xuICAgICAgICBjdXJyZW50UmVzID0gYXdhaXQgZG9TdHJlYW0oKSAvLyDlvqrnjq/lr7nor51cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc3QgW3MxLCBzMl0gPSBjdXJyZW50UmVzLnRlZSgpXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbWVzc2FnZXM6IFByb21pc2UucmVzb2x2ZShpbnB1dC5tZXNzYWdlcyksXG4gICAgICAgICAgZGF0YVN0cmVhbTogY3JlYXRlQXN5bmNJdGVyYWJsZShzMSksXG4gICAgICAgICAgdGV4dFN0cmVhbTogY3JlYXRlQXN5bmNJdGVyYWJsZShzMi5waXBlVGhyb3VnaChuZXcgVHJhbnNmb3JtU3RyZWFtKHtcbiAgICAgICAgICAgIHRyYW5zZm9ybShjaHVuaywgY29udHJvbGxlcikge1xuICAgICAgICAgICAgICBjb25zdCBzdHIgPSBjaHVuaz8uY2hvaWNlcz8uWzBdPy5kZWx0YT8uY29udGVudFxuICAgICAgICAgICAgICBpZiAodHlwZW9mIHN0ciA9PT0gJ3N0cmluZycpIGNvbnRyb2xsZXIuZW5xdWV1ZShzdHIpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pLCksKSxcbiAgICAgICAgICB1c2FnZTogUHJvbWlzZS5yZXNvbHZlKHRvdGFsVXNhZ2UpLFxuICAgICAgICAgIGVycm9yOiBlLFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pyA5ZCO6L+U5Zue5pe277yM5pyJ5Yeg56eN5oOF5Ya177yaXG4gICAgICogMS4g5rKh6LaFIG1heFN0ZXAg5peg5bel5YW36LCD55SoXG4gICAgICogMi4g6LaF5LqGIG1heFN0ZXAg5pyJ5bel5YW36LCD55SoXG4gICAgICogMy4g6LaF5LqGIG1heFN0ZXAg5peg5bel5YW36LCD55SoXG4gICAgICogbmV2ZXIuIOayoei2hSBtYXhTdGVw77yM5pyJ5bel5YW36LCD55So77yM6L+Z5pe25YCZ5Lya6L+b5Yiw5LiK6Z2i55qEIHdoaWxlIOW+queOryBibG9jayDkuK3lpITnkIZcbiAgICAgKlxuICAgICAqIOWFtuS4rSAxLiAzLiDlj6/ku6XlkIjlubbvvIzmsqHmnInlt6XlhbfosIPnlKjlsLHlupTor6Xnm7TmjqXov5Tlm57vvIzml6DorrogbWF4U3RlcFxuICAgICAqXG4gICAgICog5omA5Lul5ZCI5bm25Li677yaXG4gICAgICogMS4g5peg5bel5YW36LCD55SoXG4gICAgICogMi4g5pyJ5bel5YW36LCD55So77yM5L2G5piv6LaF6L+HIG1heFN0ZXBcbiAgICAgKlxuICAgICAqIOi/meS4pOenjeaDheWGtemDveayoei/m+WIsCB3aGlsZSDlvqrnjq8gYmxvY2sg5Lit5aSE55CGXG4gICAgICog5oiR5Lus6ZyA6KaBIGEuIOWhniBtZXNzYWdlIGIuIOeulyBVc2FnZSBjLiDosIPnlKggb25TdGVwRmluaXNoXG4gICAgICovXG5cbiAgICByZWFkUmVzdWx0ID0gYXdhaXQgcmVhZEN1cnJlbnRTdHJlYW0oKVxuXG4gICAgaWYgKHJlYWRSZXN1bHQpIHtcbiAgICAgIC8vIOaDheWGtSAyIOacieW3peWFt+iwg+eUqO+8jOS9huaYr+i2hei/hyBtYXhTdGVwXG4gICAgICBjb25zdCB7IG1lc3NhZ2UsIHVzYWdlIH0gPSByZWFkUmVzdWx0XG4gICAgICBhZGRUb1VzYWdlKHRvdGFsVXNhZ2UsIHVzYWdlKVxuXG4gICAgICBjb25zdCBtZXNzYWdlcyA9IFsuLi5pbnB1dC5tZXNzYWdlcywgbWVzc2FnZV1cblxuICAgICAgb25TdGVwRmluaXNoKHtcbiAgICAgICAgbWVzc2FnZXM6IG1lc3NhZ2VzLnNsaWNlKCksXG4gICAgICAgIGZpbmlzaFJlYXNvbjogJ3Rvb2xfY2FsbCcsXG4gICAgICAgIHN0ZXBVc2FnZTogdXNhZ2UsXG4gICAgICAgIHRleHQ6IG1lc3NhZ2UuY29udGVudCxcbiAgICAgICAgdG9vbENhbGw6IG1lc3NhZ2UudG9vbF9jYWxsc1swXSxcbiAgICAgICAgdG90YWxVc2FnZTogT2JqZWN0LmFzc2lnbih7fSwgdG90YWxVc2FnZSksXG4gICAgICB9KVxuXG4gICAgICBjb25zdCBbczEsIHMyXSA9IGN1cnJlbnRSZXMudGVlKClcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG1lc3NhZ2VzOiBQcm9taXNlLnJlc29sdmUoWy4uLmlucHV0Lm1lc3NhZ2VzLCBtZXNzYWdlXSksXG4gICAgICAgIGRhdGFTdHJlYW06IGNyZWF0ZUFzeW5jSXRlcmFibGUoczEpLFxuICAgICAgICB0ZXh0U3RyZWFtOiBjcmVhdGVBc3luY0l0ZXJhYmxlKHMyLnBpcGVUaHJvdWdoKG5ldyBUcmFuc2Zvcm1TdHJlYW0oe1xuICAgICAgICAgIHRyYW5zZm9ybShjaHVuaywgY29udHJvbGxlcikge1xuICAgICAgICAgICAgY29uc3Qgc3RyID0gY2h1bms/LmNob2ljZXM/LlswXT8uZGVsdGE/LmNvbnRlbnRcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3RyID09PSAnc3RyaW5nJykgY29udHJvbGxlci5lbnF1ZXVlKHN0cilcbiAgICAgICAgICB9LFxuICAgICAgICB9KSwpLCksXG4gICAgICAgIHVzYWdlOiBQcm9taXNlLnJlc29sdmUodG90YWxVc2FnZSksXG4gICAgICB9XG4gICAgfVxuICAgIC8vIOaDheWGtSAxIOaXoOW3peWFt+iwg+eUqFxuICAgIGNvbnN0IG1lc3NhZ2VQcm9taXNlID0gY3JlYXRlUHJvbWlzZTxBcnJheTxDaGF0TW9kZWxNZXNzYWdlPj4oKVxuICAgIGNvbnN0IHVzYWdlUHJvbWlzZSA9IGNyZWF0ZVByb21pc2U8VXNhZ2U+KClcblxuICAgIGNvbnN0IG1lc3NhZ2U6IENoYXRNb2RlbE1lc3NhZ2UgPSB7XG4gICAgICByb2xlOiAnYXNzaXN0YW50JyxcbiAgICAgIGNvbnRlbnQ6ICcnLFxuICAgIH1cbiAgICBsZXQgZmluaXNoUmVhc29uID0gJydcbiAgICBjb25zdCBzdGVwVXNhZ2U6IFVzYWdlID0geyBjb21wbGV0aW9uX3Rva2VuczogMCwgcHJvbXB0X3Rva2VuczogMCwgdG90YWxfdG9rZW5zOiAwIH1cblxuICAgIGNvbnN0IG9yaWdpblN0cmVhbSA9IGN1cnJlbnRSZXMucGlwZVRocm91Z2gobmV3IFRyYW5zZm9ybVN0cmVhbSh7XG4gICAgICB0cmFuc2Zvcm0oY2h1bmssIGNvbnRyb2xsZXIpIHtcbiAgICAgICAgLy8g5LiN5pS55Y+YIGNodW5rIOWGheWuue+8jOWPquaYr+aLpuaIquS4i+WGheWuueaLvOacgOWQjueahOe7k+aenFxuICAgICAgICBjb25zdCBjb250ZW50ID0gY2h1bms/LmNob2ljZXM/LlswXT8uZGVsdGE/LmNvbnRlbnRcbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIG1lc3NhZ2UuY29udGVudCArPSBjb250ZW50XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZWFzb24gPSBjaHVuaz8uY2hvaWNlcz8uWzBdPy5maW5pc2hfcmVhc29uXG4gICAgICAgIGlmIChyZWFzb24pIGZpbmlzaFJlYXNvbiA9IHJlYXNvblxuXG4gICAgICAgIC8vIFRPRE86IOS4jeWQjOWkp+aooeWei+eahCBzdHJlYW0gdXNhZ2Ug5qC85byP5LiN5LiA5qC377yM5ZCO57ut5Y+v6IO96KaB6LCD5pW0LlxuICAgICAgICAvLyBodW55dWFuIOavj+S4qiBjaHVuayDpg73kvJrmnIkgdXNhZ2XvvIzpgJDmraXlop7liqDvvIzku6XmnIDlkI7kuIDkuKrnmoTkuLrlh4Y7XG4gICAgICAgIC8vIHpoaXB1IOacgOWQjiBjaHVuayDkvJrmnIkgdXNhZ2U7XG4gICAgICAgIGlmIChjaHVuaz8udXNhZ2U/LmNvbXBsZXRpb25fdG9rZW5zKSBzdGVwVXNhZ2UuY29tcGxldGlvbl90b2tlbnMgPSBjaHVuay51c2FnZS5jb21wbGV0aW9uX3Rva2Vuc1xuICAgICAgICBpZiAoY2h1bms/LnVzYWdlPy5wcm9tcHRfdG9rZW5zKSBzdGVwVXNhZ2UucHJvbXB0X3Rva2VucyA9IGNodW5rLnVzYWdlLnByb21wdF90b2tlbnNcbiAgICAgICAgaWYgKGNodW5rPy51c2FnZT8udG90YWxfdG9rZW5zKSBzdGVwVXNhZ2UudG90YWxfdG9rZW5zID0gY2h1bmsudXNhZ2UudG90YWxfdG9rZW5zXG5cbiAgICAgICAgY29udHJvbGxlci5lbnF1ZXVlKGNodW5rKVxuICAgICAgfSxcbiAgICAgIGZsdXNoKCkge1xuICAgICAgICBtZXNzYWdlUHJvbWlzZS5yZXMoWy4uLmlucHV0Lm1lc3NhZ2VzLCBtZXNzYWdlXSlcbiAgICAgICAgYWRkVG9Vc2FnZSh0b3RhbFVzYWdlLCBzdGVwVXNhZ2UpXG4gICAgICAgIHVzYWdlUHJvbWlzZS5yZXMoT2JqZWN0LmFzc2lnbih7fSwgdG90YWxVc2FnZSkpXG4gICAgICAgIG9uU3RlcEZpbmlzaD8uKHtcbiAgICAgICAgICBtZXNzYWdlczogWy4uLmlucHV0Lm1lc3NhZ2VzLCBtZXNzYWdlXSxcbiAgICAgICAgICBmaW5pc2hSZWFzb24sXG4gICAgICAgICAgdGV4dDogbWVzc2FnZS5jb250ZW50LFxuICAgICAgICAgIHN0ZXBVc2FnZSxcbiAgICAgICAgICB0b3RhbFVzYWdlOiBPYmplY3QuYXNzaWduKHt9LCB0b3RhbFVzYWdlKSxcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgfSksKVxuXG4gICAgY29uc3QgW3MxLCBzMl0gPSBvcmlnaW5TdHJlYW0udGVlKClcblxuICAgIHJldHVybiB7XG4gICAgICBtZXNzYWdlczogbWVzc2FnZVByb21pc2UucHJvbWlzZSxcbiAgICAgIGRhdGFTdHJlYW06IGNyZWF0ZUFzeW5jSXRlcmFibGUoczEpLFxuICAgICAgdGV4dFN0cmVhbTogY3JlYXRlQXN5bmNJdGVyYWJsZShzMi5waXBlVGhyb3VnaChuZXcgVHJhbnNmb3JtU3RyZWFtKHtcbiAgICAgICAgdHJhbnNmb3JtKGNodW5rLCBjb250cm9sbGVyKSB7XG4gICAgICAgICAgY29uc3QgY29udGVudCA9IGNodW5rPy5jaG9pY2VzPy5bMF0/LmRlbHRhPy5jb250ZW50XG4gICAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgY29udHJvbGxlci5lbnF1ZXVlKGNvbnRlbnQpXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgfSksKSwpLFxuICAgICAgdXNhZ2U6IHVzYWdlUHJvbWlzZS5wcm9taXNlLFxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRUb29sQ2FsbEZyb21HZW5lcmF0ZShvdXRwdXQ6IERvR2VuZXJhdGVPdXRwdXQpIHtcbiAgY29uc3QgY2hvaWNlID0gb3V0cHV0Py5jaG9pY2VzPy5bMF1cblxuICBpZiAoIWNob2ljZSkgcmV0dXJuIG51bGxcblxuICBjb25zdCB7IGZpbmlzaF9yZWFzb24sIG1lc3NhZ2UgfSA9IGNob2ljZVxuXG4gIGlmIChmaW5pc2hfcmVhc29uICE9PSAndG9vbF9jYWxscycpIHJldHVybiBudWxsXG4gIGlmICghbWVzc2FnZSkgcmV0dXJuIG51bGxcbiAgaWYgKCFpc1Rvb2xDYWxsQXNzaXN0YW50TWVzc2FnZShtZXNzYWdlKSkgcmV0dXJuIG51bGxcblxuICByZXR1cm4gbWVzc2FnZS50b29sX2NhbGxzWzBdXG59XG5cbmZ1bmN0aW9uIHB1c2hOZXdNZXNzYWdlcyhcbiAgbWVzc2FnZXM6IEFycmF5PENoYXRNb2RlbE1lc3NhZ2U+LFxuICBhc3Npc3RhbnRNZXNzYWdlOiBUb29sQ2FsbEFzc2lzdGFudE1lc3NhZ2UsXG4gIHRvb2xDYWxsUmVzdWx0OiB1bmtub3duLFxuKSB7XG4gIG1lc3NhZ2VzLnB1c2goYXNzaXN0YW50TWVzc2FnZSwge1xuICAgIHJvbGU6ICd0b29sJyxcbiAgICB0b29sX2NhbGxfaWQ6IGFzc2lzdGFudE1lc3NhZ2UudG9vbF9jYWxsc1swXS5pZCxcbiAgICBjb250ZW50OiBKU09OLnN0cmluZ2lmeSh0b29sQ2FsbFJlc3VsdCksXG4gIH0pXG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlYWRGdW5jdGlvbkNhbGxTdHJlYW0oc3RyZWFtOiBSZWFkYWJsZVN0cmVhbTxCYXNlRG9TdHJlYW1PdXRwdXRDaHVuaz4sKTogUHJvbWlzZTx7IG1lc3NhZ2U6IFRvb2xDYWxsQXNzaXN0YW50TWVzc2FnZTsgdXNhZ2U6IFVzYWdlIH0gfCBudWxsPiB7XG4gIGNvbnN0IHN0ZXBVc2FnZTogVXNhZ2UgPSB7IGNvbXBsZXRpb25fdG9rZW5zOiAwLCBwcm9tcHRfdG9rZW5zOiAwLCB0b3RhbF90b2tlbnM6IDAgfVxuICBjb25zdCBhU3RyZWFtID0gY3JlYXRlQXN5bmNJdGVyYWJsZShzdHJlYW0pXG5cbiAgY29uc3QgcmV0VG9vbENhbGw6IFRvb2xDYWxsID0ge1xuICAgIGlkOiAnJyxcbiAgICBmdW5jdGlvbjoge1xuICAgICAgbmFtZTogJycsXG4gICAgICBhcmd1bWVudHM6ICcnLFxuICAgIH0sXG4gICAgdHlwZTogJycsXG4gIH1cblxuICBjb25zdCByZXRNZXNzYWdlOiBUb29sQ2FsbEFzc2lzdGFudE1lc3NhZ2UgPSB7XG4gICAgcm9sZTogJ2Fzc2lzdGFudCcsXG4gICAgY29udGVudDogJycsXG4gICAgdG9vbF9jYWxsczogW3JldFRvb2xDYWxsXSxcbiAgfVxuXG4gIGZvciBhd2FpdCAoY29uc3QgY2h1bmsgb2YgYVN0cmVhbSkge1xuICAgIGNvbnN0IGNob2ljZSA9IGNodW5rPy5jaG9pY2VzWzBdXG4gICAgaWYgKCFjaG9pY2UpIHJldHVybiBudWxsXG5cbiAgICBjb25zdCB7IGZpbmlzaF9yZWFzb24sIGRlbHRhIH0gPSBjaG9pY2VcblxuICAgIGlmIChmaW5pc2hfcmVhc29uICE9PSAndG9vbF9jYWxscycpIHJldHVybiBudWxsXG4gICAgaWYgKCFkZWx0YSkgY29udGludWVcblxuICAgIGlmIChkZWx0YS5jb250ZW50KSByZXRNZXNzYWdlLmNvbnRlbnQgKz0gZGVsdGEuY29udGVudFxuXG4gICAgaWYgKCEoJ3Rvb2xfY2FsbHMnIGluIGRlbHRhKSkgY29udGludWVcbiAgICBjb25zdCB0b29sQ2FsbCA9IGRlbHRhPy50b29sX2NhbGxzPy5bMF1cbiAgICBpZiAodG9vbENhbGw/LmlkKSByZXRUb29sQ2FsbC5pZCA9IHRvb2xDYWxsLmlkXG4gICAgaWYgKHRvb2xDYWxsPy50eXBlKSByZXRUb29sQ2FsbC50eXBlID0gdG9vbENhbGwudHlwZVxuICAgIGlmICh0b29sQ2FsbD8uZnVuY3Rpb24/Lm5hbWUpIHJldFRvb2xDYWxsLmZ1bmN0aW9uLm5hbWUgPSB0b29sQ2FsbC5mdW5jdGlvbi5uYW1lXG4gICAgaWYgKHRvb2xDYWxsPy5mdW5jdGlvbj8uYXJndW1lbnRzKSByZXRUb29sQ2FsbC5mdW5jdGlvbi5hcmd1bWVudHMgKz0gdG9vbENhbGwuZnVuY3Rpb24uYXJndW1lbnRzXG5cbiAgICAvLyBUT0RPOiDkuI3lkIzlpKfmqKHlnovnmoQgc3RyZWFtIHVzYWdlIOagvOW8j+S4jeS4gOagt++8jOWQjue7reWPr+iDveimgeiwg+aVtC5cbiAgICAvLyBodW55dWFuIOavj+S4qiBjaHVuayDpg73kvJrmnIkgdXNhZ2XvvIzpgJDmraXlop7liqDvvIzku6XmnIDlkI7kuIDkuKrnmoTkuLrlh4Y7XG4gICAgLy8gemhpcHUg5pyA5ZCOIGNodW5rIOS8muaciSB1c2FnZTtcbiAgICBpZiAoY2h1bms/LnVzYWdlPy5jb21wbGV0aW9uX3Rva2Vucykgc3RlcFVzYWdlLmNvbXBsZXRpb25fdG9rZW5zID0gY2h1bmsudXNhZ2UuY29tcGxldGlvbl90b2tlbnNcbiAgICBpZiAoY2h1bms/LnVzYWdlPy5wcm9tcHRfdG9rZW5zKSBzdGVwVXNhZ2UucHJvbXB0X3Rva2VucyA9IGNodW5rLnVzYWdlLnByb21wdF90b2tlbnNcbiAgICBpZiAoY2h1bms/LnVzYWdlPy50b3RhbF90b2tlbnMpIHN0ZXBVc2FnZS50b3RhbF90b2tlbnMgPSBjaHVuay51c2FnZS50b3RhbF90b2tlbnNcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbWVzc2FnZTogcmV0TWVzc2FnZSxcbiAgICB1c2FnZTogc3RlcFVzYWdlLFxuICB9XG59XG5cbmV4cG9ydCBjb25zdCB0b29sTWFwID0gbmV3IE1hcDxzdHJpbmcsIENhbGxhYmxlRnVuY3Rpb24+KClcblxuZnVuY3Rpb24gY2FsbFRvb2wodG9vbENhbGw6IFRvb2xDYWxsKSB7XG4gIHJldHVybiB0b29sTWFwLmdldCh0b29sQ2FsbC5mdW5jdGlvbi5uYW1lKShKU09OLnBhcnNlKHRvb2xDYWxsLmZ1bmN0aW9uLmFyZ3VtZW50cykpXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNvbGlkVXNhZ2UodXNhZ2U/OiBQYXJ0aWFsPFVzYWdlPik6IFVzYWdlIHtcbiAgcmV0dXJuIHtcbiAgICBjb21wbGV0aW9uX3Rva2VuczogdXNhZ2U/LmNvbXBsZXRpb25fdG9rZW5zID8/IDAsXG4gICAgcHJvbXB0X3Rva2VuczogdXNhZ2U/LnByb21wdF90b2tlbnMgPz8gMCxcbiAgICB0b3RhbF90b2tlbnM6IHVzYWdlPy50b3RhbF90b2tlbnMgPz8gMCxcbiAgfVxufVxuXG5mdW5jdGlvbiBhZGRUb1VzYWdlKHRhcmdldFVzYWdlOiBVc2FnZSwgc291cmNlVXNhZ2U6IFVzYWdlKSB7XG4gIHRhcmdldFVzYWdlLmNvbXBsZXRpb25fdG9rZW5zICs9IHNvdXJjZVVzYWdlLmNvbXBsZXRpb25fdG9rZW5zXG4gIHRhcmdldFVzYWdlLnByb21wdF90b2tlbnMgKz0gc291cmNlVXNhZ2UucHJvbXB0X3Rva2Vuc1xuICB0YXJnZXRVc2FnZS50b3RhbF90b2tlbnMgKz0gc291cmNlVXNhZ2UudG90YWxfdG9rZW5zXG59XG4iXX0=
}, function(modId) { var map = {"../utils":1739103120825}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1739103120841, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleChatModel = void 0;
var SimpleChatModel = (function () {
    function SimpleChatModel() {
    }
    return SimpleChatModel;
}());
exports.SimpleChatModel = SimpleChatModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBO0lBQUE7SUFJQSxDQUFDO0lBQUQsc0JBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQUpxQiwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTaW1wbGVDaGF0TW9kZWwge1xuICBwdWJsaWMgYWJzdHJhY3QgZG9HZW5lcmF0ZShkYXRhOiBCYXNlQ2hhdE1vZGVsSW5wdXQpOiBQcm9taXNlPERvR2VuZXJhdGVPdXRwdXQ+XG5cbiAgcHVibGljIGFic3RyYWN0IGRvU3RyZWFtKGRhdGE6IEJhc2VDaGF0TW9kZWxJbnB1dCk6IFByb21pc2U8RG9TdHJlYW1PdXRwdXQ+XG59XG5cbnR5cGUgUmF3UmVzcG9uc2UgPSB7IHJhd1Jlc3BvbnNlPzogYW55IH1cblxuZXhwb3J0IHR5cGUgRG9HZW5lcmF0ZU91dHB1dCA9IEJhc2VEb0dlbmVyYXRlT3V0cHV0ICYgUmF3UmVzcG9uc2VcblxuZXhwb3J0IHR5cGUgRG9TdHJlYW1PdXRwdXQgPSBBc3luY0l0ZXJhYmxlUmVhZGFibGVTdHJlYW08QmFzZURvU3RyZWFtT3V0cHV0Q2h1bmsgJiBSYXdSZXNwb25zZT5cblxuZXhwb3J0IHR5cGUgQ2hhdE1vZGVsQ29uc3RydWN0b3IgPSB0eXBlb2YgU2ltcGxlQ2hhdE1vZGVsXG5cbmV4cG9ydCB0eXBlIEFzeW5jSXRlcmFibGVSZWFkYWJsZVN0cmVhbTxUPiA9IFJlYWRhYmxlU3RyZWFtPFQ+ICYge1xuICBbU3ltYm9sLmFzeW5jSXRlcmF0b3JdOiAoKSA9PiB7IG5leHQoKTogUHJvbWlzZTxJdGVyYXRvclJlc3VsdDxUPj4gfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElNb2RlbFJlcUlucHV0IHtcbiAgdXJsOiBzdHJpbmdcbiAgaGVhZGVycz86IFJlY29yZDxzdHJpbmcsIHN0cmluZz5cbiAgZGF0YT86IE9iamVjdFxuICBzdHJlYW0/OiBib29sZWFuXG59XG5cbmV4cG9ydCB0eXBlIE1vZGVsUmVxID0gPFQgZXh0ZW5kcyBJTW9kZWxSZXFJbnB1dD4oXG4gIHByb3BzOiBULFxuKSA9PiBUWydzdHJlYW0nXSBleHRlbmRzIHRydWUgPyBQcm9taXNlPFJlYWRhYmxlU3RyZWFtPFVpbnQ4QXJyYXk+PiA6IFByb21pc2U8T2JqZWN0PlxuXG5leHBvcnQgaW50ZXJmYWNlIElCb3RSZXFJbnB1dCB7XG4gIHVybDogc3RyaW5nXG4gIG1ldGhvZDogc3RyaW5nXG4gIGhlYWRlcnM/OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+XG4gIGRhdGE/OiBPYmplY3RcbiAgc3RyZWFtPzogYm9vbGVhblxufVxuXG5leHBvcnQgdHlwZSBCb3RSZXEgPSA8VCBleHRlbmRzIElCb3RSZXFJbnB1dD4oXG4gIHByb3BzOiBULFxuKSA9PiBUWydzdHJlYW0nXSBleHRlbmRzIHRydWUgPyBQcm9taXNlPFJlYWRhYmxlU3RyZWFtPFVpbnQ4QXJyYXk+PiA6IFByb21pc2U8T2JqZWN0PlxuXG5leHBvcnQgdHlwZSBVc2VyTWVzc2FnZSA9IHtcbiAgcm9sZTogJ3VzZXInXG4gIGNvbnRlbnQ6IHN0cmluZ1xufVxuXG5leHBvcnQgdHlwZSBTeXN0ZW1NZXNzYWdlID0ge1xuICByb2xlOiAnc3lzdGVtJ1xuICBjb250ZW50OiBzdHJpbmdcbn1cblxuZXhwb3J0IHR5cGUgQXNzaXN0YW50TWVzc2FnZSA9IFBsYWluQXNzaXN0YW50TWVzc2FnZSB8IFRvb2xDYWxsQXNzaXN0YW50TWVzc2FnZVxuXG5leHBvcnQgdHlwZSBQbGFpbkFzc2lzdGFudE1lc3NhZ2UgPSB7XG4gIHJvbGU6ICdhc3Npc3RhbnQnXG4gIGNvbnRlbnQ6IHN0cmluZ1xufVxuXG5leHBvcnQgdHlwZSBUb29sQ2FsbEFzc2lzdGFudE1lc3NhZ2UgPSB7XG4gIHJvbGU6ICdhc3Npc3RhbnQnXG4gIHRvb2xfY2FsbHM6IEFycmF5PFRvb2xDYWxsPlxuICBjb250ZW50Pzogc3RyaW5nXG59XG5cbmV4cG9ydCB0eXBlIFRvb2xNZXNzYWdlID0ge1xuICByb2xlOiAndG9vbCdcbiAgdG9vbF9jYWxsX2lkOiBzdHJpbmdcbiAgY29udGVudDogc3RyaW5nXG59XG5cbmV4cG9ydCB0eXBlIENoYXRNb2RlbE1lc3NhZ2UgPSBVc2VyTWVzc2FnZSB8IFN5c3RlbU1lc3NhZ2UgfCBBc3Npc3RhbnRNZXNzYWdlIHwgVG9vbE1lc3NhZ2VcblxuZXhwb3J0IHR5cGUgRnVuY3Rpb25Ub29sID0ge1xuICBuYW1lOiBzdHJpbmdcbiAgZGVzY3JpcHRpb246IHN0cmluZ1xuICBmbjogQ2FsbGFibGVGdW5jdGlvblxuICBwYXJhbWV0ZXJzOiBvYmplY3Rcbn1cblxuLy8gI3JlZ2lvbiDlpKfmqKHlnovmoIflh4bovpPlhaXnsbvlnotcbmV4cG9ydCBpbnRlcmZhY2UgQmFzZUNoYXRNb2RlbElucHV0IHtcbiAgbW9kZWw6IHN0cmluZ1xuICBtZXNzYWdlczogQXJyYXk8Q2hhdE1vZGVsTWVzc2FnZT5cbiAgdGVtcGVyYXR1cmU/OiBudW1iZXJcbiAgdG9wX3A/OiBudW1iZXJcbiAgdG9vbHM/OiBBcnJheTxNb2RlbFRvb2w+XG4gIHRvb2xfY2hvaWNlPzogJ25vbmUnIHwgJ2F1dG8nIHwgJ2N1c3RvbSdcbn1cblxuLyoqXG4gKiDnu5kgTExNIOWPkeivt+axguaXtuimgeS8oOeahOW3peWFt1xuICovXG5leHBvcnQgdHlwZSBNb2RlbFRvb2wgPSB7XG4gIHR5cGU6IHN0cmluZ1xuICBmdW5jdGlvbjogTW9kZWxUb29sRnVuY3Rpb25cbn1cblxuLyoqXG4gKiDnu5kgTExNIOWPkeivt+axguaXtuimgeS8oOeahOW3peWFt+WHveaVsFxuICovXG5leHBvcnQgdHlwZSBNb2RlbFRvb2xGdW5jdGlvbiA9IHtcbiAgbmFtZTogc3RyaW5nXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmdcbiAgLyoqXG4gICAqIOaPj+i/sOWHveaVsOWPguaVsOeahCBKU09OIFNjaGVtYVxuICAgKi9cbiAgcGFyYW1ldGVyczogb2JqZWN0XG59XG4vLyAjZW5kcmVnaW9uXG5cbi8vICNyZWdpb24g5aSn5qih5Z6L5qCH5YeG5ZON5bqU57G75Z6LXG5leHBvcnQgdHlwZSBUb29sQ2FsbCA9IHtcbiAgaWQ6IHN0cmluZ1xuICB0eXBlOiBzdHJpbmdcbiAgZnVuY3Rpb246IHsgbmFtZTogc3RyaW5nOyBhcmd1bWVudHM6IHN0cmluZyB9XG59XG5cbnR5cGUgRmluaXNoUmVhc29uID0gJ3Rvb2xfY2FsbHMnIHwgKHN0cmluZyAmIHt9KVxuXG5leHBvcnQgdHlwZSBVc2FnZSA9IHtcbiAgY29tcGxldGlvbl90b2tlbnM6IG51bWJlclxuICBwcm9tcHRfdG9rZW5zOiBudW1iZXJcbiAgdG90YWxfdG9rZW5zOiBudW1iZXJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBCYXNlRG9HZW5lcmF0ZU91dHB1dCB7XG4gIGNob2ljZXM/OiBBcnJheTx7XG4gICAgZmluaXNoX3JlYXNvbj86IEZpbmlzaFJlYXNvblxuICAgIG1lc3NhZ2U/OiBDaGF0TW9kZWxNZXNzYWdlXG4gIH0+XG4gIHVzYWdlPzogVXNhZ2Vcbn1cblxuZXhwb3J0IGludGVyZmFjZSBCYXNlRG9TdHJlYW1PdXRwdXRDaHVuayB7XG4gIGNob2ljZXM/OiBBcnJheTx7XG4gICAgZmluaXNoX3JlYXNvbj86IEZpbmlzaFJlYXNvblxuICAgIGRlbHRhPzogQ2hhdE1vZGVsTWVzc2FnZVxuICB9PlxuICB1c2FnZT86IFVzYWdlXG59XG4vLyAjZW5kcmVnaW9uXG4iXX0=
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1739103120822);
})()
//miniprogram-npm-outsideDeps=["web-streams-polyfill","@mattiasbuelens/web-streams-adapter","text-encoding-shim"]
//# sourceMappingURL=index.js.map