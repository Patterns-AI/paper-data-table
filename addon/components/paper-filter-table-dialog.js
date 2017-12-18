import Ember from 'ember';
import layout from '../templates/components/paper-filter-table-dialog';

export default Ember.Component.extend({
  layout,
	classNameBindings: ['activated:activated'],
  attributeBindings: ['style','colspan'],
  activated: false,

  click(){
    console.log("clicked");
    this.set('activated', true);
  }
});
