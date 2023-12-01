import React from 'react';
import {NText, NTouchableOpacity, NView} from '../styled';
import {useTranslation} from 'react-i18next';
import {useRecoilValue} from 'recoil';
import {themaAtom} from '../../states';
import {textColor} from '../../utils/constants';

interface IProps {
  /** */
  id: any;
  /** */
  svg: JSX.Element;
  /** */
  name: string;
  /** */
  svgBgColor: string;
  /** */
  tag?: JSX.Element;
  /** */
  onPress: () => void;
}

const SvgBlockButton = ({id, svg, name, svgBgColor, tag, onPress}: IProps) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** useRecoilValue */
  const thema = useRecoilValue(themaAtom);

  return (
    <NTouchableOpacity
      key={id}
      className="flex-row items-center justify-between pb-5"
      onPress={onPress}>
      <NView className="flex-row items-center">
        <NView className={`p-2 mr-3 ${svgBgColor} rounded-lg`}>{svg}</NView>
        <NText className={`text-base ${textColor(thema)}`}>{t(name)}</NText>
      </NView>
      {tag}
    </NTouchableOpacity>
  );
};

export default SvgBlockButton;
