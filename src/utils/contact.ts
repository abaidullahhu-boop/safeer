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
