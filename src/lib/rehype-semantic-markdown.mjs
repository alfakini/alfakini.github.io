import { contentLocale } from '../i18n/index.ts';

function isElement(node, tagName) {
	return node?.type === 'element' && (!tagName || node.tagName === tagName);
}

function captionedFigure(content, caption) {
	return {
		type: 'element',
		tagName: 'figure',
		properties: {},
		children: [
			content,
			{
				type: 'element',
				tagName: 'figcaption',
				properties: {},
				children: [{ type: 'text', value: caption }],
			},
		],
	};
}

function isYouTubeEmbed(src) {
	try {
		const url = new URL(src);
		return (
			url.protocol === 'https:' &&
			(url.hostname === 'youtube.com' || url.hostname === 'www.youtube.com') &&
			url.pathname.startsWith('/embed/')
		);
	} catch {
		return false;
	}
}

function isLocalVideo(src) {
	if (typeof src !== 'string' || !/^(?:\/|\.\.?\/)/.test(src)) return false;

	const path = src.split(/[?#]/, 1)[0].toLowerCase();
	return /\.(?:mp4|webm|ogv|mov)$/.test(path);
}

function videoEmbed(src, title) {
	return {
		type: 'element',
		tagName: 'div',
		properties: { className: ['video-embed'] },
		children: [
			{
				type: 'element',
				tagName: 'iframe',
				properties: {
					src,
					title,
					loading: 'lazy',
					allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
					allowFullScreen: true,
				},
				children: [],
			},
		],
	};
}

function localVideo(src) {
	return {
		type: 'element',
		tagName: 'video',
		properties: { src, controls: true, preload: 'metadata' },
		children: [],
	};
}

function textContent(node) {
	if (node?.type === 'text') return node.value;
	return (node?.children ?? []).map(textContent).join('');
}

function removeAttributionPrefix(node) {
	if (node?.type === 'text') {
		const value = node.value.replace(/^\s*—\s*/, '');
		if (value === node.value) return false;
		node.value = value;
		return true;
	}
	for (const child of node?.children ?? []) {
		if (removeAttributionPrefix(child)) return true;
	}
	return false;
}

function marginNoteNodes(note, index, label) {
	const id = `margin-note-${index}`;
	return [
		{
			type: 'element',
			tagName: 'label',
			properties: { htmlFor: id, className: ['margin-toggle'], ariaLabel: label },
			children: [{ type: 'text', value: '⊕' }],
		},
		{
			type: 'element',
			tagName: 'input',
			properties: { type: 'checkbox', id, className: ['margin-toggle'] },
			children: [],
		},
		{
			...note,
			tagName: 'span',
			properties: { ...note.properties, className: ['sidenote'], role: 'note' },
		},
	];
}

function transformChildren(parent, state) {
	for (let index = 0; index < (parent.children?.length ?? 0); index += 1) {
		const child = parent.children[index];
		transformChildren(child, state);

		if (isElement(child, 'aside')) {
			state.marginNotes += 1;
			const replacements = marginNoteNodes(child, state.marginNotes, state.marginNoteLabel);
			parent.children.splice(index, 1, ...replacements);
			index += replacements.length - 1;
			continue;
		}

		if (isElement(child, 'p') && child.children.length === 1 && isElement(child.children[0], 'img')) {
			const image = child.children[0];
			const caption = image.properties.title ?? image.properties.alt;
			if (typeof caption !== 'string' || caption.trim() === '') continue;
			if (isYouTubeEmbed(image.properties.src)) {
				state.videos += 1;
				parent.children[index] = captionedFigure(
					videoEmbed(image.properties.src, caption),
					`Video ${state.videos}: ${caption}`,
				);
				continue;
			}
			if (isLocalVideo(image.properties.src)) {
				state.videos += 1;
				parent.children[index] = captionedFigure(localVideo(image.properties.src), `Video ${state.videos}: ${caption}`);
				continue;
			}
			delete image.properties.title;
			state.figures += 1;
			parent.children[index] = captionedFigure(image, `Figure ${state.figures}: ${caption}`);
		}
	}

	if (isElement(parent, 'blockquote')) {
		const attribution = parent.children.findLast((child) => child.type !== 'text' || child.value.trim() !== '');
		if (isElement(attribution, 'p') && textContent(attribution).trimStart().startsWith('—')) {
			attribution.tagName = 'footer';
			removeAttributionPrefix(attribution);
		}
	}
}

export default function rehypeSemanticMarkdown() {
	return (tree, file) => {
		const marginNoteLabel =
			contentLocale(file.data.astro?.frontmatter?.lang, file.path) === 'pt-BR'
				? 'Alternar nota lateral'
				: 'Toggle margin note';
		transformChildren(tree, { figures: 0, marginNotes: 0, marginNoteLabel, videos: 0 });
	};
}
