"use strict";
exports.__esModule = true;
var react_1 = require("react");
var styled_1 = require("../styled");
var recoil_1 = require("recoil");
var states_1 = require("../../states");
var constants_1 = require("../../utils/constants");
var DisplayButton = function (_a) {
    var text = _a.text, onPress = _a.onPress;
    /** useRecoilValue */
    var thema = recoil_1.useRecoilValue(states_1.themaAtom);
    return (react_1["default"].createElement(styled_1.NTouchableOpacity, { className: "items-center justify-center w-full h-16 " + constants_1.notSelectColor(thema) + " rounded-xl", onPress: onPress },
        react_1["default"].createElement(styled_1.NText, { className: "text-base font-bold text-blue-500" }, text)));
};
exports["default"] = DisplayButton;
