import React from 'react';
import {NImage, NTouchableOpacity} from '../styled';

interface IProps {
  /** */
  uri: string;
  /** */
  containerClassName?: string;
  /** */
  imageClassName: string;
  /** */
  onPress: () => void;
}

const ImageButton = ({
  containerClassName,
  imageClassName,
  uri,
  onPress,
}: IProps) => {
  return (
    <NTouchableOpacity className={containerClassName} onPress={onPress}>
      <NImage className={imageClassName} source={{uri}} />
    </NTouchableOpacity>
  );
};

export default ImageButton;
