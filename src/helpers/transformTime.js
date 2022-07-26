import moment from 'moment';

export function TransformTime(time) {
  return moment(time).fromNow()
}