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
var react_1 = require("react");
var styled_1 = require("../styled");
var enum_1 = require("../../types/enum");
var copy_svg_1 = require("../../../assets/svgs/copy.svg");
var edit_notification_svg_1 = require("../../../assets/svgs/edit-notification.svg");
var trash_svg_1 = require("../../../assets/svgs/trash.svg");
var disable_bell_notification_svg_1 = require("../../../assets/svgs/disable-bell-notification.svg");
var react_i18next_1 = require("react-i18next");
var DefaultButton_1 = require("../button/DefaultButton");
var Copy = enum_1.eMoreTypes.Copy, Edit = enum_1.eMoreTypes.Edit, Remove = enum_1.eMoreTypes.Remove, Enabled = enum_1.eMoreTypes.Enabled, DisEnabled = enum_1.eMoreTypes.DisEnabled;
var _a = [
    Copy,
    Edit,
    Remove,
    Enabled,
    DisEnabled,
], _copy = _a[0], _edit = _a[1], _remove = _a[2], _enabled = _a[3], _disEnabled = _a[4];
var size = 20;
var props = { width: size, height: size };
var moreItems = [
    { id: _copy, svg: react_1["default"].createElement(copy_svg_1["default"], __assign({}, props)), name: '알림 복제' },
    { id: _edit, svg: react_1["default"].createElement(edit_notification_svg_1["default"], __assign({}, props)), name: '알림 수정' },
    { id: _remove, svg: react_1["default"].createElement(trash_svg_1["default"], __assign({}, props)), name: '알림 삭제' },
    { id: _disEnabled, svg: react_1["default"].createElement(disable_bell_notification_svg_1["default"], __assign({}, props)), name: '알림 끄기' },
];
var MoreSection = function () {
    /** useTranslation */
    var t = react_i18next_1.useTranslation().t;
    var onPreeClose = function () { };
    return (react_1["default"].createElement(styled_1.NView, { className: "px-6 py-3" },
        react_1["default"].createElement(styled_1.NView, { className: "mb-2" }, moreItems.map(function (item) { return (react_1["default"].createElement(styled_1.NTouchableOpacity, { key: item.id, className: "flex-row items-center mb-5" },
            react_1["default"].createElement(styled_1.NView, { className: "p-2 mr-3 bg-gray-100 rounded-lg" }, item.svg),
            react_1["default"].createElement(styled_1.NText, { className: "text-base text-gray-700" }, t(item.name)))); })),
        react_1["default"].createElement(DefaultButton_1["default"], { name: t('닫기'), isEnabled: true, height: 48, onPress: onPreeClose })));
};
exports["default"] = MoreSection;
/*
 *  ------
 * | 더보기 |
 *  ------
 * - 알림 복제
 * - 알림 수정
 * - 알림 삭제
 * - 알림 끄기
 */
