import {Item} from './Item';
import {Notification} from './Notification';
import {User} from './User';
import {Realm} from '@realm/react';

export const realmConfig: Realm.Configuration = {
  schema: [User, Notification, Item],
  schemaVersion: 0,
};
