import {ObjectSchema} from 'realm';
import {Realm} from '@realm/react';

export class Notification extends Realm.Object<Notification> {
  _id!: string;
  icon!: number;
  body!: string;
  trigger!: string;
  notifiIds!: NotifiId[];
  isChecked!: boolean;
  memo?: string;

  static schema: ObjectSchema = {
    name: 'Notification',
    primaryKey: '_id',
    properties: {
      _id: 'string',
      icon: 'int',
      body: 'string',
      trigger: 'string',
      notifiIds: 'NotifiId[]',
      isChecked: {type: 'bool', default: false},
      memo: 'string?',
    },
  };
}

export class NotifiId extends Realm.Object {
  id!: string;
  type!: string;
  dateTime!: Date;
  interval?: number;

  static schema: ObjectSchema = {
    name: 'NotifiId',
    primaryKey: 'id',
    properties: {
      id: 'string',
      type: 'string',
      dateTime: 'date',
      interval: 'int?',
    },
  };
}
