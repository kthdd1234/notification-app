/* eslint-disable react-native/no-inline-styles */
import {useTranslation} from 'react-i18next';
import {NText, NTouchableOpacity} from '../styled';
import {eNotificationTypes} from '../../types/enum';
import React from 'react';

interface IProps {
  /** */
  id: string;
  /** */
  name: string;
  /** */
  type: eNotificationTypes;
  /** */
  roundedType: 'md' | 'full';
  /** */
  selectedId: string;
  /** */
  isGap?: boolean;
  /** */
  onPress: (id: string) => void;
}

const {Timestamp, Interval} = eNotificationTypes;

const SelectButton = ({
  id,
  name,
  type,
  selectedId,
  roundedType,
  isGap,
  onPress,
}: IProps) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** class */
  const viewClass = id === selectedId ? 'bg-blue-500' : 'bg-gray-100';
  const gapClass = {[Timestamp]: isGap && 'mx-2', [Interval]: isGap && 'mr-2'}[
    type
  ];
  const textClass = id === selectedId ? 'text-white' : 'text-gray-400';
  const roundedClass = `rounded-${roundedType}`;

  return (
    <NTouchableOpacity
      style={{borderRadius: 9999}}
      className={`${viewClass} ${gapClass} ${roundedClass} items-center flex-grow p-4`}
      onPress={() => onPress(id)}>
      <NText className={`${textClass} font-bold`}>{t(name)}</NText>
    </NTouchableOpacity>
  );
};

export default SelectButton;
