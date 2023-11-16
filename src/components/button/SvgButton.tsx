import {NTouchableOpacity} from '../styled';
import Calendar from '../../../assets/svgs/calendar.svg';
import Task from '../../../assets/svgs/task.svg';
import Setting from '../../../assets/svgs/setting.svg';
import Warning from '../../../assets/svgs/cloud-warning.svg';
import {eSvg} from '../../types/enum';
import Delete from '../../../assets/svgs/delete.svg';
import React from 'react';

interface IProps {
  /** */
  svg: eSvg;
  /** */
  size: number;
  /** */
  containerClassName?: string;
  /** */
  onPress: (type: eSvg) => void;
}

const SvgButton = ({size, svg, containerClassName, onPress}: IProps) => {
  const svgInfo = {
    calendar: <Calendar width={size} height={size} />,
    task: <Task width={size} height={size} />,
    setting: <Setting width={size} height={size} />,
    warning: <Warning width={size} height={size} />,
    delete: <Delete width={size} height={size} />,
  };

  return (
    <NTouchableOpacity
      className={containerClassName}
      onPress={() => onPress(svg)}>
      {svgInfo[svg]}
    </NTouchableOpacity>
  );
};

export default SvgButton;
