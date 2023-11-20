import React from 'react';
import {NSafeAreaView, NText, NView, NScrollView} from '../components/styled';
import BellSvg from '../../assets/svgs/bell.svg';
import NotificationSvg from '../../assets/svgs/notification.svg';
import TimerSvg from '../../assets/svgs/timer.svg';
import {FloatingAction} from 'react-native-floating-action';
import Tag from '../components/tag';
import {useTranslation} from 'react-i18next';
import {eTriggerTypes, eSvg} from '../types/enum';
import CommonHeader from '../components/header/CommonHeader';

/** eTriggerTypes */
const {Timestamp, Interval} = eTriggerTypes;

const HomeScreen = ({navigation}) => {
  /** useTranslation */
  const {t} = useTranslation();

  const onPressFloatingAction = name => {
    navigation.navigate('NotificationScreen', {
      triggerType: name,
    });
  };

  const onPressCalendar = () => {
    //
  };

  // const onPressTask = () => {
  //   navigation.navigate('TaskScreen');
  // };

  const onPressSetting = () => {
    navigation.navigate('SettingScreen');
  };

  const floatingActions = [
    {
      text: t('간격 알림'),
      icon: <TimerSvg width={25} height={25} />,
      name: Interval.toString(),
      position: 1,
      buttonSize: 50,
      color: 'white',
      textStyle: {fontWeight: 'bold', fontSize: 14},
    },
    {
      text: t('알림'),
      icon: <NotificationSvg width={25} height={25} />,
      name: Timestamp.toString(),
      position: 2,
      buttonSize: 50,
      color: 'white',
      textStyle: {fontWeight: 'bold', fontSize: 14},
    },
  ];

  const headerActions = [
    {id: eSvg.calendar, onPress: onPressCalendar},
    // {id: eSvg.task, onPress: onPressTask},
    {id: eSvg.setting, onPress: onPressSetting},
  ];

  return (
    <NSafeAreaView className="relative h-full bg-white">
      <CommonHeader actions={headerActions} />
      <NScrollView className="p-4 bg-white">
        <NView className="flex-row items-end justify-between ">
          <NText className="text-3xl font-bold">{t('알림')}</NText>
          <NView className="flex-row">
            <Tag color="gray" text={t('알림 종료') + ' ' + '0'} />
            <Tag color="blue" text={t('알림 예정') + ' ' + '0'} />
          </NView>
        </NView>
      </NScrollView>
      <NView className="absolute left-0 right-0 m-auto top-1/2">
        <NView className="flex-col items-center justify-center bottom-5">
          <BellSvg />
          <NText className="mt-3 text-gray-400">
            {t('예정된 알림이 없어요')}
          </NText>
          <NText className="mt-1 text-gray-400">
            {t('+ 버튼을 눌러 알림을 추가해보세요')}
          </NText>
        </NView>
      </NView>
      <FloatingAction
        buttonSize={70}
        actions={floatingActions}
        onPressItem={onPressFloatingAction}
      />
    </NSafeAreaView>
  );
};

export default HomeScreen;
