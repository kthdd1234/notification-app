import React from 'react';
import {NImage, NScrollView, NText, NTouchableOpacity, NView} from '../styled';
import {useTranslation} from 'react-i18next';
import {eIcon, eKoDays, eTimestampTypes} from '../../types/enum';
import {
  formatString,
  imageUrl,
  notiTimestampTypes,
} from '../../utils/constants';
import IconButton from '../button/IconButton';
import Tag from '../tag';
import {useQuery} from '@realm/react';
import {Item, Notification} from '../../schema/Notification';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

const {All, Default, EveryWeek, EveryMonth} = eTimestampTypes;
const [_all, _default, _everyWeek, _everyMonth] = [
  All.toString(),
  Default.toString(),
  EveryWeek.toString(),
  EveryMonth.toString(),
];

interface IProps {
  /** */
  itemList: Item[];
}

const NotiSection = ({itemList}: IProps) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** useNavigation */
  const {navigate} = useNavigation();

  const onPressTypeNoti = () => {
    //
  };

  const onPressHistoryNoti = () => {
    //
  };

  const onPressMoreNoti = () => {
    //
  };

  const onPressItem = (itemId: string) => {
    const arr = ['NotificationScreen', {itemId}] as never;
    navigate(...arr);
  };

  const setDateTime = ({
    state,
    notifications,
  }: {
    state: string;
    notifications: Notification[];
  }) => {
    const dateTime = moment(notifications[0].dateTime);
    const Hmm = dateTime.format(t(formatString.time));

    if (state === _default) {
      return dateTime.format(t(formatString.dateTime));
    } else if (state === _everyWeek) {
      const days = notifications
        .map(noti => t(eKoDays[moment(noti.dateTime).day()]))
        .join(' ･ ');
      return `${t('매주')} ${days}${t('요일')} ${Hmm}`;
    } else if (state === _everyMonth) {
      const day = moment(dateTime).format('Do');
      return `${t('매달')} ${day}${t('일')} ${Hmm}`;
    }
  };

  return (
    <NScrollView className="p-4 bg-[#F9F9FC]">
      {itemList.map(({_id, icon, body, state, notifications}) => (
        <NTouchableOpacity
          key={_id}
          style={style}
          className="flex-row p-5 mb-5 bg-white rounded-xl"
          onPress={() => onPressItem(_id)}>
          <NImage className="w-8 h-8 mr-4" source={{uri: imageUrl(icon)}} />
          <NView className="flex-grow w-0">
            <NText className="mb-3 text-base font-semibold ">{body}</NText>
            <NText className="mb-1 text-xs text-gray-400">
              {t('알림 날짜/시간')}
            </NText>
            <NText className="mb-3 font-bold text-gray-500">
              {setDateTime({state, notifications})}
            </NText>
            <NView className="flex-row">
              <Tag
                color={t(notiTimestampTypes[state].color)}
                text={t(notiTimestampTypes[state].name)}
                isNotMl={true}
                onPress={onPressTypeNoti}
              />
              <Tag
                color="blue"
                text={t('알림 예정')}
                onPress={onPressHistoryNoti}
              />
            </NView>
          </NView>
          <NView className="flex-grow-0">
            <IconButton
              icon={eIcon.more}
              size={17}
              color="black"
              onPress={onPressMoreNoti}
            />
          </NView>
        </NTouchableOpacity>
      ))}
    </NScrollView>
  );
};

const style = {
  elevation: 20,
  shadowColor: '#F5F6F7',
  shadowOffset: {width: 10, height: 10},
  shadowOpacity: 1,
};

export default NotiSection;
