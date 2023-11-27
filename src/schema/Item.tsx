import {ObjectSchema} from 'realm';
import {Realm} from '@realm/react';
import {Notification} from './Notification';

export class Item extends Realm.Object<Item> {
  _id!: string;
  isNotify!: boolean;
  icon!: string;
  body!: string;
  type!: string;
  state!: string;
  notifications!: Notification[];
  order!: number;
  isChecked!: boolean;
  media?: string;
  sound?: string;
  memo?: string;

  static schema: ObjectSchema = {
    name: 'Item',
    primaryKey: '_id',
    properties: {
      _id: 'string',
      isNotify: {type: 'bool', default: false},
      icon: 'string',
      body: 'string',
      type: 'string',
      state: 'string',
      notifications: 'Notification[]',
      order: 'int',
      isChecked: {type: 'bool', default: false},
      media: 'string?',
      sound: 'string?',
      memo: 'string?',
    },
  };
}
