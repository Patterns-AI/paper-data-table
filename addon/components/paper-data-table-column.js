import Ember from 'ember';
import layout from '../templates/components/paper-data-table-column';

const {
	Component,
	Handlebars: { Utils: { escapeExpression } },
  String: { htmlSafe },
	computed
} = Ember;

export default Component.extend({
	layout,
	tagName: 'th',
	classNameBindings: ['numeric:md-numeric','active:md-active','sortProp:md-sort'],
	attributeBindings: ['style','colspan'],
	classNames: ['th-sort'],
	currentProperties: null,
	sortProp: null,
	sortDir: null,

	style: computed('width', function() {
		let width = escapeExpression(this.get('width'));
		if (width) {
			return htmlSafe(`width: ${width}px;`);
		}
		return undefined;
	}),

	active: computed('sortProp', 'currentProperties','sortDir', function() {
		let {sortProp, sortDir, currentProperties} = this.getProperties('sortProp','sortDir','currentProperties');
				let isCurrentSorting = currentProperties.some( e => e.sortProp === sortProp)
		return sortProp && isCurrentSorting && sortDir
	}).readOnly(),
	
	click() {		
		let {
			sortProp,
			sortDir,
			active, currentProp } = this.getProperties('sortProp', 'sortDir', 'active');
			
		if (!sortProp) {
			return;
		}

		let newSortDir = sortDir;
		if (!active) {
			newSortDir = 'asc';
		} else {
			newSortDir = sortDir === 'asc' ? 'desc': null;
		}
		this.get('sortChanged')(sortProp, newSortDir);
		this.set('sortDir',newSortDir);
	},
});
