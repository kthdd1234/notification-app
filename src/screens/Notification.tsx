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
  eTriggerTypes,
  eTimestampTypes,
} from '../types/enum';
import SelectButton from '../components/button/SelectButton';
import DefaultButton from '../components/button/DefaultButton';
import DisplayButton from '../components/button/DisplayButton';
import AddSection from '../components/section/AddSection';
import TextButton from '../components/button/TextButton';
import {days, intervalTypes, timestampTypes, uid} from '../utils/constants';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import BottomSheetModalContainer from '../components/bottomsheet';
import CommonHeader from '../components/header/CommonHeader';
import moment from 'moment';
import CalendarSection from '../components/section/CalendarSection';
import TimeSection, {IParamsTime} from '../components/section/TimeSection';
import format from 'string-format';
import {displayNotification, setTriggerNotification} from '../utils/notifiee';
import IconSection from '../components/section/IconSection';
import ImageList from '../../assets/images';
import IntervalSection, {nameInfo} from '../components/section/IntervalSection';
import {useQuery, useRealm} from '@realm/react';
import {Notification} from '../schema/Notification';
import {
  TimestampTrigger,
  IntervalTrigger,
  TriggerType,
  RepeatFrequency,
  TimeUnit,
} from '@notifee/react-native';
import {dateTimeFormatter} from '../utils/moment';
import {languageCode} from '../utils/i18n/i18n.config';

const {Timestamp, Interval} = eTriggerTypes;
const {Default, EveryDay, EveryWeek} = eTimestampTypes;
const {Day, Hour, Minute, Second} = eIntervalTypes;

const NotificationScreen = ({navigation, route}) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** route.params */
  const {triggerType} = route.params;

  /** init */
  const initTriggerState = {
    [Timestamp]: Default.toString(),
    [Interval]: Day.toString(),
  }[triggerType];
  const initTriggerType = {
    [Timestamp]: timestampTypes,
    [Interval]: intervalTypes,
  }[triggerType];
  const initHeaderTitle = {[Timestamp]: '알림', [Interval]: '간격 알림'}[
    triggerType
  ];
  const numberType = {[Timestamp]: 'odd', [Interval]: 'even'}[triggerType];

  /** useState */
  const [icon, setIcon] = useState(0);
  const [textState, setTextState] = useState('');
  const [triggerState, setTriggerState] = useState(initTriggerState);
  const [daysState, setDaysState] = useState(['', '', '', '', '', '', '']);
  const [dateState, setDateState] = useState('');
  const [timeState, setTimeState] = useState({
    ampm: '',
    hour: '',
    minute: '',
  });
  const [intervalState, setIntervalState] = useState(1);

  /** useRef */
  const dateRef = useRef<BottomSheetModal>(null);
  const timeRef = useRef<BottomSheetModal>(null);
  const intervalRef = useRef<BottomSheetModal>(null);

  /** useRealm */
  const realm = useRealm();
  const notificationRealm = useQuery(Notification);

  useEffect(() => {
    const nowDateString = moment(Date.now()).format('YYYY-MM-DD');
    const [ampm, hour] = moment(Date.now())
      .add(1, 'hour')
      .format('A,h')
      .split(',');
    const initAmpm = {AM: '오전', PM: '오후'}[ampm]!;

    setDateState(nowDateString);
    setTimeState({ampm: initAmpm, hour: `${hour}`, minute: '00'});
  }, []);

  const onChangeText = (text: string) => {
    setTextState(text);
  };

  const onPressIcon = (newIcon: number) => {
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

  const onPressIntervalButton = () => {
    intervalRef.current?.present();
  };

  const onPressIntervalDone = (newValue: number) => {
    intervalRef.current?.close();
    setIntervalState(newValue);
  };

  const onPressTest = async () => {
    displayNotification({
      title: t('앱 이름'),
      body: textState,
      url: ImageList[icon].url,
    });
  };

  const onPressDone = async () => {
    const now = new Date(Date.now());

    let notifiIds: {
      id: string;
      dateTime: Date;
      type: string;
      interval?: number;
    }[] = [];
    let trigger: TimestampTrigger | IntervalTrigger;

    const {ampm, hour, minute} = timeState;
    const momentDate = moment(dateState);

    const nowTime = now.getTime();
    let dateTime = dateTimeFormatter({
      year: momentDate.format('YYYY'),
      month: momentDate.format('MM'),
      day: momentDate.format('DD'),
      ampm,
      hour,
      minute,
    });

    if (triggerType === Timestamp.toString()) {
      const {NONE, DAILY, WEEKLY} = RepeatFrequency;
      const repeatFrequency = {
        [Default]: NONE,
        [EveryDay]: DAILY,
        [EveryWeek]: WEEKLY,
      }[triggerState];

      if (nowTime > new Date(dateTime).getTime()) {
        dateTime = moment(dateTime).add(1, 'd').format();
      }

      const timestamp = new Date(dateTime).getTime();

      trigger = {
        type: TriggerType.TIMESTAMP,
        repeatFrequency: repeatFrequency,
        timestamp: timestamp,
        alarmManager: {
          allowWhileIdle: true,
        },
      };
    } else {
      const {DAYS, HOURS, MINUTES, SECONDS} = TimeUnit;
      const timeUnit = {
        [Day]: DAYS,
        [Hour]: HOURS,
        [Minute]: MINUTES,
        [Second]: SECONDS,
      }[triggerState];

      trigger = {
        type: TriggerType.INTERVAL,
        interval: intervalState,
        timeUnit: timeUnit,
      };
    }

    if (triggerState === EveryWeek.toString()) {
      const nextWeekDay = moment(dateTime).add(1, 'weeks');
      const dateList = daysState
        .filter(state => !!state)
        .map(state => moment(nextWeekDay).day(eKoDays[state]).toDate());

      const ids = dateList.map(async date => {
        const id = await setTriggerNotification({
          title: t('앱 이름'),
          body: textState,
          image: ImageList[icon].url,
          trigger: trigger,
        });

        return {id: id, dateTime: moment(date).toDate(), type: triggerState};
      });

      notifiIds = await Promise.all(ids);
    } else {
      const id = await setTriggerNotification({
        title: t('앱 이름'),
        body: textState,
        image: ImageList[icon].url,
        trigger: trigger,
      });

      notifiIds.push({
        id: id,
        dateTime:
          triggerState === Interval.toString()
            ? now
            : moment(dateTime).toDate(),
        type: triggerState,
        interval: intervalState,
      });
    }

    realm.write(() => {
      realm.create('User', {
        _id: uid(0),
        language: languageCode,
        isDarkMode: false,
      });
      realm.create('Notification', {
        _id: uid(1),
        icon: icon,
        body: textState,
        trigger: triggerType,
        notifiIds: notifiIds,
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
              {initTriggerType.map(info => (
                <SelectButton
                  key={info.id}
                  numberType={numberType}
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
                text={moment(dateState).format(t('YYYY년 MM월 Do일 (dd)'))}
                onPress={onPressDateButton}
              />
            }
          />
        )}
        {triggerType === Interval.toString() && (
          <AddSection
            title="간격"
            component={
              <DisplayButton
                text={
                  t('지금부터') +
                  ` ${intervalState}` +
                  t(`${nameInfo[triggerState]}마다`)
                }
                onPress={onPressIntervalButton}
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
        {triggerType === Timestamp.toString() && (
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
        )}
      </NScrollView>
      <NView className="sticky bottom-0 p-4">
        <TextButton
          viewClassName="flex-row justify-center items-center h-7 mb-4"
          textClassName="text-blue-500 text-base"
          text="알림 테스트"
          onPress={onPressTest}
        />
        <DefaultButton
          name="완료"
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
        title="시간 설정"
        bottomSheetModalRef={timeRef}
        snapPoint={53}
        component={
          <TimeSection timeInfo={timeState} onPress={onPressTimeDone} />
        }
      />
      <BottomSheetModalContainer
        title="간격 설정"
        bottomSheetModalRef={intervalRef}
        snapPoint={25}
        component={
          <IntervalSection
            type={triggerState}
            interval={intervalState}
            onPress={onPressIntervalDone}
          />
        }
      />
    </NSafeAreaView>
  );
};

export default NotificationScreen;
