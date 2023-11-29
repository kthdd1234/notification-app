"use strict";
exports.__esModule = true;
exports.themas = exports.langs = exports.notiTimestampTypes = exports.notiStatusTypes = exports.formatString = exports.timeSetting = exports.calendarLocales = exports.mediaErrorCode = exports.cameraOptions = exports.imageLibraryOptions = exports.intervalTypes = exports.timestampTypes = exports.filterDays = exports.nId = exports.imageUrl = exports.StringIsNumber = void 0;
var enum_1 = require("../../types/enum");
var Default = enum_1.eTimestampTypes.Default, EveryWeek = enum_1.eTimestampTypes.EveryWeek, EveryMonth = enum_1.eTimestampTypes.EveryMonth;
var Day = enum_1.eIntervalTypes.Day, Hour = enum_1.eIntervalTypes.Hour, Minute = enum_1.eIntervalTypes.Minute;
// const getRandomInt = (min, max) => {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// };
var nId = function (num) {
    var value = new Date(Date.now()).getTime() + num;
    return value;
};
exports.nId = nId;
// Helper
var StringIsNumber = function (value) { return isNaN(Number(value)); };
exports.StringIsNumber = StringIsNumber;
var filterDays = Object.keys(enum_1.eKoDays).filter(StringIsNumber);
exports.filterDays = filterDays;
var formatString = {
    date: 'YYYY년 MM월 Do일 (dd)',
    dateTime: 'YYYY년 MM월 Do일 dddd A h:mm',
    time: 'A h:mm'
};
exports.formatString = formatString;
var calendarLocales = {
    ko: {
        monthNames: [
            '1월',
            '2월',
            '3월',
            '4월',
            '5월',
            '6월',
            '7월',
            '8월',
            '9월',
            '10월',
            '11월',
            '12월',
        ],
        monthNamesShort: [
            '1월',
            '2월',
            '3월',
            '4월',
            '5월',
            '6월',
            '7월',
            '8월',
            '9월',
            '10월',
            '11월',
            '12월',
        ],
        dayNames: [
            '일요일',
            '월요일',
            '화요일',
            '수요일',
            '목요일',
            '금요일',
            '토요일',
        ],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        today: '오늘',
        LL: 'YYYY년 MM월 Do일 (dd)',
        meridiem: function (hours) { return (hours < 12 ? '오전' : '오후'); }
    },
    en: {
        monthNames: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ],
        monthNamesShort: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'June',
            'July',
            'Aug',
            'Sept',
            'Oct',
            'Nov',
            'Dec',
        ],
        dayNames: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ],
        dayNamesShort: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
        today: 'Today',
        LL: 'ddd, MMMM Do, YYYY',
        meridiem: function (hours, _, isLowercase) {
            if (hours < 12) {
                return isLowercase ? 'am' : 'AM';
            }
            else {
                return isLowercase ? 'pm' : 'PM';
            }
        }
    }
};
exports.calendarLocales = calendarLocales;
var timestampTypes = [
    {
        id: Default,
        name: '기본 알림',
        color: 'green'
    },
    { id: EveryWeek, name: '매주 알림', isGap: true, color: 'purple' },
    {
        id: EveryMonth,
        name: '매달 알림',
        color: 'orange'
    },
];
exports.timestampTypes = timestampTypes;
var statusTypes = [
    { id: enum_1.eNotiStatusTypes.End, name: '알림 종료', color: 'grey' },
    { id: enum_1.eNotiStatusTypes.Future, name: '알림 예정', color: 'blue' },
    { id: enum_1.eNotiStatusTypes.Off, name: '알림 끔', color: 'grey' },
];
var notiTimestampTypes = {};
exports.notiTimestampTypes = notiTimestampTypes;
var notiStatusTypes = {};
exports.notiStatusTypes = notiStatusTypes;
timestampTypes.forEach(function (_a) {
    var id = _a.id, name = _a.name, color = _a.color;
    notiTimestampTypes[id] = { name: name, color: color };
});
statusTypes.forEach(function (_a) {
    var id = _a.id, name = _a.name, color = _a.color;
    notiStatusTypes[id] = { name: name, color: color };
});
var intervalTypes = [
    {
        id: Day,
        name: '일',
        isGap: true
    },
    { id: Hour, name: '시', isGap: true },
    {
        id: Minute,
        name: '분'
    },
];
exports.intervalTypes = intervalTypes;
var imageLibraryOptions = {
    mediaType: 'mixed',
    includeBase64: true,
    assetRepresentationMode: 'current'
};
exports.imageLibraryOptions = imageLibraryOptions;
var cameraOptions = {
    mediaType: 'photo',
    videoQuality: 'high',
    cameraType: 'back',
    saveToPhotos: true
};
exports.cameraOptions = cameraOptions;
var mediaErrorCode = {
    camera_unavailable: '기기에서 카메라를 사용할 수 없습니다.',
    permission: '사진 접근 권한이 없어요.',
    others: '알 수 없는 에러가 발생하였습니다.'
};
exports.mediaErrorCode = mediaErrorCode;
var ampm = ['오전', '오후'];
var hour_1 = ['1', '2', '3', '4', '5', '6'];
var hour_2 = ['7', '8', '9', '10', '11', '12'];
var min_1 = ['00', '05', '10', '15', '20', '25'];
var min_2 = ['30', '35', '40', '45', '50', '55'];
var timeSetting = [
    { title: '오전/오후', colList: [ampm] },
    {
        title: '시',
        colList: [hour_1, hour_2]
    },
    {
        title: '분',
        colList: [min_1, min_2]
    },
];
exports.timeSetting = timeSetting;
var imageUrl = function (name) {
    return "https://firebasestorage.googleapis.com/v0/b/notification-app-32f99.appspot.com/o/" + name + ".png?alt=media&token=851e4f81-97e9-4857-b7a6-27b35ac374a2";
};
exports.imageUrl = imageUrl;
var ko = enum_1.eLanguageTypes.ko, en = enum_1.eLanguageTypes.en;
var White = enum_1.eThemaTypes.White, Dark = enum_1.eThemaTypes.Dark;
var langs = [
    { id: ko.toString(), name: '한국어' },
    { id: en.toString(), name: 'English' },
];
exports.langs = langs;
var themas = [
    { id: White.toString(), name: '밝은 테마' },
    { id: Dark.toString(), name: '어두운 테마' },
];
exports.themas = themas;
