import {useTranslation} from 'react-i18next';
import {NText, NTouchableOpacity} from '../styled';
import ImageSvg from '../../../assets/svgs/image.svg';
import React from 'react';
import * as Progress from 'react-native-progress';

interface IProps {
  /** */
  isMediaLoading: boolean;
  /** */
  onPress: () => void;
}

const UploadButton = ({isMediaLoading, onPress}: IProps) => {
  /** useTranslation */
  const {t} = useTranslation();

  return (
    <NTouchableOpacity
      className="items-center justify-center w-full border border-gray-400 border-dashed rounded-lg bg-gray-50 h-36"
      onPress={onPress}>
      {isMediaLoading ? (
        <Progress.CircleSnail color={['#4F95F1']} />
      ) : (
        <ImageSvg width={35} height={35} />
      )}
      <NText className="mt-3 font-bold text-gray-400">
        {isMediaLoading ? t('데이터 로드 중...') : t('사진 또는 동영상 추가')}
      </NText>
    </NTouchableOpacity>
  );
};

export default UploadButton;
