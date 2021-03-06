import Ember from 'ember';
import layout from '../templates/components/paper-data-table-column-filter';
const {
	Component,
	Handlebars: { Utils: { escapeExpression } },
  String: { htmlSafe },
	computed
} = Ember;

export default Component.extend({
	layout,
	tagName: 'th',
	classNameBindings: ['complexFilter:complex-filter','filterProp:md-filter','isHeaderFilterable:th-filterable'],
	attributeBindings: ['style','colspan'],
	classNames: ['md-column'],

	style: computed('width', function() {
		let width = escapeExpression(this.get('width'));
		if (width) {
			return htmlSafe(`width: ${width}px;`);
		}
		return undefined;
	}),

	actions: {
		changeSearch(newSearchString) {
			let searchProp = this.get('filterProp');
			this.set('name',newSearchString);
			this.get('onSearchChanged')(searchProp, newSearchString);
		}
	}

});
