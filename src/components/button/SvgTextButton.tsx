import React from 'react';
import {NText, NTouchableOpacity, NView} from '../styled';
import {useTranslation} from 'react-i18next';

interface IProps {
  /** */
  svg: JSX.Element;
  /** */
  text: string;
  /** */
  onPress: () => void;
}

const SvgTextButton = ({svg, text, onPress}: IProps) => {
  /** useTranslation */
  const {t} = useTranslation();

  return (
    <NTouchableOpacity
      className="flex-col items-center py-6 rounded-lg px-14 bg-blue-50"
      onPress={onPress}>
      <NView className="mb-3">{svg}</NView>
      <NText className="text-gray-500">{t(text)}</NText>
    </NTouchableOpacity>
  );
};

export default SvgTextButton;
