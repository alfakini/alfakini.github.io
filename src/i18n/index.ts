import { translations as englishTranslations } from './translations/en';
import { translations as portugueseTranslations, type TranslationDictionary } from './translations/pt-BR';

export const locales = ['pt-BR', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'pt-BR';

export type TranslationKey = {
	[Section in keyof TranslationDictionary]: `${Section}.${keyof TranslationDictionary[Section] & string}`;
}[keyof TranslationDictionary];

const dictionaries: Record<Locale, TranslationDictionary> = {
	'pt-BR': portugueseTranslations,
	en: englishTranslations,
};

export function contentLocale(frontmatterLang: unknown, sourcePath?: string): Locale {
	if (frontmatterLang === 'en' || /(?:^|[/\\])en\.mdx?$/.test(sourcePath ?? '')) return 'en';
	return defaultLocale;
}

export function localeCode(locale: Locale): Locale {
	return locale;
}

export function openGraphLocale(locale: Locale): 'pt_BR' | 'en_US' {
	return locale === 'pt-BR' ? 'pt_BR' : 'en_US';
}

export function isLocale(value: unknown): value is Locale {
	return typeof value === 'string' && locales.includes(value as Locale);
}

export function currentLocale(value: unknown): Locale {
	if (!isLocale(value)) throw new Error(`Unsupported locale: ${String(value)}`);
	return value;
}

export function useT(locale: Locale): (key: TranslationKey) => string {
	const dictionary = dictionaries[locale];

	return (key) => {
		const [section, name] = key.split('.') as [keyof TranslationDictionary, string];
		return dictionary[section][name as keyof TranslationDictionary[typeof section]];
	};
}
