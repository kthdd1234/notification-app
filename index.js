/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification, {Importance} from 'react-native-push-notification';
import Realm from 'realm';
import 'moment-timezone';

Realm.flags.THROW_ON_GLOBAL_REALM = true;

PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);
  },

  onRegistrationError: function (err) {
    console.error(err.message, err);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});

PushNotification.createChannel(
  {
    channelId: 'notification-app',
    channelName: 'notification-app',
    channelDescription: 'A channel to categorise your notifications',
    importance: Importance.HIGH,
    vibrate: true,
  },
  created => console.log(`createChannel returned '${created}'`),
);

AppRegistry.registerComponent(appName, () => App);
