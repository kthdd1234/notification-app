/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {NSafeAreaView, NView} from '../components/styled';
import {useTranslation} from 'react-i18next';
import {eLanguageTypes, eSvg, eThemaTypes} from '../types/enum';
import CommonHeader from '../components/header/CommonHeader';
import {useQuery, useRealm} from '@realm/react';
import {Item} from '../schema/Item';
import {FAB} from '@rneui/base';
import NotiTitle, {_all} from '../components/text/ItemTitle';
import EmptySection from '../components/section/EmptySection';
import {languageCode} from '../utils/i18n/i18n.config';
import {User} from '../schema/User';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {seletedTagAtom, themaAtom, userIdAtom} from '../states';
import BottomSheetModalContainer from '../components/bottomsheet';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import MoreSection from '../components/section/MoreSection';
import CalendarSection from '../components/section/CalendarSection';
import uuid from 'react-native-uuid';
import {FlatList} from 'react-native';
import ItemView from '../components/view/ItemView';
import {IParamsMore} from '../types/interface';
import {bgColor} from '../utils/constants';
// import * as StoreReview from 'react-native-store-review';

const {ko, en} = eLanguageTypes;

const HomeScreen = ({navigation}) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** useRecoil */
  const [thema, setThema] = useRecoilState(themaAtom);
  const selectedTag = useRecoilValue(seletedTagAtom);
  const setUserId = useSetRecoilState(userIdAtom);

  /** useRef */
  const moreRef = useRef<BottomSheetModal>(null);
  const calendarRef = useRef<BottomSheetModal>(null);

  /** useRealm */
  const realm = useRealm();
  const userList = useQuery(User);
  const itemRealm = useQuery(Item, property => property.sorted('order', true));
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

  // useEffect(() => {
  //   if (itemList.length > 1) {
  //   }
  // }, []);

  useEffect(() => {
    const user = userList[0];

    if (user === undefined) {
      realm.write(() => {
        realm.create('User', {
          _id: uuid.v4(),
          language: languageCode === ko ? ko : en,
          thema: eThemaTypes.White,
          font: 'default',
        });
      });
    } else {
      setUserId(user._id);
      setThema(user.thema);
    }
  }, []);

  const onPressFloatingAction = () => {
    navigation.navigate('NotificationScreen', {
      itemId: null,
    });
  };

  const onPressMore = (params: IParamsMore) => {
    setSeletedMore(params);
    moreRef.current?.present();
  };

  const onPressSetting = () => {
    navigation.navigate('SettingScreen');
  };

  const headerActions = [{id: eSvg.setting, onPress: onPressSetting}];

  return (
    <NSafeAreaView className={`relative h-full ${bgColor(thema)}`}>
      <CommonHeader actions={headerActions} />
      <NotiTitle />
      {itemList.length > 0 ? (
        <NView className={`${bgColor(thema)} h-full pb-40`}>
          <FlatList
            style={{padding: 16}}
            data={itemList}
            keyExtractor={item => item._id}
            renderItem={({item}) => (
              <ItemView item={item} onPressMore={onPressMore} />
            )}
          />
        </NView>
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
