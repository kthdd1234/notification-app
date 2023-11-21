/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {NText, NView} from '../styled';
import {useTranslation} from 'react-i18next';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import DefaultButton from '../button/DefaultButton';

interface IProps {
  /** */
  type: string;
  /** */
  interval: number;
  /** */
  onPress: (interval: number) => void;
}

export const nameInfo = {Day: '일', Hour: '시간', Minute: '분'};

const IntervalSection = ({type, interval, onPress}: IProps) => {
  /** useTranslation */
  const {t} = useTranslation();

  const [newValue, setNewValue] = useState(interval);

  const onChangeText = (text: string) => {
    setNewValue(Number(text));
  };

  const isEnabled = newValue > 0;

  return (
    <NView className="p-4">
      <NView className="flex-row justify-center p-3 mb-3 bg-gray-100 rounded-lg">
        <NText className="mr-1 text-base font-bold text-blue-500">
          {t('지금부터')}
        </NText>
        <BottomSheetTextInput
          style={{
            fontSize: 16,
            borderBottomColor: 'gray',
            borderBottomWidth: 1,
          }}
          autoFocus={true}
          keyboardType="number-pad"
          placeholder={t('입력')}
          value={String(newValue)}
          onChangeText={onChangeText}
        />
        <NText className="text-base font-bold text-blue-500">
          {t(`${nameInfo[type]}마다`)}
        </NText>
      </NView>

      <DefaultButton
        name="완료"
        isEnabled={isEnabled}
        height={50}
        onPress={isEnabled ? () => onPress(newValue) : () => null}
      />
    </NView>
  );
};

export default IntervalSection;
