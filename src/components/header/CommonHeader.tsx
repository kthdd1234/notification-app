import {useTranslation} from 'react-i18next';
import {NText, NView} from '../styled';
import React from 'react';
import IconButton from '../button/IconButton';
import {eIcon, eSvg} from '../../types/enum';
import {useNavigation} from '@react-navigation/native';
import SvgButton from '../button/SvgButton';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {textColor} from '../../utils/constants';
import {themaAtom} from '../../states';
import {useRecoilValue} from 'recoil';

interface IProps {
  /** */
  isBack?: boolean;
  /** */
  title?: string;
  /** */
  actions?: {id: eSvg; onPress: () => void}[];
}

const CommonHeader = ({title, isBack, actions}: IProps) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** useNavigation */
  const {goBack} = useNavigation();

  /** useRecoilValue */
  const thema = useRecoilValue(themaAtom);

  return (
    <NView className="sticky top-0 flex-row items-center justify-between p-4">
      {isBack ? (
        <IconButton
          icon={eIcon.back}
          size={25}
          onPress={goBack}
          color={thema === 'White' ? 'black' : 'white'}
        />
      ) : (
        <NView />
      )}

      {title && (
        <NText className={`text-lg font-bold ${textColor(thema)}`}>
          {t(title!)}
        </NText>
      )}

      {actions ? (
        <NView className="flex-row">
          {actions.map(({id, onPress}) => (
            <SvgButton
              key={id}
              svg={id}
              size={30}
              containerClassName="ml-4"
              onPress={onPress}
            />
          ))}
        </NView>
      ) : (
        <AntDesignIcon name="left" size={30} color="transparent" />
      )}
    </NView>
  );
};

export default CommonHeader;
