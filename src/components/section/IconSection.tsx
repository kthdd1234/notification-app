import React from 'react';
import ImageList from '../../../assets/images';
import {NImage, NTouchableOpacity} from '../styled';
import IconView from '../view/IconView';

interface IProps {
  /** */
  selectedIcon: number;
  /** */
  onPressIcon: (icon: number) => void;
}

const IconSection = ({selectedIcon, onPressIcon}: IProps) => {
  return (
    <IconView
      data={ImageList}
      renderItem={({url, key}) => (
        <NTouchableOpacity
          className={`${
            selectedIcon === key
              ? 'border border-solid border-blue-500 bg-blue-100'
              : 'bg-gray-50'
          } items-center justify-center w-16 h-16  rounded-full`}
          onPress={() => onPressIcon(key)}>
          <NImage className="w-10 h-10" source={url} />
        </NTouchableOpacity>
      )}
    />
  );
};

export default IconSection;
