import React from 'react';
import {NText, NTouchableOpacity, NView} from '../styled';
import {eMoreTypes} from '../../types/enum';
import CopySvg from '../../../assets/svgs/copy.svg';
import EditSvg from '../../../assets/svgs/edit-notification.svg';
import TrashSvg from '../../../assets/svgs/trash.svg';
import DisEnabledSvg from '../../../assets/svgs/disable-bell-notification.svg';
import EnabledSvg from '../../../assets/svgs/able-notification.svg';
import {useTranslation} from 'react-i18next';
import DefaultButton from '../button/DefaultButton';

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

const moreItems = [
  {id: _copy, svg: <CopySvg {...props} />, name: '알림 복제'},
  {id: _edit, svg: <EditSvg {...props} />, name: '알림 수정'},
  {id: _remove, svg: <TrashSvg {...props} />, name: '알림 삭제'},
  {id: _disEnabled, svg: <DisEnabledSvg {...props} />, name: '알림 끄기'},
];

interface IProps {}

const MoreSection = () => {
  /** useTranslation */
  const {t} = useTranslation();

  const onPreeClose = () => {};

  return (
    <NView className="px-6 py-3">
      <NView className="mb-2">
        {moreItems.map(item => (
          <NTouchableOpacity
            key={item.id}
            className="flex-row items-center mb-5">
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
