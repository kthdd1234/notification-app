import {atom} from 'recoil';
import {eNotificationTypes} from '../types/enum';

const notificationTypeAtom = atom({
  key: 'notificationTypeAtom',
  default: eNotificationTypes.None,
});

export {notificationTypeAtom};
