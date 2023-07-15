import React, { ForwardRefRenderFunction } from 'react';
import { parseISO, formatDistanceToNow } from "date-fns";

interface TimeAgoProps {
  timestamp: string | undefined;
}

export const TimeAgo: ForwardRefRenderFunction<HTMLDivElement, TimeAgoProps> = ({ timestamp }, ref) => {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <span ref={ref} title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
};
