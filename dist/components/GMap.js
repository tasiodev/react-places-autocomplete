(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "react", "../helpers/helpers", "../assets/css/GMap.module.css", "react/jsx-runtime"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("react"), require("../helpers/helpers"), require("../assets/css/GMap.module.css"), require("react/jsx-runtime"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.helpers, global.GMapModule, global.jsxRuntime);
    global.GMap = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _react, _helpers, _GMapModule, _jsxRuntime) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _GMapModule = _interopRequireDefault(_GMapModule);
  function GMap(_ref) {
    var gMapsKey = _ref.gMapsKey,
      address = _ref.address,
      showMap = _ref.showMap,
      mapExpanded = _ref.mapExpanded,
      language = _ref.language,
      customStyles = _ref.customStyles;
    var Iframe = (0, _react.useMemo)(function () {
      return address && /*#__PURE__*/(0, _jsxRuntime.jsx)("iframe", {
        id: showMap ? 'addressFieldMapExpanded' : 'addressFieldMap',
        title: "google-map",
        src: (0, _helpers.getGoogleMapsEmbedUrl)(address, language),
        frameBorder: "0",
        allowFullScreen: true,
        style: customStyles === null || customStyles === void 0 ? void 0 : customStyles.gmapIframe
      });
    }, [address, language]);
    return address && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: _GMapModule.default.gmapContainer,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: customStyles === null || customStyles === void 0 ? void 0 : customStyles.gmapContainer,
        className: "".concat(mapExpanded ? _GMapModule.default.gmapFixed : _GMapModule.default.gmap, " ").concat(!address || !showMap ? _GMapModule.default.hidden : _GMapModule.default.expanded),
        children: Iframe
      })
    });
  }
  var _default = GMap;
  _exports.default = _default;
});