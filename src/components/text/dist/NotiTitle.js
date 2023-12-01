"use strict";
exports.__esModule = true;
var react_i18next_1 = require("react-i18next");
var SvgButton_1 = require("../button/SvgButton");
var styled_1 = require("../styled");
var enum_1 = require("../../types/enum");
var react_1 = require("react");
var constants_1 = require("../../utils/constants");
var states_1 = require("../../states");
var recoil_1 = require("recoil");
var NotiTitle = function (_a) {
    var title = _a.title, action = _a.action, onPressAction = _a.onPressAction;
    /** useTranslation */
    var t = react_i18next_1.useTranslation().t;
    /** useRecoilValue */
    var thema = recoil_1.useRecoilValue(states_1.themaAtom);
    return (react_1["default"].createElement(styled_1.NView, { className: "flex-row items-center justify-between mb-2" },
        react_1["default"].createElement(styled_1.NText, { className: "text-base font-bold " + constants_1.textColor(thema) }, t(title)),
        action === 'warning' && (react_1["default"].createElement(SvgButton_1["default"], { size: 24, svg: enum_1.eSvg.warning, onPress: function () { return onPressAction(action); } }))));
};
exports["default"] = NotiTitle;
