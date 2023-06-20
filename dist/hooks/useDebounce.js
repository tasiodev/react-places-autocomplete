(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime/helpers/slicedToArray", "react"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime/helpers/slicedToArray"), require("react"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.slicedToArray, global.react);
    global.useDebounce = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _slicedToArray2, _react) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.useDebounce = useDebounce;
  _slicedToArray2 = _interopRequireDefault(_slicedToArray2);
  function useDebounce(value, delay) {
    var _useState = (0, _react.useState)(value),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      debouncedValue = _useState2[0],
      setDebouncedValue = _useState2[1];
    (0, _react.useEffect)(function () {
      var handler = setTimeout(function () {
        setDebouncedValue(value);
      }, delay);
      return function () {
        clearTimeout(handler);
      };
    }, [delay, value]);
    return debouncedValue;
  }
});