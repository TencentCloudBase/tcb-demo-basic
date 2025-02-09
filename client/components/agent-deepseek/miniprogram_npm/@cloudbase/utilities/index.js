module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1739108424867, function(require, module, exports) {

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbortController = exports.jwt = exports.helpers = exports.utils = exports.events = exports.cache = exports.adapters = exports.constants = void 0;
var constants = __importStar(require("./constants"));
exports.constants = constants;
var adapters = __importStar(require("./adapters"));
exports.adapters = adapters;
var cache = __importStar(require("./libs/cache"));
exports.cache = cache;
var events = __importStar(require("./libs/events"));
exports.events = events;
var utils = __importStar(require("./libs/util"));
exports.utils = utils;
var helpers = __importStar(require("./helpers"));
exports.helpers = helpers;
var abortController_1 = __importDefault(require("./libs/abortController"));
exports.AbortController = abortController_1.default;
var jwt_decode_1 = __importDefault(require("jwt-decode"));
var jwt = {
    decode: jwt_decode_1.default,
};
exports.jwt = jwt;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxREFBd0M7QUFhL0IsOEJBQVM7QUFabEIsbURBQXNDO0FBWWxCLDRCQUFRO0FBWDVCLGtEQUFxQztBQVdQLHNCQUFLO0FBVm5DLG9EQUF1QztBQVVGLHdCQUFNO0FBVDNDLGlEQUFvQztBQVNTLHNCQUFLO0FBUmxELGlEQUFvQztBQVFnQiwwQkFBTztBQVAzRCwyRUFBb0Q7QUFPYywwQkFQM0QseUJBQWUsQ0FPMkQ7QUFOakYsMERBQWtDO0FBRWxDLElBQU0sR0FBRyxHQUFHO0lBQ1YsTUFBTSxFQUFFLG9CQUFTO0NBQ2xCLENBQUE7QUFFNEQsa0JBQUciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjb25zdGFudHMgZnJvbSAnLi9jb25zdGFudHMnXG5pbXBvcnQgKiBhcyBhZGFwdGVycyBmcm9tICcuL2FkYXB0ZXJzJ1xuaW1wb3J0ICogYXMgY2FjaGUgZnJvbSAnLi9saWJzL2NhY2hlJ1xuaW1wb3J0ICogYXMgZXZlbnRzIGZyb20gJy4vbGlicy9ldmVudHMnXG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL2xpYnMvdXRpbCdcbmltcG9ydCAqIGFzIGhlbHBlcnMgZnJvbSAnLi9oZWxwZXJzJ1xuaW1wb3J0IEFib3J0Q29udHJvbGxlciBmcm9tICcuL2xpYnMvYWJvcnRDb250cm9sbGVyJ1xuaW1wb3J0IGp3dERlY29kZSBmcm9tICdqd3QtZGVjb2RlJ1xuXG5jb25zdCBqd3QgPSB7XG4gIGRlY29kZTogand0RGVjb2RlLFxufVxuXG5leHBvcnQgeyBjb25zdGFudHMsIGFkYXB0ZXJzLCBjYWNoZSwgZXZlbnRzLCB1dGlscywgaGVscGVycywgand0LCBBYm9ydENvbnRyb2xsZXIgfVxuIl19
}, function(modId) {var map = {"./constants":1739108424868,"./adapters":1739108424871,"./libs/cache":1739108424874,"./libs/events":1739108424875,"./libs/util":1739108424873,"./helpers":1739108424876,"./libs/abortController":1739108424878}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1739108424868, function(require, module, exports) {

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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OATUH_LOGINTYPE = void 0;
__exportStar(require("./common"), exports);
__exportStar(require("./errors"), exports);
exports.OATUH_LOGINTYPE = 'constants';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29uc3RhbnRzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQXdCO0FBQ3hCLDJDQUF3QjtBQUVYLFFBQUEsZUFBZSxHQUFHLFdBQVcsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCAqIGZyb20gJy4vY29tbW9uJ1xuZXhwb3J0ICogZnJvbSAnLi9lcnJvcnMnXG5cbmV4cG9ydCBjb25zdCBPQVRVSF9MT0dJTlRZUEUgPSAnY29uc3RhbnRzJ1xuIl19
}, function(modId) { var map = {"./common":1739108424869,"./errors":1739108424870}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1739108424869, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.COMMUNITY_SITE_URL = exports.IS_DEBUG_MODE = exports.getProtocol = exports.setProtocol = exports.getSdkName = exports.setSdkName = void 0;
var sdkName = '@cloudbase/js-sdk';
function setSdkName(name) {
    sdkName = name;
}
exports.setSdkName = setSdkName;
function getSdkName() {
    return sdkName;
}
exports.getSdkName = getSdkName;
var PROTOCOL = 'https:';
function setProtocol(protocol) {
    PROTOCOL = protocol;
}
exports.setProtocol = setProtocol;
function getProtocol() {
    return PROTOCOL;
}
exports.getProtocol = getProtocol;
exports.IS_DEBUG_MODE = process.env.NODE_ENV === 'development';
exports.COMMUNITY_SITE_URL = 'https://support.qq.com/products/148793';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbnN0YW50cy9jb21tb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsSUFBSSxPQUFPLEdBQUcsbUJBQW1CLENBQUE7QUFDakMsU0FBZ0IsVUFBVSxDQUFDLElBQVk7SUFDckMsT0FBTyxHQUFHLElBQUksQ0FBQTtBQUNoQixDQUFDO0FBRkQsZ0NBRUM7QUFDRCxTQUFnQixVQUFVO0lBQ3hCLE9BQU8sT0FBTyxDQUFBO0FBQ2hCLENBQUM7QUFGRCxnQ0FFQztBQUVELElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQTtBQUV2QixTQUFnQixXQUFXLENBQUMsUUFBMEI7SUFDcEQsUUFBUSxHQUFHLFFBQVEsQ0FBQTtBQUNyQixDQUFDO0FBRkQsa0NBRUM7QUFFRCxTQUFnQixXQUFXO0lBQ3pCLE9BQU8sUUFBUSxDQUFBO0FBQ2pCLENBQUM7QUFGRCxrQ0FFQztBQUVZLFFBQUEsYUFBYSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLGFBQWEsQ0FBQTtBQUV0RCxRQUFBLGtCQUFrQixHQUFHLHdDQUF3QyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsibGV0IHNka05hbWUgPSAnQGNsb3VkYmFzZS9qcy1zZGsnXG5leHBvcnQgZnVuY3Rpb24gc2V0U2RrTmFtZShuYW1lOiBzdHJpbmcpIHtcbiAgc2RrTmFtZSA9IG5hbWVcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRTZGtOYW1lKCkge1xuICByZXR1cm4gc2RrTmFtZVxufVxuXG5sZXQgUFJPVE9DT0wgPSAnaHR0cHM6J1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0UHJvdG9jb2wocHJvdG9jb2w6ICdodHRwJyB8ICdodHRwcycpIHtcbiAgUFJPVE9DT0wgPSBwcm90b2NvbFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvdG9jb2woKSB7XG4gIHJldHVybiBQUk9UT0NPTFxufVxuLy8g5piv5ZCm5Li65byA5Y+R5qih5byPXG5leHBvcnQgY29uc3QgSVNfREVCVUdfTU9ERSA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnXG4vLyDpl67nrZTnpL7ljLrpk77mjqVcbmV4cG9ydCBjb25zdCBDT01NVU5JVFlfU0lURV9VUkwgPSAnaHR0cHM6Ly9zdXBwb3J0LnFxLmNvbS9wcm9kdWN0cy8xNDg3OTMnXG4iXX0=
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1739108424870, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.ERRORS = void 0;
exports.ERRORS = {
    INVALID_PARAMS: 'INVALID_PARAMS',
    INVALID_SYNTAX: 'INVALID_SYNTAX',
    INVALID_OPERATION: 'INVALID_OPERATION',
    OPERATION_FAIL: 'OPERATION_FAIL',
    NETWORK_ERROR: 'NETWORK_ERROR',
    UNKOWN_ERROR: 'UNKOWN_ERROR',
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbnN0YW50cy9lcnJvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSxNQUFNLEdBQUc7SUFDcEIsY0FBYyxFQUFFLGdCQUFnQjtJQUNoQyxjQUFjLEVBQUUsZ0JBQWdCO0lBQ2hDLGlCQUFpQixFQUFFLG1CQUFtQjtJQUN0QyxjQUFjLEVBQUUsZ0JBQWdCO0lBQ2hDLGFBQWEsRUFBRSxlQUFlO0lBQzlCLFlBQVksRUFBRSxjQUFjO0NBQzdCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgRVJST1JTID0ge1xuICBJTlZBTElEX1BBUkFNUzogJ0lOVkFMSURfUEFSQU1TJyxcbiAgSU5WQUxJRF9TWU5UQVg6ICdJTlZBTElEX1NZTlRBWCcsXG4gIElOVkFMSURfT1BFUkFUSU9OOiAnSU5WQUxJRF9PUEVSQVRJT04nLFxuICBPUEVSQVRJT05fRkFJTDogJ09QRVJBVElPTl9GQUlMJyxcbiAgTkVUV09SS19FUlJPUjogJ05FVFdPUktfRVJST1InLFxuICBVTktPV05fRVJST1I6ICdVTktPV05fRVJST1InLFxufVxuIl19
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1739108424871, function(require, module, exports) {

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDefaultAdapter = exports.useAdapters = exports.RUNTIME = void 0;
var Web = __importStar(require("./platforms/web"));
var util_1 = require("../libs/util");
var RUNTIME;
(function (RUNTIME) {
    RUNTIME["WEB"] = "web";
    RUNTIME["WX_MP"] = "wx_mp";
})(RUNTIME = exports.RUNTIME || (exports.RUNTIME = {}));
function useAdapters(adapters) {
    var adapterList = (0, util_1.isArray)(adapters) ? adapters : [adapters];
    for (var _i = 0, adapterList_1 = adapterList; _i < adapterList_1.length; _i++) {
        var adapter = adapterList_1[_i];
        var isMatch = adapter.isMatch, genAdapter = adapter.genAdapter, runtime = adapter.runtime;
        if (isMatch()) {
            return {
                adapter: genAdapter(),
                runtime: runtime,
            };
        }
    }
}
exports.useAdapters = useAdapters;
function useDefaultAdapter() {
    return {
        adapter: Web.genAdapter(),
        runtime: RUNTIME.WEB,
    };
}
exports.useDefaultAdapter = useDefaultAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYWRhcHRlcnMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxtREFBc0M7QUFDdEMscUNBQXNDO0FBRXRDLElBQVksT0FHWDtBQUhELFdBQVksT0FBTztJQUNqQixzQkFBVyxDQUFBO0lBQ1gsMEJBQWUsQ0FBQTtBQUNqQixDQUFDLEVBSFcsT0FBTyxHQUFQLGVBQU8sS0FBUCxlQUFPLFFBR2xCO0FBRUQsU0FBZ0IsV0FBVyxDQUFDLFFBQTZDO0lBQ3ZFLElBQU0sV0FBVyxHQUF1QixJQUFBLGNBQU8sRUFBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBOEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUE0QixDQUFDLENBQUE7SUFDM0gsS0FBc0IsVUFBVyxFQUFYLDJCQUFXLEVBQVgseUJBQVcsRUFBWCxJQUFXLEVBQUU7UUFBOUIsSUFBTSxPQUFPLG9CQUFBO1FBQ1IsSUFBQSxPQUFPLEdBQTBCLE9BQU8sUUFBakMsRUFBRSxVQUFVLEdBQWMsT0FBTyxXQUFyQixFQUFFLE9BQU8sR0FBSyxPQUFPLFFBQVosQ0FBWTtRQUNoRCxJQUFJLE9BQU8sRUFBRSxFQUFFO1lBQ2IsT0FBTztnQkFDTCxPQUFPLEVBQUUsVUFBVSxFQUFFO2dCQUNyQixPQUFPLFNBQUE7YUFDUixDQUFBO1NBQ0Y7S0FDRjtBQUNILENBQUM7QUFYRCxrQ0FXQztBQUVELFNBQWdCLGlCQUFpQjtJQUMvQixPQUFPO1FBQ0wsT0FBTyxFQUFFLEdBQUcsQ0FBQyxVQUFVLEVBQUU7UUFDekIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHO0tBQ3JCLENBQUE7QUFDSCxDQUFDO0FBTEQsOENBS0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDbG91ZGJhc2VBZGFwdGVyIH0gZnJvbSAnQGNsb3VkYmFzZS9hZGFwdGVyLWludGVyZmFjZSdcbmltcG9ydCAqIGFzIFdlYiBmcm9tICcuL3BsYXRmb3Jtcy93ZWInXG5pbXBvcnQgeyBpc0FycmF5IH0gZnJvbSAnLi4vbGlicy91dGlsJ1xuXG5leHBvcnQgZW51bSBSVU5USU1FIHtcbiAgV0VCID0gJ3dlYicsXG4gIFdYX01QID0gJ3d4X21wJyAvLyDlvq7kv6HlsI/nqIvluo9cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUFkYXB0ZXJzKGFkYXB0ZXJzOiBDbG91ZGJhc2VBZGFwdGVyfENsb3VkYmFzZUFkYXB0ZXJbXSkge1xuICBjb25zdCBhZGFwdGVyTGlzdDogQ2xvdWRiYXNlQWRhcHRlcltdID0gaXNBcnJheShhZGFwdGVycykgPyBhZGFwdGVycyBhcyBDbG91ZGJhc2VBZGFwdGVyW10gOiBbYWRhcHRlcnMgYXMgQ2xvdWRiYXNlQWRhcHRlcl1cbiAgZm9yIChjb25zdCBhZGFwdGVyIG9mIGFkYXB0ZXJMaXN0KSB7XG4gICAgY29uc3QgeyBpc01hdGNoLCBnZW5BZGFwdGVyLCBydW50aW1lIH0gPSBhZGFwdGVyXG4gICAgaWYgKGlzTWF0Y2goKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWRhcHRlcjogZ2VuQWRhcHRlcigpLFxuICAgICAgICBydW50aW1lLFxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlRGVmYXVsdEFkYXB0ZXIoKSB7XG4gIHJldHVybiB7XG4gICAgYWRhcHRlcjogV2ViLmdlbkFkYXB0ZXIoKSxcbiAgICBydW50aW1lOiBSVU5USU1FLldFQixcbiAgfVxufVxuIl19
}, function(modId) { var map = {"./platforms/web":1739108424872,"../libs/util":1739108424873}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1739108424872, function(require, module, exports) {

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.WebRequest = exports.genAdapter = void 0;
var adapter_interface_1 = require("@cloudbase/adapter-interface");
var util_1 = require("../../libs/util");
var common_1 = require("../../constants/common");
var WebRequest = (function (_super) {
    __extends(WebRequest, _super);
    function WebRequest(config) {
        var _this = _super.call(this) || this;
        var timeout = config.timeout, timeoutMsg = config.timeoutMsg, restrictedMethods = config.restrictedMethods;
        _this.timeout = timeout || 0;
        _this.timeoutMsg = timeoutMsg || '请求超时';
        _this.restrictedMethods = restrictedMethods || ['get', 'post', 'upload', 'download'];
        return _this;
    }
    WebRequest.prototype.get = function (options) {
        return this.request(__assign(__assign({}, options), { method: 'get' }), this.restrictedMethods.includes('get'));
    };
    WebRequest.prototype.post = function (options) {
        return this.request(__assign(__assign({}, options), { method: 'post' }), this.restrictedMethods.includes('post'));
    };
    WebRequest.prototype.put = function (options) {
        return this.request(__assign(__assign({}, options), { method: 'put' }));
    };
    WebRequest.prototype.upload = function (options) {
        var data = options.data, file = options.file, name = options.name, method = options.method, _a = options.headers, headers = _a === void 0 ? {} : _a;
        var reqMethod = { post: 'post', put: 'put' }[method === null || method === void 0 ? void 0 : method.toLowerCase()] || 'put';
        var formData = new FormData();
        if (reqMethod === 'post') {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
            formData.append('key', name);
            formData.append('file', file);
            return this.request(__assign(__assign({}, options), { data: formData, method: reqMethod }), this.restrictedMethods.includes('upload'));
        }
        return this.request(__assign(__assign({}, options), { method: 'put', headers: headers, body: file }), this.restrictedMethods.includes('upload'));
    };
    WebRequest.prototype.download = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var data, url, fileName, link, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.get(__assign(__assign({}, options), { headers: {}, responseType: 'blob' }))];
                    case 1:
                        data = (_a.sent()).data;
                        url = window.URL.createObjectURL(new Blob([data]));
                        fileName = decodeURIComponent(new URL(options.url).pathname.split('/').pop() || '');
                        link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', fileName);
                        link.style.display = 'none';
                        document.body.appendChild(link);
                        link.click();
                        window.URL.revokeObjectURL(url);
                        document.body.removeChild(link);
                        return [3, 3];
                    case 2:
                        e_1 = _a.sent();
                        return [3, 3];
                    case 3: return [2, new Promise(function (resolve) {
                            resolve({
                                statusCode: 200,
                                tempFilePath: options.url,
                            });
                        })];
                }
            });
        });
    };
    WebRequest.prototype.fetch = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var abortController, url, _a, enableAbort, _b, stream, signal, timer, res;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        abortController = new AbortController();
                        url = options.url, _a = options.enableAbort, enableAbort = _a === void 0 ? false : _a, _b = options.stream, stream = _b === void 0 ? false : _b, signal = options.signal;
                        if (signal) {
                            if (signal.aborted)
                                abortController.abort();
                            signal.addEventListener('abort', function () { return abortController.abort(); });
                        }
                        timer = null;
                        if (enableAbort && this.timeout) {
                            timer = setTimeout(function () {
                                console.warn(_this.timeoutMsg);
                                abortController.abort(new Error(_this.timeoutMsg));
                            }, this.timeout);
                        }
                        return [4, fetch(url, __assign(__assign({}, options), { signal: abortController.signal }))
                                .then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                var _a, _b, _c;
                                return __generator(this, function (_d) {
                                    switch (_d.label) {
                                        case 0:
                                            clearTimeout(timer);
                                            if (!response.ok) return [3, 1];
                                            _a = response;
                                            return [3, 3];
                                        case 1:
                                            _c = (_b = Promise).reject;
                                            return [4, response.json()];
                                        case 2:
                                            _a = _c.apply(_b, [_d.sent()]);
                                            _d.label = 3;
                                        case 3: return [2, _a];
                                    }
                                });
                            }); })
                                .catch(function (x) {
                                clearTimeout(timer);
                                return Promise.reject(x);
                            })];
                    case 1:
                        res = _c.sent();
                        return [2, {
                                data: stream ? res.body : res.json(),
                                statusCode: res.status,
                                header: res.headers,
                            }];
                }
            });
        });
    };
    WebRequest.prototype.request = function (options, enableAbort) {
        var _this = this;
        if (enableAbort === void 0) { enableAbort = false; }
        var method = String(options.method).toLowerCase() || 'get';
        return new Promise(function (resolve) {
            var url = options.url, _a = options.headers, headers = _a === void 0 ? {} : _a, data = options.data, responseType = options.responseType, withCredentials = options.withCredentials, body = options.body, onUploadProgress = options.onUploadProgress;
            var realUrl = (0, util_1.formatUrl)((0, common_1.getProtocol)(), url, method === 'get' ? data : {});
            var ajax = new XMLHttpRequest();
            ajax.open(method, realUrl);
            responseType && (ajax.responseType = responseType);
            Object.keys(headers).forEach(function (key) {
                ajax.setRequestHeader(key, headers[key]);
            });
            var timer;
            if (onUploadProgress) {
                ajax.upload.addEventListener('progress', onUploadProgress);
            }
            ajax.onreadystatechange = function () {
                var result = {};
                if (ajax.readyState === 4) {
                    var headers_1 = ajax.getAllResponseHeaders();
                    var arr = headers_1.trim().split(/[\r\n]+/);
                    var headerMap_1 = {};
                    arr.forEach(function (line) {
                        var parts = line.split(': ');
                        var header = parts.shift().toLowerCase();
                        var value = parts.join(': ');
                        headerMap_1[header] = value;
                    });
                    result.header = headerMap_1;
                    result.statusCode = ajax.status;
                    try {
                        result.data = responseType === 'blob' ? ajax.response : JSON.parse(ajax.responseText);
                    }
                    catch (e) {
                        result.data = responseType === 'blob' ? ajax.response : ajax.responseText;
                    }
                    clearTimeout(timer);
                    resolve(result);
                }
            };
            if (enableAbort && _this.timeout) {
                timer = setTimeout(function () {
                    console.warn(_this.timeoutMsg);
                    ajax.abort();
                }, _this.timeout);
            }
            var payload;
            if ((0, util_1.isFormData)(data)) {
                payload = data;
            }
            else if (headers['content-type'] === 'application/x-www-form-urlencoded') {
                payload = (0, util_1.toQueryString)(data);
            }
            else if (body) {
                payload = body;
            }
            else {
                payload = data ? JSON.stringify(data) : undefined;
            }
            if (withCredentials) {
                ajax.withCredentials = true;
            }
            ajax.send(payload);
        });
    };
    return WebRequest;
}(adapter_interface_1.AbstractSDKRequest));
exports.WebRequest = WebRequest;
function genAdapter() {
    var adapter = {
        root: window,
        reqClass: WebRequest,
        wsClass: WebSocket,
        localStorage: localStorage,
    };
    return adapter;
}
exports.genAdapter = genAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FkYXB0ZXJzL3BsYXRmb3Jtcy93ZWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrRUFTcUM7QUFDckMsd0NBQXNFO0FBQ3RFLGlEQUFvRDtBQUtwRDtJQUF5Qiw4QkFBa0I7SUFPekMsb0JBQVksTUFBc0I7UUFBbEMsWUFDRSxpQkFBTyxTQUtSO1FBSlMsSUFBQSxPQUFPLEdBQW9DLE1BQU0sUUFBMUMsRUFBRSxVQUFVLEdBQXdCLE1BQU0sV0FBOUIsRUFBRSxpQkFBaUIsR0FBSyxNQUFNLGtCQUFYLENBQVc7UUFDekQsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLElBQUksQ0FBQyxDQUFBO1FBQzNCLEtBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxJQUFJLE1BQU0sQ0FBQTtRQUN0QyxLQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQTs7SUFDckYsQ0FBQztJQUNNLHdCQUFHLEdBQVYsVUFBVyxPQUF3QjtRQUNqQyxPQUFPLElBQUksQ0FBQyxPQUFPLHVCQUVaLE9BQU8sS0FDVixNQUFNLEVBQUUsS0FBSyxLQUVmLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQ3ZDLENBQUE7SUFDSCxDQUFDO0lBQ00seUJBQUksR0FBWCxVQUFZLE9BQXdCO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLE9BQU8sdUJBRVosT0FBTyxLQUNWLE1BQU0sRUFBRSxNQUFNLEtBRWhCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQ3hDLENBQUE7SUFDSCxDQUFDO0lBQ00sd0JBQUcsR0FBVixVQUFXLE9B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QUMsT0FBTyxDQUFDLENBQUE7YUFDakI7WUFFRCxJQUFJLE9BQU8sQ0FBQTtZQUNYLElBQUksSUFBQSxpQkFBVSxFQUFDLElBQUksQ0FBQyxFQUFFO2dCQUVwQixPQUFPLEdBQUcsSUFBSSxDQUFBO2FBQ2Y7aUJBQU0sSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssbUNBQW1DLEVBQUU7Z0JBQzFFLE9BQU8sR0FBRyxJQUFBLG9CQUFhLEVBQUMsSUFBSSxDQUFDLENBQUE7YUFDOUI7aUJBQU0sSUFBSSxJQUFJLEVBQUU7Z0JBQ2YsT0FBTyxHQUFHLElBQUksQ0FBQTthQUNmO2lCQUFNO2dCQUVMLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQTthQUNsRDtZQUVELElBQUksZUFBZSxFQUFFO2dCQUNuQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQTthQUM1QjtZQUNELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDcEIsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0gsaUJBQUM7QUFBRCxDQUFDLEFBM01ELENBQXlCLHNDQUFrQixHQTJNMUM7QUFZb0IsZ0NBQVU7QUFWL0IsU0FBUyxVQUFVO0lBQ2pCLElBQU0sT0FBTyxHQUF3QjtRQUNuQyxJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLFlBQVksY0FBQTtLQUNiLENBQUE7SUFDRCxPQUFPLE9BQU8sQ0FBQTtBQUNoQixDQUFDO0FBRVEsZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBTREtBZGFwdGVySW50ZXJmYWNlLFxuICBBYnN0cmFjdFNES1JlcXVlc3QsXG4gIElSZXF1ZXN0T3B0aW9ucyxcbiAgUmVzcG9uc2VPYmplY3QsXG4gIElVcGxvYWRSZXF1ZXN0T3B0aW9ucyxcbiAgSVJlcXVlc3RDb25maWcsXG4gIElSZXF1ZXN0TWV0aG9kLFxuICBJRmV0Y2hPcHRpb25zLFxufSBmcm9tICdAY2xvdWRiYXNlL2FkYXB0ZXItaW50ZXJmYWNlJ1xuaW1wb3J0IHsgaXNGb3JtRGF0YSwgZm9ybWF0VXJsLCB0b1F1ZXJ5U3RyaW5nIH0gZnJvbSAnLi4vLi4vbGlicy91dGlsJ1xuaW1wb3J0IHsgZ2V0UHJvdG9jb2wgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvY29tbW9uJ1xuXG4vKipcbiAqIEBjbGFzcyBXZWJSZXF1ZXN0XG4gKi9cbmNsYXNzIFdlYlJlcXVlc3QgZXh0ZW5kcyBBYnN0cmFjdFNES1JlcXVlc3Qge1xuICAvLyDpu5jorqTkuI3pmZDotoXml7ZcbiAgcHJpdmF0ZSByZWFkb25seSB0aW1lb3V0OiBudW1iZXJcbiAgLy8g6LaF5pe25o+Q56S65paH5qGIXG4gIHByaXZhdGUgcmVhZG9ubHkgdGltZW91dE1zZzogc3RyaW5nXG4gIC8vIOi2heaXtuWPl+mZkOivt+axguexu+Wei++8jOm7mOiupOaJgOacieivt+axguWdh+WPl+mZkFxuICBwcml2YXRlIHJlYWRvbmx5IHJlc3RyaWN0ZWRNZXRob2RzOiBBcnJheTxJUmVxdWVzdE1ldGhvZD5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBJUmVxdWVzdENvbmZpZykge1xuICAgIHN1cGVyKClcbiAgICBjb25zdCB7IHRpbWVvdXQsIHRpbWVvdXRNc2csIHJlc3RyaWN0ZWRNZXRob2RzIH0gPSBjb25maWdcbiAgICB0aGlzLnRpbWVvdXQgPSB0aW1lb3V0IHx8IDBcbiAgICB0aGlzLnRpbWVvdXRNc2cgPSB0aW1lb3V0TXNnIHx8ICfor7fmsYLotoXml7YnXG4gICAgdGhpcy5yZXN0cmljdGVkTWV0aG9kcyA9IHJlc3RyaWN0ZWRNZXRob2RzIHx8IFsnZ2V0JywgJ3Bvc3QnLCAndXBsb2FkJywgJ2Rvd25sb2FkJ11cbiAgfVxuICBwdWJsaWMgZ2V0KG9wdGlvbnM6IElSZXF1ZXN0T3B0aW9ucyk6IFByb21pc2U8UmVzcG9uc2VPYmplY3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KFxuICAgICAge1xuICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgfSxcbiAgICAgIHRoaXMucmVzdHJpY3RlZE1ldGhvZHMuaW5jbHVkZXMoJ2dldCcpLFxuICAgIClcbiAgfVxuICBwdWJsaWMgcG9zdChvcHRpb25zOiBJUmVxdWVzdE9wdGlvbnMpOiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChcbiAgICAgIHtcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICB9LFxuICAgICAgdGhpcy5yZXN0cmljdGVkTWV0aG9kcy5pbmNsdWRlcygncG9zdCcpLFxuICAgIClcbiAgfVxuICBwdWJsaWMgcHV0KG9wdGlvbnM6IElSZXF1ZXN0T3B0aW9ucyk6IFByb21pc2U8UmVzcG9uc2VPYmplY3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBtZXRob2Q6ICdwdXQnLFxuICAgIH0pXG4gIH1cbiAgcHVibGljIHVwbG9hZChvcHRpb25zOiBJVXBsb2FkUmVxdWVzdE9wdGlvbnMpOiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PiB7XG4gICAgY29uc3QgeyBkYXRhLCBmaWxlLCBuYW1lLCBtZXRob2QsIGhlYWRlcnMgPSB7fSB9ID0gb3B0aW9uc1xuICAgIGNvbnN0IHJlcU1ldGhvZCA9IHsgcG9zdDogJ3Bvc3QnLCBwdXQ6ICdwdXQnIH1bbWV0aG9kPy50b0xvd2VyQ2FzZSgpXSB8fCAncHV0J1xuICAgIC8vIOS4iuS8oOaWueW8j+S4unBvc3Tml7bvvIzpnIDovazmjaLkuLpGb3JtRGF0YVxuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKClcbiAgICBpZiAocmVxTWV0aG9kID09PSAncG9zdCcpIHtcbiAgICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBkYXRhW2tleV0pXG4gICAgICB9KVxuICAgICAgZm9ybURhdGEuYXBwZW5kKCdrZXknLCBuYW1lKVxuICAgICAgZm9ybURhdGEuYXBwZW5kKCdmaWxlJywgZmlsZSlcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoXG4gICAgICAgIHtcbiAgICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICAgIGRhdGE6IGZvcm1EYXRhLFxuICAgICAgICAgIG1ldGhvZDogcmVxTWV0aG9kLFxuICAgICAgICB9LFxuICAgICAgICB0aGlzLnJlc3RyaWN0ZWRNZXRob2RzLmluY2x1ZGVzKCd1cGxvYWQnKSxcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChcbiAgICAgIHtcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgbWV0aG9kOiAncHV0JyxcbiAgICAgICAgaGVhZGVycyxcbiAgICAgICAgYm9keTogZmlsZSxcbiAgICAgIH0sXG4gICAgICB0aGlzLnJlc3RyaWN0ZWRNZXRob2RzLmluY2x1ZGVzKCd1cGxvYWQnKSxcbiAgICApXG4gIH1cbiAgcHVibGljIGFzeW5jIGRvd25sb2FkKG9wdGlvbnM6IElSZXF1ZXN0T3B0aW9ucyk6IFByb21pc2U8YW55PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgdGhpcy5nZXQoe1xuICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICBoZWFkZXJzOiB7fSwgLy8g5LiL6L296LWE5rqQ6K+35rGC5LiN57uP6L+Hc2VydmljZe+8jGhlYWRlcua4heepulxuICAgICAgICByZXNwb25zZVR5cGU6ICdibG9iJyxcbiAgICAgIH0pXG4gICAgICBjb25zdCB1cmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbZGF0YV0pKVxuICAgICAgY29uc3QgZmlsZU5hbWUgPSBkZWNvZGVVUklDb21wb25lbnQobmV3IFVSTChvcHRpb25zLnVybCkucGF0aG5hbWUuc3BsaXQoJy8nKS5wb3AoKSB8fCAnJylcbiAgICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcblxuICAgICAgbGluay5ocmVmID0gdXJsXG4gICAgICBsaW5rLnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCBmaWxlTmFtZSlcbiAgICAgIGxpbmsuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspXG4gICAgICBsaW5rLmNsaWNrKClcbiAgICAgIC8vIOWbnuaUtuWGheWtmFxuICAgICAgd2luZG93LlVSTC5yZXZva2VPYmplY3RVUkwodXJsKVxuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChsaW5rKVxuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICByZXNvbHZlKHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICB0ZW1wRmlsZVBhdGg6IG9wdGlvbnMudXJsLFxuICAgICAgfSlcbiAgICB9KVxuICB9XG4gIGFzeW5jIGZldGNoKG9wdGlvbnM6IElGZXRjaE9wdGlvbnMpOiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PiB7XG4gICAgY29uc3QgYWJvcnRDb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpXG4gICAgY29uc3QgeyB1cmwsIGVuYWJsZUFib3J0ID0gZmFsc2UsIHN0cmVhbSA9IGZhbHNlLCBzaWduYWwgfSA9IG9wdGlvbnNcblxuICAgIGlmIChzaWduYWwpIHtcbiAgICAgIGlmIChzaWduYWwuYWJvcnRlZCkgYWJvcnRDb250cm9sbGVyLmFib3J0KClcbiAgICAgIHNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsICgpID0+IGFib3J0Q29udHJvbGxlci5hYm9ydCgpKVxuICAgIH1cblxuICAgIGxldCB0aW1lciA9IG51bGxcbiAgICBpZiAoZW5hYmxlQWJvcnQgJiYgdGhpcy50aW1lb3V0KSB7XG4gICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb25zb2xlLndhcm4odGhpcy50aW1lb3V0TXNnKVxuICAgICAgICBhYm9ydENvbnRyb2xsZXIuYWJvcnQobmV3IEVycm9yKHRoaXMudGltZW91dE1zZykpXG4gICAgICB9LCB0aGlzLnRpbWVvdXQpXG4gICAgfVxuXG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2godXJsLCB7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgc2lnbmFsOiBhYm9ydENvbnRyb2xsZXIuc2lnbmFsLFxuICAgIH0pXG4gICAgICAudGhlbihhc3luYyAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgICAvLyA0MDQg562J562J5Lmf5Lya6L+bIHJlc29sdmXvvIzmiYDku6XopoHlho3pgJrov4cgb2sg5Yik5patXG4gICAgICAgIHJldHVybiByZXNwb25zZS5vayA/IHJlc3BvbnNlIDogUHJvbWlzZS5yZWplY3QoYXdhaXQgcmVzcG9uc2UuanNvbigpKVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoeCkgPT4ge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCh4KVxuICAgICAgfSlcblxuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiBzdHJlYW0gPyByZXMuYm9keSA6IHJlcy5qc29uKCksXG4gICAgICBzdGF0dXNDb2RlOiByZXMuc3RhdHVzLFxuICAgICAgaGVhZGVyOiByZXMuaGVhZGVycyxcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIEBwYXJhbSB7SVJlcXVlc3RPcHRpb25zfSBvcHRpb25zXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gZW5hYmxlQWJvcnQg5piv5ZCm6LaF5pe25Lit5pat6K+35rGCXG4gICAqL1xuICBwcm90ZWN0ZWQgcmVxdWVzdChvcHRpb25zOiBJUmVxdWVzdE9wdGlvbnMsIGVuYWJsZUFib3J0ID0gZmFsc2UpOiBQcm9taXNlPFJlc3BvbnNlT2JqZWN0PiB7XG4gICAgY29uc3QgbWV0aG9kID0gU3RyaW5nKG9wdGlvbnMubWV0aG9kKS50b0xvd2VyQ2FzZSgpIHx8ICdnZXQnXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBjb25zdCB7IHVybCwgaGVhZGVycyA9IHt9LCBkYXRhLCByZXNwb25zZVR5cGUsIHdpdGhDcmVkZW50aWFscywgYm9keSwgb25VcGxvYWRQcm9ncmVzcyB9ID0gb3B0aW9uc1xuICAgICAgY29uc3QgcmVhbFVybCA9IGZvcm1hdFVybChnZXRQcm90b2NvbCgpLCB1cmwsIG1ldGhvZCA9PT0gJ2dldCcgPyBkYXRhIDoge30pXG4gICAgICBjb25zdCBhamF4ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcbiAgICAgIGFqYXgub3BlbihtZXRob2QsIHJlYWxVcmwpXG4gICAgICByZXNwb25zZVR5cGUgJiYgKGFqYXgucmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlKVxuICAgICAgT2JqZWN0LmtleXMoaGVhZGVycykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGFqYXguc2V0UmVxdWVzdEhlYWRlcihrZXksIGhlYWRlcnNba2V5XSlcbiAgICAgIH0pXG4gICAgICBsZXQgdGltZXJcbiAgICAgIGlmIChvblVwbG9hZFByb2dyZXNzKSB7XG4gICAgICAgIGFqYXgudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgb25VcGxvYWRQcm9ncmVzcylcbiAgICAgIH1cbiAgICAgIGFqYXgub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQ6IFJlc3BvbnNlT2JqZWN0ID0ge31cbiAgICAgICAgaWYgKGFqYXgucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgIGNvbnN0IGhlYWRlcnMgPSBhamF4LmdldEFsbFJlc3BvbnNlSGVhZGVycygpXG4gICAgICAgICAgY29uc3QgYXJyID0gaGVhZGVycy50cmltKCkuc3BsaXQoL1tcXHJcXG5dKy8pXG4gICAgICAgICAgLy8gQ3JlYXRlIGEgbWFwIG9mIGhlYWRlciBuYW1lcyB0byB2YWx1ZXNcbiAgICAgICAgICBjb25zdCBoZWFkZXJNYXAgPSB7fVxuICAgICAgICAgIGFyci5mb3JFYWNoKChsaW5lKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYXJ0cyA9IGxpbmUuc3BsaXQoJzogJylcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlciA9IHBhcnRzLnNoaWZ0KCkudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBwYXJ0cy5qb2luKCc6ICcpXG4gICAgICAgICAgICBoZWFkZXJNYXBbaGVhZGVyXSA9IHZhbHVlXG4gICAgICAgICAgfSlcbiAgICAgICAgICByZXN1bHQuaGVhZGVyID0gaGVhZGVyTWFwXG4gICAgICAgICAgcmVzdWx0LnN0YXR1c0NvZGUgPSBhamF4LnN0YXR1c1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyDkuIrkvKBwb3N06K+35rGC6L+U5Zue5pWw5o2u5qC85byP5Li6eG1s77yM5q2k5aSE5a656ZSZXG4gICAgICAgICAgICByZXN1bHQuZGF0YSA9IHJlc3BvbnNlVHlwZSA9PT0gJ2Jsb2InID8gYWpheC5yZXNwb25zZSA6IEpTT04ucGFyc2UoYWpheC5yZXNwb25zZVRleHQpXG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmVzdWx0LmRhdGEgPSByZXNwb25zZVR5cGUgPT09ICdibG9iJyA/IGFqYXgucmVzcG9uc2UgOiBhamF4LnJlc3BvbnNlVGV4dFxuICAgICAgICAgIH1cbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChlbmFibGVBYm9ydCAmJiB0aGlzLnRpbWVvdXQpIHtcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLndhcm4odGhpcy50aW1lb3V0TXNnKVxuICAgICAgICAgIGFqYXguYWJvcnQoKVxuICAgICAgICB9LCB0aGlzLnRpbWVvdXQpXG4gICAgICB9XG4gICAgICAvLyDlpITnkIYgcGF5bG9hZFxuICAgICAgbGV0IHBheWxvYWRcbiAgICAgIGlmIChpc0Zvcm1EYXRhKGRhdGEpKSB7XG4gICAgICAgIC8vIEZvcm1EYXRh77yM5LiN5aSE55CGXG4gICAgICAgIHBheWxvYWQgPSBkYXRhXG4gICAgICB9IGVsc2UgaWYgKGhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddID09PSAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJykge1xuICAgICAgICBwYXlsb2FkID0gdG9RdWVyeVN0cmluZyhkYXRhKVxuICAgICAgfSBlbHNlIGlmIChib2R5KSB7XG4gICAgICAgIHBheWxvYWQgPSBib2R5XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyDlhbblroPmg4XlhrVcbiAgICAgICAgcGF5bG9hZCA9IGRhdGEgPyBKU09OLnN0cmluZ2lmeShkYXRhKSA6IHVuZGVmaW5lZFxuICAgICAgfVxuXG4gICAgICBpZiAod2l0aENyZWRlbnRpYWxzKSB7XG4gICAgICAgIGFqYXgud2l0aENyZWRlbnRpYWxzID0gdHJ1ZVxuICAgICAgfVxuICAgICAgYWpheC5zZW5kKHBheWxvYWQpXG4gICAgfSlcbiAgfVxufVxuXG5mdW5jdGlvbiBnZW5BZGFwdGVyKCkge1xuICBjb25zdCBhZGFwdGVyOiBTREtBZGFwdGVySW50ZXJmYWNlID0ge1xuICAgIHJvb3Q6IHdpbmRvdyxcbiAgICByZXFDbGFzczogV2ViUmVxdWVzdCxcbiAgICB3c0NsYXNzOiBXZWJTb2NrZXQsXG4gICAgbG9jYWxTdG9yYWdlLFxuICB9XG4gIHJldHVybiBhZGFwdGVyXG59XG5cbmV4cG9ydCB7IGdlbkFkYXB0ZXIsIFdlYlJlcXVlc3QgfVxuIl19
}, function(modId) { var map = {"../../libs/util":1739108424873,"../../constants/common":1739108424869}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1739108424873, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.transformPhone = exports.sleep = exports.printGroupLog = exports.throwError = exports.printInfo = exports.printError = exports.printWarn = exports.execCallback = exports.createPromiseCallback = exports.removeParam = exports.getHash = exports.getQuery = exports.toQueryString = exports.formatUrl = exports.generateRequestId = exports.genSeqId = exports.isFormData = exports.isInstanceOf = exports.isNull = exports.isPalinObject = exports.isUndefined = exports.isString = exports.isArray = void 0;
var constants_1 = require("../constants");
function isArray(val) {
    return Object.prototype.toString.call(val) === '[object Array]';
}
exports.isArray = isArray;
function isString(val) {
    return typeof val === 'string';
}
exports.isString = isString;
function isUndefined(val) {
    return typeof val === 'undefined';
}
exports.isUndefined = isUndefined;
function isPalinObject(val) {
    return Object.prototype.toString.call(val) === '[object Object]';
}
exports.isPalinObject = isPalinObject;
function isNull(val) {
    return Object.prototype.toString.call(val) === '[object Null]';
}
exports.isNull = isNull;
function isInstanceOf(instance, construct) {
    return instance instanceof construct;
}
exports.isInstanceOf = isInstanceOf;
function isFormData(val) {
    return Object.prototype.toString.call(val) === '[object FormData]';
}
exports.isFormData = isFormData;
function genSeqId() {
    return Math.random().toString(16)
        .slice(2);
}
exports.genSeqId = genSeqId;
function generateRequestId() {
    var d = new Date().getTime();
    var d2 = ((performance === null || performance === void 0 ? void 0 : performance.now) && (performance.now() * 1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;
        if (d > 0) {
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        }
        else {
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : ((r & 0x7) | 0x8)).toString(16);
    });
}
exports.generateRequestId = generateRequestId;
function formatUrl(PROTOCOL, url, query) {
    if (query === void 0) { query = {}; }
    var urlHasQuery = /\?/.test(url);
    var queryString = '';
    Object.keys(query).forEach(function (key) {
        if (queryString === '') {
            !urlHasQuery && (url += '?');
        }
        else {
            queryString += '&';
        }
        queryString += "".concat(key, "=").concat(encodeURIComponent(query[key]));
    });
    url += queryString;
    if (/^http(s)?:\/\//.test(url)) {
        return url;
    }
    return "".concat(PROTOCOL).concat(url);
}
exports.formatUrl = formatUrl;
function toQueryString(query) {
    if (query === void 0) { query = {}; }
    var queryString = [];
    Object.keys(query).forEach(function (key) {
        queryString.push("".concat(key, "=").concat(encodeURIComponent(query[key])));
    });
    return queryString.join('&');
}
exports.toQueryString = toQueryString;
function getQuery(name, url) {
    if (typeof window === 'undefined') {
        return false;
    }
    var u = url || window.location.search;
    var reg = new RegExp("(^|&)".concat(name, "=([^&]*)(&|$)"));
    var r = u.substr(u.indexOf('?') + 1).match(reg);
    return (r !== null && r !== undefined) ? r[2] : '';
}
exports.getQuery = getQuery;
var getHash = function (name) {
    if (typeof window === 'undefined') {
        return '';
    }
    var matches = window.location.hash.match(new RegExp("[#?&/]".concat(name, "=([^&#]*)")));
    return matches ? matches[1] : '';
};
exports.getHash = getHash;
function removeParam(key, sourceURL) {
    var rtn = sourceURL.split('?')[0];
    var param;
    var params = [];
    var queryString = sourceURL.indexOf('?') !== -1 ? sourceURL.split('?')[1] : '';
    if (queryString !== '') {
        params = queryString.split('&');
        for (var i = params.length - 1; i >= 0; i -= 1) {
            param = params[i].split('=')[0];
            if (param === key) {
                params.splice(i, 1);
            }
        }
        rtn = "".concat(rtn, "?").concat(params.join('&'));
    }
    return rtn;
}
exports.removeParam = removeParam;
function createPromiseCallback() {
    var cb;
    if (!Promise) {
        cb = function () { };
        cb.promise = {};
        var throwPromiseNotDefined = function () {
            throw new Error('Your Node runtime does support ES6 Promises. '
                + 'Set "global.Promise" to your preferred implementation of promises.');
        };
        Object.defineProperty(cb.promise, 'then', { get: throwPromiseNotDefined });
        Object.defineProperty(cb.promise, 'catch', { get: throwPromiseNotDefined });
        return cb;
    }
    var promise = new Promise(function (resolve, reject) {
        cb = function (err, data) {
            if (err)
                return reject(err);
            return resolve(data);
        };
    });
    cb.promise = promise;
    return cb;
}
exports.createPromiseCallback = createPromiseCallback;
function execCallback(fn, err, data) {
    if (data === void 0) { data = null; }
    if (fn && typeof fn === 'function') {
        return fn(err, data);
    }
    if (err) {
        throw err;
    }
    return data;
}
exports.execCallback = execCallback;
function printWarn(error, msg) {
    console.warn("[".concat((0, constants_1.getSdkName)(), "][").concat(error, "]:").concat(msg));
}
exports.printWarn = printWarn;
function printError(error, msg) {
    console.error({
        code: error,
        msg: "[".concat((0, constants_1.getSdkName)(), "][").concat(error, "]:").concat(msg),
    });
}
exports.printError = printError;
function printInfo(error, msg) {
    console.log("[".concat((0, constants_1.getSdkName)(), "][").concat(error, "]:").concat(msg));
}
exports.printInfo = printInfo;
function throwError(error, msg) {
    throw new Error(JSON.stringify({
        code: error,
        msg: "[".concat((0, constants_1.getSdkName)(), "][").concat(error, "]:").concat(msg),
    }));
}
exports.throwError = throwError;
function printGroupLog(options) {
    var title = options.title, _a = options.subtitle, subtitle = _a === void 0 ? '' : _a, _b = options.content, content = _b === void 0 ? [] : _b, _c = options.printTrace, printTrace = _c === void 0 ? false : _c, _d = options.collapsed, collapsed = _d === void 0 ? false : _d;
    if (collapsed) {
        console.groupCollapsed(title, subtitle);
    }
    else {
        console.group(title, subtitle);
    }
    for (var _i = 0, content_1 = content; _i < content_1.length; _i++) {
        var tip = content_1[_i];
        var type = tip.type, body = tip.body;
        switch (type) {
            case 'info':
                console.log(body);
                break;
            case 'warn':
                console.warn(body);
                break;
            case 'error':
                console.error(body);
                break;
        }
    }
    if (printTrace) {
        console.trace('stack trace:');
    }
    console.groupEnd();
}
exports.printGroupLog = printGroupLog;
var sleep = function (ms) {
    if (ms === void 0) { ms = 0; }
    return new Promise(function (r) { return setTimeout(r, ms); });
};
exports.sleep = sleep;
function transformPhone(phoneNumber) {
    return "+86".concat(phoneNumber);
}
exports.transformPhone = transformPhone;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWJzL3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsMENBQXlDO0FBRXpDLFNBQWdCLE9BQU8sQ0FBQyxHQUFRO0lBQzlCLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLGdCQUFnQixDQUFBO0FBQ2pFLENBQUM7QUFGRCwwQkFFQztBQUNELFNBQWdCLFFBQVEsQ0FBQyxHQUFRO0lBQy9CLE9BQU8sT0FBTyxHQUFHLEtBQUssUUFBUSxDQUFBO0FBQ2hDLENBQUM7QUFGRCw0QkFFQztBQUNELFNBQWdCLFdBQVcsQ0FBQyxHQUFRO0lBQ2xDLE9BQU8sT0FBTyxHQUFHLEtBQUssV0FBVyxDQUFBO0FBQ25DLENBQUM7QUFGRCxrQ0FFQztBQUNELFNBQWdCLGFBQWEsQ0FBQyxHQUFRO0lBQ3BDLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLGlCQUFpQixDQUFBO0FBQ2xFLENBQUM7QUFGRCxzQ0FFQztBQUNELFNBQWdCLE1BQU0sQ0FBQyxHQUFRO0lBQzdCLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLGVBQWUsQ0FBQTtBQUNoRSxDQUFDO0FBRkQsd0JBRUM7QUFDRCxTQUFnQixZQUFZLENBQUMsUUFBYSxFQUFFLFNBQWM7SUFDeEQsT0FBTyxRQUFRLFlBQVksU0FBUyxDQUFBO0FBQ3RDLENBQUM7QUFGRCxvQ0FFQztBQUNELFNBQWdCLFVBQVUsQ0FBQyxHQUFRO0lBQ2pDLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLG1CQUFtQixDQUFBO0FBQ3BFLENBQUM7QUFGRCxnQ0FFQztBQUNELFNBQWdCLFFBQVE7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QUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUE7S0FDL0I7SUFDRCxLQUFrQixVQUFPLEVBQVAsbUJBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU8sRUFBRTtRQUF0QixJQUFNLEdBQUcsZ0JBQUE7UUFDSixJQUFBLElBQUksR0FBVyxHQUFHLEtBQWQsRUFBRSxJQUFJLEdBQUssR0FBRyxLQUFSLENBQVE7UUFDMUIsUUFBUSxJQUFJLEVBQUU7WUFDWixLQUFLLE1BQU07Z0JBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDakIsTUFBSztZQUNQLEtBQUssTUFBTTtnQkFDVCxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUNsQixNQUFLO1lBQ1AsS0FBSyxPQUFPO2dCQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQ25CLE1BQUs7U0FDUjtLQUNGO0lBQ0QsSUFBSSxVQUFVLEVBQUU7UUFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFBO0tBQzlCO0lBQ0QsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFBO0FBQ3BCLENBQUM7QUF6QkQsc0NBeUJDO0FBRU0sSUFBTSxLQUFLLEdBQUcsVUFBQyxFQUFNO0lBQU4sbUJBQUEsRUFBQSxNQUFNO0lBQUssT0FBQSxJQUFJLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLFVBQVUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQWpCLENBQWlCLENBQUM7QUFBbkMsQ0FBbUMsQ0FBQTtBQUF2RCxRQUFBLEtBQUssU0FBa0Q7QUFFcEUsU0FBZ0IsY0FBYyxDQUFDLFdBQW1CO0lBQ2hELE9BQU8sYUFBTSxXQUFXLENBQUUsQ0FBQTtBQUM1QixDQUFDO0FBRkQsd0NBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBLViB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMnXG5pbXBvcnQgeyBnZXRTZGtOYW1lIH0gZnJvbSAnLi4vY29uc3RhbnRzJ1xuXG5leHBvcnQgZnVuY3Rpb24gaXNBcnJheSh2YWw6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5XSdcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyh2YWw6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZydcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWw6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCdcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc1BhbGluT2JqZWN0KHZhbDogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgT2JqZWN0XSdcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc051bGwodmFsOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBOdWxsXSdcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0luc3RhbmNlT2YoaW5zdGFuY2U6IGFueSwgY29uc3RydWN0OiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIGluc3RhbmNlIGluc3RhbmNlb2YgY29uc3RydWN0XG59XG5leHBvcnQgZnVuY3Rpb24gaXNGb3JtRGF0YSh2YWw6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZvcm1EYXRhXSdcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZW5TZXFJZCgpOiBzdHJpbmcge1xuICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygxNilcbiAgICAuc2xpY2UoMilcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVJlcXVlc3RJZCgpIHtcbiAgbGV0IGQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICBsZXQgZDIgPSAocGVyZm9ybWFuY2U/Lm5vdyAmJiAocGVyZm9ybWFuY2Uubm93KCkgKiAxMDAwKSkgfHwgMFxuICByZXR1cm4gJ3h4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLCAoYykgPT4ge1xuICAgIGxldCByID0gTWF0aC5yYW5kb20oKSAqIDE2XG4gICAgaWYgKGQgPiAwKSB7XG4gICAgICByID0gKGQgKyByKSAlIDE2IHwgMFxuICAgICAgZCA9IE1hdGguZmxvb3IoZCAvIDE2KVxuICAgIH0gZWxzZSB7XG4gICAgICByID0gKGQyICsgcikgJSAxNiB8IDBcbiAgICAgIGQyID0gTWF0aC5mbG9vcihkMiAvIDE2KVxuICAgIH1cbiAgICByZXR1cm4gKGMgPT09ICd4JyA/IHIgOiAoKHIgJiAweDcpIHwgMHg4KSkudG9TdHJpbmcoMTYpXG4gIH0pXG59XG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0VXJsKFBST1RPQ09MOiBzdHJpbmcsIHVybDogc3RyaW5nLCBxdWVyeTogS1Y8YW55PiA9IHt9KTogc3RyaW5nIHtcbiAgY29uc3QgdXJsSGFzUXVlcnkgPSAvXFw/Ly50ZXN0KHVybClcbiAgbGV0IHF1ZXJ5U3RyaW5nID0gJydcbiAgT2JqZWN0LmtleXMocXVlcnkpLmZvckVhY2goKGtleSkgPT4ge1xuICAgIGlmIChxdWVyeVN0cmluZyA9PT0gJycpIHtcbiAgICAgICF1cmxIYXNRdWVyeSAmJiAodXJsICs9ICc/JylcbiAgICB9IGVsc2Uge1xuICAgICAgcXVlcnlTdHJpbmcgKz0gJyYnXG4gICAgfVxuICAgIHF1ZXJ5U3RyaW5nICs9IGAke2tleX09JHtlbmNvZGVVUklDb21wb25lbnQocXVlcnlba2V5XSl9YFxuICB9KVxuICB1cmwgKz0gcXVlcnlTdHJpbmdcbiAgaWYgKC9eaHR0cChzKT86XFwvXFwvLy50ZXN0KHVybCkpIHtcbiAgICByZXR1cm4gdXJsXG4gIH1cbiAgcmV0dXJuIGAke1BST1RPQ09MfSR7dXJsfWBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvUXVlcnlTdHJpbmcocXVlcnk6IEtWPGFueT4gPSB7fSkge1xuICBjb25zdCBxdWVyeVN0cmluZyA9IFtdXG4gIE9iamVjdC5rZXlzKHF1ZXJ5KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICBxdWVyeVN0cmluZy5wdXNoKGAke2tleX09JHtlbmNvZGVVUklDb21wb25lbnQocXVlcnlba2V5XSl9YClcbiAgfSlcbiAgcmV0dXJuIHF1ZXJ5U3RyaW5nLmpvaW4oJyYnKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UXVlcnkobmFtZTogc3RyaW5nLCB1cmw/OiBzdHJpbmcpIHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgLy8g5Y+C5pWw77ya5Y+Y6YeP5ZCN77yMdXJs5Li656m65YiZ6KGo5LuO5b2T5YmN6aG16Z2i55qEdXJs5Lit5Y+WXG4gIGNvbnN0IHUgPSB1cmwgfHwgd2luZG93LmxvY2F0aW9uLnNlYXJjaFxuICBjb25zdCByZWcgPSBuZXcgUmVnRXhwKGAoXnwmKSR7bmFtZX09KFteJl0qKSgmfCQpYClcbiAgY29uc3QgciA9IHUuc3Vic3RyKHUuaW5kZXhPZignPycpICsgMSkubWF0Y2gocmVnKVxuICByZXR1cm4gKHIgIT09IG51bGwgJiYgciAhPT0gdW5kZWZpbmVkKSA/IHJbMl0gOiAnJ1xufVxuXG5leHBvcnQgY29uc3QgZ2V0SGFzaCA9IGZ1bmN0aW9uIChuYW1lOiBzdHJpbmcpIHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cbiAgY29uc3QgbWF0Y2hlcyA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLm1hdGNoKG5ldyBSZWdFeHAoYFsjPyYvXSR7bmFtZX09KFteJiNdKilgKSlcbiAgcmV0dXJuIG1hdGNoZXMgPyBtYXRjaGVzWzFdIDogJydcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVBhcmFtKGtleTogc3RyaW5nLCBzb3VyY2VVUkw6IHN0cmluZykge1xuICBsZXQgcnRuID0gc291cmNlVVJMLnNwbGl0KCc/JylbMF1cbiAgbGV0IHBhcmFtXG4gIGxldCBwYXJhbXMgPSBbXVxuICBjb25zdCBxdWVyeVN0cmluZyA9IHNvdXJjZVVSTC5pbmRleE9mKCc/JykgIT09IC0xID8gc291cmNlVVJMLnNwbGl0KCc/JylbMV0gOiAnJ1xuICBpZiAocXVlcnlTdHJpbmcgIT09ICcnKSB7XG4gICAgcGFyYW1zID0gcXVlcnlTdHJpbmcuc3BsaXQoJyYnKVxuICAgIGZvciAobGV0IGkgPSBwYXJhbXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpIC09IDEpIHtcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSAqL1xuICAgICAgcGFyYW0gPSBwYXJhbXNbaV0uc3BsaXQoJz0nKVswXVxuICAgICAgaWYgKHBhcmFtID09PSBrZXkpIHtcbiAgICAgICAgcGFyYW1zLnNwbGljZShpLCAxKVxuICAgICAgfVxuICAgIH1cbiAgICBydG4gPSBgJHtydG59PyR7cGFyYW1zLmpvaW4oJyYnKX1gXG4gIH1cbiAgcmV0dXJuIHJ0blxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUHJvbWlzZUNhbGxiYWNrKCkge1xuICBsZXQgY2I6IGFueVxuICBpZiAoIVByb21pc2UpIHtcbiAgICBjYiA9ICgpID0+IHsgfVxuICAgIGNiLnByb21pc2UgPSB7fVxuXG4gICAgY29uc3QgdGhyb3dQcm9taXNlTm90RGVmaW5lZCA9ICgpID0+IHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignWW91ciBOb2RlIHJ1bnRpbWUgZG9lcyBzdXBwb3J0IEVTNiBQcm9taXNlcy4gJ1xuICAgICAgICArICdTZXQgXCJnbG9iYWwuUHJvbWlzZVwiIHRvIHlvdXIgcHJlZmVycmVkIGltcGxlbWVudGF0aW9uIG9mIHByb21pc2VzLicpXG4gICAgfVxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNiLnByb21pc2UsICd0aGVuJywgeyBnZXQ6IHRocm93UHJvbWlzZU5vdERlZmluZWQgfSlcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY2IucHJvbWlzZSwgJ2NhdGNoJywgeyBnZXQ6IHRocm93UHJvbWlzZU5vdERlZmluZWQgfSlcbiAgICByZXR1cm4gY2JcbiAgfVxuXG4gIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY2IgPSAoZXJyLCBkYXRhKSA9PiB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gcmVqZWN0KGVycilcbiAgICAgIHJldHVybiByZXNvbHZlKGRhdGEpXG4gICAgfVxuICB9KVxuICBjYi5wcm9taXNlID0gcHJvbWlzZVxuICByZXR1cm4gY2Jcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWNDYWxsYmFjayhmbjogRnVuY3Rpb24gfCBudWxsIHwgdW5kZWZpbmVkLCBlcnI6IGFueSwgZGF0YSA9IG51bGwpIHtcbiAgaWYgKGZuICYmIHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBmbihlcnIsIGRhdGEpXG4gIH1cbiAgaWYgKGVycikge1xuICAgIHRocm93IGVyclxuICB9XG4gIHJldHVybiBkYXRhXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmludFdhcm4oZXJyb3I6IHN0cmluZywgbXNnOiBzdHJpbmcpIHtcbiAgY29uc29sZS53YXJuKGBbJHtnZXRTZGtOYW1lKCl9XVske2Vycm9yfV06JHttc2d9YClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByaW50RXJyb3IoZXJyb3I6IHN0cmluZywgbXNnOiBzdHJpbmcpIHtcbiAgY29uc29sZS5lcnJvcih7XG4gICAgY29kZTogZXJyb3IsXG4gICAgbXNnOiBgWyR7Z2V0U2RrTmFtZSgpfV1bJHtlcnJvcn1dOiR7bXNnfWAsXG4gIH0pXG59XG5leHBvcnQgZnVuY3Rpb24gcHJpbnRJbmZvKGVycm9yOiBzdHJpbmcsIG1zZzogc3RyaW5nKSB7XG4gIGNvbnNvbGUubG9nKGBbJHtnZXRTZGtOYW1lKCl9XVske2Vycm9yfV06JHttc2d9YClcbn1cbmV4cG9ydCBmdW5jdGlvbiB0aHJvd0Vycm9yKGVycm9yOiBzdHJpbmcsIG1zZzogc3RyaW5nKSB7XG4gIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgY29kZTogZXJyb3IsXG4gICAgbXNnOiBgWyR7Z2V0U2RrTmFtZSgpfV1bJHtlcnJvcn1dOiR7bXNnfWAsXG4gIH0pKVxufVxuXG5pbnRlcmZhY2UgSVByaW50R3JvdXBMb2dPcHRpb25zIHtcbiAgdGl0bGU6IHN0cmluZztcbiAgc3VidGl0bGU6IHN0cmluZyB8IG9iamVjdDtcbiAgY29udGVudDoge1xuICAgIHR5cGU6ICdpbmZvJyB8ICd3YXJuJyB8ICdlcnJvcicsXG4gICAgYm9keTogc3RyaW5nIHwgRXJyb3I7XG4gIH1bXTtcbiAgcHJpbnRUcmFjZT86IGJvb2xlYW47XG4gIGNvbGxhcHNlZD86IGJvb2xlYW47XG59XG5leHBvcnQgZnVuY3Rpb24gcHJpbnRHcm91cExvZyhvcHRpb25zOiBJUHJpbnRHcm91cExvZ09wdGlvbnMpIHtcbiAgY29uc3QgeyB0aXRsZSwgc3VidGl0bGUgPSAnJywgY29udGVudCA9IFtdLCBwcmludFRyYWNlID0gZmFsc2UsIGNvbGxhcHNlZCA9IGZhbHNlIH0gPSBvcHRpb25zXG4gIGlmIChjb2xsYXBzZWQpIHtcbiAgICBjb25zb2xlLmdyb3VwQ29sbGFwc2VkKHRpdGxlLCBzdWJ0aXRsZSlcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmdyb3VwKHRpdGxlLCBzdWJ0aXRsZSlcbiAgfVxuICBmb3IgKGNvbnN0IHRpcCBvZiBjb250ZW50KSB7XG4gICAgY29uc3QgeyB0eXBlLCBib2R5IH0gPSB0aXBcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2luZm8nOlxuICAgICAgICBjb25zb2xlLmxvZyhib2R5KVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnd2Fybic6XG4gICAgICAgIGNvbnNvbGUud2Fybihib2R5KVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICBjb25zb2xlLmVycm9yKGJvZHkpXG4gICAgICAgIGJyZWFrXG4gICAgfVxuICB9XG4gIGlmIChwcmludFRyYWNlKSB7XG4gICAgY29uc29sZS50cmFjZSgnc3RhY2sgdHJhY2U6JylcbiAgfVxuICBjb25zb2xlLmdyb3VwRW5kKClcbn1cblxuZXhwb3J0IGNvbnN0IHNsZWVwID0gKG1zID0gMCkgPT4gbmV3IFByb21pc2UociA9PiBzZXRUaW1lb3V0KHIsIG1zKSlcblxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zZm9ybVBob25lKHBob25lTnVtYmVyOiBzdHJpbmcpIHtcbiAgcmV0dXJuIGArODYke3Bob25lTnVtYmVyfWBcbn1cblxuIl19
}, function(modId) { var map = {"../constants":1739108424868}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1739108424874, function(require, module, exports) {

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.CloudbaseCache = void 0;
var adapter_interface_1 = require("@cloudbase/adapter-interface");
var util_1 = require("./util");
var constants_1 = require("../constants");
var TcbCacheObject = (function (_super) {
    __extends(TcbCacheObject, _super);
    function TcbCacheObject(root) {
        var _this = _super.call(this) || this;
        _this.root = root;
        if (!root.tcbCacheObject) {
            root.tcbCacheObject = {};
        }
        return _this;
    }
    TcbCacheObject.prototype.setItem = function (key, value) {
        this.root.tcbCacheObject[key] = value;
    };
    TcbCacheObject.prototype.getItem = function (key) {
        return this.root.tcbCacheObject[key];
    };
    TcbCacheObject.prototype.removeItem = function (key) {
        delete this.root.tcbCacheObject[key];
    };
    TcbCacheObject.prototype.clear = function () {
        delete this.root.tcbCacheObject;
    };
    return TcbCacheObject;
}(adapter_interface_1.AbstractStorage));
function createStorage(persistence, adapter) {
    switch (persistence) {
        case 'local':
            if (!adapter.localStorage) {
                (0, util_1.printWarn)(constants_1.ERRORS.INVALID_PARAMS, 'localStorage is not supported on current platform');
                return new TcbCacheObject(adapter.root);
            }
            return adapter.localStorage;
        case 'none':
            return new TcbCacheObject(adapter.root);
        default:
            if (!adapter.localStorage) {
                (0, util_1.printWarn)(constants_1.ERRORS.INVALID_PARAMS, 'localStorage is not supported on current platform');
                return new TcbCacheObject(adapter.root);
            }
            return adapter.localStorage;
    }
}
var CloudbaseCache = (function () {
    function CloudbaseCache(config) {
        this.keys = {};
        var persistence = config.persistence, _a = config.platformInfo, platformInfo = _a === void 0 ? {} : _a, _b = config.keys, keys = _b === void 0 ? {} : _b;
        this.platformInfo = platformInfo;
        if (!this.storage) {
            this.persistenceTag = this.platformInfo.adapter.primaryStorage || persistence;
            this.storage = createStorage(this.persistenceTag, this.platformInfo.adapter);
            this.keys = keys;
        }
    }
    Object.defineProperty(CloudbaseCache.prototype, "mode", {
        get: function () {
            return this.storage.mode || 'sync';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CloudbaseCache.prototype, "persistence", {
        get: function () {
            return this.persistenceTag;
        },
        enumerable: false,
        configurable: true
    });
    CloudbaseCache.prototype.setStore = function (key, value, version) {
        if (this.mode === 'async') {
            (0, util_1.printWarn)(constants_1.ERRORS.INVALID_OPERATION, 'current platform\'s storage is asynchronous, please use setStoreAsync insteed');
            return;
        }
        if (!this.storage) {
            return;
        }
        try {
            var val = {
                version: version || 'localCachev1',
                content: value,
            };
            this.storage.setItem(key, JSON.stringify(val));
        }
        catch (e) {
            throw new Error(JSON.stringify({
                code: constants_1.ERRORS.OPERATION_FAIL,
                msg: "[".concat((0, constants_1.getSdkName)(), "][").concat(constants_1.ERRORS.OPERATION_FAIL, "]setStore failed"),
                info: e,
            }));
        }
        return;
    };
    CloudbaseCache.prototype.setStoreAsync = function (key, value, version) {
        return __awaiter(this, void 0, void 0, function () {
            var val, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.storage) {
                            return [2];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        val = {
                            version: version || 'localCachev1',
                            content: value,
                        };
                        return [4, this.storage.setItem(key, JSON.stringify(val))];
                    case 2:
                        _a.sent();
                        return [3, 4];
                    case 3:
                        e_1 = _a.sent();
                        return [2];
                    case 4: return [2];
                }
            });
        });
    };
    CloudbaseCache.prototype.getStore = function (key, version) {
        var _a;
        if (this.mode === 'async') {
            (0, util_1.printWarn)(constants_1.ERRORS.INVALID_OPERATION, 'current platform\'s storage is asynchronous, please use getStoreAsync insteed');
            return;
        }
        try {
            if (typeof process !== 'undefined' && ((_a = process.env) === null || _a === void 0 ? void 0 : _a.tcb_token)) {
                return process.env.tcb_token;
            }
            if (!this.storage) {
                return '';
            }
        }
        catch (e) {
            return '';
        }
        version = version || 'localCachev1';
        var content = this.storage.getItem(key);
        if (!content) {
            return '';
        }
        if (content.indexOf(version) >= 0) {
            var d = JSON.parse(content);
            return d.content;
        }
        return '';
    };
    CloudbaseCache.prototype.getStoreAsync = function (key, version) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var content, d;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        try {
                            if (typeof process !== 'undefined' && ((_a = process.env) === null || _a === void 0 ? void 0 : _a.tcb_token)) {
                                return [2, process.env.tcb_token];
                            }
                            if (!this.storage) {
                                return [2, ''];
                            }
                        }
                        catch (e) {
                            return [2, ''];
                        }
                        version = version || 'localCachev1';
                        return [4, this.storage.getItem(key)];
                    case 1:
                        content = _b.sent();
                        if (!content) {
                            return [2, ''];
                        }
                        if (content.indexOf(version) >= 0) {
                            d = JSON.parse(content);
                            return [2, d.content];
                        }
                        return [2, ''];
                }
            });
        });
    };
    CloudbaseCache.prototype.removeStore = function (key) {
        if (this.mode === 'async') {
            (0, util_1.printWarn)(constants_1.ERRORS.INVALID_OPERATION, 'current platform\'s storage is asynchronous, please use removeStoreAsync insteed');
            return;
        }
        this.storage.removeItem(key);
    };
    CloudbaseCache.prototype.removeStoreAsync = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.storage.removeItem(key)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return CloudbaseCache;
}());
exports.CloudbaseCache = CloudbaseCache;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGlicy9jYWNoZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrRUFBcUc7QUFHckcsK0JBQWtDO0FBQ2xDLDBDQUFpRDtBQUtqRDtJQUE2QixrQ0FBZTtJQUUxQyx3QkFBWSxJQUFTO1FBQXJCLFlBQ0UsaUJBQU8sU0FLUjtRQUpDLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFBO1NBQ3pCOztJQUNILENBQUM7SUFDTSxnQ0FBTyxHQUFkLFVBQWUsR0FBVyxFQUFFLEtBQVU7UUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFBO0lBQ3ZDLENBQUM7SUFDTSxnQ0FBTyxHQUFkLFVBQWUsR0FBVztRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3RDLENBQUM7SUFDTSxtQ0FBVSxHQUFqQixVQUFrQixHQUFXO1FBQzNCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDdEMsQ0FBQztJQUNNLDhCQUFLLEdBQVo7UUFDRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFBO0lBQ2pDLENBQUM7SUFDSCxxQkFBQztBQUFELENBQUMsQUFyQkQsQ0FBNkIsbUNBQWUsR0FxQjNDO0FBSUQsU0FBUyxhQUFhLENBQUMsV0FBd0IsRUFBRSxPQUE0QjtJQUMzRSxRQUFRLFdBQVcsRUFBRTtRQUNuQixLQUFLLE9BQU87WUFDVixJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFB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O0lBQzlCLENBQUM7SUFDWSx5Q0FBZ0IsR0FBN0IsVUFBOEIsR0FBVzs7Ozs0QkFDdkMsV0FBTSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBQTs7d0JBQWxDLFNBQWtDLENBQUE7Ozs7O0tBQ25DO0lBQ0gscUJBQUM7QUFBRCxDQUFDLEFBeElELElBd0lDO0FBeElZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RvcmFnZUludGVyZmFjZSwgQWJzdHJhY3RTdG9yYWdlLCBTREtBZGFwdGVySW50ZXJmYWNlIH0gZnJvbSAnQGNsb3VkYmFzZS9hZGFwdGVyLWludGVyZmFjZSdcbmltcG9ydCB7IElDbG91ZGJhc2VDYWNoZSwgSUNhY2hlQ29uZmlnIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9jYWNoZSdcbmltcG9ydCB7IEtWLCBQZXJzaXN0ZW5jZSwgSUNsb3VkYmFzZVBsYXRmb3JtSW5mbyB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMnXG5pbXBvcnQgeyBwcmludFdhcm4gfSBmcm9tICcuL3V0aWwnXG5pbXBvcnQgeyBFUlJPUlMsIGdldFNka05hbWUgfSBmcm9tICcuLi9jb25zdGFudHMnXG5cbi8qKlxuICogcGVyc2l0ZW5jZT1ub25l5pe255m75b2V5oCB5L+d5a2Y5Zyo5YaF5a2Y5LitXG4gKi9cbmNsYXNzIFRjYkNhY2hlT2JqZWN0IGV4dGVuZHMgQWJzdHJhY3RTdG9yYWdlIHtcbiAgcHJpdmF0ZSByZWFkb25seSByb290OiBhbnlcbiAgY29uc3RydWN0b3Iocm9vdDogYW55KSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMucm9vdCA9IHJvb3RcbiAgICBpZiAoIXJvb3QudGNiQ2FjaGVPYmplY3QpIHtcbiAgICAgIHJvb3QudGNiQ2FjaGVPYmplY3QgPSB7fVxuICAgIH1cbiAgfVxuICBwdWJsaWMgc2V0SXRlbShrZXk6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIHRoaXMucm9vdC50Y2JDYWNoZU9iamVjdFtrZXldID0gdmFsdWVcbiAgfVxuICBwdWJsaWMgZ2V0SXRlbShrZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLnJvb3QudGNiQ2FjaGVPYmplY3Rba2V5XVxuICB9XG4gIHB1YmxpYyByZW1vdmVJdGVtKGtleTogc3RyaW5nKSB7XG4gICAgZGVsZXRlIHRoaXMucm9vdC50Y2JDYWNoZU9iamVjdFtrZXldXG4gIH1cbiAgcHVibGljIGNsZWFyKCkge1xuICAgIGRlbGV0ZSB0aGlzLnJvb3QudGNiQ2FjaGVPYmplY3RcbiAgfVxufVxuLyoqXG4gKiDlt6XljoLlh73mlbBcbiAqL1xuZnVuY3Rpb24gY3JlYXRlU3RvcmFnZShwZXJzaXN0ZW5jZTogUGVyc2lzdGVuY2UsIGFkYXB0ZXI6IFNES0FkYXB0ZXJJbnRlcmZhY2UpOiBTdG9yYWdlSW50ZXJmYWNlIHtcbiAgc3dpdGNoIChwZXJzaXN0ZW5jZSkge1xuICAgIGNhc2UgJ2xvY2FsJzpcbiAgICAgIGlmICghYWRhcHRlci5sb2NhbFN0b3JhZ2UpIHtcbiAgICAgICAgcHJpbnRXYXJuKEVSUk9SUy5JTlZBTElEX1BBUkFNUywgJ2xvY2FsU3RvcmFnZSBpcyBub3Qgc3VwcG9ydGVkIG9uIGN1cnJlbnQgcGxhdGZvcm0nKVxuICAgICAgICAvLyDkuI3mlK/mjIFsb2NhbHN0b3JhZ2XnmoTlubPlj7DpmY3nuqfkuLpub25lXG4gICAgICAgIHJldHVybiBuZXcgVGNiQ2FjaGVPYmplY3QoYWRhcHRlci5yb290KVxuICAgICAgfVxuICAgICAgcmV0dXJuIGFkYXB0ZXIubG9jYWxTdG9yYWdlXG4gICAgY2FzZSAnbm9uZSc6XG4gICAgICByZXR1cm4gbmV3IFRjYkNhY2hlT2JqZWN0KGFkYXB0ZXIucm9vdClcbiAgICBkZWZhdWx0OlxuICAgICAgaWYgKCFhZGFwdGVyLmxvY2FsU3RvcmFnZSkge1xuICAgICAgICBwcmludFdhcm4oRVJST1JTLklOVkFMSURfUEFSQU1TLCAnbG9jYWxTdG9yYWdlIGlzIG5vdCBzdXBwb3J0ZWQgb24gY3VycmVudCBwbGF0Zm9ybScpXG4gICAgICAgIC8vIOS4jeaUr+aMgWxvY2Fsc3RvcmFnZeeahOW5s+WPsOmZjee6p+S4um5vbmVcbiAgICAgICAgcmV0dXJuIG5ldyBUY2JDYWNoZU9iamVjdChhZGFwdGVyLnJvb3QpXG4gICAgICB9XG4gICAgICByZXR1cm4gYWRhcHRlci5sb2NhbFN0b3JhZ2VcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2xvdWRiYXNlQ2FjaGUgaW1wbGVtZW50cyBJQ2xvdWRiYXNlQ2FjaGUge1xuICBwdWJsaWMga2V5czogS1Y8c3RyaW5nPiA9IHt9XG5cbiAgcHJpdmF0ZSBwZXJzaXN0ZW5jZVRhZzogUGVyc2lzdGVuY2VcbiAgcHJpdmF0ZSBwbGF0Zm9ybUluZm86IElDbG91ZGJhc2VQbGF0Zm9ybUluZm9cbiAgcHJpdmF0ZSBzdG9yYWdlOiBTdG9yYWdlSW50ZXJmYWNlXG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBJQ2FjaGVDb25maWcpIHtcbiAgICBjb25zdCB7IHBlcnNpc3RlbmNlLCBwbGF0Zm9ybUluZm8gPSB7fSwga2V5cyA9IHt9IH0gPSBjb25maWdcbiAgICB0aGlzLnBsYXRmb3JtSW5mbyA9IHBsYXRmb3JtSW5mb1xuICAgIGlmICghdGhpcy5zdG9yYWdlKSB7XG4gICAgICB0aGlzLnBlcnNpc3RlbmNlVGFnID0gdGhpcy5wbGF0Zm9ybUluZm8uYWRhcHRlci5wcmltYXJ5U3RvcmFnZSB8fCBwZXJzaXN0ZW5jZVxuICAgICAgdGhpcy5zdG9yYWdlID0gY3JlYXRlU3RvcmFnZSh0aGlzLnBlcnNpc3RlbmNlVGFnLCB0aGlzLnBsYXRmb3JtSW5mby5hZGFwdGVyKVxuICAgICAgdGhpcy5rZXlzID0ga2V5c1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogQGdldHRlciBzdG9yYWdl5qih5byPLeWQjOatpS/lvILmraVcbiAgICovXG4gIGdldCBtb2RlKCkge1xuICAgIHJldHVybiB0aGlzLnN0b3JhZ2UubW9kZSB8fCAnc3luYydcbiAgfVxuICBnZXQgcGVyc2lzdGVuY2UoKTogUGVyc2lzdGVuY2Uge1xuICAgIHJldHVybiB0aGlzLnBlcnNpc3RlbmNlVGFnXG4gIH1cblxuICBwdWJsaWMgc2V0U3RvcmUoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnksIHZlcnNpb24/OiBhbnkpIHtcbiAgICBpZiAodGhpcy5tb2RlID09PSAnYXN5bmMnKSB7XG4gICAgICBwcmludFdhcm4oRVJST1JTLklOVkFMSURfT1BFUkFUSU9OLCAnY3VycmVudCBwbGF0Zm9ybVxcJ3Mgc3RvcmFnZSBpcyBhc3luY2hyb25vdXMsIHBsZWFzZSB1c2Ugc2V0U3RvcmVBc3luYyBpbnN0ZWVkJylcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAoIXRoaXMuc3RvcmFnZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHZhbCA9IHtcbiAgICAgICAgdmVyc2lvbjogdmVyc2lvbiB8fCAnbG9jYWxDYWNoZXYxJyxcbiAgICAgICAgY29udGVudDogdmFsdWUsXG4gICAgICB9XG4gICAgICB0aGlzLnN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KHZhbCkpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLk9QRVJBVElPTl9GQUlMLFxuICAgICAgICBtc2c6IGBbJHtnZXRTZGtOYW1lKCl9XVske0VSUk9SUy5PUEVSQVRJT05fRkFJTH1dc2V0U3RvcmUgZmFpbGVkYCxcbiAgICAgICAgaW5mbzogZSxcbiAgICAgIH0pKVxuICAgIH1cblxuICAgIHJldHVyblxuICB9XG4gIHB1YmxpYyBhc3luYyBzZXRTdG9yZUFzeW5jKGtleTogc3RyaW5nLCB2YWx1ZTogYW55LCB2ZXJzaW9uPzogYW55KSB7XG4gICAgaWYgKCF0aGlzLnN0b3JhZ2UpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCB2YWwgPSB7XG4gICAgICAgIHZlcnNpb246IHZlcnNpb24gfHwgJ2xvY2FsQ2FjaGV2MScsXG4gICAgICAgIGNvbnRlbnQ6IHZhbHVlLFxuICAgICAgfVxuICAgICAgYXdhaXQgdGhpcy5zdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeSh2YWwpKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHJldHVyblxuICB9XG4gIHB1YmxpYyBnZXRTdG9yZShrZXk6IHN0cmluZywgdmVyc2lvbj86IHN0cmluZykge1xuICAgIGlmICh0aGlzLm1vZGUgPT09ICdhc3luYycpIHtcbiAgICAgIHByaW50V2FybihFUlJPUlMuSU5WQUxJRF9PUEVSQVRJT04sICdjdXJyZW50IHBsYXRmb3JtXFwncyBzdG9yYWdlIGlzIGFzeW5jaHJvbm91cywgcGxlYXNlIHVzZSBnZXRTdG9yZUFzeW5jIGluc3RlZWQnKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyDmtYvor5XnlKjkvovkvb/nlKhcbiAgICAgIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy5lbnY/LnRjYl90b2tlbikge1xuICAgICAgICByZXR1cm4gcHJvY2Vzcy5lbnYudGNiX3Rva2VuXG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5zdG9yYWdlKSB7XG4gICAgICAgIHJldHVybiAnJ1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiAnJ1xuICAgIH1cblxuICAgIHZlcnNpb24gPSB2ZXJzaW9uIHx8ICdsb2NhbENhY2hldjEnXG5cbiAgICBjb25zdCBjb250ZW50ID0gdGhpcy5zdG9yYWdlLmdldEl0ZW0oa2V5KVxuICAgIGlmICghY29udGVudCkge1xuICAgICAgcmV0dXJuICcnXG4gICAgfVxuXG4gICAgaWYgKGNvbnRlbnQuaW5kZXhPZih2ZXJzaW9uKSA+PSAwKSB7XG4gICAgICBjb25zdCBkID0gSlNPTi5wYXJzZShjb250ZW50KVxuICAgICAgcmV0dXJuIGQuY29udGVudFxuICAgIH1cbiAgICByZXR1cm4gJydcbiAgfVxuICBwdWJsaWMgYXN5bmMgZ2V0U3RvcmVBc3luYyhrZXk6IHN0cmluZywgdmVyc2lvbj86IHN0cmluZykge1xuICAgIHRyeSB7XG4gICAgICAvLyDmtYvor5XnlKjkvovkvb/nlKhcbiAgICAgIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy5lbnY/LnRjYl90b2tlbikge1xuICAgICAgICByZXR1cm4gcHJvY2Vzcy5lbnYudGNiX3Rva2VuXG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5zdG9yYWdlKSB7XG4gICAgICAgIHJldHVybiAnJ1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiAnJ1xuICAgIH1cblxuICAgIHZlcnNpb24gPSB2ZXJzaW9uIHx8ICdsb2NhbENhY2hldjEnXG5cbiAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgdGhpcy5zdG9yYWdlLmdldEl0ZW0oa2V5KVxuICAgIGlmICghY29udGVudCkge1xuICAgICAgcmV0dXJuICcnXG4gICAgfVxuXG4gICAgaWYgKGNvbnRlbnQuaW5kZXhPZih2ZXJzaW9uKSA+PSAwKSB7XG4gICAgICBjb25zdCBkID0gSlNPTi5wYXJzZShjb250ZW50KVxuICAgICAgcmV0dXJuIGQuY29udGVudFxuICAgIH1cbiAgICByZXR1cm4gJydcbiAgfVxuICBwdWJsaWMgcmVtb3ZlU3RvcmUoa2V5OiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5tb2RlID09PSAnYXN5bmMnKSB7XG4gICAgICBwcmludFdhcm4oRVJST1JTLklOVkFMSURfT1BFUkFUSU9OLCAnY3VycmVudCBwbGF0Zm9ybVxcJ3Mgc3RvcmFnZSBpcyBhc3luY2hyb25vdXMsIHBsZWFzZSB1c2UgcmVtb3ZlU3RvcmVBc3luYyBpbnN0ZWVkJylcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLnN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpXG4gIH1cbiAgcHVibGljIGFzeW5jIHJlbW92ZVN0b3JlQXN5bmMoa2V5OiBzdHJpbmcpIHtcbiAgICBhd2FpdCB0aGlzLnN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpXG4gIH1cbn1cbiJdfQ==
}, function(modId) { var map = {"./util":1739108424873,"../constants":1739108424868}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1739108424875, function(require, module, exports) {

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.removeEventListener = exports.activateEvent = exports.addEventListener = exports.CloudbaseEventEmitter = exports.IErrorEvent = exports.CloudbaseEvent = void 0;
var util_1 = require("./util");
function customeAddEventListener(name, listener, listeners) {
    listeners[name] = listeners[name] || [];
    listeners[name].push(listener);
}
function customRemoveEventListener(name, listener, listeners) {
    if (listeners === null || listeners === void 0 ? void 0 : listeners[name]) {
        var index = listeners[name].indexOf(listener);
        if (index !== -1) {
            listeners[name].splice(index, 1);
        }
    }
}
var CloudbaseEvent = (function () {
    function CloudbaseEvent(name, data) {
        this.data = data || null;
        this.name = name;
    }
    return CloudbaseEvent;
}());
exports.CloudbaseEvent = CloudbaseEvent;
var IErrorEvent = (function (_super) {
    __extends(IErrorEvent, _super);
    function IErrorEvent(error, data) {
        var _this = _super.call(this, 'error', { error: error, data: data }) || this;
        _this.error = error;
        return _this;
    }
    return IErrorEvent;
}(CloudbaseEvent));
exports.IErrorEvent = IErrorEvent;
var CloudbaseEventEmitter = (function () {
    function CloudbaseEventEmitter() {
        this.listeners = {};
    }
    CloudbaseEventEmitter.prototype.on = function (name, listener) {
        customeAddEventListener(name, listener, this.listeners);
        return this;
    };
    CloudbaseEventEmitter.prototype.off = function (name, listener) {
        customRemoveEventListener(name, listener, this.listeners);
        return this;
    };
    CloudbaseEventEmitter.prototype.fire = function (event, data) {
        if ((0, util_1.isInstanceOf)(event, IErrorEvent)) {
            console.error(event.error);
            return this;
        }
        var ev = (0, util_1.isString)(event) ? new CloudbaseEvent(event, data || {}) : event;
        var name = ev.name;
        if (this.listens(name)) {
            ev.target = this;
            var handlers = this.listeners[name] ? __spreadArray([], this.listeners[name], true) : [];
            for (var _i = 0, handlers_1 = handlers; _i < handlers_1.length; _i++) {
                var fn = handlers_1[_i];
                fn.call(this, ev);
            }
        }
        return this;
    };
    CloudbaseEventEmitter.prototype.listens = function (name) {
        return this.listeners[name] && this.listeners[name].length > 0;
    };
    return CloudbaseEventEmitter;
}());
exports.CloudbaseEventEmitter = CloudbaseEventEmitter;
var eventEmitter = new CloudbaseEventEmitter();
function addEventListener(event, callback) {
    eventEmitter.on(event, callback);
}
exports.addEventListener = addEventListener;
function activateEvent(event, data) {
    if (data === void 0) { data = {}; }
    eventEmitter.fire(event, data);
}
exports.activateEvent = activateEvent;
function removeEventListener(event, callback) {
    eventEmitter.off(event, callback);
}
exports.removeEventListener = removeEventListener;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYnMvZXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtCQUErQztBQVcvQyxTQUFTLHVCQUF1QixDQUFDLElBQVksRUFBRSxRQUFrQixFQUFFLFNBQW9CO0lBQ3JGLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ3ZDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7QUFDaEMsQ0FBQztBQVFELFNBQVMseUJBQXlCLENBQUMsSUFBWSxFQUFFLFFBQWtCLEVBQUUsU0FBb0I7SUFDdkYsSUFBSSxTQUFTLGFBQVQsU0FBUyx1QkFBVCxTQUFTLENBQUcsSUFBSSxDQUFDLEVBQUU7UUFDckIsSUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUMvQyxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNoQixTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQTtTQUNqQztLQUNGO0FBQ0gsQ0FBQztBQVlEO0lBS0Usd0JBQVksSUFBWSxFQUFFLElBQVM7UUFDakMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxDQUFBO1FBQ3hCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO0lBQ2xCLENBQUM7SUFDSCxxQkFBQztBQUFELENBQUMsQUFURCxJQVNDO0FBVFksd0NBQWM7QUFpQjNCO0lBQWlDLCtCQUFjO0lBRTdDLHFCQUFZLEtBQVksRUFBRSxJQUFVO1FBQXBDLFlBQ0Usa0JBQU0sT0FBTyxFQUFFLEVBQUUsS0FBSyxPQUFBLEVBQUUsSUFBSSxNQUFBLEVBQUUsQ0FBQyxTQUVoQztRQURDLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBOztJQUNwQixDQUFDO0lBQ0gsa0JBQUM7QUFBRCxDQUFDLEFBTkQsQ0FBaUMsY0FBYyxHQU05QztBQU5ZLGtDQUFXO0FBV3hCO0lBQUE7UUFPbUIsY0FBUyxHQUFjLEVBQUUsQ0FBQTtJQThENUMsQ0FBQztJQXJEUSxrQ0FBRSxHQUFULFVBQVUsSUFBWSxFQUFFLFFBQWtCO1FBQ3hDLHVCQUF1QixDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ3ZELE9BQU8sSUFBSSxDQUFBO0lBQ2IsQ0FBQztJQVFNLG1DQUFHLEdBQVYsVUFBVyxJQUFZLEVBQUUsUUFBa0I7UUFDekMseUJBQXlCLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDekQsT0FBTyxJQUFJLENBQUE7SUFDYixDQUFDO0lBT00sb0NBQUksR0FBWCxVQUFZLEtBQThCLEVBQUUsSUFBVTtRQUVwRCxJQUFJLElBQUEsbUJBQVksRUFBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLEVBQUU7WUFDcEMsT0FBTyxDQUFDLEtBQUssQ0FBRSxLQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQzNDLE9BQU8sSUFBSSxDQUFBO1NBQ1o7UUFFRCxJQUFNLEVBQUUsR0FBbUIsSUFBQSxlQUFRLEVBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksY0FBYyxDQUFDLEtBQWUsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQXVCLENBQUE7UUFFOUcsSUFBQSxJQUFJLEdBQUssRUFBRSxLQUFQLENBQU87UUFFbkIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3RCLEVBQUUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFBO1lBRWhCLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxtQkFBSyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFFLENBQUMsQ0FBQyxFQUFFLENBQUE7WUFDdEUsS0FBaUIsVUFBUSxFQUFSLHFCQUFRLEVBQVIsc0JBQVEsRUFBUixJQUFRLEVBQUU7Z0JBQXRCLElBQU0sRUFBRSxpQkFBQTtnQkFDWCxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQTthQUNsQjtTQUNGO1FBRUQsT0FBTyxJQUFJLENBQUE7SUFDYixDQUFDO0lBUU8sdUNBQU8sR0FBZixVQUFnQixJQUFZO1FBQzFCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7SUFDaEUsQ0FBQztJQUNILDRCQUFDO0FBQUQsQ0FBQyxBQXJFRCxJQXFFQztBQXJFWSxzREFBcUI7QUF3RWxDLElBQU0sWUFBWSxHQUFHLElBQUkscUJBQXFCLEVBQUUsQ0FBQTtBQUVoRCxTQUFnQixnQkFBZ0IsQ0FBQyxLQUFhLEVBQUUsUUFBa0I7SUFDaEUsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUE7QUFDbEMsQ0FBQztBQUZELDRDQUVDO0FBRUQsU0FBZ0IsYUFBYSxDQUFDLEtBQWEsRUFBRSxJQUFjO0lBQWQscUJBQUEsRUFBQSxTQUFjO0lBQ3pELFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFBO0FBQ2hDLENBQUM7QUFGRCxzQ0FFQztBQUVELFNBQWdCLG1CQUFtQixDQUFDLEtBQWEsRUFBRSxRQUFrQjtJQUNuRSxZQUFZLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQTtBQUNuQyxDQUFDO0FBRkQsa0RBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc1N0cmluZywgaXNJbnN0YW5jZU9mIH0gZnJvbSAnLi91dGlsJ1xuaW1wb3J0IHsgTGlzdGVuZXJzLCBJQ2xvdWRiYXNlRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9ldmVudHMnXG5cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICogQGZ1bmN0aW9uIF9hZGRFdmVudExpc3RlbmVyIC0g5re75Yqg55uR5ZCsXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIGV2ZW505ZCN56ewXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciAtIOWTjeW6lOWHveaVsFxuICogQHBhcmFtIHtMaXN0ZW5lcnN9IGxpc3RlbmVycyAtIOW3suWtmOWTjeW6lOWHveaVsOmbhuWQiFxuICovXG5mdW5jdGlvbiBjdXN0b21lQWRkRXZlbnRMaXN0ZW5lcihuYW1lOiBzdHJpbmcsIGxpc3RlbmVyOiBGdW5jdGlvbiwgbGlzdGVuZXJzOiBMaXN0ZW5lcnMpIHtcbiAgbGlzdGVuZXJzW25hbWVdID0gbGlzdGVuZXJzW25hbWVdIHx8IFtdXG4gIGxpc3RlbmVyc1tuYW1lXS5wdXNoKGxpc3RlbmVyKVxufVxuLyoqXG4gKiBAcHJpdmF0ZVxuICogQGZ1bmN0aW9uIF9yZW1vdmVFdmVudExpc3RlbmVyIC0g56e76Zmk55uR5ZCsXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIGV2ZW505ZCN56ewXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciAtIOWTjeW6lOWHveaVsFxuICogQHBhcmFtIHtMaXN0ZW5lcnN9IGxpc3RlbmVycyAtIOW3suWtmOWTjeW6lOWHveaVsOmbhuWQiFxuICovXG5mdW5jdGlvbiBjdXN0b21SZW1vdmVFdmVudExpc3RlbmVyKG5hbWU6IHN0cmluZywgbGlzdGVuZXI6IEZ1bmN0aW9uLCBsaXN0ZW5lcnM6IExpc3RlbmVycykge1xuICBpZiAobGlzdGVuZXJzPy5bbmFtZV0pIHtcbiAgICBjb25zdCBpbmRleCA9IGxpc3RlbmVyc1tuYW1lXS5pbmRleE9mKGxpc3RlbmVyKVxuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIGxpc3RlbmVyc1tuYW1lXS5zcGxpY2UoaW5kZXgsIDEpXG4gICAgfVxuICB9XG59XG5pbnRlcmZhY2UgSUV2ZW50IHtcbiAgbmFtZTogc3RyaW5nO1xuICB0YXJnZXQ6IGFueTtcbiAgZGF0YTogYW55O1xufVxuLyoqXG4gKiDoh6rlrprkuYnkuovku7ZcbiAqIEBjbGFzcyBDbG91ZGJhc2VFdmVudFxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSDnsbvlnotcbiAqIEBwYXJhbSB7YW55fSBkYXRhIC0g5pWw5o2uXG4gKi9cbmV4cG9ydCBjbGFzcyBDbG91ZGJhc2VFdmVudCBpbXBsZW1lbnRzIElFdmVudCB7XG4gIHB1YmxpYyByZWFkb25seSBuYW1lOiBzdHJpbmdcbiAgcHVibGljIHRhcmdldDogYW55XG4gIHB1YmxpYyBkYXRhOiBhbnlcblxuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIGRhdGE6IGFueSkge1xuICAgIHRoaXMuZGF0YSA9IGRhdGEgfHwgbnVsbFxuICAgIHRoaXMubmFtZSA9IG5hbWVcbiAgfVxufVxuLyoqXG4gKiDoh6rlrprkuYnplJnor6/kuovku7ZcbiAqIEBjbGFzcyBJRXJyb3JFdmVudFxuICogQGV4dGVuZHMgQ2xvdWRiYXNlRXZlbnRcbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIC0g6ZSZ6K+v5L+h5oGv5a+56LGhXG4gKiBAcGFyYW0ge2FueX0gZGF0YSAgLSDmlbDmja5cbiAqL1xuZXhwb3J0IGNsYXNzIElFcnJvckV2ZW50IGV4dGVuZHMgQ2xvdWRiYXNlRXZlbnQge1xuICBwdWJsaWMgcmVhZG9ubHkgZXJyb3I6IEVycm9yXG4gIGNvbnN0cnVjdG9yKGVycm9yOiBFcnJvciwgZGF0YT86IGFueSkge1xuICAgIHN1cGVyKCdlcnJvcicsIHsgZXJyb3IsIGRhdGEgfSlcbiAgICB0aGlzLmVycm9yID0gZXJyb3JcbiAgfVxufVxuXG4vKipcbiAqIEBjbGFzcyBDbG91ZGJhc2VFdmVudEVtaXR0ZXJcbiAqL1xuZXhwb3J0IGNsYXNzIENsb3VkYmFzZUV2ZW50RW1pdHRlciBpbXBsZW1lbnRzIElDbG91ZGJhc2VFdmVudEVtaXR0ZXIge1xuICAvKipcbiAgICogQHByaXZhdGVcbiAgICogQHJlYWRvbmx5XG4gICAqIEBwcm9wZXJ0eSB7TGlzdGVuZXJzfSBsaXN0ZW5lcnMgLSDlk43lupTlh73mlbDpm4blkIhcbiAgICogQGRlZmF1bHQgYHt9YFxuICAgKi9cbiAgcHJpdmF0ZSByZWFkb25seSBsaXN0ZW5lcnM6IExpc3RlbmVycyA9IHt9XG5cbiAgLyoqXG4gICAqIEBwdWJsaWNcbiAgICogQG1ldGhvZCBvbiAtIOa3u+WKoOebkeWQrFxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIGV2ZW505ZCN56ewXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIC0g5ZON5bqU5Ye95pWwXG4gICAqIEByZXR1cm4gYHRoaXNgXG4gICAqL1xuICBwdWJsaWMgb24obmFtZTogc3RyaW5nLCBsaXN0ZW5lcjogRnVuY3Rpb24pOiB0aGlzIHtcbiAgICBjdXN0b21lQWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBsaXN0ZW5lciwgdGhpcy5saXN0ZW5lcnMpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuICAvKipcbiAgICogQHB1YmxpY1xuICAgKiBAbWV0aG9kIG9mZiAtIOenu+mZpOebkeWQrFxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIGV2ZW505ZCN56ewXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIC0g5ZON5bqU5Ye95pWwXG4gICAqIEByZXR1cm4gYHRoaXNgXG4gICAqL1xuICBwdWJsaWMgb2ZmKG5hbWU6IHN0cmluZywgbGlzdGVuZXI6IEZ1bmN0aW9uKTogdGhpcyB7XG4gICAgY3VzdG9tUmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBsaXN0ZW5lciwgdGhpcy5saXN0ZW5lcnMpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuICAvKipcbiAgICogQHB1YmxpY1xuICAgKiBAbWV0aG9kIGZpcmUgLSDop6blj5Hkuovku7ZcbiAgICogQHBhcmFtIHtzdHJpbmd8Q2xvdWRiYXNlRXZlbnR9IGV2ZW50IC0gZXZlbnRcbiAgICogQHJldHVybiBgdGhpc2BcbiAgICovXG4gIHB1YmxpYyBmaXJlKGV2ZW50OiBzdHJpbmcgfCBDbG91ZGJhc2VFdmVudCwgZGF0YT86IGFueSk6IHRoaXMge1xuICAgIC8vIOaJk+WNsOmUmeivr+S/oeaBr1xuICAgIGlmIChpc0luc3RhbmNlT2YoZXZlbnQsIElFcnJvckV2ZW50KSkge1xuICAgICAgY29uc29sZS5lcnJvcigoZXZlbnQgYXMgSUVycm9yRXZlbnQpLmVycm9yKVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBjb25zdCBldjogQ2xvdWRiYXNlRXZlbnQgPSBpc1N0cmluZyhldmVudCkgPyBuZXcgQ2xvdWRiYXNlRXZlbnQoZXZlbnQgYXMgc3RyaW5nLCBkYXRhIHx8IHt9KSA6IGV2ZW50IGFzIENsb3VkYmFzZUV2ZW50XG5cbiAgICBjb25zdCB7IG5hbWUgfSA9IGV2XG5cbiAgICBpZiAodGhpcy5saXN0ZW5zKG5hbWUpKSB7XG4gICAgICBldi50YXJnZXQgPSB0aGlzXG5cbiAgICAgIGNvbnN0IGhhbmRsZXJzID0gdGhpcy5saXN0ZW5lcnNbbmFtZV0gPyBbLi4udGhpcy5saXN0ZW5lcnNbbmFtZV1dIDogW11cbiAgICAgIGZvciAoY29uc3QgZm4gb2YgaGFuZGxlcnMpIHtcbiAgICAgICAgZm4uY2FsbCh0aGlzLCBldilcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZXRob2QgbGlzdGVucyAtIOWIpOaWreaYr+WQpuebkeWQrOS6hm5hbWXkuovku7ZcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBldmVudOWQjeensFxuICAgKiBAcmV0dXJuIGBib29sZWFuYFxuICAgKi9cbiAgcHJpdmF0ZSBsaXN0ZW5zKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmxpc3RlbmVyc1tuYW1lXSAmJiB0aGlzLmxpc3RlbmVyc1tuYW1lXS5sZW5ndGggPiAwXG4gIH1cbn1cblxuXG5jb25zdCBldmVudEVtaXR0ZXIgPSBuZXcgQ2xvdWRiYXNlRXZlbnRFbWl0dGVyKClcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXIoZXZlbnQ6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gIGV2ZW50RW1pdHRlci5vbihldmVudCwgY2FsbGJhY2spXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhY3RpdmF0ZUV2ZW50KGV2ZW50OiBzdHJpbmcsIGRhdGE6IGFueSA9IHt9KSB7XG4gIGV2ZW50RW1pdHRlci5maXJlKGV2ZW50LCBkYXRhKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudDogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgZXZlbnRFbWl0dGVyLm9mZihldmVudCwgY2FsbGJhY2spXG59XG4iXX0=
}, function(modId) { var map = {"./util":1739108424873}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1739108424876, function(require, module, exports) {

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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./decorators"), exports);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaGVscGVycy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0ICogZnJvbSAnLi9kZWNvcmF0b3JzJ1xuIl19
}, function(modId) { var map = {"./decorators":1739108424877}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1739108424877, function(require, module, exports) {

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
exports.catchErrorsDecorator = void 0;
var util_1 = require("../libs/util");
var constants_1 = require("../constants");
var isFirefox = false;
if (typeof navigator !== 'undefined' && navigator.userAgent) {
    isFirefox = navigator.userAgent.indexOf('Firefox') !== -1;
}
var REG_STACK_DECORATE = isFirefox
    ? /(\.js\/)?__decorate(\$\d+)?<@.*\d$/
    : /(\/\w+\.js\.)?__decorate(\$\d+)?\s*\(.*\)$/;
var REG_STACK_LINK = /https?:\/\/.+:\d*\/.*\.js:\d+:\d+/;
function catchErrorsDecorator(options) {
    var _a = options.mode, mode = _a === void 0 ? 'async' : _a, _b = options.customInfo, customInfo = _b === void 0 ? {} : _b, title = options.title, _c = options.messages, messages = _c === void 0 ? [] : _c;
    return function (target, methodName, descriptor) {
        if (!constants_1.IS_DEBUG_MODE) {
            return;
        }
        var className = customInfo.className || target.constructor.name;
        var fnName = customInfo.methodName || methodName;
        var fn = descriptor.value;
        var sourceLink = getSourceLink(new Error());
        if (mode === 'sync') {
            descriptor.value = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var innerErr = getRewritedError({
                    err: new Error(),
                    className: className,
                    methodName: fnName,
                    sourceLink: sourceLink,
                });
                try {
                    return fn.apply(this, args);
                }
                catch (err) {
                    var failErr = err;
                    var errMsg = err.message, error = err.error, errorDescription = err.error_description;
                    var logs = {
                        title: title || "".concat(className, ".").concat(fnName, " failed"),
                        content: [{
                                type: 'error',
                                body: err,
                            }],
                    };
                    if (errMsg && /^\{.*\}$/.test(errMsg)) {
                        var msg = JSON.parse(errMsg);
                        logs.subtitle = errMsg;
                        if (msg.code) {
                            if (innerErr) {
                                innerErr.code = msg.code;
                                innerErr.msg = msg.msg;
                            }
                            else {
                                err.code = msg.code;
                                err.message = msg.msg;
                            }
                            failErr = innerErr || err;
                            logs.content = messages.map(function (msg) { return ({
                                type: 'info',
                                body: msg,
                            }); });
                        }
                    }
                    if (error && errorDescription) {
                        logs.subtitle = errorDescription;
                        if (innerErr) {
                            innerErr.code = error;
                            innerErr.msg = errorDescription;
                        }
                        else {
                            err.code = error;
                            err.message = errorDescription;
                        }
                        failErr = innerErr || err;
                        logs.content = messages.map(function (msg) { return ({
                            type: 'info',
                            body: msg,
                        }); });
                    }
                    (0, util_1.printGroupLog)(logs);
                    throw failErr;
                }
            };
        }
        else {
            descriptor.value = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return __awaiter(this, void 0, void 0, function () {
                    var innerErr, err_1, failErr, errMsg, error, errorDescription, logs, msg;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                innerErr = getRewritedError({
                                    err: new Error(),
                                    className: className,
                                    methodName: fnName,
                                    sourceLink: sourceLink,
                                });
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                return [4, fn.apply(this, args)];
                            case 2: return [2, _a.sent()];
                            case 3:
                                err_1 = _a.sent();
                                failErr = err_1;
                                errMsg = err_1.message, error = err_1.error, errorDescription = err_1.error_description;
                                logs = {
                                    title: title || "".concat(className, ".").concat(fnName, " failed"),
                                    content: [{
                                            type: 'error',
                                            body: err_1,
                                        }],
                                };
                                if (errMsg && /^\{.*\}$/.test(errMsg)) {
                                    msg = JSON.parse(errMsg);
                                    logs.subtitle = msg;
                                    if (msg.code) {
                                        if (innerErr) {
                                            innerErr.code = msg.code;
                                            innerErr.message = msg.msg;
                                        }
                                        else {
                                            err_1.code = msg.code;
                                            err_1.message = msg.msg;
                                        }
                                        failErr = innerErr || err_1;
                                        logs.content = messages.map(function (msg) { return ({
                                            type: 'info',
                                            body: msg,
                                        }); });
                                    }
                                }
                                if (error && errorDescription) {
                                    logs.subtitle = errorDescription;
                                    if (innerErr) {
                                        innerErr.code = error;
                                        innerErr.msg = errorDescription;
                                    }
                                    else {
                                        err_1.code = error;
                                        err_1.message = errorDescription;
                                    }
                                    failErr = innerErr || err_1;
                                    logs.content = messages.map(function (msg) { return ({
                                        type: 'info',
                                        body: msg,
                                    }); });
                                }
                                (0, util_1.printGroupLog)(logs);
                                throw failErr;
                            case 4: return [2];
                        }
                    });
                });
            };
        }
    };
}
exports.catchErrorsDecorator = catchErrorsDecorator;
function getSourceLink(err) {
    var sourceLink = '';
    var outterErrStacks = err.stack.split('\n');
    var indexOfDecorator = outterErrStacks.findIndex(function (str) { return REG_STACK_DECORATE.test(str); });
    if (indexOfDecorator !== -1) {
        var match = REG_STACK_LINK.exec(outterErrStacks[indexOfDecorator + 1] || '');
        sourceLink = match ? match[0] : '';
    }
    return sourceLink;
}
function getRewritedError(options) {
    var err = options.err, className = options.className, methodName = options.methodName, sourceLink = options.sourceLink;
    if (!sourceLink) {
        return null;
    }
    var innerErrStack = err.stack.split('\n');
    var REG_STACK_INNER_METHOD = isFirefox
        ? /^catchErrorsDecorator\/<\/descriptor.value@.*\d$/
        : new RegExp("".concat(className, "\\.descriptor.value\\s*\\[as\\s").concat(methodName, "\\]\\s*\\(.*\\)$"));
    var REG_STACK_INNER_METHOD_WITHOUT_LINK = isFirefox
        ? /^catchErrorsDecorator\/<\/descriptor.value/
        : new RegExp("".concat(className, "\\.descriptor.value\\s*\\[as\\s").concat(methodName, "\\]"));
    var indexOfSource = innerErrStack.findIndex(function (str) { return REG_STACK_INNER_METHOD.test(str); });
    var innerErr;
    if (indexOfSource !== -1) {
        var realErrStack = innerErrStack.filter(function (v, i) { return i > indexOfSource; });
        realErrStack.unshift(innerErrStack[indexOfSource]
            .replace(REG_STACK_INNER_METHOD_WITHOUT_LINK, "".concat(className, ".").concat(methodName))
            .replace(REG_STACK_LINK, sourceLink));
        innerErr = new Error();
        innerErr.stack = "".concat(isFirefox ? '@debugger' : 'Error', "\n").concat(realErrStack.join('\n'));
    }
    return innerErr;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oZWxwZXJzL2RlY29yYXRvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQTRDO0FBQzVDLDBDQUE0QztBQVk1QyxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUE7QUFDckIsSUFBSSxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQUksU0FBUyxDQUFDLFNBQVMsRUFBRTtJQUMzRCxTQUFTLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7Q0FDMUQ7QUFJRCxJQUFNLGtCQUFrQixHQUFHLFNBQVM7SUFDbEMsQ0FBQyxDQUFDLG9DQUFvQztJQUN0QyxDQUFDLENBQUMsNENBQTRDLENBQUE7QUFDaEQsSUFBTSxjQUFjLEdBQUcsbUNBQW1DLENBQUE7QUFLMUQsU0FBZ0Isb0JBQW9CLENBQUMsT0FBcUM7SUFDaEUsSUFBQSxLQUEwRCxPQUFPLEtBQW5ELEVBQWQsSUFBSSxtQkFBRyxPQUFPLEtBQUEsRUFBRSxLQUEwQyxPQUFPLFdBQWxDLEVBQWYsVUFBVSxtQkFBRyxFQUFFLEtBQUEsRUFBRSxLQUFLLEdBQW9CLE9BQU8sTUFBM0IsRUFBRSxLQUFrQixPQUFPLFNBQVosRUFBYixRQUFRLG1CQUFHLEVBQUUsS0FBQSxDQUFZO0lBRXpFLE9BQU8sVUFDTCxNQUFXLEVBQ1gsVUFBa0IsRUFDbEIsVUFBNkM7UUFHN0MsSUFBSSxDQUFDLHlCQUFhLEVBQUU7WUFDbEIsT0FBTTtTQUNQO1FBQ0QsSUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLFNBQVMsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQTtRQUNqRSxJQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsVUFBVSxJQUFJLFVBQVUsQ0FBQTtRQUNsRCxJQUFNLEVB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U0FBUztRQUNuRCxDQUFDLENBQUMsNENBQTRDO1FBQzlDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFHLFNBQVMsNENBQWtDLFVBQVUsUUFBSyxDQUFDLENBQUE7SUFDN0UsSUFBTSxhQUFhLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLHNCQUFzQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBaEMsQ0FBZ0MsQ0FBQyxDQUFBO0lBQ3RGLElBQUksUUFBZSxDQUFBO0lBQ25CLElBQUksYUFBYSxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBRXhCLElBQU0sWUFBWSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxHQUFHLGFBQWEsRUFBakIsQ0FBaUIsQ0FBQyxDQUFBO1FBQ3RFLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQzthQUM5QyxPQUFPLENBQUMsbUNBQW1DLEVBQUUsVUFBRyxTQUFTLGNBQUksVUFBVSxDQUFFLENBQUM7YUFDMUUsT0FBTyxDQUFDLGNBQWMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFBO1FBQ3ZDLFFBQVEsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFBO1FBQ3RCLFFBQVEsQ0FBQyxLQUFLLEdBQUcsVUFBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTyxlQUFLLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUUsQ0FBQTtLQUNwRjtJQUNELE9BQU8sUUFBUSxDQUFBO0FBQ2pCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwcmludEdyb3VwTG9nIH0gZnJvbSAnLi4vbGlicy91dGlsJ1xuaW1wb3J0IHsgSVNfREVCVUdfTU9ERSB9IGZyb20gJy4uL2NvbnN0YW50cydcblxuaW50ZXJmYWNlIElDYXRjaEVycm9yc0RlY29yYXRvck9wdGlvbnMge1xuICBtb2RlPzogJ3N5bmMnIHwgJ2FzeW5jJztcbiAgY3VzdG9tSW5mbz86IHtcbiAgICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gICAgbWV0aG9kTmFtZT86IHN0cmluZztcbiAgfTtcbiAgdGl0bGU/OiBzdHJpbmc7XG4gIG1lc3NhZ2VzPzogc3RyaW5nW107XG59XG4vLyBmaXJlZm9455qEc3RhY2vmoLzlvI/kuI5jaHJvbWXkuI3lkIxcbmxldCBpc0ZpcmVmb3ggPSBmYWxzZVxuaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQpIHtcbiAgaXNGaXJlZm94ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdGaXJlZm94JykgIT09IC0xXG59XG4vKipcbiAqIGRlY29yYXRl5Zyoc3RhY2vkuK3kuIDoiKzpg73nibnlrprnmoTop4TojINcbiAqL1xuY29uc3QgUkVHX1NUQUNLX0RFQ09SQVRFID0gaXNGaXJlZm94XG4gID8gLyhcXC5qc1xcLyk/X19kZWNvcmF0ZShcXCRcXGQrKT88QC4qXFxkJC9cbiAgOiAvKFxcL1xcdytcXC5qc1xcLik/X19kZWNvcmF0ZShcXCRcXGQrKT9cXHMqXFwoLipcXCkkL1xuY29uc3QgUkVHX1NUQUNLX0xJTksgPSAvaHR0cHM/OlxcL1xcLy4rOlxcZCpcXC8uKlxcLmpzOlxcZCs6XFxkKy9cbi8qKlxuICogZGVidWfmqKHlvI/lvLrljJbml6Xlv5fkv6Hmga9cbiAqIEBwYXJhbSBvcHRpb25zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYXRjaEVycm9yc0RlY29yYXRvcihvcHRpb25zOiBJQ2F0Y2hFcnJvcnNEZWNvcmF0b3JPcHRpb25zKSB7XG4gIGNvbnN0IHsgbW9kZSA9ICdhc3luYycsIGN1c3RvbUluZm8gPSB7fSwgdGl0bGUsIG1lc3NhZ2VzID0gW10gfSA9IG9wdGlvbnNcblxuICByZXR1cm4gZnVuY3Rpb24gKFxuICAgIHRhcmdldDogYW55LFxuICAgIG1ldGhvZE5hbWU6IHN0cmluZyxcbiAgICBkZXNjcmlwdG9yOiBUeXBlZFByb3BlcnR5RGVzY3JpcHRvcjxGdW5jdGlvbj5cbiAgKSB7XG4gICAgLy8g55Sf5Lqn546v5aKD56aB55SoXG4gICAgaWYgKCFJU19ERUJVR19NT0RFKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgY2xhc3NOYW1lID0gY3VzdG9tSW5mby5jbGFzc05hbWUgfHwgdGFyZ2V0LmNvbnN0cnVjdG9yLm5hbWVcbiAgICBjb25zdCBmbk5hbWUgPSBjdXN0b21JbmZvLm1ldGhvZE5hbWUgfHwgbWV0aG9kTmFtZVxuICAgIGNvbnN0IGZuID0gZGVzY3JpcHRvci52YWx1ZVxuXG4gICAgLy8g6KKrZGVjb3JhdG9y6KOF6aWw55qE5rqQ56CBbGlua1xuICAgIC8vIOWcqGRlc2NyaXB0b3IudmFsdWXlpJbpg6jmraTlpITliJvlu7rnmoRzdGFja+WxguasoeWPr+inpui+vua6kOeggVxuICAgIC8vIOiAjGRlc2NyaXB0b3IudmFsdWXlhoXpg6jmnInlj6/og73nlLHkuo5zdGFja+Wkqua3seaXoOazleinpui+vlxuICAgIGNvbnN0IHNvdXJjZUxpbmsgPSBnZXRTb3VyY2VMaW5rKG5ldyBFcnJvcigpKVxuXG4gICAgaWYgKG1vZGUgPT09ICdzeW5jJykge1xuICAgICAgZGVzY3JpcHRvci52YWx1ZSA9IGZ1bmN0aW9uICguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICAvLyDmraTlpITnmoRzdGFja+S9nOeUqOS4u+imgeaYr+S4uuS6huiOt+WPluiiq2RlY29yYXRvcuijhemlsOeahOa6kOeggWNsYXNz5ZKMbWV0aG9k5ZCN56ewXG4gICAgICAgIGNvbnN0IGlubmVyRXJyOiBhbnkgPSBnZXRSZXdyaXRlZEVycm9yKHtcbiAgICAgICAgICBlcnI6IG5ldyBFcnJvcigpLFxuICAgICAgICAgIGNsYXNzTmFtZSxcbiAgICAgICAgICBtZXRob2ROYW1lOiBmbk5hbWUsXG4gICAgICAgICAgc291cmNlTGluayxcbiAgICAgICAgfSlcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJncylcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgbGV0IGZhaWxFcnIgPSBlcnJcbiAgICAgICAgICBjb25zdCB7IG1lc3NhZ2U6IGVyck1zZywgZXJyb3IsIGVycm9yX2Rlc2NyaXB0aW9uOiBlcnJvckRlc2NyaXB0aW9uIH0gPSBlcnJcbiAgICAgICAgICBjb25zdCBsb2dzOiBhbnkgPSB7XG4gICAgICAgICAgICB0aXRsZTogdGl0bGUgfHwgYCR7Y2xhc3NOYW1lfS4ke2ZuTmFtZX0gZmFpbGVkYCxcbiAgICAgICAgICAgIGNvbnRlbnQ6IFt7XG4gICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgIGJvZHk6IGVycixcbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyDlj6rnibnmrorlpITnkIZTREvkuJrliqHpgLvovpHmipvlh7rnmoTplJnor68tSlNPTiBzdHJpbmdcbiAgICAgICAgICBpZiAoZXJyTXNnICYmIC9eXFx7LipcXH0kLy50ZXN0KGVyck1zZykpIHtcbiAgICAgICAgICAgIGNvbnN0IG1zZyA9IEpTT04ucGFyc2UoZXJyTXNnKVxuICAgICAgICAgICAgbG9ncy5zdWJ0aXRsZSA9IGVyck1zZ1xuICAgICAgICAgICAgaWYgKG1zZy5jb2RlKSB7XG4gICAgICAgICAgICAgIGlmIChpbm5lckVycikge1xuICAgICAgICAgICAgICAgIGlubmVyRXJyLmNvZGUgPSBtc2cuY29kZVxuICAgICAgICAgICAgICAgIGlubmVyRXJyLm1zZyA9IG1zZy5tc2dcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlcnIuY29kZSA9IG1zZy5jb2RlXG4gICAgICAgICAgICAgICAgZXJyLm1lc3NhZ2UgPSBtc2cubXNnXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZmFpbEVyciA9IGlubmVyRXJyIHx8IGVyclxuICAgICAgICAgICAgICBsb2dzLmNvbnRlbnQgPSBtZXNzYWdlcy5tYXAobXNnID0+ICh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2luZm8nLFxuICAgICAgICAgICAgICAgIGJvZHk6IG1zZyxcbiAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gb2F1dGgg6ZSZ6K+v54m55q6K5aSE55CGXG4gICAgICAgICAgaWYgKGVycm9yICYmIGVycm9yRGVzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIGxvZ3Muc3VidGl0bGUgPSBlcnJvckRlc2NyaXB0aW9uXG4gICAgICAgICAgICBpZiAoaW5uZXJFcnIpIHtcbiAgICAgICAgICAgICAgaW5uZXJFcnIuY29kZSA9IGVycm9yXG4gICAgICAgICAgICAgIGlubmVyRXJyLm1zZyA9IGVycm9yRGVzY3JpcHRpb25cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGVyci5jb2RlID0gZXJyb3JcbiAgICAgICAgICAgICAgZXJyLm1lc3NhZ2UgPSBlcnJvckRlc2NyaXB0aW9uXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmYWlsRXJyID0gaW5uZXJFcnIgfHwgZXJyXG4gICAgICAgICAgICBsb2dzLmNvbnRlbnQgPSBtZXNzYWdlcy5tYXAobXNnID0+ICh7XG4gICAgICAgICAgICAgIHR5cGU6ICdpbmZvJyxcbiAgICAgICAgICAgICAgYm9keTogbXNnLFxuICAgICAgICAgICAgfSkpXG4gICAgICAgICAgfVxuICAgICAgICAgIHByaW50R3JvdXBMb2cobG9ncylcbiAgICAgICAgICB0aHJvdyBmYWlsRXJyXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGVzY3JpcHRvci52YWx1ZSA9IGFzeW5jIGZ1bmN0aW9uICguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBjb25zdCBpbm5lckVycjogYW55ID0gZ2V0UmV3cml0ZWRFcnJvcih7XG4gICAgICAgICAgZXJyOiBuZXcgRXJyb3IoKSxcbiAgICAgICAgICBjbGFzc05hbWUsXG4gICAgICAgICAgbWV0aG9kTmFtZTogZm5OYW1lLFxuICAgICAgICAgIHNvdXJjZUxpbmssXG4gICAgICAgIH0pXG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgZm4uYXBwbHkodGhpcywgYXJncylcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgbGV0IGZhaWxFcnIgPSBlcnJcbiAgICAgICAgICBjb25zdCB7IG1lc3NhZ2U6IGVyck1zZywgZXJyb3IsIGVycm9yX2Rlc2NyaXB0aW9uOiBlcnJvckRlc2NyaXB0aW9uIH0gPSBlcnJcbiAgICAgICAgICBjb25zdCBsb2dzOiBhbnkgPSB7XG4gICAgICAgICAgICB0aXRsZTogdGl0bGUgfHwgYCR7Y2xhc3NOYW1lfS4ke2ZuTmFtZX0gZmFpbGVkYCxcbiAgICAgICAgICAgIGNvbnRlbnQ6IFt7XG4gICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgIGJvZHk6IGVycixcbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyDlj6rnibnmrorlpITnkIZTREvkuJrliqHpgLvovpHmipvlh7rnmoTplJnor68tSlNPTiBzdHJpbmdcbiAgICAgICAgICBpZiAoZXJyTXNnICYmIC9eXFx7LipcXH0kLy50ZXN0KGVyck1zZykpIHtcbiAgICAgICAgICAgIGNvbnN0IG1zZyA9IEpTT04ucGFyc2UoZXJyTXNnKVxuICAgICAgICAgICAgbG9ncy5zdWJ0aXRsZSA9IG1zZ1xuICAgICAgICAgICAgaWYgKG1zZy5jb2RlKSB7XG4gICAgICAgICAgICAgIGlmIChpbm5lckVycikge1xuICAgICAgICAgICAgICAgIGlubmVyRXJyLmNvZGUgPSBtc2cuY29kZVxuICAgICAgICAgICAgICAgIGlubmVyRXJyLm1lc3NhZ2UgPSBtc2cubXNnXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZXJyLmNvZGUgPSBtc2cuY29kZVxuICAgICAgICAgICAgICAgIGVyci5tZXNzYWdlID0gbXNnLm1zZ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGZhaWxFcnIgPSBpbm5lckVyciB8fCBlcnJcbiAgICAgICAgICAgICAgbG9ncy5jb250ZW50ID0gbWVzc2FnZXMubWFwKG1zZyA9PiAoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdpbmZvJyxcbiAgICAgICAgICAgICAgICBib2R5OiBtc2csXG4gICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIG9hdXRoIOmUmeivr+eJueauiuWkhOeQhlxuICAgICAgICAgIGlmIChlcnJvciAmJiBlcnJvckRlc2NyaXB0aW9uKSB7XG4gICAgICAgICAgICBsb2dzLnN1YnRpdGxlID0gZXJyb3JEZXNjcmlwdGlvblxuICAgICAgICAgICAgaWYgKGlubmVyRXJyKSB7XG4gICAgICAgICAgICAgIGlubmVyRXJyLmNvZGUgPSBlcnJvclxuICAgICAgICAgICAgICBpbm5lckVyci5tc2cgPSBlcnJvckRlc2NyaXB0aW9uXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBlcnIuY29kZSA9IGVycm9yXG4gICAgICAgICAgICAgIGVyci5tZXNzYWdlID0gZXJyb3JEZXNjcmlwdGlvblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmFpbEVyciA9IGlubmVyRXJyIHx8IGVyclxuICAgICAgICAgICAgbG9ncy5jb250ZW50ID0gbWVzc2FnZXMubWFwKG1zZyA9PiAoe1xuICAgICAgICAgICAgICB0eXBlOiAnaW5mbycsXG4gICAgICAgICAgICAgIGJvZHk6IG1zZyxcbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgIH1cbiAgICAgICAgICBwcmludEdyb3VwTG9nKGxvZ3MpXG4gICAgICAgICAgdGhyb3cgZmFpbEVyclxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICog5Zyo5Y6f5aeL5aCG5qCI5Lit5p+l5om+6KOF6aWw5Zmo5p2h55uu5bm26L+U5Zue5rqQ56CB6ZO+5o6lbGlua1xuICogQHBhcmFtIGVyclxuICovXG5mdW5jdGlvbiBnZXRTb3VyY2VMaW5rKGVycjogRXJyb3IpIHtcbiAgbGV0IHNvdXJjZUxpbmsgPSAnJ1xuICBjb25zdCBvdXR0ZXJFcnJTdGFja3MgPSBlcnIuc3RhY2suc3BsaXQoJ1xcbicpXG4gIGNvbnN0IGluZGV4T2ZEZWNvcmF0b3IgPSBvdXR0ZXJFcnJTdGFja3MuZmluZEluZGV4KHN0ciA9PiBSRUdfU1RBQ0tfREVDT1JBVEUudGVzdChzdHIpKVxuXG4gIGlmIChpbmRleE9mRGVjb3JhdG9yICE9PSAtMSkge1xuICAgIGNvbnN0IG1hdGNoID0gUkVHX1NUQUNLX0xJTksuZXhlYyhvdXR0ZXJFcnJTdGFja3NbaW5kZXhPZkRlY29yYXRvciArIDFdIHx8ICcnKVxuXG4gICAgc291cmNlTGluayA9IG1hdGNoID8gbWF0Y2hbMF0gOiAnJ1xuICB9XG4gIHJldHVybiBzb3VyY2VMaW5rXG59XG5cbi8qKlxuICog5Zyo5Y6f5aeL5aCG5qCI5Lit5p+l5om+6KOF6aWw5Zmo5p2h55uu77yM5YmU6Zmk5YW25ZCO55qE5peg55So5aCG5qCI77yM5bm25bCG6ZO+5o6l5pu/5o2i5Li65rqQ56CBbGlua1xuICogQHBhcmFtIG9wdGlvbnNcbiAqL1xuZnVuY3Rpb24gZ2V0UmV3cml0ZWRFcnJvcihvcHRpb25zOiB7XG4gIGVycjogRXJyb3I7XG4gIGNsYXNzTmFtZTogc3RyaW5nO1xuICBtZXRob2ROYW1lOiBzdHJpbmc7XG4gIHNvdXJjZUxpbms6IHN0cmluZztcbn0pIHtcbiAgY29uc3QgeyBlcnIsIGNsYXNzTmFtZSwgbWV0aG9kTmFtZSwgc291cmNlTGluayB9ID0gb3B0aW9uc1xuICAvLyDmib7kuI3liLDmupDnoIFsaW5r6L+U5ZuebnVsbO+8jOWQjue7remAu+i+keWwhuaJk+WNsOWOn+WghuagiOS/oeaBr1xuICBpZiAoIXNvdXJjZUxpbmspIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgY29uc3QgaW5uZXJFcnJTdGFjayA9IGVyci5zdGFjay5zcGxpdCgnXFxuJylcbiAgY29uc3QgUkVHX1NUQUNLX0lOTkVSX01FVEhPRCA9IGlzRmlyZWZveFxuICAgID8gL15jYXRjaEVycm9yc0RlY29yYXRvclxcLzxcXC9kZXNjcmlwdG9yLnZhbHVlQC4qXFxkJC9cbiAgICA6IG5ldyBSZWdFeHAoYCR7Y2xhc3NOYW1lfVxcXFwuZGVzY3JpcHRvci52YWx1ZVxcXFxzKlxcXFxbYXNcXFxccyR7bWV0aG9kTmFtZX1cXFxcXVxcXFxzKlxcXFwoLipcXFxcKSRgKVxuICBjb25zdCBSRUdfU1RBQ0tfSU5ORVJfTUVUSE9EX1dJVEhPVVRfTElOSyA9IGlzRmlyZWZveFxuICAgID8gL15jYXRjaEVycm9yc0RlY29yYXRvclxcLzxcXC9kZXNjcmlwdG9yLnZhbHVlL1xuICAgIDogbmV3IFJlZ0V4cChgJHtjbGFzc05hbWV9XFxcXC5kZXNjcmlwdG9yLnZhbHVlXFxcXHMqXFxcXFthc1xcXFxzJHttZXRob2ROYW1lfVxcXFxdYClcbiAgY29uc3QgaW5kZXhPZlNvdXJjZSA9IGlubmVyRXJyU3RhY2suZmluZEluZGV4KHN0ciA9PiBSRUdfU1RBQ0tfSU5ORVJfTUVUSE9ELnRlc3Qoc3RyKSlcbiAgbGV0IGlubmVyRXJyOiBFcnJvclxuICBpZiAoaW5kZXhPZlNvdXJjZSAhPT0gLTEpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgcmVhbEVyclN0YWNrID0gaW5uZXJFcnJTdGFjay5maWx0ZXIoKHYsIGkpID0+IGkgPiBpbmRleE9mU291cmNlKVxuICAgIHJlYWxFcnJTdGFjay51bnNoaWZ0KGlubmVyRXJyU3RhY2tbaW5kZXhPZlNvdXJjZV1cbiAgICAgIC5yZXBsYWNlKFJFR19TVEFDS19JTk5FUl9NRVRIT0RfV0lUSE9VVF9MSU5LLCBgJHtjbGFzc05hbWV9LiR7bWV0aG9kTmFtZX1gKVxuICAgICAgLnJlcGxhY2UoUkVHX1NUQUNLX0xJTkssIHNvdXJjZUxpbmspKVxuICAgIGlubmVyRXJyID0gbmV3IEVycm9yKClcbiAgICBpbm5lckVyci5zdGFjayA9IGAke2lzRmlyZWZveCA/ICdAZGVidWdnZXInIDogJ0Vycm9yJ31cXG4ke3JlYWxFcnJTdGFjay5qb2luKCdcXG4nKX1gXG4gIH1cbiAgcmV0dXJuIGlubmVyRXJyXG59XG4iXX0=
}, function(modId) { var map = {"../libs/util":1739108424873,"../constants":1739108424868}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1739108424878, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var AbortController = (function () {
    function AbortController() {
        var _this = this;
        this.listeners = [];
        this.signal = {
            aborted: false,
            addEventListener: function (e, f) {
                if (e === 'abort') {
                    _this.listeners.push(f);
                }
            },
        };
    }
    AbortController.prototype.abort = function () {
        if (this.signal.aborted)
            return;
        this.signal.aborted = true;
        this.listeners.forEach(function (f) { return f(); });
    };
    return AbortController;
}());
exports.default = AbortController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJvcnRDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYnMvYWJvcnRDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7SUFVRTtRQUFBLGlCQUFnQjtRQVRoQixjQUFTLEdBQTRCLEVBQUUsQ0FBQTtRQUN2QyxXQUFNLEdBQUc7WUFDUCxPQUFPLEVBQUUsS0FBSztZQUNkLGdCQUFnQixFQUFFLFVBQUMsQ0FBUyxFQUFFLENBQW1CO2dCQUMvQyxJQUFJLENBQUMsS0FBSyxPQUFPLEVBQUU7b0JBQ2pCLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO2lCQUN2QjtZQUNILENBQUM7U0FDRixDQUFBO0lBQ2MsQ0FBQztJQUVoQiwrQkFBSyxHQUFMO1FBQ0UsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU87WUFBRSxPQUFNO1FBRS9CLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQTtRQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsRUFBRSxFQUFILENBQUcsQ0FBQyxDQUFBO0lBQ2xDLENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUFsQkQsSUFrQkMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBBYm9ydENvbnRyb2xsZXIge1xuICBsaXN0ZW5lcnM6IEFycmF5PENhbGxhYmxlRnVuY3Rpb24+ID0gW11cbiAgc2lnbmFsID0ge1xuICAgIGFib3J0ZWQ6IGZhbHNlLFxuICAgIGFkZEV2ZW50TGlzdGVuZXI6IChlOiBzdHJpbmcsIGY6IENhbGxhYmxlRnVuY3Rpb24pID0+IHtcbiAgICAgIGlmIChlID09PSAnYWJvcnQnKSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzLnB1c2goZilcbiAgICAgIH1cbiAgICB9LFxuICB9XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBhYm9ydCgpIHtcbiAgICBpZiAodGhpcy5zaWduYWwuYWJvcnRlZCkgcmV0dXJuXG5cbiAgICB0aGlzLnNpZ25hbC5hYm9ydGVkID0gdHJ1ZVxuICAgIHRoaXMubGlzdGVuZXJzLmZvckVhY2goZiA9PiBmKCkpXG4gIH1cbn1cbiJdfQ==
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1739108424867);
})()
//miniprogram-npm-outsideDeps=["jwt-decode","@cloudbase/adapter-interface"]
//# sourceMappingURL=index.js.map