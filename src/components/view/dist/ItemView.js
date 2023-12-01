"use strict";
exports.__esModule = true;
var react_1 = require("react");
var enum_1 = require("../../types/enum");
var constants_1 = require("../../utils/constants");
// import {setDateTime} from '../../utils/moment';
var IconButton_1 = require("../button/IconButton");
var styled_1 = require("../styled");
var tag_1 = require("../tag");
var NotiStatusTag_1 = require("../tag/NotiStatusTag");
var native_1 = require("@react-navigation/native");
var moment_1 = require("moment");
var react_i18next_1 = require("react-i18next");
var Item_1 = require("../../schema/Item");
var react_native_swipeable_item_1 = require("react-native-swipeable-item");
var trash_svg_1 = require("../../../assets/svgs/trash.svg");
var react_2 = require("@realm/react");
var push_notification_1 = require("../../utils/push-notification");
var states_1 = require("../../states");
var recoil_1 = require("recoil");
var All = enum_1.eTimestampTypes.All, Default = enum_1.eTimestampTypes.Default, EveryWeek = enum_1.eTimestampTypes.EveryWeek, EveryMonth = enum_1.eTimestampTypes.EveryMonth;
var End = enum_1.eNotiStatusTypes.End, Future = enum_1.eNotiStatusTypes.Future, Off = enum_1.eNotiStatusTypes.Off;
var _a = [
    All.toString(),
    Default.toString(),
    EveryWeek.toString(),
    EveryMonth.toString(),
], _all = _a[0], _default = _a[1], _everyWeek = _a[2], _everyMonth = _a[3];
var _b = [
    End.toString(),
    Future.toString(),
    Off.toString(),
], _end = _b[0], _future = _b[1], _off = _b[2];
var ItemView = function (_a) {
    var item = _a.item, onPressMore = _a.onPressMore;
    /** item */
    var _id = item._id, icon = item.icon, body = item.body, state = item.state, notifications = item.notifications, isNotify = item.isNotify;
    /** useTranslation */
    var t = react_i18next_1.useTranslation().t;
    /** useNavigation */
    var navigate = native_1.useNavigation().navigate;
    /** useRecoilValue */
    var thema = recoil_1.useRecoilValue(states_1.themaAtom);
    /** useState */
    var _b = react_1.useState(enum_1.eNotiStatusTypes.None), status = _b[0], setStatus = _b[1];
    /** Realm */
    var realm = react_2.useRealm();
    var itemObject = react_2.useObject(Item_1.Item, _id);
    var onPressItem = function (itemId) {
        var arr = ['NotificationScreen', { itemId: itemId }];
        navigate.apply(void 0, arr);
    };
    var setDateTime = function () {
        var dateTime = moment_1["default"](notifications[0].dateTime);
        var Hmm = dateTime.format(t(constants_1.formatString.time));
        if (state === _default) {
            var isToday = dateTime.isSame(moment_1["default"](), 'day');
            if (isToday) {
                return t('오늘') + " " + Hmm;
            }
            return dateTime.format(t(constants_1.formatString.dateTime));
        }
        else if (state === _everyWeek) {
            var days = notifications
                .map(function (noti) { return t(enum_1.eKoDays[moment_1["default"](noti.dateTime).day()]); })
                .join(' ･ ');
            return t('매주') + " " + days + t('요일') + " " + Hmm;
        }
        else if (state === _everyMonth) {
            var day = moment_1["default"](dateTime).format('Do');
            return t('매달') + " " + day + t('일') + " " + Hmm;
        }
    };
    var onStatus = function (type) {
        setStatus(type);
    };
    var onPressDelete = function () {
        if (state === enum_1.eTimestampTypes.EveryWeek) {
            notifications.forEach(function (noti) { return push_notification_1.cancelLocalNotification(noti._id); });
        }
        else {
            push_notification_1.cancelLocalNotification(notifications[0]._id);
        }
        realm.write(function () { return realm["delete"](itemObject); });
    };
    var opacityClassName = status === enum_1.eNotiStatusTypes.Future ? 'opacity-1' : 'opacity-50';
    var textClassName = status === enum_1.eNotiStatusTypes.Future ? 'text-black' : 'text-gray-500';
    return (react_1["default"].createElement(react_native_swipeable_item_1["default"], { key: item._id, item: item, renderUnderlayLeft: function () { return (react_1["default"].createElement(styled_1.NTouchableOpacity, { className: "items-end justify-center flex-1 pr-12", onPress: onPressDelete },
            react_1["default"].createElement(trash_svg_1["default"], { width: 27, height: 27 }),
            react_1["default"].createElement(styled_1.NText, { className: "mt-2 font-semibold" }, t('삭제')))); }, snapPointsLeft: [150] },
        react_1["default"].createElement(styled_1.NTouchableOpacity, { style: style, className: "flex-row p-5 mb-5 bg-white " + opacityClassName + " rounded-xl", onPress: function () { return onPressItem(_id); } },
            react_1["default"].createElement(styled_1.NImage, { className: "w-8 h-8 mr-4", source: { uri: constants_1.imageUrl(icon) } }),
            react_1["default"].createElement(styled_1.NView, { className: "flex-grow w-0" },
                react_1["default"].createElement(styled_1.NText, { className: "mb-3 text-base font-semibold " + textClassName }, body),
                react_1["default"].createElement(styled_1.NText, { className: "mb-1 text-xs text-gray-400" }, t('알림 날짜/시간')),
                react_1["default"].createElement(styled_1.NText, { className: "mb-3 font-bold text-gray-500" }, setDateTime()),
                react_1["default"].createElement(styled_1.NView, { className: "flex-row" },
                    react_1["default"].createElement(tag_1["default"], { color: t(constants_1.notiTimestampTypes[state].color), text: t(constants_1.notiTimestampTypes[state].name), isNotMl: true }),
                    react_1["default"].createElement(NotiStatusTag_1["default"], { isNotify: isNotify, notifications: notifications, onStatus: onStatus }))),
            react_1["default"].createElement(styled_1.NView, { className: "w-10 h-full" }),
            react_1["default"].createElement(IconButton_1["default"], { containerClassName: "absolute right-0 p-4", icon: enum_1.eIcon.more, size: 18, color: "gray", onPress: function () { return onPressMore({ itemId: _id, name: body }); } }))));
};
var style = {
    elevation: 20,
    shadowColor: '#F5F6F7',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1
};
exports["default"] = ItemView;
