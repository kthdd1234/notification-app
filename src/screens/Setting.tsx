import React, {useRef} from 'react';
import {NSafeAreaView, NView} from '../components/styled';
import CommonHeader from '../components/header/CommonHeader';
import LanguageSvg from '../../assets/svgs/language.svg';
import ResetSvg from '../../assets/svgs/reset.svg';
import ReviewSvg from '../../assets/svgs/review.svg';
import ShareSvg from '../../assets/svgs/share.svg';
import PrivateSvg from '../../assets/svgs/private.svg';
import VersionSvg from '../../assets/svgs/version.svg';
import DarkSvg from '../../assets/svgs/dark.svg';
import FontSvg from '../../assets/svgs/font.svg';
import {eLanguageTypes, eSettingTypes, eThemaTypes} from '../types/enum';
import SvgBlockButton from '../components/button/SvgBlockButton';
import Tag from '../components/tag';
import BottomSheetModalContainer from '../components/bottomsheet';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import SelectedSection from '../components/section/SelectedSection';
import {useObject, useQuery, useRealm} from '@realm/react';
import {User} from '../schema/User';
import {useTranslation} from 'react-i18next';
import {
  anColor,
  anDetails,
  bgColor,
  calendarLocales,
  langs,
  themas,
} from '../utils/constants';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Dialog,
  Toast,
} from 'react-native-alert-notification';
import {cancelAllLocalNotifications} from '../utils/push-notification';
import {Item} from '../schema/Item';
import {useRecoilState, useRecoilValue} from 'recoil';
import {themaAtom, userIdAtom} from '../states';
// import Share from 'react-native-share';
// import * as StoreReview from 'react-native-store-review';
import {Linking} from 'react-native';
import moment from 'moment';
import {LocaleConfig} from 'react-native-calendars';

const {Language, Thema, Font, Reset, Review, ShareLink, Private, Version} =
  eSettingTypes;
const {ko} = eLanguageTypes;
const {White} = eThemaTypes;

const size = 30;
const props = {width: size, height: size};

const SettingScreen = () => {
  /** useTranslation */
  const {t, i18n} = useTranslation();

  /** useRecoil */
  const userId = useRecoilValue(userIdAtom);
  const [thema, setThema] = useRecoilState(themaAtom);

  /** realm */
  const realm = useRealm();
  const itemList = useQuery(Item);
  const userObject = useObject(User, userId);

  /** useRef */
  const langRef = useRef<BottomSheetModal>(null);
  const themaRef = useRef<BottomSheetModal>(null);

  const onPressLangModal = (isOpen: boolean) => {
    isOpen ? langRef.current?.present() : langRef.current?.close();
  };

  const onPressLangItem = (lang: string) => {
    realm.write(() => (userObject!.language = lang));

    i18n.changeLanguage(lang);
    moment.locale(lang);

    const {monthNames, monthNamesShort, dayNames, dayNamesShort, today} =
      calendarLocales[lang];

    LocaleConfig.locales[lang] = {
      monthNames: monthNames,
      monthNamesShort: monthNamesShort,
      dayNames: dayNames,
      dayNamesShort: dayNamesShort,
      today: today,
    };

    LocaleConfig.defaultLocale = lang;

    langRef.current?.close();
  };

  const onPressThemaModal = (isOpen: boolean) => {
    isOpen ? themaRef.current?.present() : themaRef.current?.close();
  };

  const onPressThemaItem = (themaItem: string) => {
    realm.write(() => (userObject!.thema = themaItem));

    setThema(themaItem);
    themaRef.current?.close();
  };

  const onPressFontModal = (isOpen: boolean) => {
    Toast.show({
      type: ALERT_TYPE.WARNING,
      title: t('기능 준비 중'),
      textBody: t('현재 준비 중인 기능입니다. 🙌'),
    });
  };

  // const onPressFontItem = (fontItem: string) => {
  //   //
  // };

  const onPressReset = () => {
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: t('알림을 초기화 하시겠습니까?'),
      textBody: t('저장된 데이터와 예정된 알림이 전부 삭제됩니다.'),
      button: t('초기화'),
      onPressButton: () => {
        cancelAllLocalNotifications();
        realm.write(() => realm.delete(itemList));

        Dialog.hide();
      },
    });
  };

  const onPressReview = () => {
    // try {
    //   const APP_STORE_LINK = `itms-apps://apps.apple.com/app/id${1}?action=write-review`;
    //   const PLAY_STORE_LINK = `market://details?id=${'1'}`;
    //   const STORE_LINK = Platform.select({
    //     ios: APP_STORE_LINK,
    //     android: PLAY_STORE_LINK,
    //   });
    //   Linking.openURL(STORE_LINK || '');
    // } catch (error) {
    //   Toast.show({
    //     type: ALERT_TYPE.DANGER,
    //     title: t('에러 발생'),
    //     textBody: t('알 수 없는 에러가 발생하였습니다.'),
    //   });
    // }
    Toast.show({
      type: ALERT_TYPE.WARNING,
      title: t('기능 준비 중'),
      textBody: t('현재 준비 중인 기능입니다. 🙌'),
    });
  };

  const onPressShareLink = async () => {
    // try {
    //   const responce = await Share.open({url: 'https://www.naver.com/'});

    //   if (responce.success) {
    //     Toast.show({
    //       type: ALERT_TYPE.SUCCESS,
    //       title: t('공유 완료'),
    //       textBody: '앱 링크 공유를 하였습니다.',
    //     });
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    Toast.show({
      type: ALERT_TYPE.WARNING,
      title: t('기능 준비 중'),
      textBody: t('현재 준비 중인 기능입니다. 🙌'),
    });
  };

  const onPressPrivate = () => {
    const privacyPolicyUrl =
      'https://www.notion.so/a82c816fe22e49768b6be153bd6da21d';
    Linking.openURL(privacyPolicyUrl);
  };

  const onPressVersion = () => {
    //
  };

  const settingInfo = [
    {
      id: Language,
      name: '언어 변경',
      svg: <LanguageSvg {...props} />,
      tag: (
        <Tag
          color="red"
          text={t(userObject!.language === ko ? '한국어' : 'English')}
          onPress={() => onPressLangModal(true)}
        />
      ),
      onPress: () => onPressLangModal(true),
    },
    {
      id: Thema,
      name: '테마 변경',
      svg: <DarkSvg {...props} />,
      tag: (
        <Tag
          color="purple"
          text={t(userObject!.thema === White ? '밝은 테마' : '어두운 테마')}
          onPress={() => onPressThemaModal(true)}
        />
      ),
      onPress: () => onPressThemaModal(true),
    },
    {
      id: Font,
      name: '글꼴 변경',
      svg: <FontSvg {...props} />,
      tag: (
        <Tag
          color="amber"
          text={t('기본 서체')}
          onPress={() => onPressFontModal(true)}
        />
      ),
      onPress: () => onPressFontModal(true),
    },
    {
      id: Reset,
      name: '알림 초기화',
      svg: <ResetSvg {...props} />,
      onPress: onPressReset,
    },
    // {
    //   id: Review,
    //   name: '앱 리뷰',
    //   svg: <ReviewSvg {...props} />,
    //   onPress: onPressReview,
    // },
    // {
    //   id: ShareLink,
    //   name: '앱 공유',
    //   svg: <ShareSvg {...props} />,
    //   onPress: onPressShareLink,
    // },
    {
      id: Private,
      name: '개인정보처리방침',
      svg: <PrivateSvg {...props} onPress={onPressPrivate} />,
      onPress: onPressPrivate,
    },
    {
      id: Version,
      name: '버전',
      svg: <VersionSvg {...props} />,
      tag: <Tag color="yellow" text="1.1.0" />,
      onPress: onPressVersion,
    },
  ];

  return (
    <AlertNotificationRoot theme={anColor(thema)} colors={anDetails}>
      <NSafeAreaView className={`relative h-full ${bgColor(thema)}`}>
        <CommonHeader isBack={false} title="설정" />
        <NView className="p-4">
          {settingInfo.map(({id, svg, name, tag, onPress}) => (
            <SvgBlockButton
              key={id}
              id={id}
              svg={svg}
              name={name}
              svgBgColor=""
              tag={tag}
              onPress={onPress}
            />
          ))}
        </NView>
        <BottomSheetModalContainer
          title="언어 변경"
          bottomSheetModalRef={langRef}
          component={
            <SelectedSection
              list={langs}
              selectedItem={userObject!.language}
              onPressItem={onPressLangItem}
              onPressClose={onPressLangModal}
            />
          }
        />
        <BottomSheetModalContainer
          title="테마 변경"
          bottomSheetModalRef={themaRef}
          component={
            <SelectedSection
              list={themas}
              selectedItem={thema}
              onPressItem={onPressThemaItem}
              onPressClose={onPressThemaModal}
            />
          }
        />
      </NSafeAreaView>
    </AlertNotificationRoot>
  );
};

export default SettingScreen;
/**
 * - 언어
 * - 초기화
 * - 앱 리뷰
 * - 앱 공유
 * - 개인정보처리방침
 * - 앱 버전
 *
 * language.svg
 * reset.svg
 * review.svg
 * share.svg
 * private.svg
 * version.svg
 */
