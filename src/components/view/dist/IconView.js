"use strict";
exports.__esModule = true;
/* eslint-disable react-hooks/exhaustive-deps */
var react_native_1 = require("react-native");
var react_1 = require("react");
var images_1 = require("../../../assets/images");
var SvgCircleButton_1 = require("../button/SvgCircleButton");
var IconView = function (_a) {
    var seletedIcon = _a.seletedIcon, initialScrollIndex = _a.initialScrollIndex, onPress = _a.onPress;
    /** useRef */
    var _b = react_1.useState(images_1["default"]), data = _b[0], setData = _b[1];
    react_1.useEffect(function () {
        if (initialScrollIndex !== -1) {
            var copyImageList = images_1["default"].slice();
            copyImageList.splice(initialScrollIndex, 1);
            copyImageList.unshift(images_1["default"][initialScrollIndex]);
            setData(copyImageList);
        }
    }, [initialScrollIndex]);
    return (react_1["default"].createElement(react_native_1.FlatList, { style: stlye, keyExtractor: function (name) { return name; }, data: data, horizontal: true, renderItem: function (_a) {
            var item = _a.item;
            return (react_1["default"].createElement(SvgCircleButton_1["default"], { name: item, selectedColor: "bg-blue-500", selectedIcon: seletedIcon, onPressIcon: onPress }));
        } }));
};
var stlye = { marginBottom: 8 };
exports["default"] = IconView;
