export function formatRelativeDate(iso?: string | null) {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';

  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffMinutes = Math.round(diffMs / 60000);
  const diffHours = Math.round(diffMs / (60000 * 60));
  const diffDays = Math.round(diffMs / (60000 * 60 * 24));

  const relative = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' });

  if (Math.abs(diffMinutes) < 60) {
    return relative.format(diffMinutes, 'minute');
  }
  if (Math.abs(diffHours) < 24) {
    return relative.format(diffHours, 'hour');
  }
  if (Math.abs(diffDays) < 7) {
    return relative.format(diffDays, 'day');
  }
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: now.getFullYear() === date.getFullYear() ? undefined : 'numeric',
  }).format(date);
}

export function formatMessageTimestamp(iso?: string | null) {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);
}
