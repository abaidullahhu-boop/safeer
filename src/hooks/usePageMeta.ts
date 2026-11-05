import { useEffect } from 'react';
import { SITE_URL, shareImageUrl } from '../data/site';

interface PageMetaOptions {
  title: string;
  description: string;
  path?: string;
  noindex?: boolean;
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!(element instanceof HTMLMetaElement)) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  const existing = document.head.querySelector('link[rel="canonical"]');
  const element = existing instanceof HTMLLinkElement ? existing : document.createElement('link');
  if (!(existing instanceof HTMLLinkElement)) {
    element.rel = 'canonical';
    document.head.appendChild(element);
  }
  element.href = href;
}

export function usePageMeta({ title, description, path = '/', noindex = false }: PageMetaOptions) {
  useEffect(() => {
    const url = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', shareImageUrl);
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', shareImageUrl);
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
    upsertCanonical(url);
  }, [title, description, path, noindex]);
}
