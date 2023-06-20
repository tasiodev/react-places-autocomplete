(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime/helpers/slicedToArray", "react", "../assets/css/Field.module.css", "../actions/actions", "../hooks/useDebounce", "./icons/LoadingIcon", "./icons/MarkerIcon", "./GMap", "react/jsx-runtime"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime/helpers/slicedToArray"), require("react"), require("../assets/css/Field.module.css"), require("../actions/actions"), require("../hooks/useDebounce"), require("./icons/LoadingIcon"), require("./icons/MarkerIcon"), require("./GMap"), require("react/jsx-runtime"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.slicedToArray, global.react, global.FieldModule, global.actions, global.useDebounce, global.LoadingIcon, global.MarkerIcon, global.GMap, global.jsxRuntime);
    global.Field = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _slicedToArray2, _react, _FieldModule, _actions, _useDebounce, _LoadingIcon, _MarkerIcon, _GMap, _jsxRuntime) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _slicedToArray2 = _interopRequireDefault(_slicedToArray2);
  _FieldModule = _interopRequireDefault(_FieldModule);
  _LoadingIcon = _interopRequireDefault(_LoadingIcon);
  _MarkerIcon = _interopRequireDefault(_MarkerIcon);
  _GMap = _interopRequireDefault(_GMap);
  function Field(_ref) {
    var placeId = _ref.placeId,
      placeholder = _ref.placeholder,
      gMapsKey = _ref.gMapsKey,
      onSelectPlace = _ref.onSelectPlace,
      onChange = _ref.onChange,
      customStyles = _ref.customStyles,
      searchTypes = _ref.searchTypes,
      language = _ref.language,
      disableMap = _ref.disableMap,
      disabled = _ref.disabled,
      mapExpanded = _ref.mapExpanded;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];
    var _useState3 = (0, _react.useState)(''),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      searchTerm = _useState4[0],
      setSearchTerm = _useState4[1];
    var _useState5 = (0, _react.useState)([]),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      searchResults = _useState6[0],
      setSearchResults = _useState6[1];
    var _useState7 = (0, _react.useState)(null),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      placeSelected = _useState8[0],
      setPlaceSelected = _useState8[1];
    var _useState9 = (0, _react.useState)(false),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      showResults = _useState10[0],
      setShowResults = _useState10[1];
    var _useState11 = (0, _react.useState)(false),
      _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
      showMap = _useState12[0],
      setShowMap = _useState12[1];
    var _useState13 = (0, _react.useState)(false),
      _useState14 = (0, _slicedToArray2.default)(_useState13, 2),
      allowSearch = _useState14[0],
      setAllowSearch = _useState14[1];
    var searchTermDebounced = (0, _useDebounce.useDebounce)(searchTerm, 450);
    var fieldRef = (0, _react.useRef)(null);
    (0, _react.useEffect)(function () {
      document.addEventListener('mousedown', handleClickOutside);
      return function () {
        return document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
    var handleClickOutside = function handleClickOutside(event) {
      if (fieldRef.current && !fieldRef.current.contains(event.target)) {
        setShowResults(false);
        if (!mapExpanded) {
          setShowMap(false);
        }
      }
    };
    (0, _react.useEffect)(function () {
      if (mapExpanded) setShowMap(true);
    }, [mapExpanded]);
    (0, _react.useEffect)(function () {
      if (placeId && !placeSelected) {
        setLoading(true);
        (0, _actions.getPlaceDetails)(placeId, gMapsKey).then(function (res) {
          setLoading(false);
          setPlaceSelected(res);
          setSearchTerm(res === null || res === void 0 ? void 0 : res.formatted_address);
        });
      }
    }, [placeId]);
    (0, _react.useEffect)(function () {
      if (allowSearch) onChange && onChange(null);
      if ((searchTermDebounced === null || searchTermDebounced === void 0 ? void 0 : searchTermDebounced.length) >= 3 && allowSearch) {
        setShowMap(false);
        setLoading(true);
        setPlaceSelected(null);
        (0, _actions.getAutoCompletePlaces)(searchTermDebounced, searchTypes, language, gMapsKey).then(function (res) {
          setLoading(false);
          setSearchResults(res);
          setShowResults(true);
        });
      } else {
        setSearchResults([]);
      }
    }, [searchTermDebounced]);
    (0, _react.useEffect)(function () {
      if (placeSelected) {
        onSelectPlace && onSelectPlace(placeSelected.place_id);
        onChange && onChange(placeSelected.place_id);
      }
      setShowResults(false);
    }, [placeSelected]);
    var selectPlaceHandler = function selectPlaceHandler(place) {
      setLoading(true);
      (0, _actions.getPlaceDetails)(place.place_id, gMapsKey).then(function (res) {
        setLoading(false);
        setPlaceSelected(res);
        setSearchTerm(res === null || res === void 0 ? void 0 : res.formatted_address);
        setShowMap(true);
        setShowResults(false);
        setSearchResults([]);
        setAllowSearch(false);
      });
    };
    var Gmaps = (0, _react.useMemo)(function () {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GMap.default, {
        address: (placeSelected === null || placeSelected === void 0 ? void 0 : placeSelected.description) || (placeSelected === null || placeSelected === void 0 ? void 0 : placeSelected.formatted_address),
        gMapsKey: gMapsKey,
        showMap: showMap,
        mapExpanded: mapExpanded,
        language: language,
        customStyles: customStyles
      });
    }, [placeSelected, gMapsKey, showMap, language, customStyles, mapExpanded]);
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: customStyles === null || customStyles === void 0 ? void 0 : customStyles.container,
      className: _FieldModule.default.container,
      ref: fieldRef,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: _FieldModule.default.field,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          onFocus: function onFocus() {
            return setShowResults(true);
          },
          type: "text",
          placeholder: placeholder,
          value: searchTerm,
          onChange: function onChange(e) {
            setSearchTerm(e.target.value);
            setAllowSearch(true);
          },
          disabled: disabled,
          style: customStyles === null || customStyles === void 0 ? void 0 : customStyles.fieldInput
        }), loading && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: customStyles === null || customStyles === void 0 ? void 0 : customStyles.iconLoading,
          className: _FieldModule.default.iconLoading,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_LoadingIcon.default, {})
        }), !disableMap && !loading && placeSelected && !mapExpanded && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          onClick: function onClick() {
            return setShowMap(!showMap);
          },
          style: customStyles === null || customStyles === void 0 ? void 0 : customStyles.iconMarker,
          className: _FieldModule.default.iconMarker,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_MarkerIcon.default, {})
        })]
      }), searchResults.length !== 0 && showResults && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: customStyles === null || customStyles === void 0 ? void 0 : customStyles.searchResultsContainer,
        className: _FieldModule.default.results,
        children: searchResults.map(function (result) {
          return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: customStyles === null || customStyles === void 0 ? void 0 : customStyles.searchResult,
            onClick: function onClick() {
              return selectPlaceHandler(result);
            },
            children: result.description
          }, result.place_id);
        })
      }), !disableMap && !loading && Gmaps]
    });
  }
  var _default = Field;
  _exports.default = _default;
});