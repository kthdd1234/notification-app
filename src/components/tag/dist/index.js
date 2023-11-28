"use strict";
exports.__esModule = true;
var react_1 = require("react");
var styled_1 = require("../styled");
var react_native_1 = require("react-native");
var colors = {
    gray: { textColor: 'text-gray-600', bgColor: 'bg-gray-100' },
    blue: { textColor: 'text-blue-600', bgColor: 'bg-blue-50' },
    green: { textColor: 'text-green-600', bgColor: 'bg-green-50' },
    red: { textColor: 'text-red-600', bgColor: 'bg-red-50' },
    purple: { textColor: 'text-purple-600', bgColor: 'bg-purple-50' },
    orange: { textColor: 'text-orange-600', bgColor: 'bg-orange-50' }
};
var Tag = function (_a) {
    var color = _a.color, text = _a.text, isNotMl = _a.isNotMl, isLoading = _a.isLoading, onPress = _a.onPress;
    return (react_1["default"].createElement(styled_1.NTouchableOpacity, { className: colors[color].bgColor + " " + (isNotMl ? '' : 'ml-2') + "  p-2 rounded-md", onPress: onPress }, isLoading ? (react_1["default"].createElement(react_native_1.ActivityIndicator, { size: "small", color: "blue" })) : (react_1["default"].createElement(styled_1.NText, { className: colors[color].textColor + " text-xs font-semibold" }, text))));
};
exports["default"] = Tag;
