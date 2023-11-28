"use strict";
exports.__esModule = true;
var react_1 = require("react");
var styled_1 = require("../components/styled");
var CommonHeader_1 = require("../components/header/CommonHeader");
var SettingScreen = function () {
    return (react_1["default"].createElement(styled_1.NSafeAreaView, null,
        react_1["default"].createElement(CommonHeader_1["default"], { isBack: true, title: "\uC124\uC815" }),
        react_1["default"].createElement(styled_1.NText, null, "svg")));
};
exports["default"] = SettingScreen;
/**
 * 시스템
 * - 전체 알림(기능 준비)
 * - 언어 변경
 * - 테마 변경(기능 준비)
 * - 데이터 초기화
 *
 * 기타
 * - 앱 리뷰 작성
 * - 앱 공유
 * - 개인정보처리방침
 * - 앱 버전
 */
