export function ISOToRelativeTime(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 30 * 12));

  if (minutes < 60) {
    return `Il y a ${minutes} minutes`;
  } else if (hours < 24) {
    return `Il y a ${hours} heures`;
  } else if (days < 30) {
    return `Il y a ${days} jours`;
  } else if (months < 12) {
    return `Il y a ${months} mois`;
  } else {
    return `Il y a ${years} ans`;
  }
}
