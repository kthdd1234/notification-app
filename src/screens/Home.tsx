/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {NSafeAreaView} from '../components/styled';
import {useTranslation} from 'react-i18next';
import {eSvg} from '../types/enum';
import CommonHeader from '../components/header/CommonHeader';
import {useQuery, useRealm} from '@realm/react';
import {Item} from '../schema/Notification';
import {FAB} from '@rneui/base';
import NotiTitle, {_all} from '../components/text/ItemTitle';
import NotiSection from '../components/section/ItemSection';
import EmptySection from '../components/section/EmptySection';
import {languageCode} from '../utils/i18n/i18n.config';
import {User} from '../schema/User';
import {uid} from '../utils/constants';
import {useRecoilValue} from 'recoil';
import {seletedTagAtom} from '../states';

const HomeScreen = ({navigation}) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** useRecoilState */
  const selectedTag = useRecoilValue(seletedTagAtom);

  /** useRealm */
  const realm = useRealm();
  const user = useQuery(User);
  const itemRealm = useQuery(Item);
  const itemList = itemRealm.filter(item => {
    if (selectedTag === _all) {
      return true;
    }

    return item.state === selectedTag;
  });

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
      {itemList.length > 0 ? (
        <NotiSection itemList={itemList} />
      ) : (
        <EmptySection />
      )}
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
/*
 *  ------
 * | 더보기 |
 *  ------
 * - 알림 복제
 * - 알림 수정
 * - 알림 삭제
 * - 알림 끄기
 */
{
  /* <ToggleSwitch
                isOn={false}
                onColor="blue"
                offColor="gray"
                size="medium"
                onToggle={isOn => console.log('changed to : ', isOn)}
              /> */
}
