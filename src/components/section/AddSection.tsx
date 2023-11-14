import {useTranslation} from 'react-i18next';
import {NView} from '../styled';
import Title from '../text/Title';

interface IProps {
  /** */
  title?: string;
  /** */
  component: JSX.Element;
}

const AddSection = ({title, component}: IProps) => {
  /** useTranslation */
  const {t} = useTranslation();

  return (
    <NView className="mb-6">
      {title && <Title title={t(title!)} />}
      {component}
    </NView>
  );
};

export default AddSection;
