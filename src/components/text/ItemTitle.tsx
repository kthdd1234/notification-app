import {useTranslation} from 'react-i18next';
import {NText, NView} from '../styled';
import React from 'react';
import Tag from '../tag';
import {eTimestampTypes} from '../../types/enum';

const {All, Default, EveryWeek, EveryMonth} = eTimestampTypes;

const NotiTitle = () => {
  /** useTranslation */
  const {t} = useTranslation();

  const onPressEndNoti = () => {
    //
  };

  const onPressFutureNoti = () => {
    //
  };

  return (
    <NView className="flex-row items-end justify-between px-4 mb-5">
      <NText className="text-3xl font-bold">{t('알림')}</NText>
      <NView className="flex-row">
        <Tag color="blue" text={`${t('전체')}`} onPress={onPressFutureNoti} />
        <Tag color="gray" text={`${t('기본')}`} onPress={onPressFutureNoti} />
        <Tag color="gray" text={`${t('매주')}`} onPress={onPressFutureNoti} />
        <Tag color="gray" text={`${t('매달')}`} onPress={onPressFutureNoti} />
      </NView>
    </NView>
  );
};

export default NotiTitle;
