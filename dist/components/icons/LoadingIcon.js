(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "react/jsx-runtime"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("react/jsx-runtime"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.jsxRuntime);
    global.LoadingIcon = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _jsxRuntime) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  function LoadingIcon() {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink",
      viewBox: "0 0 100 100",
      preserveAspectRatio: "xMidYMid",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
        cx: "50",
        cy: "50",
        fill: "none",
        stroke: "#ccc",
        strokeWidth: "10",
        r: "35",
        strokeDasharray: "164.93361431346415 56.97787143782138",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("animateTransform", {
          attributeName: "transform",
          type: "rotate",
          repeatCount: "indefinite",
          dur: "1s",
          values: "0 50 50;360 50 50",
          keyTimes: "0;1"
        })
      })
    });
  }
  var _default = LoadingIcon;
  _exports.default = _default;
});