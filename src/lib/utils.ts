export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatPhone(phone: string): string {
  return phone.replace(/\s/g, '');
}
