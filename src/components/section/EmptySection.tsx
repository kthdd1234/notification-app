import React from 'react';
import {NText, NView} from '../styled';
import BellSvg from '../../../assets/svgs/bell.svg';
import {useTranslation} from 'react-i18next';

const EmptySection = () => {
  /** useTranslation */
  const {t} = useTranslation();

  return (
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
  );
};

export default EmptySection;
