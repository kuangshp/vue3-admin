import moment from 'moment'

export const formatDate = (dateNum, isDue = false) => {
  if (!dateNum) {
    return ''
  }
  if (/^\d+$/g.test(dateNum)) {
    dateNum = Number.parseInt(dateNum)
  }
  if (isDue) {
    return moment(dateNum).format('YYYY-MM-DD')
  } else {
    return moment(dateNum).format('YYYY-MM-DD HH:mm:ss')
  }
}
