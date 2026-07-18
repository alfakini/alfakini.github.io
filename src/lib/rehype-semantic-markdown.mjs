import { contentLocale } from './locale.ts';

function isElement(node, tagName) {
	return node?.type === 'element' && (!tagName || node.tagName === tagName);
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

		if (
			isElement(child, 'p') &&
			child.children.length === 1 &&
			isElement(child.children[0], 'img') &&
			typeof child.children[0].properties?.title === 'string'
		) {
			const image = child.children[0];
			const caption = image.properties.title;
			delete image.properties.title;
			parent.children[index] = {
				type: 'element',
				tagName: 'figure',
				properties: {},
				children: [
					image,
					{
						type: 'element',
						tagName: 'figcaption',
						properties: {},
						children: [{ type: 'text', value: caption }],
					},
				],
			};
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
			contentLocale(file.data.astro?.frontmatter?.lang, file.path) === 'pt'
				? 'Alternar nota lateral'
				: 'Toggle margin note';
		transformChildren(tree, { marginNotes: 0, marginNoteLabel });
	};
}
