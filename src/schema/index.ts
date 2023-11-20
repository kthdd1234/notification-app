import {Notification, NotifiId} from './Notification';
import {User} from './User';

export const realmConfig: Realm.Configuration = {
  schema: [User, Notification, NotifiId],
  deleteRealmIfMigrationNeeded: true,
};
