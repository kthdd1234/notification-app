/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-new */
import React from 'react';
import Tag from '.';
import {useTranslation} from 'react-i18next';
import {useEffect, useState} from 'react';
import {getScheduledLocalNotifications} from '../../utils/push-notification';
import {Notification} from '../../schema/Notification';
import {eNotiStatusTypes} from '../../types/enum';
import notifee from '@notifee/react-native';
import {AppState} from 'react-native';

interface IProps {
  /** */
  isNotify: boolean;
  /** */
  notifications: Notification[];
  /** */
  onStatus: (status: eNotiStatusTypes) => void;
}

const NotiStatusTag = ({isNotify, notifications, onStatus}: IProps) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** useState */
  const [status, setStatus] = useState({color: 'gray', text: ''});
  const [isLoading, setIsLoading] = useState(false);

  const handleNotiStatus = async () => {
    setIsLoading(true);
    await handleTimeDelay();
    setIsLoading(false);
  };

  useEffect(() => {
    handleNotiStatus();
  }, [isNotify]);

  useEffect(() => {
    AppState.addEventListener(
      'change',
      appState => appState === 'active' && handleNotiStatus(),
    );
  }, []);

  const handleTimeDelay = () => {
    return new Promise(resolve => {
      setTimeout(async () => {
        const scheduledList = await getScheduledLocalNotifications();
        const notiIds = notifications.map(noti => noti._id);
        const isScheduled = scheduledList.some(data =>
          notiIds.includes(data.id),
        );

        if (isNotify === false) {
          setStatus({color: 'gray', text: '알림 끔'});
          onStatus(eNotiStatusTypes.Off);
        } else if (isScheduled === false) {
          setStatus({color: 'gray', text: '알림 종료'});
          onStatus(eNotiStatusTypes.End);
        } else {
          setStatus({color: 'blue', text: '알림 예정'});
          onStatus(eNotiStatusTypes.Future);
        }

        resolve(true);
      }, 1000);
    });
  };

  return (
    <Tag color={status.color} text={t(status.text)} isLoading={isLoading} />
  );
};

export default NotiStatusTag;
