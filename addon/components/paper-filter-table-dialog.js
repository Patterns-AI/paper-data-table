import Ember from 'ember';
import layout from '../templates/components/paper-filter-table-dialog';

export default Ember.Component.extend({
  layout,

  click(){
    console.log("clicked");
  }
});
