import React from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
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
  color?: string;
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
    checkBox: <Ionicons name="checkbox-outline" size={size} color={color} />,
    box: (
      <MaterialIcons name="check-box-outline-blank" size={size} color={color} />
    ),
    more: <Feather name="more-vertical" size={size} color={color} />,
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
