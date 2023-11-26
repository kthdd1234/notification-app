"use strict";
exports.__esModule = true;
/* eslint-disable react-hooks/exhaustive-deps */
var react_1 = require("react");
var styled_1 = require("../components/styled");
var react_i18next_1 = require("react-i18next");
var enum_1 = require("../types/enum");
var CommonHeader_1 = require("../components/header/CommonHeader");
var react_2 = require("@realm/react");
var Notification_1 = require("../schema/Notification");
var base_1 = require("@rneui/base");
var ItemTitle_1 = require("../components/text/ItemTitle");
var ItemSection_1 = require("../components/section/ItemSection");
var EmptySection_1 = require("../components/section/EmptySection");
var i18n_config_1 = require("../utils/i18n/i18n.config");
var User_1 = require("../schema/User");
var constants_1 = require("../utils/constants");
var recoil_1 = require("recoil");
var states_1 = require("../states");
var bottomsheet_1 = require("../components/bottomsheet");
var MoreSection_1 = require("../components/section/MoreSection");
var CalendarSection_1 = require("../components/section/CalendarSection");
var HomeScreen = function (_a) {
    var navigation = _a.navigation;
    /** useTranslation */
    var t = react_i18next_1.useTranslation().t;
    /** useRecoilValue */
    var selectedTag = recoil_1.useRecoilValue(states_1.seletedTagAtom);
    /** useRef */
    var moreRef = react_1.useRef(null);
    var calendarRef = react_1.useRef(null);
    /** useRealm */
    var realm = react_2.useRealm();
    var user = react_2.useQuery(User_1.User);
    var itemRealm = react_2.useQuery(Notification_1.Item);
    var itemList = itemRealm.filter(function (item) {
        if (selectedTag === ItemTitle_1._all) {
            return true;
        }
        return item.state === selectedTag;
    });
    react_1.useEffect(function () {
        if (user.length === 0) {
            realm.write(function () {
                realm.create('User', {
                    _id: constants_1.uid(0).toString(),
                    language: i18n_config_1.languageCode,
                    isDarkMode: false
                });
            });
        }
    }, []);
    var onPressFloatingAction = function () {
        navigation.navigate('NotificationScreen', {
            itemId: null
        });
    };
    var onPressCalendar = function () {
        var _a;
        (_a = calendarRef.current) === null || _a === void 0 ? void 0 : _a.present();
    };
    var onPressMore = function (_a) {
        var _b;
        var id = _a.id, name = _a.name;
        console.log(id, name);
        (_b = moreRef.current) === null || _b === void 0 ? void 0 : _b.present();
    };
    var onPressSetting = function () {
        navigation.navigate('SettingScreen');
    };
    var headerActions = [
        { id: enum_1.eSvg.calendar, onPress: onPressCalendar },
        { id: enum_1.eSvg.setting, onPress: onPressSetting },
    ];
    return (react_1["default"].createElement(styled_1.NSafeAreaView, { className: "relative h-full bg-[#F9F9FC]" },
        react_1["default"].createElement(CommonHeader_1["default"], { actions: headerActions }),
        react_1["default"].createElement(ItemTitle_1["default"], null),
        itemList.length > 0 ? (react_1["default"].createElement(ItemSection_1["default"], { itemList: itemList, onPressMore: onPressMore })) : (react_1["default"].createElement(EmptySection_1["default"], null)),
        react_1["default"].createElement(base_1.FAB, { placement: "right", icon: { name: 'add', color: 'white' }, buttonStyle: { backgroundColor: '#4F95F1' }, titleStyle: { fontWeight: 'bold' }, title: t('알림 추가'), size: "large", onPress: onPressFloatingAction }),
        react_1["default"].createElement(bottomsheet_1["default"], { title: "name", bottomSheetModalRef: moreRef, component: react_1["default"].createElement(MoreSection_1["default"], null), isDetached: true, snapPoint: 45 }),
        react_1["default"].createElement(bottomsheet_1["default"], { title: "\uCE98\uB9B0\uB354", bottomSheetModalRef: calendarRef, component: react_1["default"].createElement(CalendarSection_1["default"], null), snapPoint: 70 })));
};
exports["default"] = HomeScreen;
/* <ToggleSwitch
    isOn={false}
    onColor="blue"
    offColor="gray"
    size="medium"
    onToggle={isOn => console.log('changed to : ', isOn)}
    /> */
