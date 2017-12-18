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
	filterProperties: [],
	
	selectable: false,
	
	searchDesc: computed('searchProperties', function() {
		let searchProperties = this.get('searchProperties');
		let searchPropertiesFormated = searchProperties.map(item =>`${item.searchProp}:contains:${item.searchString}`);
		let _self = this;
		Ember.run.later((function() {
			_self.set('sortProperties',_self.get('sortProperties'));
				  }), 2000);
		return searchPropertiesFormated
		
	}).readOnly(),

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

		searchChanged(searchProp,searchString) {
			if (this.get('onSearchChanged')) {
				this.get('onSearchChanged')({ searchProp, searchString });
			} else {
				let searchProperties = this.get('searchProperties').filter( item => item.searchProp != searchProp);
				debugger;
				if (searchString) {
					searchProperties.push({searchProp, searchString});					
				} 
				this.set('searchProperties', searchProperties);
			}
		}
	}
});
