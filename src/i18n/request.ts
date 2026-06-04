import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

// Can be imported from a shared config
const locales = ['en', 'id'];

export default getRequestConfig(async ({locale}) => {
  const baseLocale = locale || 'en';
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(baseLocale as any)) notFound();

  return {
    locale: baseLocale,
    messages: (await import(`../../messages/${baseLocale}.json`)).default
  };
});
