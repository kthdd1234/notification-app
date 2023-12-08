/* eslint-disable no-new */
import PushNotification, {
  PushNotificationScheduledLocalObject,
} from 'react-native-push-notification';
import {eKoDays, eTimestampTypes} from '../../types/enum';
import moment from 'moment';
import {androidChannelId, getRandomInt, imageUrl} from '../constants';

const {Default, EveryWeek, EveryMonth} = eTimestampTypes;
const [_default, _everyWeek, _everyMonth] = [
  Default.toString(),
  EveryWeek.toString(),
  EveryMonth.toString(),
];

export type RepeatType =
  | 'month'
  | 'week'
  | 'day'
  | 'hour'
  | 'minute'
  | 'time'
  | undefined;

interface IParamsLocalNotification {
  id?: number | string;
  title: string;
  message: string;
  picture?: string;
  largeIconUrl?: string;
}

interface IParamsLocalNotificationSchedule extends IParamsLocalNotification {
  date: Date;
  repeatType: RepeatType;
  number?: number;
}

export interface IParamsNotification {
  _id: string;
  dateTime: Date;
  interval?: number;
}

const checkPermissions = async () => {
  const result = new Promise(resolve => {
    PushNotification.checkPermissions(permissions =>
      permissions.alert ? resolve(true) : resolve(false),
    );
  });

  return (await result) as boolean;
};

const localNotification = (params: IParamsLocalNotification) => {
  PushNotification.localNotification({
    ...params,
    channelId: androidChannelId,
    allowWhileIdle: true,
  });
};

const localNotificationSchedule = (
  params: IParamsLocalNotificationSchedule,
) => {
  PushNotification.localNotificationSchedule({
    ...params,
    channelId: androidChannelId,
  });
};

const getScheduledLocalNotifications = async () => {
  const result = new Promise(resolve => {
    PushNotification.getScheduledLocalNotifications(notifications =>
      resolve(notifications),
    );
  });

  return (await result) as PushNotificationScheduledLocalObject[];
};

const cancelLocalNotification = (id: string) => {
  PushNotification.cancelLocalNotification(id);
  PushNotification.removeDeliveredNotifications([id]);
};

const cancelAllLocalNotifications = () => {
  PushNotification.cancelAllLocalNotifications();
};

const setPushNotification = ({
  itemId,
  icon,
  triggerState,
  itemObj,
  dateTime,
  appName,
  textState,
  daysState,
  monthDayState,
}) => {
  const notifications: IParamsNotification[] = [];
  const notifiId = itemId
    ? Number(itemObj!.notifications[0]._id)
    : getRandomInt();
  const now = new Date(Date.now());
  const imgUrl = imageUrl(icon);

  if (triggerState === _default) {
    if (now.getTime() > dateTime.getTime()) {
      dateTime = moment(dateTime).add(1, 'd').toDate();
    }

    localNotificationSchedule({
      id: notifiId,
      title: appName,
      message: textState,
      date: dateTime,
      repeatType: undefined,
      largeIconUrl: imgUrl,
      picture: imgUrl,
    });

    notifications.push({_id: `${notifiId}`, dateTime: dateTime});
  } else if (triggerState === _everyWeek) {
    const filterDateTimeList = daysState.filter(state => !!state);
    const dateTimeList = filterDateTimeList.map(state => {
      let date = moment(dateTime).day(eKoDays[state]).toDate();

      if (moment().isAfter(date)) {
        date = moment(dateTime)
          .day(eKoDays[state] + 7)
          .toDate();
      }

      return date;
    });

    const createEveryWeekNoti = (list: Date[]) => {
      list.forEach(newDate => {
        const id = getRandomInt();

        localNotificationSchedule({
          id: id,
          title: appName,
          message: textState,
          date: newDate,
          repeatType: 'week',
          largeIconUrl: imgUrl,
          picture: imgUrl,
        });

        notifications.push({_id: `${id}`, dateTime: newDate});
      });
    };

    if (itemId === null) {
      createEveryWeekNoti(dateTimeList);
    } else {
      const beforeNotiList = itemObj?.notifications || [];

      beforeNotiList.forEach(noti => cancelLocalNotification(noti._id));
      createEveryWeekNoti(dateTimeList);
    }
  } else if (triggerState === _everyMonth) {
    const day = monthDayState.split('-')[2];
    dateTime.setDate(Number(day));

    localNotificationSchedule({
      id: notifiId,
      title: appName,
      message: textState,
      date: dateTime,
      repeatType: 'month',
      largeIconUrl: imgUrl,
      picture: imgUrl,
    });

    notifications.push({_id: `${notifiId}`, dateTime: dateTime});
  }

  return notifications;
};

export {
  localNotification,
  localNotificationSchedule,
  cancelLocalNotification,
  cancelAllLocalNotifications,
  checkPermissions,
  setPushNotification,
  getScheduledLocalNotifications,
};
