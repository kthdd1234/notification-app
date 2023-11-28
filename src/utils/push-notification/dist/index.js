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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getScheduledLocalNotifications = exports.setPushNotification = exports.checkPermissions = exports.cancelAllLocalNotifications = exports.cancelLocalNotification = exports.localNotificationSchedule = exports.localNotification = void 0;
/* eslint-disable no-new */
var react_native_push_notification_1 = require("react-native-push-notification");
var enum_1 = require("../../types/enum");
var moment_1 = require("moment");
var constants_1 = require("../constants");
var Default = enum_1.eTimestampTypes.Default, EveryWeek = enum_1.eTimestampTypes.EveryWeek, EveryMonth = enum_1.eTimestampTypes.EveryMonth;
var _a = [
    Default.toString(),
    EveryWeek.toString(),
    EveryMonth.toString(),
], _default = _a[0], _everyWeek = _a[1], _everyMonth = _a[2];
var checkPermissions = function () { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                result = new Promise(function (resolve) {
                    react_native_push_notification_1["default"].checkPermissions(function (permissions) {
                        return permissions.alert ? resolve(true) : resolve(false);
                    });
                });
                return [4 /*yield*/, result];
            case 1: return [2 /*return*/, (_a.sent())];
        }
    });
}); };
exports.checkPermissions = checkPermissions;
var localNotification = function (params) {
    react_native_push_notification_1["default"].localNotification(__assign(__assign({}, params), { channelId: 'notification-app' }));
};
exports.localNotification = localNotification;
var localNotificationSchedule = function (params) {
    react_native_push_notification_1["default"].localNotificationSchedule(params);
};
exports.localNotificationSchedule = localNotificationSchedule;
var getScheduledLocalNotifications = function () { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                result = new Promise(function (resolve) {
                    react_native_push_notification_1["default"].getScheduledLocalNotifications(function (notifications) {
                        return resolve(notifications);
                    });
                });
                return [4 /*yield*/, result];
            case 1: return [2 /*return*/, (_a.sent())];
        }
    });
}); };
exports.getScheduledLocalNotifications = getScheduledLocalNotifications;
var cancelLocalNotification = function (id) {
    react_native_push_notification_1["default"].cancelLocalNotification(id);
    react_native_push_notification_1["default"].removeDeliveredNotifications([id]);
};
exports.cancelLocalNotification = cancelLocalNotification;
var cancelAllLocalNotifications = function () {
    react_native_push_notification_1["default"].cancelAllLocalNotifications();
};
exports.cancelAllLocalNotifications = cancelAllLocalNotifications;
var setPushNotification = function (_a) {
    var itemId = _a.itemId, icon = _a.icon, triggerState = _a.triggerState, itemObj = _a.itemObj, dateTime = _a.dateTime, appName = _a.appName, textState = _a.textState, daysState = _a.daysState, monthDayState = _a.monthDayState;
    var notifications = [];
    var notifiId = itemId ? Number(itemObj.notifications[0]._id) : constants_1.nId(0);
    var now = new Date(Date.now());
    var imgUrl = constants_1.imageUrl(icon);
    if (triggerState === _default) {
        if (now.getTime() > dateTime.getTime()) {
            dateTime = moment_1["default"](dateTime).add(1, 'd').toDate();
        }
        console.log({
            id: notifiId,
            title: appName,
            message: textState,
            date: dateTime,
            repeatType: undefined,
            picture: imgUrl
        });
        localNotificationSchedule({
            id: notifiId,
            title: appName,
            message: textState,
            date: dateTime,
            repeatType: undefined,
            picture: imgUrl
        });
        notifications.push({ _id: "" + notifiId, dateTime: dateTime });
    }
    else if (triggerState === _everyWeek) {
        var dateTimeList = daysState
            .filter(function (state) { return !!state; })
            .map(function (state) { return moment_1["default"](dateTime).day(enum_1.eKoDays[state]).toDate(); });
        var createEveryWeekNoti = function (list) {
            list.forEach(function (newDate, key) {
                var id = constants_1.nId(key);
                localNotificationSchedule({
                    id: id,
                    title: appName,
                    message: textState,
                    date: newDate,
                    repeatType: 'week',
                    picture: imgUrl
                });
                notifications.push({ _id: "" + id, dateTime: newDate });
            });
        };
        if (itemId === null) {
            createEveryWeekNoti(dateTimeList);
        }
        else {
            var beforeNotiList = (itemObj === null || itemObj === void 0 ? void 0 : itemObj.notifications) || [];
            beforeNotiList.forEach(function (noti) { return cancelLocalNotification(noti._id); });
            createEveryWeekNoti(dateTimeList);
        }
    }
    else if (triggerState === _everyMonth) {
        var day = monthDayState.split('-')[2];
        dateTime.setDate(Number(day));
        localNotificationSchedule({
            id: notifiId,
            title: appName,
            message: textState,
            date: dateTime,
            repeatType: 'month',
            picture: imgUrl
        });
        notifications.push({ _id: "" + notifiId, dateTime: dateTime });
    }
    return notifications;
};
exports.setPushNotification = setPushNotification;
