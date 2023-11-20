/* eslint-disable dot-notation */
import notifee, {
  AndroidNotificationSetting,
  AndroidStyle,
  AuthorizationStatus,
  IntervalTrigger,
  TimestampTrigger,
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

const displayNotification = async ({
  title,
  body,
  url,
}: {
  title: string;
  body: string;
  url: any;
}) => {
  const notification = {
    title: title,
    body: body,
    android: {
      channelId: 'Notification',
    },
    ios: {
      categoryId: 'Notification',
    },
  };

  notification.android['style'] = {
    type: AndroidStyle.BIGPICTURE,
    picture: url,
  };
  notification.ios['attachments'] = [
    {
      url: url,
    },
  ];

  await notifee.displayNotification(notification);
};

const setTriggerNotification = async ({
  title,
  body,
  image,
  trigger,
}: {
  title: string;
  body: string;
  image: any;
  trigger: TimestampTrigger | IntervalTrigger;
}) => {
  const channelId = await notifee.createChannel({
    id: 'Channel',
    name: 'Channel',
  });

  const notificationId = await notifee.createTriggerNotification(
    {
      title: title,
      body: body,
      android: {
        channelId: channelId,
        style: {
          type: AndroidStyle.BIGPICTURE,
          picture: image,
        },
      },
      ios: {
        categoryId: 'Notification',
        attachments: [{url: image}],
      },
    },
    trigger,
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
  displayNotification,
  setTriggerNotification,
  cancelNotification,
  cancelAllNotification,
};
