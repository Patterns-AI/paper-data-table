import Ember from 'ember';
import layout from '../templates/components/paper-data-table';

const {
	Component,
	computed
} = Ember;

export default Component.extend({
	layout,
	tagName: 'md-table-container',
	classNameBindings: ['noPadding:no-padding-table'],
	bodyComponent: 'paper-data-table-body',
	bodyRowComponent: 'paper-data-table-row',
	headComponent: 'paper-data-table-head',
	rowWidth: 0,
	sortProperties: [],
	selectable: false,

	sortDesc: computed('sortProperties', function() {
		let currentProperties = this.get('sortProperties');
		return currentProperties.map(item =>`${item.sortProp}:${item.sortDir}`);
	}).readOnly(),

	actions: {
		sortChanged(sortProp, sortDir) {
			if (this.get('onSortChanged')) {
				this.get('onSortChanged')({ sortProp, sortDir });
			} else {
				let sortProperties = this.get('sortProperties').filter( item => item.sortProp != sortProp);				
				if (sortDir) {
					sortProperties.push({sortProp, sortDir});					
				} 
				this.set('sortProperties', sortProperties);
			}
		},

		filterChanged(filterProp) {
			// let filterProp{ filterProp: "name", fiterType: "contains"}
		}
	}
});
