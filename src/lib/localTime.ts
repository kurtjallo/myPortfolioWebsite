/** Minutes east of UTC that `timeZone` observes at `now`. */
function utcOffset(now: Date, timeZone: string) {
  const name = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'longOffset' })
    .formatToParts(now)
    .find((p) => p.type === 'timeZoneName')!.value;
  const m = /([+-])(\d\d):(\d\d)/.exec(name);
  return m ? (m[1] === '-' ? -1 : 1) * (Number(m[2]) * 60 + Number(m[3])) : 0;
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
