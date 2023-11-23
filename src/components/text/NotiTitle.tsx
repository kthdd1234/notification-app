import {useTranslation} from 'react-i18next';
import SvgButton from '../button/SvgButton';
import {NText, NView} from '../styled';
import {eSvg} from '../../types/enum';
import React from 'react';

interface IProps {
  /** */
  title: string;
  /** */
  action?: 'none' | 'warning';
  /** */
  onPressAction?: (action: string) => void;
}

const NotiTitle = ({title, action, onPressAction}: IProps) => {
  /** useTranslation */
  const {t} = useTranslation();

  return (
    <NView className="flex-row items-center justify-between mb-2">
      <NText className="text-base font-bold text-gray-600">{t(title)}</NText>
      {action === 'warning' && (
        <SvgButton
          size={24}
          svg={eSvg.warning}
          onPress={() => onPressAction!(action)}
        />
      )}
    </NView>
  );
};

export default NotiTitle;
