(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.helpers = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.getGoogleMapsEmbedUrl = getGoogleMapsEmbedUrl;
  function getGoogleMapsEmbedUrl(address, language) {
    var _JuanEscutia;
    var zoom = 12000;
    var lang = language || 'en';
    return 'https://www.google.com/maps/embed?pb=' + '!1m18' + '!1m12' + '!1m3' + '!1d' + zoom + '!2d0' + '!3d0' + '!2m3' + '!1f0' + '!2f0' + '!3f0' + '!3m2' + '!1i1024' + '!2i768' + '!4f13.1' + '!3m3' + '!1m2' + '!1s0' + '!2s' + encodeURI((_JuanEscutia = 'Juan Escutia, 09100 Ciudad de México, CDMX, México') === null || _JuanEscutia === void 0 ? void 0 : _JuanEscutia.toLowerCase()) + '!5e0' + '!3m2' + '!1s' + lang + '!2s' + lang + '!4v' + new Date().getTime() + '000' + '!5m2' + '!1s' + lang + '!2s' + lang;
  }
});