"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var styled_1 = require("../styled");
var calendar_svg_1 = require("../../../assets/svgs/calendar.svg");
var task_svg_1 = require("../../../assets/svgs/task.svg");
var setting_svg_1 = require("../../../assets/svgs/setting.svg");
var cloud_warning_svg_1 = require("../../../assets/svgs/cloud-warning.svg");
var delete_svg_1 = require("../../../assets/svgs/delete.svg");
var react_1 = require("react");
var SvgButton = function (_a) {
    var size = _a.size, svg = _a.svg, containerClassName = _a.containerClassName, onPress = _a.onPress;
    var props = { width: size, height: size };
    var svgs = {
        calendar: react_1["default"].createElement(calendar_svg_1["default"], __assign({}, props)),
        task: react_1["default"].createElement(task_svg_1["default"], __assign({}, props)),
        setting: react_1["default"].createElement(setting_svg_1["default"], __assign({}, props)),
        warning: react_1["default"].createElement(cloud_warning_svg_1["default"], __assign({}, props)),
        "delete": react_1["default"].createElement(delete_svg_1["default"], __assign({}, props))
    };
    return (react_1["default"].createElement(styled_1.NTouchableOpacity, { className: containerClassName, onPress: function () { return onPress(svg); } }, svgs[svg]));
};
exports["default"] = SvgButton;
