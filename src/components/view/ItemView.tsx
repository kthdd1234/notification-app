import React, {useState} from 'react';
import {
  eIcon,
  eKoDays,
  eNotiStatusTypes,
  eTimestampTypes,
} from '../../types/enum';
import {
  formatString,
  imageUrl,
  notiTimestampTypes,
} from '../../utils/constants';
// import {setDateTime} from '../../utils/moment';
import IconButton from '../button/IconButton';
import {NTouchableOpacity, NImage, NView, NText} from '../styled';
import Tag from '../tag';
import NotiStatusTag from '../tag/NotiStatusTag';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import {Item} from '../../schema/Item';
import {IParamsMore} from '../../types/interface';
import SwipeableItem from 'react-native-swipeable-item';
import TrashSvg from '../../../assets/svgs/trash.svg';
import {useObject, useRealm} from '@realm/react';
import {cancelLocalNotification} from '../../utils/push-notification';

const {All, Default, EveryWeek, EveryMonth} = eTimestampTypes;
const {End, Future, Off} = eNotiStatusTypes;
const [_all, _default, _everyWeek, _everyMonth] = [
  All.toString(),
  Default.toString(),
  EveryWeek.toString(),
  EveryMonth.toString(),
];
const [_end, _future, _off] = [
  End.toString(),
  Future.toString(),
  Off.toString(),
];

interface IProps {
  /** */
  item: Item;
  /** */
  onPressMore: ({itemId, name}: IParamsMore) => void;
}

const ItemView = ({item, onPressMore}: IProps) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** useNavigation */
  const {navigate} = useNavigation();

  /** item */
  const {_id, icon, body, state, notifications, isNotify} = item;

  /** useState */
  const [status, setStatus] = useState(eNotiStatusTypes.None);

  /** Realm */
  const realm = useRealm();
  const itemObject = useObject(Item, _id);

  const onPressItem = (itemId: string) => {
    const arr = ['NotificationScreen', {itemId}] as never;
    navigate(...arr);
  };

  const setDateTime = () => {
    const dateTime = moment(notifications[0].dateTime);
    const Hmm = dateTime.format(t(formatString.time));

    if (state === _default) {
      const isToday = dateTime.isSame(moment(), 'day');

      if (isToday) {
        return `${t('오늘')} ${Hmm}`;
      }

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

  const onStatus = (type: eNotiStatusTypes) => {
    setStatus(type);
  };

  const onPressDelete = () => {
    if (state === eTimestampTypes.EveryWeek) {
      notifications.forEach(noti => cancelLocalNotification(noti._id));
    } else {
      cancelLocalNotification(notifications[0]._id);
    }

    realm.write(() => realm.delete(itemObject));
  };

  const opacityClassName =
    status === eNotiStatusTypes.Future ? 'opacity-1' : 'opacity-50';

  const textClassName =
    status === eNotiStatusTypes.Future ? 'text-black' : 'text-gray-500';

  return (
    <SwipeableItem
      key={item._id}
      item={item}
      renderUnderlayLeft={() => (
        <NTouchableOpacity
          className="items-end justify-center flex-1 pr-12"
          onPress={onPressDelete}>
          <TrashSvg width={27} height={27} />
          <NText className="mt-2 font-semibold">{t('삭제')}</NText>
        </NTouchableOpacity>
      )}
      snapPointsLeft={[150]}>
      <NTouchableOpacity
        style={style}
        className={`flex-row p-5 mb-5 bg-white ${opacityClassName} rounded-xl`}
        onPress={() => onPressItem(_id)}>
        <NImage className="w-8 h-8 mr-4" source={{uri: imageUrl(icon)}} />
        <NView className="flex-grow w-0">
          <NText className={`mb-3 text-base font-semibold ${textClassName}`}>
            {body}
          </NText>
          <NText className="mb-1 text-xs text-gray-400">
            {t('알림 날짜/시간')}
          </NText>
          <NText className="mb-3 font-bold text-gray-500">
            {setDateTime()}
          </NText>
          <NView className="flex-row">
            <Tag
              color={t(notiTimestampTypes[state].color)}
              text={t(notiTimestampTypes[state].name)}
              isNotMl={true}
            />
            <NotiStatusTag
              isNotify={isNotify}
              notifications={notifications}
              onStatus={onStatus}
            />
          </NView>
        </NView>
        <NView className="w-10 h-full" />
        <IconButton
          containerClassName="absolute right-0 p-4"
          icon={eIcon.more}
          size={18}
          color="gray"
          onPress={() => onPressMore({itemId: _id, name: body})}
        />
      </NTouchableOpacity>
    </SwipeableItem>
  );
};

const style = {
  elevation: 20,
  shadowColor: '#F5F6F7',
  shadowOffset: {width: 10, height: 10},
  shadowOpacity: 1,
};

export default ItemView;
