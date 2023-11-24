import React, {useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {imageUrl} from '../../utils/constants';
import {NImage, NTouchableOpacity} from '../styled';

interface IProps {
  /** */
  name: string;
  /** */
  selectedIcon: string;
  /** */
  selectedColor: string;
  /** */
  onPressIcon: (icon: string) => void;
}

const SvgCircleButton = ({
  selectedIcon,
  name,
  selectedColor,
  onPressIcon,
}: IProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onLoadStart = () => {
    setIsLoading(true);
  };

  const onLoadEnd = () => {
    setIsLoading(false);
  };

  return (
    <NTouchableOpacity
      className={`${
        selectedIcon === name ? selectedColor : 'bg-gray-100'
      } items-center justify-center w-16 h-16  rounded-full mb-4 mr-2`}
      onPress={() => onPressIcon(name)}>
      <NImage
        className={`w-10 h-10 ${isLoading && 'hidden'}`}
        source={{uri: imageUrl(name)}}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
      />
      {isLoading && (
        <ActivityIndicator size="small" color="#4F95F1" animating={isLoading} />
      )}
    </NTouchableOpacity>
  );
};

export default SvgCircleButton;
