module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1739108424842, function(require, module, exports) {

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./types"));
__export(require("./utils"));

}, function(modId) {var map = {"./types":1739108424843,"./utils":1739108424844}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1739108424843, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var StorageType;
(function (StorageType) {
    StorageType["local"] = "local";
    StorageType["none"] = "none";
    StorageType["session"] = "session";
})(StorageType = exports.StorageType || (exports.StorageType = {}));
var AbstractSDKRequest = (function () {
    function AbstractSDKRequest() {
    }
    return AbstractSDKRequest;
}());
exports.AbstractSDKRequest = AbstractSDKRequest;
var AbstractStorage = (function () {
    function AbstractStorage() {
    }
    return AbstractStorage;
}());
exports.AbstractStorage = AbstractStorage;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1739108424844, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
function formatUrl(protocol, url, query) {
    if (query === void 0) { query = {}; }
    var urlHasQuery = /\?/.test(url);
    var queryString = '';
    for (var key in query) {
        if (queryString === '') {
            !urlHasQuery && (url += '?');
        }
        else {
            queryString += '&';
        }
        queryString += key + "=" + encodeURIComponent(query[key]);
    }
    url += queryString;
    if (/^http(s)?\:\/\//.test(url)) {
        return url;
    }
    return "" + protocol + url;
}
exports.formatUrl = formatUrl;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1739108424842);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map