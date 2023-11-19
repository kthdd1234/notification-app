/* eslint-disable dot-notation */
import notifee, {
  AndroidNotificationSetting,
  AndroidStyle,
  AuthorizationStatus,
  RepeatFrequency,
  TimeUnit,
  TriggerType,
} from '@notifee/react-native';

const ImageList = [
  require('../../../assets/images/bell.png'),
  require('../../../assets/images/airplane.png'),
  require('../../../assets/images/fountain-pen.png'),
  require('../../../assets/images/money-bag.png'),
  require('../../../assets/images/amazed-face.png'),
  require('../../../assets/images/birthday-cake-1.png'),
  require('../../../assets/images/graduation-cap.png'),
  require('../../../assets/images/musical-note.png'),
  require('../../../assets/images/amusing-face.png'),
  require('../../../assets/images/bus.png'),
  require('../../../assets/images/headphone.png'),
  require('../../../assets/images/open-book.png'),
  require('../../../assets/images/automobile.png'),
  require('../../../assets/images/closed-umbrella.png'),
  require('../../../assets/images/heart-suit.png'),
  require('../../../assets/images/baseball.png'),
  require('../../../assets/images/cooking.png'),
  require('../../../assets/images/hospital.png'),
  require('../../../assets/images/shower.png'),
  require('../../../assets/images/basketball.png'),
  require('../../../assets/images/dollar-banknote.png'),
  require('../../../assets/images/house-with-garden.png'),
  require('../../../assets/images/tennis-2.png'),
  require('../../../assets/images/battery.png'),
  require('../../../assets/images/ear.png'),
  require('../../../assets/images/beating-heart.png'),
  require('../../../assets/images/electric-plug.png'),
  require('../../../assets/images/magnifying-glass-tilted-left.png'),
  require('../../../assets/images/beer-mug.png'),
  require('../../../assets/images/face-with-medical-mask.png'),
  require('../../../assets/images/south-korea.png'),
  require('../../../assets/images/japan.png'),
  require('../../../assets/images/zzz.png'),
  require('../../../assets/images/no-smoking.png'),
  require('../../../assets/images/no-bicycles.png'),
  require('../../../assets/images/no-mobile-phones.png'),
  require('../../../assets/images/no-one-under-eighteen.png'),
  require('../../../assets/images/double-exclamation-mark.png'),
  require('../../../assets/images/exclamation-mark.png'),
  require('../../../assets/images/cross-mark.png'),
  require('../../../assets/images/clinking-beer-mugs.png'),
  require('../../../assets/images/rice-ball.png'),
  require('../../../assets/images/fishing-pole.png'),
  require('../../../assets/images/guitar.png'),
  require('../../../assets/images/violin.png'),
  require('../../../assets/images/wedding.png'),
  require('../../../assets/images/office-building.png'),
  require('../../../assets/images/rocket.png'),
  require('../../../assets/images/wrapped-gift-1.png'),
  require('../../../assets/images/locked-with-key.png'),
  require('../../../assets/images/e-mail-1.png'),
  require('../../../assets/images/cigarette.png'),
  require('../../../assets/images/clapper-board.png'),
].map((url, key) => ({url, key}));

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
      channelId: 'default',
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
    id: 'Timestamp',
    name: 'Timestamp Channel',
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
    id: 'Interval',
    name: 'Interval Channel',
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
  displayNotification,
  requestPermissionNotification,
  setNotificationCategories,
  setAndroid12Notification,
  setTimestampNotification,
  setIntervalNotification,
  cancelNotification,
  cancelAllNotification,
};
