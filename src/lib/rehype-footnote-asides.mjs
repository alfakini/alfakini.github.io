import { contentLocale } from '../i18n/index.ts';

function isElement(node, tagName) {
	return node?.type === 'element' && (!tagName || node.tagName === tagName);
}

function hasClass(node, className) {
	const classes = node?.properties?.className;
	return Array.isArray(classes) && classes.includes(className);
}

function findElement(node, predicate) {
	if (predicate(node)) return node;
	for (const child of node?.children ?? []) {
		const match = findElement(child, predicate);
		if (match) return match;
	}
}

function removeBackreferences(node) {
	if (!node?.children) return;
	node.children = node.children.filter((child) => !(isElement(child, 'a') && hasClass(child, 'data-footnote-backref')));
	for (const child of node.children) removeBackreferences(child);
}

function noteChildren(item) {
	removeBackreferences(item);
	const children = [];
	for (const child of item.children) {
		if (children.length > 0) children.push({ type: 'text', value: ' ' });
		children.push(...(isElement(child, 'p') ? child.children : [child]));
	}
	return children;
}

function backreference(id, labels) {
	return {
		type: 'element',
		tagName: 'a',
		properties: {
			href: `#${id}`,
			className: ['footnote-backlink'],
			ariaLabel: labels.backreference,
		},
		children: [{ type: 'text', value: '↩' }],
	};
}

function placeSidenotes(node, notes, placed, labels) {
	if (!node?.children) return;

	for (let index = 0; index < node.children.length; index += 1) {
		const child = node.children[index];
		const reference = isElement(child, 'sup')
			? findElement(child, (candidate) => isElement(candidate, 'a') && candidate.properties?.dataFootnoteRef)
			: undefined;
		const href = reference?.properties?.href;

		if (typeof href === 'string' && notes.has(href)) {
			const number = placed.length + 1;
			const controlId = `sidenote-${number}`;
			const referenceId =
				typeof reference.properties?.id === 'string' ? reference.properties.id : `footnote-reference-${number}`;
			const noteId = placed.includes(href) ? `${href.slice(1)}-${number}` : href.slice(1);
			const note = structuredClone(notes.get(href));
			const noteWithBacklink = [...note, { type: 'text', value: ' ' }, backreference(referenceId, labels)];
			node.children.splice(
				index,
				1,
				{
					type: 'element',
					tagName: 'label',
					properties: {
						id: referenceId,
						htmlFor: controlId,
						className: ['margin-toggle', 'sidenote-number'],
						ariaLabel: `${labels.toggle} ${number}`,
					},
					children: [],
				},
				{
					type: 'element',
					tagName: 'input',
					properties: { type: 'checkbox', id: controlId, className: ['margin-toggle'] },
					children: [],
				},
				{
					type: 'element',
					tagName: 'span',
					properties: { id: noteId, className: ['sidenote'], role: 'note' },
					children: noteWithBacklink,
				},
			);
			placed.push(href);
			index += 2;
			continue;
		}

		placeSidenotes(child, notes, placed, labels);
	}
}

export default function rehypeFootnoteAsides() {
	return (tree, file) => {
		const labels =
			contentLocale(file.data.astro?.frontmatter?.lang, file.path) === 'pt-BR'
				? { backreference: 'Voltar à referência', toggle: 'Alternar nota' }
				: { backreference: 'Back to reference', toggle: 'Toggle note' };
		const sectionIndex = tree.children.findIndex((node) => isElement(node, 'section') && hasClass(node, 'footnotes'));
		if (sectionIndex < 0) return;

		const section = tree.children[sectionIndex];
		const list = findElement(section, (node) => isElement(node, 'ol'));
		if (!list) return;

		const notes = new Map();
		for (const item of list.children) {
			if (isElement(item, 'li') && typeof item.properties?.id === 'string') {
				notes.set(`#${item.properties.id}`, noteChildren(item));
			}
		}

		const placed = [];
		const content = tree.children.slice(0, sectionIndex);
		for (const block of content) placeSidenotes(block, notes, placed, labels);
		tree.children = [...content, ...tree.children.slice(sectionIndex + 1)];
	};
}
