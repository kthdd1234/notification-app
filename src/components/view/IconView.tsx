import {NScrollView, NView} from '../styled';
import React from 'react';

interface IProps<T> {
  data: T[];
  renderItem(item: T): JSX.Element;
}

const IconView = <T extends any>({data, renderItem}: IProps<T>) => {
  return (
    <NScrollView className="rounded" horizontal={true}>
      {data.map((item, index) => {
        return (
          <NView className="mb-6 mr-2" key={index}>
            {renderItem(item)}
          </NView>
        );
      })}
    </NScrollView>
  );
};

export default IconView;
