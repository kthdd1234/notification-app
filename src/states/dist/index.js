"use strict";
exports.__esModule = true;
exports.userIdAtom = exports.themaAtom = exports.seletedTagAtom = void 0;
var recoil_1 = require("recoil");
var enum_1 = require("../types/enum");
var userIdAtom = recoil_1.atom({ key: 'userIdAtom', "default": '' });
exports.userIdAtom = userIdAtom;
var themaAtom = recoil_1.atom({
    key: 'themaAtom',
    "default": enum_1.eThemaTypes.White.toString()
});
exports.themaAtom = themaAtom;
var seletedTagAtom = recoil_1.atom({
    key: 'seletedTagAtom',
    "default": enum_1.eTimestampTypes.All.toString()
});
exports.seletedTagAtom = seletedTagAtom;
