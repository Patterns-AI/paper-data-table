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
	classNameBindings: ['filterProp:md-filter','numeric:md-numeric','active:md-active','sortProp:md-sort'],
	attributeBindings: ['style','colspan'],
	classNames: ['th-sort'],
	currentProperties: null,
	sortProp: null,
	sortDir: null,

	didInsertElement() {
		let {sortDir, currentSortProp} = this.getProperties('sortDir','currentSortProp');
		if(sortDir === null && currentSortProp) {
			this.set('sortDir', currentSortProp.sortDir);
		}
	},

	style: computed('width', function() {
		let width = escapeExpression(this.get('width'));
		if (width) {
			return htmlSafe(`width: ${width}px;`);
		}
		return undefined;
	}),

	currentSortProp: computed('sortProp', 'currentProperties', function() {
		let {sortProp, currentProperties} = this.getProperties('sortProp','currentProperties');
		let currentSorting = currentProperties.find( e => e.sortProp === sortProp);
		return currentSorting;
	}).readOnly(),
		
	active: computed('currentSortProp' ,'sortDir', function() {
		let {sortDir, currentSortProp} = this.getProperties('sortDir','currentSortProp');
		return currentSortProp && sortDir;
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
