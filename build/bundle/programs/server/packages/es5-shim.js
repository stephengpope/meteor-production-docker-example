(function () {

/* Package-scope variables */
var Date, parseInt, originalStringReplace;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/es5-shim/import_globals.js                                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var global = this;                                                                                                     // 1
                                                                                                                       // 2
// Because the es5-{shim,sham}.js code assigns to Date and parseInt,                                                   // 3
// Meteor treats them as package variables, and so declares them as                                                    // 4
// variables in package scope, which causes some references to Date and                                                // 5
// parseInt in the shim/sham code to refer to those undefined package                                                  // 6
// variables. The simplest solution seems to be to initialize the package                                              // 7
// variables to their appropriate global values.                                                                       // 8
Date = global.Date;                                                                                                    // 9
parseInt = global.parseInt;                                                                                            // 10
                                                                                                                       // 11
// Save the original String#replace method, because es5-shim's                                                         // 12
// reimplementation of it causes problems in markdown/showdown.js.                                                     // 13
// This original method will be restored in export_globals.js.                                                         // 14
originalStringReplace = String.prototype.replace;                                                                      // 15
                                                                                                                       // 16
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/es5-shim/.npm/package/node_modules/es5-shim/es5-shim.js                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/*!                                                                                                                    // 1
 * https://github.com/es-shims/es5-shim                                                                                // 2
 * @license es5-shim Copyright 2009-2015 by contributors, MIT License                                                  // 3
 * see https://github.com/es-shims/es5-shim/blob/master/LICENSE                                                        // 4
 */                                                                                                                    // 5
                                                                                                                       // 6
// vim: ts=4 sts=4 sw=4 expandtab                                                                                      // 7
                                                                                                                       // 8
// Add semicolon to prevent IIFE from being passed as argument to concatenated code.                                   // 9
;                                                                                                                      // 10
                                                                                                                       // 11
// UMD (Universal Module Definition)                                                                                   // 12
// see https://github.com/umdjs/umd/blob/master/returnExports.js                                                       // 13
(function (root, factory) {                                                                                            // 14
    'use strict';                                                                                                      // 15
                                                                                                                       // 16
    /* global define, exports, module */                                                                               // 17
    if (typeof define === 'function' && define.amd) {                                                                  // 18
        // AMD. Register as an anonymous module.                                                                       // 19
        define(factory);                                                                                               // 20
    } else if (typeof exports === 'object') {                                                                          // 21
        // Node. Does not work with strict CommonJS, but                                                               // 22
        // only CommonJS-like enviroments that support module.exports,                                                 // 23
        // like Node.                                                                                                  // 24
        module.exports = factory();                                                                                    // 25
    } else {                                                                                                           // 26
        // Browser globals (root is window)                                                                            // 27
        root.returnExports = factory();                                                                                // 28
    }                                                                                                                  // 29
}(this, function () {                                                                                                  // 30
                                                                                                                       // 31
/**                                                                                                                    // 32
 * Brings an environment as close to ECMAScript 5 compliance                                                           // 33
 * as is possible with the facilities of erstwhile engines.                                                            // 34
 *                                                                                                                     // 35
 * Annotated ES5: http://es5.github.com/ (specific links below)                                                        // 36
 * ES5 Spec: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf                                 // 37
 * Required reading: http://javascriptweblog.wordpress.com/2011/12/05/extending-javascript-natives/                    // 38
 */                                                                                                                    // 39
                                                                                                                       // 40
// Shortcut to an often accessed properties, in order to avoid multiple                                                // 41
// dereference that costs universally. This also holds a reference to known-good                                       // 42
// functions.                                                                                                          // 43
var $Array = Array;                                                                                                    // 44
var ArrayPrototype = $Array.prototype;                                                                                 // 45
var $Object = Object;                                                                                                  // 46
var ObjectPrototype = $Object.prototype;                                                                               // 47
var FunctionPrototype = Function.prototype;                                                                            // 48
var $String = String;                                                                                                  // 49
var StringPrototype = $String.prototype;                                                                               // 50
var $Number = Number;                                                                                                  // 51
var NumberPrototype = $Number.prototype;                                                                               // 52
var array_slice = ArrayPrototype.slice;                                                                                // 53
var array_splice = ArrayPrototype.splice;                                                                              // 54
var array_push = ArrayPrototype.push;                                                                                  // 55
var array_unshift = ArrayPrototype.unshift;                                                                            // 56
var array_concat = ArrayPrototype.concat;                                                                              // 57
var call = FunctionPrototype.call;                                                                                     // 58
var max = Math.max;                                                                                                    // 59
var min = Math.min;                                                                                                    // 60
                                                                                                                       // 61
// Having a toString local variable name breaks in Opera so use to_string.                                             // 62
var to_string = ObjectPrototype.toString;                                                                              // 63
                                                                                                                       // 64
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';                           // 65
var isCallable; /* inlined from https://npmjs.com/is-callable */ var fnToStr = Function.prototype.toString, tryFunctionObject = function tryFunctionObject(value) { try { fnToStr.call(value); return true; } catch (e) { return false; } }, fnClass = '[object Function]', genClass = '[object GeneratorFunction]'; isCallable = function isCallable(value) { if (typeof value !== 'function') { return false; } if (hasToStringTag) { return tryFunctionObject(value); } var strClass = to_string.call(value); return strClass === fnClass || strClass === genClass; };
var isRegex; /* inlined from https://npmjs.com/is-regex */ var regexExec = RegExp.prototype.exec, tryRegexExec = function tryRegexExec(value) { try { regexExec.call(value); return true; } catch (e) { return false; } }, regexClass = '[object RegExp]'; isRegex = function isRegex(value) { if (typeof value !== 'object') { return false; } return hasToStringTag ? tryRegexExec(value) : to_string.call(value) === regexClass; };
var isString; /* inlined from https://npmjs.com/is-string */ var strValue = String.prototype.valueOf, tryStringObject = function tryStringObject(value) { try { strValue.call(value); return true; } catch (e) { return false; } }, stringClass = '[object String]'; isString = function isString(value) { if (typeof value === 'string') { return true; } if (typeof value !== 'object') { return false; } return hasToStringTag ? tryStringObject(value) : to_string.call(value) === stringClass; };
                                                                                                                       // 69
/* inlined from http://npmjs.com/define-properties */                                                                  // 70
var defineProperties = (function (has) {                                                                               // 71
  var supportsDescriptors = $Object.defineProperty && (function () {                                                   // 72
      try {                                                                                                            // 73
          var obj = {};                                                                                                // 74
          $Object.defineProperty(obj, 'x', { enumerable: false, value: obj });                                         // 75
          for (var _ in obj) { return false; }                                                                         // 76
          return obj.x === obj;                                                                                        // 77
      } catch (e) { /* this is ES3 */                                                                                  // 78
          return false;                                                                                                // 79
      }                                                                                                                // 80
  }());                                                                                                                // 81
                                                                                                                       // 82
  // Define configurable, writable and non-enumerable props                                                            // 83
  // if they don't exist.                                                                                              // 84
  var defineProperty;                                                                                                  // 85
  if (supportsDescriptors) {                                                                                           // 86
      defineProperty = function (object, name, method, forceAssign) {                                                  // 87
          if (!forceAssign && (name in object)) { return; }                                                            // 88
          $Object.defineProperty(object, name, {                                                                       // 89
              configurable: true,                                                                                      // 90
              enumerable: false,                                                                                       // 91
              writable: true,                                                                                          // 92
              value: method                                                                                            // 93
          });                                                                                                          // 94
      };                                                                                                               // 95
  } else {                                                                                                             // 96
      defineProperty = function (object, name, method, forceAssign) {                                                  // 97
          if (!forceAssign && (name in object)) { return; }                                                            // 98
          object[name] = method;                                                                                       // 99
      };                                                                                                               // 100
  }                                                                                                                    // 101
  return function defineProperties(object, map, forceAssign) {                                                         // 102
      for (var name in map) {                                                                                          // 103
          if (has.call(map, name)) {                                                                                   // 104
            defineProperty(object, name, map[name], forceAssign);                                                      // 105
          }                                                                                                            // 106
      }                                                                                                                // 107
  };                                                                                                                   // 108
}(ObjectPrototype.hasOwnProperty));                                                                                    // 109
                                                                                                                       // 110
//                                                                                                                     // 111
// Util                                                                                                                // 112
// ======                                                                                                              // 113
//                                                                                                                     // 114
                                                                                                                       // 115
/* replaceable with https://npmjs.com/package/es-abstract /helpers/isPrimitive */                                      // 116
var isPrimitive = function isPrimitive(input) {                                                                        // 117
    var type = typeof input;                                                                                           // 118
    return input === null || (type !== 'object' && type !== 'function');                                               // 119
};                                                                                                                     // 120
                                                                                                                       // 121
var ES = {                                                                                                             // 122
    // ES5 9.4                                                                                                         // 123
    // http://es5.github.com/#x9.4                                                                                     // 124
    // http://jsperf.com/to-integer                                                                                    // 125
    /* replaceable with https://npmjs.com/package/es-abstract ES5.ToInteger */                                         // 126
    ToInteger: function ToInteger(num) {                                                                               // 127
        var n = +num;                                                                                                  // 128
        if (n !== n) { // isNaN                                                                                        // 129
            n = 0;                                                                                                     // 130
        } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {                                                       // 131
            n = (n > 0 || -1) * Math.floor(Math.abs(n));                                                               // 132
        }                                                                                                              // 133
        return n;                                                                                                      // 134
    },                                                                                                                 // 135
                                                                                                                       // 136
    /* replaceable with https://npmjs.com/package/es-abstract ES5.ToPrimitive */                                       // 137
    ToPrimitive: function ToPrimitive(input) {                                                                         // 138
        var val, valueOf, toStr;                                                                                       // 139
        if (isPrimitive(input)) {                                                                                      // 140
            return input;                                                                                              // 141
        }                                                                                                              // 142
        valueOf = input.valueOf;                                                                                       // 143
        if (isCallable(valueOf)) {                                                                                     // 144
            val = valueOf.call(input);                                                                                 // 145
            if (isPrimitive(val)) {                                                                                    // 146
                return val;                                                                                            // 147
            }                                                                                                          // 148
        }                                                                                                              // 149
        toStr = input.toString;                                                                                        // 150
        if (isCallable(toStr)) {                                                                                       // 151
            val = toStr.call(input);                                                                                   // 152
            if (isPrimitive(val)) {                                                                                    // 153
                return val;                                                                                            // 154
            }                                                                                                          // 155
        }                                                                                                              // 156
        throw new TypeError();                                                                                         // 157
    },                                                                                                                 // 158
                                                                                                                       // 159
    // ES5 9.9                                                                                                         // 160
    // http://es5.github.com/#x9.9                                                                                     // 161
    /* replaceable with https://npmjs.com/package/es-abstract ES5.ToObject */                                          // 162
    ToObject: function (o) {                                                                                           // 163
        /* jshint eqnull: true */                                                                                      // 164
        if (o == null) { // this matches both null and undefined                                                       // 165
            throw new TypeError("can't convert " + o + ' to object');                                                  // 166
        }                                                                                                              // 167
        return $Object(o);                                                                                             // 168
    },                                                                                                                 // 169
                                                                                                                       // 170
    /* replaceable with https://npmjs.com/package/es-abstract ES5.ToUint32 */                                          // 171
    ToUint32: function ToUint32(x) {                                                                                   // 172
        return x >>> 0;                                                                                                // 173
    }                                                                                                                  // 174
};                                                                                                                     // 175
                                                                                                                       // 176
//                                                                                                                     // 177
// Function                                                                                                            // 178
// ========                                                                                                            // 179
//                                                                                                                     // 180
                                                                                                                       // 181
// ES-5 15.3.4.5                                                                                                       // 182
// http://es5.github.com/#x15.3.4.5                                                                                    // 183
                                                                                                                       // 184
var Empty = function Empty() {};                                                                                       // 185
                                                                                                                       // 186
defineProperties(FunctionPrototype, {                                                                                  // 187
    bind: function bind(that) { // .length is 1                                                                        // 188
        // 1. Let Target be the this value.                                                                            // 189
        var target = this;                                                                                             // 190
        // 2. If IsCallable(Target) is false, throw a TypeError exception.                                             // 191
        if (!isCallable(target)) {                                                                                     // 192
            throw new TypeError('Function.prototype.bind called on incompatible ' + target);                           // 193
        }                                                                                                              // 194
        // 3. Let A be a new (possibly empty) internal list of all of the                                              // 195
        //   argument values provided after thisArg (arg1, arg2 etc), in order.                                        // 196
        // XXX slicedArgs will stand in for "A" if used                                                                // 197
        var args = array_slice.call(arguments, 1); // for normal call                                                  // 198
        // 4. Let F be a new native ECMAScript object.                                                                 // 199
        // 11. Set the [[Prototype]] internal property of F to the standard                                            // 200
        //   built-in Function prototype object as specified in 15.3.3.1.                                              // 201
        // 12. Set the [[Call]] internal property of F as described in                                                 // 202
        //   15.3.4.5.1.                                                                                               // 203
        // 13. Set the [[Construct]] internal property of F as described in                                            // 204
        //   15.3.4.5.2.                                                                                               // 205
        // 14. Set the [[HasInstance]] internal property of F as described in                                          // 206
        //   15.3.4.5.3.                                                                                               // 207
        var bound;                                                                                                     // 208
        var binder = function () {                                                                                     // 209
                                                                                                                       // 210
            if (this instanceof bound) {                                                                               // 211
                // 15.3.4.5.2 [[Construct]]                                                                            // 212
                // When the [[Construct]] internal method of a function object,                                        // 213
                // F that was created using the bind function is called with a                                         // 214
                // list of arguments ExtraArgs, the following steps are taken:                                         // 215
                // 1. Let target be the value of F's [[TargetFunction]]                                                // 216
                //   internal property.                                                                                // 217
                // 2. If target has no [[Construct]] internal method, a                                                // 218
                //   TypeError exception is thrown.                                                                    // 219
                // 3. Let boundArgs be the value of F's [[BoundArgs]] internal                                         // 220
                //   property.                                                                                         // 221
                // 4. Let args be a new list containing the same values as the                                         // 222
                //   list boundArgs in the same order followed by the same                                             // 223
                //   values as the list ExtraArgs in the same order.                                                   // 224
                // 5. Return the result of calling the [[Construct]] internal                                          // 225
                //   method of target providing args as the arguments.                                                 // 226
                                                                                                                       // 227
                var result = target.apply(                                                                             // 228
                    this,                                                                                              // 229
                    array_concat.call(args, array_slice.call(arguments))                                               // 230
                );                                                                                                     // 231
                if ($Object(result) === result) {                                                                      // 232
                    return result;                                                                                     // 233
                }                                                                                                      // 234
                return this;                                                                                           // 235
                                                                                                                       // 236
            } else {                                                                                                   // 237
                // 15.3.4.5.1 [[Call]]                                                                                 // 238
                // When the [[Call]] internal method of a function object, F,                                          // 239
                // which was created using the bind function is called with a                                          // 240
                // this value and a list of arguments ExtraArgs, the following                                         // 241
                // steps are taken:                                                                                    // 242
                // 1. Let boundArgs be the value of F's [[BoundArgs]] internal                                         // 243
                //   property.                                                                                         // 244
                // 2. Let boundThis be the value of F's [[BoundThis]] internal                                         // 245
                //   property.                                                                                         // 246
                // 3. Let target be the value of F's [[TargetFunction]] internal                                       // 247
                //   property.                                                                                         // 248
                // 4. Let args be a new list containing the same values as the                                         // 249
                //   list boundArgs in the same order followed by the same                                             // 250
                //   values as the list ExtraArgs in the same order.                                                   // 251
                // 5. Return the result of calling the [[Call]] internal method                                        // 252
                //   of target providing boundThis as the this value and                                               // 253
                //   providing args as the arguments.                                                                  // 254
                                                                                                                       // 255
                // equiv: target.call(this, ...boundArgs, ...args)                                                     // 256
                return target.apply(                                                                                   // 257
                    that,                                                                                              // 258
                    array_concat.call(args, array_slice.call(arguments))                                               // 259
                );                                                                                                     // 260
                                                                                                                       // 261
            }                                                                                                          // 262
                                                                                                                       // 263
        };                                                                                                             // 264
                                                                                                                       // 265
        // 15. If the [[Class]] internal property of Target is "Function", then                                        // 266
        //     a. Let L be the length property of Target minus the length of A.                                        // 267
        //     b. Set the length own property of F to either 0 or L, whichever is                                      // 268
        //       larger.                                                                                               // 269
        // 16. Else set the length own property of F to 0.                                                             // 270
                                                                                                                       // 271
        var boundLength = max(0, target.length - args.length);                                                         // 272
                                                                                                                       // 273
        // 17. Set the attributes of the length own property of F to the values                                        // 274
        //   specified in 15.3.5.1.                                                                                    // 275
        var boundArgs = [];                                                                                            // 276
        for (var i = 0; i < boundLength; i++) {                                                                        // 277
            array_push.call(boundArgs, '$' + i);                                                                       // 278
        }                                                                                                              // 279
                                                                                                                       // 280
        // XXX Build a dynamic function with desired amount of arguments is the only                                   // 281
        // way to set the length property of a function.                                                               // 282
        // In environments where Content Security Policies enabled (Chrome extensions,                                 // 283
        // for ex.) all use of eval or Function costructor throws an exception.                                        // 284
        // However in all of these environments Function.prototype.bind exists                                         // 285
        // and so this code will never be executed.                                                                    // 286
        bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);
                                                                                                                       // 288
        if (target.prototype) {                                                                                        // 289
            Empty.prototype = target.prototype;                                                                        // 290
            bound.prototype = new Empty();                                                                             // 291
            // Clean up dangling references.                                                                           // 292
            Empty.prototype = null;                                                                                    // 293
        }                                                                                                              // 294
                                                                                                                       // 295
        // TODO                                                                                                        // 296
        // 18. Set the [[Extensible]] internal property of F to true.                                                  // 297
                                                                                                                       // 298
        // TODO                                                                                                        // 299
        // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).                                         // 300
        // 20. Call the [[DefineOwnProperty]] internal method of F with                                                // 301
        //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:                                        // 302
        //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and                                             // 303
        //   false.                                                                                                    // 304
        // 21. Call the [[DefineOwnProperty]] internal method of F with                                                // 305
        //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,                                              // 306
        //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},                                        // 307
        //   and false.                                                                                                // 308
                                                                                                                       // 309
        // TODO                                                                                                        // 310
        // NOTE Function objects created using Function.prototype.bind do not                                          // 311
        // have a prototype property or the [[Code]], [[FormalParameters]], and                                        // 312
        // [[Scope]] internal properties.                                                                              // 313
        // XXX can't delete prototype in pure-js.                                                                      // 314
                                                                                                                       // 315
        // 22. Return F.                                                                                               // 316
        return bound;                                                                                                  // 317
    }                                                                                                                  // 318
});                                                                                                                    // 319
                                                                                                                       // 320
// _Please note: Shortcuts are defined after `Function.prototype.bind` as we                                           // 321
// us it in defining shortcuts.                                                                                        // 322
var owns = call.bind(ObjectPrototype.hasOwnProperty);                                                                  // 323
var toStr = call.bind(ObjectPrototype.toString);                                                                       // 324
var strSlice = call.bind(StringPrototype.slice);                                                                       // 325
var strSplit = call.bind(StringPrototype.split);                                                                       // 326
                                                                                                                       // 327
//                                                                                                                     // 328
// Array                                                                                                               // 329
// =====                                                                                                               // 330
//                                                                                                                     // 331
                                                                                                                       // 332
var isArray = $Array.isArray || function isArray(obj) {                                                                // 333
    return toStr(obj) === '[object Array]';                                                                            // 334
};                                                                                                                     // 335
                                                                                                                       // 336
// ES5 15.4.4.12                                                                                                       // 337
// http://es5.github.com/#x15.4.4.13                                                                                   // 338
// Return len+argCount.                                                                                                // 339
// [bugfix, ielt8]                                                                                                     // 340
// IE < 8 bug: [].unshift(0) === undefined but should be "1"                                                           // 341
var hasUnshiftReturnValueBug = [].unshift(0) !== 1;                                                                    // 342
defineProperties(ArrayPrototype, {                                                                                     // 343
    unshift: function () {                                                                                             // 344
        array_unshift.apply(this, arguments);                                                                          // 345
        return this.length;                                                                                            // 346
    }                                                                                                                  // 347
}, hasUnshiftReturnValueBug);                                                                                          // 348
                                                                                                                       // 349
// ES5 15.4.3.2                                                                                                        // 350
// http://es5.github.com/#x15.4.3.2                                                                                    // 351
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray                                  // 352
defineProperties($Array, { isArray: isArray });                                                                        // 353
                                                                                                                       // 354
// The IsCallable() check in the Array functions                                                                       // 355
// has been replaced with a strict check on the                                                                        // 356
// internal class of the object to trap cases where                                                                    // 357
// the provided function was actually a regular                                                                        // 358
// expression literal, which in V8 and                                                                                 // 359
// JavaScriptCore is a typeof "function".  Only in                                                                     // 360
// V8 are regular expression literals permitted as                                                                     // 361
// reduce parameters, so it is desirable in the                                                                        // 362
// general case for the shim to match the more                                                                         // 363
// strict and common behavior of rejecting regular                                                                     // 364
// expressions.                                                                                                        // 365
                                                                                                                       // 366
// ES5 15.4.4.18                                                                                                       // 367
// http://es5.github.com/#x15.4.4.18                                                                                   // 368
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/forEach                                  // 369
                                                                                                                       // 370
// Check failure of by-index access of string characters (IE < 9)                                                      // 371
// and failure of `0 in boxedString` (Rhino)                                                                           // 372
var boxedString = $Object('a');                                                                                        // 373
var splitString = boxedString[0] !== 'a' || !(0 in boxedString);                                                       // 374
                                                                                                                       // 375
var properlyBoxesContext = function properlyBoxed(method) {                                                            // 376
    // Check node 0.6.21 bug where third parameter is not boxed                                                        // 377
    var properlyBoxesNonStrict = true;                                                                                 // 378
    var properlyBoxesStrict = true;                                                                                    // 379
    if (method) {                                                                                                      // 380
        method.call('foo', function (_, __, context) {                                                                 // 381
            if (typeof context !== 'object') { properlyBoxesNonStrict = false; }                                       // 382
        });                                                                                                            // 383
                                                                                                                       // 384
        method.call([1], function () {                                                                                 // 385
            'use strict';                                                                                              // 386
                                                                                                                       // 387
            properlyBoxesStrict = typeof this === 'string';                                                            // 388
        }, 'x');                                                                                                       // 389
    }                                                                                                                  // 390
    return !!method && properlyBoxesNonStrict && properlyBoxesStrict;                                                  // 391
};                                                                                                                     // 392
                                                                                                                       // 393
defineProperties(ArrayPrototype, {                                                                                     // 394
    forEach: function forEach(callbackfn /*, thisArg*/) {                                                              // 395
        var object = ES.ToObject(this);                                                                                // 396
        var self = splitString && isString(this) ? strSplit(this, '') : object;                                        // 397
        var i = -1;                                                                                                    // 398
        var length = self.length >>> 0;                                                                                // 399
        var T;                                                                                                         // 400
        if (arguments.length > 1) {                                                                                    // 401
          T = arguments[1];                                                                                            // 402
        }                                                                                                              // 403
                                                                                                                       // 404
        // If no callback function or if callback is not a callable function                                           // 405
        if (!isCallable(callbackfn)) {                                                                                 // 406
            throw new TypeError('Array.prototype.forEach callback must be a function');                                // 407
        }                                                                                                              // 408
                                                                                                                       // 409
        while (++i < length) {                                                                                         // 410
            if (i in self) {                                                                                           // 411
                // Invoke the callback function with call, passing arguments:                                          // 412
                // context, property value, property key, thisArg object                                               // 413
                if (typeof T !== 'undefined') {                                                                        // 414
                    callbackfn.call(T, self[i], i, object);                                                            // 415
                } else {                                                                                               // 416
                    callbackfn(self[i], i, object);                                                                    // 417
                }                                                                                                      // 418
            }                                                                                                          // 419
        }                                                                                                              // 420
    }                                                                                                                  // 421
}, !properlyBoxesContext(ArrayPrototype.forEach));                                                                     // 422
                                                                                                                       // 423
// ES5 15.4.4.19                                                                                                       // 424
// http://es5.github.com/#x15.4.4.19                                                                                   // 425
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/map                                    // 426
defineProperties(ArrayPrototype, {                                                                                     // 427
    map: function map(callbackfn/*, thisArg*/) {                                                                       // 428
        var object = ES.ToObject(this);                                                                                // 429
        var self = splitString && isString(this) ? strSplit(this, '') : object;                                        // 430
        var length = self.length >>> 0;                                                                                // 431
        var result = $Array(length);                                                                                   // 432
        var T;                                                                                                         // 433
        if (arguments.length > 1) {                                                                                    // 434
            T = arguments[1];                                                                                          // 435
        }                                                                                                              // 436
                                                                                                                       // 437
        // If no callback function or if callback is not a callable function                                           // 438
        if (!isCallable(callbackfn)) {                                                                                 // 439
            throw new TypeError('Array.prototype.map callback must be a function');                                    // 440
        }                                                                                                              // 441
                                                                                                                       // 442
        for (var i = 0; i < length; i++) {                                                                             // 443
            if (i in self) {                                                                                           // 444
                if (typeof T !== 'undefined') {                                                                        // 445
                    result[i] = callbackfn.call(T, self[i], i, object);                                                // 446
                } else {                                                                                               // 447
                    result[i] = callbackfn(self[i], i, object);                                                        // 448
                }                                                                                                      // 449
            }                                                                                                          // 450
        }                                                                                                              // 451
        return result;                                                                                                 // 452
    }                                                                                                                  // 453
}, !properlyBoxesContext(ArrayPrototype.map));                                                                         // 454
                                                                                                                       // 455
// ES5 15.4.4.20                                                                                                       // 456
// http://es5.github.com/#x15.4.4.20                                                                                   // 457
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/filter                                 // 458
defineProperties(ArrayPrototype, {                                                                                     // 459
    filter: function filter(callbackfn /*, thisArg*/) {                                                                // 460
        var object = ES.ToObject(this);                                                                                // 461
        var self = splitString && isString(this) ? strSplit(this, '') : object;                                        // 462
        var length = self.length >>> 0;                                                                                // 463
        var result = [];                                                                                               // 464
        var value;                                                                                                     // 465
        var T;                                                                                                         // 466
        if (arguments.length > 1) {                                                                                    // 467
            T = arguments[1];                                                                                          // 468
        }                                                                                                              // 469
                                                                                                                       // 470
        // If no callback function or if callback is not a callable function                                           // 471
        if (!isCallable(callbackfn)) {                                                                                 // 472
            throw new TypeError('Array.prototype.filter callback must be a function');                                 // 473
        }                                                                                                              // 474
                                                                                                                       // 475
        for (var i = 0; i < length; i++) {                                                                             // 476
            if (i in self) {                                                                                           // 477
                value = self[i];                                                                                       // 478
                if (typeof T === 'undefined' ? callbackfn(value, i, object) : callbackfn.call(T, value, i, object)) {  // 479
                    array_push.call(result, value);                                                                    // 480
                }                                                                                                      // 481
            }                                                                                                          // 482
        }                                                                                                              // 483
        return result;                                                                                                 // 484
    }                                                                                                                  // 485
}, !properlyBoxesContext(ArrayPrototype.filter));                                                                      // 486
                                                                                                                       // 487
// ES5 15.4.4.16                                                                                                       // 488
// http://es5.github.com/#x15.4.4.16                                                                                   // 489
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every                                    // 490
defineProperties(ArrayPrototype, {                                                                                     // 491
    every: function every(callbackfn /*, thisArg*/) {                                                                  // 492
        var object = ES.ToObject(this);                                                                                // 493
        var self = splitString && isString(this) ? strSplit(this, '') : object;                                        // 494
        var length = self.length >>> 0;                                                                                // 495
        var T;                                                                                                         // 496
        if (arguments.length > 1) {                                                                                    // 497
            T = arguments[1];                                                                                          // 498
        }                                                                                                              // 499
                                                                                                                       // 500
        // If no callback function or if callback is not a callable function                                           // 501
        if (!isCallable(callbackfn)) {                                                                                 // 502
            throw new TypeError('Array.prototype.every callback must be a function');                                  // 503
        }                                                                                                              // 504
                                                                                                                       // 505
        for (var i = 0; i < length; i++) {                                                                             // 506
            if (i in self && !(typeof T === 'undefined' ? callbackfn(self[i], i, object) : callbackfn.call(T, self[i], i, object))) {
                return false;                                                                                          // 508
            }                                                                                                          // 509
        }                                                                                                              // 510
        return true;                                                                                                   // 511
    }                                                                                                                  // 512
}, !properlyBoxesContext(ArrayPrototype.every));                                                                       // 513
                                                                                                                       // 514
// ES5 15.4.4.17                                                                                                       // 515
// http://es5.github.com/#x15.4.4.17                                                                                   // 516
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some                                     // 517
defineProperties(ArrayPrototype, {                                                                                     // 518
    some: function some(callbackfn/*, thisArg */) {                                                                    // 519
        var object = ES.ToObject(this);                                                                                // 520
        var self = splitString && isString(this) ? strSplit(this, '') : object;                                        // 521
        var length = self.length >>> 0;                                                                                // 522
        var T;                                                                                                         // 523
        if (arguments.length > 1) {                                                                                    // 524
            T = arguments[1];                                                                                          // 525
        }                                                                                                              // 526
                                                                                                                       // 527
        // If no callback function or if callback is not a callable function                                           // 528
        if (!isCallable(callbackfn)) {                                                                                 // 529
            throw new TypeError('Array.prototype.some callback must be a function');                                   // 530
        }                                                                                                              // 531
                                                                                                                       // 532
        for (var i = 0; i < length; i++) {                                                                             // 533
            if (i in self && (typeof T === 'undefined' ? callbackfn(self[i], i, object) : callbackfn.call(T, self[i], i, object))) {
                return true;                                                                                           // 535
            }                                                                                                          // 536
        }                                                                                                              // 537
        return false;                                                                                                  // 538
    }                                                                                                                  // 539
}, !properlyBoxesContext(ArrayPrototype.some));                                                                        // 540
                                                                                                                       // 541
// ES5 15.4.4.21                                                                                                       // 542
// http://es5.github.com/#x15.4.4.21                                                                                   // 543
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduce                                 // 544
var reduceCoercesToObject = false;                                                                                     // 545
if (ArrayPrototype.reduce) {                                                                                           // 546
    reduceCoercesToObject = typeof ArrayPrototype.reduce.call('es5', function (_, __, ___, list) { return list; }) === 'object';
}                                                                                                                      // 548
defineProperties(ArrayPrototype, {                                                                                     // 549
    reduce: function reduce(callbackfn /*, initialValue*/) {                                                           // 550
        var object = ES.ToObject(this);                                                                                // 551
        var self = splitString && isString(this) ? strSplit(this, '') : object;                                        // 552
        var length = self.length >>> 0;                                                                                // 553
                                                                                                                       // 554
        // If no callback function or if callback is not a callable function                                           // 555
        if (!isCallable(callbackfn)) {                                                                                 // 556
            throw new TypeError('Array.prototype.reduce callback must be a function');                                 // 557
        }                                                                                                              // 558
                                                                                                                       // 559
        // no value to return if no initial value and an empty array                                                   // 560
        if (length === 0 && arguments.length === 1) {                                                                  // 561
            throw new TypeError('reduce of empty array with no initial value');                                        // 562
        }                                                                                                              // 563
                                                                                                                       // 564
        var i = 0;                                                                                                     // 565
        var result;                                                                                                    // 566
        if (arguments.length >= 2) {                                                                                   // 567
            result = arguments[1];                                                                                     // 568
        } else {                                                                                                       // 569
            do {                                                                                                       // 570
                if (i in self) {                                                                                       // 571
                    result = self[i++];                                                                                // 572
                    break;                                                                                             // 573
                }                                                                                                      // 574
                                                                                                                       // 575
                // if array contains no values, no initial value to return                                             // 576
                if (++i >= length) {                                                                                   // 577
                    throw new TypeError('reduce of empty array with no initial value');                                // 578
                }                                                                                                      // 579
            } while (true);                                                                                            // 580
        }                                                                                                              // 581
                                                                                                                       // 582
        for (; i < length; i++) {                                                                                      // 583
            if (i in self) {                                                                                           // 584
                result = callbackfn(result, self[i], i, object);                                                       // 585
            }                                                                                                          // 586
        }                                                                                                              // 587
                                                                                                                       // 588
        return result;                                                                                                 // 589
    }                                                                                                                  // 590
}, !reduceCoercesToObject);                                                                                            // 591
                                                                                                                       // 592
// ES5 15.4.4.22                                                                                                       // 593
// http://es5.github.com/#x15.4.4.22                                                                                   // 594
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduceRight                            // 595
var reduceRightCoercesToObject = false;                                                                                // 596
if (ArrayPrototype.reduceRight) {                                                                                      // 597
    reduceRightCoercesToObject = typeof ArrayPrototype.reduceRight.call('es5', function (_, __, ___, list) { return list; }) === 'object';
}                                                                                                                      // 599
defineProperties(ArrayPrototype, {                                                                                     // 600
    reduceRight: function reduceRight(callbackfn/*, initial*/) {                                                       // 601
        var object = ES.ToObject(this);                                                                                // 602
        var self = splitString && isString(this) ? strSplit(this, '') : object;                                        // 603
        var length = self.length >>> 0;                                                                                // 604
                                                                                                                       // 605
        // If no callback function or if callback is not a callable function                                           // 606
        if (!isCallable(callbackfn)) {                                                                                 // 607
            throw new TypeError('Array.prototype.reduceRight callback must be a function');                            // 608
        }                                                                                                              // 609
                                                                                                                       // 610
        // no value to return if no initial value, empty array                                                         // 611
        if (length === 0 && arguments.length === 1) {                                                                  // 612
            throw new TypeError('reduceRight of empty array with no initial value');                                   // 613
        }                                                                                                              // 614
                                                                                                                       // 615
        var result;                                                                                                    // 616
        var i = length - 1;                                                                                            // 617
        if (arguments.length >= 2) {                                                                                   // 618
            result = arguments[1];                                                                                     // 619
        } else {                                                                                                       // 620
            do {                                                                                                       // 621
                if (i in self) {                                                                                       // 622
                    result = self[i--];                                                                                // 623
                    break;                                                                                             // 624
                }                                                                                                      // 625
                                                                                                                       // 626
                // if array contains no values, no initial value to return                                             // 627
                if (--i < 0) {                                                                                         // 628
                    throw new TypeError('reduceRight of empty array with no initial value');                           // 629
                }                                                                                                      // 630
            } while (true);                                                                                            // 631
        }                                                                                                              // 632
                                                                                                                       // 633
        if (i < 0) {                                                                                                   // 634
            return result;                                                                                             // 635
        }                                                                                                              // 636
                                                                                                                       // 637
        do {                                                                                                           // 638
            if (i in self) {                                                                                           // 639
                result = callbackfn(result, self[i], i, object);                                                       // 640
            }                                                                                                          // 641
        } while (i--);                                                                                                 // 642
                                                                                                                       // 643
        return result;                                                                                                 // 644
    }                                                                                                                  // 645
}, !reduceRightCoercesToObject);                                                                                       // 646
                                                                                                                       // 647
// ES5 15.4.4.14                                                                                                       // 648
// http://es5.github.com/#x15.4.4.14                                                                                   // 649
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf                                  // 650
var hasFirefox2IndexOfBug = ArrayPrototype.indexOf && [0, 1].indexOf(1, 2) !== -1;                                     // 651
defineProperties(ArrayPrototype, {                                                                                     // 652
    indexOf: function indexOf(searchElement /*, fromIndex */) {                                                        // 653
        var self = splitString && isString(this) ? strSplit(this, '') : ES.ToObject(this);                             // 654
        var length = self.length >>> 0;                                                                                // 655
                                                                                                                       // 656
        if (length === 0) {                                                                                            // 657
            return -1;                                                                                                 // 658
        }                                                                                                              // 659
                                                                                                                       // 660
        var i = 0;                                                                                                     // 661
        if (arguments.length > 1) {                                                                                    // 662
            i = ES.ToInteger(arguments[1]);                                                                            // 663
        }                                                                                                              // 664
                                                                                                                       // 665
        // handle negative indices                                                                                     // 666
        i = i >= 0 ? i : max(0, length + i);                                                                           // 667
        for (; i < length; i++) {                                                                                      // 668
            if (i in self && self[i] === searchElement) {                                                              // 669
                return i;                                                                                              // 670
            }                                                                                                          // 671
        }                                                                                                              // 672
        return -1;                                                                                                     // 673
    }                                                                                                                  // 674
}, hasFirefox2IndexOfBug);                                                                                             // 675
                                                                                                                       // 676
// ES5 15.4.4.15                                                                                                       // 677
// http://es5.github.com/#x15.4.4.15                                                                                   // 678
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/lastIndexOf                              // 679
var hasFirefox2LastIndexOfBug = ArrayPrototype.lastIndexOf && [0, 1].lastIndexOf(0, -3) !== -1;                        // 680
defineProperties(ArrayPrototype, {                                                                                     // 681
    lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */) {                                                // 682
        var self = splitString && isString(this) ? strSplit(this, '') : ES.ToObject(this);                             // 683
        var length = self.length >>> 0;                                                                                // 684
                                                                                                                       // 685
        if (length === 0) {                                                                                            // 686
            return -1;                                                                                                 // 687
        }                                                                                                              // 688
        var i = length - 1;                                                                                            // 689
        if (arguments.length > 1) {                                                                                    // 690
            i = min(i, ES.ToInteger(arguments[1]));                                                                    // 691
        }                                                                                                              // 692
        // handle negative indices                                                                                     // 693
        i = i >= 0 ? i : length - Math.abs(i);                                                                         // 694
        for (; i >= 0; i--) {                                                                                          // 695
            if (i in self && searchElement === self[i]) {                                                              // 696
                return i;                                                                                              // 697
            }                                                                                                          // 698
        }                                                                                                              // 699
        return -1;                                                                                                     // 700
    }                                                                                                                  // 701
}, hasFirefox2LastIndexOfBug);                                                                                         // 702
                                                                                                                       // 703
// ES5 15.4.4.12                                                                                                       // 704
// http://es5.github.com/#x15.4.4.12                                                                                   // 705
var spliceNoopReturnsEmptyArray = (function () {                                                                       // 706
    var a = [1, 2];                                                                                                    // 707
    var result = a.splice();                                                                                           // 708
    return a.length === 2 && isArray(result) && result.length === 0;                                                   // 709
}());                                                                                                                  // 710
defineProperties(ArrayPrototype, {                                                                                     // 711
    // Safari 5.0 bug where .splice() returns undefined                                                                // 712
    splice: function splice(start, deleteCount) {                                                                      // 713
        if (arguments.length === 0) {                                                                                  // 714
            return [];                                                                                                 // 715
        } else {                                                                                                       // 716
            return array_splice.apply(this, arguments);                                                                // 717
        }                                                                                                              // 718
    }                                                                                                                  // 719
}, !spliceNoopReturnsEmptyArray);                                                                                      // 720
                                                                                                                       // 721
var spliceWorksWithEmptyObject = (function () {                                                                        // 722
    var obj = {};                                                                                                      // 723
    ArrayPrototype.splice.call(obj, 0, 0, 1);                                                                          // 724
    return obj.length === 1;                                                                                           // 725
}());                                                                                                                  // 726
defineProperties(ArrayPrototype, {                                                                                     // 727
    splice: function splice(start, deleteCount) {                                                                      // 728
        if (arguments.length === 0) { return []; }                                                                     // 729
        var args = arguments;                                                                                          // 730
        this.length = max(ES.ToInteger(this.length), 0);                                                               // 731
        if (arguments.length > 0 && typeof deleteCount !== 'number') {                                                 // 732
            args = array_slice.call(arguments);                                                                        // 733
            if (args.length < 2) {                                                                                     // 734
                array_push.call(args, this.length - start);                                                            // 735
            } else {                                                                                                   // 736
                args[1] = ES.ToInteger(deleteCount);                                                                   // 737
            }                                                                                                          // 738
        }                                                                                                              // 739
        return array_splice.apply(this, args);                                                                         // 740
    }                                                                                                                  // 741
}, !spliceWorksWithEmptyObject);                                                                                       // 742
var spliceWorksWithLargeSparseArrays = (function () {                                                                  // 743
    // Per https://github.com/es-shims/es5-shim/issues/295                                                             // 744
    // Safari 7/8 breaks with sparse arrays of size 1e5 or greater                                                     // 745
    var arr = new $Array(1e5);                                                                                         // 746
    // note: the index MUST be 8 or larger or the test will false pass                                                 // 747
    arr[8] = 'x';                                                                                                      // 748
    arr.splice(1, 1);                                                                                                  // 749
    // note: this test must be defined *after* the indexOf shim                                                        // 750
    // per https://github.com/es-shims/es5-shim/issues/313                                                             // 751
    return arr.indexOf('x') === 7;                                                                                     // 752
}());                                                                                                                  // 753
var spliceWorksWithSmallSparseArrays = (function () {                                                                  // 754
    // Per https://github.com/es-shims/es5-shim/issues/295                                                             // 755
    // Opera 12.15 breaks on this, no idea why.                                                                        // 756
    var n = 256;                                                                                                       // 757
    var arr = [];                                                                                                      // 758
    arr[n] = 'a';                                                                                                      // 759
    arr.splice(n + 1, 0, 'b');                                                                                         // 760
    return arr[n] === 'a';                                                                                             // 761
}());                                                                                                                  // 762
defineProperties(ArrayPrototype, {                                                                                     // 763
    splice: function splice(start, deleteCount) {                                                                      // 764
        var O = ES.ToObject(this);                                                                                     // 765
        var A = [];                                                                                                    // 766
        var len = ES.ToUint32(O.length);                                                                               // 767
        var relativeStart = ES.ToInteger(start);                                                                       // 768
        var actualStart = relativeStart < 0 ? max((len + relativeStart), 0) : min(relativeStart, len);                 // 769
        var actualDeleteCount = min(max(ES.ToInteger(deleteCount), 0), len - actualStart);                             // 770
                                                                                                                       // 771
        var k = 0;                                                                                                     // 772
        var from;                                                                                                      // 773
        while (k < actualDeleteCount) {                                                                                // 774
            from = $String(actualStart + k);                                                                           // 775
            if (owns(O, from)) {                                                                                       // 776
                A[k] = O[from];                                                                                        // 777
            }                                                                                                          // 778
            k += 1;                                                                                                    // 779
        }                                                                                                              // 780
                                                                                                                       // 781
        var items = array_slice.call(arguments, 2);                                                                    // 782
        var itemCount = items.length;                                                                                  // 783
        var to;                                                                                                        // 784
        if (itemCount < actualDeleteCount) {                                                                           // 785
            k = actualStart;                                                                                           // 786
            while (k < (len - actualDeleteCount)) {                                                                    // 787
                from = $String(k + actualDeleteCount);                                                                 // 788
                to = $String(k + itemCount);                                                                           // 789
                if (owns(O, from)) {                                                                                   // 790
                    O[to] = O[from];                                                                                   // 791
                } else {                                                                                               // 792
                    delete O[to];                                                                                      // 793
                }                                                                                                      // 794
                k += 1;                                                                                                // 795
            }                                                                                                          // 796
            k = len;                                                                                                   // 797
            while (k > (len - actualDeleteCount + itemCount)) {                                                        // 798
                delete O[k - 1];                                                                                       // 799
                k -= 1;                                                                                                // 800
            }                                                                                                          // 801
        } else if (itemCount > actualDeleteCount) {                                                                    // 802
            k = len - actualDeleteCount;                                                                               // 803
            while (k > actualStart) {                                                                                  // 804
                from = $String(k + actualDeleteCount - 1);                                                             // 805
                to = $String(k + itemCount - 1);                                                                       // 806
                if (owns(O, from)) {                                                                                   // 807
                    O[to] = O[from];                                                                                   // 808
                } else {                                                                                               // 809
                    delete O[to];                                                                                      // 810
                }                                                                                                      // 811
                k -= 1;                                                                                                // 812
            }                                                                                                          // 813
        }                                                                                                              // 814
        k = actualStart;                                                                                               // 815
        for (var i = 0; i < items.length; ++i) {                                                                       // 816
            O[k] = items[i];                                                                                           // 817
            k += 1;                                                                                                    // 818
        }                                                                                                              // 819
        O.length = len - actualDeleteCount + itemCount;                                                                // 820
                                                                                                                       // 821
        return A;                                                                                                      // 822
    }                                                                                                                  // 823
}, !spliceWorksWithLargeSparseArrays || !spliceWorksWithSmallSparseArrays);                                            // 824
                                                                                                                       // 825
//                                                                                                                     // 826
// Object                                                                                                              // 827
// ======                                                                                                              // 828
//                                                                                                                     // 829
                                                                                                                       // 830
// ES5 15.2.3.14                                                                                                       // 831
// http://es5.github.com/#x15.2.3.14                                                                                   // 832
                                                                                                                       // 833
// http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation                                 // 834
var hasDontEnumBug = !({ 'toString': null }).propertyIsEnumerable('toString');                                         // 835
var hasProtoEnumBug = function () {}.propertyIsEnumerable('prototype');                                                // 836
var hasStringEnumBug = !owns('x', '0');                                                                                // 837
var equalsConstructorPrototype = function (o) {                                                                        // 838
    var ctor = o.constructor;                                                                                          // 839
    return ctor && ctor.prototype === o;                                                                               // 840
};                                                                                                                     // 841
var blacklistedKeys = {                                                                                                // 842
    $window: true,                                                                                                     // 843
    $console: true,                                                                                                    // 844
    $parent: true,                                                                                                     // 845
    $self: true,                                                                                                       // 846
    $frames: true,                                                                                                     // 847
    $frameElement: true,                                                                                               // 848
    $webkitIndexedDB: true,                                                                                            // 849
    $webkitStorageInfo: true                                                                                           // 850
};                                                                                                                     // 851
var hasAutomationEqualityBug = (function () {                                                                          // 852
    /* globals window */                                                                                               // 853
    if (typeof window === 'undefined') { return false; }                                                               // 854
    for (var k in window) {                                                                                            // 855
        if (!blacklistedKeys['$' + k] && owns(window, k) && window[k] !== null && typeof window[k] === 'object') {     // 856
            try {                                                                                                      // 857
                equalsConstructorPrototype(window[k]);                                                                 // 858
            } catch (e) {                                                                                              // 859
                return true;                                                                                           // 860
            }                                                                                                          // 861
        }                                                                                                              // 862
    }                                                                                                                  // 863
    return false;                                                                                                      // 864
}());                                                                                                                  // 865
var equalsConstructorPrototypeIfNotBuggy = function (object) {                                                         // 866
    if (typeof window === 'undefined' || !hasAutomationEqualityBug) { return equalsConstructorPrototype(object); }     // 867
    try {                                                                                                              // 868
        return equalsConstructorPrototype(object);                                                                     // 869
    } catch (e) {                                                                                                      // 870
        return false;                                                                                                  // 871
    }                                                                                                                  // 872
};                                                                                                                     // 873
var dontEnums = [                                                                                                      // 874
    'toString',                                                                                                        // 875
    'toLocaleString',                                                                                                  // 876
    'valueOf',                                                                                                         // 877
    'hasOwnProperty',                                                                                                  // 878
    'isPrototypeOf',                                                                                                   // 879
    'propertyIsEnumerable',                                                                                            // 880
    'constructor'                                                                                                      // 881
];                                                                                                                     // 882
var dontEnumsLength = dontEnums.length;                                                                                // 883
                                                                                                                       // 884
// taken directly from https://github.com/ljharb/is-arguments/blob/master/index.js                                     // 885
// can be replaced with require('is-arguments') if we ever use a build process instead                                 // 886
var isStandardArguments = function isArguments(value) {                                                                // 887
    return toStr(value) === '[object Arguments]';                                                                      // 888
};                                                                                                                     // 889
var isLegacyArguments = function isArguments(value) {                                                                  // 890
    return value !== null &&                                                                                           // 891
        typeof value === 'object' &&                                                                                   // 892
        typeof value.length === 'number' &&                                                                            // 893
        value.length >= 0 &&                                                                                           // 894
        !isArray(value) &&                                                                                             // 895
        isCallable(value.callee);                                                                                      // 896
};                                                                                                                     // 897
var isArguments = isStandardArguments(arguments) ? isStandardArguments : isLegacyArguments;                            // 898
                                                                                                                       // 899
defineProperties($Object, {                                                                                            // 900
    keys: function keys(object) {                                                                                      // 901
        var isFn = isCallable(object);                                                                                 // 902
        var isArgs = isArguments(object);                                                                              // 903
        var isObject = object !== null && typeof object === 'object';                                                  // 904
        var isStr = isObject && isString(object);                                                                      // 905
                                                                                                                       // 906
        if (!isObject && !isFn && !isArgs) {                                                                           // 907
            throw new TypeError('Object.keys called on a non-object');                                                 // 908
        }                                                                                                              // 909
                                                                                                                       // 910
        var theKeys = [];                                                                                              // 911
        var skipProto = hasProtoEnumBug && isFn;                                                                       // 912
        if ((isStr && hasStringEnumBug) || isArgs) {                                                                   // 913
            for (var i = 0; i < object.length; ++i) {                                                                  // 914
                array_push.call(theKeys, $String(i));                                                                  // 915
            }                                                                                                          // 916
        }                                                                                                              // 917
                                                                                                                       // 918
        if (!isArgs) {                                                                                                 // 919
            for (var name in object) {                                                                                 // 920
                if (!(skipProto && name === 'prototype') && owns(object, name)) {                                      // 921
                    array_push.call(theKeys, $String(name));                                                           // 922
                }                                                                                                      // 923
            }                                                                                                          // 924
        }                                                                                                              // 925
                                                                                                                       // 926
        if (hasDontEnumBug) {                                                                                          // 927
            var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);                                        // 928
            for (var j = 0; j < dontEnumsLength; j++) {                                                                // 929
                var dontEnum = dontEnums[j];                                                                           // 930
                if (!(skipConstructor && dontEnum === 'constructor') && owns(object, dontEnum)) {                      // 931
                    array_push.call(theKeys, dontEnum);                                                                // 932
                }                                                                                                      // 933
            }                                                                                                          // 934
        }                                                                                                              // 935
        return theKeys;                                                                                                // 936
    }                                                                                                                  // 937
});                                                                                                                    // 938
                                                                                                                       // 939
var keysWorksWithArguments = $Object.keys && (function () {                                                            // 940
    // Safari 5.0 bug                                                                                                  // 941
    return $Object.keys(arguments).length === 2;                                                                       // 942
}(1, 2));                                                                                                              // 943
var keysHasArgumentsLengthBug = $Object.keys && (function () {                                                         // 944
    var argKeys = $Object.keys(arguments);                                                                             // 945
	return arguments.length !== 1 || argKeys.length !== 1 || argKeys[0] !== 1;                                            // 946
}(1));                                                                                                                 // 947
var originalKeys = $Object.keys;                                                                                       // 948
defineProperties($Object, {                                                                                            // 949
    keys: function keys(object) {                                                                                      // 950
        if (isArguments(object)) {                                                                                     // 951
            return originalKeys(array_slice.call(object));                                                             // 952
        } else {                                                                                                       // 953
            return originalKeys(object);                                                                               // 954
        }                                                                                                              // 955
    }                                                                                                                  // 956
}, !keysWorksWithArguments || keysHasArgumentsLengthBug);                                                              // 957
                                                                                                                       // 958
//                                                                                                                     // 959
// Date                                                                                                                // 960
// ====                                                                                                                // 961
//                                                                                                                     // 962
                                                                                                                       // 963
// ES5 15.9.5.43                                                                                                       // 964
// http://es5.github.com/#x15.9.5.43                                                                                   // 965
// This function returns a String value represent the instance in time                                                 // 966
// represented by this Date object. The format of the String is the Date Time                                          // 967
// string format defined in 15.9.1.15. All fields are present in the String.                                           // 968
// The time zone is always UTC, denoted by the suffix Z. If the time value of                                          // 969
// this object is not a finite Number a RangeError exception is thrown.                                                // 970
var negativeDate = -62198755200000;                                                                                    // 971
var negativeYearString = '-000001';                                                                                    // 972
var hasNegativeDateBug = Date.prototype.toISOString && new Date(negativeDate).toISOString().indexOf(negativeYearString) === -1;
var hasSafari51DateBug = Date.prototype.toISOString && new Date(-1).toISOString() !== '1969-12-31T23:59:59.999Z';      // 974
                                                                                                                       // 975
defineProperties(Date.prototype, {                                                                                     // 976
    toISOString: function toISOString() {                                                                              // 977
        var result, length, value, year, month;                                                                        // 978
        if (!isFinite(this)) {                                                                                         // 979
            throw new RangeError('Date.prototype.toISOString called on non-finite value.');                            // 980
        }                                                                                                              // 981
                                                                                                                       // 982
        year = this.getUTCFullYear();                                                                                  // 983
                                                                                                                       // 984
        month = this.getUTCMonth();                                                                                    // 985
        // see https://github.com/es-shims/es5-shim/issues/111                                                         // 986
        year += Math.floor(month / 12);                                                                                // 987
        month = (month % 12 + 12) % 12;                                                                                // 988
                                                                                                                       // 989
        // the date time string format is specified in 15.9.1.15.                                                      // 990
        result = [month + 1, this.getUTCDate(), this.getUTCHours(), this.getUTCMinutes(), this.getUTCSeconds()];       // 991
        year = (                                                                                                       // 992
            (year < 0 ? '-' : (year > 9999 ? '+' : '')) +                                                              // 993
            strSlice('00000' + Math.abs(year), (0 <= year && year <= 9999) ? -4 : -6)                                  // 994
        );                                                                                                             // 995
                                                                                                                       // 996
        length = result.length;                                                                                        // 997
        while (length--) {                                                                                             // 998
            value = result[length];                                                                                    // 999
            // pad months, days, hours, minutes, and seconds to have two                                               // 1000
            // digits.                                                                                                 // 1001
            if (value < 10) {                                                                                          // 1002
                result[length] = '0' + value;                                                                          // 1003
            }                                                                                                          // 1004
        }                                                                                                              // 1005
        // pad milliseconds to have three digits.                                                                      // 1006
        return (                                                                                                       // 1007
            year + '-' + array_slice.call(result, 0, 2).join('-') +                                                    // 1008
            'T' + array_slice.call(result, 2).join(':') + '.' +                                                        // 1009
            strSlice('000' + this.getUTCMilliseconds(), -3) + 'Z'                                                      // 1010
        );                                                                                                             // 1011
    }                                                                                                                  // 1012
}, hasNegativeDateBug || hasSafari51DateBug);                                                                          // 1013
                                                                                                                       // 1014
// ES5 15.9.5.44                                                                                                       // 1015
// http://es5.github.com/#x15.9.5.44                                                                                   // 1016
// This function provides a String representation of a Date object for use by                                          // 1017
// JSON.stringify (15.12.3).                                                                                           // 1018
var dateToJSONIsSupported = (function () {                                                                             // 1019
    try {                                                                                                              // 1020
        return Date.prototype.toJSON &&                                                                                // 1021
            new Date(NaN).toJSON() === null &&                                                                         // 1022
            new Date(negativeDate).toJSON().indexOf(negativeYearString) !== -1 &&                                      // 1023
            Date.prototype.toJSON.call({ // generic                                                                    // 1024
                toISOString: function () { return true; }                                                              // 1025
            });                                                                                                        // 1026
    } catch (e) {                                                                                                      // 1027
        return false;                                                                                                  // 1028
    }                                                                                                                  // 1029
}());                                                                                                                  // 1030
if (!dateToJSONIsSupported) {                                                                                          // 1031
    Date.prototype.toJSON = function toJSON(key) {                                                                     // 1032
        // When the toJSON method is called with argument key, the following                                           // 1033
        // steps are taken:                                                                                            // 1034
                                                                                                                       // 1035
        // 1.  Let O be the result of calling ToObject, giving it the this                                             // 1036
        // value as its argument.                                                                                      // 1037
        // 2. Let tv be ES.ToPrimitive(O, hint Number).                                                                // 1038
        var O = $Object(this);                                                                                         // 1039
        var tv = ES.ToPrimitive(O);                                                                                    // 1040
        // 3. If tv is a Number and is not finite, return null.                                                        // 1041
        if (typeof tv === 'number' && !isFinite(tv)) {                                                                 // 1042
            return null;                                                                                               // 1043
        }                                                                                                              // 1044
        // 4. Let toISO be the result of calling the [[Get]] internal method of                                        // 1045
        // O with argument "toISOString".                                                                              // 1046
        var toISO = O.toISOString;                                                                                     // 1047
        // 5. If IsCallable(toISO) is false, throw a TypeError exception.                                              // 1048
        if (!isCallable(toISO)) {                                                                                      // 1049
            throw new TypeError('toISOString property is not callable');                                               // 1050
        }                                                                                                              // 1051
        // 6. Return the result of calling the [[Call]] internal method of                                             // 1052
        //  toISO with O as the this value and an empty argument list.                                                 // 1053
        return toISO.call(O);                                                                                          // 1054
                                                                                                                       // 1055
        // NOTE 1 The argument is ignored.                                                                             // 1056
                                                                                                                       // 1057
        // NOTE 2 The toJSON function is intentionally generic; it does not                                            // 1058
        // require that its this value be a Date object. Therefore, it can be                                          // 1059
        // transferred to other kinds of objects for use as a method. However,                                         // 1060
        // it does require that any such object have a toISOString method. An                                          // 1061
        // object is free to use the argument key to filter its                                                        // 1062
        // stringification.                                                                                            // 1063
    };                                                                                                                 // 1064
}                                                                                                                      // 1065
                                                                                                                       // 1066
// ES5 15.9.4.2                                                                                                        // 1067
// http://es5.github.com/#x15.9.4.2                                                                                    // 1068
// based on work shared by Daniel Friesen (dantman)                                                                    // 1069
// http://gist.github.com/303249                                                                                       // 1070
var supportsExtendedYears = Date.parse('+033658-09-27T01:46:40.000Z') === 1e15;                                        // 1071
var acceptsInvalidDates = !isNaN(Date.parse('2012-04-04T24:00:00.500Z')) || !isNaN(Date.parse('2012-11-31T23:59:59.000Z')) || !isNaN(Date.parse('2012-12-31T23:59:60.000Z'));
var doesNotParseY2KNewYear = isNaN(Date.parse('2000-01-01T00:00:00.000Z'));                                            // 1073
if (doesNotParseY2KNewYear || acceptsInvalidDates || !supportsExtendedYears) {                                         // 1074
    // XXX global assignment won't work in embeddings that use                                                         // 1075
    // an alternate object for the context.                                                                            // 1076
    /* global Date: true */                                                                                            // 1077
    /* eslint-disable no-undef */                                                                                      // 1078
    Date = (function (NativeDate) {                                                                                    // 1079
    /* eslint-enable no-undef */                                                                                       // 1080
        // Date.length === 7                                                                                           // 1081
        var DateShim = function Date(Y, M, D, h, m, s, ms) {                                                           // 1082
            var length = arguments.length;                                                                             // 1083
            var date;                                                                                                  // 1084
            if (this instanceof NativeDate) {                                                                          // 1085
                date = length === 1 && $String(Y) === Y ? // isString(Y)                                               // 1086
                    // We explicitly pass it through parse:                                                            // 1087
                    new NativeDate(DateShim.parse(Y)) :                                                                // 1088
                    // We have to manually make calls depending on argument                                            // 1089
                    // length here                                                                                     // 1090
                    length >= 7 ? new NativeDate(Y, M, D, h, m, s, ms) :                                               // 1091
                    length >= 6 ? new NativeDate(Y, M, D, h, m, s) :                                                   // 1092
                    length >= 5 ? new NativeDate(Y, M, D, h, m) :                                                      // 1093
                    length >= 4 ? new NativeDate(Y, M, D, h) :                                                         // 1094
                    length >= 3 ? new NativeDate(Y, M, D) :                                                            // 1095
                    length >= 2 ? new NativeDate(Y, M) :                                                               // 1096
                    length >= 1 ? new NativeDate(Y) :                                                                  // 1097
                                  new NativeDate();                                                                    // 1098
            } else {                                                                                                   // 1099
                date = NativeDate.apply(this, arguments);                                                              // 1100
            }                                                                                                          // 1101
            if (!isPrimitive(date)) {                                                                                  // 1102
              // Prevent mixups with unfixed Date object                                                               // 1103
              defineProperties(date, { constructor: DateShim }, true);                                                 // 1104
            }                                                                                                          // 1105
            return date;                                                                                               // 1106
        };                                                                                                             // 1107
                                                                                                                       // 1108
        // 15.9.1.15 Date Time String Format.                                                                          // 1109
        var isoDateExpression = new RegExp('^' +                                                                       // 1110
            '(\\d{4}|[+-]\\d{6})' + // four-digit year capture or sign +                                               // 1111
                                      // 6-digit extended year                                                         // 1112
            '(?:-(\\d{2})' + // optional month capture                                                                 // 1113
            '(?:-(\\d{2})' + // optional day capture                                                                   // 1114
            '(?:' + // capture hours:minutes:seconds.milliseconds                                                      // 1115
                'T(\\d{2})' + // hours capture                                                                         // 1116
                ':(\\d{2})' + // minutes capture                                                                       // 1117
                '(?:' + // optional :seconds.milliseconds                                                              // 1118
                    ':(\\d{2})' + // seconds capture                                                                   // 1119
                    '(?:(\\.\\d{1,}))?' + // milliseconds capture                                                      // 1120
                ')?' +                                                                                                 // 1121
            '(' + // capture UTC offset component                                                                      // 1122
                'Z|' + // UTC capture                                                                                  // 1123
                '(?:' + // offset specifier +/-hours:minutes                                                           // 1124
                    '([-+])' + // sign capture                                                                         // 1125
                    '(\\d{2})' + // hours offset capture                                                               // 1126
                    ':(\\d{2})' + // minutes offset capture                                                            // 1127
                ')' +                                                                                                  // 1128
            ')?)?)?)?' +                                                                                               // 1129
        '$');                                                                                                          // 1130
                                                                                                                       // 1131
        var months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];                                     // 1132
                                                                                                                       // 1133
        var dayFromMonth = function dayFromMonth(year, month) {                                                        // 1134
            var t = month > 1 ? 1 : 0;                                                                                 // 1135
            return (                                                                                                   // 1136
                months[month] +                                                                                        // 1137
                Math.floor((year - 1969 + t) / 4) -                                                                    // 1138
                Math.floor((year - 1901 + t) / 100) +                                                                  // 1139
                Math.floor((year - 1601 + t) / 400) +                                                                  // 1140
                365 * (year - 1970)                                                                                    // 1141
            );                                                                                                         // 1142
        };                                                                                                             // 1143
                                                                                                                       // 1144
        var toUTC = function toUTC(t) {                                                                                // 1145
            return $Number(new NativeDate(1970, 0, 1, 0, 0, 0, t));                                                    // 1146
        };                                                                                                             // 1147
                                                                                                                       // 1148
        // Copy any custom methods a 3rd party library may have added                                                  // 1149
        for (var key in NativeDate) {                                                                                  // 1150
            if (owns(NativeDate, key)) {                                                                               // 1151
                DateShim[key] = NativeDate[key];                                                                       // 1152
            }                                                                                                          // 1153
        }                                                                                                              // 1154
                                                                                                                       // 1155
        // Copy "native" methods explicitly; they may be non-enumerable                                                // 1156
        defineProperties(DateShim, {                                                                                   // 1157
            now: NativeDate.now,                                                                                       // 1158
            UTC: NativeDate.UTC                                                                                        // 1159
        }, true);                                                                                                      // 1160
        DateShim.prototype = NativeDate.prototype;                                                                     // 1161
        defineProperties(DateShim.prototype, {                                                                         // 1162
            constructor: DateShim                                                                                      // 1163
        }, true);                                                                                                      // 1164
                                                                                                                       // 1165
        // Upgrade Date.parse to handle simplified ISO 8601 strings                                                    // 1166
        var parseShim = function parse(string) {                                                                       // 1167
            var match = isoDateExpression.exec(string);                                                                // 1168
            if (match) {                                                                                               // 1169
                // parse months, days, hours, minutes, seconds, and milliseconds                                       // 1170
                // provide default values if necessary                                                                 // 1171
                // parse the UTC offset component                                                                      // 1172
                var year = $Number(match[1]),                                                                          // 1173
                    month = $Number(match[2] || 1) - 1,                                                                // 1174
                    day = $Number(match[3] || 1) - 1,                                                                  // 1175
                    hour = $Number(match[4] || 0),                                                                     // 1176
                    minute = $Number(match[5] || 0),                                                                   // 1177
                    second = $Number(match[6] || 0),                                                                   // 1178
                    millisecond = Math.floor($Number(match[7] || 0) * 1000),                                           // 1179
                    // When time zone is missed, local offset should be used                                           // 1180
                    // (ES 5.1 bug)                                                                                    // 1181
                    // see https://bugs.ecmascript.org/show_bug.cgi?id=112                                             // 1182
                    isLocalTime = Boolean(match[4] && !match[8]),                                                      // 1183
                    signOffset = match[9] === '-' ? 1 : -1,                                                            // 1184
                    hourOffset = $Number(match[10] || 0),                                                              // 1185
                    minuteOffset = $Number(match[11] || 0),                                                            // 1186
                    result;                                                                                            // 1187
                if (                                                                                                   // 1188
                    hour < (                                                                                           // 1189
                        minute > 0 || second > 0 || millisecond > 0 ?                                                  // 1190
                        24 : 25                                                                                        // 1191
                    ) &&                                                                                               // 1192
                    minute < 60 && second < 60 && millisecond < 1000 &&                                                // 1193
                    month > -1 && month < 12 && hourOffset < 24 &&                                                     // 1194
                    minuteOffset < 60 && // detect invalid offsets                                                     // 1195
                    day > -1 &&                                                                                        // 1196
                    day < (                                                                                            // 1197
                        dayFromMonth(year, month + 1) -                                                                // 1198
                        dayFromMonth(year, month)                                                                      // 1199
                    )                                                                                                  // 1200
                ) {                                                                                                    // 1201
                    result = (                                                                                         // 1202
                        (dayFromMonth(year, month) + day) * 24 +                                                       // 1203
                        hour +                                                                                         // 1204
                        hourOffset * signOffset                                                                        // 1205
                    ) * 60;                                                                                            // 1206
                    result = (                                                                                         // 1207
                        (result + minute + minuteOffset * signOffset) * 60 +                                           // 1208
                        second                                                                                         // 1209
                    ) * 1000 + millisecond;                                                                            // 1210
                    if (isLocalTime) {                                                                                 // 1211
                        result = toUTC(result);                                                                        // 1212
                    }                                                                                                  // 1213
                    if (-8.64e15 <= result && result <= 8.64e15) {                                                     // 1214
                        return result;                                                                                 // 1215
                    }                                                                                                  // 1216
                }                                                                                                      // 1217
                return NaN;                                                                                            // 1218
            }                                                                                                          // 1219
            return NativeDate.parse.apply(this, arguments);                                                            // 1220
        };                                                                                                             // 1221
        defineProperties(DateShim, { parse: parseShim });                                                              // 1222
                                                                                                                       // 1223
        return DateShim;                                                                                               // 1224
    }(Date));                                                                                                          // 1225
    /* global Date: false */                                                                                           // 1226
}                                                                                                                      // 1227
                                                                                                                       // 1228
// ES5 15.9.4.4                                                                                                        // 1229
// http://es5.github.com/#x15.9.4.4                                                                                    // 1230
if (!Date.now) {                                                                                                       // 1231
    Date.now = function now() {                                                                                        // 1232
        return new Date().getTime();                                                                                   // 1233
    };                                                                                                                 // 1234
}                                                                                                                      // 1235
                                                                                                                       // 1236
//                                                                                                                     // 1237
// Number                                                                                                              // 1238
// ======                                                                                                              // 1239
//                                                                                                                     // 1240
                                                                                                                       // 1241
// ES5.1 15.7.4.5                                                                                                      // 1242
// http://es5.github.com/#x15.7.4.5                                                                                    // 1243
var hasToFixedBugs = NumberPrototype.toFixed && (                                                                      // 1244
  (0.00008).toFixed(3) !== '0.000' ||                                                                                  // 1245
  (0.9).toFixed(0) !== '1' ||                                                                                          // 1246
  (1.255).toFixed(2) !== '1.25' ||                                                                                     // 1247
  (1000000000000000128).toFixed(0) !== '1000000000000000128'                                                           // 1248
);                                                                                                                     // 1249
                                                                                                                       // 1250
var toFixedHelpers = {                                                                                                 // 1251
  base: 1e7,                                                                                                           // 1252
  size: 6,                                                                                                             // 1253
  data: [0, 0, 0, 0, 0, 0],                                                                                            // 1254
  multiply: function multiply(n, c) {                                                                                  // 1255
      var i = -1;                                                                                                      // 1256
      var c2 = c;                                                                                                      // 1257
      while (++i < toFixedHelpers.size) {                                                                              // 1258
          c2 += n * toFixedHelpers.data[i];                                                                            // 1259
          toFixedHelpers.data[i] = c2 % toFixedHelpers.base;                                                           // 1260
          c2 = Math.floor(c2 / toFixedHelpers.base);                                                                   // 1261
      }                                                                                                                // 1262
  },                                                                                                                   // 1263
  divide: function divide(n) {                                                                                         // 1264
      var i = toFixedHelpers.size, c = 0;                                                                              // 1265
      while (--i >= 0) {                                                                                               // 1266
          c += toFixedHelpers.data[i];                                                                                 // 1267
          toFixedHelpers.data[i] = Math.floor(c / n);                                                                  // 1268
          c = (c % n) * toFixedHelpers.base;                                                                           // 1269
      }                                                                                                                // 1270
  },                                                                                                                   // 1271
  numToString: function numToString() {                                                                                // 1272
      var i = toFixedHelpers.size;                                                                                     // 1273
      var s = '';                                                                                                      // 1274
      while (--i >= 0) {                                                                                               // 1275
          if (s !== '' || i === 0 || toFixedHelpers.data[i] !== 0) {                                                   // 1276
              var t = $String(toFixedHelpers.data[i]);                                                                 // 1277
              if (s === '') {                                                                                          // 1278
                  s = t;                                                                                               // 1279
              } else {                                                                                                 // 1280
                  s += strSlice('0000000', 0, 7 - t.length) + t;                                                       // 1281
              }                                                                                                        // 1282
          }                                                                                                            // 1283
      }                                                                                                                // 1284
      return s;                                                                                                        // 1285
  },                                                                                                                   // 1286
  pow: function pow(x, n, acc) {                                                                                       // 1287
      return (n === 0 ? acc : (n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc)));                        // 1288
  },                                                                                                                   // 1289
  log: function log(x) {                                                                                               // 1290
      var n = 0;                                                                                                       // 1291
      var x2 = x;                                                                                                      // 1292
      while (x2 >= 4096) {                                                                                             // 1293
          n += 12;                                                                                                     // 1294
          x2 /= 4096;                                                                                                  // 1295
      }                                                                                                                // 1296
      while (x2 >= 2) {                                                                                                // 1297
          n += 1;                                                                                                      // 1298
          x2 /= 2;                                                                                                     // 1299
      }                                                                                                                // 1300
      return n;                                                                                                        // 1301
  }                                                                                                                    // 1302
};                                                                                                                     // 1303
                                                                                                                       // 1304
defineProperties(NumberPrototype, {                                                                                    // 1305
    toFixed: function toFixed(fractionDigits) {                                                                        // 1306
        var f, x, s, m, e, z, j, k;                                                                                    // 1307
                                                                                                                       // 1308
        // Test for NaN and round fractionDigits down                                                                  // 1309
        f = $Number(fractionDigits);                                                                                   // 1310
        f = f !== f ? 0 : Math.floor(f);                                                                               // 1311
                                                                                                                       // 1312
        if (f < 0 || f > 20) {                                                                                         // 1313
            throw new RangeError('Number.toFixed called with invalid number of decimals');                             // 1314
        }                                                                                                              // 1315
                                                                                                                       // 1316
        x = $Number(this);                                                                                             // 1317
                                                                                                                       // 1318
        // Test for NaN                                                                                                // 1319
        if (x !== x) {                                                                                                 // 1320
            return 'NaN';                                                                                              // 1321
        }                                                                                                              // 1322
                                                                                                                       // 1323
        // If it is too big or small, return the string value of the number                                            // 1324
        if (x <= -1e21 || x >= 1e21) {                                                                                 // 1325
            return $String(x);                                                                                         // 1326
        }                                                                                                              // 1327
                                                                                                                       // 1328
        s = '';                                                                                                        // 1329
                                                                                                                       // 1330
        if (x < 0) {                                                                                                   // 1331
            s = '-';                                                                                                   // 1332
            x = -x;                                                                                                    // 1333
        }                                                                                                              // 1334
                                                                                                                       // 1335
        m = '0';                                                                                                       // 1336
                                                                                                                       // 1337
        if (x > 1e-21) {                                                                                               // 1338
            // 1e-21 < x < 1e21                                                                                        // 1339
            // -70 < log2(x) < 70                                                                                      // 1340
            e = toFixedHelpers.log(x * toFixedHelpers.pow(2, 69, 1)) - 69;                                             // 1341
            z = (e < 0 ? x * toFixedHelpers.pow(2, -e, 1) : x / toFixedHelpers.pow(2, e, 1));                          // 1342
            z *= 0x10000000000000; // Math.pow(2, 52);                                                                 // 1343
            e = 52 - e;                                                                                                // 1344
                                                                                                                       // 1345
            // -18 < e < 122                                                                                           // 1346
            // x = z / 2 ^ e                                                                                           // 1347
            if (e > 0) {                                                                                               // 1348
                toFixedHelpers.multiply(0, z);                                                                         // 1349
                j = f;                                                                                                 // 1350
                                                                                                                       // 1351
                while (j >= 7) {                                                                                       // 1352
                    toFixedHelpers.multiply(1e7, 0);                                                                   // 1353
                    j -= 7;                                                                                            // 1354
                }                                                                                                      // 1355
                                                                                                                       // 1356
                toFixedHelpers.multiply(toFixedHelpers.pow(10, j, 1), 0);                                              // 1357
                j = e - 1;                                                                                             // 1358
                                                                                                                       // 1359
                while (j >= 23) {                                                                                      // 1360
                    toFixedHelpers.divide(1 << 23);                                                                    // 1361
                    j -= 23;                                                                                           // 1362
                }                                                                                                      // 1363
                                                                                                                       // 1364
                toFixedHelpers.divide(1 << j);                                                                         // 1365
                toFixedHelpers.multiply(1, 1);                                                                         // 1366
                toFixedHelpers.divide(2);                                                                              // 1367
                m = toFixedHelpers.numToString();                                                                      // 1368
            } else {                                                                                                   // 1369
                toFixedHelpers.multiply(0, z);                                                                         // 1370
                toFixedHelpers.multiply(1 << (-e), 0);                                                                 // 1371
                m = toFixedHelpers.numToString() + strSlice('0.00000000000000000000', 2, 2 + f);                       // 1372
            }                                                                                                          // 1373
        }                                                                                                              // 1374
                                                                                                                       // 1375
        if (f > 0) {                                                                                                   // 1376
            k = m.length;                                                                                              // 1377
                                                                                                                       // 1378
            if (k <= f) {                                                                                              // 1379
                m = s + strSlice('0.0000000000000000000', 0, f - k + 2) + m;                                           // 1380
            } else {                                                                                                   // 1381
                m = s + strSlice(m, 0, k - f) + '.' + strSlice(m, k - f);                                              // 1382
            }                                                                                                          // 1383
        } else {                                                                                                       // 1384
            m = s + m;                                                                                                 // 1385
        }                                                                                                              // 1386
                                                                                                                       // 1387
        return m;                                                                                                      // 1388
    }                                                                                                                  // 1389
}, hasToFixedBugs);                                                                                                    // 1390
                                                                                                                       // 1391
//                                                                                                                     // 1392
// String                                                                                                              // 1393
// ======                                                                                                              // 1394
//                                                                                                                     // 1395
                                                                                                                       // 1396
// ES5 15.5.4.14                                                                                                       // 1397
// http://es5.github.com/#x15.5.4.14                                                                                   // 1398
                                                                                                                       // 1399
// [bugfix, IE lt 9, firefox 4, Konqueror, Opera, obscure browsers]                                                    // 1400
// Many browsers do not split properly with regular expressions or they                                                // 1401
// do not perform the split correctly under obscure conditions.                                                        // 1402
// See http://blog.stevenlevithan.com/archives/cross-browser-split                                                     // 1403
// I've tested in many browsers and this seems to cover the deviant ones:                                              // 1404
//    'ab'.split(/(?:ab)*/) should be ["", ""], not [""]                                                               // 1405
//    '.'.split(/(.?)(.?)/) should be ["", ".", "", ""], not ["", ""]                                                  // 1406
//    'tesst'.split(/(s)*/) should be ["t", undefined, "e", "s", "t"], not                                             // 1407
//       [undefined, "t", undefined, "e", ...]                                                                         // 1408
//    ''.split(/.?/) should be [], not [""]                                                                            // 1409
//    '.'.split(/()()/) should be ["."], not ["", "", "."]                                                             // 1410
                                                                                                                       // 1411
if (                                                                                                                   // 1412
    'ab'.split(/(?:ab)*/).length !== 2 ||                                                                              // 1413
    '.'.split(/(.?)(.?)/).length !== 4 ||                                                                              // 1414
    'tesst'.split(/(s)*/)[1] === 't' ||                                                                                // 1415
    'test'.split(/(?:)/, -1).length !== 4 ||                                                                           // 1416
    ''.split(/.?/).length ||                                                                                           // 1417
    '.'.split(/()()/).length > 1                                                                                       // 1418
) {                                                                                                                    // 1419
    (function () {                                                                                                     // 1420
        var compliantExecNpcg = typeof (/()??/).exec('')[1] === 'undefined'; // NPCG: nonparticipating capturing group
                                                                                                                       // 1422
        StringPrototype.split = function (separator, limit) {                                                          // 1423
            var string = this;                                                                                         // 1424
            if (typeof separator === 'undefined' && limit === 0) {                                                     // 1425
                return [];                                                                                             // 1426
            }                                                                                                          // 1427
                                                                                                                       // 1428
            // If `separator` is not a regex, use native split                                                         // 1429
            if (!isRegex(separator)) {                                                                                 // 1430
                return strSplit(this, separator, limit);                                                               // 1431
            }                                                                                                          // 1432
                                                                                                                       // 1433
            var output = [];                                                                                           // 1434
            var flags = (separator.ignoreCase ? 'i' : '') +                                                            // 1435
                        (separator.multiline ? 'm' : '') +                                                             // 1436
                        (separator.unicode ? 'u' : '') + // in ES6                                                     // 1437
                        (separator.sticky ? 'y' : ''), // Firefox 3+ and ES6                                           // 1438
                lastLastIndex = 0,                                                                                     // 1439
                // Make `global` and avoid `lastIndex` issues by working with a copy                                   // 1440
                separator2, match, lastIndex, lastLength;                                                              // 1441
            var separatorCopy = new RegExp(separator.source, flags + 'g');                                             // 1442
            string += ''; // Type-convert                                                                              // 1443
            if (!compliantExecNpcg) {                                                                                  // 1444
                // Doesn't need flags gy, but they don't hurt                                                          // 1445
                separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);                               // 1446
            }                                                                                                          // 1447
            /* Values for `limit`, per the spec:                                                                       // 1448
             * If undefined: 4294967295 // Math.pow(2, 32) - 1                                                         // 1449
             * If 0, Infinity, or NaN: 0                                                                               // 1450
             * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;             // 1451
             * If negative number: 4294967296 - Math.floor(Math.abs(limit))                                            // 1452
             * If other: Type-convert, then use the above rules                                                        // 1453
             */                                                                                                        // 1454
            var splitLimit = typeof limit === 'undefined' ?                                                            // 1455
                -1 >>> 0 : // Math.pow(2, 32) - 1                                                                      // 1456
                ES.ToUint32(limit);                                                                                    // 1457
            match = separatorCopy.exec(string);                                                                        // 1458
            while (match) {                                                                                            // 1459
                // `separatorCopy.lastIndex` is not reliable cross-browser                                             // 1460
                lastIndex = match.index + match[0].length;                                                             // 1461
                if (lastIndex > lastLastIndex) {                                                                       // 1462
                    array_push.call(output, strSlice(string, lastLastIndex, match.index));                             // 1463
                    // Fix browsers whose `exec` methods don't consistently return `undefined` for                     // 1464
                    // nonparticipating capturing groups                                                               // 1465
                    if (!compliantExecNpcg && match.length > 1) {                                                      // 1466
                        /* eslint-disable no-loop-func */                                                              // 1467
                        match[0].replace(separator2, function () {                                                     // 1468
                            for (var i = 1; i < arguments.length - 2; i++) {                                           // 1469
                                if (typeof arguments[i] === 'undefined') {                                             // 1470
                                    match[i] = void 0;                                                                 // 1471
                                }                                                                                      // 1472
                            }                                                                                          // 1473
                        });                                                                                            // 1474
                        /* eslint-enable no-loop-func */                                                               // 1475
                    }                                                                                                  // 1476
                    if (match.length > 1 && match.index < string.length) {                                             // 1477
                        array_push.apply(output, array_slice.call(match, 1));                                          // 1478
                    }                                                                                                  // 1479
                    lastLength = match[0].length;                                                                      // 1480
                    lastLastIndex = lastIndex;                                                                         // 1481
                    if (output.length >= splitLimit) {                                                                 // 1482
                        break;                                                                                         // 1483
                    }                                                                                                  // 1484
                }                                                                                                      // 1485
                if (separatorCopy.lastIndex === match.index) {                                                         // 1486
                    separatorCopy.lastIndex++; // Avoid an infinite loop                                               // 1487
                }                                                                                                      // 1488
                match = separatorCopy.exec(string);                                                                    // 1489
            }                                                                                                          // 1490
            if (lastLastIndex === string.length) {                                                                     // 1491
                if (lastLength || !separatorCopy.test('')) {                                                           // 1492
                    array_push.call(output, '');                                                                       // 1493
                }                                                                                                      // 1494
            } else {                                                                                                   // 1495
                array_push.call(output, strSlice(string, lastLastIndex));                                              // 1496
            }                                                                                                          // 1497
            return output.length > splitLimit ? strSlice(output, 0, splitLimit) : output;                              // 1498
        };                                                                                                             // 1499
    }());                                                                                                              // 1500
                                                                                                                       // 1501
// [bugfix, chrome]                                                                                                    // 1502
// If separator is undefined, then the result array contains just one String,                                          // 1503
// which is the this value (converted to a String). If limit is not undefined,                                         // 1504
// then the output array is truncated so that it contains no more than limit                                           // 1505
// elements.                                                                                                           // 1506
// "0".split(undefined, 0) -> []                                                                                       // 1507
} else if ('0'.split(void 0, 0).length) {                                                                              // 1508
    StringPrototype.split = function split(separator, limit) {                                                         // 1509
        if (typeof separator === 'undefined' && limit === 0) { return []; }                                            // 1510
        return strSplit(this, separator, limit);                                                                       // 1511
    };                                                                                                                 // 1512
}                                                                                                                      // 1513
                                                                                                                       // 1514
var str_replace = StringPrototype.replace;                                                                             // 1515
var replaceReportsGroupsCorrectly = (function () {                                                                     // 1516
    var groups = [];                                                                                                   // 1517
    'x'.replace(/x(.)?/g, function (match, group) {                                                                    // 1518
        array_push.call(groups, group);                                                                                // 1519
    });                                                                                                                // 1520
    return groups.length === 1 && typeof groups[0] === 'undefined';                                                    // 1521
}());                                                                                                                  // 1522
                                                                                                                       // 1523
if (!replaceReportsGroupsCorrectly) {                                                                                  // 1524
    StringPrototype.replace = function replace(searchValue, replaceValue) {                                            // 1525
        var isFn = isCallable(replaceValue);                                                                           // 1526
        var hasCapturingGroups = isRegex(searchValue) && (/\)[*?]/).test(searchValue.source);                          // 1527
        if (!isFn || !hasCapturingGroups) {                                                                            // 1528
            return str_replace.call(this, searchValue, replaceValue);                                                  // 1529
        } else {                                                                                                       // 1530
            var wrappedReplaceValue = function (match) {                                                               // 1531
                var length = arguments.length;                                                                         // 1532
                var originalLastIndex = searchValue.lastIndex;                                                         // 1533
                searchValue.lastIndex = 0;                                                                             // 1534
                var args = searchValue.exec(match) || [];                                                              // 1535
                searchValue.lastIndex = originalLastIndex;                                                             // 1536
                array_push.call(args, arguments[length - 2], arguments[length - 1]);                                   // 1537
                return replaceValue.apply(this, args);                                                                 // 1538
            };                                                                                                         // 1539
            return str_replace.call(this, searchValue, wrappedReplaceValue);                                           // 1540
        }                                                                                                              // 1541
    };                                                                                                                 // 1542
}                                                                                                                      // 1543
                                                                                                                       // 1544
// ECMA-262, 3rd B.2.3                                                                                                 // 1545
// Not an ECMAScript standard, although ECMAScript 3rd Edition has a                                                   // 1546
// non-normative section suggesting uniform semantics and it should be                                                 // 1547
// normalized across all browsers                                                                                      // 1548
// [bugfix, IE lt 9] IE < 9 substr() with negative value not working in IE                                             // 1549
var string_substr = StringPrototype.substr;                                                                            // 1550
var hasNegativeSubstrBug = ''.substr && '0b'.substr(-1) !== 'b';                                                       // 1551
defineProperties(StringPrototype, {                                                                                    // 1552
    substr: function substr(start, length) {                                                                           // 1553
        var normalizedStart = start;                                                                                   // 1554
        if (start < 0) {                                                                                               // 1555
            normalizedStart = max(this.length + start, 0);                                                             // 1556
        }                                                                                                              // 1557
        return string_substr.call(this, normalizedStart, length);                                                      // 1558
    }                                                                                                                  // 1559
}, hasNegativeSubstrBug);                                                                                              // 1560
                                                                                                                       // 1561
// ES5 15.5.4.20                                                                                                       // 1562
// whitespace from: http://es5.github.io/#x15.5.4.20                                                                   // 1563
var ws = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +                                          // 1564
    '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028' +                                             // 1565
    '\u2029\uFEFF';                                                                                                    // 1566
var zeroWidth = '\u200b';                                                                                              // 1567
var wsRegexChars = '[' + ws + ']';                                                                                     // 1568
var trimBeginRegexp = new RegExp('^' + wsRegexChars + wsRegexChars + '*');                                             // 1569
var trimEndRegexp = new RegExp(wsRegexChars + wsRegexChars + '*$');                                                    // 1570
var hasTrimWhitespaceBug = StringPrototype.trim && (ws.trim() || !zeroWidth.trim());                                   // 1571
defineProperties(StringPrototype, {                                                                                    // 1572
    // http://blog.stevenlevithan.com/archives/faster-trim-javascript                                                  // 1573
    // http://perfectionkills.com/whitespace-deviations/                                                               // 1574
    trim: function trim() {                                                                                            // 1575
        if (typeof this === 'undefined' || this === null) {                                                            // 1576
            throw new TypeError("can't convert " + this + ' to object');                                               // 1577
        }                                                                                                              // 1578
        return $String(this).replace(trimBeginRegexp, '').replace(trimEndRegexp, '');                                  // 1579
    }                                                                                                                  // 1580
}, hasTrimWhitespaceBug);                                                                                              // 1581
                                                                                                                       // 1582
// ES-5 15.1.2.2                                                                                                       // 1583
if (parseInt(ws + '08') !== 8 || parseInt(ws + '0x16') !== 22) {                                                       // 1584
    /* global parseInt: true */                                                                                        // 1585
    parseInt = (function (origParseInt) {                                                                              // 1586
        var hexRegex = /^0[xX]/;                                                                                       // 1587
        return function parseInt(str, radix) {                                                                         // 1588
            var string = $String(str).trim();                                                                          // 1589
            var defaultedRadix = $Number(radix) || (hexRegex.test(string) ? 16 : 10);                                  // 1590
            return origParseInt(string, defaultedRadix);                                                               // 1591
        };                                                                                                             // 1592
    }(parseInt));                                                                                                      // 1593
}                                                                                                                      // 1594
                                                                                                                       // 1595
}));                                                                                                                   // 1596
                                                                                                                       // 1597
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/es5-shim/export_globals.js                                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var global = this;                                                                                                     // 1
                                                                                                                       // 2
if (global.Date !== Date) {                                                                                            // 3
  global.Date = Date;                                                                                                  // 4
}                                                                                                                      // 5
                                                                                                                       // 6
if (global.parseInt !== parseInt) {                                                                                    // 7
  global.parseInt = parseInt;                                                                                          // 8
}                                                                                                                      // 9
                                                                                                                       // 10
var Sp = String.prototype;                                                                                             // 11
if (Sp.replace !== originalStringReplace) {                                                                            // 12
  // Restore the original value of String#replace, because the es5-shim                                                // 13
  // reimplementation is buggy. See also import_globals.js.                                                            // 14
  Sp.replace = originalStringReplace;                                                                                  // 15
}                                                                                                                      // 16
                                                                                                                       // 17
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['es5-shim'] = {
  Date: Date,
  parseInt: parseInt
};

})();

//# sourceMappingURL=es5-shim.js.map
