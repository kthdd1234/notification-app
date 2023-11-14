import {NText, NTouchableOpacity} from '../styled';

interface IProps {
  /** */
  text: string;
}

const DisplayButton = ({text}: IProps) => {
  return (
    <NTouchableOpacity className="items-center justify-center w-full h-16 bg-gray-100 rounded-xl">
      <NText className="text-base font-bold text-blue-500">{text}</NText>
    </NTouchableOpacity>
  );
};

export default DisplayButton;
