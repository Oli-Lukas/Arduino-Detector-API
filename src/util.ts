export function createDateTime(): string
{
  const currentDate = new Date();

  const hours   = String(currentDate.getHours());
  const minutes = String(currentDate.getMinutes());
  const seconds = String(currentDate.getSeconds());

  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
}