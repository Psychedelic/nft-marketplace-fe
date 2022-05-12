/* eslint-disable import/prefer-default-export */
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs/plugin/customParseFormat';

// Extensions
[utc, timezone, relativeTime, customParseFormat].forEach((plugin) =>
  dayjs.extend(plugin as any),
);

// Defaults
dayjs.tz.setDefault('Europe/London');

const USER_TIMEZONE = dayjs.tz.guess();

const getNow = () =>
  new Date(
    new Date().toLocaleString('en-US', {
      timeZone: USER_TIMEZONE,
    }),
  ).toISOString();

export const dateRelative = (
  timestamp: string,
  now: string = getNow(),
) => dayjs.utc(timestamp).from(now);

export const formatTimestamp = (timestamp: bigint) => {
  let formattedTimestamp = '-';
  if (timestamp && typeof timestamp === 'bigint') {
    const timestampInMilliseconds = Number(timestamp)
      .toString()
      // eslint-disable-next-line no-useless-escape
      .replace(/[\[\]&]+/g, '')
      .substring(0, 13);
    formattedTimestamp = dayjs
      .utc(Number(timestampInMilliseconds))
      .from(getNow());
  }
  return formattedTimestamp;
};
