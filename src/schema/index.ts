import {Notification, Item} from './Notification';
import {User} from './User';

export const realmConfig: Realm.Configuration = {
  schema: [User, Notification, Item],
  deleteRealmIfMigrationNeeded: true,
};
