module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1739108424894, function(require, module, exports) {
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof exports === "object") {
        module.exports = factory();
    } else {
		var textEncoding = factory();
        root.TextEncoder = textEncoding.TextEncoder;
		root.TextDecoder = textEncoding.TextDecoder;
    }
}(this, function () {
	
	// return native implementation if available
	var g = typeof global !== 'undefined' ? global : self;
	if (typeof g.TextEncoder !== 'undefined' && typeof g.TextDecoder !== 'undefined') {
		return {'TextEncoder': g.TextEncoder, 'TextDecoder': g.TextDecoder};
	}

	// allowed encoding strings for utf-8
	var utf8Encodings = [
		'utf8',
		'utf-8',
		'unicode-1-1-utf-8'
	];

	var TextEncoder = function(encoding) {
		if (utf8Encodings.indexOf(encoding) < 0 && typeof encoding !== 'undefined' && encoding !== null) {
			throw new RangeError('Invalid encoding type. Only utf-8 is supported');
		} else {
			this.encoding = 'utf-8';
			this.encode = function(str) {
				if (typeof str !== 'string') {
					throw new TypeError('passed argument must be of type string');
				}
				var binstr = unescape(encodeURIComponent(str)),
					arr = new Uint8Array(binstr.length);
				binstr.split('').forEach(function(char, i) {
					arr[i] = char.charCodeAt(0);
				});
				return arr;
			};
		}
	};

	var TextDecoder = function(encoding, options) {
		if (utf8Encodings.indexOf(encoding) < 0 && typeof encoding !== 'undefined' && encoding !== null) {
			throw new RangeError('Invalid encoding type. Only utf-8 is supported');
		}
		this.encoding = 'utf-8';
		this.ignoreBOM = false;
		this.fatal = (typeof options !== 'undefined' && 'fatal' in options) ? options.fatal : false;
		if (typeof this.fatal !== 'boolean') {
			throw new TypeError('fatal flag must be boolean');
		}
		this.decode = function (view, options) {
			if (typeof view === 'undefined') {
				return '';
			}

			var stream = (typeof options !== 'undefined' && 'stream' in options) ? options.stream : false;
			if (typeof stream !== 'boolean') {
				throw new TypeError('stream option must be boolean');
			}

			if (!ArrayBuffer.isView(view)) {
				throw new TypeError('passed argument must be an array buffer view');
			} else {
				var arr = new Uint8Array(view.buffer, view.byteOffset, view.byteLength),
					charArr = new Array(arr.length);
				arr.forEach(function(charcode, i) {
					charArr[i] = String.fromCharCode(charcode);
				});
				return decodeURIComponent(escape(charArr.join('')));
			}
		};
	};
	return {'TextEncoder': TextEncoder, 'TextDecoder': TextDecoder};
}));

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1739108424894);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map