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
import {eLanguageTypes, eSettingTypes, eThemaTypes} from '../types/enum';
import SvgBlockButton from '../components/button/SvgBlockButton';
import Tag from '../components/tag';
import BottomSheetModalContainer from '../components/bottomsheet';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import SelectedSection from '../components/section/SelectedSection';
import {useQuery, useRealm} from '@realm/react';
import {User} from '../schema/User';
import {useTranslation} from 'react-i18next';
import {langs, themas} from '../utils/constants';

const {Language, Thema, Reset, Review, Share, Private, Version} = eSettingTypes;
const {ko} = eLanguageTypes;
const {White, Dark} = eThemaTypes;

const size = 30;
const props = {width: size, height: size};

const SettingScreen = () => {
  /** useTranslation */
  const {t, i18n} = useTranslation();

  /** realm */
  const realm = useRealm();
  const user = useQuery(User)[0] || {language: '', thema: ''};

  /** useRef */
  const langRef = useRef<BottomSheetModal>(null);
  const themaRef = useRef<BottomSheetModal>(null);

  console.log(user);

  const onPressLangModal = (isOpen: boolean) => {
    isOpen ? langRef.current?.present() : langRef.current?.close();
  };

  const onPressLangItem = (lang: string) => {
    realm.write(() => (user.language = lang));

    i18n.changeLanguage(lang);
    langRef.current?.close();
  };

  const onPressThemaModal = (isOpen: boolean) => {
    isOpen ? themaRef.current?.present() : themaRef.current?.close();
  };

  const onPressThemaItem = (thema: string) => {
    realm.write(() => (user.thema = thema));

    //
    themaRef.current?.close();
  };

  const onPressReset = () => {
    //
  };

  const onPressReview = () => {
    //
  };

  const onPressShare = () => {
    //
  };

  const onPressPrivate = () => {
    //
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
          text={t(user.language === ko ? '한국어' : 'English')}
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
          text={t(user.thema === White ? '밝은 테마' : '어두운 테마')}
          onPress={() => onPressThemaModal(true)}
        />
      ),
      onPress: () => onPressThemaModal(true),
    },
    {
      id: Reset,
      name: '전체 초기화',
      svg: <ResetSvg {...props} />,
      onPress: onPressReset,
    },
    {
      id: Review,
      name: '앱 리뷰',
      svg: <ReviewSvg {...props} />,
      onPress: onPressReview,
    },
    {
      id: Share,
      name: '앱 공유',
      svg: <ShareSvg {...props} />,
      onPress: onPressShare,
    },
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
    <NSafeAreaView className="relative h-full bg-[#F9F9FC]">
      <CommonHeader isBack={true} title="설정" />
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
            selectedItem={user.language}
            onPressItem={onPressLangItem}
            onPressClose={onPressLangModal}
          />
        }
        isDetached={true}
        snapPoint={30}
      />
      <BottomSheetModalContainer
        title="테마 변경"
        bottomSheetModalRef={themaRef}
        component={
          <SelectedSection
            list={themas}
            selectedItem={user.thema}
            onPressItem={onPressThemaItem}
            onPressClose={onPressThemaModal}
          />
        }
        isDetached={true}
        snapPoint={30}
      />
    </NSafeAreaView>
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
