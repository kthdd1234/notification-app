/* eslint-disable react-hooks/exhaustive-deps */
import {NScrollView, NTextInput, NView} from '../components/styled';
import {useTranslation} from 'react-i18next';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import {useEffect, useState} from 'react';
import {eDays, eNotificationTypes, eTimestampTypes} from '../types/enum';
import SelectButton from '../components/button/SelectButton';
import UploadButton from '../components/button/UploadButton';
import DefaultButton from '../components/button/DefaultButton';
import DisplayButton from '../components/button/DisplayButton';
import AddSection from '../components/section/AddSection';
import {days} from '../utils/constants';
import TextButton from '../components/button/TextButton';

const {Timestamp, Interval} = eNotificationTypes;
const {Default, EveryDay, EveryWeek} = eTimestampTypes;

const Notification = ({navigation, route}) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** route.params */
  const {notificationType} = route.params;

  /** useState */
  const [textState, setTextState] = useState('');
  const [seletedTypeId, setSeletedTypeId] = useState(Default.toString());
  const [selectedDays, setSeletedDays] = useState(['', '', '', '', '', '', '']);

  useEffect(() => {
    const format = {[Timestamp]: '알림 추가', [Interval]: '간격 알림 추가'};
    navigation.setOptions({title: t(format[notificationType])});
  }, []);

  const onPressBackDrop = () => {
    Keyboard.dismiss();
  };

  const onChangeText = (text: string) => {
    setTextState(text);
  };

  const onPressUploadButton = () => {
    //
  };

  const onPressNotificationType = (id: string) => {
    setSeletedTypeId(id);
  };

  const onPressDay = (day: string) => {
    selectedDays.includes(day)
      ? (selectedDays[eDays[day]] = '')
      : (selectedDays[eDays[day]] = day);

    setSeletedDays([...selectedDays]);
  };

  const onPressNotificationTest = () => {
    //
  };

  const onPressCompleted = () => {
    //
  };

  const notificationTypes = [
    {
      id: Default,
      name: t('기본 알림'),
    },
    {id: EveryDay, name: t('매일 알림'), isGap: true},
    {
      id: EveryWeek,
      name: t('매주 알림'),
    },
  ];

  return (
    <TouchableWithoutFeedback onPress={onPressBackDrop}>
      <NView className="relative h-full bg-white">
        <NScrollView className="p-4">
          <AddSection
            component={<UploadButton onPress={onPressUploadButton} />}
          />

          <AddSection
            title="내용"
            component={
              <NTextInput
                className={`h-16 px-5 font-semibold py-3 text-lg leading-[0px] border-2 ${
                  textState !== '' ? 'border-blue-400' : 'border-gray-200'
                } rounded-xl`}
                placeholder={t('ex. 할 일, 약속, 스케줄 등')}
                value={textState}
                onChangeText={onChangeText}
              />
            }
          />

          <AddSection
            title="유형"
            component={
              <NView className="flex-row justify-between">
                {notificationTypes.map(info => (
                  <SelectButton
                    key={info.id}
                    id={info.id.toString()}
                    name={info.name}
                    roundedType="md"
                    selectedId={seletedTypeId}
                    isGap={info.isGap}
                    onPress={onPressNotificationType}
                  />
                ))}
              </NView>
            }
          />

          {seletedTypeId === Default.toString() && (
            <AddSection
              title="날짜"
              component={<DisplayButton text="2023년 11월 13일 (월)" />}
            />
          )}

          {seletedTypeId === EveryWeek.toString() && (
            <AddSection
              title="요일"
              component={
                <NView className="flex-row ">
                  {days.map((objKey, idx) => (
                    <SelectButton
                      key={objKey}
                      id={objKey}
                      name={t(objKey)}
                      roundedType="3xl"
                      selectedId={selectedDays[idx]}
                      isGap={idx !== 0 && idx % 2 !== 0}
                      onPress={onPressDay}
                    />
                  ))}
                </NView>
              }
            />
          )}

          <AddSection
            title="시각"
            component={<DisplayButton text="오전 8시 30분" />}
          />

          <NView className="h-12" />
        </NScrollView>
        <NView className="fixed bottom-0 p-4">
          <TextButton
            viewClassName="flex-row justify-center items-center h-7 mb-4"
            textClassName="text-blue-500 text-base"
            text="알림 테스트"
            onPress={onPressNotificationTest}
          />
          <DefaultButton
            name="완료"
            isEnabled={true}
            onPress={onPressCompleted}
          />
        </NView>
      </NView>
    </TouchableWithoutFeedback>
  );
};

export default Notification;
