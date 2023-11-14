import {NText, NTouchableOpacity} from '../styled';

interface IProps {
  /** */
  color: 'gray' | 'blue';
  /** */
  text: string;
}

const colors = {
  gray: {textColor: 'text-gray-600', bgColor: 'bg-gray-50'},
  blue: {textColor: 'text-blue-600', bgColor: 'bg-blue-50'},
};

const Tag = ({color, text}: IProps) => {
  return (
    <NTouchableOpacity
      className={`${colors[color].bgColor} ml-2 p-2 rounded-md`}>
      <NText className={`${colors[color].textColor} text-xs font-semibold`}>
        {text}
      </NText>
    </NTouchableOpacity>
  );
};

export default Tag;
