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
	currentProp: null,
	sortProp: null,
	sortDir: null,
	didInsertElement() {
		debugger;
	},	
	style: computed('width', function() {
		let width = escapeExpression(this.get('width'));
		if (width) {
			return htmlSafe(`width: ${width}px;`);
		}
		return undefined;
	}),

	active: computed('sortProp', 'currentProp', function() {
		return this.get('sortProp') && this.get('sortProp') === this.get('currentProp');
	}).readOnly(),

	click() {
		debugger;
		let {
			sortProp,
			sortDir,
			active, currentProp } = this.getProperties('sortProp', 'sortDir', 'active','currentProp');
		
			console.log("sortProp:"+sortProp);
			console.log("currentProp:"+currentProp);			
			console.log("sortDir:"+sortDir);
			
		if (!sortProp) {
			return;
		}

		let newSortDir = sortDir;
		if (!active) {
			newSortDir = 'asc';
		} else {
			newSortDir = sortDir === 'asc' ? 'desc': 'asc';
		}

		this.get('sortChanged')(sortProp, newSortDir);
		this.set('sortDir', newSortDir);
	},
});
