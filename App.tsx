import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RecoilRoot} from 'recoil';
import {RealmProvider} from '@realm/react';
import {realmConfig} from './src/schema';
import HomeScreen from './src/screens/Home';
import NotificationScreen from './src/screens/Notification';
import SettingScreen from './src/screens/Setting';
import {NSafeAreaView} from './src/components/styled';
import TaskScreen from './src/screens/Task';
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
      headerShown: true,
    },
    {
      name: 'SettingScreen',
      component: SettingScreen,
      headerShown: false,
    },
  ];

  return (
    <NSafeAreaView className="h-full">
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
                    }}
                  />
                ))}
              </Navigator>
            </NavigationContainer>
          </GestureHandlerRootView>
        </RecoilRoot>
      </RealmProvider>
    </NSafeAreaView>
  );
};

export default App;
