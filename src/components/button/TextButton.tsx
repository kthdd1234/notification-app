import {useTranslation} from 'react-i18next';
import {NText, NTouchableOpacity} from '../styled';

interface IProps {
  /** */
  text: string;
  /** */
  viewClassName?: string;
  /** */
  textClassName?: string;
  /** */
  onPress: () => void;
}

const TextButton = ({text, viewClassName, textClassName, onPress}: IProps) => {
  /** useTranslation */
  const {t} = useTranslation();

  return (
    <NTouchableOpacity className={viewClassName} onPress={onPress}>
      <NText className={textClassName}>{t(text)}</NText>
    </NTouchableOpacity>
  );
};

export default TextButton;
