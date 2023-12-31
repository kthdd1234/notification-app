import {useTranslation} from 'react-i18next';
import {NText, NView} from '../styled';
import React from 'react';
import Tag from '../tag';
import {eTimestampTypes} from '../../types/enum';
import {useRecoilState, useRecoilValue} from 'recoil';
import {seletedTagAtom, themaAtom} from '../../states';
import {tagColor, textColor} from '../../utils/constants';

const {All, Default, EveryWeek, EveryMonth} = eTimestampTypes;
export const [_all, _default, _everyWeek, _everyMonth] = [
  All.toString(),
  Default.toString(),
  EveryWeek.toString(),
  EveryMonth.toString(),
];

const NotiTitle = () => {
  /** useTranslation */
  const {t} = useTranslation();

  /** useRecoilState */
  const [selectedTag, setSeletedTag] = useRecoilState(seletedTagAtom);

  /** useRecoilValue */
  const thema = useRecoilValue(themaAtom);

  const tagList = [
    {id: _all, name: '전체', color: 'blue'},
    {id: _default, name: '기본', color: 'green'},
    {id: _everyWeek, name: '매주', color: 'purple'},
    {id: _everyMonth, name: '매달', color: 'orange'},
  ];

  const onPressTag = (tagId: string) => {
    setSeletedTag(tagId);
  };

  return (
    <NView className="flex-row items-end justify-between px-4 mt-10">
      <NText className={`text-3xl font-bold ${textColor(thema)}`}>
        {t('알림')}
      </NText>
      <NView className="flex-row">
        {tagList.map(({id, name, color}) => (
          <Tag
            key={id}
            color={selectedTag === id ? color : tagColor(thema)}
            text={`${t(name)}`}
            onPress={() => onPressTag(id)}
          />
        ))}
      </NView>
    </NView>
  );
};

export default NotiTitle;
