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
		current: 'Current',
		description:
			'Construir é a minha forma de compreender o mundo e contribuir para transformá-lo. Desde pequeno, desmonto, investigo e crio coisas, movido pela curiosidade e pelo desejo de entender como os sistemas funcionam, sejam eles técnicos, como hardware, eletrônica e software, sejam formados por ideias, relações e estruturas sociais. Também acredito que o conhecimento ganha valor quando é compartilhado. Por isso, gosto de dividir o que aprendo enquanto estudo, experimento e construo, ajudando outras pessoas a explorar novas possibilidades. Em projetos individuais ou ao lado de empresas, associações e comunidades, meu propósito é aplicar o espírito hacker para resolver problemas, fortalecer comunidades e criar soluções abertas e úteis que gerem impacto positivo na sociedade.',
		hardware: 'Hardware',
		legend: 'Categorias de projeto',
		now: 'Now',
		software: 'Software',
		title: 'Projetos',
		maker: 'Maker',
	},
} as const;

export type TranslationDictionary = {
	[Section in keyof typeof translations]: {
		[Key in keyof (typeof translations)[Section]]: string;
	};
};
