import {ObjectSchema} from 'realm';
import {Realm} from '@realm/react';

export class Item extends Realm.Object<Item> {
  _id!: string;
  icon!: string;
  body!: string;
  type!: string;
  state!: string;
  notifications!: Notification[];
  isChecked!: boolean;
  media?: string;
  sound?: string;
  memo?: string;

  static schema: ObjectSchema = {
    name: 'Item',
    primaryKey: '_id',
    properties: {
      _id: 'string',
      icon: 'string',
      body: 'string',
      type: 'string',
      state: 'string',
      notifications: 'Notification[]',
      isChecked: {type: 'bool', default: false},
      media: 'string?',
      sound: 'string?',
      memo: 'string?',
    },
  };
}

export class Notification extends Realm.Object {
  _id!: string;
  dateTime!: Date;
  interval?: number;

  static schema: ObjectSchema = {
    name: 'Notification',
    primaryKey: '_id',
    properties: {
      _id: 'string',
      dateTime: 'date',
      interval: 'int?',
    },
  };
}
