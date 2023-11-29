"use strict";
exports.__esModule = true;
var react_1 = require("react");
var styled_1 = require("../styled");
var react_i18next_1 = require("react-i18next");
var SvgBlockButton = function (_a) {
    var id = _a.id, svg = _a.svg, name = _a.name, svgBgColor = _a.svgBgColor, tag = _a.tag, onPress = _a.onPress;
    /** useTranslation */
    var t = react_i18next_1.useTranslation().t;
    return (react_1["default"].createElement(styled_1.NTouchableOpacity, { key: id, className: "flex-row items-center justify-between mb-5", onPress: onPress },
        react_1["default"].createElement(styled_1.NView, { className: "flex-row items-center" },
            react_1["default"].createElement(styled_1.NView, { className: "p-2 mr-3 " + svgBgColor + " rounded-lg" }, svg),
            react_1["default"].createElement(styled_1.NText, { className: "text-base text-gray-700" }, t(name))),
        tag));
};
exports["default"] = SvgBlockButton;
