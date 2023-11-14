import {useTranslation} from 'react-i18next';
import {NText} from '../styled';

interface IProps {
  /** */
  title: string;
}

const AddScreenHeader = ({title}: IProps) => {
  /** useTranslation */
  const {t} = useTranslation();

  return <NText className="text-lg font-bold">{t(title)}</NText>;
};

export default AddScreenHeader;
