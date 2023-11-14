import {useTranslation} from 'react-i18next';
import {NText, NTouchableOpacity} from '../styled';
import ImageSvg from '../../../assets/svgs/image.svg';

interface IProps {
  /** */
  onPress: () => void;
}

const UploadButton = ({onPress}: IProps) => {
  /** useTranslation */
  const {t} = useTranslation();

  return (
    <NTouchableOpacity
      className="items-center justify-center w-full border border-gray-400 border-dashed rounded-lg bg-gray-50 h-36"
      onPress={onPress}>
      <ImageSvg width={35} height={35} />
      <NText className="mt-3 font-bold text-gray-400">
        {t('사진 또는 동영상 추가')}
      </NText>
    </NTouchableOpacity>
  );
};

export default UploadButton;
