import { BUSINESS_INFO } from '../data/travelData';

/** Pakistani local/mobile, or international E.164 (+ or 00). Spaces, dashes, and brackets are ignored. */
export function isValidPhone(value: string): boolean {
  let compact = value.replace(/[\s\-().]/g, '');
  if (compact.startsWith('00')) compact = `+${compact.slice(2)}`;
  if (/^(?:\+92|92|0)3\d{9}$/.test(compact)) return true;
  return /^\+[1-9]\d{6,14}$/.test(compact);
}

export const isValidPakistaniPhone = isValidPhone;

export const PHONE_ERROR =
  'Enter a valid mobile number, for example +92 321 0000000, 0321 0000000, or +971 50 0000000.';

export const PAKISTANI_PHONE_ERROR = PHONE_ERROR;

export function whatsAppLink(message: string): string {
  return `${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent(message)}`;
}

function isMobileDevice(): boolean {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

/** App link that opens WhatsApp without leaving a second browser tab. */
function whatsAppAppUrl(httpsUrl: string): string {
  const url = new URL(httpsUrl);
  const phone = url.pathname.replace(/\D/g, '');
  const text = encodeURIComponent(url.searchParams.get('text') ?? '');

  if (/Android/i.test(navigator.userAgent)) {
    return `intent://send?phone=${phone}&text=${text}#Intent;scheme=whatsapp;package=com.whatsapp;S.browser_fallback_url=${encodeURIComponent(httpsUrl)};end`;
  }

  return `whatsapp://send?phone=${phone}&text=${text}`;
}

/**
 * Opens a WhatsApp chat.
 * On phones, a new tab is left blank after the app takes the wa.me link.
 * The app link stays in this tab, so coming back from WhatsApp shows the site.
 * `web` is the retry path: the https link, still in this tab, so no blank tab.
 */
export function openWhatsApp(httpsUrl: string, options?: { web?: boolean }): void {
  if (isMobileDevice()) {
    window.location.assign(options?.web ? httpsUrl : whatsAppAppUrl(httpsUrl));
    return;
  }

  const opened = window.open(httpsUrl, '_blank', 'noopener,noreferrer');
  if (!opened) window.location.assign(httpsUrl);
}
