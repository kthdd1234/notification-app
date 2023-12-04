import React, {useState} from 'react';
import {Calendar, DateData} from 'react-native-calendars';
import DefaultButton from '../button/DefaultButton';
import {NView} from '../styled';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import {useRecoilValue} from 'recoil';
import {themaAtom} from '../../states';
import {calendarBgColor, dayTextColor} from '../../utils/constants';

interface IProps {
  /** */
  initialDate: string;
  /** */
  onPress: (dateString: string) => void;
}

const MonthSection = ({initialDate, onPress}: IProps) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** useRecoilValue */
  const thema = useRecoilValue(themaAtom);

  const [dateString, setDateString] = useState(initialDate);

  const onDayPress = (date: DateData) => {
    setDateString(date.dateString);
  };

  return (
    <NView>
      <Calendar
        theme={{
          calendarBackground: calendarBgColor(thema),
          dayTextColor: dayTextColor(thema),
          textDisabledColor: 'gray',
          monthTextColor: dayTextColor(thema),
        }}
        monthFormat={t('yyyy년 MM월')}
        minDate={moment(Date.now()).format('YYYY-MM-D')}
        enableSwipeMonths={true}
        initialDate={initialDate}
        date={dateString}
        hideExtraDays={true}
        hideArrows={false}
        horizontal={true}
        pagingEnabled={true}
        markedDates={{
          [dateString]: {
            selected: true,
            selectedColor: '#4F95F1',
          },
        }}
        onDayPress={onDayPress}
      />
      <NView className={'p-4'}>
        <DefaultButton
          name={t('선택 완료')}
          isEnabled={true}
          height={50}
          onPress={() => onPress(dateString)}
        />
      </NView>
    </NView>
  );
};

export default MonthSection;
