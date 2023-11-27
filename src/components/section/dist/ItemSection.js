"use strict";
exports.__esModule = true;
var react_1 = require("react");
var styled_1 = require("../styled");
var react_i18next_1 = require("react-i18next");
var enum_1 = require("../../types/enum");
var constants_1 = require("../../utils/constants");
var IconButton_1 = require("../button/IconButton");
var tag_1 = require("../tag");
var moment_1 = require("moment");
var native_1 = require("@react-navigation/native");
var All = enum_1.eTimestampTypes.All, Default = enum_1.eTimestampTypes.Default, EveryWeek = enum_1.eTimestampTypes.EveryWeek, EveryMonth = enum_1.eTimestampTypes.EveryMonth;
var _a = [
    All.toString(),
    Default.toString(),
    EveryWeek.toString(),
    EveryMonth.toString(),
], _all = _a[0], _default = _a[1], _everyWeek = _a[2], _everyMonth = _a[3];
var NotiSection = function (_a) {
    var itemList = _a.itemList, onPressMore = _a.onPressMore;
    /** useTranslation */
    var t = react_i18next_1.useTranslation().t;
    /** useNavigation */
    var navigate = native_1.useNavigation().navigate;
    var onPressItem = function (itemId) {
        var arr = ['NotificationScreen', { itemId: itemId }];
        navigate.apply(void 0, arr);
    };
    var setDateTime = function (_a) {
        var state = _a.state, notifications = _a.notifications;
        var dateTime = moment_1["default"](notifications[0].dateTime);
        var Hmm = dateTime.format(t(constants_1.formatString.time));
        if (state === _default) {
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
    return (react_1["default"].createElement(styled_1.NScrollView, { className: "p-4 bg-[#F9F9FC]" }, itemList.map(function (_a) {
        var _id = _a._id, icon = _a.icon, body = _a.body, state = _a.state, notifications = _a.notifications;
        return (react_1["default"].createElement(styled_1.NTouchableOpacity, { key: _id, style: style, className: "flex-row p-5 mb-5 bg-white rounded-xl", onPress: function () { return onPressItem(_id); } },
            react_1["default"].createElement(styled_1.NImage, { className: "w-8 h-8 mr-4", source: { uri: constants_1.imageUrl(icon) } }),
            react_1["default"].createElement(styled_1.NView, { className: "flex-grow w-0" },
                react_1["default"].createElement(styled_1.NText, { className: "mb-3 text-base font-semibold " }, body),
                react_1["default"].createElement(styled_1.NText, { className: "mb-1 text-xs text-gray-400" }, t('알림 날짜/시간')),
                react_1["default"].createElement(styled_1.NText, { className: "mb-3 font-bold text-gray-500" }, setDateTime({ state: state, notifications: notifications })),
                react_1["default"].createElement(styled_1.NView, { className: "flex-row" },
                    react_1["default"].createElement(tag_1["default"], { color: t(constants_1.notiTimestampTypes[state].color), text: t(constants_1.notiTimestampTypes[state].name), isNotMl: true }),
                    react_1["default"].createElement(tag_1["default"], { color: "blue", text: t('알림 예정') }))),
            react_1["default"].createElement(styled_1.NView, { className: "w-10 h-full" }),
            react_1["default"].createElement(IconButton_1["default"], { containerClassName: "absolute right-0 p-4", icon: enum_1.eIcon.more, size: 18, color: "gray", onPress: function () { return onPressMore({ itemId: _id, name: body }); } })));
    })));
};
var style = {
    elevation: 20,
    shadowColor: '#F5F6F7',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1
};
exports["default"] = NotiSection;
