import {ObjectSchema} from 'realm';
import {Realm} from '@realm/react';

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
