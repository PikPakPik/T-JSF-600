export function ISOToDateTime(isoDate: string): string {
  return new Date(isoDate).toLocaleString();
}
