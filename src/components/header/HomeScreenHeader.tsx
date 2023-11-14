import {eSvg} from '../../types/enum';
import SvgButton from '../button/SvgButton';
import {NView} from '../styled';

const HomeScreenHeader = ({navigation}) => {
  const onPressCalendar = () => {
    //
  };

  const onPressTask = () => {
    navigation.navigate('TaskScreen');
  };

  const onPressSetting = () => {
    navigation.navigate('SettingScreen');
  };

  const headerSvgs = [
    {id: eSvg.calendar, onPress: onPressCalendar},
    {id: eSvg.task, onPress: onPressTask},
    {id: eSvg.setting, onPress: onPressSetting},
  ];

  return (
    <NView className="flex-row justify-end mb-5">
      {headerSvgs.map(info => (
        <SvgButton
          key={info.id}
          size={30}
          svg={info.id}
          onPress={info.onPress}
        />
      ))}
    </NView>
  );
};

export default HomeScreenHeader;
