export const translations = {
	common: {
		readInEnglish: 'Ler em inglês',
		readInPortuguese: 'Ler em português',
	},
	header: {
		navigation: 'Principal',
		essays: 'Ensaios',
		projects: 'Projetos',
		skipToContent: 'Pular para o conteúdo',
	},
	footer: {
		navigation: 'Navegação secundária',
		tags: 'Tags',
	},
	article: {
		notes: 'Notas',
		seeNote: 'Ver nota',
		tags: 'Assuntos',
		updated: 'Atualizado em',
	},
	tags: {
		description: 'Assuntos dos ensaios publicados.',
		essay: 'ensaio',
		essays: 'ensaios',
		title: 'Tags',
	},
	projects: {
		description: 'Projetos pessoais e profissionais.',
		now: 'Agora',
		title: 'Projetos',
	},
} as const;

export type TranslationDictionary = {
	[Section in keyof typeof translations]: {
		[Key in keyof (typeof translations)[Section]]: string;
	};
};
