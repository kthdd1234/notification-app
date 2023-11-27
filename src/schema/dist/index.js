"use strict";
exports.__esModule = true;
exports.realmConfig = void 0;
var Item_1 = require("./Item");
var Notification_1 = require("./Notification");
var User_1 = require("./User");
exports.realmConfig = {
    schema: [User_1.User, Notification_1.Notification, Item_1.Item],
    deleteRealmIfMigrationNeeded: true
};
