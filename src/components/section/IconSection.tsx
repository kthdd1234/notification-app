import React from 'react';
import ImageList from '../../../assets/images';
import IconView from '../view/IconView';
import SvgCircleButton from '../button/SvgCircleButton';

interface IProps {
  /** */
  selectedIcon: string;
  /** */
  onPressIcon: (icon: string) => void;
}

// scrollIntoView 작업 필요!
const IconSection = ({selectedIcon, onPressIcon}: IProps) => {
  return (
    <IconView
      data={ImageList}
      renderItem={({name}) => (
        <SvgCircleButton
          name={name}
          selectedColor="bg-blue-500"
          selectedIcon={selectedIcon}
          onPressIcon={onPressIcon}
        />
      )}
    />
  );
};

export default IconSection;
