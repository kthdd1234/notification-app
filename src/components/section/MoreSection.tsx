import React from 'react';
import {NView} from '../styled';
import {eMoreTypes} from '../../types/enum';
import CopySvg from '../../../assets/svgs/copy.svg';
import EditSvg from '../../../assets/svgs/edit-notification.svg';
import DeleteSvg from '../../../assets/svgs/delete.svg';
import DisEnabled from '../../../assets/svgs/disable-bell-notification.svg';
import Enabled from '../../../assets/svgs/able-notification.svg';

const {copy, edit, remove, enabled, disEnabled} = eMoreTypes;

const moreItems = [
  {id: copy, svg: CopySvg, name: '알림 복제'},
  {id: edit, svg: EditSvg, name: '알림 수정'},
  {id: remove, svg: DeleteSvg, name: '알림 삭제'},
  {id: DisEnabled, svg: disEnabled, name: '알림 끄기'},
];

const MoreSection = () => {
  return <NView></NView>;
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
