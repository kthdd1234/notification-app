import {CameraOptions, ImageLibraryOptions} from 'react-native-image-picker';
import {eDays, eIntervalTypes, eTimestampTypes} from '../../types/enum';

const {Default, EveryDay, EveryWeek} = eTimestampTypes;
const {Day, Hour, Minute, Second} = eIntervalTypes;

// Helper
const StringIsNumber = value => isNaN(Number(value));

const days = Object.keys(eDays).filter(StringIsNumber);

const timestampTypes = [
  {
    id: Default,
    name: '기본 알림',
  },
  {id: EveryDay, name: '매일 알림', isGap: true},
  {
    id: EveryWeek,
    name: '매주 알림',
  },
];

const intervalTypes = [
  {
    id: Day,
    name: '일',
    isGap: true,
  },
  {id: Hour, name: '시', isGap: true},
  {
    id: Minute,
    name: '분',
    isGap: true,
  },
  {
    id: Second,
    name: '초',
  },
];

const imageLibraryOptions: ImageLibraryOptions = {
  mediaType: 'mixed',
  includeBase64: true,
  assetRepresentationMode: 'current',
};

const cameraOptions: CameraOptions = {
  mediaType: 'photo',
  videoQuality: 'high',
  cameraType: 'back',
  saveToPhotos: true,
};

const mediaErrorCode = {
  camera_unavailable: '기기에서 카메라를 사용할 수 없습니다.',
  permission: '사진 접근 권한이 없어요.',
  others: '알 수 없는 에러가 발생하였습니다.',
};

export {
  StringIsNumber,
  days,
  timestampTypes,
  intervalTypes,
  imageLibraryOptions,
  cameraOptions,
  mediaErrorCode,
};
