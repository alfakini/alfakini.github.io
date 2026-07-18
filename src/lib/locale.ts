export const locales = ['pt', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'pt';

export function localeCode(locale: Locale): 'pt-BR' | 'en' {
	return locale === 'pt' ? 'pt-BR' : 'en';
}

export function openGraphLocale(locale: Locale): 'pt_BR' | 'en_US' {
	return locale === 'pt' ? 'pt_BR' : 'en_US';
}
