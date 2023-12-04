/* eslint-disable react-native/no-inline-styles */
import {useTranslation} from 'react-i18next';
import {NText, NTouchableOpacity} from '../styled';
import React from 'react';
import {useRecoilValue} from 'recoil';
import {themaAtom} from '../../states';
import {notSelectColor} from '../../utils/constants';

interface IProps {
  /** */
  id: string;
  /** */
  name: string;
  /** */
  numberType: 'odd' | 'even';
  /** */
  rounded: 'rounded-md' | 'rounded-full';
  /** */
  selectedId: string;
  /** */
  isGap?: boolean;
  /** */
  padding: string;
  /** */
  onPress: (id: string) => void;
}

const SelectButton = ({
  id,
  name,
  numberType,
  selectedId,
  rounded,
  isGap,
  padding,
  onPress,
}: IProps) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** useRecoilValue */
  const thema = useRecoilValue(themaAtom);

  /** class */
  const viewClass = id === selectedId ? 'bg-blue-500' : notSelectColor(thema);
  const gapClass = {['odd']: isGap && 'mx-2', ['even']: isGap && 'mr-2'}[
    numberType
  ];
  const textClass = id === selectedId ? 'text-white' : 'text-gray-400';

  return (
    <NTouchableOpacity
      className={`${viewClass} ${gapClass} ${rounded} ${padding} items-center flex-grow `}
      onPress={() => onPress(id)}>
      <NText className={`${textClass} font-bold `}>{t(name)}</NText>
    </NTouchableOpacity>
  );
};

export default SelectButton;
