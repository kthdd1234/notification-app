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
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-new */
var react_1 = require("react");
var _1 = require(".");
var react_i18next_1 = require("react-i18next");
var react_2 = require("react");
var push_notification_1 = require("../../utils/push-notification");
var enum_1 = require("../../types/enum");
var NotiStatusTag = function (_a) {
    var isNotify = _a.isNotify, notifications = _a.notifications, onStatus = _a.onStatus;
    /** useTranslation */
    var t = react_i18next_1.useTranslation().t;
    /** useState */
    var _b = react_2.useState({ color: 'gray', text: '' }), status = _b[0], setStatus = _b[1];
    var _c = react_2.useState(false), isLoading = _c[0], setIsLoading = _c[1];
    react_2.useEffect(function () {
        var req = function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setIsLoading(true);
                        return [4 /*yield*/, handleTimeDelay()];
                    case 1:
                        _a.sent();
                        setIsLoading(false);
                        return [2 /*return*/];
                }
            });
        }); };
        req();
    }, [isNotify]);
    var handleTimeDelay = function () {
        return new Promise(function (resolve) {
            setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                var scheduledList, notiIds, isScheduled;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, push_notification_1.getScheduledLocalNotifications()];
                        case 1:
                            scheduledList = _a.sent();
                            notiIds = notifications.map(function (noti) { return noti._id; });
                            isScheduled = scheduledList.some(function (data) {
                                return notiIds.includes(data.id);
                            });
                            if (isNotify === false) {
                                setStatus({ color: 'gray', text: '알림 끔' });
                                onStatus(enum_1.eNotiStatusTypes.Off);
                            }
                            else if (isScheduled === false) {
                                setStatus({ color: 'gray', text: '알림 종료' });
                                onStatus(enum_1.eNotiStatusTypes.End);
                            }
                            else {
                                setStatus({ color: 'blue', text: '알림 예정' });
                                onStatus(enum_1.eNotiStatusTypes.Future);
                            }
                            resolve(true);
                            return [2 /*return*/];
                    }
                });
            }); }, 1000);
        });
    };
    return (react_1["default"].createElement(_1["default"], { color: status.color, text: t(status.text), isLoading: isLoading }));
};
exports["default"] = NotiStatusTag;
