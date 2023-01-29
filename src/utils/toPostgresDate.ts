import dayjs from 'dayjs';
export default function toPostgresDate(date: Date) {
  return dayjs(date).format('YYYY-MM-DD');
}
