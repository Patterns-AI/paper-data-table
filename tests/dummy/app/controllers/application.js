import Ember from 'ember';

export default Ember.Controller.extend({
	desserts: Ember.A([{ name: 'Frozen Yogurt', type: 'Ice Cream', calories: 159.0, fat: 6, carbs: 24, protein: 4, sodium: 87, calcium: 14, iron: 1, comment: '' },
	{ name: 'Ice cream sandwich', type: "Ice Cream", calories: 237, fat: 9, carbs: 37, protein: 4.3, sodium: 129, calcium: 8, iron: 1 },
	{ name: 'Ice cream sandwich', type: "Ice Cream", calories: 400, fat: 9, carbs: 37, protein: 4.3, sodium: 129, calcium: 8, iron: 1 },
	{ name: 'Eclair', type: 'Pastry', calories: 400, fat: 16, carbs: 24, protein: 6, sodium: 413, calcium: 3, iron: 8 },
	{ name: 'Eclair', type: 'Pastry', calories: 262, fat: 16, carbs: 24, protein: 6, sodium: 413, calcium: 3, iron: 8 },
	{ name: 'Cupcake', type: 'Pastry', calories: 305, fat: 3.7, carbs: 67, protein: 4.3, sodium: 413, calcium: 3, iron: 8 },
	{ name: 'Jelly bean', type: 'Candy', calories: 375, fat: 0, carbs: 94, protein: 0.0, sodium: 50, calcium: 0, iron: 0 },
	{ name: 'Lollipop', type: 'Candy', calories: 392, fat: 0.2, carbs: 98, protein: 0, sodium: 38, calcium: 0, iron: 2 },
	{ name: 'Honeycomb', type: 'Other', calories: 408, fat: 3.2, carbs: 87, protein: 6.5, sodium: 562, calcium: 0, iron: 45 },
	{ name: 'Donut', type: 'Pastry', calories: 452, fat: 25, carbs: 51, protein: 4.9, sodium: 326, calcium: 2, iron: 22 },
	{ name: 'KitKat', type: 'Candy', calories: 518, fat: 26, carbs: 65, protein: 7, sodium: 54, calcium: 12, iron: 6 },
	{ name: 'Gingerbread', type: 'Pastry', calories: 356, fat: 16, carbs: 49, protein: 2.9, sodium: 327, calcium: 7, iron: 16 }]),
	limitOptions: Ember.A([5, 10, 15]),
	limit: 5,
	pages: Ember.A([1, 2]),
	page: 1,
	filteredDesserts: Ember.A([]),
	sortedDesserts: Ember.A([]),
	paginatedDesserts: Ember.computed('page', 'limit', 'sortedDesserts', function () {
		let ind = (this.get('page') - 1) * this.get('limit');
		return Ember.A(this.get('sortedDesserts').toArray().splice(ind, this.get('limit')));
	}),
	results: Ember.computed.alias('paginatedDesserts'),
	sortProperties: [{ sortProp: "name", sortDir: "asc" }],
	searchProperties: [{ searchProp: "name", searchString: "" }],
	refreshTableProp: true,
	refreshTable: function() {
		this.set('refreshTableProp', false);
		let _this = this;
		Ember.run.next(function () {
			_this.set('refreshTableProp', true);
		});
	},

	actions: {

		decrementPage() {
			let page = this.get('page');
			if (page > 0) {
				this.set('page', page - 1);
			}
		},

		incrementPage() {
			let page = this.get('page');
			let max = this.get('pages').reduce((prev, curr) => curr > prev ? curr : prev, 0);
			if (page < max) {
				this.set('page', page + 1);
			}
		},

		didFinishSearch(filteredArray) {
			this.set('filteredDesserts', filteredArray);
			this.refreshTable();
		},

		didFinishSort(sorterArray) {
			this.set('sortedDesserts', sorterArray);
		},

		toggleShowEdit(cell) {
			Ember.set(cell, 'showEdit', false);
		}
	}
});
