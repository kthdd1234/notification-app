import React from 'react';
import {NText, NTouchableOpacity, NView} from '../styled';
import Octicons from 'react-native-vector-icons/Octicons';
import DefaultButton from '../button/DefaultButton';

interface IProps {
  /** */
  list: {id: string; name: string}[];
  /** */
  selectedItem: string;
  /** */
  onPressItem: (item: string) => void;
  /** */
  onPressClose: (isOpen: boolean) => void;
}

const SelectedSection = ({
  list,
  selectedItem,
  onPressItem,
  onPressClose,
}: IProps) => {
  return (
    <NView className="p-4">
      <NView className="mb-5">
        {list.map(info => (
          <NTouchableOpacity
            key={info.id}
            className="flex-row items-center justify-between mb-5"
            onPress={() => onPressItem(info.id)}>
            <NText
              className={`text-base ${
                selectedItem === info.id
                  ? 'text-black font-semibold'
                  : 'text-gray-400'
              } `}>
              {info.name}
            </NText>
            {selectedItem === info.id && <Octicons name="check" size={23} />}
          </NTouchableOpacity>
        ))}
      </NView>
      <DefaultButton
        name="닫기"
        isEnabled={true}
        height={48}
        onPress={() => onPressClose(false)}
      />
    </NView>
  );
};

export default SelectedSection;
