"use strict";
exports.__esModule = true;
var react_i18next_1 = require("react-i18next");
var styled_1 = require("../styled");
var react_1 = require("react");
var IconButton_1 = require("../button/IconButton");
var enum_1 = require("../../types/enum");
var native_1 = require("@react-navigation/native");
var SvgButton_1 = require("../button/SvgButton");
var AntDesign_1 = require("react-native-vector-icons/AntDesign");
var constants_1 = require("../../utils/constants");
var states_1 = require("../../states");
var recoil_1 = require("recoil");
var CommonHeader = function (_a) {
    var title = _a.title, isBack = _a.isBack, actions = _a.actions;
    /** useTranslation */
    var t = react_i18next_1.useTranslation().t;
    /** useNavigation */
    var goBack = native_1.useNavigation().goBack;
    /** useRecoilValue */
    var thema = recoil_1.useRecoilValue(states_1.themaAtom);
    return (react_1["default"].createElement(styled_1.NView, { className: "sticky top-0 flex-row items-center justify-between p-4" },
        isBack ? (react_1["default"].createElement(IconButton_1["default"], { icon: enum_1.eIcon.back, size: 25, onPress: goBack, color: thema === 'White' ? 'black' : 'white' })) : (react_1["default"].createElement(styled_1.NView, null)),
        title && (react_1["default"].createElement(styled_1.NText, { className: "text-lg font-bold " + constants_1.textColor(thema) }, t(title))),
        actions ? (react_1["default"].createElement(styled_1.NView, { className: "flex-row" }, actions.map(function (_a) {
            var id = _a.id, onPress = _a.onPress;
            return (react_1["default"].createElement(SvgButton_1["default"], { key: id, svg: id, size: 30, containerClassName: "ml-4", onPress: onPress }));
        }))) : (react_1["default"].createElement(AntDesign_1["default"], { name: "left", size: 30, color: "transparent" }))));
};
exports["default"] = CommonHeader;
