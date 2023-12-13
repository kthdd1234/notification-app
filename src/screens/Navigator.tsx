/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './Home';
import SettingScreen from './Setting';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useTranslation} from 'react-i18next';
import {bottomBgColor, bottomDividerColor} from '../utils/constants';
import {useRecoilValue} from 'recoil';
import {themaAtom} from '../states';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

const Tab = createBottomTabNavigator();

const NavigatorScreen = () => {
  /** useTranslation */
  const {t} = useTranslation();

  /** useRecoilValue */
  const thema = useRecoilValue(themaAtom);

  /** tabBarItemList */
  const tabBarItemList = [
    {name: 'HomeScreen', component: HomeScreen, label: '홈', icon: 'home'},
    {
      name: 'SettingScreen',
      component: SettingScreen,
      label: '설정',
      icon: 'setting',
    },
  ];

  return (
    <BottomSheetModalProvider>
      <Tab.Navigator initialRouteName="HomeScreen">
        {tabBarItemList.map(({name, component, label, icon}) => (
          <Tab.Screen
            key={name}
            name={name}
            component={component}
            options={{
              headerShown: false,
              tabBarLabel: t(label),
              tabBarIcon: props => <AntDesign name={icon} {...props} />,
              tabBarStyle: {
                backgroundColor: bottomBgColor(thema),
                borderTopColor: bottomDividerColor(thema),
              },
            }}
          />
        ))}
      </Tab.Navigator>
    </BottomSheetModalProvider>
  );
};

export default NavigatorScreen;
