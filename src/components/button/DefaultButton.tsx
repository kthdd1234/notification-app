import {NText, NTouchableOpacity} from '../styled';

interface IProps {
  /** */
  name: string;
  /** */
  isEnabled: boolean;
  /** */
  onPress: () => void;
}

const DefaultButton = ({name, isEnabled, onPress}: IProps) => {
  return (
    <NTouchableOpacity
      className={`h-16 rounded-lg justify-center items-center ${
        isEnabled ? 'bg-blue-500' : 'bg-slate-200'
      }`}
      onPress={onPress}>
      <NText
        className={`font-bold text-base ${
          isEnabled ? 'text-white' : 'text-gray-400'
        }`}>
        {name}
      </NText>
    </NTouchableOpacity>
  );
};

export default DefaultButton;
