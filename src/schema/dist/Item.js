"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Item = void 0;
var react_1 = require("@realm/react");
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Item.schema = {
        name: 'Item',
        primaryKey: '_id',
        properties: {
            _id: 'string',
            isNotify: 'bool',
            icon: 'string',
            body: 'string',
            type: 'string',
            state: 'string',
            notifications: 'Notification[]',
            order: 'int',
            isChecked: 'bool',
            media: 'string?',
            sound: 'string?',
            memo: 'string?'
        }
    };
    return Item;
}(react_1.Realm.Object));
exports.Item = Item;
