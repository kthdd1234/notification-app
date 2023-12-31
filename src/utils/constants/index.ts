import {CameraOptions, ImageLibraryOptions} from 'react-native-image-picker';
import {
  eKoDays,
  eIntervalTypes,
  eTimestampTypes,
  eNotiStatusTypes,
  eLanguageTypes,
  eThemaTypes,
} from '../../types/enum';
import {TestIds} from 'react-native-google-mobile-ads';
import {Platform} from 'react-native';

const {Default, EveryWeek, EveryMonth} = eTimestampTypes;
const {Day, Hour, Minute} = eIntervalTypes;

const androidChannelId = 'notification-app';

const getRandomInt = () => {
  let min = 0;
  let max = 999999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const themaColor = {
  White: {
    bg: 'bg-[#F9F9FC]',
    text: 'text-gray-700',
    notSelect: 'bg-gray-100',
    border: 'border-gray-200',
    itemBg: 'white',
  },
  Dark: {
    bg: 'bg-[#282828]',
    text: 'text-[#E4E4E5]',
    notSelect: 'bg-[#424242]',
    border: 'border-[#424242]',
    itemBg: '#282828',
  },
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

const statusTypes = [
  {id: eNotiStatusTypes.End, name: '알림 종료', color: 'grey'},
  {id: eNotiStatusTypes.Future, name: '알림 예정', color: 'blue'},
  {id: eNotiStatusTypes.Off, name: '알림 끔', color: 'grey'},
];

const notiTimestampTypes = {};
const notiStatusTypes = {};

timestampTypes.forEach(({id, name, color}) => {
  notiTimestampTypes[id] = {name, color};
});

statusTypes.forEach(({id, name, color}) => {
  notiStatusTypes[id] = {name, color};
});

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

const {ko, en} = eLanguageTypes;
const {White, Dark} = eThemaTypes;

const langs = [
  {id: ko.toString(), name: '한국어'},
  {id: en.toString(), name: 'English'},
];

const themas = [
  {id: White.toString(), name: '밝은 테마'},
  {id: Dark.toString(), name: '어두운 테마'},
];

const textColor = (thema: string) =>
  thema === White ? themaColor.White.text : themaColor.Dark.text;

const bgColor = (thema: string) =>
  thema === White ? themaColor.White.bg : themaColor.Dark.bg;

const anColor = (thema: string) => (thema === White ? 'light' : 'dark');

const notSelectColor = (thema: string) =>
  thema === White ? themaColor.White.notSelect : themaColor.Dark.notSelect;

const inputBorderColor = (thema: string) =>
  thema === White ? themaColor.White.border : themaColor.Dark.border;

const bottomSheetBgColor = (thema: string) =>
  thema === White ? themaColor.White.itemBg : themaColor.Dark.itemBg;

const handleIndicatorColor = (thema: string) =>
  thema === White ? '#D9D9D9' : '#424242';

const buttonColor = (thema: string) =>
  thema === White ? 'bg-blue-500' : 'bg-[#424242]';

const buttonDisableColor = (thema: string) =>
  thema === White ? 'bg-gray-200' : 'bg-[#424242]';

const calendarBgColor = (thema: string) =>
  thema === White ? themaColor.White.itemBg : themaColor.Dark.itemBg;

const dayTextColor = (thema: string) => (thema === White ? 'black' : 'white');

const tagColor = (thema: string) => (thema === White ? 'gray' : 'black');

const itemBgColor = (thema: string) =>
  thema === White ? 'bg-[#ffffff]' : 'bg-[#424242]';

const bottomBgColor = (thema: string) =>
  thema === White ? '#F9F9FC' : '#282828';

const bottomDividerColor = (thema: string) =>
  thema === White ? '#D9D9D9' : '#424242';

const anDetails: any = [
  {
    label: 'black',
    card: 'white',
    danger: 'red',
    overlay: '',
    success: '',
    warning: 'orange',
  },
  {
    label: 'white',
    card: '#17171C',
    danger: 'red',
    overlay: '',
    success: '',
    warning: 'orange',
  },
];

const ampmString = {
  AM: '오전',
  PM: '오후',
};

const adUnitIds = {
  ios: {
    banner: 'ca-app-pub-6804308271128440/2458152114',
    appOpen: 'ca-app-pub-6804308271128440/2833518640',
  },
  android: {
    banner: 'ca-app-pub-6804308271128440/7754656921',
    appOpen: 'ca-app-pub-6804308271128440/5866860187',
  },
};

const bannerId = __DEV__
  ? TestIds.ADAPTIVE_BANNER!
  : Platform.OS === 'ios'
  ? adUnitIds.ios.banner
  : adUnitIds.android.banner;

const appOpenId = __DEV__
  ? TestIds.APP_OPEN
  : Platform.OS === 'ios'
  ? adUnitIds.ios.banner
  : adUnitIds.android.banner;

const storeInfo = {
  appStore: {
    id: '6474116876',
    link: 'https://apps.apple.com/kr/app/%EC%8B%AC%ED%94%8C-%EC%95%8C%EB%A6%BC-%ED%95%A0-%EC%9D%BC-%EC%95%BD%EC%86%8D-%EC%8A%A4%EC%BC%80%EC%A4%84-%EC%98%88%EC%95%BD-%EC%95%8C%EB%A6%BC/id6474116876',
  },
  playStore: {
    id: '',
    link: '',
  },
};

export {
  StringIsNumber,
  imageUrl,
  nId,
  textColor,
  bgColor,
  anColor,
  notSelectColor,
  inputBorderColor,
  bottomSheetBgColor,
  handleIndicatorColor,
  buttonColor,
  buttonDisableColor,
  calendarBgColor,
  dayTextColor,
  tagColor,
  itemBgColor,
  getRandomInt,
  bottomBgColor,
  bottomDividerColor,
  bannerId,
  appOpenId,
  ampmString,
  anDetails,
  filterDays,
  timestampTypes,
  intervalTypes,
  imageLibraryOptions,
  cameraOptions,
  mediaErrorCode,
  calendarLocales,
  timeSetting,
  formatString,
  notiStatusTypes,
  notiTimestampTypes,
  langs,
  themas,
  themaColor,
  androidChannelId,
  storeInfo,
};
