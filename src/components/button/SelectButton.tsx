import {NText, NTouchableOpacity} from '../styled';

interface IProps {
  /** */
  id: string;
  /** */
  name: string;
  /** */
  roundedType: 'md' | '3xl';
  /** */
  selectedId: string;
  /** */
  isGap?: boolean;
  /** */
  onPress: (id: string) => void;
}

const SelectButton = ({
  id,
  name,
  selectedId,
  roundedType,
  isGap,
  onPress,
}: IProps) => {
  return (
    <NTouchableOpacity
      className={`${id === selectedId ? 'bg-blue-500' : 'bg-gray-100'} ${
        isGap && 'mx-2'
      } items-center flex-grow p-4  rounded-${roundedType}`}
      onPress={() => onPress(id)}>
      <NText
        className={`${
          id === selectedId ? 'text-white' : 'text-gray-400'
        } font-bold`}>
        {name}
      </NText>
    </NTouchableOpacity>
  );
};

export default SelectButton;
