/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {
  NSafeAreaView,
  NScrollView,
  NTextInput,
  NView,
} from '../components/styled';
import {useTranslation} from 'react-i18next';
import {useRef, useState} from 'react';
import {
  eKoDays,
  eIntervalTypes,
  eNotificationTypes,
  eTimestampTypes,
} from '../types/enum';
import SelectButton from '../components/button/SelectButton';
import DefaultButton from '../components/button/DefaultButton';
import DisplayButton from '../components/button/DisplayButton';
import AddSection from '../components/section/AddSection';
import TextButton from '../components/button/TextButton';
import {days, intervalTypes, timestampTypes} from '../utils/constants';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import BottomSheetModalContainer from '../components/bottomsheet';
import CommonHeader from '../components/header/CommonHeader';
import moment from 'moment';
import CalendarSection from '../components/section/CalendarSection';
import TimeSection, {IParamsTime} from '../components/section/TimeSection';
import format from 'string-format';
import {displayNotification} from '../utils/notifiee';
import IconSection from '../components/section/IconSection';
import ImageList from '../../assets/images';

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
  const initHeaderTitle = {[Timestamp]: '알림', [Interval]: '간격 알림'}[
    notificationType
  ];
  const numberType = {[Timestamp]: 'odd', [Interval]: 'even'}[notificationType];

  /** useState */
  const [icon, setIcon] = useState(0);
  const [textState, setTextState] = useState('');
  const [seletedTypeId, setSeletedTypeId] = useState(initTypeId);
  const [selectedDays, setSeletedDays] = useState(['', '', '', '', '', '', '']);
  const [selectedDateString, setSelectedDateString] = useState('');
  const [selectedTimeInfo, setSelectedTimeInfo] = useState({
    ampm: '',
    hour: '',
    minute: '',
  });

  /** useRef */
  const dateRef = useRef<BottomSheetModal>(null);
  const timeRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    const nowDateString = moment(Date.now()).format('YYYY-MM-DD');
    const [ampm, hour] = moment(Date.now())
      .add(1, 'hour')
      .format('A,h')
      .split(',');
    const initAmpm = {AM: '오전', PM: '오후'}[ampm]!;

    setSelectedDateString(nowDateString);
    setSelectedTimeInfo({ampm: initAmpm, hour: `${hour}`, minute: '00'});
  }, []);

  const onChangeText = (text: string) => {
    setTextState(text);
  };

  const onPressNotificationType = (id: string) => {
    setSeletedTypeId(id);
  };

  const onPressDay = (day: string) => {
    selectedDays.includes(day)
      ? (selectedDays[eKoDays[day]] = '')
      : (selectedDays[eKoDays[day]] = day);

    setSeletedDays([...selectedDays]);
  };

  const onPressDateButton = () => {
    dateRef.current?.present();
  };

  const onPressSeletedDateButton = (value: string) => {
    setSelectedDateString(value);
    dateRef.current?.close();
  };

  const onPressTimeButton = () => {
    timeRef.current?.present();
  };

  const onPressIcon = (newIcon: number) => {
    setIcon(newIcon);
  };

  const onPressIntervalButton = () => {
    //
  };

  const onPressNotificationTest = async () => {
    displayNotification({
      title: t('앱 이름'),
      body: textState,
      url: ImageList[icon].url,
    });
  };

  const onPressTimeCompleted = ({ampm, hour, minute}: IParamsTime) => {
    timeRef.current?.close();
    setSelectedTimeInfo({ampm, hour, minute});
  };

  const onPressNotificationCompleted = () => {
    //
  };

  return (
    <NSafeAreaView className="relative h-full bg-white">
      <CommonHeader isBack={true} title={initHeaderTitle} />
      <NScrollView className="p-4 bg-white">
        <AddSection
          title="아이콘"
          isNotMb={true}
          component={
            <IconSection selectedIcon={icon} onPressIcon={onPressIcon} />
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
                  numberType={numberType}
                  id={info.id.toString()}
                  name={info.name}
                  rounded="rounded-md"
                  selectedId={seletedTypeId}
                  isGap={info.isGap}
                  padding="p-4"
                  onPress={onPressNotificationType}
                />
              ))}
            </NView>
          }
        />
        {seletedTypeId === Default.toString() && (
          <AddSection
            title="날짜"
            component={
              <DisplayButton
                text={moment(selectedDateString).format(
                  t('YYYY년 MM월 Do일 (dd)'),
                )}
                onPress={onPressDateButton}
              />
            }
          />
        )}
        {notificationType === Interval.toString() && (
          <AddSection
            title="간격"
            component={
              <DisplayButton
                text="지금부터 1일마다"
                onPress={onPressIntervalButton}
              />
            }
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
                    numberType="odd"
                    name={t(objKey)}
                    rounded="rounded-full"
                    selectedId={selectedDays[idx]}
                    isGap={idx !== 0 && idx % 2 !== 0}
                    padding="p-4"
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
            component={
              <DisplayButton
                text={format(
                  t(`${selectedTimeInfo.ampm} {}시 {}분`),
                  selectedTimeInfo.hour,
                  selectedTimeInfo.minute,
                )}
                onPress={onPressTimeButton}
              />
            }
          />
        )}
      </NScrollView>
      <NView className="sticky bottom-0 p-4">
        <TextButton
          viewClassName="flex-row justify-center items-center h-7 mb-4"
          textClassName="text-blue-500 text-base"
          text="알림 테스트"
          onPress={onPressNotificationTest}
        />
        <DefaultButton
          name="완료"
          isEnabled={true}
          height={60}
          onPress={onPressNotificationCompleted}
        />
      </NView>

      <BottomSheetModalContainer
        title="날짜 선택"
        bottomSheetModalRef={dateRef}
        snapPoint={60}
        component={
          <CalendarSection
            initialDate={selectedDateString}
            onPress={onPressSeletedDateButton}
          />
        }
      />
      <BottomSheetModalContainer
        title="시간 설정"
        bottomSheetModalRef={timeRef}
        snapPoint={53}
        component={
          <TimeSection
            timeInfo={selectedTimeInfo}
            onPress={onPressTimeCompleted}
          />
        }
      />
    </NSafeAreaView>
  );
};

export default Notification;
