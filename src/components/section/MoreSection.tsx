import React, {RefObject} from 'react';
import {NText, NTouchableOpacity, NView} from '../styled';
import {eKoDays, eMoreTypes} from '../../types/enum';
import CopySvg from '../../../assets/svgs/copy.svg';
import EditSvg from '../../../assets/svgs/edit-notification.svg';
import TrashSvg from '../../../assets/svgs/trash.svg';
import DisEnabledSvg from '../../../assets/svgs/disable-bell-notification.svg';
// import EnabledSvg from '../../../assets/svgs/able-notification.svg';
import {useTranslation} from 'react-i18next';
import DefaultButton from '../button/DefaultButton';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {useNavigation} from '@react-navigation/native';
import {useObject, useRealm} from '@realm/react';
import {Item} from '../../schema/Item';
import {uid} from '../../utils/constants';
import {setPushNotification} from '../../utils/push-notification';
import moment from 'moment';
import uuid from 'react-native-uuid';

const {Copy, Edit, Remove, Enabled, DisEnabled} = eMoreTypes;
const [_copy, _edit, _remove, _enabled, _disEnabled] = [
  Copy,
  Edit,
  Remove,
  Enabled,
  DisEnabled,
];

const size = 20;
const props = {width: size, height: size};

interface IProps {
  /** */
  moreRef: RefObject<BottomSheetModalMethods>;
  /** */
  itemId: string;
}

const MoreSection = ({moreRef, itemId}: IProps) => {
  /** realm */
  const realm = useRealm();
  const itemObject = useObject(Item, itemId);

  /** useTranslation */
  const {t} = useTranslation();

  /** useNavigation */
  const {navigate} = useNavigation();

  const onPressCopy = () => {
    const item = itemObject || {
      _id: 0,
      isNotify: false,
      notifications: [],
      order: 0,
    };
    const isNotify = item.isNotify;
    const daysState = item.notifications.map(
      noti => eKoDays[moment(noti.dateTime).day()],
    );
    const monthDayState = moment(item.notifications[0].dateTime).format(
      'YYYY-MM-DD',
    );
    const _uid = uid('n');
    const _id = uuid.v4();

    console.log('_id:', _uid);
    console.log('daysState:', daysState);
    console.log('monthDayState:', monthDayState);

    if (isNotify) {
      setPushNotification({
        appName: t('앱 이름'),
        itemId: _uid,
        itemObj: item,
        picture: item.icon,
        dateTime: item.notifications[0].dateTime,
        triggerState: item.state,
        textState: item.body,
        daysState: daysState,
        monthDayState: monthDayState,
      });
    }

    realm.write(() => {
      realm.create('Item', {
        ...item,
        _id: _id,
        order: item.order,
      });
    });

    onPreeClose();
  };

  const onPressEdit = () => {
    const arr = ['NotificationScreen', {itemId}] as never;
    navigate(...arr);

    setTimeout(onPreeClose, 1000);
  };

  const onPressRemove = () => {
    //
  };

  const onPressOnOff = () => {
    //
  };

  const onPreeClose = () => {
    moreRef.current?.close();
  };

  const moreItems = [
    {
      id: _copy,
      svg: <CopySvg {...props} />,
      name: '알림 복제',
      onPress: onPressCopy,
    },
    {
      id: _edit,
      svg: <EditSvg {...props} />,
      name: '알림 수정',
      onPress: onPressEdit,
    },
    {
      id: _remove,
      svg: <TrashSvg {...props} />,
      name: '알림 삭제',
      onPress: onPressRemove,
    },
    {
      id: _disEnabled,
      svg: <DisEnabledSvg {...props} />,
      name: '알림 끄기',
      onPress: onPressOnOff,
    },
  ];

  return (
    <NView className="px-6 py-3">
      <NView className="mb-2">
        {moreItems.map(item => (
          <NTouchableOpacity
            key={item.id}
            className="flex-row items-center mb-5"
            onPress={item.onPress}>
            <NView className="p-2 mr-3 bg-gray-100 rounded-lg">
              {item.svg}
            </NView>
            <NText className="text-base text-gray-700">{t(item.name)}</NText>
          </NTouchableOpacity>
        ))}
      </NView>
      <DefaultButton
        name={t('닫기')}
        isEnabled={true}
        height={48}
        onPress={onPreeClose}
      />
    </NView>
  );
};

export default MoreSection;
/*
 *  ------
 * | 더보기 |
 *  ------
 * - 알림 복제
 * - 알림 수정
 * - 알림 삭제
 * - 알림 끄기
 */
