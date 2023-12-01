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
/* eslint-disable react-hooks/exhaustive-deps */
var react_1 = require("react");
var styled_1 = require("../styled");
var bottom_sheet_1 = require("@gorhom/bottom-sheet");
var react_i18next_1 = require("react-i18next");
var states_1 = require("../../states");
var recoil_1 = require("recoil");
var BottomSheetModalContainer = function (_a) {
    var title = _a.title, bottomSheetModalRef = _a.bottomSheetModalRef, snapPoint = _a.snapPoint, isDetached = _a.isDetached, component = _a.component;
    /** useTranslation */
    var t = react_i18next_1.useTranslation().t;
    /** useRecoilValue */
    var thema = recoil_1.useRecoilValue(states_1.themaAtom);
    /** useCallback */
    var renderBackdrop = react_1.useCallback(function (props) { return (react_1["default"].createElement(bottom_sheet_1.BottomSheetBackdrop, __assign({}, props, { pressBehavior: "close", appearsOnIndex: 0, disappearsOnIndex: -1 }))); }, []);
    /** useMemo */
    var snapPoints = react_1.useMemo(function () { return [snapPoint + "%"]; }, []);
    // const renderFooter = useCallback(
    //   props => (
    //     <BottomSheetFooter {...props} bottomInset={24}>
    //       <NView className="px-4 mb-2">
    //         <DefaultButton
    //           name="선택 완료"
    //           isEnabled={true}
    //           height={50}
    //           onPress={() => null}
    //         />
    //       </NView>
    //     </BottomSheetFooter>
    //   ),
    //   [],
    // );
    var style = { marginHorizontal: isDetached ? 24 : 0 };
    return (react_1["default"].createElement(bottom_sheet_1.BottomSheetModalProvider, null,
        react_1["default"].createElement(bottom_sheet_1.BottomSheetModal, { style: style, ref: bottomSheetModalRef, backdropComponent: renderBackdrop, index: 0, snapPoints: snapPoints, detached: isDetached, bottomInset: isDetached ? 48 : 0 },
            title && (react_1["default"].createElement(styled_1.NView, { className: "flex-row items-center justify-center" },
                react_1["default"].createElement(styled_1.NText, { className: "mt-3 font-bold" }, t(title)))),
            react_1["default"].createElement(styled_1.NView, { className: "mt-3" }, component))));
};
exports["default"] = BottomSheetModalContainer;
