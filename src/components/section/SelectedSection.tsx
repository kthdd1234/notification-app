import React from 'react';
import {NText, NTouchableOpacity, NView} from '../styled';
import Octicons from 'react-native-vector-icons/Octicons';
import DefaultButton from '../button/DefaultButton';
import {useTranslation} from 'react-i18next';
import {useRecoilValue} from 'recoil';
import {themaAtom} from '../../states';
import {textColor} from '../../utils/constants';

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
  /** useTranslation */
  const {t} = useTranslation();

  /** useRecoilValue */
  const thema = useRecoilValue(themaAtom);

  const disableColor = thema === 'White' ? 'text-gray-300' : 'text-gray-600';
  const iconColor = thema === 'White' ? 'black' : 'white';

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
                  ? `${textColor(thema)} font-semibold`
                  : disableColor
              } `}>
              {t(info.name)}
            </NText>
            {selectedItem === info.id && (
              <Octicons name="check" size={23} color={iconColor} />
            )}
          </NTouchableOpacity>
        ))}
      </NView>
      <DefaultButton
        name={t('닫기')}
        isEnabled={true}
        height={48}
        onPress={() => onPressClose(false)}
      />
    </NView>
  );
};

export default SelectedSection;
