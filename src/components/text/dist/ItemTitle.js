"use strict";
var _a;
exports.__esModule = true;
exports._everyMonth = exports._everyWeek = exports._default = exports._all = void 0;
var react_i18next_1 = require("react-i18next");
var styled_1 = require("../styled");
var react_1 = require("react");
var tag_1 = require("../tag");
var enum_1 = require("../../types/enum");
var recoil_1 = require("recoil");
var states_1 = require("../../states");
var constants_1 = require("../../utils/constants");
var All = enum_1.eTimestampTypes.All, Default = enum_1.eTimestampTypes.Default, EveryWeek = enum_1.eTimestampTypes.EveryWeek, EveryMonth = enum_1.eTimestampTypes.EveryMonth;
exports._all = (_a = [
    All.toString(),
    Default.toString(),
    EveryWeek.toString(),
    EveryMonth.toString(),
], _a[0]), exports._default = _a[1], exports._everyWeek = _a[2], exports._everyMonth = _a[3];
var NotiTitle = function () {
    /** useTranslation */
    var t = react_i18next_1.useTranslation().t;
    /** useRecoilState */
    var _a = recoil_1.useRecoilState(states_1.seletedTagAtom), selectedTag = _a[0], setSeletedTag = _a[1];
    /** useRecoilValue */
    var thema = recoil_1.useRecoilValue(states_1.themaAtom);
    var tagList = [
        { id: exports._all, name: '전체', color: 'blue' },
        { id: exports._default, name: '기본', color: 'green' },
        { id: exports._everyWeek, name: '매주', color: 'purple' },
        { id: exports._everyMonth, name: '매달', color: 'orange' },
    ];
    var onPressTag = function (tagId) {
        setSeletedTag(tagId);
    };
    return (react_1["default"].createElement(styled_1.NView, { className: "flex-row items-end justify-between px-4 mb-5" },
        react_1["default"].createElement(styled_1.NText, { className: "text-3xl font-bold " + constants_1.textColor(thema) }, t('알림')),
        react_1["default"].createElement(styled_1.NView, { className: "flex-row" }, tagList.map(function (_a) {
            var id = _a.id, name = _a.name, color = _a.color;
            return (react_1["default"].createElement(tag_1["default"], { key: id, color: selectedTag === id ? color : 'gray', text: "" + t(name), onPress: function () { return onPressTag(id); } }));
        }))));
};
exports["default"] = NotiTitle;
