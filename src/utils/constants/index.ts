import {CameraOptions, ImageLibraryOptions} from 'react-native-image-picker';
import {
  eKoDays,
  eIntervalTypes,
  eTimestampTypes,
  eNotiStatus,
} from '../../types/enum';

const {Default, EveryWeek, EveryMonth} = eTimestampTypes;
const {Day, Hour, Minute} = eIntervalTypes;

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const nId = (num: number) => {
  const value = new Date(Date.now()).getTime() + num;
  return value;
};

// Helper
const StringIsNumber = value => isNaN(Number(value));

const filterDays = Object.keys(eKoDays).filter(StringIsNumber);

const formatString = {
  date: 'YYYY년 MM월 Do일 (dd)',
  dateTime: 'YYYY년 MM월 Do일 dddd A h:mm',
  time: 'A h:mm',
};

const calendarLocales = {
  ko: {
    monthNames: [
      '1월',
      '2월',
      '3월',
      '4월',
      '5월',
      '6월',
      '7월',
      '8월',
      '9월',
      '10월',
      '11월',
      '12월',
    ],
    monthNamesShort: [
      '1월',
      '2월',
      '3월',
      '4월',
      '5월',
      '6월',
      '7월',
      '8월',
      '9월',
      '10월',
      '11월',
      '12월',
    ],
    dayNames: [
      '일요일',
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
    ],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    today: '오늘',
    LL: 'YYYY년 MM월 Do일 (dd)',
    meridiem: (hours: number) => (hours < 12 ? '오전' : '오후'),
  },
  en: {
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    monthNamesShort: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'June',
      'July',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec',
    ],
    dayNames: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    dayNamesShort: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
    today: 'Today',
    LL: 'ddd, MMMM Do, YYYY',
    meridiem: (hours, _, isLowercase) => {
      if (hours < 12) {
        return isLowercase ? 'am' : 'AM';
      } else {
        return isLowercase ? 'pm' : 'PM';
      }
    },
  },
};

const notiStatusTypes = [
  {id: eNotiStatus.End, name: '알림 종료'},
  {id: eNotiStatus.Future, name: '알림 예정'},
];

const timestampTypes = [
  {
    id: Default,
    name: '기본 알림',
    color: 'green',
  },
  {id: EveryWeek, name: '매주 알림', isGap: true, color: 'purple'},
  {
    id: EveryMonth,
    name: '매달 알림',
    color: 'orange',
  },
];

const notiTimestampTypes = {};

timestampTypes.forEach(({id, name, color}) => {
  notiTimestampTypes[id] = {name, color};
});

// const notiTimestampTypes = timestampTypes.map(({id, name, color}) => ({
//   [id]: {name, color},
// }));

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

const ampm = ['오전', '오후'];
const hour_1 = ['1', '2', '3', '4', '5', '6'];
const hour_2 = ['7', '8', '9', '10', '11', '12'];
const min_1 = ['00', '05', '10', '15', '20', '25'];
const min_2 = ['30', '35', '40', '45', '50', '55'];

const timeSetting = [
  {title: '오전/오후', colList: [ampm]},
  {
    title: '시',
    colList: [hour_1, hour_2],
  },
  {
    title: '분',
    colList: [min_1, min_2],
  },
];

const imageUrl = (name: string) => {
  return `https://firebasestorage.googleapis.com/v0/b/notification-app-32f99.appspot.com/o/${name}.png?alt=media&token=851e4f81-97e9-4857-b7a6-27b35ac374a2`;
};

export {
  StringIsNumber,
  filterDays,
  timestampTypes,
  intervalTypes,
  imageLibraryOptions,
  cameraOptions,
  mediaErrorCode,
  calendarLocales,
  timeSetting,
  imageUrl,
  nId,
  formatString,
  notiStatusTypes,
  notiTimestampTypes,
};
