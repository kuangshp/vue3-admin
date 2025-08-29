import moment from 'moment';

export const formatDate = (dateNum: string | number | Date, isDue: boolean = false): string => {
  if (isDue) {
    return moment(dateNum).format('YYYY-MM-DD HH:mm:ss');
  } else {
    return moment(dateNum).format('YYYY-MM-DD');
  }
};
