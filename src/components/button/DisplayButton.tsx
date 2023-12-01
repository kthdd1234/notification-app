import React from 'react';
import {NText, NTouchableOpacity} from '../styled';
import {useRecoilValue} from 'recoil';
import {themaAtom} from '../../states';
import {notSelectColor} from '../../utils/constants';

interface IProps {
  /** */
  text: string;
  /** */
  onPress: () => void;
}

const DisplayButton = ({text, onPress}: IProps) => {
  /** useRecoilValue */
  const thema = useRecoilValue(themaAtom);

  return (
    <NTouchableOpacity
      className={`items-center justify-center w-full h-16 ${notSelectColor(
        thema,
      )} rounded-xl`}
      onPress={onPress}>
      <NText className="text-base font-bold text-blue-500">{text}</NText>
    </NTouchableOpacity>
  );
};

export default DisplayButton;
