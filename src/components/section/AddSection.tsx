import {useTranslation} from 'react-i18next';
import {NView} from '../styled';
import React from 'react';
import NotiTitle from '../text/NotiTitle';

interface IProps {
  /** */
  title?: string;
  /** */
  component: JSX.Element;
  /** */
  isNotMb?: boolean;
}

const AddSection = ({title, isNotMb, component}: IProps) => {
  /** useTranslation */
  const {t} = useTranslation();

  return (
    <NView className={`${isNotMb === true ? '' : 'mb-6'}`}>
      {title && <NotiTitle title={t(title!)} />}
      {component}
    </NView>
  );
};

export default AddSection;
