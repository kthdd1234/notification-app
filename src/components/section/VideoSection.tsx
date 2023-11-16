import React, {memo} from 'react';
import {NVideo} from '../styled';
// import skyVideo from '../../../assets/videos/sky.mp4';
// const video = require('../../../assets/videos/sky.mp4');

interface IProps {
  /** */
  uri: string;
}

const VideoSection = ({uri}: IProps) => {
  console.log('VideoSection 랜더링 <------------------------------>');
  return <NVideo className="rounded-lg h-80" controls={true} source={{uri}} />;
};

export default memo(VideoSection);
