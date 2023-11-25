"use strict";
exports.__esModule = true;
var react_1 = require("react");
var styled_1 = require("../styled");
var enum_1 = require("../../types/enum");
var copy_svg_1 = require("../../../assets/svgs/copy.svg");
var edit_notification_svg_1 = require("../../../assets/svgs/edit-notification.svg");
var delete_svg_1 = require("../../../assets/svgs/delete.svg");
var disable_bell_notification_svg_1 = require("../../../assets/svgs/disable-bell-notification.svg");
var copy = enum_1.eMoreTypes.copy, edit = enum_1.eMoreTypes.edit, remove = enum_1.eMoreTypes.remove, enabled = enum_1.eMoreTypes.enabled, disEnabled = enum_1.eMoreTypes.disEnabled;
var moreItems = [
    { id: copy, svg: copy_svg_1["default"], name: '알림 복제' },
    { id: edit, svg: edit_notification_svg_1["default"], name: '알림 수정' },
    { id: remove, svg: delete_svg_1["default"], name: '알림 삭제' },
    { id: disable_bell_notification_svg_1["default"], svg: disEnabled, name: '알림 끄기' },
];
var MoreSection = function () {
    return react_1["default"].createElement(styled_1.NView, null);
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
