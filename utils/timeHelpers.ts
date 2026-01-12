
import { CountdownTime, EventStatus } from '../types';

export const getCountdown = (targetDate: string): CountdownTime => {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const difference = target - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isPast: false };
};

export const getEventStatus = (startDateTime: string): EventStatus => {
  const now = new Date();
  const start = new Date(startDateTime);
  
  // Assume a match lasts roughly 3 hours for display purposes
  const durationMs = 3 * 60 * 60 * 1000; 
  const end = new Date(start.getTime() + durationMs);

  if (now < start) {
    return EventStatus.UPCOMING;
  } else if (now >= start && now <= end) {
    return EventStatus.LIVE;
  } else {
    return EventStatus.COMPLETED;
  }
};

export const formatDateTime = (isoString: string): string => {
  return new Date(isoString).toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
};
