import React from 'react';
import {NText, NView} from '../components/styled';
import BellSvg from '../../assets/svgs/bell.svg';
import NotificationSvg from '../../assets/svgs/notification.svg';
import TimerSvg from '../../assets/svgs/timer.svg';
import {FloatingAction} from 'react-native-floating-action';
import Tag from '../components/tag';
import {useTranslation} from 'react-i18next';
import HomeScreenHeader from '../components/header/HomeScreenHeader';
import {eNotificationTypes} from '../types/enum';

/** eNotificationTypes */
const {Timestamp, Interval} = eNotificationTypes;

const HomeScreen = ({navigation}) => {
  /** useTranslation */
  const {t} = useTranslation();

  const onPressFloatingAction = name => {
    navigation.navigate('NotificationScreen', {
      notificationType: name,
    });
  };

  const actions = [
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

  return (
    <NView className="h-full p-5 bg-white">
      <HomeScreenHeader navigation={navigation} />
      <NView className="flex-row items-end justify-between">
        <NText className="text-3xl font-bold">{t('알림')}</NText>
        <NView className="flex-row">
          <Tag color="gray" text={t('알림 종료') + ' ' + '0'} />
          <Tag color="blue" text={t('알림 예정') + ' ' + '0'} />
        </NView>
      </NView>
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
        actions={actions}
        onPressItem={onPressFloatingAction}
      />
    </NView>
  );
};

export default HomeScreen;
