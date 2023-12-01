import React from 'react';
import {NText, NTouchableOpacity} from '../styled';
import {useRecoilValue} from 'recoil';
import {themaAtom} from '../../states';
import {buttonColor, buttonDisableColor} from '../../utils/constants';

interface IProps {
  /** */
  name: string;
  /** */
  isEnabled: boolean;
  /** */
  height: number;
  /** */
  onPress: () => void;
}

const DefaultButton = ({name, isEnabled, height, onPress}: IProps) => {
  /** useRecoilValue */
  const thema = useRecoilValue(themaAtom);

  /** class */
  const bgClass = isEnabled ? buttonColor(thema) : buttonDisableColor(thema);
  const textClass = isEnabled ? 'text-white' : 'text-gray-400';

  return (
    <NTouchableOpacity
      style={{height: height}}
      className={`rounded-lg justify-center items-center ${bgClass}`}
      onPress={onPress}>
      <NText className={`font-bold text-base ${textClass}`}>{name}</NText>
    </NTouchableOpacity>
  );
};

export default DefaultButton;
