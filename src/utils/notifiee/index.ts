import notifee, {
  AndroidNotificationSetting,
  AuthorizationStatus,
  RepeatFrequency,
  TimeUnit,
  TriggerType,
} from '@notifee/react-native';

const requestPermissionNotification = async () => {
  const result = await notifee.requestPermission();
  return result.authorizationStatus >= AuthorizationStatus.AUTHORIZED;
};

const setNotificationCategories = async ({
  memo,
  completed,
}: {
  memo: string;
  completed: string;
}) => {
  await notifee.setNotificationCategories([
    {
      id: 'Notification',
      actions: [
        {
          id: 'memo',
          title: memo,
        },
        {
          id: 'completed',
          title: completed,
        },
      ],
    },
  ]);
};

const setAndroid12Notification = async () => {
  const settings = await notifee.getNotificationSettings();

  if (settings.android.alarm === AndroidNotificationSetting.ENABLED) {
    return true;
  } else {
    await notifee.openAlarmPermissionSettings();
    return false;
  }
};

const setTimestampNotification = async ({
  title,
  body,
  timestamp,
  repeatFrequency,
}: {
  title: string;
  body: string;
  timestamp: Date;
  repeatFrequency: RepeatFrequency;
}) => {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  const notificationId = await notifee.createTriggerNotification(
    {
      title: title,
      body: body,
      android: {
        channelId: channelId,
      },
      ios: {
        categoryId: 'Notification',
      },
    },
    {
      type: TriggerType.TIMESTAMP,
      timestamp: timestamp.getTime(),
      repeatFrequency: repeatFrequency,
      alarmManager: {
        allowWhileIdle: true,
      },
    },
  );

  await getTriggerNotificationIds();
  return notificationId;
};

const setIntervalNotification = async ({
  title,
  body,
  interval,
  timeUnit,
}: {
  title: string;
  body: string;
  interval: number;
  timeUnit: TimeUnit;
}) => {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  const notificationId = await notifee.createTriggerNotification(
    {
      title: title,
      body: body,
      android: {
        channelId: channelId,
      },
      ios: {
        categoryId: 'Notification',
      },
    },
    {
      type: TriggerType.INTERVAL,
      interval: interval,
      timeUnit: timeUnit,
    },
  );

  await getTriggerNotificationIds();
  return notificationId;
};

const getTriggerNotificationIds = async () => {
  const notificationIds = await notifee.getTriggerNotificationIds();
  console.log('notificationIds:', notificationIds);

  return notificationIds;
};

const cancelNotification = async (notificationId: string) => {
  console.log('notificationId:', notificationId);

  await notifee.cancelNotification(notificationId);
  await getTriggerNotificationIds();
};

const cancelAllNotification = async () => {
  await notifee.cancelAllNotifications();
};

export {
  requestPermissionNotification,
  setNotificationCategories,
  setAndroid12Notification,
  setTimestampNotification,
  setIntervalNotification,
  cancelNotification,
  cancelAllNotification,
};
