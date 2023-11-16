/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {NScrollView, NTextInput, NView} from '../components/styled';
import {useTranslation} from 'react-i18next';
import {useEffect, useRef, useState} from 'react';
import {
  eDays,
  eIntervalTypes,
  eNotificationTypes,
  eSvg,
  eTimestampTypes,
} from '../types/enum';
import SelectButton from '../components/button/SelectButton';
import UploadButton from '../components/button/UploadButton';
import DefaultButton from '../components/button/DefaultButton';
import DisplayButton from '../components/button/DisplayButton';
import AddSection from '../components/section/AddSection';
import TextButton from '../components/button/TextButton';
import {
  days,
  intervalTypes,
  timestampTypes,
  imageLibraryOptions,
  cameraOptions,
  mediaErrorCode,
} from '../utils/constants';
import {
  launchImageLibrary,
  launchCamera,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import BottomSheetModalContainer from '../components/bottomsheet';
import SvgTextButton from '../components/button/SvgTextButton';
import CameraSvg from '../../assets/svgs/mobile-phone-camera.svg';
import GallerySvg from '../../assets/svgs/gallery.svg';
import {Linking} from 'react-native';
import Snackbar from 'react-native-snackbar';
import ImageButton from '../components/button/ImageButton';
import SvgButton from '../components/button/SvgButton';
import VideoSection from '../components/section/VideoSection';

const {Timestamp, Interval} = eNotificationTypes;
const {Default, EveryDay, EveryWeek} = eTimestampTypes;
const {Day} = eIntervalTypes;

const Notification = ({navigation, route}) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** route.params */
  const {notificationType} = route.params;

  /** init */
  const initTypeId = {
    [Timestamp]: Default.toString(),
    [Interval]: Day.toString(),
  }[notificationType];
  const initTypeList = {[Timestamp]: timestampTypes, [Interval]: intervalTypes}[
    notificationType
  ];

  /** useState */
  const [isMediaLoading, setIsMediaLoading] = useState(false);
  const [media, setMedia] = useState({uri: '', type: ''});
  const [textState, setTextState] = useState('');
  const [seletedTypeId, setSeletedTypeId] = useState(initTypeId);
  const [selectedDays, setSeletedDays] = useState(['', '', '', '', '', '', '']);

  /** ref */
  const ref = useRef<BottomSheetModal>(null);

  useEffect(() => {
    const format = {[Timestamp]: '알림', [Interval]: '간격 알림'};
    navigation.setOptions({title: t(format[notificationType])});
  }, []);

  const onChangeText = (text: string) => {
    setTextState(text);
  };

  const onPressUploadButton = async () => {
    ref.current?.present();
  };

  const onPressNotificationType = (id: string) => {
    setSeletedTypeId(id);
  };

  const onPressDay = (day: string) => {
    selectedDays.includes(day)
      ? (selectedDays[eDays[day]] = '')
      : (selectedDays[eDays[day]] = day);

    setSeletedDays([...selectedDays]);
  };

  const onPressNotificationTest = () => {
    //
  };

  const onPressCompleted = () => {
    //
  };

  const onLaunchMediaResponce = ({errorCode, assets}: ImagePickerResponse) => {
    if (errorCode) {
      const errMsg = t(mediaErrorCode[errorCode]);

      Snackbar.show({
        text: errMsg,
        duration: Snackbar.LENGTH_LONG,
        action: {text: t('이동'), onPress: () => Linking.openSettings()},
      });
    } else {
      if (assets) {
        const asset = assets![0];
        const uri = asset.uri || '';
        const type = asset.type ? asset.type!.split('/')[0] : '';

        console.log('uri', uri);

        setMedia({uri, type});
      }
    }

    console.log('assets:', assets);
  };

  const onPressAddMedia = async (type: 'Gallery' | 'Camera') => {
    const mediaInfo = {
      Gallery: {
        launch: launchImageLibrary,
        options: imageLibraryOptions,
        callback: onLaunchMediaResponce,
      },
      Camera: {
        launch: launchCamera,
        options: cameraOptions,
        callback: onLaunchMediaResponce,
      },
    };
    const mediaData = mediaInfo[type];

    ref.current?.close();

    setIsMediaLoading(true);
    await mediaData.launch(mediaData.options, mediaData.callback);
    setIsMediaLoading(false);
  };

  const onPressImage = () => {
    //
  };

  const onPressDelete = () => {
    setMedia({type: '', uri: ''});
    setIsMediaLoading(false);
  };

  return (
    <NView className="relative h-full bg-white">
      <NScrollView className="p-4">
        <AddSection
          component={
            media.uri ? (
              <NView>
                <SvgButton
                  containerClassName="py-2 pl-2 items-end"
                  svg={eSvg.delete}
                  onPress={onPressDelete}
                  size={20}
                />
                {media.type === 'image' ? (
                  <ImageButton
                    imageClassName="w-full rounded-lg h-80"
                    uri={media.uri}
                    onPress={onPressImage}
                  />
                ) : (
                  <VideoSection uri={media.uri} />
                )}
              </NView>
            ) : (
              <UploadButton
                isMediaLoading={isMediaLoading}
                onPress={onPressUploadButton}
              />
            )
          }
        />
        <AddSection
          title="내용"
          component={
            <NTextInput
              className={`h-16 px-5 font-semibold py-3 text-lg leading-[0px] border-2 ${
                textState !== '' ? 'border-blue-400' : 'border-gray-200'
              } rounded-xl`}
              placeholder={t('ex. 할 일, 약속, 스케줄 등')}
              value={textState}
              onChangeText={onChangeText}
            />
          }
        />
        <AddSection
          title="유형"
          component={
            <NView className="flex-row justify-between">
              {initTypeList.map(info => (
                <SelectButton
                  key={info.id}
                  type={notificationType}
                  id={info.id.toString()}
                  name={info.name}
                  roundedType="md"
                  selectedId={seletedTypeId}
                  isGap={info.isGap}
                  onPress={onPressNotificationType}
                />
              ))}
            </NView>
          }
        />
        {seletedTypeId === Default.toString() && (
          <AddSection
            title="날짜"
            component={<DisplayButton text="2023년 11월 13일 (월)" />}
          />
        )}
        {notificationType === Interval.toString() && (
          <AddSection
            title="간격"
            component={<DisplayButton text="지금부터 1일마다" />}
          />
        )}
        {seletedTypeId === EveryWeek.toString() && (
          <AddSection
            title="요일"
            component={
              <NView className="flex-row justify-between">
                {days.map((objKey, idx) => (
                  <SelectButton
                    key={objKey}
                    id={objKey}
                    type={notificationType}
                    name={t(objKey)}
                    roundedType="full"
                    selectedId={selectedDays[idx]}
                    isGap={idx !== 0 && idx % 2 !== 0}
                    onPress={onPressDay}
                  />
                ))}
              </NView>
            }
          />
        )}
        {[Default, EveryDay, EveryWeek, Day]
          .map(arg => arg.toString())
          .includes(seletedTypeId) && (
          <AddSection
            title="시각"
            component={<DisplayButton text="오전 8시 30분" />}
          />
        )}
        <NView className="h-12" />
      </NScrollView>
      <NView className="fixed bottom-0 p-4">
        <TextButton
          viewClassName="flex-row justify-center items-center h-7 mb-4"
          textClassName="text-blue-500 text-base"
          text="알림 테스트"
          onPress={onPressNotificationTest}
        />
        <DefaultButton
          name="완료"
          isEnabled={true}
          onPress={onPressCompleted}
        />
      </NView>
      <BottomSheetModalContainer
        bottomSheetModalRef={ref}
        snapPoint={20}
        component={
          <NView className="flex-row items-center justify-center h-full">
            <SvgTextButton
              text="사진 갤러리"
              svg={<GallerySvg width={30} height={30} />}
              onPress={() => onPressAddMedia('Gallery')}
            />
            <NView className="w-2" />
            <SvgTextButton
              text="카메라 촬영"
              svg={<CameraSvg width={30} height={30} />}
              onPress={() => onPressAddMedia('Camera')}
            />
          </NView>
        }
      />
    </NView>
  );
};

export default Notification;
