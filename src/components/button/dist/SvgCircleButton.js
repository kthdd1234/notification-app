"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var constants_1 = require("../../utils/constants");
var styled_1 = require("../styled");
var recoil_1 = require("recoil");
var states_1 = require("../../states");
var SvgCircleButton = function (_a) {
    var selectedIcon = _a.selectedIcon, name = _a.name, selectedColor = _a.selectedColor, onPressIcon = _a.onPressIcon;
    var _b = react_1.useState(false), isLoading = _b[0], setIsLoading = _b[1];
    var onLoadStart = function () {
        setIsLoading(true);
    };
    var onLoadEnd = function () {
        setIsLoading(false);
    };
    /** useRecoilValue */
    var thema = recoil_1.useRecoilValue(states_1.themaAtom);
    var selectedClass = selectedIcon === name ? selectedColor : constants_1.notSelectColor(thema);
    return (react_1["default"].createElement(styled_1.NTouchableOpacity, { className: selectedClass + " items-center justify-center w-16 h-16  rounded-full mb-4 mr-2", onPress: function () { return onPressIcon(name); } },
        react_1["default"].createElement(styled_1.NImage, { className: "w-10 h-10 " + (isLoading && 'hidden'), source: { uri: constants_1.imageUrl(name) }, onLoadStart: onLoadStart, onLoadEnd: onLoadEnd }),
        isLoading && (react_1["default"].createElement(react_native_1.ActivityIndicator, { size: "small", color: "#4F95F1", animating: isLoading }))));
};
exports["default"] = SvgCircleButton;
