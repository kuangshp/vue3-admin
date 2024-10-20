import moment from 'moment';

export const formatDate = (dateNum, isDue = false) => {
  if (isDue) {
    return moment(dateNum).format('YYYY-MM-DD HH:mm:ss');
  } else {
    return moment(dateNum).format('YYYY-MM-DD');
  }
};
