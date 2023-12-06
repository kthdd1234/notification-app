/* eslint-disable dot-notation */
import notifee, {
  AndroidNotificationSetting,
  AndroidStyle,
  IntervalTrigger,
  TimestampTrigger,
} from '@notifee/react-native';

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
  const channelId = await notifee.createChannel({
    id: 'Channel',
    name: 'Channel',
  });

  const notification = {
    title: title,
    body: body,
    android: {
      channelId: channelId,
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
  try {
    const channelId = await notifee.createChannel({
      id: '123',
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
  } catch (error) {
    console.log(error);
  }
};

const getTriggerNotificationIds = async () => {
  const notificationIds = await notifee.getTriggerNotificationIds();
  console.log('notificationIds:', notificationIds);

  return notificationIds;
};

const cancelNotification = async (notificationId: string) => {
  await getTriggerNotificationIds();
  await notifee.cancelNotification(notificationId);
};

const cancelAllNotification = async () => {
  await notifee.cancelAllNotifications();
};

export {
  setNotificationCategories,
  setAndroid12Notification,
  displayNotification,
  setTriggerNotification,
  cancelNotification,
  cancelAllNotification,
};
