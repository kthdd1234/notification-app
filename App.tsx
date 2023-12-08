import React, {useEffect, useLayoutEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RecoilRoot} from 'recoil';
import {RealmProvider} from '@realm/react';
import {realmConfig} from './src/schema';
import HomeScreen from './src/screens/Home';
import NotificationScreen from './src/screens/Notification';
import SettingScreen from './src/screens/Setting';
import TaskScreen from './src/screens/Task';
import PhotoScreen from './src/screens/Photo';
import PushNotification from 'react-native-push-notification';
import {PermissionsAndroid, Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {AdsConsent} from 'react-native-google-mobile-ads';
import './src/utils/i18n/i18n.config';

/** createNativeStackNavigator */
const {Navigator, Screen} = createNativeStackNavigator();

/** style */
const style = {flex: 1};

const App = () => {
  const screens = [
    {
      name: 'HomeScreen',
      component: HomeScreen,
      headerShown: false,
    },
    {
      name: 'TaskScreen',
      component: TaskScreen,
      headerShown: false,
    },
    {
      name: 'NotificationScreen',
      component: NotificationScreen,
      headerShown: false,
    },
    {
      name: 'SettingScreen',
      component: SettingScreen,
      headerShown: false,
    },
    {
      name: 'PhotoScreen',
      component: PhotoScreen,
      headerShown: false,
    },
  ];

  useLayoutEffect(() => {
    const req = async () => {
      const result = await check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);

      if (result === RESULTS.DENIED) {
        await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
      }

      const consentInfo = await AdsConsent.requestInfoUpdate();
      const {status} = await AdsConsent.loadAndShowConsentFormIfRequired();

      console.log('consentInfo:', consentInfo);
      console.log('status:', status);
    };

    req();
  }, []);

  useEffect(() => {
    const req = async () => {
      await PushNotification.requestPermissions(['alert', 'badge', 'sound']);

      if (Platform.OS === 'android') {
        try {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          );
        } catch (error) {}
      }
    };

    req();
  }, []);

  return (
    <RealmProvider {...realmConfig}>
      <RecoilRoot>
        <GestureHandlerRootView style={style}>
          <NavigationContainer>
            <Navigator initialRouteName="HomeScreen">
              {screens.map(({name, headerShown, component}) => (
                <Screen
                  key={name}
                  name={name}
                  component={component}
                  options={{
                    headerShown: headerShown,
                    headerShadowVisible: false,
                    headerBackTitleVisible: false,
                    animation: name === 'PhotoScreen' ? 'fade' : 'default',
                  }}
                />
              ))}
            </Navigator>
          </NavigationContainer>
        </GestureHandlerRootView>
      </RecoilRoot>
    </RealmProvider>
  );
};

export default App;
