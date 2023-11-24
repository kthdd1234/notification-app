import {useTranslation} from 'react-i18next';
import {NText, NView} from '../styled';
import React, {useState} from 'react';
import Tag from '../tag';
import {eTimestampTypes} from '../../types/enum';
import {useRecoilState} from 'recoil';
import {seletedTagAtom} from '../../states';

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
    <NView className="flex-row items-end justify-between px-4 mb-5">
      <NText className="text-3xl font-bold">{t('알림')}</NText>
      <NView className="flex-row">
        {tagList.map(({id, name, color}) => (
          <Tag
            key={id}
            color={selectedTag === id ? color : 'gray'}
            text={`${t(name)}`}
            onPress={() => onPressTag(id)}
          />
        ))}
      </NView>
    </NView>
  );
};

export default NotiTitle;
