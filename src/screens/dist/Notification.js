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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
/* eslint-disable react-hooks/exhaustive-deps */
var react_1 = require("react");
var styled_1 = require("../components/styled");
var react_i18next_1 = require("react-i18next");
var react_2 = require("react");
var enum_1 = require("../types/enum");
var SelectButton_1 = require("../components/button/SelectButton");
var DefaultButton_1 = require("../components/button/DefaultButton");
var DisplayButton_1 = require("../components/button/DisplayButton");
var AddSection_1 = require("../components/section/AddSection");
var TextButton_1 = require("../components/button/TextButton");
var constants_1 = require("../utils/constants");
var bottomsheet_1 = require("../components/bottomsheet");
var CommonHeader_1 = require("../components/header/CommonHeader");
var moment_1 = require("moment");
var CalendarSection_1 = require("../components/section/CalendarSection");
var TimeSection_1 = require("../components/section/TimeSection");
var string_format_1 = require("string-format");
var react_3 = require("@realm/react");
var push_notification_1 = require("../utils/push-notification");
var moment_2 = require("../utils/moment");
var Notification_1 = require("../schema/Notification");
var images_1 = require("../../assets/images");
var IconView_1 = require("../components/view/IconView");
var realm_1 = require("realm");
// import {UpdateMode} from 'realm/dist/bundle';
var Default = enum_1.eTimestampTypes.Default, EveryWeek = enum_1.eTimestampTypes.EveryWeek, EveryMonth = enum_1.eTimestampTypes.EveryMonth;
var _a = [
    Default.toString(),
    EveryWeek.toString(),
    EveryMonth.toString(),
], _default = _a[0], _everyWeek = _a[1], _everyMonth = _a[2];
var NotificationScreen = function (_a) {
    var navigation = _a.navigation, route = _a.route;
    /** useTranslation */
    var t = react_i18next_1.useTranslation().t;
    /** route.params */
    var itemId = route.params.itemId;
    /** init */
    var momentNow = moment_1["default"](Date.now());
    var initDateState = momentNow.format('YYYY-MM-DD');
    var _b = momentNow
        .add(1, 'hour')
        .format('A,h')
        .split(','), initAmpm = _b[0], initHour = _b[1];
    console.log(itemId);
    /** useState */
    var _c = react_2.useState('bell'), iconState = _c[0], setIconState = _c[1];
    var _d = react_2.useState(''), textState = _d[0], setTextState = _d[1];
    var _e = react_2.useState(_default), triggerState = _e[0], setTriggerState = _e[1];
    var _f = react_2.useState([
        '',
        '월',
        '화',
        '수',
        '목',
        '금',
        '',
    ]), daysState = _f[0], setDaysState = _f[1];
    var _g = react_2.useState(initDateState), dateState = _g[0], setDateState = _g[1];
    var _h = react_2.useState({
        ampm: initAmpm,
        hour: initHour,
        minute: '00'
    }), timeState = _h[0], setTimeState = _h[1];
    var _j = react_2.useState(initDateState), monthDayState = _j[0], setMonthDayState = _j[1];
    var _k = react_2.useState(-1), initialScrollIndex = _k[0], setInitialScrollIndex = _k[1];
    /** useRef */
    var dateRef = react_2.useRef(null);
    var timeRef = react_2.useRef(null);
    var monthDayRef = react_2.useRef(null);
    /** useRealm */
    var realm = react_3.useRealm();
    var itemObj = react_3.useObject(Notification_1.Item, itemId || '');
    /** useEffect */
    react_1.useEffect(function () {
        if (itemId !== null) {
            var icon = (itemObj === null || itemObj === void 0 ? void 0 : itemObj.icon) || '';
            var text = (itemObj === null || itemObj === void 0 ? void 0 : itemObj.body) || '';
            var state = (itemObj === null || itemObj === void 0 ? void 0 : itemObj.state) || '';
            var notifications = (itemObj === null || itemObj === void 0 ? void 0 : itemObj.notifications) || [];
            var dateTime = moment_1["default"](notifications[0].dateTime);
            var _a = dateTime.format('A h mm').split(' '), ampm = _a[0], hour = _a[1], minute = _a[2];
            setIconState(icon);
            setTextState(text);
            setTriggerState(state);
            setInitialScrollIndex(images_1["default"].indexOf(icon));
            setTimeState({ ampm: ampm, hour: hour, minute: minute });
            if (state === _everyWeek) {
                var initDays_1 = ['', '', '', '', '', '', ''];
                notifications.forEach(function (obj) {
                    var day = moment_1["default"](obj.dateTime).day();
                    initDays_1[day] = enum_1.eKoDays[day];
                });
                setDaysState(__spreadArrays(initDays_1));
            }
            else {
                var dateString = dateTime.format('YYYY-MM-DD');
                setDateState(dateString);
                setMonthDayState(dateString);
            }
        }
    }, [itemId]);
    var onChangeText = function (text) {
        setTextState(text);
    };
    var onPressIcon = function (newIcon) {
        setIconState(newIcon);
    };
    var onPressTriggerButton = function (id) {
        setTriggerState(id);
    };
    var onPressDay = function (day) {
        daysState.includes(day)
            ? (daysState[enum_1.eKoDays[day]] = '')
            : (daysState[enum_1.eKoDays[day]] = day);
        setDaysState(__spreadArrays(daysState));
    };
    var onPressDateButton = function () {
        var _a;
        (_a = dateRef.current) === null || _a === void 0 ? void 0 : _a.present();
    };
    var onPressDateDone = function (value) {
        var _a;
        setDateState(value);
        (_a = dateRef.current) === null || _a === void 0 ? void 0 : _a.close();
    };
    var onPressTimeButton = function () {
        var _a;
        (_a = timeRef.current) === null || _a === void 0 ? void 0 : _a.present();
    };
    var onPressTimeDone = function (_a) {
        var _b;
        var ampm = _a.ampm, hour = _a.hour, minute = _a.minute;
        (_b = timeRef.current) === null || _b === void 0 ? void 0 : _b.close();
        setTimeState({ ampm: ampm, hour: hour, minute: minute });
    };
    var onPressMonthDayButton = function () {
        var _a;
        (_a = monthDayRef.current) === null || _a === void 0 ? void 0 : _a.present();
    };
    var onPressMonthDayDone = function (dayString) {
        var _a;
        setMonthDayState(dayString);
        (_a = monthDayRef.current) === null || _a === void 0 ? void 0 : _a.close();
    };
    var onPressTest = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            push_notification_1.localNotification({
                id: Date.now(),
                title: t('앱 이름'),
                message: textState,
                picture: constants_1.imageUrl(iconState)
            });
            push_notification_1.cancelAllLocalNotifications();
            return [2 /*return*/];
        });
    }); };
    var onPressDone = function () { return __awaiter(void 0, void 0, void 0, function () {
        var ampm, hour, minute, date, now, picture, notifications, notifiId, dateTime, dateTimeList, createEveryWeekNoti, beforeNotiList, day;
        return __generator(this, function (_a) {
            ampm = timeState.ampm, hour = timeState.hour, minute = timeState.minute;
            date = moment_1["default"](dateState);
            now = new Date(Date.now());
            picture = constants_1.imageUrl(iconState);
            notifications = [];
            notifiId = itemId ? Number(itemObj.notifications[0]._id) : constants_1.uid(0);
            dateTime = moment_2.setDateTime({
                year: date.format('YYYY'),
                month: date.format('MM'),
                day: date.format('DD'),
                ampm: ampm,
                hour: hour,
                minute: minute
            });
            // cancelAllLocalNotifications();
            if (triggerState === _default) {
                if (now.getTime() > dateTime.getTime()) {
                    dateTime = moment_1["default"](dateTime).add(1, 'd').toDate();
                }
                push_notification_1.localNotificationSchedule({
                    id: notifiId,
                    title: t('앱 이름'),
                    message: textState,
                    date: dateTime,
                    repeatType: undefined,
                    picture: picture
                });
                notifications.push({ _id: "" + notifiId, dateTime: dateTime });
            }
            else if (triggerState === _everyWeek) {
                dateTimeList = daysState
                    .filter(function (state) { return !!state; })
                    .map(function (state) { return moment_1["default"](dateTime).day(enum_1.eKoDays[state]).toDate(); });
                createEveryWeekNoti = function (list) {
                    list.forEach(function (newDate, key) {
                        var eId = constants_1.uid(key);
                        push_notification_1.localNotificationSchedule({
                            id: constants_1.uid(key),
                            title: t('앱 이름'),
                            message: textState,
                            date: newDate,
                            repeatType: 'week',
                            picture: picture
                        });
                        notifications.push({ _id: "" + eId, dateTime: newDate });
                    });
                };
                if (itemId === null) {
                    createEveryWeekNoti(dateTimeList);
                }
                else {
                    beforeNotiList = (itemObj === null || itemObj === void 0 ? void 0 : itemObj.notifications) || [];
                    beforeNotiList.forEach(function (noti) { return push_notification_1.cancelLocalNotification(noti._id); });
                    createEveryWeekNoti(dateTimeList);
                }
            }
            else if (triggerState === _everyMonth) {
                day = monthDayState.split('-')[2];
                dateTime.setDate(Number(day));
                push_notification_1.localNotificationSchedule({
                    id: notifiId,
                    title: t('앱 이름'),
                    message: textState,
                    date: dateTime,
                    repeatType: 'month',
                    picture: picture
                });
                notifications.push({ _id: "" + notifiId, dateTime: dateTime });
            }
            realm.write(function () {
                var modified = itemId === null ? realm_1.UpdateMode.Never : realm_1.UpdateMode.Modified;
                realm.create('Item', {
                    _id: "" + (itemId || constants_1.uid(0)),
                    icon: iconState,
                    body: textState,
                    type: 'timestamp',
                    state: triggerState,
                    notifications: notifications,
                    isChecked: false
                }, modified);
            });
            navigation.pop();
            return [2 /*return*/];
        });
    }); };
    var isTextState = textState !== '';
    var isEveryWeeks = EveryWeek.toString() === triggerState
        ? daysState.filter(function (state) { return !!state; }).length !== 0
        : true;
    var isEnabledDone = isTextState && isEveryWeeks;
    var handlerDone = isEnabledDone ? onPressDone : function () { return null; };
    return (react_1["default"].createElement(styled_1.NSafeAreaView, { className: "relative h-full bg-white" },
        react_1["default"].createElement(CommonHeader_1["default"], { isBack: true, title: itemId ? '알림 편집' : '알림 추가' }),
        react_1["default"].createElement(styled_1.NScrollView, { className: "p-4 bg-white" },
            react_1["default"].createElement(AddSection_1["default"], { title: "\uC544\uC774\uCF58", isNotMb: true, component: react_1["default"].createElement(IconView_1["default"], { initialScrollIndex: initialScrollIndex, seletedIcon: iconState, onPress: onPressIcon }) }),
            react_1["default"].createElement(AddSection_1["default"], { title: "\uB0B4\uC6A9", component: react_1["default"].createElement(styled_1.NTextInput, { className: "h-16 px-5 font-semibold py-3 text-lg leading-[0px] border-2 " + (textState !== '' ? 'border-blue-400' : 'border-gray-200') + " rounded-xl", autoFocus: true, placeholder: t('ex. 할 일, 약속, 스케줄 등'), value: textState, onChangeText: onChangeText }) }),
            react_1["default"].createElement(AddSection_1["default"], { title: "\uC720\uD615", component: react_1["default"].createElement(styled_1.NView, { className: "flex-row justify-between" }, constants_1.timestampTypes.map(function (info) { return (react_1["default"].createElement(SelectButton_1["default"], { key: info.id, numberType: "odd", id: info.id.toString(), name: info.name, rounded: "rounded-md", selectedId: triggerState, isGap: info.isGap, padding: "p-4", onPress: onPressTriggerButton })); })) }),
            triggerState === Default.toString() && (react_1["default"].createElement(AddSection_1["default"], { title: "\uB0A0\uC9DC", component: react_1["default"].createElement(DisplayButton_1["default"], { text: moment_1["default"](dateState).format(t(constants_1.formatString.date)), onPress: onPressDateButton }) })),
            triggerState === EveryWeek.toString() && (react_1["default"].createElement(AddSection_1["default"], { title: "\uC694\uC77C", component: react_1["default"].createElement(styled_1.NView, { className: "flex-row justify-between" }, constants_1.filterDays.map(function (day, idx) { return (react_1["default"].createElement(SelectButton_1["default"], { key: day, id: day, numberType: "odd", name: day, rounded: "rounded-full", selectedId: daysState[idx], isGap: idx !== 0 && idx % 2 !== 0, padding: "p-4", onPress: onPressDay })); })) })),
            triggerState === EveryMonth.toString() && (react_1["default"].createElement(AddSection_1["default"], { title: "\uC77C", component: react_1["default"].createElement(DisplayButton_1["default"], { text: t('매달') + " " + monthDayState.split('-')[2] + t('일'), onPress: onPressMonthDayButton }) })),
            react_1["default"].createElement(AddSection_1["default"], { title: "\uC2DC\uAC01", component: react_1["default"].createElement(DisplayButton_1["default"], { text: string_format_1["default"](t(timeState.ampm + " {}\uC2DC {}\uBD84"), timeState.hour, timeState.minute), onPress: onPressTimeButton }) })),
        react_1["default"].createElement(styled_1.NView, { className: "sticky bottom-0 p-4" },
            react_1["default"].createElement(TextButton_1["default"], { viewClassName: "flex-row justify-center items-center h-7 mb-4", textClassName: "text-blue-500 text-base", text: "\uC54C\uB9BC \uBBF8\uB9AC\uBCF4\uAE30", onPress: onPressTest }),
            react_1["default"].createElement(DefaultButton_1["default"], { name: itemId ? '편집' : '추가', isEnabled: isEnabledDone, height: 60, onPress: handlerDone })),
        react_1["default"].createElement(bottomsheet_1["default"], { title: "\uB0A0\uC9DC \uC120\uD0DD", bottomSheetModalRef: dateRef, snapPoint: 60, component: react_1["default"].createElement(CalendarSection_1["default"], { initialDate: dateState, onPress: onPressDateDone }) }),
        react_1["default"].createElement(bottomsheet_1["default"], { title: "\uB9E4\uB2EC \uBC18\uBCF5\uC77C", bottomSheetModalRef: monthDayRef, snapPoint: 60, component: react_1["default"].createElement(CalendarSection_1["default"], { initialDate: monthDayState, onPress: onPressMonthDayDone }) }),
        react_1["default"].createElement(bottomsheet_1["default"], { title: "\uC2DC\uAC04 \uC124\uC815", bottomSheetModalRef: timeRef, snapPoint: 53, component: react_1["default"].createElement(TimeSection_1["default"], { timeInfo: timeState, onPress: onPressTimeDone }) })));
};
exports["default"] = NotificationScreen;
// let trigger: TimestampTrigger | IntervalTrigger;
//else {
// now.setDate(intervalState);
// now.setHours(intervalState);
// now.setMinutes(15);
// console.log('repeatType', repeatType);
// console.log('intervalState', intervalState);
// console.log('now.getMinutes', now.getMinutes());
// localNotificationSchedule({
//   id: id,
//   title: t('앱 이름'),
//   message: textState,
//   date: now,
//   repeatType: repeatType,
//   picture: picture,
// });
// notifications.push({
//   _id: `${id}`,
//   dateTime: new Date(Date.now()),
//   interval: intervalState,
// });
// }
