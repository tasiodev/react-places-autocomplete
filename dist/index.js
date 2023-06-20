(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./components/Field"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./components/Field"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Field);
    global.index = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _Field) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _Field = _interopRequireDefault(_Field);
  var _default = _Field.default;
  _exports.default = _default;
});