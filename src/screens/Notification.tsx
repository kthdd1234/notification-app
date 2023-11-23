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
import {eKoDays, eTimestampTypes} from '../types/enum';
import SelectButton from '../components/button/SelectButton';
import DefaultButton from '../components/button/DefaultButton';
import DisplayButton from '../components/button/DisplayButton';
import AddSection from '../components/section/AddSection';
import TextButton from '../components/button/TextButton';
import {
  days,
  formatString,
  imageUrl,
  timestampTypes,
  uid,
} from '../utils/constants';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import BottomSheetModalContainer from '../components/bottomsheet';
import CommonHeader from '../components/header/CommonHeader';
import moment from 'moment';
import CalendarSection from '../components/section/CalendarSection';
import TimeSection, {IParamsTime} from '../components/section/TimeSection';
import format from 'string-format';
import IconSection from '../components/section/IconSection';
import {useRealm} from '@realm/react';
import {
  cancelAllLocalNotifications,
  localNotification,
  localNotificationSchedule,
} from '../utils/push-notification';
import {setDateTime} from '../utils/moment';

const {Default, EveryWeek, EveryMonth} = eTimestampTypes;
const [_default, _everyWeek, _everyMonth] = [
  Default.toString(),
  EveryWeek.toString(),
  EveryMonth.toString(),
];

const NotificationScreen = ({navigation, route}) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** route.params */
  const {itemId} = route.params;

  /** init */
  const momentNow = moment(Date.now());
  const initDateState = momentNow.format('YYYY-MM-DD');
  const [initAmpm, initHour] = momentNow
    .add(1, 'hour')
    .format('A,h')
    .split(',');

  console.log(itemId);

  /** useState */
  const [icon, setIcon] = useState('bell');
  const [textState, setTextState] = useState('');
  const [triggerState, setTriggerState] = useState(_default);
  const [daysState, setDaysState] = useState([
    '',
    '월',
    '화',
    '수',
    '목',
    '금',
    '',
  ]);
  const [dateState, setDateState] = useState(initDateState);
  const [timeState, setTimeState] = useState({
    ampm: initAmpm,
    hour: initHour,
    minute: '00',
  });
  const [monthDayState, setMonthDayState] = useState(initDateState);

  /** useRef */
  const dateRef = useRef<BottomSheetModal>(null);
  const timeRef = useRef<BottomSheetModal>(null);
  const monthDayRef = useRef<BottomSheetModal>(null);

  /** useRealm */
  const realm = useRealm();

  /** useEffect */
  useEffect(() => {
    if (itemId !== null) {
      //
    }
  }, [itemId]);

  const onChangeText = (text: string) => {
    setTextState(text);
  };

  const onPressIcon = (newIcon: string) => {
    setIcon(newIcon);
  };

  const onPressTriggerButton = (id: string) => {
    setTriggerState(id);
  };

  const onPressDay = (day: string) => {
    daysState.includes(day)
      ? (daysState[eKoDays[day]] = '')
      : (daysState[eKoDays[day]] = day);

    setDaysState([...daysState]);
  };

  const onPressDateButton = () => {
    dateRef.current?.present();
  };

  const onPressDateDone = (value: string) => {
    setDateState(value);
    dateRef.current?.close();
  };

  const onPressTimeButton = () => {
    timeRef.current?.present();
  };

  const onPressTimeDone = ({ampm, hour, minute}: IParamsTime) => {
    timeRef.current?.close();
    setTimeState({ampm, hour, minute});
  };

  const onPressMonthDayButton = () => {
    monthDayRef.current?.present();
  };

  const onPressMonthDayDone = (dayString: string) => {
    setMonthDayState(dayString);
    monthDayRef.current?.close();
  };

  const onPressTest = async () => {
    localNotification({
      id: Date.now(),
      title: t('앱 이름'),
      message: textState,
      picture: imageUrl(icon),
    });

    cancelAllLocalNotifications();
  };

  const onPressDone = async () => {
    const {ampm, hour, minute} = timeState;
    const id = uid(0);
    const date = moment(dateState);
    const now = new Date(Date.now());
    const picture = imageUrl(icon);
    const notifications: {_id: string; dateTime: Date; interval?: number}[] =
      [];

    let dateTime = setDateTime({
      year: date.format('YYYY'),
      month: date.format('MM'),
      day: date.format('DD'),
      ampm,
      hour,
      minute,
    });

    // cancelAllLocalNotifications();

    if (triggerState === Default.toString()) {
      if (now.getTime() > dateTime.getTime()) {
        dateTime = moment(dateTime).add(1, 'd').toDate();
      }

      localNotificationSchedule({
        id: id,
        title: t('앱 이름'),
        message: textState,
        date: dateTime,
        repeatType: undefined,
        picture: picture,
      });

      notifications.push({_id: `${id}`, dateTime: dateTime});
    } else if (triggerState === EveryWeek.toString()) {
      const dateList = daysState
        .filter(state => !!state)
        .map(state => moment(dateTime).day(eKoDays[state]).toDate());

      dateList.forEach((newDate, key) => {
        const eId = uid(key);

        localNotificationSchedule({
          id: eId,
          title: t('앱 이름'),
          message: textState,
          date: newDate,
          repeatType: 'week',
          picture: picture,
        });

        notifications.push({_id: `${eId}`, dateTime: newDate});
      });
    } else if (triggerState === EveryMonth.toString()) {
      const day = monthDayState.split('-')[2];
      dateTime.setDate(Number(day));

      localNotificationSchedule({
        id: id,
        title: t('앱 이름'),
        message: textState,
        date: dateTime,
        repeatType: 'month',
        picture: picture,
      });

      notifications.push({_id: `${id}`, dateTime: dateTime});
    }

    realm.write(() => {
      realm.create('Item', {
        _id: `${uid(0)}`,
        icon: icon,
        body: textState,
        type: 'timestamp',
        state: triggerState,
        notifications: notifications,
        isChecked: false,
      });
    });

    navigation.pop();
  };

  const isTextState = textState !== '';
  const isEveryWeeks =
    EveryWeek.toString() === triggerState
      ? daysState.filter(state => !!state).length !== 0
      : true;
  const isEnabledDone = isTextState && isEveryWeeks;
  const handlerDone = isEnabledDone ? onPressDone : () => null;

  return (
    <NSafeAreaView className="relative h-full bg-white">
      <CommonHeader isBack={true} title={itemId ? '알림 수정' : '알림 추가'} />
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
              autoFocus={true}
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
              {timestampTypes.map(info => (
                <SelectButton
                  key={info.id}
                  numberType="odd"
                  id={info.id.toString()}
                  name={info.name}
                  rounded="rounded-md"
                  selectedId={triggerState}
                  isGap={info.isGap}
                  padding="p-4"
                  onPress={onPressTriggerButton}
                />
              ))}
            </NView>
          }
        />
        {triggerState === Default.toString() && (
          <AddSection
            title="날짜"
            component={
              <DisplayButton
                text={moment(dateState).format(t(formatString.date))}
                onPress={onPressDateButton}
              />
            }
          />
        )}

        {triggerState === EveryWeek.toString() && (
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
                    selectedId={daysState[idx]}
                    isGap={idx !== 0 && idx % 2 !== 0}
                    padding="p-4"
                    onPress={onPressDay}
                  />
                ))}
              </NView>
            }
          />
        )}
        {triggerState === EveryMonth.toString() && (
          <AddSection
            title="일"
            component={
              <DisplayButton
                text={`${t('매달')} ${monthDayState.split('-')[2]}${t('일')}`}
                onPress={onPressMonthDayButton}
              />
            }
          />
        )}
        <AddSection
          title="시각"
          component={
            <DisplayButton
              text={format(
                t(`${timeState.ampm} {}시 {}분`),
                timeState.hour,
                timeState.minute,
              )}
              onPress={onPressTimeButton}
            />
          }
        />
      </NScrollView>
      <NView className="sticky bottom-0 p-4">
        <TextButton
          viewClassName="flex-row justify-center items-center h-7 mb-4"
          textClassName="text-blue-500 text-base"
          text="알림 미리보기"
          onPress={onPressTest}
        />
        <DefaultButton
          name={itemId ? '수정' : '추가'}
          isEnabled={isEnabledDone}
          height={60}
          onPress={handlerDone}
        />
      </NView>

      <BottomSheetModalContainer
        title="날짜 선택"
        bottomSheetModalRef={dateRef}
        snapPoint={60}
        component={
          <CalendarSection initialDate={dateState} onPress={onPressDateDone} />
        }
      />
      <BottomSheetModalContainer
        title="매달 반복일"
        bottomSheetModalRef={monthDayRef}
        snapPoint={60}
        component={
          <CalendarSection
            initialDate={monthDayState}
            onPress={onPressMonthDayDone}
          />
        }
      />
      <BottomSheetModalContainer
        title="시간 설정"
        bottomSheetModalRef={timeRef}
        snapPoint={53}
        component={
          <TimeSection timeInfo={timeState} onPress={onPressTimeDone} />
        }
      />
    </NSafeAreaView>
  );
};

export default NotificationScreen;
// let trigger: TimestampTrigger | IntervalTrigger;
//else {
// now.setDate(intervalState);
// now.setHours(intervalState);
// now.setMinutes(15);
// console.log('repeatType', repeatType);
// console.log('intervalState', intervalState);
// console.log('now.getMinutes', now.getMinutes());
// localNotificationSchedule({
//   id: id,
//   title: t('앱 이름'),
//   message: textState,
//   date: now,
//   repeatType: repeatType,
//   picture: picture,
// });
// notifications.push({
//   _id: `${id}`,
//   dateTime: new Date(Date.now()),
//   interval: intervalState,
// });
// }
