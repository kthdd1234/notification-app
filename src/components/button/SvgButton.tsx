/* eslint-disable react/react-in-jsx-scope */
import {NTouchableOpacity} from '../styled';
import Calendar from '../../../assets/svgs/calendar.svg';
import Task from '../../../assets/svgs/task.svg';
import Setting from '../../../assets/svgs/setting.svg';

export type TSvg = 'calendar' | 'task' | 'setting';

interface IProps {
  /** */
  svg: TSvg;
  /** */
  onPress: (type: TSvg) => void;
}

const SvgButton = ({svg}: IProps) => {
  const width = 50;
  const height = 50;

  const svgInfo = {
    calendar: <Calendar width={width} height={height} />,
    task: <Task width={width} height={height} />,
    setting: <Setting width={width} height={height} />,
  };

  return <NTouchableOpacity>{svgInfo[svg]}</NTouchableOpacity>;
};

export default SvgButton;
