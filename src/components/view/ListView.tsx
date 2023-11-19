import {StyleSheet} from 'react-native';
import {NView} from '../styled';
import React from 'react';

interface IProps<T> {
  data: T[];
  renderItem(item: T): JSX.Element;
}

const ListView = <T extends any>({data, renderItem}: IProps<T>) => {
  return (
    <NView style={styles.container}>
      {data.map((item, index) => {
        return (
          <NView className="flex-1 ml-2" key={index}>
            {renderItem(item)}
          </NView>
        );
      })}
    </NView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 8,
  },
});

export default ListView;
