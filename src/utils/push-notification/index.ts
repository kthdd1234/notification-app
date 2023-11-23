import PushNotification from 'react-native-push-notification';

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

export {
  localNotification,
  localNotificationSchedule,
  cancelLocalNotification,
  cancelAllLocalNotifications,
};
