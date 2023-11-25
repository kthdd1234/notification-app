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
import AddSection from '../components/section/TitleSection';
import TextButton from '../components/button/TextButton';
import {
  filterDays,
  formatString,
  imageUrl,
  timestampTypes,
  uid,
} from '../utils/constants';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import BottomSheetModalContainer from '../components/bottomsheet';
import CommonHeader from '../components/header/CommonHeader';
import moment from 'moment';
import CalendarSection from '../components/section/MonthSection';
import TimeSection, {IParamsTime} from '../components/section/TimeSection';
import format from 'string-format';
import {useRealm, useObject} from '@realm/react';
import {
  cancelAllLocalNotifications,
  cancelLocalNotification,
  localNotification,
  localNotificationSchedule,
} from '../utils/push-notification';
import {setDateTime} from '../utils/moment';
import {Item} from '../schema/Notification';
import ImageList from '../../assets/images';
import IconView from '../components/view/IconView';
import {UpdateMode} from 'realm';
// import {UpdateMode} from 'realm/dist/bundle';

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
  const [iconState, setIconState] = useState('bell');
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
  const [initialScrollIndex, setInitialScrollIndex] = useState(-1);

  /** useRef */
  const dateRef = useRef<BottomSheetModal>(null);
  const timeRef = useRef<BottomSheetModal>(null);
  const monthDayRef = useRef<BottomSheetModal>(null);

  /** useRealm */
  const realm = useRealm();
  const itemObj = useObject(Item, itemId || '');

  /** useEffect */
  useEffect(() => {
    if (itemId !== null) {
      const icon = itemObj?.icon || '';
      const text = itemObj?.body || '';
      const state = itemObj?.state || '';
      const notifications = itemObj?.notifications || [];
      const dateTime = moment(notifications[0].dateTime);
      const [ampm, hour, minute] = dateTime.format('A h mm').split(' ');

      setIconState(icon);
      setTextState(text);
      setTriggerState(state);
      setInitialScrollIndex(ImageList.indexOf(icon));
      setTimeState({ampm, hour, minute});

      if (state === _everyWeek) {
        const initDays = ['', '', '', '', '', '', ''];

        notifications.forEach(obj => {
          const day = moment(obj.dateTime).day();
          initDays[day] = eKoDays[day];
        });

        setDaysState([...initDays]);
      } else {
        const dateString = dateTime.format('YYYY-MM-DD');

        setDateState(dateString);
        setMonthDayState(dateString);
      }
    }
  }, [itemId]);

  const onChangeText = (text: string) => {
    setTextState(text);
  };

  const onPressIcon = (newIcon: string) => {
    setIconState(newIcon);
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
      picture: imageUrl(iconState),
    });

    cancelAllLocalNotifications();
  };

  const onPressDone = async () => {
    const {ampm, hour, minute} = timeState;
    const date = moment(dateState);
    const now = new Date(Date.now());
    const picture = imageUrl(iconState);
    const notifications: {_id: string; dateTime: Date; interval?: number}[] =
      [];
    const notifiId = itemId ? Number(itemObj!.notifications[0]._id) : uid(0);

    let dateTime = setDateTime({
      year: date.format('YYYY'),
      month: date.format('MM'),
      day: date.format('DD'),
      ampm,
      hour,
      minute,
    });

    // cancelAllLocalNotifications();

    if (triggerState === _default) {
      if (now.getTime() > dateTime.getTime()) {
        dateTime = moment(dateTime).add(1, 'd').toDate();
      }

      localNotificationSchedule({
        id: notifiId,
        title: t('앱 이름'),
        message: textState,
        date: dateTime,
        repeatType: undefined,
        picture: picture,
      });

      notifications.push({_id: `${notifiId}`, dateTime: dateTime});
    } else if (triggerState === _everyWeek) {
      const dateTimeList = daysState
        .filter(state => !!state)
        .map(state => moment(dateTime).day(eKoDays[state]).toDate());

      const createEveryWeekNoti = (list: Date[]) => {
        list.forEach((newDate, key) => {
          const eId = uid(key);

          localNotificationSchedule({
            id: uid(key),
            title: t('앱 이름'),
            message: textState,
            date: newDate,
            repeatType: 'week',
            picture: picture,
          });

          notifications.push({_id: `${eId}`, dateTime: newDate});
        });
      };

      if (itemId === null) {
        createEveryWeekNoti(dateTimeList);
      } else {
        const beforeNotiList = itemObj?.notifications || [];

        beforeNotiList.forEach(noti => cancelLocalNotification(noti._id));
        createEveryWeekNoti(dateTimeList);
      }
    } else if (triggerState === _everyMonth) {
      const day = monthDayState.split('-')[2];
      dateTime.setDate(Number(day));

      localNotificationSchedule({
        id: notifiId,
        title: t('앱 이름'),
        message: textState,
        date: dateTime,
        repeatType: 'month',
        picture: picture,
      });

      notifications.push({_id: `${notifiId}`, dateTime: dateTime});
    }

    realm.write(() => {
      const modified = itemId === null ? UpdateMode.Never : UpdateMode.Modified;

      realm.create(
        'Item',
        {
          _id: `${itemId || uid(0)}`,
          icon: iconState,
          body: textState,
          type: 'timestamp',
          state: triggerState,
          notifications: notifications,
          isChecked: false,
        },
        modified,
      );
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
      <CommonHeader isBack={true} title={itemId ? '알림 편집' : '알림 추가'} />
      <NScrollView className="p-4 bg-white">
        <AddSection
          title="아이콘"
          isNotMb={true}
          component={
            <IconView
              initialScrollIndex={initialScrollIndex}
              seletedIcon={iconState}
              onPress={onPressIcon}
            />
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
                {filterDays.map((day, idx) => (
                  <SelectButton
                    key={day}
                    id={day}
                    numberType="odd"
                    name={day}
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
          name={itemId ? '편집' : '추가'}
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
