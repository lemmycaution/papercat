'use strict';

import riot from 'riot';

riot.mixin('setValueByNameMixin', {
  setValueByName: function (e) {
    let input = e.currentTarget
    this.parent.record[input.name] = input.type === 'checkbox' ? 
      input.checked : 
      ((input.type === 'radio') ? input.selected : input.value);
  }
});