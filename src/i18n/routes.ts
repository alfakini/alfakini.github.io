import { getRelativeLocaleUrl } from 'astro:i18n';
import type { Locale } from './index';

export const routes = {
	home: '',
	essays: 'essays',
	projects: 'projects',
	tags: 'tags',
	rss: 'rss.xml',
} as const;

export type Route = keyof typeof routes;

export function localeUrl(locale: Locale, path = ''): string {
	return getRelativeLocaleUrl(locale, path);
}

export function routeUrl(locale: Locale, route: Route, ...segments: string[]): string {
	const path = [routes[route], ...segments].filter(Boolean).join('/');
	return localeUrl(locale, path);
}

export function switchLocaleUrl(locale: Locale, pathname: string): string {
	const path = pathname.replace(/^\/en(?:\/|$)/, '/');
	return localeUrl(locale, path.replace(/^\//, ''));
}
