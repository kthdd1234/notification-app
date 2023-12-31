import React from 'react';
import {NText, NTouchableOpacity} from '../styled';
import {ActivityIndicator} from 'react-native';

interface IProps {
  /** */
  color: string;
  /** */
  text: string;
  /** */
  isNotMl?: boolean;
  /** */
  isLoading?: boolean;
  /** */
  onPress?: () => void;
}

const colors = {
  gray: {textColor: 'text-gray-600', bgColor: 'bg-gray-100'},
  blue: {textColor: 'text-blue-600', bgColor: 'bg-blue-50'},
  green: {textColor: 'text-green-600', bgColor: 'bg-green-50'},
  red: {textColor: 'text-red-600', bgColor: 'bg-red-50'},
  purple: {textColor: 'text-purple-600', bgColor: 'bg-purple-50'},
  orange: {textColor: 'text-orange-600', bgColor: 'bg-orange-50'},
  yellow: {textColor: 'text-yellow-600', bgColor: 'bg-yellow-50'},
  black: {textColor: 'text-white', bgColor: 'bg-[#424242]'},
  amber: {textColor: 'text-amber-600', bgColor: 'bg-amber-50'},
};

const Tag = ({color, text, isNotMl, isLoading, onPress}: IProps) => {
  const mr_2 = isNotMl ? '' : 'ml-2';

  return (
    <NTouchableOpacity
      className={`${colors[color].bgColor} ${mr_2}  p-2 rounded-md `}
      onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator size="small" color="blue" />
      ) : (
        <NText className={`${colors[color].textColor} text-xs font-semibold`}>
          {text}
        </NText>
      )}
    </NTouchableOpacity>
  );
};

export default Tag;
