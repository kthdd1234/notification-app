"use strict";
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
exports.cancelAllNotification = exports.cancelNotification = exports.setTriggerNotification = exports.displayNotification = exports.setAndroid12Notification = exports.setNotificationCategories = void 0;
/* eslint-disable dot-notation */
var react_native_1 = require("@notifee/react-native");
var constants_1 = require("../constants");
var setNotificationCategories = function (_a) {
    var memo = _a.memo, completed = _a.completed;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, react_native_1["default"].setNotificationCategories([
                        {
                            id: 'Notification',
                            actions: [
                                {
                                    id: 'memo',
                                    title: memo
                                },
                                {
                                    id: 'completed',
                                    title: completed
                                },
                            ]
                        },
                    ])];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
};
exports.setNotificationCategories = setNotificationCategories;
var setAndroid12Notification = function () { return __awaiter(void 0, void 0, void 0, function () {
    var settings;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, react_native_1["default"].getNotificationSettings()];
            case 1:
                settings = _a.sent();
                if (!(settings.android.alarm === react_native_1.AndroidNotificationSetting.ENABLED)) return [3 /*break*/, 2];
                return [2 /*return*/, true];
            case 2: return [4 /*yield*/, react_native_1["default"].openAlarmPermissionSettings()];
            case 3:
                _a.sent();
                return [2 /*return*/, false];
        }
    });
}); };
exports.setAndroid12Notification = setAndroid12Notification;
var displayNotification = function (_a) {
    var title = _a.title, body = _a.body, url = _a.url;
    return __awaiter(void 0, void 0, void 0, function () {
        var notification;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    notification = {
                        title: title,
                        body: body,
                        android: {
                            channelId: 'Notification'
                        },
                        ios: {
                            categoryId: 'Notification'
                        }
                    };
                    notification.android['style'] = {
                        type: react_native_1.AndroidStyle.BIGPICTURE,
                        picture: url
                    };
                    notification.ios['attachments'] = [
                        {
                            url: url
                        },
                    ];
                    return [4 /*yield*/, react_native_1["default"].displayNotification(notification)];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
};
exports.displayNotification = displayNotification;
var setTriggerNotification = function (_a) {
    var title = _a.title, body = _a.body, image = _a.image, trigger = _a.trigger;
    return __awaiter(void 0, void 0, void 0, function () {
        var channelId, notificationId, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, react_native_1["default"].createChannel({
                            id: constants_1.uid('n'),
                            name: 'Channel'
                        })];
                case 1:
                    channelId = _b.sent();
                    return [4 /*yield*/, react_native_1["default"].createTriggerNotification({
                            title: title,
                            body: body,
                            android: {
                                channelId: channelId,
                                style: {
                                    type: react_native_1.AndroidStyle.BIGPICTURE,
                                    picture: image
                                }
                            },
                            ios: {
                                categoryId: 'Notification',
                                attachments: [{ url: image }]
                            }
                        }, trigger)];
                case 2:
                    notificationId = _b.sent();
                    return [4 /*yield*/, getTriggerNotificationIds()];
                case 3:
                    _b.sent();
                    return [2 /*return*/, notificationId];
                case 4:
                    error_1 = _b.sent();
                    console.log(error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
};
exports.setTriggerNotification = setTriggerNotification;
var getTriggerNotificationIds = function () { return __awaiter(void 0, void 0, void 0, function () {
    var notificationIds;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, react_native_1["default"].getTriggerNotificationIds()];
            case 1:
                notificationIds = _a.sent();
                console.log('notificationIds:', notificationIds);
                return [2 /*return*/, notificationIds];
        }
    });
}); };
var cancelNotification = function (notificationId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('notificationId:', notificationId);
                return [4 /*yield*/, react_native_1["default"].cancelNotification(notificationId)];
            case 1:
                _a.sent();
                return [4 /*yield*/, getTriggerNotificationIds()];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.cancelNotification = cancelNotification;
var cancelAllNotification = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, react_native_1["default"].cancelAllNotifications()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.cancelAllNotification = cancelAllNotification;
