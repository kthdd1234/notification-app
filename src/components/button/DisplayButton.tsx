import React from 'react';
import {NText, NTouchableOpacity} from '../styled';

interface IProps {
  /** */
  text: string;
  /** */
  onPress: () => void;
}

const DisplayButton = ({text, onPress}: IProps) => {
  return (
    <NTouchableOpacity
      className="items-center justify-center w-full h-16 bg-gray-100 rounded-xl"
      onPress={onPress}>
      <NText className="text-base font-bold text-blue-500">{text}</NText>
    </NTouchableOpacity>
  );
};

export default DisplayButton;
