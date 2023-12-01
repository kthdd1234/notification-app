import React, {useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {imageUrl, notSelectColor} from '../../utils/constants';
import {NImage, NTouchableOpacity} from '../styled';
import {useRecoilValue} from 'recoil';
import {themaAtom} from '../../states';

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

  /** useRecoilValue */
  const thema = useRecoilValue(themaAtom);

  const selectedClass =
    selectedIcon === name ? selectedColor : notSelectColor(thema);

  return (
    <NTouchableOpacity
      className={`${selectedClass} items-center justify-center w-16 h-16  rounded-full mb-4 mr-2`}
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
