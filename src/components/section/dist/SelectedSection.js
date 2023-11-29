"use strict";
exports.__esModule = true;
var react_1 = require("react");
var styled_1 = require("../styled");
var Octicons_1 = require("react-native-vector-icons/Octicons");
var DefaultButton_1 = require("../button/DefaultButton");
var SelectedSection = function (_a) {
    var list = _a.list, selectedItem = _a.selectedItem, onPressItem = _a.onPressItem, onPressClose = _a.onPressClose;
    return (react_1["default"].createElement(styled_1.NView, { className: "p-4" },
        react_1["default"].createElement(styled_1.NView, { className: "mb-5" }, list.map(function (info) { return (react_1["default"].createElement(styled_1.NTouchableOpacity, { key: info.id, className: "flex-row items-center justify-between mb-5", onPress: function () { return onPressItem(info.id); } },
            react_1["default"].createElement(styled_1.NText, { className: "text-base " + (selectedItem === info.id
                    ? 'text-black font-semibold'
                    : 'text-gray-400') + " " }, info.name),
            selectedItem === info.id && react_1["default"].createElement(Octicons_1["default"], { name: "check", size: 23 }))); })),
        react_1["default"].createElement(DefaultButton_1["default"], { name: "\uB2EB\uAE30", isEnabled: true, height: 48, onPress: function () { return onPressClose(false); } })));
};
exports["default"] = SelectedSection;
