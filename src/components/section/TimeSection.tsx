import React, {useState} from 'react';
import {NText, NView} from '../styled';
import {textColor, timeSetting} from '../../utils/constants';
import SelectButton from '../button/SelectButton';
import {useTranslation} from 'react-i18next';
import ListView from '../view/ListView';
import DefaultButton from '../button/DefaultButton';
import {themaAtom} from '../../states';
import {useRecoilValue} from 'recoil';

export interface IParamsTime {
  ampm: string;
  hour: string;
  minute: string;
}

interface IProps {
  /** */
  timeInfo: IParamsTime;
  /** */
  onPress: ({ampm, hour, minute}: IParamsTime) => void;
}

const TimeSection = ({timeInfo, onPress}: IProps) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** useRecoilValue */
  const thema = useRecoilValue(themaAtom);

  /** useState */
  const [ampm, setAmpm] = useState(timeInfo.ampm);
  const [hour, setHour] = useState(timeInfo.hour);
  const [minute, setMinute] = useState(timeInfo.minute);

  const timeValue = {'오전/오후': ampm, 시: hour, 분: minute};
  const timeHanlder = {'오전/오후': setAmpm, 시: setHour, 분: setMinute};

  const onPressSelectButton = ({
    title,
    value,
  }: {
    title: string;
    value: string;
  }) => {
    timeHanlder[title](value);
  };

  return (
    <NView className="p-4">
      <NView className="mb-3">
        {timeSetting.map(({title, colList}) => (
          <NView key={title} className="flex-row items-center mb-3">
            <NText className={`w-16 mb-2 ${textColor(thema)}`}>
              {t(title)}
            </NText>
            <NView className="flex-grow ">
              {colList.map((list, key) => (
                <ListView
                  key={`${title}-${key}`}
                  data={list}
                  renderItem={value => (
                    <SelectButton
                      id={value}
                      name={t(value)}
                      numberType="odd"
                      rounded="rounded-md"
                      padding="p-3"
                      selectedId={timeValue[title]}
                      onPress={() => onPressSelectButton({title, value})}
                    />
                  )}
                />
              ))}
            </NView>
          </NView>
        ))}
      </NView>
      <DefaultButton
        name="완료"
        isEnabled={true}
        height={50}
        onPress={() => onPress({ampm, hour, minute})}
      />
    </NView>
  );
};

export default TimeSection;
