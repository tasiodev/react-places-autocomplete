(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime/regenerator", "@babel/runtime/helpers/asyncToGenerator", "@googlemaps/js-api-loader"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime/regenerator"), require("@babel/runtime/helpers/asyncToGenerator"), require("@googlemaps/js-api-loader"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.regenerator, global.asyncToGenerator, global.jsApiLoader);
    global.actions = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _regenerator, _asyncToGenerator2, _jsApiLoader) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.getAutoCompletePlaces = getAutoCompletePlaces;
  _exports.getPlaceDetails = getPlaceDetails;
  _regenerator = _interopRequireDefault(_regenerator);
  _asyncToGenerator2 = _interopRequireDefault(_asyncToGenerator2);
  var loader = new _jsApiLoader.Loader({
    version: 'weekly',
    libraries: ['places']
  });
  function getAutoCompletePlaces(_x, _x2, _x3, _x4) {
    return _getAutoCompletePlaces.apply(this, arguments);
  }
  function _getAutoCompletePlaces() {
    _getAutoCompletePlaces = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(search, types, language, apiKey) {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (apiKey) {
              _context.next = 2;
              break;
            }
            return _context.abrupt("return", Promise.reject(new Error('[react-address-field] Missing Google Maps API key')));
          case 2:
            loader.apiKey = apiKey;
            return _context.abrupt("return", new Promise(function (resolve) {
              return loader.load().then(function (google) {
                var placesService = new google.maps.places.AutocompleteService(document.createElement('div'));
                var request = {
                  input: search,
                  language: language,
                  types: types
                };
                return placesService.getPlacePredictions(request, function (results, status) {
                  resolve(status === google.maps.places.PlacesServiceStatus.OK ? results : []);
                });
              });
            }));
          case 4:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return _getAutoCompletePlaces.apply(this, arguments);
  }
  function getPlaceDetails(placeId, apiKey) {
    if (!apiKey) return Promise.reject(new Error('[react-address-field] Missing Google Maps API key'));
    loader.apiKey = apiKey;
    var request = {
      placeId: placeId,
      fields: ['formatted_address', 'name', 'place_id']
    };
    return new Promise(function (resolve) {
      return loader.load().then(function (google) {
        var service = new google.maps.places.PlacesService(document.createElement('div'));
        service.getDetails(request, callback);
        function callback(place, status) {
          resolve(status === google.maps.places.PlacesServiceStatus.OK ? place : null);
        }
      });
    });
  }
});