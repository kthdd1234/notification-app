import moment from 'moment';

export interface IMomentFormatter {
  year: string;
  month: string;
  day: string;
  ampm: string;
  hour: string;
  minute: string;
}

const dateTimeFormatter = ({
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
  const result = moment(formatString, 'YYYY-MM-DD hh:mm a').format();

  return result;
};

export {dateTimeFormatter};
