/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
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
import BottomSheetModalContainer from '../components/bottomsheet';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import MoreSection from '../components/section/MoreSection';
import CalendarSection from '../components/section/CalendarSection';

const HomeScreen = ({navigation}) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** useRecoilValue */
  const selectedTag = useRecoilValue(seletedTagAtom);

  /** useRef */
  const moreRef = useRef<BottomSheetModal>(null);
  const calendarRef = useRef<BottomSheetModal>(null);

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
    calendarRef.current?.present();
  };

  const onPressMore = (id: string) => {
    console.log(id);
    moreRef.current?.present();
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
        <NotiSection itemList={itemList} onPressMore={onPressMore} />
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
      <BottomSheetModalContainer
        title="더보기"
        bottomSheetModalRef={moreRef}
        component={<MoreSection />}
        snapPoint={40}
      />
      <BottomSheetModalContainer
        title="캘린더"
        bottomSheetModalRef={calendarRef}
        component={<CalendarSection />}
        snapPoint={70}
      />
    </NSafeAreaView>
  );
};

export default HomeScreen;

/* <ToggleSwitch
    isOn={false}
    onColor="blue"
    offColor="gray"
    size="medium"
    onToggle={isOn => console.log('changed to : ', isOn)}
    /> */
