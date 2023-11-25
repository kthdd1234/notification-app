"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_calendars_1 = require("react-native-calendars");
var DefaultButton_1 = require("../button/DefaultButton");
var styled_1 = require("../styled");
var moment_1 = require("moment");
var react_i18next_1 = require("react-i18next");
var MonthSection = function (_a) {
    var _b;
    var initialDate = _a.initialDate, onPress = _a.onPress;
    /** useTranslation */
    var t = react_i18next_1.useTranslation().t;
    var _c = react_1.useState(initialDate), dateString = _c[0], setDateString = _c[1];
    var onDayPress = function (date) {
        setDateString(date.dateString);
    };
    return (react_1["default"].createElement(styled_1.NView, null,
        react_1["default"].createElement(react_native_calendars_1.Calendar, { monthFormat: t('yyyy년 MM월'), minDate: moment_1["default"](Date.now()).format('YYYY-MM-DD'), enableSwipeMonths: true, initialDate: initialDate, date: dateString, hideExtraDays: true, hideArrows: false, horizontal: true, pagingEnabled: true, markedDates: (_b = {},
                _b[dateString] = {
                    selected: true,
                    selectedColor: '#4F95F1'
                },
                _b), onDayPress: onDayPress }),
        react_1["default"].createElement(styled_1.NView, { className: "px-4 mt-4" },
            react_1["default"].createElement(DefaultButton_1["default"], { name: "\uC120\uD0DD \uC644\uB8CC", isEnabled: true, height: 50, onPress: function () { return onPress(dateString); } }))));
};
exports["default"] = MonthSection;
