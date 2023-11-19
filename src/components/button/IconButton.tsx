import React from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {eIcon} from '../../types/enum';
import {NTouchableOpacity} from '../styled';

interface IProps {
  /** */
  icon: eIcon;
  /** */
  size: number;
  /** */
  containerClassName?: string;
  /** */
  color?: 'white' | 'black';
  /** */
  onPress: (type: eIcon) => void;
}

const IconButton = ({
  icon,
  size,
  containerClassName,
  color,
  onPress,
}: IProps) => {
  const icons = {
    back: <AntDesignIcon name="left" size={size} color={color} />,
  };

  return (
    <NTouchableOpacity
      className={containerClassName}
      onPress={() => onPress(icon)}>
      {icons[icon]}
    </NTouchableOpacity>
  );
};

export default IconButton;
