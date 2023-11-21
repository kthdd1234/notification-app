import moment from 'moment';

export interface IMomentFormatter {
  year: string;
  month: string;
  day: string;
  ampm: string;
  hour: string;
  minute: string;
}

const setDateTime = ({
  year,
  month,
  day,
  ampm,
  hour,
  minute,
}: IMomentFormatter) => {
  const ampmInfo = {
    오전: 'AM',
    오후: 'PM',
  };

  const formatString = `${year}-${month}-${day} ${hour}:${minute} ${ampmInfo[ampm]}`;
  const result = moment(formatString, 'YYYY-MM-DD hh:mm a').toDate();

  return result;
};

// const getTimestamp = ({dateState, ampm, hour, minute}) => {
//   const momentDate = moment(dateState);

//   let dateTime = dateTimeFormatter({
//     year: momentDate.format('YYYY'),
//     month: momentDate.format('MM'),
//     day: momentDate.format('DD'),
//     ampm,
//     hour,
//     minute,
//   });
//   const newDate = new Date(dateTime);
//   const timestamp = newDate.getTime();

//   return timestamp;
// };

export {setDateTime};
