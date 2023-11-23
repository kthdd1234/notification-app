/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {NSafeAreaView} from '../components/styled';
import {useTranslation} from 'react-i18next';
import {eSvg} from '../types/enum';
import CommonHeader from '../components/header/CommonHeader';
import {useQuery, useRealm} from '@realm/react';
import {Item} from '../schema/Notification';
import {FAB} from '@rneui/base';
import NotiTitle from '../components/text/ItemTitle';
import NotiSection from '../components/section/ItemSection';
import EmptySection from '../components/section/EmptySection';
import {languageCode} from '../utils/i18n/i18n.config';
import {User} from '../schema/User';
import {uid} from '../utils/constants';

const HomeScreen = ({navigation}) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** useRealm */
  const realm = useRealm();
  const user = useQuery(User);
  const itemList = useQuery(Item);

  useEffect(() => {
    if (user.length === 0) {
      realm.write(() => {
        realm.create('User', {
          _id: uid(0).toString(),
          language: languageCode,
          isDarkMode: false,
        });
      });
    }
  }, []);

  const onPressFloatingAction = () => {
    navigation.navigate('NotificationScreen', {
      itemId: null,
    });
  };

  const onPressCalendar = () => {
    //
  };

  const onPressSetting = () => {
    navigation.navigate('SettingScreen');
  };

  const headerActions = [
    {id: eSvg.calendar, onPress: onPressCalendar},
    {id: eSvg.setting, onPress: onPressSetting},
  ];

  return (
    <NSafeAreaView className="relative h-full bg-[#F9F9FC]">
      <CommonHeader actions={headerActions} />
      <NotiTitle />
      {itemList.length > 0 ? <NotiSection /> : <EmptySection />}
      <FAB
        placement="right"
        icon={{name: 'add', color: 'white'}}
        buttonStyle={{backgroundColor: '#4F95F1'}}
        titleStyle={{fontWeight: 'bold'}}
        title={t('알림 추가')}
        size="large"
        onPress={onPressFloatingAction}
      />
    </NSafeAreaView>
  );
};

export default HomeScreen;
{
  /* <ToggleSwitch
                isOn={false}
                onColor="blue"
                offColor="gray"
                size="medium"
                onToggle={isOn => console.log('changed to : ', isOn)}
              /> */
}
