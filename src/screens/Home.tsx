/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {NSafeAreaView} from '../components/styled';
import {useTranslation} from 'react-i18next';
import {eSvg} from '../types/enum';
import CommonHeader from '../components/header/CommonHeader';
import {useQuery, useRealm} from '@realm/react';
import {Item} from '../schema/Item';
import {FAB} from '@rneui/base';
import NotiTitle, {_all} from '../components/text/ItemTitle';
import NotiSection, {IParamsMore} from '../components/section/ItemSection';
import EmptySection from '../components/section/EmptySection';
import {languageCode} from '../utils/i18n/i18n.config';
import {User} from '../schema/User';
import {useRecoilValue} from 'recoil';
import {seletedTagAtom} from '../states';
import BottomSheetModalContainer from '../components/bottomsheet';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import MoreSection from '../components/section/MoreSection';
import CalendarSection from '../components/section/CalendarSection';
import {cancelAllLocalNotifications} from '../utils/push-notification';
import uuid from 'react-native-uuid';

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
  const itemRealm = useQuery(Item, property => {
    return property.sorted('order', true);
  });
  const itemList = itemRealm.filter(item => {
    if (selectedTag === _all) {
      return true;
    }

    return item.state === selectedTag;
  });

  /** useState */
  const [selectedMore, setSeletedMore] = useState<IParamsMore>({
    itemId: '',
    name: '',
  });

  useEffect(() => {
    if (user.length === 0) {
      realm.write(() => {
        realm.create('User', {
          _id: uuid.v4(),
          language: languageCode,
          isDarkMode: false,
        });
      });
    }

    cancelAllLocalNotifications();
    realm.write(() => realm.deleteAll());
  }, []);

  const onPressFloatingAction = () => {
    navigation.navigate('NotificationScreen', {
      itemId: null,
    });
  };

  const onPressCalendar = () => {
    calendarRef.current?.present();
  };

  const onPressMore = (params: IParamsMore) => {
    setSeletedMore(params);
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
        title={selectedMore.name}
        bottomSheetModalRef={moreRef}
        component={
          <MoreSection itemId={selectedMore.itemId} moreRef={moreRef} />
        }
        isDetached={true}
        snapPoint={45}
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
