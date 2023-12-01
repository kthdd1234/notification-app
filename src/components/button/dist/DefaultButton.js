"use strict";
exports.__esModule = true;
var react_1 = require("react");
var styled_1 = require("../styled");
var recoil_1 = require("recoil");
var states_1 = require("../../states");
var constants_1 = require("../../utils/constants");
var DefaultButton = function (_a) {
    var name = _a.name, isEnabled = _a.isEnabled, height = _a.height, onPress = _a.onPress;
    /** useRecoilValue */
    var thema = recoil_1.useRecoilValue(states_1.themaAtom);
    /** class */
    var bgClass = isEnabled ? 'bg-blue-500' : constants_1.notSelectColor(thema);
    var textClass = isEnabled ? 'text-white' : 'text-gray-400';
    return (react_1["default"].createElement(styled_1.NTouchableOpacity, { style: { height: height }, className: "rounded-lg justify-center items-center " + bgClass, onPress: onPress },
        react_1["default"].createElement(styled_1.NText, { className: "font-bold text-base " + textClass }, name)));
};
exports["default"] = DefaultButton;
