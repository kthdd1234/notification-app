/* eslint-disable react-hooks/exhaustive-deps */
import {FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import ImageList from '../../../assets/images';
import SvgCircleButton from '../button/SvgCircleButton';

interface IProps {
  /** */
  seletedIcon: string;
  /** */
  initialScrollIndex: number;
  /** */
  onPress: (icon: string) => void;
}

const IconView = ({seletedIcon, initialScrollIndex, onPress}: IProps) => {
  /** useRef */
  const [data, setData] = useState(ImageList);

  useEffect(() => {
    if (initialScrollIndex !== -1) {
      const copyImageList = ImageList.slice();

      copyImageList.splice(initialScrollIndex, 1);
      copyImageList.unshift(ImageList[initialScrollIndex]);

      setData(copyImageList);
    }
  }, [initialScrollIndex]);

  return (
    <FlatList
      style={stlye}
      keyExtractor={name => name}
      data={data}
      horizontal={true}
      renderItem={({item}) => (
        <SvgCircleButton
          name={item}
          selectedColor="bg-blue-500"
          selectedIcon={seletedIcon}
          onPressIcon={onPress}
        />
      )}
    />
  );
};

const stlye = {marginBottom: 8};

export default IconView;
