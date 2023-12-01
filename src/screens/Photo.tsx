import React from 'react';
import {NImage, NSafeAreaView, NView} from '../components/styled';
import CommonHeader from '../components/header/CommonHeader';

const Photo = ({route}) => {
  const {uri} = route.params;

  console.log(uri);

  return (
    <NSafeAreaView className="h-full bg-black">
      <CommonHeader isBack />
      <NView className="px-5">
        <NImage className="w-full h-full" source={{uri}} />
      </NView>
    </NSafeAreaView>
  );
};

export default Photo;
