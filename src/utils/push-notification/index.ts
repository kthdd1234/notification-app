/* eslint-disable no-new */
import PushNotification from 'react-native-push-notification';
import {eKoDays, eTimestampTypes} from '../../types/enum';
import moment from 'moment';
import {nId} from '../constants';

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
  id?: number;
  title: string;
  message: string;
  picture: string;
}

interface IParamsLocalNotificationSchedule extends IParamsLocalNotification {
  date: Date;
  repeatType: RepeatType;
  number?: number;
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
    channelId: 'notification-app',
  });
};

const localNotificationSchedule = (
  params: IParamsLocalNotificationSchedule,
) => {
  PushNotification.localNotificationSchedule(params);
};

const cancelLocalNotification = (id: string) => {
  PushNotification.cancelLocalNotification(id);
};

const cancelAllLocalNotifications = () => {
  PushNotification.cancelAllLocalNotifications();
};

const setPushNotification = ({
  itemId,
  triggerState,
  itemObj,
  dateTime,
  appName,
  textState,
  daysState,
  picture,
  monthDayState,
}) => {
  const notifications: {_id: string; dateTime: Date; interval?: number}[] = [];
  const notifiId = itemId ? Number(itemObj!.notifications[0]._id) : nId(0);
  const now = new Date(Date.now());

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
      picture: picture,
    });

    notifications.push({_id: `${notifiId}`, dateTime: dateTime});
  } else if (triggerState === _everyWeek) {
    const dateTimeList = daysState
      .filter(state => !!state)
      .map(state => moment(dateTime).day(eKoDays[state]).toDate());

    const createEveryWeekNoti = (list: Date[]) => {
      list.forEach((newDate, key) => {
        const id = nId(key);

        localNotificationSchedule({
          id: id,
          title: appName,
          message: textState,
          date: newDate,
          repeatType: 'week',
          picture: picture,
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
      picture: picture,
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
};
