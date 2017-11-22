import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-filter-table-dialog', 'Integration | Component | paper filter table dialog', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{paper-filter-table-dialog}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#paper-filter-table-dialog}}
      template block text
    {{/paper-filter-table-dialog}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
