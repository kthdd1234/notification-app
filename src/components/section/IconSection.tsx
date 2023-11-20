import React, {useState} from 'react';
import ImageList from '../../../assets/images';
import {NImage, NTouchableOpacity, NView} from '../styled';
import IconView from '../view/IconView';
import {ActivityIndicator} from 'react-native';

interface IProps {
  /** */
  selectedIcon: number;
  /** */
  onPressIcon: (icon: number) => void;
}

const ImageIcon = ({url}) => {
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
        source={url}
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
      renderItem={({url, key}) => (
        <NTouchableOpacity
          className={`${
            selectedIcon === key ? ' bg-blue-500' : 'bg-gray-100'
          } items-center justify-center w-16 h-16  rounded-full`}
          onPress={() => onPressIcon(key)}>
          <ImageIcon url={url} />
        </NTouchableOpacity>
      )}
    />
  );
};

export default IconSection;
