/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {NSafeAreaView, NView} from '../components/styled';
import {useTranslation} from 'react-i18next';
import {eLanguageTypes, eThemaTypes} from '../types/enum';
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
// import CalendarSection from '../components/section/CalendarSection';
import uuid from 'react-native-uuid';
import {FlatList} from 'react-native';
import ItemView from '../components/view/ItemView';
import {IParamsMore} from '../types/interface';
import {bannerId, bgColor, calendarLocales} from '../utils/constants';
import moment from 'moment';
import {LocaleConfig} from 'react-native-calendars';
import {getScheduledLocalNotifications} from '../utils/push-notification';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';

const {ko, en} = eLanguageTypes;

const HomeScreen = ({navigation}) => {
  /** useTranslation */
  const {t, i18n} = useTranslation();

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

  useEffect(() => {
    const user = userList[0];

    const setLocale = (lang: string) => {
      const {
        monthNames,
        monthNamesShort,
        dayNames,
        dayNamesShort,
        today,
        meridiem,
      } = calendarLocales[lang];

      LocaleConfig.locales[lang] = {
        monthNames: monthNames,
        monthNamesShort: monthNamesShort,
        dayNames: dayNames,
        dayNamesShort: dayNamesShort,
        today: today,
      };
      LocaleConfig.defaultLocale = lang;

      try {
        moment.locale(lang, {
          months: monthNames,
          monthsShort: monthNamesShort,
          monthsParseExact: true,
          weekdays: dayNames,
          weekdaysShort: dayNamesShort,
          weekdaysMin: dayNamesShort,
          weekdaysParseExact: true,
          meridiem: meridiem,
        });
      } catch (error) {
        console.log('moment.locale =>', error);
      }
    };

    if (user === undefined) {
      const userId = uuid.v4().toString();

      realm.write(() => {
        realm.create('User', {
          _id: userId,
          language: languageCode === ko ? ko : en,
          thema: eThemaTypes.White,
          font: 'default',
        });
      });

      setUserId(userId);
      setLocale(languageCode);
    } else {
      setUserId(user._id);
      setThema(user.thema);

      i18n.changeLanguage(user.language);
      setLocale(user.language);
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

  getScheduledLocalNotifications().then(res => console.log(res));

  return (
    <NSafeAreaView
      className={`relative h-full flex-col justify-between ${bgColor(thema)}`}>
      <NotiTitle />

      {itemList.length > 0 ? (
        <FlatList
          style={{padding: 16}}
          data={itemList}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <ItemView item={item} onPressMore={onPressMore} />
          )}
        />
      ) : (
        <EmptySection />
      )}

      <NView className="sticky bottom-0">
        <NView>
          <FAB
            placement="right"
            icon={{name: 'add', color: 'white'}}
            buttonStyle={{backgroundColor: '#4F95F1'}}
            titleStyle={{fontWeight: 'bold'}}
            title={t('알림 추가')}
            size="large"
            onPress={onPressFloatingAction}
          />
        </NView>
        <NView>
          <BannerAd
            unitId={bannerId}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          />
        </NView>
      </NView>

      <BottomSheetModalContainer
        title={selectedMore.name}
        bottomSheetModalRef={moreRef}
        component={
          <MoreSection itemId={selectedMore.itemId} moreRef={moreRef} />
        }
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
{
  /* <BottomSheetModalContainer
        title="캘린더"
        bottomSheetModalRef={calendarRef}
        component={<CalendarSection />}
      /> */
}
