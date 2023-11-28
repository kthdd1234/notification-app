import {useTranslation} from 'react-i18next';
import {NText, NView} from '../styled';
import React from 'react';
import IconButton from '../button/IconButton';
import {eIcon, eSvg} from '../../types/enum';
import {useNavigation} from '@react-navigation/native';
import SvgButton from '../button/SvgButton';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

interface IProps {
  /** */
  isBack?: boolean;
  /** */
  title?: string;
  /** */
  actions?: {id: eSvg; onPress: () => void}[];
  /** */
  color?: 'white' | 'black';
}

const CommonHeader = ({title, isBack, actions, color}: IProps) => {
  /** useTranslation */
  const {t} = useTranslation();

  /** useNavigation */
  const {goBack} = useNavigation();

  return (
    <NView className="sticky top-0 flex-row items-center justify-between p-4">
      {isBack ? (
        <IconButton
          icon={eIcon.back}
          size={25}
          onPress={goBack}
          color={color}
        />
      ) : (
        <NView />
      )}

      {title ? (
        <NText className="text-lg font-bold">{t(title!)}</NText>
      ) : (
        <NView />
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
