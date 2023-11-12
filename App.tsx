import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RecoilRoot} from 'recoil';
import {RealmProvider} from '@realm/react';
import {realmConfig} from './src/schema';
import HomeScreen from './src/screens/Home';
import AddScreen from './src/screens/Add';
import SettingScreen from './src/screens/Setting';
import {NSafeAreaView} from './src/components/styled';

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
      hedaerTitle: null,
    },
    {
      name: 'AddScreen',
      component: AddScreen,
      headerShown: true,
      hedaerTitle: undefined,
    },
    {
      name: 'SettingScreen',
      component: SettingScreen,
      headerShown: true,
      hedaerTitle: undefined,
    },
  ];

  return (
    <NSafeAreaView className="h-full">
      <RealmProvider {...realmConfig}>
        <RecoilRoot>
          <GestureHandlerRootView style={style}>
            <NavigationContainer>
              <Navigator initialRouteName="HomeScreen">
                {screens.map(({name, headerShown, hedaerTitle, component}) => (
                  <Screen
                    key={name}
                    name={name}
                    component={component}
                    options={{
                      headerTitle: () => hedaerTitle,
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
