"use strict";
exports.__esModule = true;
/* eslint-disable react-native/no-inline-styles */
var react_i18next_1 = require("react-i18next");
var styled_1 = require("../styled");
var react_1 = require("react");
var recoil_1 = require("recoil");
var states_1 = require("../../states");
var constants_1 = require("../../utils/constants");
var SelectButton = function (_a) {
    var _b;
    var id = _a.id, name = _a.name, numberType = _a.numberType, selectedId = _a.selectedId, rounded = _a.rounded, isGap = _a.isGap, padding = _a.padding, onPress = _a.onPress;
    /** useTranslation */
    var t = react_i18next_1.useTranslation().t;
    /** useRecoilValue */
    var thema = recoil_1.useRecoilValue(states_1.themaAtom);
    /** class */
    var viewClass = id === selectedId ? 'bg-blue-500' : constants_1.notSelectColor(thema);
    var gapClass = (_b = {}, _b['odd'] = isGap && 'mx-2', _b['even'] = isGap && 'mr-2', _b)[numberType];
    var textClass = id === selectedId ? 'text-white' : 'text-gray-400';
    return (react_1["default"].createElement(styled_1.NTouchableOpacity, { className: viewClass + " " + gapClass + " " + rounded + " " + padding + " items-center flex-grow ", onPress: function () { return onPress(id); } },
        react_1["default"].createElement(styled_1.NText, { className: textClass + " font-bold" }, t(name))));
};
exports["default"] = SelectButton;
