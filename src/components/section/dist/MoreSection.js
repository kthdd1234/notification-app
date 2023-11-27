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
// import EnabledSvg from '../../../assets/svgs/able-notification.svg';
var react_i18next_1 = require("react-i18next");
var DefaultButton_1 = require("../button/DefaultButton");
var native_1 = require("@react-navigation/native");
var react_2 = require("@realm/react");
var Item_1 = require("../../schema/Item");
var constants_1 = require("../../utils/constants");
var push_notification_1 = require("../../utils/push-notification");
var moment_1 = require("moment");
var react_native_uuid_1 = require("react-native-uuid");
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
var MoreSection = function (_a) {
    var moreRef = _a.moreRef, itemId = _a.itemId;
    /** realm */
    var realm = react_2.useRealm();
    var itemObject = react_2.useObject(Item_1.Item, itemId);
    /** useTranslation */
    var t = react_i18next_1.useTranslation().t;
    /** useNavigation */
    var navigate = native_1.useNavigation().navigate;
    var onPressCopy = function () {
        var item = itemObject || {
            _id: 0,
            isNotify: false,
            notifications: [],
            order: 0
        };
        var isNotify = item.isNotify;
        var daysState = item.notifications.map(function (noti) { return enum_1.eKoDays[moment_1["default"](noti.dateTime).day()]; });
        var monthDayState = moment_1["default"](item.notifications[0].dateTime).format('YYYY-MM-DD');
        var _uid = constants_1.uid('n');
        var _id = react_native_uuid_1["default"].v4();
        console.log('_id:', _uid);
        console.log('daysState:', daysState);
        console.log('monthDayState:', monthDayState);
        if (isNotify) {
            push_notification_1.setPushNotification({
                appName: t('앱 이름'),
                itemId: _uid,
                itemObj: item,
                picture: item.icon,
                dateTime: item.notifications[0].dateTime,
                triggerState: item.state,
                textState: item.body,
                daysState: daysState,
                monthDayState: monthDayState
            });
        }
        realm.write(function () {
            realm.create('Item', __assign(__assign({}, item), { _id: _id, order: item.order }));
        });
        onPreeClose();
    };
    var onPressEdit = function () {
        var arr = ['NotificationScreen', { itemId: itemId }];
        navigate.apply(void 0, arr);
        setTimeout(onPreeClose, 1000);
    };
    var onPressRemove = function () {
        //
    };
    var onPressOnOff = function () {
        //
    };
    var onPreeClose = function () {
        var _a;
        (_a = moreRef.current) === null || _a === void 0 ? void 0 : _a.close();
    };
    var moreItems = [
        {
            id: _copy,
            svg: react_1["default"].createElement(copy_svg_1["default"], __assign({}, props)),
            name: '알림 복제',
            onPress: onPressCopy
        },
        {
            id: _edit,
            svg: react_1["default"].createElement(edit_notification_svg_1["default"], __assign({}, props)),
            name: '알림 수정',
            onPress: onPressEdit
        },
        {
            id: _remove,
            svg: react_1["default"].createElement(trash_svg_1["default"], __assign({}, props)),
            name: '알림 삭제',
            onPress: onPressRemove
        },
        {
            id: _disEnabled,
            svg: react_1["default"].createElement(disable_bell_notification_svg_1["default"], __assign({}, props)),
            name: '알림 끄기',
            onPress: onPressOnOff
        },
    ];
    return (react_1["default"].createElement(styled_1.NView, { className: "px-6 py-3" },
        react_1["default"].createElement(styled_1.NView, { className: "mb-2" }, moreItems.map(function (item) { return (react_1["default"].createElement(styled_1.NTouchableOpacity, { key: item.id, className: "flex-row items-center mb-5", onPress: item.onPress },
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
