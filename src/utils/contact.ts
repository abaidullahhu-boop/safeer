import { BUSINESS_INFO } from '../data/travelData';

/** Pakistani mobiles in +92, 92, or 03xx form. Spaces, dashes, and brackets are ignored. */
export function isValidPakistaniPhone(value: string): boolean {
  const compact = value.replace(/[\s\-().]/g, '');
  return /^(?:\+92|92|0)3\d{9}$/.test(compact);
}

export const PAKISTANI_PHONE_ERROR =
  'Enter a Pakistani mobile number starting with +92 or 03, for example +92 321 0000000 or 0321 0000000.';

export function whatsAppLink(message: string): string {
  return `${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent(message)}`;
}
