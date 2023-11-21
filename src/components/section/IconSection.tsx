import React, {useState} from 'react';
import ImageList from '../../../assets/images';
import {NImage, NTouchableOpacity, NView} from '../styled';
import IconView from '../view/IconView';
import {ActivityIndicator} from 'react-native';
import {imageUrl} from '../../utils/constants';

interface IProps {
  /** */
  selectedIcon: string;
  /** */
  onPressIcon: (icon: string) => void;
}

const ImageIcon = ({name}) => {
  const [isLoading, setIsLoading] = useState(false);

  const onLoadStart = () => {
    setIsLoading(true);
  };

  const onLoadEnd = () => {
    setIsLoading(false);
  };

  return (
    <NView>
      <NImage
        className={`w-10 h-10 ${isLoading && 'hidden'}`}
        source={{uri: imageUrl(name)}}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
      />
      {isLoading && (
        <ActivityIndicator size="small" color="#4F95F1" animating={isLoading} />
      )}
    </NView>
  );
};

// scrollIntoView 작업 필요!
const IconSection = ({selectedIcon, onPressIcon}: IProps) => {
  return (
    <IconView
      data={ImageList}
      renderItem={({name}) => (
        <NTouchableOpacity
          className={`${
            selectedIcon === name ? ' bg-blue-500' : 'bg-gray-100'
          } items-center justify-center w-16 h-16  rounded-full`}
          onPress={() => onPressIcon(name)}>
          <ImageIcon name={name} />
        </NTouchableOpacity>
      )}
    />
  );
};

export default IconSection;
