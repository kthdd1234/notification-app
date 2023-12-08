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
import {androidChannelId} from './src/utils/constants';
import mobileAds, {MaxAdContentRating} from 'react-native-google-mobile-ads';

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
    channelId: androidChannelId,
    channelName: androidChannelId,
    channelDescription: 'A channel to categorise your notifications',
    importance: Importance.HIGH,
    vibrate: true,
  },
  created => console.log(`createChannel returned '${created}'`),
);

mobileAds()
  .setRequestConfiguration({
    // Update all future requests suitable for parental guidance
    maxAdContentRating: MaxAdContentRating.PG,

    // Indicates that you want your content treated as child-directed for purposes of COPPA.
    tagForChildDirectedTreatment: true,

    // Indicates that you want the ad request to be handled in a
    // manner suitable for users under the age of consent.
    tagForUnderAgeOfConsent: true,

    // An array of test device IDs to allow.
    testDeviceIdentifiers: ['EMULATOR'],
  })
  .then(() => {
    // Request config successfully set!
  });

mobileAds()
  .initialize()
  .then(adapterStatuses => {
    // Initialization complete!
  });

AppRegistry.registerComponent(appName, () => App);
