/** Minutes east of UTC that `timeZone` observes at `now`. */
function utcOffset(now: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric',
  }).formatToParts(now);
  const part = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((p) => p.type === type)!.value);
  const wall = Date.UTC(part('year'), part('month') - 1, part('day'), part('hour'), part('minute'));
  return wall / 60_000 - Math.floor(now.getTime() / 60_000);
}

/** "9:14 PM local time · 3h ahead of you" for `timeZone`, without the suffix when the viewer's offset matches. */
export function localTime(now: Date, timeZone: string) {
  const time = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone }).format(now);
  const viewer = -now.getTimezoneOffset();
  const ahead = utcOffset(now, timeZone) - viewer;
  if (!ahead) return `${time} local time`;
  const abs = Math.abs(ahead), h = Math.floor(abs / 60), m = abs % 60;
  const gap = h && m ? `${h}h ${m}m` : h ? `${h}h` : `${m}m`;
  return `${time} local time · ${gap} ${ahead > 0 ? 'ahead of' : 'behind'} you`;
}
