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
  const props = {width: size, height: size};

  const svgs = {
    calendar: <Calendar {...props} />,
    task: <Task {...props} />,
    setting: <Setting {...props} />,
    warning: <Warning {...props} />,
    delete: <Delete {...props} />,
  };

  return (
    <NTouchableOpacity
      className={containerClassName}
      onPress={() => onPress(svg)}>
      {svgs[svg]}
    </NTouchableOpacity>
  );
};

export default SvgButton;
