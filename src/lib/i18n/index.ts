import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from '@/lib/i18n/routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  const localeFileName = locale.replace(/-/g, '');

  return {
    locale,
    messages: (await import(`../../locales/${localeFileName}.json`)).default,
  };
});
