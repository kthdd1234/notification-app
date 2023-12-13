import React, {RefObject} from 'react';
import {NView} from '../styled';
import {eKoDays, eMoreTypes} from '../../types/enum';
import CopySvg from '../../../assets/svgs/copy.svg';
import EditSvg from '../../../assets/svgs/edit-notification.svg';
import TrashSvg from '../../../assets/svgs/trash.svg';
import DisEnabledSvg from '../../../assets/svgs/disable-bell-notification.svg';
import EnabledSvg from '../../../assets/svgs/able-notification.svg';
import {useTranslation} from 'react-i18next';
import DefaultButton from '../button/DefaultButton';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {useNavigation} from '@react-navigation/native';
import {useObject, useRealm} from '@realm/react';
import {Item} from '../../schema/Item';
import {
  cancelLocalNotification,
  localNotificationSchedule,
  setPushNotification,
} from '../../utils/push-notification';
import moment from 'moment';
import uuid from 'react-native-uuid';
import {getRandomInt, imageUrl, notSelectColor} from '../../utils/constants';
import {eTimestampTypes} from '../../types/enum';
import SvgBlockButton from '../button/SvgBlockButton';
import {useRecoilValue} from 'recoil';
import {themaAtom} from '../../states';

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

  /** useRecoilValue */
  const thema = useRecoilValue(themaAtom);

  /** itemObject */
  const icon = itemObject?.icon || 'bell';
  const body = itemObject?.body || '';
  const state = itemObject?.state || 'Default';
  const notifications = itemObject?.notifications || [];
  const order = itemObject?.order || getRandomInt();
  const isNotify = itemObject?.isNotify as boolean;

  const days = notifications.map(noti => eKoDays[moment(noti.dateTime).day()]);
  const monthDay = notifications[0]
    ? moment(notifications[0].dateTime).format('YYYY-MM-DD')
    : '';

  const onPressCopy = () => {
    const newNotifications = setPushNotification({
      appName: t('알림'),
      itemId: null,
      itemObj: itemObject,
      icon: icon,
      textState: body,
      dateTime: notifications[0].dateTime,
      triggerState: state,
      daysState: days,
      monthDayState: monthDay,
    });

    realm.write(() => {
      realm.create('Item', {
        _id: uuid.v4(),
        isNotify: true,
        icon: icon,
        body: body,
        type: 'timestamp',
        state: state,
        notifications: newNotifications,
        isChecked: false,
        order: order,
      });
    });

    onPreeClose();
  };

  const onPressEdit = () => {
    const arr = ['NotificationScreen', {itemId}] as never;
    navigate(...arr);

    setTimeout(onPreeClose, 1000);
  };

  const onCancelNotification = () => {
    if (state === eTimestampTypes.EveryWeek) {
      notifications.forEach(noti => cancelLocalNotification(noti._id));
    } else {
      cancelLocalNotification(notifications[0]._id);
    }
  };

  const onPressRemove = () => {
    onCancelNotification();

    realm.write(() => {
      if (itemObject) {
        realm.delete(itemObject);
      }
    });
    onPreeClose();
  };

  const onPressOff = () => {
    realm.write(() => (itemObject!.isNotify = false));

    onCancelNotification();
    onPreeClose();
  };

  const onPressOn = () => {
    realm.write(() => (itemObject!.isNotify = true));

    if (state === eTimestampTypes.EveryWeek) {
      notifications.forEach(info => {
        localNotificationSchedule({
          id: Number(info._id),
          title: t('알림'),
          message: body,
          date: info.dateTime,
          repeatType: 'week',
          largeIconUrl: imageUrl(icon),
          picture: imageUrl(icon),
        });
      });
    } else {
      setPushNotification({
        appName: t('알림'),
        itemId: itemId,
        itemObj: itemObject,
        icon: icon,
        textState: body,
        dateTime: notifications[0].dateTime,
        triggerState: state,
        daysState: days,
        monthDayState: monthDay,
      });
    }

    onPreeClose();
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
      name: '알림 편집',
      onPress: onPressEdit,
    },
    {
      id: _remove,
      svg: <TrashSvg {...props} />,
      name: '알림 삭제',
      onPress: onPressRemove,
    },
    {
      id: isNotify ? _disEnabled : _enabled,
      svg: isNotify ? <DisEnabledSvg {...props} /> : <EnabledSvg {...props} />,
      name: isNotify ? '알림 끄기' : '알림 켜기',
      onPress: isNotify ? onPressOff : onPressOn,
    },
  ];

  return (
    <NView className="p-6">
      <NView className="mb-2">
        {moreItems.map(({id, svg, name, onPress}) => (
          <SvgBlockButton
            key={id}
            id={id}
            svg={svg}
            name={name}
            svgBgColor={notSelectColor(thema)}
            onPress={onPress}
          />
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
