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
var styled_1 = require("../components/styled");
var CommonHeader_1 = require("../components/header/CommonHeader");
var language_svg_1 = require("../../assets/svgs/language.svg");
var reset_svg_1 = require("../../assets/svgs/reset.svg");
var review_svg_1 = require("../../assets/svgs/review.svg");
var share_svg_1 = require("../../assets/svgs/share.svg");
var private_svg_1 = require("../../assets/svgs/private.svg");
var version_svg_1 = require("../../assets/svgs/version.svg");
var dark_svg_1 = require("../../assets/svgs/dark.svg");
var enum_1 = require("../types/enum");
var SvgBlockButton_1 = require("../components/button/SvgBlockButton");
var tag_1 = require("../components/tag");
var bottomsheet_1 = require("../components/bottomsheet");
var SelectedSection_1 = require("../components/section/SelectedSection");
var react_2 = require("@realm/react");
var User_1 = require("../schema/User");
var react_i18next_1 = require("react-i18next");
var constants_1 = require("../utils/constants");
var Language = enum_1.eSettingTypes.Language, Thema = enum_1.eSettingTypes.Thema, Reset = enum_1.eSettingTypes.Reset, Review = enum_1.eSettingTypes.Review, Share = enum_1.eSettingTypes.Share, Private = enum_1.eSettingTypes.Private, Version = enum_1.eSettingTypes.Version;
var ko = enum_1.eLanguageTypes.ko;
var White = enum_1.eThemaTypes.White, Dark = enum_1.eThemaTypes.Dark;
var size = 30;
var props = { width: size, height: size };
var SettingScreen = function () {
    /** useTranslation */
    var _a = react_i18next_1.useTranslation(), t = _a.t, i18n = _a.i18n;
    /** realm */
    var realm = react_2.useRealm();
    var user = react_2.useQuery(User_1.User)[0] || { language: '', thema: '' };
    /** useRef */
    var langRef = react_1.useRef(null);
    var themaRef = react_1.useRef(null);
    console.log(user);
    var onPressLangModal = function (isOpen) {
        var _a, _b;
        isOpen ? (_a = langRef.current) === null || _a === void 0 ? void 0 : _a.present() : (_b = langRef.current) === null || _b === void 0 ? void 0 : _b.close();
    };
    var onPressLangItem = function (lang) {
        var _a;
        realm.write(function () { return (user.language = lang); });
        i18n.changeLanguage(lang);
        (_a = langRef.current) === null || _a === void 0 ? void 0 : _a.close();
    };
    var onPressThemaModal = function (isOpen) {
        var _a, _b;
        isOpen ? (_a = themaRef.current) === null || _a === void 0 ? void 0 : _a.present() : (_b = themaRef.current) === null || _b === void 0 ? void 0 : _b.close();
    };
    var onPressThemaItem = function (thema) {
        var _a;
        realm.write(function () { return (user.thema = thema); });
        //
        (_a = themaRef.current) === null || _a === void 0 ? void 0 : _a.close();
    };
    var onPressReset = function () {
        //
    };
    var onPressReview = function () {
        //
    };
    var onPressShare = function () {
        //
    };
    var onPressPrivate = function () {
        //
    };
    var onPressVersion = function () {
        //
    };
    var settingInfo = [
        {
            id: Language,
            name: '언어 변경',
            svg: react_1["default"].createElement(language_svg_1["default"], __assign({}, props)),
            tag: (react_1["default"].createElement(tag_1["default"], { color: "red", text: t(user.language === ko ? '한국어' : 'English'), onPress: function () { return onPressLangModal(true); } })),
            onPress: function () { return onPressLangModal(true); }
        },
        {
            id: Thema,
            name: '테마 변경',
            svg: react_1["default"].createElement(dark_svg_1["default"], __assign({}, props)),
            tag: (react_1["default"].createElement(tag_1["default"], { color: "purple", text: t(user.thema === White ? '밝은 테마' : '어두운 테마'), onPress: function () { return onPressThemaModal(true); } })),
            onPress: function () { return onPressThemaModal(true); }
        },
        {
            id: Reset,
            name: '전체 초기화',
            svg: react_1["default"].createElement(reset_svg_1["default"], __assign({}, props)),
            onPress: onPressReset
        },
        {
            id: Review,
            name: '앱 리뷰',
            svg: react_1["default"].createElement(review_svg_1["default"], __assign({}, props)),
            onPress: onPressReview
        },
        {
            id: Share,
            name: '앱 공유',
            svg: react_1["default"].createElement(share_svg_1["default"], __assign({}, props)),
            onPress: onPressShare
        },
        {
            id: Private,
            name: '개인정보처리방침',
            svg: react_1["default"].createElement(private_svg_1["default"], __assign({}, props, { onPress: onPressPrivate })),
            onPress: onPressPrivate
        },
        {
            id: Version,
            name: '버전',
            svg: react_1["default"].createElement(version_svg_1["default"], __assign({}, props)),
            tag: react_1["default"].createElement(tag_1["default"], { color: "yellow", text: "1.1.0" }),
            onPress: onPressVersion
        },
    ];
    return (react_1["default"].createElement(styled_1.NSafeAreaView, { className: "relative h-full bg-[#F9F9FC]" },
        react_1["default"].createElement(CommonHeader_1["default"], { isBack: true, title: "\uC124\uC815" }),
        react_1["default"].createElement(styled_1.NView, { className: "p-4" }, settingInfo.map(function (_a) {
            var id = _a.id, svg = _a.svg, name = _a.name, tag = _a.tag, onPress = _a.onPress;
            return (react_1["default"].createElement(SvgBlockButton_1["default"], { key: id, id: id, svg: svg, name: name, svgBgColor: "", tag: tag, onPress: onPress }));
        })),
        react_1["default"].createElement(bottomsheet_1["default"], { title: "\uC5B8\uC5B4 \uBCC0\uACBD", bottomSheetModalRef: langRef, component: react_1["default"].createElement(SelectedSection_1["default"], { list: constants_1.langs, selectedItem: user.language, onPressItem: onPressLangItem, onPressClose: onPressLangModal }), isDetached: true, snapPoint: 30 }),
        react_1["default"].createElement(bottomsheet_1["default"], { title: "\uD14C\uB9C8 \uBCC0\uACBD", bottomSheetModalRef: themaRef, component: react_1["default"].createElement(SelectedSection_1["default"], { list: constants_1.themas, selectedItem: user.thema, onPressItem: onPressThemaItem, onPressClose: onPressThemaModal }), isDetached: true, snapPoint: 30 })));
};
exports["default"] = SettingScreen;
/**
 * - 언어
 * - 초기화
 * - 앱 리뷰
 * - 앱 공유
 * - 개인정보처리방침
 * - 앱 버전
 *
 * language.svg
 * reset.svg
 * review.svg
 * share.svg
 * private.svg
 * version.svg
 */
